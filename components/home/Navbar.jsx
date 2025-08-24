"use client";

import React from "react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-center">
          <span className="text-2xl md:text-3xl font-bold text-sky-600">
            Flatzy
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;