import React from 'react';
import Slider from 'react-slick';
import { FaStar } from 'react-icons/fa';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';


const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Alice Johnson',
      feedback: 'The company provided exceptional service and support. Highly recommend!',
      rating: 5,
      image: 'https://via.placeholder.com/100?text=Alice',
    },
    {
      id: 2,
      name: 'Mark Thompson',
      feedback: 'Great experience overall! I am very satisfied with the products and service.',
      rating: 4,
      image: 'https://via.placeholder.com/100?text=Mark',
    },
    {
      id: 3,
      name: 'Lisa Brown',
      feedback: 'Excellent quality and quick support. Will definitely return!',
      rating: 4.5,
      image: 'https://via.placeholder.com/100?text=Lisa',
    },
    {
      id: 4,
      name: 'James Smith',
      feedback: 'Very professional team. The product exceeded my expectations!',
      rating: 5,
      image: 'https://via.placeholder.com/100?text=James',
    },
    {
      id: 5,
      name: 'Sophia Lee',
      feedback: 'Affordable and reliable services. The team was incredibly helpful.',
      rating: 4,
      image: 'https://via.placeholder.com/100?text=Sophia',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="">
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">What Our Customers Say</h1>
      <Slider {...settings}>
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className="p-4" >
            <div className="bg-blue-50 shadow-lg rounded-lg p-6 text-center">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 mx-auto rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-800">{testimonial.name}</h3>
              <div className="flex justify-center mt-2">
                {[...Array(5)].map((_, index) => (
                  <FaStar
                    key={index}
                    className={`${
                      index < Math.floor(testimonial.rating) ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-600 mt-4">{testimonial.feedback}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
</div>
  );
};

export default Testimonials;
