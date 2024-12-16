import React, { useEffect, useState } from 'react';
import './Account.css';
import axios from 'axios';

const Account = () => {
    //users information
    const [userInfo, setUserInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    const [updatedInfo, setUpdatedInfo] = useState({
        firstName: '',
        lastName: '',
        email: '',
    });

    useEffect(() => {
        //get users information from the database
        const fetchUserInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/account/get',
                    {},
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`,
                        },
                    }
                );

                const data = response.data;
                setUserInfo({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                });
                setUpdatedInfo({
                    firstName: data.firstName || '',
                    lastName: data.lastName || '',
                    email: data.email || '',
                });
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedInfo((prev) => ({ ...prev, [name]: value }));
    };

    //send the new information to the databse
    const handleSave = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/account/update',
                updatedInfo,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setUserInfo(updatedInfo);
                alert('User information updated successfully.');
            } else {
                console.error('Failed to update user info');
            }
        } catch (error) {
            console.error('Error updating user info:', error);
        }
    };

    return (
        <div className="account-container">
            <nav className="horizontal-navbar">
                <a href="/">VacatoinRecommender</a>
                <a href="/home">Home</a>
                <a href="/account" className="active">Account</a>
            </nav>
            <div className="account-content">
                <h2>Account Information</h2>
                <table className="account-table">
                    <thead>
                        <tr>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{userInfo.firstName}</td>
                            <td>{userInfo.lastName}</td>
                            <td>{userInfo.email}</td>
                        </tr>
                        <tr>
                            <td>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={updatedInfo.firstName}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    name="lastName"
                                    value={updatedInfo.lastName}
                                    onChange={handleInputChange}
                                />
                            </td>
                            <td>
                                <input
                                    type="email"
                                    name="email"
                                    value={updatedInfo.email}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <button className="save-button" onClick={handleSave}>Save</button>
            </div>
        </div>
    );
};

export default Account;
