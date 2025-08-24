"use client";

import { useState, useEffect, useRef } from "react";
import { Home, Users, PlusCircle, BarChart3, LogOut, Menu } from "lucide-react";
import AddPropertyForm from "./AddPropertyForm";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const contentRef = useRef(null);

  const tabs = [
    { key: "properties", label: "Properties", icon: Home },
    { key: "users", label: "Users", icon: Users },
    { key: "add", label: "Add Property", icon: PlusCircle },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-50 font-sans">
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center bg-blue-800 text-white p-4">
        <h1 className="text-xl font-bold">Flatzy Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-blue-700 to-blue-900 text-white shadow-xl p-6 flex flex-col justify-between transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:w-64 fixed md:static inset-y-0 z-20`}
      >
        <div>
          <h1 className="hidden md:block text-2xl font-extrabold tracking-wide mb-8">
            Flatzy Admin
          </h1>
          <nav className="space-y-3">
            {tabs.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                className={`flex items-center w-full px-4 py-2 rounded-lg transition-all ${
                  activeTab === key
                    ? "bg-white text-blue-800 font-semibold"
                    : "hover:bg-blue-600"
                }`}
                onClick={() => {
                  setActiveTab(key);
                  setSidebarOpen(false);
                }}
              >
                <Icon className="mr-3 h-5 w-5" /> {label}
              </button>
            ))}
          </nav>
        </div>
        <button className="flex items-center justify-center px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium mt-6 md:mt-0">
          <LogOut className="mr-2 h-5 w-5" /> Logout
        </button>
      </aside>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black opacity-25 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 ml-0 md:ml-64">
        {activeTab === "properties" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Manage Properties
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((id) => (
                <div
                  key={id}
                  className="bg-white shadow-lg rounded-xl p-5 transition transform hover:scale-[1.02]"
                >
                  <h3 className="font-semibold text-lg">Flat #{id}</h3>
                  <p className="text-sm text-gray-500 mb-3">2BHK · New Delhi</p>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition w-full">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Registered Users
            </h2>
            <ul className="space-y-3">
              {["Amit", "Sneha", "Rahul"].map((user, i) => (
                <li
                  key={i}
                  className="p-4 bg-white rounded-lg shadow flex justify-between items-center hover:shadow-md transition"
                >
                  <span className="font-medium">{user}</span>
                  <button className="px-3 py-1 border rounded-md hover:bg-gray-100 transition">
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === "add" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Add New Property
            </h2>
            <AddPropertyForm />
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-2xl font-bold mb-6 border-b pb-2">Analytics</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white shadow-lg p-6 rounded-xl hover:shadow-xl transition">
                <h3 className="text-lg font-semibold">Total Listings</h3>
                <p className="text-3xl font-bold text-blue-600 mt-2">120</p>
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
        )}
      </main>
    </div>
  );
}