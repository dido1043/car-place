import React, { useState, useEffect } from "react"
import CarCard from "../Components/CarsCard"
import axios from 'axios'
import { Link } from "react-router-dom"
import BaseButton from "../Components/Shared/BaseButton"
function SortedCarsByPrice() {
    const [sortedCars, setSortedCars] = useState([]);
    useEffect(() => {
        const sorted = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/cars/sorted`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });

                setSortedCars(response.data)
                console.log(response.data);

            } catch (error) {
                console.log(error);

            }
        }

        sorted();
    }, []);
    return (
        <div className="text-center">
            <h2>Sorted by price</h2>
            <div className="all-cars place-content-center">

                {sortedCars.length > 0 ? (
                    sortedCars.map((car, index) => (
                        <div key={index} className="m-4">
                            <Link to={{
                                pathname: `/allCars/cars/${car.id}`
                            }}
                                state={car}
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
export default SortedCarsByPrice;