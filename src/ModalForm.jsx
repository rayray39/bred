import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

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

function FillItems({sendData}) {    // receives the onChage prop
    // form within the modal to fill up information about item added.
    const [validated, setValidated] = useState(false)
    const [isAmountValid, setIsAmountValid] = useState(true);

    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        module: "",
        category: "",
    })

    const handleInputChange = (e) => {
        // updates the form data whenever values in the input changes.
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
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
        // this is called when the 'submit' button of the Form is clicked.
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
                <option value="Main">Main</option>
                <option value="Bottom Housing">Bottom Housing</option>
                <option value="Top Housing">Top Housing</option>
            </Form.Select>

            <Form.Select aria-label="select category" style={{marginTop:'15px'}} name='category' onChange={handleInputChange} required >
                <option value=''>Select category</option>
                <option value="Hardware">Hardware</option>
                <option value="Software">Software</option>
                <option value="Tools">Tools</option>
            </Form.Select>

            <Button variant='dark' type='submit' style={{marginTop:'15px', marginBottom:'15px'}}>Confirm</Button>
        </Form>
    </>
}

export default ModalForm;