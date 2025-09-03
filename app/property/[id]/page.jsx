"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Calendar, MapPin, Share2, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import PropertyCard from "../../../components/ui/PropertyCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Keyboard } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import BackButton from "@/components/ui/BackButton";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const res = await fetch(`/api/properties/${id}`);
        const data = await res.json();

        if (data.success) {
          setProperty(data.data);

          const recRes = await fetch(
            `/api/properties?type=${data.data.type}&location=${data.data.location}`
          );
          const recData = await recRes.json();
          if (recData.success) {
            setRecommendations(
              recData.data.filter((p) => p._id !== data.data._id).slice(0, 3)
            );
          }
        } else {
          toast.error("Failed to load property");
        }
      } catch (error) {
        toast.error("Error fetching property details");
      } finally {
        setLoading(false);
      }
    };
    fetchProperty();
  }, [id]);

  const handleWhatsAppClick = () => {
    const message = `Hi, I'm interested in the property: ${property.title} at ${property.location}`;
    const url = `https://wa.me/919876543210?text=${encodeURIComponent(
      message
    )}`;
    toast.success("Opening WhatsApp...");
    window.open(url, "_blank");
  };

  const handleShareClick = () => {
    const shareData = {
      title: property.title,
      text: property.description || "Check out this property!",
      url: `${window.location.origin}/property/${property._id}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .catch(() => toast.error("Sharing failed, try again."));
    } else {
      navigator.clipboard.writeText(shareData.url);
      toast.success("🔗 Link copied to clipboard!");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin h-10 w-10 border-2 border-sky-500 border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!property) return null;

  return (
    <div className="bg-gray-50 min-h-screen">
      <BackButton />

      {/* Hero Section */}
      <div className="relative w-full max-h-[550px]">
        {property.images?.length > 1 ? (
          <>
            <Swiper
              modules={[Navigation, Pagination, Keyboard]}
              navigation={{
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
              }}
              pagination={{ clickable: true }}
              keyboard
              className="h-[500px] rounded-b-2xl overflow-hidden z-10"
            >
              {property.images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={img}
                    alt={`Property ${idx}`}
                    className="w-full h-[500px] object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            {/* Custom Navigation Arrows */}
            <button className="custom-prev absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full shadow-md">
              ‹
            </button>
            <button className="custom-next absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/80 hover:bg-white p-3 rounded-full shadow-md">
              ›
            </button>
          </>
        ) : (
          <img
            src={property.images?.[0] || "/placeholder.jpg"}
            alt={property.title}
            className="w-full h-[500px] object-cover rounded-b-2xl z-10"
          />
        )}

        {/* Gradient overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>

        {/* Rent badge */}
        <div className="absolute bottom-6 right-6 z-20 bg-gradient-to-r from-sky-600 to-blue-500 text-white px-6 py-2.5 rounded-full font-semibold shadow-xl text-lg">
          ₹{property.rent.toLocaleString()}/mo
        </div>

        {/* Action buttons */}
        <div className="absolute top-6 right-6 flex gap-3 z-20">
          <button
            onClick={handleShareClick}
            className="bg-white/90 backdrop-blur-sm hover:bg-white text-sky-600 p-3 rounded-full shadow-md transition"
          >
            <Share2 size={22} />
          </button>
          <button
            onClick={handleWhatsAppClick}
            className="bg-emerald-500 hover:bg-emerald-600 p-3 rounded-full shadow-md text-white transition"
          >
            <MessageCircle size={22} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left Section */}
        <div className="md:col-span-2 space-y-10">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              {property.title}
            </h1>
            <div className="flex items-center text-gray-600 text-lg">
              <MapPin size={20} className="mr-2 text-rose-500" />
              {property.location}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-3">
            {property.type && (
              <span className="bg-sky-100 text-sky-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                {property.type}
              </span>
            )}
            {property.furnishing && (
              <span className="bg-emerald-100 text-emerald-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                {property.furnishing}
              </span>
            )}
            {property.preference && (
              <span className="bg-rose-100 text-rose-700 px-4 py-1 rounded-full text-sm font-medium shadow-sm">
                {property.preference}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-3">About this property</h2>
            <p className="text-gray-700 leading-relaxed text-lg">
              {property.description || "No description provided."}
            </p>
          </div>

          {/* Availability */}
          {property.available_from && (
            <div className="flex items-center gap-3 bg-white rounded-2xl shadow-md p-6 text-lg text-gray-700">
              <Calendar size={22} className="text-sky-500" />
              Available from{" "}
              <span className="font-medium">
                {new Date(property.available_from).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Right Section (Sticky Inquiry Card) */}
        <div className="md:col-span-1">
          <div className="sticky top-20 bg-white rounded-2xl shadow-lg p-6 space-y-5">
            <h3 className="text-3xl font-bold text-gray-900">
              ₹{property.rent.toLocaleString()}/month
            </h3>
            {property.available_from && (
              <p className="text-gray-600">
                Available from{" "}
                {new Date(property.available_from).toLocaleDateString()}
              </p>
            )}

            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-xl font-medium flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle size={20} />
              Inquire on WhatsApp
            </button>

            <Link
              href="#gallery"
              className="w-full block text-center bg-sky-500 hover:bg-sky-600 text-white py-3 rounded-xl font-medium shadow-md"
            >
              View Photos
            </Link>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-gray-100 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Recommended for you
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((rec) => (
                <PropertyCard key={rec._id} property={rec} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;
