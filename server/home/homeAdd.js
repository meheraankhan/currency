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
    const { currency, section } = req.body;
    const userEmail = req.user.email;

    if (!currency || !section) {
        return res.status(400).json({ message: 'Currency and section are required' });
    }

    try {
        await db.query(
            `UPDATE user_info SET ${section} = array_append(${section}, $1) WHERE email = $2`,
            [currency, userEmail]
        );
        res.status(200).json({ message: 'Item added successfully' });
    } catch (e) {
        res.status(500).json({ message: 'Error adding item', error: e.message });
    }
});
module.exports = router;