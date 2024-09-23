import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
function AddReviewForm({ isEditable, reviewData }) {
    const [reviewData, setReviewData] = useState({
        carId: 0,
        content: '',
        rating: 0,
    });
    useEffect(() => {
        if (isEditable) {
            setReviewData({
               
                content: reviewData.content,
                rating: reviewData.rating
            })
        }
    })

}
export default AddReviewForm;