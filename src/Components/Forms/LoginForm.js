import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Label from '../Shared/Label';
import BaseButton from '../Shared/BaseButton'
import InputField from '../Shared/InputField';
import StatusComponent from '../Shared/StatusComponent';
import "../../assests/scss/login.scss";
function LoginForm() {


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState({
        message:''
    });
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const validateForm = () => {
        const errors = {};
        if (!formData.email) errors.email = 'Email is required';
        if (!formData.password) errors.password = 'Password is required';
        return errors;
    };
    const handleLogin = async (e) => {
        setError([])
        e.preventDefault();
        const formErrors = validateForm();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/login`, formData);
            if (response.status === 200) {
                // Assuming the API returns a token and/or user data
                localStorage.setItem('token', response.data.token);
                // Redirect to another page after login
                navigate('/cars');
            } else {
                setError('Login failed. Please try again.');
            }
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.message || 'Login failed. Please try again.');
            } else {
                setError('An error occurred. Please try again later.');
            }
        }
    }
    return (
        <div className="login-form">
            <div className="box">
                <div className="header flex justify-center items-center">
                    <h2 >Login</h2>
                </div>
                <div className='body'>
                    <form onSubmit={handleLogin} className="form">
                        <Label text='Email:' />
                        <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" type="text" />
                        <Label text='Password:' />
                        <InputField name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" type="password" />
                        <div className="flex justify-center items-center mt-2">
                            <BaseButton text="Submit" type="submit" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default LoginForm