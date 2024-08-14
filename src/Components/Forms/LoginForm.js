import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import Label from '../Shared/Label';
import BaseButton from '../Shared/BaseButton'
import InputField from '../Shared/InputField';
import StatusComponent from '../Shared/StatusComponent';
function LoginForm() {


    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = async (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        })
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(null);
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
            <div className="header flex justify-center items-center">
                <h2 >Login</h2>
            </div>
            <form onSubmit={handleLogin}>
                <Label text='Email:' />
                <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" type="text" />
                <Label text='Password:' />
                <InputField name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" type="password" />
                <div className="flex justify-center items-center mt-2">
                    <BaseButton text="Submit" type="submit" />
                </div>
            </form>
        </div>
    )
}
export default LoginForm