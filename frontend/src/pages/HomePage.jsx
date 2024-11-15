import React from 'react';
import Header from '../components/Header'; // Updated Navbar
import HeroSection from '../components/Homesection'; // Hero Section
import ProductList from '../components/ProductList'; // Hero Section
import Testimonials from '../components/Testimonials'; // Hero Section
import ContactPage from '../components/contact'; // Hero Section

const HomePage = () => {
  return (
    <div>
      {/* Include Header */}
      {/* Include Hero Section */}
      <Header />
      <HeroSection />
      <ProductList />
      <Testimonials />
      <ContactPage />
      {/* Other sections to be added */}
      {/* Product Lists, Featured Items, etc. */}
    </div>
  );
};
export default HomePage;
