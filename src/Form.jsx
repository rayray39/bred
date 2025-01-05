import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';

function Form(props) {
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

                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={props.onHide}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    </>
}

export default Form;