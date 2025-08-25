"use client";

import { useState, useEffect } from "react";

export default function PropertyList() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch("/api/properties")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setProperties(data.data);
      })
      .catch((err) => console.error("Error fetching properties:", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">
        Manage Properties
      </h2>

      {loading ? (
        <p className="text-gray-500">Loading properties...</p>
      ) : properties.length === 0 ? (
        <p className="text-gray-500">No properties found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property) => (
            <div
              key={property._id}
              className="bg-white shadow-lg rounded-xl p-5 transition transform hover:scale-[1.02] hover:shadow-xl"
            >
              <h3 className="font-semibold text-lg">{property.title}</h3>
              <p className="text-sm text-gray-500 mb-3">
                {property.type} · {property.location}
              </p>
              <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                {property.description}
              </p>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition w-full">
                Edit
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}