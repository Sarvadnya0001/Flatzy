"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Loader = ({ text = "Loading..." }) => {
  const textRef = useRef(null);

  useEffect(() => {
    gsap.to(textRef.current, {
      opacity: 0.3,
      duration: 1,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      <div className="w-12 h-12 border-4 border-sky-500 border-t-transparent rounded-full animate-spin"></div>

      <p
        ref={textRef}
        className="mt-4 text-base font-medium text-gray-700"
      >
        {text}
      </p>
    </div>
  );
};

export default Loader;