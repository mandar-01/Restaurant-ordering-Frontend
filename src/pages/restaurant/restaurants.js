import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';
import {Card,Row, Col} from 'react-bootstrap';

const Restaurants = () => {
  
const [restaurants, setRestaurants] = useState([]);

useEffect(()=>{
    const fetchData = async () => {
        try {
          const response = await fetch(
            "http://127.0.0.1:5000/" + "getRestaurants",
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          const jsonData = await response.json();
          setRestaurants(jsonData.restaurants);
        } catch (error) {
          console.error("Error fetching JSON:", error);
        }
      };
      fetchData();
},[])
  return (
    <div className="mb-4">
      <h2 className="text-center mb-4">Explore Our Restaurants</h2>

      <Row xs={1} md={2} lg={3} className="m-2">
        {restaurants.map((restaurant, index) => (
          <Col key={index} className="mb-4">
            <Card className="h-100">
              <Card.Img variant="top" src="images/restaurant.jpeg" alt={restaurant.name} style={{ height: '200px', objectFit: 'cover' }}/>
              <Card.Body>
                <Card.Title>{restaurant.name}</Card.Title>
                <Card.Text>{restaurant.location}</Card.Text>
              </Card.Body>
              <Card.Footer>
                <Link to={`/restaurants/${restaurant.id}`} className="btn btn-primary">
                  Check Menu
                </Link>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Restaurants;