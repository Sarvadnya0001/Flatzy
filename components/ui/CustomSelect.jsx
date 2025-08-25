"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  label,
  options,
  value,
  onChange,
  icon: Icon,
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (option) => {
    onChange(option);
    setOpen(false);
  };

  return (
    <div className="w-full relative" ref={ref}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center rounded-xl border bg-white px-4 py-3 text-sm font-medium shadow-sm transition
          ${
            open
              ? "border-sky-400 ring-2 ring-sky-300"
              : "border-gray-300 hover:border-sky-400"
          }
          focus:outline-none`}
      >
        {/* Left Icon */}
        {Icon && <Icon className="w-5 h-5 text-gray-400 mr-3" />}

        {/* Selected Value */}
        <span className={`flex-1 text-gray-700 ${!value && "text-gray-400"}`}>
          {value || "Select..."}
        </span>

        {/* Dropdown Chevron */}
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform ${
            open ? "rotate-180 text-sky-400" : "rotate-0"
          }`}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-2 w-full rounded-xl border border-gray-200 bg-white shadow-lg z-20 overflow-hidden">
          <ul className="max-h-52 overflow-y-auto text-sm">
            {options.map((option, idx) => (
              <li
                key={idx}
                onClick={() => handleSelect(option)}
                className={`px-4 py-2 cursor-pointer transition-colors
                  ${
                    value === option
                      ? "bg-sky-50 text-sky-600 font-semibold"
                      : "hover:bg-sky-100 text-gray-700"
                  }`}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
