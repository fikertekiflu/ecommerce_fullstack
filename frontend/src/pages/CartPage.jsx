import React, { useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Navbar from "../components/Navbar";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem("userID");

  // Fetch cart items on component load
  useEffect(() => {
    const fetchCart = async () => {
      if (!userId) {
        console.error("No userId found in local storage");
        return;
      }
      try {
        const response = await fetch(`http://localhost:5001/api/cart/${userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch cart: ${response.statusText}`);
        }
        const data = await response.json();
        setCartItems(data.products);
        updateTotal(data.products);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchCart();
  }, [userId]);

  // Update the total price
  const updateTotal = (items) => {
    const subtotal = items.reduce(
      (sum, item) => sum + (item.productId?.price || 0) * item.quantity,
      0
    );
    setTotal(subtotal);
  };

  // Handle quantity change for an item
  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) return; // Prevent quantity from going below 1

    try {
      const response = await fetch("http://localhost:5001/api/cart/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, quantity: newQuantity }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }

      // Update the cart locally
      const updatedCart = cartItems.map((item) =>
        item.productId?._id === productId
          ? { ...item, quantity: newQuantity }
          : item
      );
      setCartItems(updatedCart);
      updateTotal(updatedCart);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  // Handle item removal from cart
  const handleRemoveFromCart = async (productId) => {
    try {
      const response = await fetch("http://localhost:5001/api/cart/remove", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId }),
      });
      if (!response.ok) {
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }
      const updatedCart = cartItems.filter((item) => item.productId?._id !== productId);
      setCartItems(updatedCart);
      updateTotal(updatedCart);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  // Handle checkout
  const handleCheckout = async (e) => {
    e.preventDefault();

    if (!name || !email || !phoneNumber || total <= 0) {
      alert("Please fill all fields and ensure total is above zero.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return;
    }

    const tx_ref = `chapa-tx-${Date.now()}`;
    const chapaForm = document.createElement("form");
    chapaForm.method = "POST";
    chapaForm.action = "https://api.chapa.co/v1/hosted/pay";

    const formFields = {
      public_key: "CHAPUBK_TEST-yiDTSUAShwdNpbSbBwYtOv0ni1cus1Xm",
      tx_ref,
      amount: total,
      currency: "ETB",
      email,
      first_name: name.split(" ")[0],
      last_name: name.split(" ")[1] || "",
      title: "Payment for Cart Items",
      description: "Complete your cart checkout",
      logo: "https://chapa.link/asset/images/chapa_swirl.svg",
      return_url: "http://localhost:5173/cart/confirmation",
    };

    Object.entries(formFields).forEach(([key, value]) => {
      const hiddenField = document.createElement("input");
      hiddenField.type = "hidden";
      hiddenField.name = key;
      hiddenField.value = value;
      chapaForm.appendChild(hiddenField);
    });

    document.body.appendChild(chapaForm);
    chapaForm.submit();
  };

  return (
    <div className="font-Itim">
      <Navbar />
      <div className="p-24 min-h-screen">
        <h1 className="text-4xl font-extrabold text-center mb-8">
          Your Cart ({cartItems.length} items)
        </h1>
        <div className="bg-white shadow-lg rounded-lg overflow-x-auto">
          <table className="w-full text-gray-700 text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-2">Item</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2 text-center">Quantity</th>
                <th className="px-4 py-2 text-center">Price</th>
                <th className="px-4 py-2 text-center">Remove</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-2 text-center text-gray-500">
                    Your cart is empty.
                  </td>
                </tr>
              ) : (
                cartItems.map((item) => (
                  <tr key={item.productId?._id} className="border-b">
                    <td className="px-4 py-2">{item.productId?.name}</td>
                    <td className="px-4 py-2">{item.productId?.description}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleQuantityChange(item.productId?._id, item.quantity - 1)}
                        className="px-2 py-1 border rounded"
                      >
                        -
                      </button>
                      <span className="mx-2">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.productId?._id, item.quantity + 1)}
                        className="px-2 py-1 border rounded"
                      >
                        +
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      ETB {(item.productId?.price || 0) * item.quantity}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        onClick={() => handleRemoveFromCart(item.productId?._id)}
                        className="text-red-600"
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <form onSubmit={handleCheckout} className="mt-8 space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <input
            type="tel"
            placeholder="Your Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white rounded">
            Pay ETB {total}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CartPage;
