import React from 'react';
import { Calendar, MapPin, MessageCircle, Eye } from 'lucide-react';
import Link from 'next/link';

const PropertyCard = ({ property }) => {
  const handleWhatsAppClick = (type) => {
    const message =
      type === 'visit'
        ? `Hi, I would like to schedule a visit for the property: ${property.title} at ${property.location}`
        : `Hi, I would like to inquire about the property: ${property.title} at ${property.location}`;

    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link href={`/property/${property.id}`} className="block relative">
        <img
          src={property.image_url}
          alt={property.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2 bg-sky-500 text-white px-2 py-1 rounded text-sm font-medium">
          {property.type}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/property/${property.id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-sky-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Furnishing:</span>
            <span className="ml-2">{property.furnishing}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <span className="font-medium">Preference:</span>
            <span className="ml-2">{property.preference}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <Calendar size={16} className="mr-1" />
            <span>Available from {new Date(property.available_from).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-sm text-gray-600">
            <MapPin size={16} className="mr-1" />
            <span>{property.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-sky-600">
            ₹{property.rent.toLocaleString()}/month
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleWhatsAppClick('visit')}
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <Eye size={16} />
            <span>Visit Schedule</span>
          </button>

          <button
            onClick={() => handleWhatsAppClick('inquire')}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md font-medium flex items-center justify-center space-x-2 transition-colors"
          >
            <MessageCircle size={16} />
            <span>Inquire Now</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;