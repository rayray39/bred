import { useState } from 'react'
import './App.css'
import ModalForm from './ModalForm'
import { Button } from 'react-bootstrap';
import MainCells from './MainCells';

function App() {
    const [showForm, setShowForm] = useState(false);

    const [formData, setFormData] = useState({});

    const handleConfirm = (data) => {
        // this is passed into FillItems, through ModalForm
        setFormData(data);      // receives the data from FillItems.
        setShowForm(false);     // hides the Modal
    }

    return <>
        <Button variant='light' size='lg' onClick={() => setShowForm(true)}>Add Item</Button>

        <ModalForm show={showForm} onConfirm={handleConfirm} onHide={() => setShowForm(false)}/>

        <MainCells data={formData}/>
    </>
}

export default App
