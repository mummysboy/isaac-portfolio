"use client";

import { useState } from "react";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "#", isEmail: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleEmailClick = () => {
    alert("Email me at: isaac@gmail.com");
  };

  return (
    <nav className="fixed top-6 right-6 md:right-24 z-50">
      {/* Hamburger (mobile) */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="md:hidden flex items-center px-3 py-2 border rounded text-gray-700 border-gray-400 hover:text-blue-600 hover:border-blue-600"
        aria-label="Toggle Menu"
      >
        <svg className="fill-current h-4 w-4" viewBox="0 0 20 20">
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>

      {/* Dropdown menu */}
      {menuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 text-sm">
          {navLinks.map((link) =>
            link.isEmail ? (
              <button
                key={link.name}
                onClick={() => {
                  handleEmailClick();
                  setMenuOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-blue-100"
              >
                {link.name}
              </button>
            ) : (
              <Link
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-gray-700 hover:bg-blue-100"
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            )
          )}
        </div>
      )}

      {/* Desktop nav */}
      <div className="hidden md:flex gap-6 text-sm text-gray-700">
        {navLinks.map((link) =>
          link.isEmail ? (
            <button
              key={link.name}
              onClick={handleEmailClick}
              className="hover:text-blue-600 font-medium"
            >
              {link.name}
            </button>
          ) : (
            <Link
              key={link.name}
              href={link.href}
              className="hover:text-blue-600 font-medium"
            >
              {link.name}
            </Link>
          )
        )}
      </div>
    </nav>
  );
}
