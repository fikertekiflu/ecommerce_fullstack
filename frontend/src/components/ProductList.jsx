import React, { useState } from 'react';
import { FaStar, FaShoppingCart } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const ProductList = ({ handleAddToCart }) => {
  const [products] = useState([
    {
      id: 1,
      name: 'iPhone 14 Pro',
      description: 'Advanced camera and display technology.',
      price: 999,
      discountPrice: 899,
      rating: 4.5,
      image: 'https://via.placeholder.com/150?text=iPhone+14+Pro',
    },
    {
      id: 2,
      name: 'Samsung Galaxy S22',
      description: 'Smooth performance with a stunning display.',
      price: 799,
      discountPrice: 749,
      rating: 4.3,
      image: 'https://via.placeholder.com/150?text=Galaxy+S22',
    },
    {
      id: 3,
      name: 'MacBook Pro 16"',
      description: 'Powerful laptop with Retina display.',
      price: 2399,
      discountPrice: 2199,
      rating: 4.8,
      image: 'https://via.placeholder.com/150?text=MacBook+Pro',
    },
    {
      id: 4,
      name: 'Dell XPS 13',
      description: 'Ultra-portable laptop with high performance.',
      price: 1299,
      discountPrice: 1199,
      rating: 4.6,
      image: 'https://via.placeholder.com/150?text=Dell+XPS+13',
    },
    {
      id: 5,
      name: 'Sony WH-1000XM4',
      description: 'Industry-leading noise-canceling headphones.',
      price: 349,
      discountPrice: 299,
      rating: 4.7,
      image: 'https://via.placeholder.com/150?text=Sony+WH-1000XM4',
    },
    {
      id: 6,
      name: 'Apple Watch Series 7',
      description: 'Smartwatch with health tracking features.',
      price: 399,
      discountPrice: 379,
      rating: 4.5,
      image: 'https://via.placeholder.com/150?text=Apple+Watch+S7',
    },
    {
      id: 7,
      name: 'Amazon Echo Dot',
      description: 'Smart speaker with Alexa.',
      price: 49,
      discountPrice: 39,
      rating: 4.2,
      image: 'https://via.placeholder.com/150?text=Echo+Dot',
    },
    {
      id: 8,
      name: 'Fitbit Charge 5',
      description: 'Health and fitness tracker.',
      price: 179,
      discountPrice: 149,
      rating: 4.3,
      image: 'https://via.placeholder.com/150?text=Fitbit+Charge+5',
    },
    {
      id: 9,
      name: 'Nintendo Switch',
      description: 'Popular gaming console with portability.',
      price: 299,
      discountPrice: 279,
      rating: 4.6,
      image: 'https://via.placeholder.com/150?text=Nintendo+Switch',
    },
    {
      id: 10,
      name: 'Sony PlayStation 5',
      description: 'Next-gen console with stunning graphics.',
      price: 499,
      discountPrice: 479,
      rating: 4.9,
      image: 'https://via.placeholder.com/150?text=PS5',
    },
    {
      id: 11,
      name: 'GoPro HERO10',
      description: 'High-quality action camera.',
      price: 499,
      discountPrice: 449,
      rating: 4.6,
      image: 'https://via.placeholder.com/150?text=GoPro+HERO10',
    },
    {
      id: 12,
      name: 'Dyson Air Purifier',
      description: 'High-performance air purifier.',
      price: 599,
      discountPrice: 549,
      rating: 4.7,
      image: 'https://via.placeholder.com/150?text=Dyson+Air+Purifier',
    },
  ]);

  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-50 to-gray-100 min-h-screen">
      <div className="container mx-auto py-12 px-4">
        <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">Top Products</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product, index) => (
            <AnimatedProductCard key={product.id} product={product} index={index} handleAddToCart={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedProductCard = ({ product, handleAddToCart, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const delay = index * 150;

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: `${delay}ms`,
      }}
      className={`transform transition-transform duration-700 ease-out ${
        inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      } bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg hover:scale-105 transition duration-300`}
    >
      <img src={product.image} alt={product.name} className="h-36 w-full object-cover rounded-t-xl" />
      <div className="p-4">
        <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500 mt-1">{product.description}</p>
        <div className="flex items-center mt-3">
          <p className="text-lg font-semibold text-green-500">${product.discountPrice}</p>
          <p className="text-sm line-through text-gray-400 ml-2">${product.price}</p>
        </div>
        <div className="flex items-center mt-2">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className={`${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
          ))}
          <span className="ml-1 text-gray-500 text-sm">({product.rating})</span>
        </div>
        <button
          className="text-white py-2 px-3 mt-4 rounded-md w-full hover:bg-blue-600 bg-indigo-500 flex items-center justify-center transition-colors duration-200"
          onClick={() => handleAddToCart(product)}
        >
          <FaShoppingCart className="mr-1" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductList;
