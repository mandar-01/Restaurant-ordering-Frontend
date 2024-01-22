import React, { useContext, useState } from 'react';
import { CartContext, CartDispatchContext } from '../components/cartContext';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
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
      <h2>My Cart</h2>
      {Object.keys(cart).map((key,index) => (
   
          <ListGroup key={index}>
            <ListGroup.Item>
          <h4>{key}</h4>
          {cart[key].map((entry,itemIndex) => (
            <ListGroup key={itemIndex}>
              <ListGroup.Item>
                <p>{entry.itemCount}  x {entry.itemName}</p>
                <p>Total={entry.totalPrice}</p>
                <Button variant="info" onClick={()=>modifyCart(key,entry,itemIndex)}>Modify</Button>
                <Button variant="danger" onClick={()=>removeFromCart(key,itemIndex)}>Remove</Button>
                </ListGroup.Item>
            </ListGroup>
          ))}
          </ListGroup.Item>
          </ListGroup>
      ))}

      <ModifyCartModal 
      entry={cartModificationEntry} 
      show={showModal} 
      setShow={setShowModal} 
      cartKey={cartModificationKey}
      index={cartModificationIndex}></ModifyCartModal>
      
      {Object.keys(cart).length > 0 && <Button variant="success" className='m-4' onClick={()=>setShowCheckoutModal(true)}>Checkout</Button>}
      
      <CheckoutCartModal
      show={showCheckoutModal}
      setShow={setShowCheckoutModal}
      ></CheckoutCartModal>
    </div>
  );
};

export default Cart;