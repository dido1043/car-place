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
    useEffect(() => {
        console.log("OK!");
        

        if (isEditable) {
            setCarData({
                make: carData.make,
                model: carData.model,
                year: carData.year,
                price: carData.price,
                imageUrl: carData.imageUrl,
                hp: carData.hp,
                description: carData.description
            })
        }
    }, [isEditable])
    let navigate = useNavigate();

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
        if (!carFormData.imageUrl) errors.imageUrl = "Invalid image url!"
        if (!carFormData.hp) errors.hp = "Invalid car hp!"
        if (!carFormData.description) errors.description = "Invalid description!"
        return errors;

    }
    const editCar = async (e) => {
        e.preventDefault()
        const params = new URLSearchParams(carFormData).toString()
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_KEY}/cars/edit/${carData.id}?${params}`, null, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            navigate('/allCars')
            console.log(response);
        } catch (error) {
            console.log(error);
        }
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
                setCarData({
                    make: '',
                    model: '',
                    year: '',
                    price: '',
                    imageUrl: '',
                    hp: '',
                    description: ''
                })
                console.log(response);

                navigate('/allCars')
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(carFormErrors)
        }

    }


    return (
        <div>
            <form onSubmit={(isEditable ? editCar : handleSubmit)}>

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
                <Label text="HP" />
                <InputField value={carFormData.hp} name="hp"
                    onChange={handleChange} placeholder="HP" type="text" error={errors.hp} />
                <Label text="Description" />
                <InputField value={carFormData.description} name="description"
                    onChange={handleChange} placeholder="Description" type="text" error={errors.description} />
                {isEditable ?
                    <BaseButton text="Edit" type="submit" /> :
                    <BaseButton text="Add" type="submit" />
                }

            </form>
        </div>

    )
}
export default AddCarForm