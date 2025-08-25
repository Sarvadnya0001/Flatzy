"use client";

export default function Analytics({ properties }) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 border-b pb-2">Analytics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition">
          <h3 className="text-lg font-semibold">Total Listings</h3>
          <p className="text-3xl font-bold text-indigo-600 mt-2">
            {properties?.length || 0}
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition">
          <h3 className="text-lg font-semibold">Active Users</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">85</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition">
          <h3 className="text-lg font-semibold">Bookings</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">43</p>
        </div>
      </div>
    </div>
  );
}