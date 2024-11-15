import React from 'react';
import { FaPhoneAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const ContactPage = () => {
  return (
    <div id ="contact" className="bg-gradient-to-b from-blue-900 to-black min-h-screen flex flex-col items-center py-8 text-white">
      <h1 className="text-3xl font-bold mb-4 text-blue-300">Contact Us</h1>
      
      <p className="text-center mb-2 text-sm">
        <span className="font-medium text-white">Address:</span> Bole Medahanialem, Addis Ababa, Ethiopia
      </p>
      <p className="text-center mb-4 text-sm">
        <span className="font-medium text-white">Phone:</span> <a href="tel:+251997687659" className="text-blue-400 hover:underline">+251997687659</a>
      </p>
      
      <div className="flex justify-center space-x-4 text-gray-300 mb-4">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaFacebook size={20} />
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaTwitter size={20} />
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaInstagram size={20} />
        </a>
        <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
          <FaLinkedin size={20} />
        </a>
      </div>
      
      <iframe
        title="Our Location"
        className="rounded-lg w-11/12 md:w-2/3 h-48 shadow-lg border-0"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3957.7940277550244!2d38.7741100140035!3d9.015015793518328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b8f735d5ebc29%3A0x3282d4265f7c0731!2sBole%20Medahanialem%2C%20Addis%20Ababa%2C%20Ethiopia!5e0!3m2!1sen!2sus!4v1615231215062!5m2!1sen!2sus"
        allowFullScreen
        loading="lazy"
      ></iframe>
    </div>
  );
};

export default ContactPage;
