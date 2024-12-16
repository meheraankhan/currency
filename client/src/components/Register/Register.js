import React, { useState, useEffect } from 'react';
import './Register.css';
import axios from 'axios';

const RegisterForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        nativeCurrency: '',
        visitedCurrencies: [],
        bucketListCurrencies: [],
    });

    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        //get currency list from API
        const getCurrencies = async () => {
            try {
                const response = await axios.get('https://api.frankfurter.dev/v1/currencies');
                const currencyKeys = Object.keys(response.data);
                setCurrencies(currencyKeys);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        getCurrencies();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleVisitedChange = (e) => {
        const { value } = e.target;
        if (value && !formData.visitedCurrencies.includes(value)) {
            setFormData({
                ...formData,
                visitedCurrencies: [...formData.visitedCurrencies, value],
            });
        }
    };

    const handleBucketChange = (e) => {
        const { value } = e.target;
        if (value && !formData.bucketListCurrencies.includes(value)) {
            setFormData({
                ...formData,
                bucketListCurrencies: [...formData.bucketListCurrencies, value],
            });
        }
    };

    const removeBucketCurrency = (currency) => {
        setFormData({
            ...formData,
            bucketListCurrencies: formData.bucketListCurrencies.filter((c) => c !== currency),
        });
    };

    //send all data to database
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', formData);

            if (response.status === 200) {
                console.log('Registration successful:', response.data);
            } else {
                console.error('Signup failed:', response.data);
            }
        } catch (e) {
            console.error(e);
        }
    };

    return (
        <form className="register-form" onSubmit={handleSubmit}>
            <h2>Register Form</h2>
            <label>First Name:</label>
            <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
            />
            <label>Last Name:</label>
            <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
            />
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
            <label>Native Currency:</label>
            <select
                name="nativeCurrency"
                value={formData.nativeCurrency}
                onChange={handleInputChange}
                required
            >
                <option value="">Select a currency</option>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <label>Visited Currencies:</label>
            <select name="visitedCurrencies" onChange={handleVisitedChange}>
                <option value="">Select a currency</option>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <ul>
                {formData.visitedCurrencies.map((currency, index) => (
                    <li key={index}>
                        {currency}
                        <button
                            className="remove-btn"
                            onClick={() =>
                                setFormData({
                                    ...formData,
                                    visitedCurrencies: formData.visitedCurrencies.filter(
                                        (cur) => cur !== currency
                                    ),
                                })
                            }
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>

            <label>Bucket List Currencies:</label>
            <select name="bucketListCurrencies" onChange={handleBucketChange}>
                <option value="">Select a currency</option>
                {currencies.map((currency) => (
                    <option key={currency} value={currency}>
                        {currency}
                    </option>
                ))}
            </select>
            <ul>
                {formData.bucketListCurrencies.map((currency, index) => (
                    <li key={index}>
                        {currency}{' '}
                        <button
                            type="button"
                            className="remove-btn"
                            onClick={() => removeBucketCurrency(currency)}
                        >
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <button type="submit">Register</button>
        </form>
    );
};

export default RegisterForm;
