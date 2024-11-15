// paymentController.js
const { Chapa } = require('chapa-nodejs');
const chapa = new Chapa({
  secretKey: 'CHASECK_TEST-5k3saekZB6yPqljhDWmunmyKKtbkVQoi',
});

async function initiatePayment(req, res) {
  const { name, email, amount } = req.body;

  // Validate inputs
  if (!name || !email || !amount) {
    return res.status(400).json({ error: "Name, email, and amount are required." });
  }

  if (isNaN(amount) || amount <= 0) {
    return res.status(400).json({ error: "Amount must be a positive number." });
  }

  const tx_ref = `tx_${new Date().getTime()}`; 

  try {
    // Initialize payment with Chapa
    const response = await chapa.initialize({
      first_name: name,
      email: email,
      currency: 'ETB',
      amount: amount.toString(),  // Chapa expects amount as a string
      tx_ref: tx_ref,
      return_url: 'http://localhost:5173/payment/success',  // Redirect URL after successful payment
      customization: {
        title: 'Payment for Services',
        description: 'Pay for your purchase',
      },
    });

    // Send the checkout URL to the frontend
    res.json({
      checkout_url: response.data.checkout_url,
    });
  } catch (error) {
    console.error('Error initializing payment:', error.message);
    res.status(400).json({ error: error.message || 'Payment initiation failed' });
  }
}

module.exports = { initiatePayment };
