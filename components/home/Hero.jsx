import React from "react";
import BorderButton from "../ui/BorderButton/BorderButton";

const Hero = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background Video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src="/video/hero-1.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 md:px-12">
        {/* Headline */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-xl">
          Discover Your Next Home with{" "}
          <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Flatzy
          </span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mb-8">
          Explore thousands of verified rental properties — from cozy rooms to
          premium flats.
        </p>

        {/* CTA Button */}
        <BorderButton text="Browse Properties" />

        {/* Highlights / Tags */}
        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white">
          <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
            🏠 1000+ Verified Listings
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
            🔑 Flexible Rentals
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md">
            💸 No Hidden Charges
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;
