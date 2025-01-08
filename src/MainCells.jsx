import { useEffect, useState } from "react"
import { DataGrid } from '@mui/x-data-grid';

function MainCells(props) {
    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);

    const tableColumnHeaders = [
        { field: 'id', headerName: 'No.'},
        { field: 'description', headerName: 'Description', width:500, headerAlign: 'center'},
        { field: 'category', headerName: 'Category', width: 206, headerAlign: 'center'},
        { field: 'module', headerName: 'Module', width: 206, headerAlign: 'center'},
        { field: 'amount', headerName: 'Amount', width: 200, headerAlign: 'center'}
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

    const handleRowClick = (index) => {
        setSelectedRow(index);
        console.log(`selected row: ${index}`);
    }

    return <div style={{marginTop:"40px"}}>
        <DataGrid rows={tableData} columns={tableColumnHeaders} 
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
}

export default MainCells