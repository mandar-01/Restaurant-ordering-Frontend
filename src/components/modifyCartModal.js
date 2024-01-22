import { useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartDispatchContext } from "./cartContext";

function ModifyCartModal (props) {
    const [count, setCount] = useState(1);
    const dispatch = useContext(CartDispatchContext);

    const handleIncrement = () => {
        setCount(count + 1);
    };

    const handleDecrement = () => {
        if (count > 1) {
        setCount(count - 1);
        }
    };
    const handleClose = () => {
        props.setShow(false)
        setCount(1);
    };

    function updateCart(){
        const newEntry = {...props.entry,
            itemCount:count, 
            totalPrice: parseInt(props.entry.itemPrice,10) * parseInt(count,10)}
        dispatch({
            type:'update',
            modificationKey: props.cartKey,
            modificationIndex: props.index,
            newEntry: newEntry
        })
        handleClose();
    }
    
    return (
        <>
        
        <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{props.entry.itemName}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>Update quantity</div>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Button variant="outline-secondary" onClick={handleDecrement} style={{ marginRight: '5px' }}>
                        -
                    </Button>
                    <span>{count}</span>
                    <Button variant="outline-secondary" onClick={handleIncrement} style={{ marginLeft: '5px' }}>
                        +
                    </Button>
                </div>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={updateCart}>
                    Save
                </Button>
                </Modal.Footer>
            </Modal>
        
        </>
    )
}

export default ModifyCartModal;