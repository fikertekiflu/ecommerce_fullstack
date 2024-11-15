const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const dotenv = require('dotenv');
const User = require('../models/User');

dotenv.config();
const register = async (req, res) => {
    const { username, email, password, role } = req.body;
     try {
         const existingUser = await User.findOne({ email });
         if (existingUser) {
             return res.status(400).json({ message: 'Email already registered'})
         }

         const hashedPassword =await bcrypt.hash(password, 10);
         const newUser =  new User({
            username,
            email,
            password: hashedPassword,
            role: role || 'user'
         });

         await newUser.save();

         res.status(201).json({ message: 'User registered. check your email for verification'})
     } catch (error) {
         res.status(500).json({ message: ' failed to register the user'})
     };
};

const login= async (req, res) => {
    const { email, password } = req.body;
    try {
        const user =  await User.findOne({email});
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        // Return the token, user ID, username, and role
        res.json({
            token,
            userID: user._id,
            username: user.username,
            role: user.role // Include the user's role in the response
        });
    } catch (error) {
        res.status(500).json({ message: 'Login failed', error: error.message });
    }
}

module.exports = {
    register,
    login,
};
