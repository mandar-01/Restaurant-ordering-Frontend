import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CartContext } from './cartContext';
import Table from 'react-bootstrap/Table';

function CheckoutCartModal (props) {

    const cart = useContext(CartContext);
    
    const calculateTotalPrice = ()=>{
        let total = 0;

        Object.values(cart).forEach((itemList) => {
        itemList.forEach((item) => {
            if (item.totalPrice) {
            total += item.totalPrice;
            }
        });
        });

        return total;
    }
    const total = calculateTotalPrice();
    
    return (
        <Modal size="lg" show={props.show} onHide={()=>props.setShow(false)}>
                <Modal.Header closeButton>
                <Modal.Title>Confirm your order</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Table striped bordered hover>
                <thead>
                    <tr>
                    <th>Restaurant Name</th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(cart).map(([restaurantName, orders]) =>
                    orders.map((order, index) => (
                        <tr key={index}>
                        <td>{restaurantName}</td>
                        <td>{order.itemName}</td>
                        <td>{order.itemCount}</td>
                        <td>${order.totalPrice}</td>
                        </tr>
                    ))
                    )}
                </tbody>
                </Table>
                <h6>Your total is ${total}</h6>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=>props.setShow(false)}>
                    Cancel
                </Button>
                <Button variant="primary">
                    Make Payment
                </Button>
                </Modal.Footer>
         </Modal>
    )
}

export default CheckoutCartModal;