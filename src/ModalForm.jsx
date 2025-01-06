import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { useState } from 'react';

function ModalForm(props) {
    // use react-bootstrap's modal

    return <>
        <Modal
            show={props.show}
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

    const handleConfirm = (e) => {
        // this is called when the 'submit' button of the Form is clicked.
        e.preventDefault();
        console.log(`description: ${formData.description}`);
        console.log(`amount: ${formData.amount}`);
        console.log(`category: ${formData.category}`);
        console.log(`module: ${formData.module}`);

        sendData(formData);     // sends the data back to App
    }

    return <>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" name='description' onChange={handleInputChange} />
            </Form.Group>

            <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control aria-label="Amount (to the nearest dollar)" name='amount' onChange={handleInputChange} />
            </InputGroup>

            <Form.Select style={{marginTop:'15px'}} aria-label="select module" name='module' onChange={handleInputChange}>
                <option>Select module</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>

            <Form.Select aria-label="select category" style={{marginTop:'15px'}} name='category' onChange={handleInputChange}>
                <option>Select category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>

            <Button variant='dark' type='submit' style={{marginTop:'15px'}} onClick={handleConfirm}>Confirm</Button>
        </Form>
    </>
}

export default ModalForm;