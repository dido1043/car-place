import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import BaseButton from '../Components/Shared/BaseButton';

const CarPage = ({ car }) => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        price: '',
        year: ''
    });

    useEffect(() => {
        setFormData(car)
    }, [])

    const { id } = useParams();

    const deleteCar = (id) => {
        try {
            const response = axios.delete(`${process.env.REACT_APP_API_KEY}/cars/delete/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            })
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }

    const editCar = (id) => {
        try {
            const response = axios.put(`${process.env.REACT_APP_API_KEY}/cars/edit/${id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            })
            console.log(response);

        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <h1>Car Details for ID: {id}</h1>
            <BaseButton onClick={editCar()} text="Edit"> </BaseButton>
            <BaseButton onClick={deleteCar()} text="Delete"> </BaseButton>
        </div>
    );
};

export default CarPage