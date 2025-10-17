"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FiGithub,
    FiLinkedin,
    FiMail,
    FiCode,
    FiHeart,
    FiUsers,
    FiAward,
    FiZap,
    FiShield,
    FiStar,
    FiExternalLink,
    FiCalendar,
    FiTag,
} from "react-icons/fi";
import KaziKhaledNur from "@/assets/images/kazi_khaled_nur.png";

export default function DevelopedByPage() {

    const developers = [
        {
            id: "full_stack_dev",
            name: "Kazi Khaled Nur",
            role: "Software Engineer",
            avatar: KaziKhaledNur,
            bio: "Passionate developers dedicated to creating innovative solutions for the DIU CPC community.",
            contributions: [
                "Full-stack web development",
                "API integration and backend services",
                "Database design and optimization",
                "UI/UX implementation",
                "Performance optimization",
                "Security implementation"
            ],
            skills: ["Python", "Django", "Django REST Framework", "Django ORM", "MySQL", "JWT Authentication"],
            social: {
                github: "https://github.com/kazikhalednur",
                linkedin: "https://linkedin.com/in/kazikhalednur",
                email: "kazikhalednur@gmail.com"
            },
            joinDate: "2024",
            projects: "10+",
            commits: "500+"
        },
        {
            id: "frontend_dev",
            name: "MD Biplob Molla",
            role: "Frontend Developer",
            avatar: "/assets/images/avatar_male.png",
            bio: "Creative minds behind the beautiful and intuitive user interface of the DIU CPC platform.",
            contributions: [
                "User interface design",
                "User experience optimization",
                "Brand identity development",
                "Responsive design implementation",
                "Accessibility improvements",
                "Design system creation"
            ],
            skills: ["Figma", "Adobe Creative Suite", "CSS", "Tailwind CSS", "Framer Motion", "Design Systems"],
            social: {
                github: "https://github.com/diucpc",
                linkedin: "https://linkedin.com/company/diu-cpc",
                email: "design@diucpc.org"
            },
            joinDate: "2024",
            projects: "10+",
            commits: "200+"
        }
    ];

    const technologies = [
        {
            name: "Frontend",
            icon: FiCode,
            color: "from-blue-500 to-cyan-500",
            items: [
                "Next.js 15",
                "React 18",
                "TypeScript",
                "Tailwind CSS",
                "Framer Motion",
                "React Icons"
            ]
        },
        {
            name: "Backend",
            icon: FiZap,
            color: "from-green-500 to-emerald-500",
            items: [
                "Django",
                "Django REST Framework",
                "Django ORM",
                "MySQL",
                "JWT Authentication",
            ]
        },
        {
            name: "Cloud",
            icon: FiShield,
            color: "from-purple-500 to-violet-500",
            items: [
                "Cpanel",
                "Git Version Control",
            ]
        },
        {
            name: "Tools",
            icon: FiStar,
            color: "from-orange-500 to-red-500",
            items: [
                "VS Code",
                "GitHub",
                "Postman",
                "Chrome DevTools",
                "ESLint & Prettier"
            ]
        }
    ];

    const stats = [
        { icon: FiCode, value: "10,000+", label: "Lines of Code" },
        { icon: FiUsers, value: "2", label: "Contributors" },
        { icon: FiCalendar, value: "3", label: "Months Development" },
        { icon: FiAward, value: "100%", label: "Open Source" }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-6xl font-bold mb-6">
                            Developed <span className="text-yellow-300">By</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                            Meet the passionate developers and designers who brought the DIU CPC platform to life
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                💻 Open Source
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                🚀 Modern Tech Stack
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                ❤️ Made with Love
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Development Team */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Development Team
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Talented individuals working together to create the best possible experience for the DIU CPC community.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
                    >
                        {developers.map((dev) => (
                            <motion.div
                                key={dev.id}
                                variants={itemVariants}
                                className="group relative overflow-hidden rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 transition-all duration-500 hover:shadow-2xl hover:scale-105"
                            >
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-center space-x-4 mb-6">
                                        <div className="relative w-16 h-16 rounded-full overflow-hidden">
                                            <Image
                                                src={dev.avatar}
                                                alt={dev.name}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {dev.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400">
                                                {dev.role}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-500">
                                                Joined {dev.joinDate}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bio */}
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                        {dev.bio}
                                    </p>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                                                {dev.projects}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Projects
                                            </div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                                {dev.commits}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Commits
                                            </div>
                                        </div>
                                    </div>

                                    {/* Skills */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                            Key Skills
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {dev.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-full text-sm font-medium"
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex space-x-4">
                                        {Object.entries(dev.social).map(([platform, url]) => {
                                            const IconComponent = platform === 'github' ? FiGithub :
                                                platform === 'linkedin' ? FiLinkedin : FiMail;
                                            return (
                                                <a
                                                    key={platform}
                                                    href={url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-indigo-100 dark:hover:bg-indigo-900/30 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                                                >
                                                    <IconComponent className="w-5 h-5" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Technology Stack */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Technology Stack
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Built with modern technologies and best practices
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                    >
                        {technologies.map((tech) => (
                            <motion.div
                                key={tech.name}
                                variants={itemVariants}
                                className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300"
                            >
                                <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${tech.color} text-white rounded-lg mb-4`}>
                                    <tech.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    {tech.name}
                                </h3>
                                <ul className="space-y-2">
                                    {tech.items.map((item) => (
                                        <li key={item} className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                            <FiTag className="w-3 h-3 text-indigo-500" />
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Statistics */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center mb-12"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                            Project Statistics
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Numbers that reflect our dedication and hard work
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="text-center"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-full mb-4">
                                    <stat.icon className="w-8 h-8" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Acknowledgments */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                            Acknowledgments
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
                            Special thanks to everyone who contributed to making this platform possible
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <FiUsers className="w-5 h-5 mr-2 text-indigo-500" />
                                    DIU CPC Community
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Thank you to all members, students, and faculty who provided feedback,
                                    suggestions, and support throughout the development process.
                                </p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-900 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                                    <FiHeart className="w-5 h-5 mr-2 text-red-500" />
                                    Open Source Community
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Grateful to the open source community for the amazing tools,
                                    libraries, and frameworks that made this project possible.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="py-16 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-4xl font-bold mb-6">
                            Want to Contribute?
                        </h2>
                        <p className="text-xl text-gray-200 mb-8">
                            This project is open source and we welcome contributions from the community.
                            Help us make DIU CPC platform even better!
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="https://github.com/diucpc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 flex items-center justify-center space-x-2"
                            >
                                <FiGithub className="w-5 h-5" />
                                <span>View on GitHub</span>
                                <FiExternalLink className="w-4 h-4" />
                            </a>
                            <Link
                                href="/contact"
                                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-300"
                            >
                                Contact Us
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
