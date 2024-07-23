import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BaseButton from '../Components/Shared/BaseButton';
import CarCard from "../Components/CarsCard";

const CarPage = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        price: '',
        year: ''
    });
    const location = useLocation().state;
    const [car, setCar] = useState(location);

    useEffect(() => {
        if (location) {
            setCar(location);
        }
    }, [location]);



    return (
        <div>
            <div>
                <img src={car.imageUrl}/>
                <h1>{car.make}</h1>
                <p>Model: {car.model}</p>
                <p>Year: {car.year}</p>
                <p>Price: {car.price}</p>
            </div>
            {/* <BaseButton onClick={editCar()} text="Edit"> </BaseButton> /}
            {/ <BaseButton onClick={deleteCar()} text="Delete"> </BaseButton> */}
        </div>
    );
};

export default CarPage;