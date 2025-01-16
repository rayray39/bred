import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'; // MUI DatePicker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextField } from '@mui/material'; // MUI TextField
import dayjs from 'dayjs';
import categories from '../data/categories.json';
import modules from '../data/modules.json';

// Modal that appears when a new item needs to be added
function ModalForm(props) {
    // use react-bootstrap's modal

    return <>
        <Modal
            show={props.show}
            onHide={props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add a new item
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <FillItems sendData={props.onConfirm} />
                </div>
            </Modal.Body>
        </Modal>
    </>
}

// form within the modal to fill up information about item added.
function FillItems({sendData}) {    // receives the onChage prop
    const [validated, setValidated] = useState(false)
    const [isAmountValid, setIsAmountValid] = useState(true);
    const [dateSelected, setDateSelected] = useState(dayjs());

    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        module: "",
        category: "",
        date: "",
    })

    const handleInputChange = (e) => {
        // updates the form data whenever values in the input changes.
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleDateChange = (newValue) => {
        // updates the form data, for date, whenever values in the input changes.
        setDateSelected(newValue);
        setFormData({...formData, date: newValue.format('DD-MM-YYYY')});
    };

    const handleAmountChange = (e) => {
        // updates form data for 'amount' form field
        const { value } = e.target;
        const numericRegex = /^\d*(\.\d{0,2})?$/;

        if (value === "" || numericRegex.test(value)) {
            setFormData((prevData) => ({ ...prevData, amount: value }));
            setIsAmountValid(true);
        } else {
            setIsAmountValid(false);
        }
    }

    const handleAmountBlur = () => {
        // when the 'amount' field in the form is out of focus (blur)
        setFormData((prevData) => ({
            ...prevData,
            amount: prevData.amount ? parseFloat(prevData.amount).toFixed(2) : "",
        }));
    }

    const handleConfirm = async (e) => {
        // this is called when the 'confirm' button of the Form is clicked.
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        const regex = /^\d+(\.\d{1,2})?$/;
        if (!regex.test(formData.amount)) {
            setIsAmountValid(false); // Show feedback if invalid
            return;
        }

        console.log(`description: ${formData.description}`);
        console.log(`amount: ${formData.amount}`);
        console.log(`category: ${formData.category}`);
        console.log(`module: ${formData.module}`);
        console.log(`date: ${formData.date}`);

        // sent form data to table.json
        try {
            const response = await fetch('http://localhost:5000/save-form-data', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    formData
                })
            })

            const data = await response.json();
            if (!response.ok) {
                console.log(data.error);
                alert(data.error);
                return;
            }

            console.log(data.message);

        } catch (error) {
            console.error(`Error in saving form data: ${error}`);
        }

        sendData(formData);     // sends the data back to App
    }

    return <>
        <Form onSubmit={handleConfirm} noValidate validated={validated}>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" name='description' onChange={handleInputChange} required />
                <Form.Control.Feedback type='invalid'>Please enter a description.</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Amount</Form.Label>
                <Form.Control type="text" placeholder="Enter amount" name='amount' onChange={handleAmountChange} onBlur={handleAmountBlur} isInvalid={!isAmountValid} required />
                <Form.Control.Feedback type='invalid'>Please enter the amount to 2 decimal places.</Form.Control.Feedback>
            </Form.Group>

            <Form.Select style={{marginTop:'15px'}} aria-label="select module" name='module' onChange={handleInputChange} required >
                <option value=''>Select module</option>
                {
                    modules.map((module, index) => <option key={index} value={module}>{module}</option>)
                }
            </Form.Select>

            <Form.Select aria-label="select category" style={{marginTop:'15px'}} name='category' onChange={handleInputChange} required >
                <option value=''>Select category</option>
                {
                    categories.map((category, index) => <option key={index} value={category}>{category}</option>)
                }
            </Form.Select>

            <Form.Group controlId="formDateAdded" className="mb-3" style={{marginTop:'20px'}}>
                {/* MUI DatePicker */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        label="Select Date"
                        value={dateSelected}
                        onChange={handleDateChange}
                        renderInput={(params) => (
                            <TextField {...params} fullWidth />
                        )}
                    />
                </LocalizationProvider>
            </Form.Group>

            <Button variant='dark' type='submit' style={{marginTop:'15px', marginBottom:'15px'}}>Confirm</Button>
        </Form>
    </>
}

export default ModalForm;