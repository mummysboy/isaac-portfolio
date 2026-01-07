"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Contact", href: "#", isEmail: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showEmail, setShowEmail] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < 10 || currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => {
        setCopied(false);
        setShowEmail(false);
      }, 1200);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  // Prevent hydration mismatch by only checking pathname after mount
  if (!mounted || pathname === "/") return null;

  return (
    <>
      <nav
        className={`fixed top-6 right-6 md:right-24 z-50 transition-opacity duration-300 ${
          showNavbar ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Hamburger (mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex items-center p-1"
          aria-label="Toggle Menu"
        >
          <svg
            className="text-gray-500 hover:text-blue-600 transition h-8 w-8 opacity-60"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 4h16v2H2V4zm0 5h16v2H2V9zm0 5h16v2H2v-2z"
              clipRule="evenodd"
            />
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
                    setShowEmail(!showEmail);
                    setCopied(false);
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
                onClick={() => {
                  setShowEmail(!showEmail);
                  setCopied(false);
                }}
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

        {/* Floating email box */}
        {showEmail && (
          <div className="absolute top-14 right-0 md:right-0 bg-white border border-gray-200 rounded shadow px-4 py-2 text-sm">
            <p
              className="cursor-pointer select-text text-gray-800"
              onClick={() => {
                navigator.clipboard.writeText("isaachirsch@gmail.com");
                setCopied(true);
              }}
            >
              isaachirsch@gmail.com
            </p>
          </div>
        )}
      </nav>

      {/* Center-screen copied notification */}
      {copied && (
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-700 text-white text-sm px-6 py-2 rounded shadow-md z-50 transition-opacity duration-700 opacity-100 animate-fade">
          Copied!
        </div>
      )}
    </>
  );
}
