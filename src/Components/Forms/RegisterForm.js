import React, { useState } from 'react';
import axios from 'axios'
import Label from '../Shared/Label';
import BaseButton from '../Shared/BaseButton'
import InputField from '../Shared/InputField';
function RegisterForm() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]: value,
        });
        console.log(e.target);
    };

    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };

    const handleSubmit = (e) => {
        setErrors([]);
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = axios.post(`${process.env.REACT_APP_API_KEY}/register`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '*/*'
                    }
                })
                console.log(response);
                
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="register-form">
            <h2 className="header">Register</h2>
            <form onSubmit={handleSubmit} className='flex flex-col'>
                <Label text='Email'/>
                <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" type="text" error={errors.email}/>
                <Label text='Password'/>
                <InputField name="password" value={formData.password} onChange={handleChange} placeholder="Enter email" type="password" error={errors.password}/>
                <BaseButton text="Submit" type="submit"/>
            </form>
        </div>
    )
}

export default RegisterForm