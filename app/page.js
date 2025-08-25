"use client";

import React from "react";
import Hero from "@/components/home/Hero";
import PropertiesSection from "@/components/home/PropertiesSection";
import ServicesSection from "@/components/home/ServicesSection";
import Navbar from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import FloatingMenu from "@/components/ui/FloatingMenu";
import AdminButton from "@/components/ui/AdminButton";

const Page = () => {
  return (
    <div>
      <Navbar />
      <AdminButton />
      <Hero />
      <PropertiesSection />
      <ServicesSection />
      <FloatingMenu />
      <Footer />
    </div>
  );
};

export default Page;
