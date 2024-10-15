import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

import BaseButton from "../Shared/BaseButton";
import InputField from "../Shared/InputField";
import Label from '../Shared/Label';

function AddReviewForm({ isEditable, reviewData }) {
    const [reviewFormData, setReviewFormData] = useState({
        customer: localStorage.getItem('userId'),
        carId: 0,
        content: '',
        rating: 0,
    });
    const [isBtnClicked, setIsBtnClicked] = useState(false);
    //Take current carId from the page of the car (url)!!!
    const pathParts = window.location.pathname.split('/');
    const carId = Number(pathParts[pathParts.length - 1]);
    useEffect(() => {

        console.log(carId);
        // Ensure carId is correctly set in form data
        if (carId) {
            setReviewFormData((prevData) => ({
                ...prevData,
                carId: carId
            }));
        }
        if (isEditable) {
            setReviewFormData({
                customer: localStorage.getItem('userId'),
                carId: carId,
                content: reviewData.content,
                rating: reviewData.rating,
            })
        }
    }, [isEditable])
    let navigate = useNavigate();

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReviewFormData({
            ...reviewFormData,
            [name]: name == "rating" ? parseInt(value) : value
        });
    }

    const validateErrors = () => {
        const errors = {};
        if (!reviewFormData.carId) errors.carId = "Invalid car!";
        if (!reviewFormData.content) errors.content = "Missing content!";
        if (!reviewFormData.rating) errors.rating = "Invalid rating!";
        if (Number(reviewFormData.rating) > 10) errors.rating = "Rating cannot be over 10";
        return errors;
    }
    const editReview = async (e) => {
        e.preventDefault()
        const params = new URLSearchParams(reviewFormData).toString();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/reviews/edit/${reviewData.id}?${params}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
    const handleSubmit = async (e) => {
        setErrors([])
        e.preventDefault();
        const reviewFormErrors = validateErrors();
        //if (Object.keys(reviewFormErrors).length === 0) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/cars/reviews/add`, reviewFormData, {
                header: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            console.log(response);

            setReviewFormData({
                customer: localStorage.getItem('userId'),
                carId: carId,
                content: '',
                rating: '',
            })
            navigate(`/allCars`)
        } catch (error) {
            console.log(error);
        }
        //} else {
        //     setErrors(reviewFormErrors);
        //}
    }
    return (
        <div>
            <form onSubmit={isEditable ? editReview : handleSubmit}>
                <Label text="Content" />
                <InputField value={reviewFormData.content} name="content"
                    onChange={handleChange} placeholder="Content" type="text" error={errors.content} />
                <Label text="Rating" />
                <InputField value={reviewFormData.rating} name="rating"
                    onChange={handleChange} placeholder="Rating" type="text" error={errors.rating} />
                {isEditable ?
                    <BaseButton text="Edit" type="submit" className="btn-edit"/> :
                    <BaseButton text="Share" type="submit" />
                }
            </form>
        </div>
    );

}
export default AddReviewForm;