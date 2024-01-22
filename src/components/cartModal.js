import { useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartDispatchContext } from "./cartContext";

function CartModal (props) {

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
        setCount(1)
    };

    function addToCart(){
        dispatch({
            type: 'add',
            restaurantName:props.restaurantDetails.name,
            restaurantLocation: props.restaurantDetails.location,
            itemName: props.restaurantDetails.menu[props.itemIndex].item,
            itemCount: count,
            itemPrice:props.restaurantDetails.menu[props.itemIndex].price,
            totalPrice: parseInt(props.restaurantDetails.menu[props.itemIndex].price,10) * parseInt(count,10)
        })
        handleClose();
    }
    
    return (
        <>
        {Object.keys(props.restaurantDetails).length > 0 &&
        <Modal show={props.show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>{props.restaurantDetails.menu[props.itemIndex].item}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div>Choose quantity</div>
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
                <Button variant="primary" onClick={addToCart}>
                    Add to cart
                </Button>
                </Modal.Footer>
            </Modal>
        }
        </>
    )
}

export default CartModal;