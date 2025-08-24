"use client";

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col md:flex-row justify-between items-center">
        <span className="text-gray-600 text-sm md:text-base mb-4 md:mb-0">
          &copy; {new Date().getFullYear()} Flatzy. All rights reserved.
        </span>

        <div className="flex space-x-6">
          <a
            href="#services"
            className="text-gray-600 hover:text-sky-600 transition-colors text-sm md:text-base"
          >
            Services
          </a>
          <a
            href="#properties"
            className="text-gray-600 hover:text-sky-600 transition-colors text-sm md:text-base"
          >
            Properties
          </a>
          <a
            href="#contact"
            className="text-gray-600 hover:text-sky-600 transition-colors text-sm md:text-base"
          >
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;