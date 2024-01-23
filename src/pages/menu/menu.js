import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Button, Row, Col } from 'react-bootstrap';
import CartModal from "../../components/cartModal";
import { CartContext } from "../../components/cartContext";

const Menu = ()=>{
    const { restaurantId } = useParams();
    const cart = useContext(CartContext);
    console.log(cart);
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);

    const restaurantKey = restaurantDetails.name+"-"+restaurantDetails.location;
    const isItemInCart = (itemName) => {
      console.log("got item name "+itemName);
      return (
        cart[restaurantKey] &&
        cart[restaurantKey].some((cartItem) => cartItem.itemName === itemName)
      );
    };

    useEffect(()=>{
        const fetchRestaurantDetails = async () => {
            try {
            const queryParams = new URLSearchParams({
                restaurantId: restaurantId
                });
              const response = await fetch(
                `http://127.0.0.1:5000/getRestaurantDetails?${queryParams}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const jsonData = await response.json();
              setRestaurantDetails(jsonData);
            } catch (error) {
              console.error("Error fetching JSON:", error);
            }
          };
          fetchRestaurantDetails();
    },[])

    function addToCart(index) {
        setItemIndex(index);
        setModalShow(true);
    }

    return (
      <Row className="justify-content-center m-2">
      {Object.keys(restaurantDetails).length > 0 &&
        restaurantDetails.menu.map((item, index) => (
          <Col key={index} lg={4} md={6} sm={12} className="mb-4">
            <Card className="mb-4 d-flex flex-column h-100">
              <Card.Body className="d-flex flex-column position-relative">
                <Card.Title>
                  {item.item} 
                  {isItemInCart(item.item) && (
                      <span className="text-success fs-6">
                      <sup>
                        <i className="bi bi-check-circle"></i> Added to Cart
                      </sup>
                      </span>
                    )}
                </Card.Title>
                <Card.Text className="flex-grow-1">
                  {item.description}
                  <br />
                  <strong>${item.price}</strong>
                </Card.Text>
                <div className="text-center">
                  <Button variant="primary" onClick={() => addToCart(index)} data-testid="addToCartButton">
                    Add to Cart
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
    
      <CartModal show={modalShow} setShow={setModalShow} itemIndex={itemIndex} restaurantDetails={restaurantDetails} />
    </Row>
            
    )
}

export default Menu;
