import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaSearch, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const ProductCatalog = ({ setCartCount }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [maxPrice, setMaxPrice] = useState(1500);

  // Fetch products and categories from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5001/api/Products');
        const data = await res.json();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map((product) => product.category))];
        setCategories(uniqueCategories);

        const maxProductPrice = Math.max(...data.map(product => product.price));
        setMaxPrice(maxProductPrice);
        setPriceRange([0, maxProductPrice]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    try {
      const userId = localStorage.getItem('userID');
      
      if (!userId) {
        alert('Please log in to add items to the cart.');
        return;
      }

      await fetch('http://localhost:5001/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId: product._id, quantity: 1 }),
      });

      setCartCount((prevCount) => prevCount + 1);
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];

    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="p-12 bg-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Available Products</h1>

      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="relative w-full lg:w-1/2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-full p-3 pl-10 w-full text-gray-700 shadow focus:ring-2 focus:ring-green-500 focus:outline-none transition"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <div className="relative w-full lg:w-1/4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border rounded-full p-3 w-full text-gray-700 shadow appearance-none focus:ring-2 focus:ring-green-500 focus:outline-none transition cursor-pointer"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col w-full lg:w-1/4">
          <label className="font-medium text-gray-700 mb-2">Max Price: ${priceRange[1]}</label>
          <input
            type="range"
            min="0"
            max={maxPrice}
            value={priceRange[1]}
            onChange={(e) => setPriceRange([0, parseFloat(e.target.value)])}
            className="slider w-full"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {filteredProducts.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
          >
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-lg font-semibold mt-4">{product.name}</h3>
            <p className="text-gray-600 mt-2">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="bg-blue-500 text-white mt-4 p-2 rounded hover:bg-blue-600"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductCatalog;
