import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';

const LoginForm = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    //send users info to the database
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            console.error("no email or password");
        }
        try {
            const response = await axios.post('http://localhost:5000/api/login', {
                email: formData.email,
                password: formData.password,
            });

            localStorage.setItem('token', response.data.token);
            window.location.href = "/home";

        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
            />
            <label>Password:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
            />
            <button type="submit">Login</button>
        </form>
    );
};

export default LoginForm;
