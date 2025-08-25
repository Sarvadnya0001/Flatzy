"use client";

import React, { useState } from "react";
import {
  Home,
  Building2,
  BedDouble,
  LayoutGrid,
  MapPin,
  IndianRupee,
  SortAsc,
} from "lucide-react";

const FilterSection = ({ onFilterChange }) => {
  const [activeType, setActiveType] = useState("All");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [priceRange, setPriceRange] = useState([0, 50000]);

  const typeFilters = [
    { label: "All", icon: LayoutGrid },
    { label: "Flat", icon: Building2 },
    { label: "Hostel", icon: Home },
    { label: "Room", icon: BedDouble },
  ];

  const handleFilterChange = (newFilters) => {
    onFilterChange({
      type: activeType,
      location,
      sortBy,
      priceRange,
      ...newFilters,
    });
  };

  const handleTypeClick = (label) => {
    setActiveType(label);
    handleFilterChange({ type: label });
  };

  return (
    <div className="backdrop-blur-md bg-white/70 p-6 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        {/* Type Filter */}
        <div className="flex flex-wrap justify-center gap-4">
          {typeFilters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => handleTypeClick(label)}
              aria-pressed={activeType === label}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border 
                ${
                  activeType === label
                    ? "bg-sky-500 text-white border-sky-500 shadow-md scale-105"
                    : "bg-white/70 text-gray-700 border-gray-200 hover:bg-sky-50 hover:text-sky-600 hover:border-sky-400"
                }`}
            >
              <Icon size={18} />
              {label}
            </button>
          ))}
        </div>

        {/* Other Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              placeholder="Search by location..."
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                handleFilterChange({ location: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            />
          </div>

          {/* Price Range */}
          <div className="relative">
            <IndianRupee
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={priceRange.join("-")}
              onChange={(e) => {
                const [min, max] = e.target.value.split("-").map(Number);
                setPriceRange([min, max]);
                handleFilterChange({ priceRange: [min, max] });
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            >
              <option value="0-50000">Any Price</option>
              <option value="0-5000">Under ₹5000</option>
              <option value="5000-15000">₹5000 - ₹15000</option>
              <option value="15000-30000">₹15000 - ₹30000</option>
              <option value="30000-50000">Above ₹30000</option>
            </select>
          </div>

          {/* Sort By */}
          <div className="relative">
            <SortAsc
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                handleFilterChange({ sortBy: e.target.value });
              }}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-400 outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="lowToHigh">Price: Low to High</option>
              <option value="highToLow">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
