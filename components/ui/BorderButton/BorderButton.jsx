import React from "react";
import "./BorderButton.css";

const BorderButton = ({ text }) => {
  return (
    <a
      className="relative px-8 py-4 text-lg font-semibold text-white rounded-3xl shadow-lg overflow-hidden group
             backdrop-blur-xl bg-sky-600/20 hover:bg-sky-700/30 transition-all duration-500"
    >
      <span className="absolute inset-0 rounded-3xl border-2 border-transparent">
        <span className="absolute inset-0 rounded-3xl border-[3px] border-sky-400 animate-travel"></span>
      </span>
      
      <span className="relative z-10">{text}</span>
    </a>
  );
};

export default BorderButton;
