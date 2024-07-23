import React, { useState, useEffect } from "react"
import CarCard from "../Components/CarsCard"
import axios from 'axios'

 function AllCars() {
  const [cars, setCars] = useState([])

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

  return (
    <div className="container ">
      <h2 className="text-3xl font-bold mb-4 text-center	">All cars</h2>
      <div className="flex flex-row justify-center">
        
        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className="m-4">
              <CarCard car={car} />
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