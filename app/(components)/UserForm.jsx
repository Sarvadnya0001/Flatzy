"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const UserForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({});
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoUrl = "";

      // Upload file to /api/upload
      if (file) {
        const uploadData = new FormData();
        uploadData.append("files", file);

        const uploadRes = await fetch("/api/upload", {
          method: "POST",
          body: uploadData,
        });

        const uploadJson = await uploadRes.json();
        if (uploadJson.success) {
          photoUrl = uploadJson.urls[0]; // first uploaded file
        } else {
          toast.error("❌ Image upload failed");
          setLoading(false);
          return;
        }
      }

      // Create user
      const res = await fetch("/api/Users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, photo: photoUrl }),
      });

      const response = await res.json();

      if (!res.ok || !response.success) {
        toast.error(response.message || "Something went wrong");
      } else {
        toast.success("✅ User created successfully!");
        router.refresh();
        router.push("/");
      }
    } catch (err) {
      toast.error("❌ Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md flex flex-col gap-5"
      >
        <h1 className="text-2xl font-bold text-gray-800 text-center">
          Create New User
        </h1>

        {/* Full Name */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            onChange={handleChange}
            value={formData.name || ""}
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={handleChange}
            required
            value={formData.email || ""}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={handleChange}
            required
            value={formData.password || ""}
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Role */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">Role</label>
          <select
            id="role"
            name="role"
            onChange={handleChange}
            value={formData.role || ""}
            required
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="">Select Role</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        {/* Profile Photo */}
        <div>
          <label className="block text-gray-600 font-medium mb-1">
            Profile Photo
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full text-gray-600"
          />

          {preview && (
            <div className="mt-3 flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-28 h-28 object-cover rounded-full border"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? "Creating..." : "Create User"}
        </button>
      </form>
    </div>
  );
};

export default UserForm;