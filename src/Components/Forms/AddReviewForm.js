import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import axios from "axios";

import BaseButton from "../Shared/BaseButton";
import InputField from "../Shared/InputField";
import Label from '../Shared/Label';

function AddReviewForm({ isEditable, reviewData }) {
    const location = useLocation();
    const [reviewFormData, setReviewFormData] = useState({
        customer: localStorage.getItem('userId'),
        carId: 0,
        content: '',
        rating: 0,
    });

    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const pathParts = window.location.pathname.split('/');
    const carId = Number(pathParts[pathParts.length - 1]);
    useEffect(() => {
        if (isEditable) {
            setReviewFormData({
                customer: localStorage.getItem('userId'),
                carId: carId,
                content: reviewData.content,
                rating: reviewData.rating,
            })

        }
    },[isEditable, reviewData, carId]);
    // useEffect(() => {
    //     if (carId) {
    //         setReviewFormData((prevData) => ({
    //             ...prevData,
    //             carId: carId
    //         }));
    //     }

    //     if (location.state?.editData) {
    //         setReviewFormData({
    //             customer: localStorage.getItem('userId'),
    //             carId: carId,
    //             content: location.state.editData.content,
    //             rating: location.state.editData.rating,
    //         });
    //     }
    // }, [carId, location.state]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setReviewFormData({
            ...reviewFormData,
            [name]: name === "rating" ? parseInt(value) : value
        });
    };

    const validateErrors = () => {
        const errors = {};
        if (!reviewFormData.carId) errors.carId = "Invalid car!";
        if (!reviewFormData.content) errors.content = "Missing content!";
        if (!reviewFormData.rating) errors.rating = "Invalid rating!";
        if (Number(reviewFormData.rating) > 10) errors.rating = "Rating cannot be over 10";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const reviewFormErrors = validateErrors();
        if (Object.keys(reviewFormErrors).length === 0) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_KEY}/cars/reviews/add`, reviewFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                console.log(response);
                navigate(`/allCars`);
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(reviewFormErrors);
        }
    };

    const editReview = async (e) => {
        e.preventDefault();
       // console.log(location.state.editData.id);
        console.log(reviewFormData);
        //const temp = location.state.editData.id
        // const params = {
        //     ...reviewFormData,
        //     id: temp
        // }

        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/reviews/edit/${reviewData.id}`, reviewFormData,{
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            navigate(`/allCars`);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <form onSubmit={isEditable == true ? editReview : handleSubmit}>
                <Label text="Content" />
                <InputField
                    value={reviewFormData.content}
                    name="content"
                    onChange={handleChange}
                    placeholder="Content"
                    type="text"
                    error={errors.content}
                />
                <Label text="Rating" />
                <InputField
                    value={reviewFormData.rating}
                    name="rating"
                    onChange={handleChange}
                    placeholder="Rating"
                    type="number"
                    error={errors.rating}
                />
                {isEditable ? (
                    <BaseButton text="Edit" type="submit" className="btn-edit" />
                ) : (
                    <BaseButton text="Share" type="submit" />
                )}
            </form>
        </div>
    );
}

export default AddReviewForm;
