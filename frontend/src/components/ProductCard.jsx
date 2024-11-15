// src/components/ProductCard.js
import React, { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import ProductModal from './ProductModal';

const ProductCard = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="relative border p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-200">
      {/* Product Image */}
      <img 
        src={product.image} 
        alt={product.title} 
        className="w-full h-48 object-cover rounded-md mb-4" 
      />

      {/* Product Title */}
      <h3 className="text-lg font-bold mb-2">{product.title}</h3>

      {/* Ratings */}
      <div className="flex items-center mb-2">
        {[...Array(product.rating)].map((_, index) => (
          <FaStar key={index} className="text-yellow-500" />
        ))}
        <span className="ml-2 text-sm text-gray-600">({product.rating} stars)</span>
      </div>

      {/* Price */}
      <div className="text-xl font-bold mb-4">${product.price}</div>

      {/* Add to Cart Button */}
      <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg flex justify-center items-center hover:bg-blue-700 transition">
        <FaShoppingCart className="mr-2" />
        Add to Cart
      </button>

      {/* Hover "See More" Button */}
      <div 
        className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center opacity-0 hover:opacity-100 transition-opacity"
        onClick={() => setShowModal(true)}  // Show modal on click
      >
        <button className="bg-white text-black py-2 px-4 rounded-lg text-lg">
          See More
        </button>
      </div>

      {/* Product Modal */}
      {showModal && <ProductModal product={product} closeModal={() => setShowModal(false)} />}
    </div>
  );
};

export default ProductCard;
