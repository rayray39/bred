import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

function MainCells(props) {
    const [tableData, setTableData] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);
    const [selectedRow, setSelectedRow] = useState(null);

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

    return (
        <Table bordered hover style={{marginTop:"60px"}}>
          <thead>
            <tr>
                <th>No.</th>
                <th>Description</th>
                <th>Category</th>
                <th>Module</th>
                <th>Amount (in dollars)</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => (
                <tr key={row.id} onClick={() => handleRowClick(row.id)} >
                    <td>{row.id}</td>
                    <td>{row.description}</td>
                    <td>{row.category}</td>
                    <td>{row.module}</td>
                    <td>{row.amount}</td>
                </tr>
            ))}
            <tr>
                <td colSpan={4} style={{textAlign:'right', fontWeight:'bold'}}>Total Amount (in dollars)</td>
                <td>{totalAmount}</td>
            </tr>
          </tbody>
        </Table>
    )
}

export default MainCells