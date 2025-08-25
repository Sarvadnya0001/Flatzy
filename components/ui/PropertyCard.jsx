"use client";

import React from "react";
import Link from "next/link";
import { Calendar, MapPin, MessageCircle, Images, Share2 } from "lucide-react";

const PropertyCard = ({ property }) => {
  const handleWhatsAppClick = () => {
    const message = `Hi, I would like to inquire about the property: ${property.title} at ${property.location}`;
    const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleShareClick = async () => {
    const shareData = {
      title: property.title,
      text: property.description || "Check out this property!",
      url: `${window.location.origin}/property/${property._id}`,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Share failed:", err.message);
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div className="group bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
      {/* Image */}
      <Link href={`/property/${property._id}`} className="block relative">
        <img
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-56 object-cover rounded-t-2xl transition-transform duration-500 group-hover:scale-105"
        />
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/property/${property._id}`}>
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-sky-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        {/* Details */}
        <div className="space-y-2 mb-4 text-gray-600 text-sm">
          {property.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-1 text-rose-500" />
              <span>{property.location}</span>
            </div>
          )}
          {property.available_from && (
            <div className="flex items-center">
              <Calendar size={16} className="mr-1 text-sky-500" />
              <span>
                Available from{" "}
                {new Date(property.available_from).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`/property/${property._id}`}
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <Images size={16} />
            <span>Photos</span>
          </Link>

          <button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <MessageCircle size={16} />
            <span>Inquire</span>
          </button>

          <button
            onClick={handleShareClick}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-xl font-medium flex items-center justify-center space-x-2 transition-all shadow-md hover:shadow-lg"
          >
            <Share2 size={16} />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;