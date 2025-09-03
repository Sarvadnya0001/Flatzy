"use client";

import React from "react";
import Link from "next/link";
import { Building2, BedDouble, Home } from "lucide-react";

const categories = [
  {
    label: "Flat",
    value: "flat",
    icon: Building2,
    color: "from-sky-500 to-blue-600",
  },
  {
    label: "Hostel",
    value: "hostel",
    icon: BedDouble,
    color: "from-rose-500 to-pink-600",
  },
  {
    label: "Room",
    value: "room",
    icon: Home,
    color: "from-emerald-500 to-green-600",
  },
];

const CategoriesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Browse by Categories
        </h2>
        <p className="text-lg text-gray-600 mb-12">Choose your type of stay</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.value}
                href={`/category/${cat.value}`}
                className={`group relative rounded-2xl shadow-lg overflow-hidden p-8 flex flex-col items-center justify-center transition hover:scale-105 hover:shadow-2xl bg-white`}
              >
                <div
                  className={`w-20 h-20 rounded-full bg-gradient-to-br ${cat.color} flex items-center justify-center mb-6 group-hover:scale-110 transition`}
                >
                  <Icon size={36} className="text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {cat.label}
                </h3>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
