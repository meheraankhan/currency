const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); 
const axios = require('axios');
const router = express.Router();

router.post('/', async(req, res) => {
    const {firstName, lastName, email, password, nativeCurrency, visitedCurrencies, bucketListCurrencies} = req.body;
    try {
        const emailCheckQuery = `SELECT * FROM user_info WHERE email = $1`;
        const check = await db.query(emailCheckQuery, [email]);
        if (check.rows.length > 0) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const apiUrl = `https://api.frankfurter.dev/v1/latest?base=${nativeCurrency}`;
        const response = await axios.get(apiUrl);
        const recommendations = Object.entries(response.data.rates)
            .filter(([_, value]) => value > 1) // Filter by value > 1
            .map(([currency]) => currency); // Extract only the currency code
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const insertQuery = 'INSERT INTO user_info (first_name, last_name, email, password, currency, recommendations, bucket_list, visited) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)'
        await db.query(insertQuery, [firstName, lastName, email, hashedPassword, nativeCurrency, recommendations, bucketListCurrencies, visitedCurrencies]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (e) {
        console.error("error during register");
        res.status(500).json({ message: 'An error occurred during registration', error: e.message});
    }
});
module.exports = router;