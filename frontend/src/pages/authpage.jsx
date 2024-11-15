import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Login Component
const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for login
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        // Post login details to the server
        const res = await axios.post("http://localhost:5001/api/auth/login", formData);
        const { token, userID, username, role } = res.data; // Get the role from the response

        // Save token and user details in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("userID", userID);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role); // Save the role in localStorage

        // Redirect based on user role
        if (role === 'admin') {
            navigate("/admindashboard"); // Redirect to admin dashboard
        } else {
            navigate("/userdashboard"); // Redirect to user dashboard
        }
    } catch (error) {
        console.error("Login error:", error.response ? error.response.data : error);
        alert("Login failed: " + (error.response ? error.response.data.message : "Server error"));
    }
};

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8EFEA]">
      <div className="shadow-md rounded-lg p-8 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-6">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Your Password"
              required
            />
          </div>
          <div className="text-right mb-4">
            <Link to="/forgot-password" className="text-red-600 hover:underline">
              Forgot Password?
            </Link>
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-center">
          <h3 className="text-red-500">
            Don't have an account?{" "}
            <Link to="/register" className="text-gray-700 font-bold hover:text-red-600 transition">
              Sign Up
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

// Register Component
const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  // Handle form inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Post registration details to server
      const res = await axios.post("http://localhost:5001/api/auth/register", formData);
      alert("Registration successful");
      navigate("/login"); // Redirect to login on success
    } catch (error) {
      console.error("Registration error:", error.response ? error.response.data : error);
      alert("Registration failed: " + (error.response ? error.response.data.message : "Server error"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#F8EFEA]">
      <div className="bg-white shadow-md rounded-lg p-8 w-11/12 md:w-1/3">
        <h2 className="text-2xl font-bold text-center mb-6">Create an Account</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Your Username"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:ring-red-500"
              placeholder="Your Password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Register
          </button>
        </form>
        <div className="mt-4 text-center">
          <h3 className="text-red-600">
            Already have an account?{" "}
            <Link to="/login" className="text-gray-700 font-bold hover:text-red-600 transition">
              Login
            </Link>
          </h3>
        </div>
      </div>
    </div>
  );
};

export { Login, Register };
