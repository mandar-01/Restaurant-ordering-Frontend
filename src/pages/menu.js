import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CartModal from "../components/cartModal";

const Menu = ()=>{
    const { restaurantId } = useParams();
    const [restaurantDetails, setRestaurantDetails] = useState({});
    const [modalShow, setModalShow] = useState(false);
    const [itemIndex, setItemIndex] = useState(0);

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
        <div className="d-flex flex-wrap justify-content-center">
            {Object.keys(restaurantDetails).length > 0 && restaurantDetails.menu.map((item,index) => (
                <div key={index}>
                    <Card style={{ width: '18rem', margin: '15px' }}>
                    <Card.Body>
                        <Card.Title>{item.item}</Card.Title>
                        <Card.Text>
                        {item.description}
                        ${item.price}
                        </Card.Text>
                        <Button variant="primary" onClick={()=>addToCart(index)}>Add to Cart</Button>
                    </Card.Body>
                    </Card>
                </div>
            ))}
            <CartModal show={modalShow} setShow={setModalShow} itemIndex={itemIndex} restaurantDetails={restaurantDetails}/>
            
        </div>
            
    )
}

export default Menu;
