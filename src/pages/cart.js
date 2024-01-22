import React, { useContext, useState } from 'react';
import { CartContext, CartDispatchContext } from '../components/cartContext';
import { ListGroup, Button, Row, Col, Badge  } from 'react-bootstrap';
import ModifyCartModal from '../components/modifyCartModal';
import CheckoutCartModal from '../components/checkoutModal';

const Cart = () => {
  
  const cart = useContext(CartContext);
  const dispatch = useContext(CartDispatchContext);
  const [showModal, setShowModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [cartModificationEntry, setCartModificationEntry] = useState({});
  const [cartModificationKey,setCartModificationKey] = useState(null);
  const [cartModificationIndex, setCartModificationIndex] = useState(null);

  function modifyCart(key,entry,itemIndex){
    setCartModificationEntry(entry);
    setCartModificationIndex(itemIndex);
    setCartModificationKey(key);
    setShowModal(true);
  }

  function removeFromCart(key,itemIndex){
    dispatch({
      type:'delete',
      deletionKey: key,
      deletionIndex:itemIndex
    });
  }
  return (
    <div>
      <h2 className='m-2'>My Cart</h2>
      {Object.keys(cart).map((key, index) => (
        <div key={index} className='m-3'>
          <ListGroup>
            <ListGroup.Item>
              <h4>{key}</h4>
              {cart[key].map((entry, itemIndex) => (
                <div key={itemIndex}>
                  <Row>
                    <Col xs={8} sm={6} md={6}>
                      <p>
                        <Badge pill variant="primary" className="mr-2">
                          {entry.itemCount}x
                        </Badge>
                        <span className="font-weight-bold"> {entry.itemName}</span>
                      </p>
                    </Col>
                    <Col xs={4} sm={3} md={3}>
                      <p>${entry.totalPrice}</p>
                    </Col>
                    <Col xs={12} sm={3} md={3}>
                      <Button
                        variant="info"
                        onClick={() => modifyCart(key, entry, itemIndex)}
                        className='m-1'
                      >
                        Modify
                      </Button>
                      <Button
                        variant="danger"
                        onClick={() => removeFromCart(key, itemIndex)}
                        className='m-1'
                      >
                        Remove
                      </Button>
                    </Col>
                  </Row>
                </div>
              ))}
            </ListGroup.Item>
          </ListGroup>
        </div>
      ))}

      <ModifyCartModal 
      entry={cartModificationEntry} 
      show={showModal} 
      setShow={setShowModal} 
      cartKey={cartModificationKey}
      index={cartModificationIndex}></ModifyCartModal>
      
      {Object.keys(cart).length > 0 && <Button variant="success" className='m-3' onClick={()=>setShowCheckoutModal(true)}>Checkout</Button>}
      
      <CheckoutCartModal
      show={showCheckoutModal}
      setShow={setShowCheckoutModal}
      ></CheckoutCartModal>
    </div>
  );
};

export default Cart;