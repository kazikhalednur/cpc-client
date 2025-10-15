"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail, FiLinkedin, FiTwitter, FiUser } from "react-icons/fi";
import { useGetCommitteesQuery } from "@/lib/api/contestApi";

type AdvisoryMember = {
    name: string;
    position: string;
    department: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    image?: string;
};

const advisoryMembers: AdvisoryMember[] = [
    {
        name: "Dr. John Smith",
        position: "Chairman",
        department: "Computer Science & Engineering",
        email: "john.smith@diu.edu.bd",
        linkedin: "https://linkedin.com/in/johnsmith",
    },
    {
        name: "Prof. Sarah Johnson",
        position: "Vice Chairman",
        department: "Software Engineering",
        email: "sarah.johnson@diu.edu.bd",
        linkedin: "https://linkedin.com/in/sarahjohnson",
    },
    {
        name: "Dr. Michael Chen",
        position: "Member",
        department: "Information Technology",
        email: "michael.chen@diu.edu.bd",
        linkedin: "https://linkedin.com/in/michaelchen",
    },
    {
        name: "Prof. Emily Davis",
        position: "Member",
        department: "Computer Science & Engineering",
        email: "emily.davis@diu.edu.bd",
        linkedin: "https://linkedin.com/in/emilydavis",
    },
];

export default function AdvisoryPanelPage() {
    const { data: committees = [] } = useGetCommitteesQuery();

    // Get the latest committee's advisor panel
    const currentCommittee = committees.length > 0 ? committees[0] : null;
    const advisorPanel = currentCommittee?.panels.find(panel => panel.type === "ADVISOR");

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <Link
                    href="/"
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back to Home
                </Link>
            </div>

            {/* Header Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-center mb-12"
                        >
                            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                                Advisory Panel
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Distinguished faculty members guiding the club&apos;s mission, strategy, and activities
                            </p>
                        </motion.div>

                        {/* Panel Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="mb-16"
                        >
                            <div className="relative w-full h-[50vh] bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                                {advisorPanel?.image && (
                                    <Image
                                        src={advisorPanel.image}
                                        alt={`Advisory Panel ${currentCommittee?.year || '2024'}`}
                                        fill
                                        className="object-contain object-center"
                                    />
                                )}
                            </div>
                        </motion.div>

                        {/* Members Grid */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                        >
                            {advisoryMembers.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="text-center">
                                        {/* Avatar */}
                                        <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <FiUser className="w-12 h-12 text-white" />
                                        </div>

                                        {/* Member Info */}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold mb-1">
                                            {member.position}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                                            {member.department}
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex justify-center space-x-3">
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-indigo-100 dark:hover:bg-indigo-900 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                                                >
                                                    <FiMail className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.linkedin && (
                                                <a
                                                    href={member.linkedin}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                                >
                                                    <FiLinkedin className="w-4 h-4" />
                                                </a>
                                            )}
                                            {member.twitter && (
                                                <a
                                                    href={member.twitter}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-sky-100 dark:hover:bg-sky-900 hover:text-sky-600 dark:hover:text-sky-400 transition-colors"
                                                >
                                                    <FiTwitter className="w-4 h-4" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
