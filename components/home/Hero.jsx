import React, { useState } from 'react';
import { Search, MapPin, DollarSign, Home } from 'lucide-react';

const Hero = () => {
  const [searchData, setSearchData] = useState({
    location: '',
    priceRange: '',
    propertyType: ''
  });

  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Search data:', searchData);
    // Implement search functionality
  };

  return (
    <div
      className="relative h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')`
      }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Find Your Next Rental Home
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover the perfect place to call home with our curated rental properties
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white rounded-lg p-4 md:p-6 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location Input */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Enter location"
                  value={searchData.location}
                  onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
                />
              </div>

              {/* Price Range */}
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={searchData.priceRange}
                  onChange={(e) => setSearchData({ ...searchData, priceRange: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
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
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={searchData.propertyType}
                  onChange={(e) => setSearchData({ ...searchData, propertyType: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-sky-500 focus:border-transparent text-gray-900"
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
                className="bg-sky-500 hover:bg-sky-600 text-white px-6 py-3 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                <Search size={20} />
                <span>Search</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Hero;