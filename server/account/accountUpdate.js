const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Token not found' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err || !decoded?.email) {
            return res.status(403).json({ message: 'Invalid token' });
        }

        req.user = decoded;
        next();
    });
};

router.post('/', authenticateToken, async (req, res) => {
    const currEmail = req.user.email; // Current email from the token
    const { firstName, lastName, email } = req.body; // New data from the request body

    try {
        // Update query
        const updateQuery = `
            UPDATE user_info
            SET first_name = $1, last_name = $2, email = $3
            WHERE email = $4
        `;

        // Execute the query
        const result = await db.query(updateQuery, [firstName, lastName, email, currEmail]);

        if (result.rowCount === 0) {
            // If no rows were updated, return a not found response
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        // Success response
        res.status(200).json({ message: 'User information updated successfully' });
    } catch (e) {
        // Handle errors
        res.status(500).json({ message: 'An error occurred during the update process', error: e.message });
    }
});
module.exports = router;