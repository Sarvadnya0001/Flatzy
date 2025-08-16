import React from 'react';
import { Home, Users, Settings, Headphones } from 'lucide-react';

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: 'Rental Assistance',
      description: 'Expert guidance to help you find the perfect rental property that meets your needs and budget.'
    },
    {
      icon: Users,
      title: 'Tenant Support',
      description: 'Comprehensive support throughout your tenancy including maintenance requests and dispute resolution.'
    },
    {
      icon: Settings,
      title: 'Property Management',
      description: 'Complete property management services for landlords including tenant screening and rent collection.'
    },
    {
      icon: Headphones,
      title: '24/7 Helpdesk',
      description: 'Round-the-clock customer support to address any concerns or queries you may have.'
    }
  ];

  return (
    <div id="services" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600">
            Comprehensive rental solutions to make your experience seamless
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div
                key={index}
                className="text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-4">
                  <IconComponent className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServicesSection;