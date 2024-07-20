import React, { useState } from "react";
import CarCard from "../../Components/CarsCard";

function AllCars() {
  const [cars, setCars] = useState([]);

  const showCars = async () => {
    try {
      const response = await fetch('https://localhost:7290/cars',
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
  }


  return (

    <div>
      <h2>All cars</h2>
      {cars.map((car, index) => (
        <div key={index} >
          <CarCard car={car} />
        </div>
        
      ))}
      <button onClick={showCars}>Show</button>
    </div>
    
  )
}

export default AllCars