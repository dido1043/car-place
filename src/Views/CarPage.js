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

    const editCar = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/${car.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCar = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_KEY}/cars/${car.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <div>
                <img src={car.imageUrl} />
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