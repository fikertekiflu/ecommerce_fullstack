// src/pages/UserDashboard.jsx
import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ProductCatalog from '../components/ProductCatalog';
import MainContent from '../components/MainContent';
import Contact from '../components/Contact';

const UserDashboard = ({ user }) => {
  const [products, setProducts] = useState([]);
  const [cartCount, setCartCount] = useState(0);


  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products');
      const data = await res.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleLogout = () => {
    // Logic for logging out
  };
  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
  };
  return (
    <div className="min-h-screen bg-gray-50">
     <Navbar cartCount={cartCount} />

      <div className="container mx-auto flex">
        <Sidebar />
        <MainContent />
      </div>
      <ProductCatalog products={products} setCartCount={setCartCount} />
      <Contact />

    </div>
  );
};

export default UserDashboard;
