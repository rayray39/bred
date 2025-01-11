import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "react-bootstrap";
import Modules from "./Modules";
import Categories from "./Categories";

// displays main table data using Material UI's DataGrid
function MainCells({ newlyAddedData, displayForm }) {
    const [originalTableData, setOriginalTableData] = useState([]);     // original unfiltered data
    const [tableData, setTableData] = useState([]);                     // data that will be operated on (eg. filtering)

    const [originalTotalAmount, setOriginalTotalAmount] = useState(0);  // original total amount
    const [totalAmount, setTotalAmount] = useState(0);                  // total amount for filtering operations.

    const [selectedRows, setSelectedRows] = useState([]);
    const [dataIsFiltered, setDataIsFiltered] = useState(false);

    // column headers for data grid
    const tableColumnHeaders = [
        { field: 'id', headerName: 'No.', flex: 1},
        { field: 'description', headerName: 'Description', headerAlign: 'center', flex: 3},
        { field: 'category', headerName: 'Category', headerAlign: 'center', flex: 2},
        { field: 'module', headerName: 'Module', headerAlign: 'center', flex: 2},
        { field: 'date', headerName: 'Date', headerAlign: 'center', flex: 1},
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', flex: 1}
    ]

    useEffect(() => {   // empty dependency array means it only runs once on initial render
        // fetch stored data from table.json to display
        const fetchTableData = async () => {
            try {
                const response = await fetch('http://localhost:5000/get-table-data', {
                    method: 'GET'
                })
    
                const data = await response.json();
                if (!response.ok) {
                    console.log(data.error);
                    alert(data.error);
                }
    
                console.log(data.message);
                setOriginalTableData(data.tableData);
                setTableData(data.tableData);   // set tableData to hold the fetched data

                setTotalAmount(Number(parseFloat(data.totalAmount).toFixed(2)))    // set totalAmount for existing data in storage
                setOriginalTotalAmount(Number(parseFloat(data.totalAmount).toFixed(2)))
            } catch (error) {
                console.error(`Error in fetching table data: ${error}`);
            }
        };
        fetchTableData();
    }, [])

    useEffect(() => {   // runs everytime props.data changes (receives new row data)
        // appending new rows to table data
        if (newlyAddedData && Object.keys(newlyAddedData).length > 0) {     // only if data is non empty
            // include the id into the row of data
            const newRow = {
                id: tableData.length + 1,
                ...newlyAddedData,
            };

            // append this row to the existing table data
            setOriginalTableData((prev) => [...prev, newRow]);
            setTableData((prev) => [...prev, newRow]);
            // add new row amount to total amount
            setTotalAmount((prev) => Number((prev + parseFloat(newlyAddedData.amount)).toFixed(2)));
            setOriginalTotalAmount((prev) => Number((prev + parseFloat(newlyAddedData.amount)).toFixed(2)));
        }

    }, [newlyAddedData])

    const handleSelectedModules = (selectedModules) => {
        // selectedModules is an array containing the modules selected eg. [Main Housing, Top Housing]
        console.log(`selected modules (MainCells.jsx): ${selectedModules}`);
        if (selectedModules.length === 0) {
            setTableData(originalTableData);
            setTotalAmount(originalTotalAmount);
            setDataIsFiltered(false);
            return;
        }
        const modulesSelectedTableData = originalTableData.filter((data) => selectedModules.includes(data.module));
        console.log(modulesSelectedTableData);

        const modulesTotalAmount = computeTotalAmountFromFilteredData(modulesSelectedTableData);
        console.log(`total amount from filtered modules: ${modulesTotalAmount}`);
        
        setTableData(modulesSelectedTableData);
        setTotalAmount(modulesTotalAmount);
        setDataIsFiltered(true);
    }

    const handleSelectedCategories = (selectedCategories) => {
        // selectedCategories is an array containing the categories selected eg. [Hardware, Software]
        console.log(`selected categories (MainCells.jsx): ${selectedCategories}`);
        if (selectedCategories.length === 0) {
            setTableData(originalTableData);
            setTotalAmount(originalTotalAmount);
            setDataIsFiltered(false);
            return;
        }
        const categoriesSelectedTableData = originalTableData.filter((data) => selectedCategories.includes(data.category));
        console.log(categoriesSelectedTableData);
        
        const categoriesTotalAmount = computeTotalAmountFromFilteredData(categoriesSelectedTableData);
        console.log(`total amount from filtered categories: ${categoriesTotalAmount}`);

        setTableData(categoriesSelectedTableData);
        setTotalAmount(categoriesTotalAmount);
        setDataIsFiltered(true);
    }

    const computeTotalAmountFromFilteredData = (filteredData) => {
        // compute the total amount of the filtered data (selected modules or categories)
        let total = 0;
        filteredData.forEach(data => {
            total += parseFloat(data.amount);
        });
        return Number(total.toFixed(2));
    }

    const handleRowSelection = (selectionModel) => {
        // when a row is selected
        // selectionModel is an array that holds the ids of the selected rows
        setSelectedRows(selectionModel);
        console.log(`selected row ids: ${selectionModel}`);
    }

    const computeDeletedAmount = (selectedRows) => {
        // compute total amount from deleted rows
        let total = 0;
        tableData.forEach(data => {
            if (selectedRows.includes(data.id)) {
                total += parseFloat(data.amount);
            }
        });
        console.log(`amount to be deleted: ${total}`);
        return Number(total.toFixed(2));
    }

    const handleDeleteRow = async () => {
        // when delete button is clicked
        if (selectedRows.length === 0) {
            console.log('No rows selected for deletion.')
            return;
        }

        try {
            // make a delete request
            const response = await fetch('http://localhost:5000/delete-row-data', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    rowIds: selectedRows
                })
            })

            const data = await response.json();
            if (!response.ok) {
                console.log(data.error);
                alert(data.error);
                return;
            }

            console.log(data.message);
            // Update the table data in the frontend
            setOriginalTableData((prevTableData) =>
                prevTableData
                    .filter((row) => !selectedRows.includes(row.id))
                    .map((row, index) => ({...row, id: index + 1}))
            )
            setTableData((prevTableData) =>
                prevTableData
                    .filter((row) => !selectedRows.includes(row.id))
                    .map((row, index) => ({...row, id: index + 1}))
            );

            // subtract deleted row amounts from total amount
            setTotalAmount((prev) => Number((prev - computeDeletedAmount(selectedRows)).toFixed(2)));
            setOriginalTotalAmount((prev) => Number((prev - computeDeletedAmount(selectedRows)).toFixed(2)));

            setSelectedRows([]);
            alert(`Rows have been successfully deleted: ${selectedRows}`);
        } catch (error) {
            console.error(`Error in deleting row(s): ${error}`);
        }
    }

    const handleAddItem = () => {
        // displays the FillItems form from ModalForm
        displayForm();
    }

    return <div>
        <div style={{display: 'flex', flexDirection: 'column', width:'200px'}}>
            <Button variant="light" style={{marginBottom:'16px'}} onClick={handleAddItem} disabled={dataIsFiltered}>Add Item</Button>

            <Button variant="light" onClick={handleDeleteRow} disabled={dataIsFiltered}>Delete Item(s)</Button>

            <Modules handleSelectedModules={handleSelectedModules}/>

            <Categories handleSelectedCategories={handleSelectedCategories} />
        </div>

        <div style={{marginTop:"40px", width: '100%'}}>
            <DataGrid rows={tableData} columns={tableColumnHeaders}
                disableRowSelectionOnClick 
                checkboxSelection
                onRowSelectionModelChange={handleRowSelection}
                sx={{ 
                    bgcolor: 'white', 
                    '& .MuiDataGrid-cell': {
                        color: 'black', textAlign:'center', borderRight: '1px solid rgba(224, 224, 224, 1)',
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        fontWeight: 'bold',
                        fontSize: '16px'
                    }
                }}/>
        </div>

        <div id="total-amount">
            {`Total Amount: $${totalAmount.toFixed(2)}`}
        </div>
    </div>
}

export default MainCells