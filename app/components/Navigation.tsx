"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import CPCLogo from "@/assets/images/CPC-Logo.png";
import { Role } from "@/types/role";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch by only rendering theme toggle after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getInitials = (name?: string | null) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "Committees", href: "/committee" },
    { label: "Events", href: "/events" },
    { label: "Contests", href: "/contests" },
    { label: "Verify Certificate", href: "/verify" },
    ...(isAuthenticated && (user?.role === Role.ADMIN || user?.role === Role.SUPER_ADMIN)
      ? [{ label: "Dashboard", href: "/dashboard" }]
      : []),
  ];

  const handleLogout = async () => {
    await logout();
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-md"
          : theme === "dark"
            ? "bg-transparent"
            : "bg-white"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group pt-2">
              <Image
                src={CPCLogo}
                alt="CPC Logo"
                width={40}
                height={40}
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
                suppressHydrationWarning
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                         ${isScrolled
                    ? "text-gray-800 hover:text-gray-900 hover:bg-gray-100"
                    : (theme === "dark"
                      ? "text-white hover:text-white/90 hover:bg-white/10"
                      : "text-gray-800 hover:text-gray-900 hover:bg-gray-100/60")
                  }`}
              >
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={`p-2 rounded-full transition-all duration-200
                         ${isScrolled
                    ? "text-gray-800 hover:bg-gray-100"
                    : (theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-gray-100/60")
                  }`}
                aria-label="Toggle theme"
              >
                {theme === "dark" ? (
                  <FiSun className="h-5 w-5" />
                ) : (
                  <FiMoon className="h-5 w-5" />
                )}
              </button>
            )}

            {/* Auth Section */}
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-500 to-red-600 text-white px-6 py-2 rounded-full 
                         hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-md 
                         hover:shadow-lg hover:shadow-red-500/25 flex items-center space-x-2"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-2 rounded-full 
                         hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md 
                         hover:shadow-lg hover:shadow-indigo-500/25"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-all duration-200
                       ${isScrolled
                  ? "text-gray-800 hover:bg-gray-100"
                  : (theme === "dark" ? "text-white hover:bg-white/10" : "text-gray-800 hover:bg-gray-100/60")
                }`}
            >
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
                         hover:text-gray-900 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}

            {/* Theme Toggle in Mobile Menu */}
            {mounted && (
              <button
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="w-full flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 
                         hover:text-gray-900 hover:bg-gray-100"
              >
                {theme === "dark" ? (
                  <>
                    <FiSun className="w-5 h-5 mr-2" />
                    Light Mode
                  </>
                ) : (
                  <>
                    <FiMoon className="w-5 h-5 mr-2" />
                    Dark Mode
                  </>
                )}
              </button>
            )}

            {isAuthenticated ? (
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 
                         hover:text-red-700 hover:bg-gray-100 flex items-center space-x-2"
              >
                <FiLogOut className="w-4 h-4" />
                Logout
              </button>
            ) : (
              <Link
                href="/auth/signin"
                className="block px-3 py-2 rounded-md text-base font-medium text-indigo-600 hover:text-indigo-700 
                         hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
