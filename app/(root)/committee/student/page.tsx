"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiMail, FiLinkedin, FiTwitter, FiUser, FiAward } from "react-icons/fi";
import { useGetCommitteesQuery } from "@/lib/api/contestApi";

type StudentMember = {
    name: string;
    position: string;
    department: string;
    year: string;
    email?: string;
    linkedin?: string;
    twitter?: string;
    image?: string;
    achievements?: string[];
};

const studentMembers: StudentMember[] = [
    {
        name: "Ahmed Rahman",
        position: "President",
        department: "Computer Science & Engineering",
        year: "4th Year",
        email: "ahmed.rahman@student.diu.edu.bd",
        linkedin: "https://linkedin.com/in/ahmedrahman",
        achievements: ["ICPC Regional 2023", "Hackathon Winner 2023"],
    },
    {
        name: "Fatima Khan",
        position: "Vice President",
        department: "Software Engineering",
        year: "3rd Year",
        email: "fatima.khan@student.diu.edu.bd",
        linkedin: "https://linkedin.com/in/fatimakhan",
        achievements: ["Google CodeJam 2023", "Tech Lead"],
    },
    {
        name: "Mohammad Ali",
        position: "General Secretary",
        department: "Information Technology",
        year: "4th Year",
        email: "mohammad.ali@student.diu.edu.bd",
        linkedin: "https://linkedin.com/in/mohammadali",
        achievements: ["Open Source Contributor", "Mentor"],
    },
    {
        name: "Sara Ahmed",
        position: "Treasurer",
        department: "Computer Science & Engineering",
        year: "3rd Year",
        email: "sara.ahmed@student.diu.edu.bd",
        linkedin: "https://linkedin.com/in/saraahmed",
        achievements: ["Finance Management", "Event Organizer"],
    },
    {
        name: "Omar Hassan",
        position: "Technical Lead",
        department: "Software Engineering",
        year: "4th Year",
        email: "omar.hassan@student.diu.edu.bd",
        linkedin: "https://linkedin.com/in/omarhassan",
        achievements: ["Full Stack Developer", "Tech Speaker"],
    },
    {
        name: "Aisha Mahmud",
        position: "Event Coordinator",
        department: "Information Technology",
        year: "2nd Year",
        email: "aisha.mahmud@student.diu.edu.bd",
        linkedin: "https://linkedin.com/in/aishamahmud",
        achievements: ["Event Management", "Community Builder"],
    },
];

export default function StudentPanelPage() {
    const { data: committees = [] } = useGetCommitteesQuery();

    // Get the latest committee's student panel
    const currentCommittee = committees.length > 0 ? committees[0] : null;
    const studentPanel = currentCommittee?.panels.find(panel => panel.type === "STUDENT");

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
                                Student Panel
                            </h1>
                            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                                Dedicated student leaders organizing events, initiatives, and community activities
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
                                {studentPanel?.image && (
                                    <Image
                                        src={studentPanel.image}
                                        alt={`Student Panel ${currentCommittee?.year || '2024'}`}
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
                            {studentMembers.map((member, index) => (
                                <motion.div
                                    key={member.name}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
                                >
                                    <div className="text-center">
                                        {/* Avatar */}
                                        <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                                            <FiUser className="w-12 h-12 text-white" />
                                        </div>

                                        {/* Member Info */}
                                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                            {member.name}
                                        </h3>
                                        <p className="text-green-600 dark:text-green-400 font-semibold mb-1">
                                            {member.position}
                                        </p>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                                            {member.department}
                                        </p>
                                        <p className="text-gray-500 dark:text-gray-500 text-xs mb-4">
                                            {member.year}
                                        </p>

                                        {/* Achievements */}
                                        {member.achievements && member.achievements.length > 0 && (
                                            <div className="mb-4">
                                                <div className="flex items-center justify-center mb-2">
                                                    <FiAward className="w-4 h-4 text-yellow-500 mr-1" />
                                                    <span className="text-xs font-semibold text-gray-600 dark:text-gray-400">Achievements</span>
                                                </div>
                                                <div className="space-y-1">
                                                    {member.achievements.map((achievement, idx) => (
                                                        <span
                                                            key={idx}
                                                            className="inline-block bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 text-xs px-2 py-1 rounded-full mr-1 mb-1"
                                                        >
                                                            {achievement}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Social Links */}
                                        <div className="flex justify-center space-x-3">
                                            {member.email && (
                                                <a
                                                    href={`mailto:${member.email}`}
                                                    className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-green-100 dark:hover:bg-green-900 hover:text-green-600 dark:hover:text-green-400 transition-colors"
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
