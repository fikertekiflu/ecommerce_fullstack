import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentConfirmation = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const confirmPayment = async () => {
      // Retrieve tx_ref from localStorage
      const tx_ref = localStorage.getItem("tx_ref");
      const status = "success"; // You can default to "success" for now or handle error cases if necessary

      if (!tx_ref) {
        alert("Invalid payment reference.");
        return navigate("/cartPage");
      }

      try {
        const response = await fetch("http://localhost:5001/api/payment/confirmation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ tx_ref, status }),
        });

        const result = await response.json();
        if (response.ok) {
          alert(result.message);
          navigate("/"); // Redirect to a success page or homepage
        } else {
          alert(result.message || "Error verifying transaction");
          navigate("/cart");
        }
      } catch (error) {
        console.error("Error confirming payment:", error);
        alert("Error confirming payment. Please try again.");
        navigate("/cart");
      }
    };

    confirmPayment();
  }, [navigate]);

  return (
    <div className="text-center mt-16">
      <h2 className="text-2xl font-bold">Processing your payment...</h2>
    </div>
  );
};

export default PaymentConfirmation;
