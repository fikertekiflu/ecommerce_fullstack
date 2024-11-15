import React, { useState } from 'react';
const Carousel = () => {
  const slides = [
    { id: 1, image: '/images/smartphone.jpg', title: 'Latest Smartphones', description: 'Explore the newest models in the market!' },
    { id: 2, image: '/images/laptop.jpg', title: 'Powerful Laptops', description: 'Find the best laptops for gaming, work, or school.' },
    { id: 3, image: '/images/headphones.jpg', title: 'Top Audio Gear', description: 'Get the best deals on headphones and speakers.' },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };
  return (
    <div className="relative w-full h-64 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ transform: `translateX(${(index - currentSlide) * 100}%)` }}
        >
          <img src={slide.image} alt={slide.title} className="w-full h-64 object-cover" />
          <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 p-4 text-white">
            <h2 className="text-xl font-bold">{slide.title}</h2>
            <p>{slide.description}</p>
          </div>
        </div>
      ))}
      <button onClick={prevSlide} className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded">
        &lt;
      </button>
      <button onClick={nextSlide} className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded">
        &gt;
      </button>
    </div>
  );
};

export default Carousel;
