"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Upload } from "lucide-react";

export default function AddPropertyForm() {
  const [loading, setLoading] = useState(false);

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const files = form.getAll("images");
    let imageUrls = [];

    if (files.length > 0 && files[0].size > 0) {
      const uploadData = new FormData();
      files.forEach((f) => uploadData.append("files", f));

      const uploadRes = await fetch("/api/upload", {
        method: "POST",
        body: uploadData,
      });

      const uploadJson = await uploadRes.json();
      if (uploadJson.success) {
        imageUrls = uploadJson.urls;
      } else {
        toast.error("❌ Image upload failed");
        setLoading(false);
        return;
      }
    }

    const property = {
      title: form.get("title"),
      type: form.get("type"),
      furnishing: form.get("furnishing"),
      preference: form.get("preference"),
      available_from: form.get("available_from"),
      rent: Number(form.get("rent")),
      location: form.get("location"),
      description: form.get("description"),
      images: imageUrls,
    };

    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(property),
    });

    const data = await res.json();
    setLoading(false);

    if (data.success) {
      toast.success("✅ Property added successfully!");
      e.target.reset();
    } else {
      toast.error("❌ Failed: " + data.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">
        🏠 Add New Property
      </h2>

      <form
        onSubmit={handleAddProperty}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            placeholder="Luxury Apartment"
            required
            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Type + Furnishing in 2 columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Flat</option>
              <option>Villa</option>
              <option>Independent House</option>
              <option>Studio</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Furnishing
            </label>
            <select
              name="furnishing"
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Furnished</option>
              <option>Semi-Furnished</option>
              <option>Unfurnished</option>
            </select>
          </div>
        </div>

        {/* Preference + Available From */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Preference
            </label>
            <select
              name="preference"
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Family</option>
              <option>Bachelor</option>
              <option>Anyone</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Available From
            </label>
            <input
              name="available_from"
              type="date"
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Rent + Location */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Rent (₹)
            </label>
            <input
              name="rent"
              type="number"
              placeholder="25000"
              required
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="location"
              type="text"
              placeholder="Bangalore, India"
              required
              className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Images
          </label>
          <div className="border-2 border-dashed border-gray-300 p-6 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 transition">
            <Upload className="h-10 w-10 text-gray-400 mb-2" />
            <p className="text-gray-500 text-sm mb-2">
              Drag & drop or click to upload
            </p>
            <input
              name="images"
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              id="fileUpload"
              onChange={(e) => {
                if (e.target.files.length > 0) {
                  toast.success(`${e.target.files.length} file(s) selected`);
                }
              }}
            />
            <label
              htmlFor="fileUpload"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition cursor-pointer"
            >
              Choose Files
            </label>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Spacious 2BHK with sea view..."
            rows={4}
            className="w-full border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          ></textarea>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition font-medium shadow-md"
        >
          {loading ? "⏳ Uploading..." : "✅ Add Property"}
        </button>
      </form>
    </div>
  );
}
