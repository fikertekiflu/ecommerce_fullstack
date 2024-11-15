const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  tx_ref: { type: String, unique: true },
  amount: Number,
  email: String,
  first_name: String,
  last_name: String,
  phone_number: String,
  status: String,
  products: [
    {
      product_id: String, // ID of the product
      name: String,       // Name of the product
      quantity: Number,   // Quantity of the product in this transaction
      price: Number,      // Price of the product
    },
  ],
  created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', transactionSchema);
