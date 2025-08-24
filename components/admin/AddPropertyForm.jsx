"use client";

import { useState } from "react";
import toast from "react-hot-toast";

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
    <form
      onSubmit={handleAddProperty}
      className="space-y-5 bg-white p-6 rounded-xl shadow-lg"
    >
      {/* Title */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Title</label>
        <input
          name="title"
          type="text"
          placeholder="Luxury Apartment"
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Type */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Type</label>
        <select
          name="type"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>Flat</option>
          <option>Villa</option>
          <option>Independent House</option>
          <option>Studio</option>
        </select>
      </div>

      {/* Furnishing */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Furnishing
        </label>
        <select
          name="furnishing"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>Furnished</option>
          <option>Semi-Furnished</option>
          <option>Unfurnished</option>
        </select>
      </div>

      {/* Preference */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Preference
        </label>
        <select
          name="preference"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        >
          <option>Family</option>
          <option>Bachelor</option>
          <option>Anyone</option>
        </select>
      </div>

      {/* Available From */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Available From
        </label>
        <input
          name="available_from"
          type="date"
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Rent */}
      <div>
        <label className="block text-sm font-medium text-gray-600">Rent</label>
        <input
          name="rent"
          type="number"
          placeholder="25000"
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Location */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Location
        </label>
        <input
          name="location"
          type="text"
          placeholder="Bangalore, India"
          required
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* Images */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Images
        </label>
        <input
          name="images"
          type="file"
          multiple
          accept="image/*"
          className="w-full border p-2 rounded-md"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-600">
          Description
        </label>
        <textarea
          name="description"
          placeholder="Spacious 2BHK with sea view..."
          className="w-full border p-2 rounded-md focus:ring-2 focus:ring-blue-500 outline-none"
        ></textarea>
      </div>

      <button
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium"
      >
        {loading ? "Uploading..." : "Add Property"}
      </button>
    </form>
  );
}
