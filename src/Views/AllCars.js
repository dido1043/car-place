import React, { useState, useEffect } from "react"
import CarCard from "../Components/CarsCard"
import axios from 'axios'
import { Link } from "react-router-dom"
function AllCars() {
  const [cars, setCars] = useState([])

  const [handleError, setHandleError] = useState({
    status: '',
    message: ''
  });

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
        setHandleError({
          status: error?.response?.status,
          message: error?.response?.data.message
        })
      }
    };

    showCars()
  }, []);

  return (
    <div className="container ">
      <h2 className="text-3xl font-bold mb-4 text-center	">All cars</h2>
      <div className="flex flex-wrap justify-center">

        {cars.length > 0 ? (
          cars.map((car, index) => (
            <div key={index} className="m-4">
              <Link to={{
                pathname: `cars/${car.id}`
              }}
                state={car}
                className="menu-item">
                <CarCard car={car} />
              </Link>
            </div>
          ))
        ) : (
          <p>No cars available. {handleError}</p>
        )}
      </div>
    </div>
  );
}

export default AllCars;