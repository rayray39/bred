import { useState } from 'react'
import './App.css'
import ModalForm from './ModalForm'
import MainCells from './MainCells';

// main dashboard that displays the table data.
function Dashboard() {
    const [showForm, setShowForm] = useState(false);    // show modal
    const [formData, setFormData] = useState({});       // data from the form (FillItems)

    const handleConfirm = (data) => {
        // this is passed into FillItems, through ModalForm
        setFormData(data);      // receives the data from FillItems.
        setShowForm(false);     // hides the Modal
    }

    const handleAddItem = () => {
        setShowForm(true);
    }

    return <>
        <ModalForm show={showForm} onConfirm={handleConfirm} onHide={() => setShowForm(false)}/>

        <MainCells newlyAddedData={formData} displayForm={handleAddItem}/>
    </>
}

export default Dashboard


