import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function AddReviewForm({ isEditable, reviewData }) {
    const [reviewFormData, setReviewFormData] = useState({
        carId: 0,
        content: '',
        rating: 0,
    });
    //Take current carId from the page of the car (url)!!!
    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        const carId = pathParts[pathParts.length-1];
        console.log(carId);
        
        if (isEditable) {
            setReviewFormData({  
                carId: Number(carId),
                content: reviewData.content,
                rating: reviewData.rating,
            })  
        }
    },[isEditable])
    let navigate = useNavigate();
    const [errors, setErrors] = useState({});


}
export default AddReviewForm;