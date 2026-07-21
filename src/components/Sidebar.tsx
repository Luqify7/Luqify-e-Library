"use client";

import { useState } from "react";
import Link from "next/link";

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { name: "HOME", href: "/" },
    { name: "FACULTIES", href: "/faculties/commerce" },
    { name: "PROGRAMMES", href: "/" },
    { name: "LECTURE NOTES", href: "/" },
    { name: "MID-SEM PAPERS", href: "/" },
    { name: "END-SEM PAPERS", href: "/" },
    { name: "TIMETABLE", href: "/" },
    { name: "ANNOUNCEMENTS", href: "/" },
    
    { name: "ABOUT", href: "/" },
    { name: "CONTACT", href: "/" },
  ];

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={() => setOpen(true)}
        className="text-3xl font-bold text-gray-800"
      >
        
        ≡
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/60 z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-72 bg-slate-900 text-white shadow-2xl z-50 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="border-b border-slate-700 p-6">

          <div className="flex justify-between items-start">

            <div>
              <h1 className="text-3xl font-bold tracking-wide">
            luqify e-library
              </h1>

              <p className="text-sm text-slate-400 mt-1">
            
              </p>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-2xl hover:text-blue-400"
            >
              ×
            </button>

          </div>

        </div>

        {/* Menu */}
        <nav className="p-6">

          <div className="space-y-2">

            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-4 py-3 text-base font-medium tracking-wide transition hover:bg-blue-600"
              >
                {item.name}
              </Link>
            ))}

          </div>

        </nav>

        {/* Footer */}
        <div className="absolute bottom-6 left-6 text-sm text-slate-500">
          Version 1.0
        </div>
      </aside>
    </>
  );
}