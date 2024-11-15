const axios = require("axios");
const Transaction = require("../models/transaction");

exports.confirmTransaction = async (req, res) => {
  const { status, tx_ref, products } = req.body;

  console.log("Received tx_ref:", tx_ref);
  console.log("Received status:", status);

  // Exit early if the payment status is not successful
  if (status !== "success") {
    return res.status(400).json({ message: "Payment failed or canceled" });
  }

  try {
    // Check if the transaction already exists in the database
    const existingTransaction = await Transaction.findOne({ tx_ref });
    if (existingTransaction) {
      console.log("Transaction already recorded:", existingTransaction);
      return res.status(200).json({ message: "Transaction already recorded" });
    }

    // Verify transaction with Chapa
    const chapaResponse = await axios.get(
      `https://api.chapa.co/v1/transaction/verify/${tx_ref}`,
      {
        headers: {
          Authorization: `Bearer CHASECK_TEST-5k3saekZB6yPqljhDWmunmyKKtbkVQoi`,
        },
      }
    );

    if (chapaResponse.data.status !== "success") {
      return res.status(400).json({ message: "Transaction verification failed" });
    }

    const transactionData = chapaResponse.data.data;

    // Create and save a new transaction
    const newTransaction = await Transaction.create({
      tx_ref,
      amount: transactionData.amount,
      email: transactionData.email,
      first_name: transactionData.first_name,
      last_name: transactionData.last_name || "",
      phone_number: transactionData.phone_number || "",
      status: "success",
      products: products || [],
    });

    console.log("New transaction recorded:", newTransaction);
    return res.status(200).json({ message: "Payment successfully recorded" });
  } catch (error) {
    console.error("Error verifying transaction:", error.message);
    return res.status(500).json({ message: "Error verifying transaction" });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res.status(200).json({ transactions });
  } catch (error) {
    console.error("Error retrieving transactions:", error.message || error);
    return res.status(500).json({ message: "Error retrieving transactions" });
  }
};
