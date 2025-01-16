import Modal from 'react-bootstrap/Modal';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { useState } from 'react';

// modal for adding new category, will open when 'Add Category' button in MainCells is clicked
function NewCategoryModal(props) {
    const [newCategory, setNewCategory] = useState(null);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewCategory(value);
    }

    const handleConfirm = () => {
        props.onHide();
        console.log(newCategory);
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="new-category-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="new-category-modal-title-vcenter">
                Add New Category
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Control type="text" placeholder="New Category" name='new-category' required onChange={handleChange} />
                        <Form.Control.Feedback type='invalid'>Please enter a category.</Form.Control.Feedback>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant='dark' onClick={handleConfirm}>Confirm</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NewCategoryModal