import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { FaTruck, FaRedo, FaUserCheck, FaHeadset } from 'react-icons/fa';
import backgroundImage1 from '../assets/logo.png';
import backgroundImage2 from '../assets/bd.png';
import backgroundImage3 from '../assets/bgec.jpg';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const HeroSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

  const [animated, setAnimated] = useState(false);
  
  useEffect(() => {
    setTimeout(() => setAnimated(true), 500); // Add delay before animation starts
  }, []);
  
  const text = "Explore  the  Latest  Electronics  Collection !";

  return (
    <section className="bg-blue-50 py-10">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
        
        {/* Left Side - Promo Text */}
        <div className="w-full md:w-1/2 mb-6 md:mb-0">
          <p className="text-2xl md:text-4xl text-gray-600 font-bold font-Noto">
            {text.split(" ").map((word, index) => (
              <span
                key={index}
                className={`inline-block transition-transform duration-700 ease-out ${
                  animated ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {word}{" "}
              </span>
            ))}
          </p>
          <p className="text-2xl text-gray-600 mt-4 font-bold font-Itim">Don't miss out on exclusive offers!</p>
          <p className="text-2xl text-gray-700 mt-2 font-bold font-Itim">Starting at $499.00</p>
          <button
            className="mt-6 px-6 py-3 text-white rounded-lg font-semibold hover:bg-blue-500 transition duration-300"
            style={{ backgroundColor: '#8447ff' }}
          >
            Shop Now
          </button>
        </div>

        {/* Right Side - Product Image Carousel */}
        <div className="w-full md:w-1/2 flex items-center justify-center">
          <Slider {...settings} className="w-full">
            <div>
              <img src={backgroundImage1} alt="Notebook Collection 1" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <img src={backgroundImage2} alt="Notebook Collection 2" className="rounded-lg shadow-lg" />
            </div>
            <div>
              <img src={backgroundImage3} alt="Notebook Collection 3" className="rounded-lg shadow-lg" />
            </div>
          </Slider>
        </div>
      </div>

      {/* Bottom Section - Features */}
      <div className="bg-white mt-10 py-8">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-8 px-4">
          <div className="flex items-center text-center space-x-3">
            <FaTruck className="text-gray-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Free Delivery</h3>
              <p className="text-sm text-gray-600">Orders from $50</p>
            </div>
          </div>
          <div className="flex items-center text-center space-x-3">
            <FaRedo className="text-gray-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Return & Refund</h3>
              <p className="text-sm text-gray-600">Money back guarantee</p>
            </div>
          </div>
          <div className="flex items-center text-center space-x-3">
            <FaUserCheck className="text-gray-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Member Discount</h3>
              <p className="text-sm text-gray-600">On orders over $100</p>
            </div>
          </div>
          <div className="flex items-center text-center space-x-3">
            <FaHeadset className="text-gray-500 text-2xl" />
            <div>
              <h3 className="font-semibold text-lg text-gray-800">Support 24/7</h3>
              <p className="text-sm text-gray-600">Contact us anytime</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
