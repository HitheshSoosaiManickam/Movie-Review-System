const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcrypt'); // Add bcrypt for password hashing

// Register
router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
        return res.status(400).json({ success: false, message: 'Username already exists.' });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.json({ success: true, message: 'User registered successfully!' });
});

// Login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    // Check if user exists and compare password
    if (user && await bcrypt.compare(password, user.password)) {
        res.json({ success: true, message: 'Login successful!' });
    } else {
        res.status(400).json({ success: false, message: 'Invalid credentials' });
    }
});

module.exports = router;
