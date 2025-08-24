import React, { useState } from "react";
import { Search, MapPin, DollarSign, Home } from "lucide-react";

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: "",
    priceRange: "",
    propertyType: "",
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search data:", searchData);
    // TODO: Implement actual search functionality
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080')`,
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center px-4">
        <div className="text-center text-white max-w-4xl w-full">
          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight drop-shadow-xl">
            Find Your Perfect Rental with{" "}
            <span className="bg-gradient-to-r from-sky-400 to-sky-600 bg-clip-text text-transparent">
              Flatzy
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-2xl mb-10 text-gray-200">
            From budget-friendly rooms to premium flats — discover spaces
            tailored to your needs.
          </p>

          {/* Search Bar */}
          <form
            onSubmit={handleSearch}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-5 md:p-8 shadow-2xl border border-gray-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Price */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Price Range</option>
                  <option value="0-10000">₹0 - ₹10,000</option>
                  <option value="10000-25000">₹10,000 - ₹25,000</option>
                  <option value="25000-50000">₹25,000 - ₹50,000</option>
                  <option value="50000+">₹50,000+</option>
                </select>
              </div>

              {/* Property Type */}
              <div className="relative">
                <Home className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={searchData.propertyType}
                  onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg 
                             focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
                >
                  <option value="">Property Type</option>
                  <option value="Flat">Flat</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Room">Room</option>
                </select>
              </div>

              {/* Search Button */}
              <button
                type="submit"
                className="bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 
                           text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center 
                           space-x-2 transition-all duration-200 shadow-lg"
              >
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </form>

          {/* Highlights */}
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <span className="bg-white/20 px-5 py-2 rounded-full text-sm backdrop-blur-md">
              🏠 1000+ Verified Listings
            </span>
            <span className="bg-white/20 px-5 py-2 rounded-full text-sm backdrop-blur-md">
              🔑 Flexible Rentals
            </span>
            <span className="bg-white/20 px-5 py-2 rounded-full text-sm backdrop-blur-md">
              💸 No Hidden Charges
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;