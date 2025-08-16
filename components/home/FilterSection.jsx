import React, { useState } from 'react';

const FilterSection = ({ onFilterChange }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Flats', 'Hostels', 'Rooms'];

  const handleFilterClick = (filter) => {
    setActiveFilter(filter);
    onFilterChange(filter);
  };

  return (
    <div className="bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => handleFilterClick(filter)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                activeFilter === filter
                  ? 'bg-sky-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-sky-100 hover:text-sky-600'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FilterSection;