import React from "react";
import BorderButton from "../ui/BorderButton/BorderButton";

const Hero = () => {
  const randomVideo = `/video/hero-${Math.floor(Math.random() * 3) + 1}.mp4`;

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover"
        src={randomVideo}
        autoPlay
        loop
        muted
        playsInline
        aria-label="Hero background video"
      />

      {/* overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6 md:px-12 animate-fadeIn">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-xl">
          Discover Your Next Home with{" "}
          <span className="bg-gradient-to-r font-zentry from-sky-400 to-sky-600 bg-clip-text text-transparent">
            Flatzy
          </span>
        </h1>

        <p className="text-gray-200 text-lg md:text-2xl max-w-2xl mb-8 drop-shadow-md">
          Explore thousands of verified rental properties — from cozy rooms to
          premium flats.
        </p>

        <BorderButton text="Browse Properties" />

        <div className="mt-8 flex flex-wrap justify-center gap-3 text-sm text-white">
          <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md drop-shadow-md">
            🏠 100+ Verified Listings
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md drop-shadow-md">
            🔑 Flexible Rentals
          </span>
          <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur-md drop-shadow-md">
            💸 No Hidden Charges
          </span>
        </div>
      </div>
    </div>
  );
};

export default Hero;