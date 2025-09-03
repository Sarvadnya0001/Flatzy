"use client";

import React from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { Calendar, MapPin, MessageCircle, Images, Share2 } from "lucide-react";
import { number } from "@/data";

const PropertyCard = ({ property }) => {
  const handleWhatsAppClick = () => {
    const message = `Hi, I would like to enquire about the property: ${property.title} at ${property.location}`;
    const whatsappUrl = `https://wa.me/${number}?text=${encodeURIComponent(
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
        toast.error("Share failed. Please try again.");
      }
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("🔗 Link copied to clipboard!");
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
      {/* Image */}
      <Link href={`/property/${property._id}`} className="block relative">
        <img
          src={property.images?.[0] || "/placeholder.jpg"}
          alt={property.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        {/* Price */}
        <div className="absolute top-3 left-3 bg-sky-600 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
          ₹{property.rent.toLocaleString()}/mo
        </div>

        {/* Availability Badge */}
        <div
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium shadow-md ${
            property.isAvailable
              ? "bg-emerald-500 text-white"
              : "bg-rose-500 text-white"
          }`}
        >
          {property.isAvailable ? "Available" : "Not Available"}
        </div>

        {/* Extra images */}
        {property.images?.length > 1 && (
          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-md text-xs">
            +{property.images.length}
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="p-5">
        <Link href={`/property/${property._id}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1 hover:text-sky-600 transition-colors">
            {property.title}
          </h3>
        </Link>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {property.type && (
            <span className="bg-sky-50 text-sky-700 text-xs px-2.5 py-1 rounded-full border border-sky-100">
              {property.type}
            </span>
          )}
          {property.furnishing && (
            <span className="bg-emerald-50 text-emerald-700 text-xs px-2.5 py-1 rounded-full border border-emerald-100">
              {property.furnishing}
            </span>
          )}
          {property.preference && (
            <span className="bg-rose-50 text-rose-700 text-xs px-2.5 py-1 rounded-full border border-rose-100">
              {property.preference}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-5 text-gray-600 text-sm">
          {property.location && (
            <div className="flex items-center">
              <MapPin size={16} className="mr-2 text-rose-500" />
              <span>{property.location}</span>
            </div>
          )}
          {!property.isAvailable && (
            <>
              {property.available_from && (
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2 text-sky-500" />
                  <span>
                    Available from{" "}
                    {new Date(property.available_from).toLocaleDateString()}
                  </span>
                </div>
              )}
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between gap-2">
          <Link
            href={`/property/${property._id}`}
            className="flex-1 bg-sky-500 hover:bg-sky-600 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <Images size={16} />
            <span>Photos</span>
          </Link>

          <button
            onClick={handleWhatsAppClick}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
          >
            <MessageCircle size={16} />
            <span>Enquire</span>
          </button>

          <button
            onClick={handleShareClick}
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white px-3 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-200 shadow-sm hover:shadow-md"
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
