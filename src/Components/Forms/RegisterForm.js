import React, { useState } from 'react';
import axios from 'axios'
import Label from '../Shared/Label';
import BaseButton from '../Shared/BaseButton'
import InputField from '../Shared/InputField';
import "../../assests/scss/register.scss"
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
            <div className='box'>
                <div className="header flex justify-center items-center">
                    <h2 >Register</h2>

                </div>
                <div className='body'>
                    <form onSubmit={handleSubmit} className='form'>
                        <Label text='Email' />
                        <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" type="text" error={errors.email} />
                        <Label text='Password' />
                        <InputField name="password" value={formData.password} onChange={handleChange} placeholder="Enter email" type="password" error={errors.password} />
                        <BaseButton text="Submit" type="submit" />
                    </form>
                </div>

            </div>
        </div>

    )
}

export default RegisterForm