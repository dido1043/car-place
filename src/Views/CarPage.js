import React, { useState, useEffect, useRef } from 'react';
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

    const [isCarDeleted, setIsCarDeleted] = useState(false);
    //const isBtnActiveRef = useRef(0)
    const [handleError, setHandleError] = useState({
        status:'',
        message:''
    });
    const [errors, setErrors] = useState([]);


    useEffect(() => {
        if (location) {
            setCar(location);
        }
    }, [location]);

    const editCar = async () => {
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/edit/${car.id}`, formData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }).then();
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    const deleteCar = () => {
        
        new Promise((resolve, reject) => {
            axios.delete(`${process.env.REACT_APP_API_KEY}/cars/delete/${car.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }).then(response => resolve(response))
            .catch(error => reject(error))
        }).then((response) => {
            setIsCarDeleted(true)
            console.log(response);
        }).catch((error) => {
            setHandleError({
                icon: "fi fi-rr-warning",
                status: "Error",
                message: error?.response?.data?.message
            });
        })
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
            {/** TODO: Delete Btn-> If button is clicked button-disabled 
             * Axios.delete
             * then(if(success)-> redirect to all cars)
             * catch(return error) remove disabled btn)
            */}
            {<BaseButton onClick={editCar()} text="Edit"> </BaseButton> 
            <BaseButton onClick={deleteCar()} text="Delete"> </BaseButton>} 
        </div>
    );
};

export default CarPage;