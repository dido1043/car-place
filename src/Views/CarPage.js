import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BaseButton from '../Components/Shared/BaseButton';
import CarCard from "../Components/CarsCard";
import AddCarForm from '../Components/Forms/AddCarForm';
import '../assests/scss/carPage.scss'
import AddReviewForm from '../Components/Forms/AddReviewForm';


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
    const [currentReview, setCurrentReview] = useState(null)
    const navigateToAddReview = (editData) => {
        if (editData && isBtnEditReview) {
            navigate(`/allCars/cars/reviews/add/${car.id}`, {
                state: { editData }
            });
        } else {
            navigate(`/allCars/cars/reviews/add/${car.id}`);
        }
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
        setCurrentReview(review)
        console.log(review);

    }

    const deleteReview = async (review) => {
        try {
            if (!review) {
                console.error("No review selected for deletion.");
                return;
            }

            // Delete request to server
            await axios.delete(`${process.env.REACT_APP_API_KEY}/cars/reviews/delete/${review.id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });

            // Remove review locally to update the UI
            setReviews(prevReviews => prevReviews.filter(r => r.id !== review.id));
            setCurrentReview(null); // Reset currentReview after deletion

        } catch (error) {
            setHandleError({
                icon: "fi fi-rr-warning",
                status: "Error",
                message: error?.response?.data?.message || "Failed to delete the review."
            });
            console.error(error);
        }
    };
    //End review section
    const toggleEdit = () => {
        setIsBtnClicked(!isBtnClicked);


    }
    //Rent request

    const [request, setRequest] = useState({
        user: "",
        carId: 0
    });

    useEffect(() => {
        setRequest({
            user: localStorage.getItem("userId"),
            carId: currentCarId
        });
        console.log(request);
        
    },[currentCarId]);

    const handleRequest = async() =>{
        try {
            const response = axios.post(`${process.env.REACT_APP_API_KEY}/cars/requests/add`, request, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            console.log("Rent request submitted successfully:", response.data);
            
            return response.data; 
        } catch (error) {
            console.error("Error submitting rent request:", error);
            
        }
    }

    //Service records
    const redirectToServiceRecords = (carId) =>{
        navigate(`/allCars/cars/serviceRecords/all/${carId}`)
    }
    const redirectToAddServiceRecords = (carId) => {
        navigate(`/allCars/cars/serviceRecords/add/${carId}`)
    }
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
                        <div className='buttons'>
                            <BaseButton onClick={toggleEdit} text="Edit" />
                            <button onClick={deleteCar} className='del-btn mt-2 mb-2'>Delete</button>
                            <BaseButton onClick={() => redirectToAddServiceRecords(currentCarId)} text="Add Service Record"/>
                        </div> :
                        <>

                        </>
                    }


                </div> :
                <div>
                    <AddCarForm isEditable={isBtnClicked} carData={car}></AddCarForm>
                </div>
            }
            {!isBtnEditReview ?
                <div className="reviews bg-blue-500 text-white p-4 rounded-md flex justify-center items-center">
                    <div className="w-full max-w-2xl">
                        <h2 className="text-xxl font-semibold mb-4">Reviews</h2>
                        {localStorage.getItem('role') == 'Admin' ? <></> :
                            <div className='flex flex-row gap-2'>
                                <BaseButton onClick={navigateToAddReview} text="Add review"></BaseButton>
                                <BaseButton onClick={handleRequest} text="Rent" />
                                <BaseButton onClick={() => redirectToServiceRecords(currentCarId)} text="Service records" />
                            </div>

                        }
                        {reviews.map((review, id) => {
                            let result = review.carId == currentCarId ? (
                                <div key={id} className="bg-white text-blue-500 p-3 mb-2 rounded-md shadow-md">
                                    <p className="font-medium">
                                        {review.customer} - {review.content}
                                    </p>
                                    <span className="font-bold text-blue-700"> Rating: {review.rating}/10</span>
                                    {localStorage.getItem('user') == review.customer ? (
                                        <div className="flex flex-row">
                                            <BaseButton onClick={() => toggleEditReview(review)} text="Edit" className="mr-1.25" />
                                            <BaseButton onClick={() => deleteReview(review)} text="Delete" />
                                        </div>
                                    ) : (
                                        <></>
                                    )}
                                    
                                </div>
                                
                            ) : (
                                <></>
                            );
                            return result;
                        })}
                    </div>
                </div> :
                
                <div>
                    
                    <AddReviewForm isEditable={true} reviewData={currentReview} />
                </div>


            }


        </div >
    );
};

export default CarPage;