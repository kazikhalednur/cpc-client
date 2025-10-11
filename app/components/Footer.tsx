"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiFacebook,
    FiTwitter,
    FiInstagram,
    FiLinkedin,
    FiYoutube,
    FiGithub,
    FiExternalLink,
} from "react-icons/fi";
import CPCLogo from "@/assets/images/CPC-Logo.png";

export function Footer() {
    const currentYear = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Notices", href: "/notices" },
        { name: "Wings", href: "/wings" },
        { name: "About Us", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    const wings = [
        { name: "Development Wing", href: "/wings/development" },
        { name: "ACM Task Force", href: "/wings/acm" },
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
            text: "Room 311, Knowledge Tower, Daffodil International University",
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
        <footer className="bg-gray-900 text-white">
            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Brand Section */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="mb-6"
                        >
                            <Link href="/" className="flex items-center space-x-3 mb-4">
                                <div className="relative w-12 h-12">
                                    <Image
                                        src={CPCLogo}
                                        alt="DIU CPC Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">DIU CPC</h3>
                                    <p className="text-sm text-gray-400">Computer & Programming Club</p>
                                </div>
                            </Link>
                            <p className="text-gray-400 text-sm leading-relaxed">
                                The most primitive and extensive club as well as the biggest club in Daffodil International University.
                                We work together to explore every field of Computer Science.
                            </p>
                        </motion.div>

                        {/* Social Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                        >
                            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                            <div className="flex space-x-4">
                                {socialLinks.map((social) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`p-2 bg-gray-800 rounded-lg transition-colors duration-300 ${social.color}`}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <social.icon className="w-5 h-5" />
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Quick Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {link.name}
                                        </span>
                                        <FiExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Wings */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                    >
                        <h4 className="text-lg font-semibold mb-6">Our Wings</h4>
                        <ul className="space-y-3">
                            {wings.map((wing) => (
                                <li key={wing.name}>
                                    <Link
                                        href={wing.href}
                                        className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center group"
                                    >
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            {wing.name}
                                        </span>
                                        <FiExternalLink className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <h4 className="text-lg font-semibold mb-6">Contact Info</h4>
                        <div className="space-y-4">
                            {contactInfo.map((contact, index) => (
                                <div key={index} className="flex items-start space-x-3">
                                    <contact.icon className="w-5 h-5 text-indigo-400 mt-0.5 flex-shrink-0" />
                                    <span className="text-gray-400 text-sm leading-relaxed">
                                        {contact.text}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="container mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="text-gray-400 text-sm"
                        >
                            © {currentYear} Daffodil International University Computer & Programming Club. All rights reserved.
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="flex space-x-6 text-sm"
                        >
                            <Link
                                href="/privacy"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                Privacy Policy
                            </Link>
                            <Link
                                href="/terms"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                Terms of Service
                            </Link>
                            <Link
                                href="/sitemap"
                                className="text-gray-400 hover:text-white transition-colors duration-300"
                            >
                                Sitemap
                            </Link>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <motion.button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full shadow-lg transition-colors duration-300 z-50"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 }}
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
            </motion.button>
        </footer>
    );
}
