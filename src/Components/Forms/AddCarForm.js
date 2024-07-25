import React, { useState } from "react";
import Label from "../Shared/Label";
import InputField from "../Shared/InputField";
import axios from "axios";
import BaseButton from "../Shared/BaseButton";
function AddCarForm() {
    const [carFormData, setCarData] = useState({
        make: '',
        model: '',
        year: '',
        price: '',
        imageUrl: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCarData({
            ...carFormData,
            [name]: name == "year" ? parseInt(value, 10) : name == "price" ? parseFloat(value) : value
        });


    }
    //Error validations 
    const validateErrors = () => {
        const errors = {};
        if (!carFormData.make) errors.make = "Invalid car brand!"
        if (!carFormData.model) errors.model = "Invalid car model!"
        if (!carFormData.price) errors.price = "Invalid car price!"
        if (!carFormData.year) errors.year = "Invalid year of creation!"
        if (!carFormData.imageUrl) errors.year = "Invalid image url!"
        return errors;

    }
    //Submit method -> 1.Reset errors 2.submit form with "PreventDefault" 3.Check for errors 
    const handleSubmit = (e) => {
        setErrors([])
        e.preventDefault();
        const carFormErrors = validateErrors();
        if (Object.keys(carFormErrors).length === 0) {
            try {
                const response = axios.post(`${process.env.REACT_APP_API_KEY}/cars/add`, carFormData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                });
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(carFormErrors)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <Label text="Brand" />
                <InputField value={carFormData.make} name="make"
                    onChange={handleChange} placeholder="Brand" type="text" error={errors.make} />
                <Label text="Model" />
                <InputField value={carFormData.model} name="model"
                    onChange={handleChange} placeholder="Model" type="text" error={errors.model} />
                <Label text="Year" />
                <InputField value={carFormData.year} name="year"
                    onChange={handleChange} placeholder="Year" type="text" error={errors.year} />
                <Label text="Price" />
                <InputField value={carFormData.price} name="price"
                    onChange={handleChange} placeholder="Price" type="text" error={errors.price} />
                <Label text="Image URL" />
                <InputField value={carFormData.imageUrl} name="imageUrl"
                    onChange={handleChange} placeholder="ImageUrl" type="text" error={errors.imageUrl} />

                <BaseButton text="Submit" type="submit" />
            </form>
        </div>

    )

}
export default AddCarForm