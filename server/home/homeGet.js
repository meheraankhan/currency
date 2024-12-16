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

router.post('/', authenticateToken, async(req, res) => {
    const userEmail = req.user.email;

    try {
        const allQuery = await db.query("SELECT * FROM user_info WHERE email = $1", [userEmail]);
        if (allQuery.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const recommendations = allQuery.rows[0].recommendations;
        const bucketList = allQuery.rows[0].bucket_list;
        const visited = allQuery.rows[0].visited;

        return res.status(200).json({
            recommendations,
            bucketList,
            visited
        });
    } catch(e) {
        res.status(500).json({ message: 'An error occurred during information retrieval', error: e.message});
    }
});
module.exports = router;