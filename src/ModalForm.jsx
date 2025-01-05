import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';
import { useState } from 'react';

function ModalForm(props) {
    // use react-bootstrap's modal

     // State to hold form data
    const [formData, setFormData] = useState({
        description: "",
        amount: "",
        module: "",
        category: "",
    });

    // Function to update form data
    const handleFormDataChange = (field, value) => {
        setFormData((prevData) => ({ ...prevData, [field]: value }));
    };

    // handle confirm button click
    const handleConfim = () => {
        console.log(`description: ${formData.description}`)
        console.log(`amount: ${formData.amount}`)
        console.log(`module: ${formData.module}`)
        console.log(`category: ${formData.category}`)
        props.onHide();
    }

    return <>
        <Modal
            {...props}
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
                    <FillItems onChange={handleFormDataChange} />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={handleConfim}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    </>
}

function FillItems({onChange}) {    // receives the onChage prop
    // form within the modal to fill up information about item added.

    // Update parent state when inputs change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        onChange(name, value);
    };

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
        </Form>
    </>
}

export default ModalForm;