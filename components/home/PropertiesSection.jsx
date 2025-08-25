"use client";

import React, { useState, useEffect } from "react";
import PropertyCard from "../ui/PropertyCard";
import toast from "react-hot-toast";
import FilterSection from "./FilterSection";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "All",
    location: "",
    sortBy: "date",
    priceRange: [0, Infinity],
  });

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const res = await fetch("/api/properties");
        const data = await res.json();

        if (data.success) {
          setProperties(data.data);
        } else {
          toast.error("Failed to fetch properties");
        }
      } catch (error) {
        toast.error("Something went wrong while fetching properties");
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // apply filtering & sorting
  const filteredProperties = properties
    .filter((property) => {
      // filter by type
      if (filters.type !== "All" && property.type !== filters.type)
        return false;

      // filter by location
      if (
        filters.location &&
        !property.location
          .toLowerCase()
          .includes(filters.location.toLowerCase())
      ) {
        return false;
      }

      // filter by price range
      if (
        property.rent < filters.priceRange[0] ||
        property.rent > filters.priceRange[1]
      ) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "priceLowHigh") {
        return a.rent - b.rent;
      } else if (filters.sortBy === "priceHighLow") {
        return b.rent - a.rent;
      } else if (filters.sortBy === "date") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return 0;
    });

  if (loading) {
    return (
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading properties...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="properties" className="bg-gray-50">
      <FilterSection onFilterChange={setFilters} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Available Properties
          </h2>
          <p className="text-lg text-gray-600">
            Discover your perfect rental home from our curated selection
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">
              No properties found for the selected filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesSection;
