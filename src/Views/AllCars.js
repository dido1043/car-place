import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import CarCard from "../Components/CarsCard"
import '../assests/scss/allCars.scss'
import axios from 'axios'
import { Link } from "react-router-dom"
import BaseButton from "../Components/Shared/BaseButton"
function AllCars() {
  const [cars, setCars] = useState([])
  const nav = useNavigate();
  useEffect(() => {
    const showCars = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_KEY}/cars`, {
          headers: {
            'Content-Type': 'application/json',
            'Accept': '*/*'
          }
        });
        setCars(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    showCars()
  }, []);
  const navigateToSortedCars = () =>{
    nav("/allCars/cars/sorted");
  }

  return (
    <div className="container ">
      <h2 className="text-3xl font-bold mb-4 text-center">All cars</h2>
      <BaseButton onClick={navigateToSortedCars} text="Sort by price"/>
      <div className="all-cars place-content-center">
      
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className="m-4">
              <Link to={{
                pathname: `cars/${car.id}`}}
                state= { car }
               className="menu-item">
                <CarCard car={car} />
              </Link>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
}

export default AllCars;