import React, { useEffect, useState } from 'react';
import './Home.css';
import axios from 'axios';

const Home = () => {
    const [selectedSection, setSelectedSection] = useState('recommendations');
    const [recommendations, setRecommendations] = useState([]);
    const [bucketList, setBucketList] = useState([]);
    const [visited, setVisited] = useState([]);
    const [currencies, setCurrencies] = useState([]);
    const [showAddDropdown, setShowAddDropdown] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('');

    useEffect(() => {
        //get users information from database
        const fetchInfo = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/home/get',
                    {},
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    }
                );

                if (response.status != 200) {
                    throw new Error('Failed to fetch user data');
                }

                const data = response.data;
                setRecommendations(data.recommendations || []);
                setBucketList(data.bucketList || []);
                setVisited(data.visited || []);
            } catch (e) {
                console.error('Error fetching user data:', e);
            }
        };

        //get currency details from the API
        const fetchCurrencies = async () => {
            try {
                const response = await axios.get('https://api.frankfurter.dev/v1/currencies');
                const data = await response.data;
                const currencyKeys = Object.keys(data);
                setCurrencies(currencyKeys);
            } catch (error) {
                console.error('Error fetching currencies:', error);
            }
        };

        fetchInfo();
        fetchCurrencies();
    }, []);

    //update database with new insertion
    const handleAddItem = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/home/add',
                { currency: selectedCurrency, section: selectedSection },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                if (selectedSection === 'bucket_list') setBucketList([...bucketList, selectedCurrency]);
                if (selectedSection === 'visited') setVisited([...visited, selectedCurrency]);
                setShowAddDropdown(false);
            } else {
                console.error('Failed to add item');
            }
        } catch (error) {
            console.error('Error adding item:', error);
        }
    };

    //update database with deletion
    const handleRemoveItem = async (item) => {
        const token = localStorage.getItem('token');
        try {
            const response = await axios.post(
                'http://localhost:5000/api/home/remove',
                { currency: item, section: selectedSection },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            if (response.status === 200) {
                if (selectedSection === 'bucket_list') setBucketList(bucketList.filter((i) => i !== item));
                if (selectedSection === 'visited') setVisited(visited.filter((i) => i !== item));
            } else {
                console.error('Failed to remove item');
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    return (
        <div className="home-container">
            <nav className="horizontal-navbar">
                <a href="/">VacatoinRecommender</a>
                <a href="/home">Home</a>
                <a href="/account">Account</a>
            </nav>
            <div className="home-content">
                <aside className="vertical-navbar">
                    {['recommendations', 'bucket_list', 'visited'].map((section) => (
                        <button
                            key={section}
                            onClick={() => setSelectedSection(section)}
                            className={selectedSection === section ? 'active' : ''}
                        >
                            {section.charAt(0).toUpperCase() + section.slice(1)}
                        </button>
                    ))}
                </aside>
                <main className="content-display">
                    <h2>{selectedSection.charAt(0).toUpperCase() + selectedSection.slice(1)}</h2>
                    <ul>
                        {(selectedSection === 'recommendations'
                            ? recommendations
                            : selectedSection === 'bucket_list'
                            ? bucketList
                            : visited
                        ).map((item, index) => (
                            <li key={index}>
                                {item}{' '}
                                {selectedSection !== 'recommendations' && (
                                    <button onClick={() => handleRemoveItem(item)}>Remove</button>
                                )}
                            </li>
                        ))}
                    </ul>
                    {selectedSection !== 'recommendations' && (
                        <div>
                            {showAddDropdown ? (
                                <div>
                                    <select
                                        value={selectedCurrency}
                                        onChange={(e) => setSelectedCurrency(e.target.value)}
                                    >
                                        <option value="" disabled>
                                            Select a currency
                                        </option>
                                        {currencies.map((currency) => (
                                            <option key={currency} value={currency}>
                                                {currency}
                                            </option>
                                        ))}
                                    </select>
                                    <button onClick={handleAddItem}>Add</button>
                                </div>
                            ) : (
                                <button onClick={() => setShowAddDropdown(true)}>Add Item</button>
                            )}
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
};

export default Home;
