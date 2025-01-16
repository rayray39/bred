import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useRef, useState } from 'react';
import modules from '../data/modules.json';

// modal for adding new module, will open when 'Add Module' button in MainCells is clicked
function NewModuleModal(props) {
    const [newModule, setNewModule] = useState(null);       // the new module added
    const [validated, setValidated] = useState(false);      // whether the form is validated or not
    const formRef = useRef(null)                            // references the form

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewModule(value);
    }

    const handleConfirm = (e) => {
        // when form is submitted
        e.preventDefault();
        const form = formRef.current;
        if (form.checkValidity() === false) {
            e.stopPropagation();
            setValidated(true);
            return;
        }

        props.onHide();
        console.log(`adding new module: ${newModule}`);
        modules.push(newModule);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="new-module-modal-title-vcenter"
            centered
        >
        <Modal.Header closeButton>
                <Modal.Title id="new-module-modal-title-vcenter">
                Add New Module
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form noValidate validated={validated} ref={formRef}>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control type="text" placeholder="New Module" name='new-module' required onChange={handleChange} />
                        <Form.Control.Feedback type='invalid'>Please enter a module.</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewModuleModal