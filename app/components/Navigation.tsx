"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "next-auth/react";
import {
  FiMenu,
  FiX,
  FiLogOut,
  FiUser,
  FiSettings,
  FiMoon,
  FiSun,
} from "react-icons/fi";
import CPCLogo from "@/assets/images/CPC-Logo.png";
import { Role } from "@/types/role";
import { useTheme } from "next-themes";

export const Navigation = () => {
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
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
    { label: "Events", href: "/events" },
    { label: "Contests", href: "/contests" },
    { label: "Resources", href: "/resources" },
    { label: "Verify Certificate", href: "/verify" },
    ...(session?.user?.role === Role.ADMIN ||
    session?.user?.role === Role.SUPER_ADMIN
      ? [{ label: "Dashboard", href: "/dashboard" }]
      : []),
  ];

  const userMenuItems = [
    { label: "Profile", href: "/profile", icon: FiUser },
    { label: "Settings", href: "/settings", icon: FiSettings },
    {
      label: "Sign out",
      onClick: () => signOut(),
      icon: FiLogOut,
      className:
        "text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300",
    },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300
      ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image
                src={CPCLogo}
                alt="CPC Logo"
                width={40}
                height={40}
                className="h-8 w-auto transition-transform duration-300 group-hover:scale-105"
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
                         ${
                           isScrolled
                             ? "text-gray-800 hover:text-gray-900 hover:bg-gray-100"
                             : "text-white hover:text-white/90 hover:bg-white/10"
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
                         ${
                           isScrolled
                             ? "text-gray-800 hover:bg-gray-100"
                             : "text-white hover:bg-white/10"
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
            {session ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <div
                    className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 
                               flex items-center justify-center text-white font-medium"
                  >
                    {getInitials(session.user?.name)}
                  </div>
                </button>

                {isProfileOpen && (
                  <div
                    className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white 
                               ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <div className="py-1">
                      {userMenuItems.map((item) =>
                        item.href ? (
                          <Link
                            key={item.label}
                            href={item.href}
                            className={`flex items-center px-4 py-2 text-sm text-gray-700 
                                     hover:bg-gray-100 ${item.className || ""}`}
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </Link>
                        ) : (
                          <button
                            key={item.label}
                            onClick={() => {
                              item.onClick?.();
                              setIsProfileOpen(false);
                            }}
                            className={`w-full flex items-center px-4 py-2 text-sm text-gray-700 
                                     hover:bg-gray-100 ${item.className || ""}`}
                          >
                            <item.icon className="w-4 h-4 mr-2" />
                            {item.label}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
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
                       ${
                         isScrolled
                           ? "text-gray-800 hover:bg-gray-100"
                           : "text-white hover:bg-white/10"
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

            {session ? (
              <>
                {userMenuItems.map((item) =>
                  item.href ? (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 
                               hover:text-gray-900 hover:bg-gray-100"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      key={item.label}
                      onClick={() => {
                        item.onClick?.();
                        setIsMobileMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 
                               hover:text-red-700 hover:bg-gray-100"
                    >
                      {item.label}
                    </button>
                  )
                )}
              </>
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
