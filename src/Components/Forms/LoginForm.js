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
        message: ''
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
    const getUserRole = async (email) => {
        try {
            const params = {
                email: email
            };
            console.log(params);

            const response = await axios.get(`${process.env.REACT_APP_API_KEY}/me`, {
                params: params,
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            });
            //console.log(response.data);
            
            
            localStorage.setItem('role', response.data);

            navigate('/allCars');
        } catch (error) {
            console.error('Error data:', error);
        }
    }
    const handleLogin = async (e) => {
        setError([])
        e.preventDefault();
        const formErrors = validateForm();
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_KEY}/login`, formData);
            if (response.status === 200) {
                localStorage.setItem('token', `Bearer ${response.data.accessToken}`);
                //console.log("Session ->"+session);
                
                getUserRole(formData.email);
                //window.location.reload(true);
            } else {
                setError('Login failed. Please try again.');
            }
            
            //console.log(response.data.accessToken);
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