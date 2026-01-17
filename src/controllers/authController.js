const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key', {
        expiresIn: '30d',
    });
};

async function signup(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        const user = await User.create({ username, password });

        res.status(201).json({
            _id: user._id,
            username: user.username,
            token: generateToken(user._id),
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

async function signin(req, res) {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }

        const user = await User.findOne({ username });
        if (user && (await user.comparePassword(password))) {
            res.json({
                _id: user._id,
                username: user.username,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
}

module.exports = { signup, signin };
