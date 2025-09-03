"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { LandPlot, Upload, X } from "lucide-react";

export default function AddPropertyForm() {
  const [loading, setLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length > 0) {
      const newImages = files.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      setSelectedImages((prev) => [...prev, ...newImages]);
      toast.success(`${files.length} file(s) selected`);
    }
  };

  const removeImage = (index) => {
    setSelectedImages((prev) => {
      const updated = [...prev];
      updated.splice(index, 1);
      return updated;
    });
  };

  const handleAddProperty = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    let imageUrls = [];

    if (selectedImages.length > 0) {
      const uploadData = new FormData();
      selectedImages.forEach((img) => uploadData.append("files", img.file));

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
      setSelectedImages([]);
    } else {
      toast.error("❌ Failed: " + data.error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex flex-row items-center gap-2 text-gray-800">
        <LandPlot /> Add New Property
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
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Type + Furnishing */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Type
            </label>
            <select
              name="type"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            >
              <option>Flat</option>
              <option>Hostel</option>
              <option>Room</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Furnishing
            </label>
            <select
              name="furnishing"
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              placeholder="5000"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <input
              name="location"
              type="text"
              placeholder="Nagpur"
              required
              className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
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
              onChange={handleImageChange}
            />
            <label
              htmlFor="fileUpload"
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition cursor-pointer"
            >
              Choose Files
            </label>
          </div>

          {/* Preview Selected Images */}
          {selectedImages.length > 0 && (
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              {selectedImages.map((img, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={img.preview}
                    alt={`preview-${idx}`}
                    className="w-full h-28 object-cover rounded-lg border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute top-1 right-1 bg-black bg-opacity-60 text-white rounded-full p-1 hover:bg-red-600 transition"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Description about the property..."
            rows={4}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 outline-none"
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