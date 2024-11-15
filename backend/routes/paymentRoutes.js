// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Route to initiate the payment
router.post('/api/payment', paymentController.initiatePayment);


module.exports = router;
