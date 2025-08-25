"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { Menu, X, Home, User, Settings, Info, LogOut } from "lucide-react";
import Link from "next/link";

const FloatingMenu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const capsuleRef = useRef(null);
  const linksRef = useRef(null);
  const linkRefs = useRef([]);
  const buttonRef = useRef(null);

  const menuItems = [
    { icon: Home, label: "Home", href: "/" },
    // { icon: User, label: "Profile", href: "#" },
    // { icon: Settings, label: "Settings", href: "#" },
    { icon: Info, label: "About", href: "/about" },
    { icon: LogOut, label: "Logout", href: "#" },
  ];

  const itemHeight = 50; // reduced height per item
  const verticalPadding = 20; // top + bottom padding for capsule

  useEffect(() => {
    gsap.set(linkRefs.current, { opacity: 0, y: 12 });
    gsap.set(linksRef.current, { opacity: 0 });
    gsap.set(capsuleRef.current, {
      width: 60,
      height: 60,
      transformOrigin: "100% 100%",
    });
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isExpanded &&
        capsuleRef.current &&
        !capsuleRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        collapseMenu();
        setIsExpanded(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isExpanded]);

  const expandMenu = () => {
    const tl = gsap.timeline();
    tl.to(capsuleRef.current, {
      width: 260,
      height: menuItems.length * itemHeight + verticalPadding,
      borderRadius: 24,
      duration: 0.55,
      ease: "back.out(1.5)",
    })
      .to(
        linksRef.current,
        { opacity: 1, duration: 0.35, ease: "power2.out" },
        "-=0.4"
      )
      .to(
        linkRefs.current,
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
          ease: "back.out(1.7)",
        },
        "-=0.35"
      );
  };

  const collapseMenu = () => {
    const tl = gsap.timeline();
    tl.to(linkRefs.current, {
      opacity: 0,
      y: 12,
      duration: 0.25,
      stagger: 0.05,
      ease: "power2.in",
    })
      .to(linksRef.current, { opacity: 0, duration: 0.2 }, "-=0.2")
      .to(
        capsuleRef.current,
        {
          width: 60,
          height: 60,
          borderRadius: 9999,
          duration: 0.45,
          ease: "back.inOut(1.7)",
        },
        "-=0.15"
      );
  };

  const handleToggle = () => {
    if (isExpanded) collapseMenu();
    else expandMenu();
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Capsule container */}
      <div
        ref={capsuleRef}
        className="absolute bottom-0 right-0 bg-white/10 backdrop-blur-md border border-black/20 rounded-[50px] shadow-xl overflow-hidden flex flex-col items-start text-white"
      >
        {/* Menu Links */}
        <div
          ref={linksRef}
          className="flex flex-col items-start w-full px-3 py-2"
        >
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                ref={(el) => (linkRefs.current[i] = el)}
                href={item.href}
                className="flex items-center text-black gap-3 w-full px-4 py-2.5 opacity-0 -translate-y-3 hover:bg-white/20 transition border-b border-black/20 last:border-b-0"
                onClick={() => {
                  collapseMenu();
                  setIsExpanded(false);
                }}
              >
                <Icon size={20} />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Toggle Button */}
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="relative z-30 flex justify-center items-center w-14 h-14 rounded-full text-black focus:outline-none"
      >
        {isExpanded ? <X size={26} /> : <Menu size={26} />}
      </button>
    </div>
  );
};

export default FloatingMenu;
