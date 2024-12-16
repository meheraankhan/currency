const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db'); 
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post('/', async(req, res) => {
    const {email, password} = req.body;
    try {
        const result = await db.query("SELECT * FROM user_info WHERE email = $1", [email]);
        
        if (result.rows.length === 0) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const user = result.rows[0];
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        });

        res.json({
            token
        });

    } catch (e) {
        res.status(500).json({ message: 'An error occurred during registration', error: e.message});
    }
});
module.exports = router;