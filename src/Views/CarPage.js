import React, { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios'
import BaseButton from '../Components/Shared/BaseButton';
import CarCard from "../Components/CarsCard"


const CarPage = () => {
    const [formData, setFormData] = useState({
        make: '',
        model: '',
        price: '',
        year: ''
    });
    const { id } = useParams();
    const car = useLocation().state;
   
    console.log(car);
    //const deleteCar = (id) => {
    //    try {
    //        const response = axios.delete(`${process.env.REACT_APP_API_KEY}/cars/delete/${id}`, {
    //            headers: {
    //                'Content-Type': 'application/json',
    //                'Accept': '*/*'
    //            }
    //        })
    //        console.log(response);
//
    //    } catch (error) {
    //        console.log(error);
   //     }
    //}

    //const editCar = (id) => {
    //    try {
    //        const response = axios.put(`${process.env.REACT_APP_API_KEY}/cars/edit/${id}`, {
    //            headers: {
    //                'Content-Type': 'application/json',
    //                'Accept': '*/*'
    //            }
    //        })
    //        console.log(response);
//
    //    } catch (error) {
    //        console.log(error);
    //    }
    //}
    //setFormData(car)

    return (
        <div>
            {/* <CarCard car={car} /> */}
            <div>{car}</div>
            {/* <BaseButton onClick={editCar()} text="Edit"> </BaseButton> */}
            {/* <BaseButton onClick={deleteCar()} text="Delete"> </BaseButton> */}
        </div>
    );
};

export default CarPage