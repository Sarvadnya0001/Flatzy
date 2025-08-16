"use client";

import React, { useState } from 'react';
import FilterSection from '@/components/home/FilterSection';
import Hero from '@/components/home/Hero';
import PropertiesSection from '@/components/home/PropertiesSection';
import ServicesSection from '@/components/home/ServicesSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';

const Page = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <div>
      <Hero />
      <FilterSection onFilterChange={handleFilterChange} />
      <PropertiesSection activeFilter={activeFilter} />
      <ServicesSection />
      <TestimonialsSection />
    </div>
  );
};

export default Page;