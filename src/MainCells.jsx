import { Table } from "react-bootstrap"

function MainCells() {
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
            <tr>
                <td>1</td>  
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
                <td>100</td>
            </tr>
            <tr>
                <td>2</td>   
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>200</td>
            </tr>
            <tr>
                <td>3</td>
                <td>Larry</td>
                <td>Bird</td>
                <td>@twitter</td>
                <td>300</td>
            </tr>
            <tr>
                <td>4</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
                <td>100</td>
            </tr>
          </tbody>
        </Table>
    )
}

export default MainCells