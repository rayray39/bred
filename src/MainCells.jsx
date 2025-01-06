import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"

function MainCells(props) {
    const [tableData, setTableData] = useState([]);

    useEffect(() => {
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