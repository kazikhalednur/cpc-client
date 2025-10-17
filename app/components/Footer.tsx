"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import {
    FiMail,
    FiMapPin,
    FiFacebook,
    FiLinkedin,
    FiGithub,
    FiExternalLink,
} from "react-icons/fi";
import CPCLogo from "@/assets/images/CPC-Logo.png";

export function Footer() {
    const [currentYear, setCurrentYear] = useState(2024);
    const [isClient, setIsClient] = useState(false);
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
        setIsClient(true);
    }, []);

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Notices", href: "/notices" },
        { name: "Wings", href: "/wings" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const wings = [
        { name: "ACM Task Force", href: "/wings/acm" },
        { name: "Development Wing", href: "/wings/development" },
        { name: "Research & Journal", href: "/wings/research" },
        { name: "Job Career & Industry Collaboration", href: "/wings/job" },
    ];

    const socialLinks = [
        { name: "Mail", icon: FiMail, href: "mailto:cpc@diu.edu.bd", color: "hover:text-blue-600" },
        { name: "Facebook", icon: FiFacebook, href: "https://facebook.com/diucpc.official", color: "hover:text-blue-600" },
        { name: "GitHub", icon: FiGithub, href: "https://github.com/cpcdiu", color: "hover:text-gray-800 dark:hover:text-gray-200" },
        { name: "LinkedIn", icon: FiLinkedin, href: "https://linkedin.com/company/diu-cpc/", color: "hover:text-blue-700" },
        // { name: "Twitter", icon: FiTwitter, href: "https://twitter.com/diucpc", color: "hover:text-sky-500" },
        // { name: "Instagram", icon: FiInstagram, href: "https://instagram.com/diucpc", color: "hover:text-pink-600" },
        // { name: "YouTube", icon: FiYoutube, href: "https://youtube.com/diucpc", color: "hover:text-red-600" },
    ];

    const contactInfo = [
        {
            icon: FiMapPin,
            text: "Room KT-311, Knowledge Tower, Daffodil International University",
        },
        // {
        //     icon: FiPhone,
        //     text: "+880 1234 567890",
        // },
        {
            icon: FiMail,
            text: "cpc@diu.edu.bd",
        },
    ];

    return (
        <footer className={`${mounted && theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"} transition-colors duration-300`}>
            {/* Main Footer Content */}
            <div className="w-5/6 mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <Link href="/" className="flex items-center space-x-4 mb-4">
                                <div className="relative w-12 h-12 pt-4">
                                    {isClient ? (
                                        <Image
                                            src={CPCLogo}
                                            alt="DIU CPC Logo"
                                            width={48}
                                            height={48}
                                            className="object-contain"
                                            priority={false}
                                            unoptimized={false}
                                            style={{ color: 'transparent' }}
                                        />
                                    ) : (
                                        <div className="w-12 h-12 bg-gray-700 rounded animate-pulse" />
                                    )}
                                </div>
                                <div>
                                    <h3 className={`text-xl font-bold ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>DIU CPC</h3>
                                    <p className={`text-sm ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Computer Programming Club</p>
                                </div>
                            </Link>
                            <p className={`text-sm leading-relaxed ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                The most primitive and extensive club as well as the biggest club in Daffodil International University.
                                We work together to explore every field of Computer Science.
                            </p>
                        </div>

                        {/* Social Links */}
                        <div>
                            <h4 className={`text-lg font-semibold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>Follow Us</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 ${mounted && theme === "dark" ? "bg-gray-800" : "bg-gray-200"} rounded-lg transition-colors duration-300 hover:scale-110 ${social.color}`}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className={`text-lg font-semibold mb-6 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className={`${mounted && theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300 flex items-center group`}
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                        <FiExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Wings */}
                    <div>
                        <h4 className={`text-lg font-semibold mb-6 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>Our Wings</h4>
                        <ul className="space-y-3">
                            {wings.map((wing) => (
                                <li key={wing.name}>
                                    <Link
                                        href={wing.href}
                                        className={`${mounted && theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300 flex items-center group`}
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {wing.name}
                                        </span>
                                        <FiExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className={`text-lg font-semibold mb-6 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>Contact Info</h4>
                        <div className="space-y-4">
                            {contactInfo.map((contact, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <contact.icon className={`w-5 h-5 ${mounted && theme === "dark" ? "text-indigo-400" : "text-indigo-600"} mt-0.5 flex-shrink-0`} />
                                    <span className={`text-sm leading-relaxed ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                        {contact.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className={`border-t ${mounted && theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                <div className="w-5/6 mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className={`text-sm ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Copyright © {currentYear} DIU CPC. All rights reserved. Developed by <Link href="/developed-by" className={`${mounted && theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}>DIU CPC Web Team</Link>.
                        </div>

                        <div className="flex space-x-6 text-sm">
                            <Link
                                href="/privacy"
                                className={`${mounted && theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className={`${mounted && theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/sitemap"
                                className={`${mounted && theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"} transition-colors duration-300`}
                            >
                                Sitemap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className={`fixed bottom-8 right-8 ${mounted && theme === "dark" ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-500 hover:bg-indigo-600"} hover:scale-110 text-white p-3 rounded-full shadow-lg transition-all duration-300 z-50`}
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 10l7-7m0 0l7 7m-7-7v18"
                    />
                </svg>
            </button>
        </footer>
    );
}
