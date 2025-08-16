import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';

// Mock data - replace with actual API data
const mockProperties = [
  {
    id: '1',
    title: 'Modern 2BHK Apartment',
    type: 'Flat',
    furnishing: 'Furnished',
    preference: 'Family',
    available_from: '2024-02-01',
    rent: 25000,
    location: 'Koramangala, Bangalore',
    image_url: 'https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Beautiful modern apartment with all amenities'
  },
  {
    id: '2',
    title: 'Cozy Student Room',
    type: 'Room',
    furnishing: 'Semi-Furnished',
    preference: 'Students',
    available_from: '2024-01-15',
    rent: 8000,
    location: 'Whitefield, Bangalore',
    image_url: 'https://images.pexels.com/photos/1457842/pexels-photo-1457842.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Perfect for students with study area'
  },
  {
    id: '3',
    title: 'Premium Hostel Accommodation',
    type: 'Hostel',
    furnishing: 'Furnished',
    preference: 'Students',
    available_from: '2024-01-20',
    rent: 12000,
    location: 'Electronic City, Bangalore',
    image_url: 'https://images.pexels.com/photos/271816/pexels-photo-271816.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Modern hostel with all facilities'
  },
  {
    id: '4',
    title: 'Spacious 3BHK Flat',
    type: 'Flat',
    furnishing: 'Unfurnished',
    preference: 'Family',
    available_from: '2024-02-10',
    rent: 35000,
    location: 'Indiranagar, Bangalore',
    image_url: 'https://images.pexels.com/photos/2079246/pexels-photo-2079246.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Large family apartment in prime location'
  },
  {
    id: '5',
    title: 'Executive Room',
    type: 'Room',
    furnishing: 'Furnished',
    preference: 'Professionals',
    available_from: '2024-01-25',
    rent: 15000,
    location: 'HSR Layout, Bangalore',
    image_url: 'https://images.pexels.com/photos/1454804/pexels-photo-1454804.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Perfect for working professionals'
  },
  {
    id: '6',
    title: 'Budget Hostel Room',
    type: 'Hostel',
    furnishing: 'Furnished',
    preference: 'Students',
    available_from: '2024-01-30',
    rent: 7000,
    location: 'BTM Layout, Bangalore',
    image_url: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=500',
    description: 'Affordable hostel accommodation'
  }
];

const PropertiesSection = ({ activeFilter }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProperties(mockProperties);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredProperties = properties.filter(property => {
    if (activeFilter === 'All') return true;

    const filterMap = {
      Flats: 'Flat',
      Hostels: 'Hostel',
      Rooms: 'Room'
    };

    return property.type === filterMap[activeFilter];
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
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No properties found for the selected filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PropertiesSection;