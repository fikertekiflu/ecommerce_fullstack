import React from 'react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white p-6 shadow-xl h-screen">
      <h2 className="font-semibold text-2xl mb-8 text-gray-800 tracking-wide">Categories</h2>
      <ul className="space-y-5">
        <li>
          <a 
            href="#" 
            className="text-gray-700 text-lg hover:text-blue-500 hover:bg-gray-100 p-3 block rounded-lg transition-all duration-300"
          >
            Smartphones
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="text-gray-700 text-lg hover:text-blue-500 hover:bg-gray-100 p-3 block rounded-lg transition-all duration-300"
          >
            Laptops
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="text-gray-700 text-lg hover:text-blue-500 hover:bg-gray-100 p-3 block rounded-lg transition-all duration-300"
          >
            Tablets
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="text-gray-700 text-lg hover:text-blue-500 hover:bg-gray-100 p-3 block rounded-lg transition-all duration-300"
          >
            Audio & Headphones
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="text-gray-700 text-lg hover:text-blue-500 hover:bg-gray-100 p-3 block rounded-lg transition-all duration-300"
          >
            Wearables
          </a>
        </li>
        <li>
          <a 
            href="#" 
            className="text-gray-700 text-lg hover:text-blue-500 hover:bg-gray-100 p-3 block rounded-lg transition-all duration-300"
          >
            Accessories
          </a>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
