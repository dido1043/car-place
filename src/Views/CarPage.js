import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseButton from '../Components/Shared/BaseButton';
import CarCard from "../Components/CarsCard";
import AddCarForm from '../Components/Forms/AddCarForm';

const CarPage = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        price: '',
        year: ''
    });
    const location = useLocation().state;
    const [car, setCar] = useState(location);

    const [isBtnClicked, setIsBtnClicked] = useState(false);
    let navigate = useNavigate();
    const [handleError, setHandleError] = useState({
        status: '',
        message: ''
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
            });
            setIsBtnClicked(true)
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
            navigate("/allCars")
            console.log(response);
        }).catch((error) => {
            setHandleError({
                icon: "fi fi-rr-warning",
                status: "Error",
                message: error?.response?.data?.message
            });
        });
    }

    const toggleEdit = () => {
        setIsBtnClicked(!isBtnClicked);
    }

    return (
        <div>
            {!isBtnClicked ?
                <div>
                    <img src={car.imageUrl} alt={`${car.make} ${car.model}`} />
                    <h1>{car.make}</h1>
                    <p>Model: {car.model}</p>
                    <p>Year: {car.year}</p>
                    <p>Price: {car.price}</p>
                    <BaseButton onClick={toggleEdit} text="Edit"> </BaseButton>
                    <BaseButton onClick={deleteCar} text="Delete"> </BaseButton>

                </div> :
                <div>
                    <AddCarForm></AddCarForm>
                </div>
            }

        </div>
    );
};

export default CarPage;