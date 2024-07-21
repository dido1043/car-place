import React, { useState } from 'react';

function RegisterForm() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',

    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
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
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length === 0) {
            try {
                const response = fetch('https://localhost:7290/register',
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': '*/*'
                        },
                        body: JSON.stringify(formData)

                    }
                )
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-xl font-bold mb-4 mt-2">Register</h2>
            <form onSubmit={handleSubmit} >
                {/* TODO: create component Label(expect text) Input field(expect value,name,onChange="handleChange",palceholder) and button */}
            </form>
        </div>
    )
}

export default RegisterForm