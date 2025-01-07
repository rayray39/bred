import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

function MainCells(props) {
    const [tableData, setTableData] = useState([]);

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
        }

    }, [props.data])

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
                <tr key={row.id}>
                    <td>{row.id}</td>
                    <td>{row.description}</td>
                    <td>{row.category}</td>
                    <td>{row.module}</td>
                    <td>${row.amount}</td>
                </tr>
            ))}
          </tbody>
        </Table>
    )
}

export default MainCells