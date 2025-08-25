"use client";

import { useState, useEffect } from "react";
import { Home, Users, PlusCircle, BarChart3, LogOut, Menu } from "lucide-react";
import AddPropertyForm from "./AddPropertyForm";
import { signOut } from "next-auth/react";
import UserList from "./UserList";
import PropertyList from "./PropertyList";
import Analytics from "./Analytics";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("properties");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(false);

  const tabs = [
    { key: "properties", label: "Properties", icon: Home },
    { key: "users", label: "Users", icon: Users },
    { key: "add", label: "Add Property", icon: PlusCircle },
    { key: "analytics", label: "Analytics", icon: BarChart3 },
  ];

  // Fetch properties
  useEffect(() => {
    if (activeTab === "properties") {
      setLoading(true);
      fetch("/api/properties")
        .then((res) => res.json())
        .then((data) => {
          if (data.success) setProperties(data.data);
        })
        .catch((err) => console.error("Error fetching properties:", err))
        .finally(() => setLoading(false));
    }
  }, [activeTab]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 font-sans">
      {/* Mobile top bar */}
      <div className="md:hidden flex justify-between items-center bg-sky-400 text-white p-4">
        <h1 className="text-xl font-bold">Flatzy Admin</h1>
        <button onClick={() => setSidebarOpen(!sidebarOpen)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gradient-to-b from-sky-400 to-sky-600 text-white shadow-xl p-6 flex flex-col justify-between transition-transform duration-300
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 md:w-64 fixed md:static inset-y-0 z-20`}
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
                    ? "bg-white text-sky-600 font-semibold shadow"
                    : "hover:bg-sky-500"
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
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex items-center justify-center px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition text-white font-medium mt-6 md:mt-0"
        >
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
        {activeTab === "properties" && <PropertyList />}
        {activeTab === "users" && <UserList />}
        {activeTab === "add" && <AddPropertyForm />}
        {activeTab === "analytics" && <Analytics />}
      </main>
    </div>
  );
}
