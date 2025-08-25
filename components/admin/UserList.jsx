"use client";

import { useEffect, useState } from "react";
import { ShieldCheck, User, Trash2 } from "lucide-react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        if (data.success) {
          setUsers(data.data);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <p className="text-center text-gray-500">Loading users...</p>;
  }

  const admins = users.filter((u) => u.role === "admin");
  const normalUsers = users.filter((u) => u.role !== "admin");

  return (
    <div className="space-y-8">
      {/* Admins Section */}
      <section>
        <h2 className="text-2xl font-bold mb-6 border-b pb-2">
              Registered Users
            </h2>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ShieldCheck className="text-blue-600" /> Admins
        </h3>
        {admins.length > 0 ? (
          <ul className="space-y-3">
            {admins.map((user) => (
              <li
                key={user._id}
                className="p-4 bg-blue-50 border border-blue-200 rounded-lg shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <User className="text-blue-600" />
                  <span className="font-medium text-blue-800">{user.name}</span>
                  <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded-full">
                    ADMIN
                  </span>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No admins found.</p>
        )}
      </section>

      {/* All Users Section */}
      <section>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <User className="text-gray-600" /> All Users
        </h3>
        {normalUsers.length > 0 ? (
          <ul className="space-y-3">
            {normalUsers.map((user) => (
              <li
                key={user._id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center border hover:shadow-md transition"
              >
                <span className="font-medium">{user.name}</span>
                <button className="flex items-center gap-1 px-3 py-1 border rounded-md text-red-600 hover:bg-red-50 transition">
                  <Trash2 size={16} /> Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No users found.</p>
        )}
      </section>
    </div>
  );
}
