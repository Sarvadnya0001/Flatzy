"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import PropertyCard from "@/components/ui/PropertyCard";

const CategoryPage = () => {
  const { type } = useParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProperties = async () => {
      try {
        const res = await fetch(`/api/properties-cat/${type}`);
        const data = await res.json();

        if (data.success) {
          setProperties(data.data);
        }
      } catch (err) {
        console.error("Error fetching category properties:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProperties();
  }, [type]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-10 w-10 border-2 border-sky-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8 capitalize">
          {type} Properties
        </h1>

        {properties.length === 0 ? (
          <p className="text-gray-600">No {type} properties available.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;
