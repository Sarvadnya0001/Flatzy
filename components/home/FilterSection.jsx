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
import CustomSelect from "../ui/CustomSelect";

const FilterSection = ({ onFilterChange }) => {
  const [activeType, setActiveType] = useState("All");
  const [location, setLocation] = useState("");
  const [sortBy, setSortBy] = useState("Newest First");
  const [priceRange, setPriceRange] = useState("Any Price");

  const typeFilters = [
    { label: "All", icon: LayoutGrid },
    { label: "Flat", icon: Building2 },
    { label: "Hostel", icon: Home },
    { label: "Room", icon: BedDouble },
  ];

  const priceOptions = [
    "Any Price",
    "Under ₹5000",
    "₹5000 - ₹15000",
    "₹15000 - ₹30000",
    "Above ₹30000",
  ];

  const sortOptions = [
    "Newest First",
    "Oldest First",
    "Price: Low to High",
    "Price: High to Low",
  ];

  const handleFilterChange = (newFilters) => {
    onFilterChange({
      type: activeType,
      location,
      priceRange,
      sortBy,
      ...newFilters,
    });
  };

  const handleTypeClick = (label) => {
    setActiveType(label);
    handleFilterChange({ type: label });
  };

  return (
    <div className="backdrop-blur-md bg-white/70 pt-10 p-6 mb-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-8">
        <div className="flex flex-wrap justify-center gap-4">
          {typeFilters.map(({ label, icon: Icon }) => (
            <button
              key={label}
              onClick={() => handleTypeClick(label)}
              aria-pressed={activeType === label}
              className={`flex items-center cursor-pointer gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 border 
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
        <div className="grid grid-cols-1 items-center md:grid-cols-3 gap-4">
          <div className="relative w-full">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location Search
            </label>
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
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 bg-white shadow-md text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-sky-400 transition hover:border-sky-300"
              />
            </div>
          </div>

          <CustomSelect
            icon={IndianRupee}
            label="Price Range"
            value={priceRange}
            options={priceOptions}
            onChange={(val) => {
              setPriceRange(val);

              let newRange;
              switch (val) {
                case "Any Price":
                  newRange = [0, 50000];
                  break;
                case "Under ₹5000":
                  newRange = [0, 5000];
                  break;
                case "₹5000 - ₹15000":
                  newRange = [5000, 15000];
                  break;
                case "₹15000 - ₹30000":
                  newRange = [15000, 30000];
                  break;
                case "Above ₹30000":
                  newRange = [30000, 50000];
                  break;
                default:
                  newRange = [0, 50000];
              }

              handleFilterChange({ priceRange: newRange });
            }}
          />

          <CustomSelect
            icon={SortAsc}
            label="Sort By"
            value={sortBy}
            options={sortOptions}
            onChange={(val) => {
              setSortBy(val);

              let sortValue;
              switch (val) {
                case "Newest First":
                  sortValue = "newest";
                  break;
                case "Oldest First":
                  sortValue = "oldest";
                  break;
                case "Price: Low to High":
                  sortValue = "lowToHigh";
                  break;
                case "Price: High to Low":
                  sortValue = "highToLow";
                  break;
                default:
                  sortValue = "newest";
              }

              handleFilterChange({ sortBy: sortValue });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterSection;
