import React, { useState } from 'react';
import axios from 'axios'
import Label from '../Shared/Label';
import BaseButton from '../Shared/BaseButton'
import InputField from '../Shared/InputField';
import "../../assests/scss/register.scss"
import StatusComponent from '../Shared/StatusComponent';
function RegisterForm() {
    
    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });

    const [errors, setErrors] = useState({});

    const [handleError, setHandleError] = useState({
        status: '',
        message: ''
    });
    const [register, setRegister] = useState(false);
    // TODO: Add same for success message
    const [handleSuccess, setHandleSuccess] = useState({
        icon: 'fi fi-success',
        status: 'Success',
        message: 'Successful register!'
    })

    const handleChange = (e) => {
        const name = e.target.name
        const value = e.target.value
        setFormData({
            ...formData,
            [name]: value,
        });
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
            new Promise((resolve, reject) => {
                axios.post(`${process.env.REACT_APP_API_KEY}/register`, formData, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': '/'
                    }
                })
                    .then(response => resolve(response))
                    .catch(error => reject(error));
            }).then((response) => {
                setHandleSuccess({
                    icon: 'fi fi-success',
                    status: 'Success',
                    message: 'Successful register!'
                })
                setRegister(true);
                console.log(handleSuccess);
                console.log(response);
            }).catch((error) => {
                setHandleError({
                    icon: "fi fi-rr-warning",
                    status: "Error",
                    message: error?.response?.data?.message
                });
            });
            setFormData({
                email: '',
                password: '',

            })
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
                        <Label text='Email:' />
                        <InputField name="email" value={formData.email} onChange={handleChange} placeholder="Enter email" type="text" error={errors.email} />
                        <Label text='Password:' />
                        <InputField name="password" value={formData.password} onChange={handleChange} placeholder="Enter password" type="password" error={errors.password} />
                        {/* TODO: ADD ERROR/SUCCESS COMPONENT (Expet error={handleError}" success...) */}
                        {/* TODO: component ->  https://prnt.sc/s3fjjVjetFC3 */}
                            {register?
                                <StatusComponent icon={handleSuccess.icon} status={handleSuccess.status} message={handleSuccess.message} />
                                 : <StatusComponent icon={handleError.icon} status={handleError.status} message={handleError.message} />
                            }
                        <div className="flex justify-center items-center mt-2">                            
                            <BaseButton text="Submit" type="submit" />
                        </div>


                    </form>
                </div>

            </div >
        </div >

    )
}

export default RegisterForm