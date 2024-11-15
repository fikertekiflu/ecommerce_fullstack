// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to verify user role
const authorize = (role) => {
  return (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) return res.status(403).json({ message: 'Access Denied' });

    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid Token' });

      const user = await User.findById(decoded.userId);
      if (!user) return res.status(404).json({ message: 'User not found' });

      if (user.role !== role) return res.status(403).json({ message: 'Access Denied' });

      req.user = user;
      next();
    });
  };
};

module.exports = { authorize };
