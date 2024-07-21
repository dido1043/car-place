import React, { useState, useEffect } from "react"
import CarCard from "../Components/CarsCard"

function AllCars() {
  const [cars, setCars] = useState([])

  useEffect(() => {
    const showCars = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_KEY}/cars`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'Accept': '/'
            },
          }
        )
        const jsonData = await response.json();
        setCars(jsonData)
      } catch (error) {
        console.log(error);
      }
    };

    showCars()
  }, []);

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">All cars</h2>
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
  );
}

export default AllCars;