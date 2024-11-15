// routes/transactionRoutes.js
const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/TranasactionController");

// Route to handle payment confirmation
router.post("/payment/confirmation", transactionController.confirmTransaction);

// Route to retrieve transactions for the admin
router.get("/admin/transactions", transactionController.getTransactions);

module.exports = router;
