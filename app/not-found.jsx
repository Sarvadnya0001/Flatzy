"use client";

import Link from "next/link";
import { Home, Construction } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-50 via-white to-sky-100 text-center px-6">
      <div className="flex items-center justify-center w-24 h-24 rounded-full bg-sky-100 text-sky-600 shadow-lg mb-6 animate-bounce">
        <Construction size={48} />
      </div>

      <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
        Page Under Construction 🚧
      </h1>
      <p className="text-lg text-gray-600 max-w-lg mb-8">
        We’re working hard to bring this page to life. Exciting things are on
        the way — stay tuned! ✨
      </p>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/"
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-sky-600 text-white font-medium shadow-md hover:bg-sky-700 transition"
        >
          <Home size={20} />
          Back to Home
        </Link>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 rounded-xl bg-gray-200 text-gray-700 font-medium shadow-md hover:bg-gray-300 transition"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
