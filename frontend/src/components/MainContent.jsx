import React from 'react';
import Carousel from './Carousel';

const MainContent = () => {
  return (
    <div className="flex-1 p-8 bg-blue-50">
      <Carousel />
      <div className="grid grid-cols-3 gap-6 mt-10">
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="font-bold text-lg">Smartphones</h3>
          <p className="text-gray-600 mt-2">Discover the latest smartphones with cutting-edge technology.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="font-bold text-lg">Laptops</h3>
          <p className="text-gray-600 mt-2">Shop for laptops that suit your work, gaming, or study needs.</p>
        </div>
        <div className="bg-white shadow-md p-6 rounded-lg">
          <h3 className="font-bold text-lg">Accessories</h3>
          <p className="text-gray-600 mt-2">Find essential accessories like chargers, headphones, and more.</p>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
