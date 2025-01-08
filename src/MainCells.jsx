import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';
import { Button } from "react-bootstrap";

function MainCells(props) {
    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedRows, setSelectedRows] = useState([]);

    // column headers for data grid
    const tableColumnHeaders = [
        { field: 'id', headerName: 'No.', flex: 1},
        { field: 'description', headerName: 'Description', headerAlign: 'center', flex: 3},
        { field: 'category', headerName: 'Category', headerAlign: 'center', flex: 2},
        { field: 'module', headerName: 'Module', headerAlign: 'center', flex: 2},
        { field: 'amount', headerName: 'Amount', headerAlign: 'center', flex: 1}
    ]

    useEffect(() => {
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
                setTableData(data.tableData);   // set tableData to hold the fetched data
                setTotalAmount(data.totalAmount)    // set totalAmount for existing data in storage
            } catch (error) {
                console.error(`Error in fetching table data: ${error}`);
            }
        };
        fetchTableData();
    }, [])

    useEffect(() => {
        // appending new rows to table data
        if (props.data && Object.keys(props.data).length > 0) {     // only if data is non empty
            // include the id into the row of data
            const newRow = {
                id: tableData.length + 1,
                ...props.data,
            };

            // append this row to the existing table data
            setTableData((prev) => [...prev, newRow]);
            setTotalAmount((prev) => prev + Number(parseFloat(props.data.amount).toFixed(2)));
        }

    }, [props.data])

    const handleRowSelection = (selectionModel) => {
        // when a row is selected
        // selectionModel is an array that holds the ids of the selected rows
        setSelectedRows(selectionModel);
        console.log(`selected row ids: ${selectionModel}`);
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
            setTableData((prevTableData) =>
                prevTableData
                    .filter((row) => !selectedRows.includes(row.id))
                    .map((row, index) => ({...row, id: index + 1}))
            );
            setSelectedRows([]);
            alert(`Rows have been successfully deleted: ${selectedRows}`);
        } catch (error) {
            console.error(`Error in deleting row(s): ${error}`);
        }
    }

    const handleAddItem = () => {
        // displays the FillItems form from ModalForm
        props.displayForm();
    }

    return <div>
        <div style={{display: 'flex', flexDirection: 'column', width:'200px'}}>
            <Button variant="light" style={{marginBottom:'20px'}} onClick={handleAddItem}>Add Item</Button>

            <Button variant="light" onClick={handleDeleteRow}>Delete Item(s)</Button>
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
    </div>
}

export default MainCells