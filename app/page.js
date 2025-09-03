"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import PropertiesSection from "@/components/home/PropertiesSection";
import ServicesSection from "@/components/home/ServicesSection";
import Navbar from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import AdminButton from "@/components/ui/AdminButton";
import { Toaster } from "react-hot-toast";

const Page = () => {
  return (
    <div>
      <Toaster position="top-right" reverseOrder={false} />
      <Navbar />
      <AdminButton />
      <Hero />
      <PropertiesSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Page;
