import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import Label from "../Shared/Label";
import InputField from "../Shared/InputField";
import axios from "axios";
import BaseButton from "../Shared/BaseButton";

function AddCarForm({ isEditable, carData }) {
    const [carFormData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        imageUrl: '',
        hp: '',
        description: ''
    });

    const [imagePreview, setImagePreview] = useState(''); // For displaying image preview
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    useEffect(() => {
        if (isEditable) {
            setCarData({
                make: carData.make,
                model: carData.model,
                year: carData.year,
                price: carData.price,
                imageUrl: carData.imageUrl,
                hp: carData.hp,
                description: carData.description
            });
            setImagePreview(carData.imageUrl); // Set preview for existing car
        }
    }, [isEditable]);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCarData({
            ...carFormData,
            [name]: name === "year" ? parseInt(value, 10) : name === "price" ? parseFloat(value) : value
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setCarData((prev) => ({ ...prev, imageUrl: reader.result })); // Save Base64 string
                setImagePreview(reader.result); // Display preview
            };

            reader.readAsDataURL(file); // Read file as Base64 string
        }
    };

    const validateErrors = () => {
        const errors = {};
        if (!carFormData.make) errors.make = "Invalid car brand!";
        if (!carFormData.model) errors.model = "Invalid car model!";
        if (!carFormData.price) errors.price = "Invalid car price!";
        if (!carFormData.year) errors.year = "Invalid year of creation!";
        if (!carFormData.imageUrl) errors.imageUrl = "Invalid image!";
        if (!carFormData.hp) errors.hp = "Invalid car hp!";
        if (!carFormData.description) errors.description = "Invalid description!";
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors([]);
        const carFormErrors = validateErrors();
        if (Object.keys(carFormErrors).length === 0) {
            try {
                const response = await axios.post(`${process.env.REACT_APP_API_KEY}/cars/add`, carFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                console.log("Car added successfully:", response.data);
                setCarData({
                    make: '',
                    model: '',
                    year: '',
                    price: '',
                    imageUrl: '',
                    hp: '',
                    description: ''
                });
                setImagePreview(''); // Reset image preview
                navigate('/allCars');
            } catch (error) {
                console.error("Error adding car:", error);
            }
        } else {
            setErrors(carFormErrors);
        }
    };

    const editCar = async (e) => {
        e.preventDefault()
        // Create a FormData object
        const formData = new FormData();

        // Append the car form fields to FormData
        formData.append("make", carFormData.make);
        formData.append("model", carFormData.model);
        formData.append("year", carFormData.year);
        formData.append("price", carFormData.price);
        formData.append("hp", carFormData.hp);
        formData.append("description", carFormData.description);

        // If a new image is selected, append it to FormData
        const fileInput = document.querySelector('input[type="file"]');
        if (fileInput && fileInput.files[0]) {
            formData.append("image", fileInput.files[0]);  // Add new image file
        } else {
            // If no new image is selected, send the existing imageUrl (existing image from the server)
            formData.append("imageUrl", carFormData.imageUrl);
        }


       
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/edit/${carData.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navigate('/allCars')
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <form onSubmit={isEditable ? editCar : handleSubmit}>
                <Label text="Brand" />
                <InputField
                    value={carFormData.make}
                    name="make"
                    onChange={handleChange}
                    placeholder="Brand"
                    type="text"
                    error={errors.make}
                />
                <Label text="Model" />
                <InputField
                    value={carFormData.model}
                    name="model"
                    onChange={handleChange}
                    placeholder="Model"
                    type="text"
                    error={errors.model}
                />
                <Label text="Year" />
                <InputField
                    value={carFormData.year}
                    name="year"
                    onChange={handleChange}
                    placeholder="Year"
                    type="text"
                    error={errors.year}
                />
                <Label text="Price" />
                <InputField
                    value={carFormData.price}
                    name="price"
                    onChange={handleChange}
                    placeholder="Price"
                    type="text"
                    error={errors.price}
                />
                <Label text="Image" />
                <input
                    type="file"
                    onChange={handleFileChange}
                    accept="image/*"
                />
                {imagePreview && (
                    <img
                        src={imagePreview}
                        alt="Car preview"
                        style={{ width: '100px', height: '100px', marginTop: '10px' }}
                    />
                )}
                <br />
                <Label text="HP" />
                <InputField
                    value={carFormData.hp}
                    name="hp"
                    onChange={handleChange}
                    placeholder="HP"
                    type="text"
                    error={errors.hp}
                />
                <Label text="Description" />
                <InputField
                    value={carFormData.description}
                    name="description"
                    onChange={handleChange}
                    placeholder="Description"
                    type="text"
                    error={errors.description}
                />
                <BaseButton text={isEditable ? "Edit" : "Add"} type="submit" />
            </form>
        </div>
    );
}

export default AddCarForm;
