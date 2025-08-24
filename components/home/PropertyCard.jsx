import React from "react";
import { Calendar, MapPin, MessageCircle, Eye } from "lucide-react";
import Link from "next/link";

const PropertyCard = ({ property }) => {
  const handleWhatsAppClick = (type) => {
    const message =
      type === "visit"
        ? `Hi, I would like to schedule a visit for the property: ${
            property?.title || "N/A"
          } at ${property?.location || "N/A"}`
        : `Hi, I would like to inquire about the property: ${
            property?.title || "N/A"
          } at ${property?.location || "N/A"}`;

    const whatsappUrl = `https://wa.me/919985749534?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="group bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link href={`/property/${property?._id || ""}`} className="block relative">
        <img
          src={property?.images?.[0] || "/placeholder.jpg"}
          alt={property?.title || "Property"}
          className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />

        {/* Type badge */}
        {property?.type && (
          <div className="absolute top-3 left-3 bg-gradient-to-r from-sky-500 to-sky-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-md">
            {property.type}
          </div>
        )}

        {/* Rent badge */}
        {property?.rent && (
          <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-sky-700 px-3 py-1 rounded-full text-sm font-semibold shadow-md">
            ₹{Number(property.rent).toLocaleString()}/month
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/property/${property?._id || ""}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-sky-600 transition-colors">
            {property?.title || "Untitled Property"}
          </h3>
        </Link>

        {/* Details */}
        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          {property?.furnishing && (
            <p>
              <span className="font-medium">Furnishing:</span>{" "}
              {property.furnishing}
            </p>
          )}

          {property?.preference && (
            <p>
              <span className="font-medium">Preference:</span>{" "}
              {property.preference}
            </p>
          )}

          {property?.available_from && (
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-sky-500" />
              <span>
                Available from{" "}
                {new Date(property.available_from).toLocaleDateString()}
              </span>
            </div>
          )}

          {property?.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-rose-500" />
              <span>{property.location}</span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={() => handleWhatsAppClick("visit")}
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <Eye size={16} />
            <span>Visit</span>
          </button>

          <button
            onClick={() => handleWhatsAppClick("inquire")}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle size={16} />
            <span>Inquire</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;