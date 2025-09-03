"use client";

import React from "react";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="fixed top-4 left-4 z-50
                 backdrop-blur-sm
                 border border-white/30
                 shadow-lg shadow-black/10
                 rounded-full p-3
                 transition-all duration-300
                 hover:scale-105
                 active:scale-95"
    >
      <ArrowLeft className="text-black drop-shadow" size={22} />
    </button>
  );
};

export default BackButton;
