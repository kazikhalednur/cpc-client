"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
    FiCode,
    FiUsers,
    FiBookOpen,
    FiBriefcase,
    FiArrowRight,
    FiStar,
    FiAward,
    FiTarget,
    FiTrendingUp,
    FiCalendar,
    FiGithub,
    FiGlobe,
    FiLayers,
    FiZap,
} from "react-icons/fi";

export default function WingsPage() {

    const wings = [
        {
            id: "development",
            name: "Development Wing",
            shortName: "DEV",
            description: "Empowering students with cutting-edge development skills and real-world project experience.",
            longDescription: "The Development Wing focuses on nurturing software development skills through hands-on projects, workshops, and industry collaborations. We work with modern technologies and frameworks to build innovative solutions.",
            icon: FiCode,
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            borderColor: "border-blue-200 dark:border-blue-800",
            features: [
                "Full-stack web development",
                "Mobile app development",
                "DevOps and deployment",
                "Open source contributions",
                "Industry partnerships",
                "Mentorship programs"
            ],
            technologies: ["React", "Node.js", "Python", "Django", "Flutter", "Docker", "AWS"],
            stats: {
                members: "150+",
                projects: "50+",
                workshops: "25+",
                hackathons: "10+"
            },
            achievements: [
                "Winner of National Hackathon 2023",
                "Published 20+ open source projects",
                "Collaborated with 5+ tech companies",
                "Organized 15+ technical workshops"
            ],
            image: "/assets/images/wing_dev.png",
            href: "/wings/development"
        },
        {
            id: "acm",
            name: "ACM Task Force",
            shortName: "ACM",
            description: "Competitive programming excellence and algorithmic problem-solving mastery.",
            longDescription: "The ACM Task Force is dedicated to competitive programming and algorithmic excellence. We prepare students for national and international programming contests while building strong problem-solving skills.",
            icon: FiTarget,
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            borderColor: "border-green-200 dark:border-green-800",
            features: [
                "Competitive programming training",
                "Algorithm and data structures",
                "Contest preparation",
                "Problem-solving workshops",
                "ICPC participation",
                "Peer mentoring"
            ],
            technologies: ["C++", "Python", "Java", "Algorithms", "Data Structures", "Graph Theory", "Dynamic Programming"],
            stats: {
                members: "120+",
                contests: "100+",
                problems: "2000+",
                achievements: "25+"
            },
            achievements: [
                "ICPC Regional Finalists 2023",
                "Top 10 in National Programming Contest",
                "Solved 2000+ competitive problems",
                "Organized 20+ programming contests"
            ],
            image: "/assets/images/wing_acm.png",
            href: "/wings/acm"
        },
        {
            id: "research",
            name: "Research & Journal",
            shortName: "R&J",
            description: "Advancing computer science research and academic publication excellence.",
            longDescription: "The Research & Journal wing promotes academic research in computer science, facilitates publication in reputed journals, and organizes research symposiums to foster innovation and knowledge sharing.",
            features: [
                "Research paper writing",
                "Journal publications",
                "Research symposiums",
                "Academic mentoring",
                "Literature reviews",
                "Conference presentations"
            ],
            technologies: ["Machine Learning", "AI", "Data Science", "Blockchain", "IoT", "Cybersecurity", "Cloud Computing"],
            stats: {
                members: "80+",
                papers: "15+",
                publications: "8+",
                conferences: "12+"
            },
            achievements: [
                "Published in IEEE journals",
                "Presented at international conferences",
                "Won research grants",
                "Collaborated with faculty research"
            ],
            icon: FiBookOpen,
            color: "from-purple-500 to-violet-500",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            borderColor: "border-purple-200 dark:border-purple-800",
            image: "/assets/images/wing_r&j.png",
            href: "/wings/research"
        },
        {
            id: "job",
            name: "Job Career & Industry Collaboration",
            shortName: "JCIC",
            description: "Bridging the gap between academia and industry through career development and corporate partnerships.",
            longDescription: "The JCIC wing focuses on career development, industry connections, and preparing students for successful careers in technology. We organize career fairs, industry talks, and internship programs.",
            features: [
                "Career counseling",
                "Industry partnerships",
                "Internship programs",
                "Resume building",
                "Interview preparation",
                "Networking events"
            ],
            technologies: ["Career Development", "Industry Relations", "Professional Skills", "Networking", "Mentorship", "Job Placement"],
            stats: {
                members: "100+",
                partnerships: "20+",
                placements: "150+",
                events: "30+"
            },
            achievements: [
                "95% placement rate",
                "Partnerships with 20+ companies",
                "Organized 5+ career fairs",
                "150+ successful placements"
            ],
            icon: FiBriefcase,
            color: "from-orange-500 to-red-500",
            bgColor: "bg-orange-50 dark:bg-orange-900/20",
            borderColor: "border-orange-200 dark:border-orange-800",
            image: "/assets/images/wing_jcic.png",
            href: "/wings/job"
        }
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
                            Our <span className="text-yellow-300">Wings</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                            Four specialized wings working together to explore every field of Computer Science
                        </p>
                        <div className="flex flex-wrap justify-center gap-4 text-sm">
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                🚀 Development
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                🎯 Competitive Programming
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                📚 Research & Innovation
                            </span>
                            <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                                💼 Career Development
                            </span>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Wings Overview */}
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
                            Choose Your Path
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            Each wing offers unique opportunities for growth, learning, and career development.
                            Find the perfect fit for your interests and goals.
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-1 md:grid-cols-2 gap-8"
                    >
                        {wings.map((wing) => (
                            <motion.div
                                key={wing.id}
                                variants={itemVariants}
                                className={`relative overflow-hidden rounded-2xl ${wing.bgColor} ${wing.borderColor} border-2`}
                            >
                                <div className="p-8">
                                    {/* Header */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center space-x-4">
                                            <div className={`p-3 rounded-xl bg-gradient-to-r ${wing.color} text-white`}>
                                                <wing.icon className="w-8 h-8" />
                                            </div>
                                            <div>
                                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {wing.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                                    {wing.shortName} Wing
                                                </p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {wing.stats.members}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                Active Members
                                            </div>
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                                        {wing.description}
                                    </p>

                                    {/* Technologies */}
                                    <div className="mb-6">
                                        <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                                            Key Technologies
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {wing.technologies.slice(0, 4).map((tech) => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                            {wing.technologies.length > 4 && (
                                                <span className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-full text-sm">
                                                    +{wing.technologies.length - 4} more
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 mb-6">
                                        {Object.entries(wing.stats).map(([key, value]) => (
                                            <div key={key} className="text-center">
                                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {value}
                                                </div>
                                                <div className="text-xs text-gray-600 dark:text-gray-400 capitalize">
                                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA */}
                                    <Link
                                        href={wing.href}
                                        className={`inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r ${wing.color} text-white rounded-lg font-semibold`}
                                    >
                                        <span>Explore {wing.shortName}</span>
                                        <FiArrowRight className="w-4 h-4" />
                                    </Link>
                                </div>

                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Statistics Section */}
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
                            Our Impact
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400">
                            Numbers that speak for our commitment to excellence
                        </p>
                    </motion.div>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-8"
                    >
                        {[
                            { icon: FiUsers, value: "450+", label: "Active Members" },
                            { icon: FiAward, value: "100+", label: "Achievements" },
                            { icon: FiCalendar, value: "200+", label: "Events Organized" },
                            { icon: FiTrendingUp, value: "95%", label: "Success Rate" }
                        ].map((stat, index) => (
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
                            Ready to Join Our Wings?
                        </h2>
                        <p className="text-xl text-gray-200 mb-8">
                            Become part of the most dynamic computer science community at DIU.
                            Choose your wing and start your journey towards excellence.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/auth/signup"
                                className="px-8 py-4 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
                            >
                                Join DIU CPC
                            </Link>
                            <Link
                                href="/events"
                                className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-300"
                            >
                                View Upcoming Events
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
