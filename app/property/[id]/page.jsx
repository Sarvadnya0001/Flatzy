import React from "react";
import { ArrowLeft, MapPin } from "lucide-react";
import Link from "next/link";
import Property from "@/models/PropertySchema";
import dbConnect from "@/lib/dbConnect";
import { notFound } from "next/navigation";
import PropertyCard from "@/components/ui/PropertyCard";

// Fetch property from DB
async function getProperty(id) {
  await dbConnect();
  const property = await Property.findById(id).lean();
  if (!property) return null;

  property._id = property._id.toString(); // convert ObjectId to string
  return property;
}

// ✅ Generate metadata for Open Graph (photo preview in share)
export async function generateMetadata({ params }) {
  const property = await getProperty(params.id);
  if (!property) return { title: "Property Not Found" };

  // Ensure absolute URL for image
  const imageUrl = property.images?.[0]
    ? `${process.env.NEXT_PUBLIC_BASE_URL}${property.images[0]}`
    : `${process.env.NEXT_PUBLIC_BASE_URL}/placeholder.jpg`;

  return {
    title: property.title,
    description: property.description || "Check out this amazing property!",
    openGraph: {
      title: property.title,
      description: property.description || "Check out this amazing property!",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: property.title,
        },
      ],
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/property/${property._id}`,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: property.title,
      description: property.description || "Check out this amazing property!",
      images: [imageUrl],
    },
  };
}

export default async function PropertyDetails({ params }) {
  const property = await getProperty(params.id);

  if (!property) {
    notFound();
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
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Quick Info
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>ID:</span>{" "}
                <span className="font-medium">{property._id}</span>
              </div>
              <div className="flex justify-between">
                <span>Type:</span>{" "}
                <span className="font-medium">{property.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Furnishing:</span>{" "}
                <span className="font-medium">{property.furnishing}</span>
              </div>
              <div className="flex justify-between">
                <span>Preference:</span>{" "}
                <span className="font-medium">{property.preference}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Similar Properties (for now show same property for demo) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <PropertyCard property={property} />
        </div>
      </div>
    </div>
  );
}
