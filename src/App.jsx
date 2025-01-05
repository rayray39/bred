import { useState } from 'react'
import './App.css'
import Form from './Form'
import { Button } from 'react-bootstrap';

function App() {
    const [showForm, setShowForm] = useState(false);

    return <>
        <Button variant='light' size='lg' onClick={() => setShowForm(true)}>Add Item</Button>

        <Form show={showForm} onHide={() => setShowForm(false)} />
    </>
}

export default App
