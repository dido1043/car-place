import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseButton from '../Components/Shared/BaseButton';
import CarCard from "../Components/CarsCard";
import AddCarForm from '../Components/Forms/AddCarForm';
import '../assests/scss/carPage.scss'
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
                <div className='container-page'>
                    <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className='car-img'/>
                    <h1>{car.make}</h1>
                    <ul>
                        <li>Model: {car.model}</li>
                        <li>Year: {car.year}</li>
                        <li>Price: {car.price}$</li>

                    </ul>
                    <BaseButton onClick={toggleEdit} text="Edit"> </BaseButton>
                    <BaseButton onClick={deleteCar} text="Delete"> </BaseButton>

                </div> :
                <div>
                    <AddCarForm isEditable={isBtnClicked} carData={car}></AddCarForm>
                </div>
            }

        </div>
    );
};

export default CarPage;