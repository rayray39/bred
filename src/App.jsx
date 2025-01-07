import { useState } from 'react'
import './App.css'
import ModalForm from './ModalForm'
import { Button } from 'react-bootstrap';
import MainCells from './MainCells';

function App() {
    const [showForm, setShowForm] = useState(false);    // show modal
    const [formData, setFormData] = useState({});       // data from the form (FillItems)
    const [totalAmount, setTotalAmount] = useState(0);

    const handleConfirm = (data) => {
        // this is passed into FillItems, through ModalForm
        setFormData(data);      // receives the data from FillItems.
        setShowForm(false);     // hides the Modal
        setTotalAmount((prev) => prev + Number(parseFloat(data.amount).toFixed(2)));
    }

    return <>
        <Button variant='light' size='lg' onClick={() => setShowForm(true)}>Add Item</Button>

        <ModalForm show={showForm} onConfirm={handleConfirm} onHide={() => setShowForm(false)}/>

        <MainCells data={formData}/>

        <div style={{color:'white'}}>
            {`total amount = $${totalAmount}`}
        </div>
    </>
}

export default App
