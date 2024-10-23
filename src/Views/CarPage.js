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
        year: '',
        imageUrl: '',
        hp: '',
        description: ''
    });
    const location = useLocation().state;
    const [car, setCar] = useState(location);

    const [isBtnClicked, setIsBtnClicked] = useState(false);
    const navigate = useNavigate();
    const [handleError, setHandleError] = useState({
        status: '',
        message: ''
    });
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        const pathParts = window.location.pathname.split('/');
        //console.log(pathParts);
        if (location) {
            setCar(location);
        }
    }, [location]);

    const [role, setRole] = useState(() => localStorage.getItem('role'))

    const deleteCar = () => {
        new Promise((resolve, reject) => {
            axios.delete(`${process.env.REACT_APP_API_KEY}/cars/delete/${car.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }).then(response => resolve(response))
                .catch(error => {
                    reject(error)

                })
        }).then((response) => {
            navigate("/allCars")
            //console.log(response);
        }).catch((error) => {
            setHandleError({
                icon: "fi fi-rr-warning",
                status: "Error",
                message: error?.response?.data?.message
            });
        });
    }
    //Reviews section 
    const pathParts = window.location.pathname.split('/');
    const currentCarId = pathParts[pathParts.length - 1];

    const [reviews, setReviews] = useState([]);
    const [isBtnEditReview, setIsBtnEditReview] = useState(false)
    const navigateToAddReview = (editData) => {
        if (editData) {
            navigate(`/allCars/cars/reviews/add/${car.id}`, {
                data: editData
            })
        }
        navigate(`/allCars/cars/reviews/add/${car.id}`)
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_KEY}/cars/reviews/all`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });

                setReviews(response.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchReviews();

    }, [currentCarId]);



    const toggleEditReview = (review) => {
        setIsBtnEditReview(!isBtnEditReview);
        navigateToAddReview(review)
        // console.log(isBtnEditReview);
    }
    //End review section
    const toggleEdit = () => {
        setIsBtnClicked(!isBtnClicked);


    }
    //TODO: Reviews
    return (

        <div>
            {!isBtnClicked ?
                <div className='container-page'>
                    {car.imageUrl && <img src={car.imageUrl} alt={`${car.make} ${car.model}`} className='car-img' />}
                    <h1>{car.make}</h1>
                    <ul>
                        <li>Model: {car.model}</li>
                        <li>Year: {car.year}</li>
                        <li>Price: {car.price}$</li>
                        <li>Horse Powers: {car.hp}</li>
                    </ul>
                    <div className='description-box'>{car.description}</div>
                    {role == "Admin" ?
                        <>
                            <BaseButton onClick={toggleEdit} text="Edit"> </BaseButton>
                            <BaseButton onClick={deleteCar} text="Delete"> </BaseButton>
                        </> :
                        <>
                            <BaseButton onClick={navigateToAddReview} text="Add review"></BaseButton>
                        </>
                    }

                    <div className='reviews bg-blue-500 text-white p-4 rounded-md'>
                        <h2 className='text-xxl font-semibold mb-4'>Reviews</h2>
                        {reviews.map((review, id) => {
                            let result = review.carId == currentCarId ? (
                                <div key={id} className='bg-white text-blue-500 p-3 mb-2 rounded-md shadow-md'>
                                    <p className='font-medium'>
                                        {review.customer} - {review.content}
                                    </p>
                                    <span className='font-bold text-blue-700'> Rating: {review.rating}/10</span>
                                    {localStorage.getItem('user') == review.customer ?
                                        <div>
                                            <BaseButton onClick={toggleEditReview(review)} text="Edit" />
                                            <BaseButton text="Delete" />

                                        </div>
                                        :
                                        <></>
                                    }
                                </div>
                            ) : (
                                <></>
                            );
                            return result;
                        })}
                    </div>

                </div> :
                <div>
                    <AddCarForm isEditable={isBtnClicked} carData={car}></AddCarForm>
                </div>
            }

        </div >
    );
};

export default CarPage;