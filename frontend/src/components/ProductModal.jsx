import React, { useState } from 'react';

const ProductModal = ({ product, closeModal }) => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedImage, setSelectedImage] = useState(product.images[0] || '');

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-3xl w-full relative">
        <button 
          className="absolute top-2 right-2 text-xl font-bold"
          onClick={closeModal}
        >
          &times;
        </button>

        <div className="flex mb-4">
          <div className="w-3/4">
            <img 
              src={selectedImage} 
              alt={product.title} 
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>
          <div className="w-1/4 flex flex-col justify-between">
            {product.images.map((image, index) => (
              <img 
                key={index}
                src={image}
                alt={`Product ${index}`} 
                className={`cursor-pointer mb-2 rounded-md ${selectedImage === image ? 'border-2 border-blue-600' : ''}`}
                onClick={() => setSelectedImage(image)}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
        <p className="text-lg mb-4">${product.price}</p>

        <div className="mb-4">
          <h4 className="font-bold">Choose Color:</h4>
          <div className="flex">
            {product.colors.map((color, index) => (
              <div 
                key={index}
                className={`p-2 cursor-pointer rounded-full mr-2 ${selectedColor === color ? 'border-2 border-blue-600' : ''}`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
              />
            ))}
          </div>
        </div>

        <p className="mb-6">{product.description}</p>

        <button className="bg-blue-600 text-white py-2 px-4 rounded-lg">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductModal;
