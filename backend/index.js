const { Chapa } = require('chapa-nodejs');

const chapa = new Chapa({
  secretKey: 'CHASECK_TEST-5k3saekZB6yPqljhDWmunmyKKtbkVQoi',
});

const tx_ref = "fker123"; // Generate transaction reference

// Wrap the code in an async function
async function initializeTransaction() {
  try {
    const response = await chapa.initialize({
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@gmail.com',
      phone_number: '0911121314',
      currency: 'ETB',
      amount: '200',
      tx_ref: tx_ref,
      return_url: 'https://google.com/',
      customization: {
        title: 'payment',
        description: 'pay for ur service',
      },
    });

    console.log('Transaction initialized:', response); // Handle the response from the Chapa API
    // Now call the verification after initialization
    await verifyTransaction(tx_ref);
  } catch (error) {
    console.error('Error initializing transaction:', error);
  }
}

// Function to verify the transaction
async function verifyTransaction(tx_ref) {
  try {
    const response = await chapa.verify({
      tx_ref: tx_ref,
    });

    console.log('Transaction verification response:', response); // Handle the response from the Chapa verification API
  } catch (error) {
    console.error('Error verifying transaction:', error);
  }
}

// Call the function to start the transaction initialization
initializeTransaction();
