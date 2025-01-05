import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { Form } from 'react-bootstrap';
import { InputGroup } from 'react-bootstrap';

function ModalForm(props) {
    // use react-bootstrap's modal
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
                    <FillItems />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={props.onHide}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    </>
}

function FillItems() {
    // form within the modal to fill up information about item added.
    return <>
        <Form>
            <Form.Group className="mb-3" controlId="formBasicText">
                <Form.Label>Description</Form.Label>
                <Form.Control type="text" placeholder="Enter description" />
            </Form.Group>

            <InputGroup className="mb-3">
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control aria-label="Amount (to the nearest dollar)" />
            </InputGroup>

            <Form.Select style={{marginTop:'15px'}} aria-label="select module">
                <option>Select module</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>

            <Form.Select aria-label="select category" style={{marginTop:'15px'}}>
                <option>Select category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </Form.Select>
        </Form>
    </>
}

export default ModalForm;