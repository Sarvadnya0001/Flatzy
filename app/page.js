"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import PropertiesSection from "@/components/home/PropertiesSection";
import ServicesSection from "@/components/home/ServicesSection";
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/home/Footer";

const Page = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <PropertiesSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Page;
