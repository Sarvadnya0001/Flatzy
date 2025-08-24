"use client";

import React from "react";
import { Home, Users, Settings, Headphones } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Home,
      title: "Rental Assistance",
      description:
        "Expert guidance to help you find the perfect rental property that meets your needs and budget.",
    },
    {
      icon: Users,
      title: "Tenant Support",
      description:
        "Comprehensive support throughout your tenancy including maintenance requests and dispute resolution.",
    },
    {
      icon: Settings,
      title: "Property Management",
      description:
        "Complete property management services for landlords including tenant screening and rent collection.",
    },
    {
      icon: Headphones,
      title: "24/7 Helpdesk",
      description:
        "Round-the-clock customer support to address any concerns or queries you may have.",
    },
  ];

  return (
    <section id="services" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive rental solutions designed to make your experience smooth, transparent, and stress-free.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-sky-100 rounded-full mb-6">
                  <Icon className="w-8 h-8 text-sky-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;