import React, { useState } from "react";
import Label from "../Shared/Label";
import InputField from "../Shared/InputField";
import axios from "axios";

function AddCarForm() {
    const [carFormData, setCarData] = useState({
        make: '',
        model: '',
        price: '',
        year: ''
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCarData({
            ...carFormData,
            [name]: value,
        });

    }
    //Error validations 
    const validateErrors = () => {
        const errors = {};
        if (!carFormData.make) errors.make = "Invalid car brand!"
        if (!carFormData.model) errors.model = "Invalid car model!"
        if (!carFormData.price) errors.price = "Invalid car price!"
        if (!carFormData.year) errors.year = "Invalid year of creation!"

        return errors;

    }
    //Submit method -> 1.Reset errors 2.submit form with "PreventDefault" 3.Check for errors 
    const handleSubmit = (e) => {
        setErrors([])
        e.preventDefault();
        const carFormErrors = validateErrors();
        if (Object.keys(carFormErrors).length === 0) {
            try {
                const response = axios.post(`${process.env.REACT_APP_API_KEY}/cars/all`, carFormData, {
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

            </form>
        </div>

    )

}
export default AddCarForm