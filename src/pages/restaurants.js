import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ListGroup from 'react-bootstrap/ListGroup';
import { Link } from 'react-router-dom';

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
    <div>
      <h2>List of Restaurants</h2>
      
      {restaurants.map((restaurant,index) => (
        <ListGroup key={index}>
        <ListGroup.Item>
            <h5>{restaurant.name}</h5>
            {restaurant.location}
            <Link to={`/restaurants/${restaurant.id}`} className="nav-link" style={{ color: 'blue' }}>
                Check menu
            </Link>
            </ListGroup.Item>
        </ListGroup>

      ))}
      
    </div>
  );
};

export default Restaurants;