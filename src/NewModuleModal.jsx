import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

// modal for adding new module, will open when 'Add Module' button in MainCells is clicked
function NewModuleModal(props) {
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
            <Form>
                <Form.Group className="mb-3" controlId="formBasicText">
                    <Form.Control type="text" placeholder="New Module" name='new-module' required />
                    <Form.Control.Feedback type='invalid'>Please enter a module.</Form.Control.Feedback>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant='dark' onClick={props.onHide}>Confirm</Button>
        </Modal.Footer>
    </Modal>
  );
}

export default NewModuleModal