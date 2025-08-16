import React from 'react';
import { Star } from 'lucide-react';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      review: 'Found my dream apartment through RentEase. The process was smooth and the support team was incredibly helpful throughout.'
    },
    {
      name: 'Rahul Kumar',
      rating: 5,
      review: 'Excellent service! They helped me find a great hostel near my college. Highly recommended for students.'
    },
    {
      name: 'Anjali Patel',
      rating: 4,
      review: 'Great platform with genuine listings. The property management service is top-notch. Very satisfied with my experience.'
    },
    {
      name: 'Vikash Singh',
      rating: 5,
      review: 'Professional and reliable service. Found the perfect family apartment in just a few days. Thank you RentEase team!'
    }
  ];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-gray-600">
            Real experiences from our satisfied customers
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                {renderStars(testimonial.rating)}
              </div>

              <p className="text-gray-600 mb-4 italic leading-relaxed">
                "{testimonial.review}"
              </p>

              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">
                  {testimonial.name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsSection;