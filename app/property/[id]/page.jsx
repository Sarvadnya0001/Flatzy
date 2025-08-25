import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import PropertyCard from "@/components/ui/PropertyCard";
import Property from "@/models/PropertySchema";

async function getProperty(id) {
  const property = await Property.findById(id).lean();
  if (!property) return null;

  property._id = property._id.toString(); // convert ObjectId to string
  property.createdAt = property.createdAt?.toISOString();
  property.updatedAt = property.updatedAt?.toISOString();

  return property;
}

export default async function PropertyDetails({ params }) {
  const { id } = await params;
  const property = await getProperty(id);

  if (!property) {
    return <div className="p-6 text-red-500">Property not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-sky-600 hover:text-sky-700 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Properties
          </Link>
        </div>
      </div>

      {/* Page content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <img
            src={property.images?.[0]}
            alt={property.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />

          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold mb-2">{property.title}</h1>
            <div className="flex items-center text-gray-600 mb-4">
              <MapPin size={16} className="mr-1" />
              {property.location}
            </div>
            <div className="text-3xl font-bold text-sky-600 mb-6">
              ₹{Number(property.rent).toLocaleString()}/month
            </div>
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600">{property.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Info</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ID:</span> <span className="font-medium">{property._id}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span> <span className="font-medium">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Furnishing:</span> <span className="font-medium">{property.furnishing}</span>
              </div>
              <div className="flex justify-between">
                <span>Preference:</span> <span className="font-medium">{property.preference}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCard property={property} />
        </div>
      </div>
    </div>
  );
}