import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png'

const Header = ({ isLogin }) => {
  return (
    <header className="bg-red shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
          <div className="relative flex items-center">
            <FaShoppingCart className="text-['#8447ff'] w-12 h-12" />
            <span className="absolute -top-3 left-2 text-white font-bold text-4xl">
              e
            </span>
          </div>
          <span className="text-blue-700 font-semibold text-xl italic font-serif ml-1">Gebeya</span>
        </div>
        <div className="w-full max-w-xl mx-4 relative">
  <input
    type="text"
    placeholder="Search for products..."
    className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gradient-to-r from-gray-50 to-white transition ease-in-out duration-300"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="absolute left-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400 pointer-events-none"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 20a8 8 0 100-16 8 8 0 000 16zm6-6l4 4"
    />
  </svg>
</div>
{/* Right side */}
        <div className="flex items-center space-x-6">
        <Link
          to={isLogin ? "/register" : "/login"} 
          className="bg-gray-600 text-white px-5 py-2 rounded-lg hover:bg-red-700 transition duration-300 text-center"
          style={{ backgroundColor: '#8447ff' }}>
          {isLogin ? "register" : "Login"} {/* Change text based on state */}
        </Link>
          <button className="text-gray-800 hover:text-blue-600">Your Account</button>
          <button className="flex items-center text-gray-800 hover:text-blue-600">
            <FaShoppingCart className="w-6 h-6" />
            {/* <span className="ml-1">({cart.length})</span> */}
          </button>
        </div>
      </div>

      {/* Navbar with Dropdown */}
      <nav className="shadow-md" style={{ backgroundColor: '#8447ff' }}>
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex space-x-6">
            {/* Shop Categories Dropdown */}
            <div className="relative group">
              <button className="text-white font-medium hover:text-blue-200">Shop Categories</button>
              <div className="absolute hidden group-hover:block bg-white text-gray-800 mt-2 rounded-md shadow-lg w-64">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100">Value Of The Day</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Top 100 Offers</li>
                  <li className="px-4 py-2 hover:bg-gray-100">New Arrivals</li>

                  {/* Nested Dropdown for Laptops */}
                  <li className="relative px-4 py-2 hover:bg-gray-100 group">
                    Laptops & Computers
                    <ul className="absolute hidden group-hover:block bg-gray-100 mt-2 left-full w-48">
                      <li className="px-4 py-2 hover:bg-gray-200">HP</li>
                      <li className="px-4 py-2 hover:bg-gray-200">Dell</li>
                      <li className="px-4 py-2 hover:bg-gray-200">Lenovo</li>
                      <li className="px-4 py-2 hover:bg-gray-200">Apple</li>
                    </ul>
                  </li>

                  <li className="px-4 py-2 hover:bg-gray-100">Computer Hardware</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Camera & Photo</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Smartphone & Tablets</li>
                  <li className="px-4 py-2 hover:bg-gray-100">TV & Audio</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Home & Electronic</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Headphone & Speakers</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Watches & Eyewear</li>
                  <li className="px-4 py-2 hover:bg-gray-100">Gamepad & Console</li>
                </ul>
              </div>
            </div>

            {/* Standard Navigation Links */}
            <a href="#" className="text-white hover:text-blue-200">Home</a>
            <a href="#" className="text-white hover:text-blue-200">About Us</a>
            <a href="#contact" className="text-white hover:text-blue-200">Contact Us</a>
            <a href="#" className="text-white hover:text-blue-200">Our Store</a>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
