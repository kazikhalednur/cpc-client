"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowLeft, FiUsers, FiAward, FiBookOpen, FiTarget } from "react-icons/fi";
import { useGetCommitteesQuery } from "@/lib/api/contestApi";

const committeeStats = [
    {
        icon: FiUsers,
        number: "15+",
        label: "Total Members",
        description: "Faculty and student leaders"
    },
    {
        icon: FiAward,
        number: "50+",
        label: "Events Organized",
        description: "Workshops, contests, and seminars"
    },
    {
        icon: FiBookOpen,
        number: "200+",
        label: "Students Mentored",
        description: "Guidance and support provided"
    },
    {
        icon: FiTarget,
        number: "5+",
        label: "Years Active",
        description: "Serving the DIU community"
    }
];

export default function CommitteePage() {
    const { data: committees = [] } = useGetCommitteesQuery();

    // Get the latest committee (current year)
    const currentCommittee = committees.length > 0 ? committees[0] : null;
    const advisorPanel = currentCommittee?.panels.find(panel => panel.type === "ADVISOR");
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

            {/* Hero Section */}
            <section className="py-16 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <h1 className="text-4xl md:text-6xl font-bold mb-6">
                            Our <span className="text-yellow-300">Committee</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                            Meet the dedicated faculty and student leaders who guide and drive the Computer & Programming Club
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        >
                            {committeeStats.map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.2 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                    className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-xl"
                                >
                                    <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <stat.icon className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                                        {stat.number}
                                    </div>
                                    <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                                        {stat.label}
                                    </div>
                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                        {stat.description}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Committee Panels Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                            className="text-center mb-12"
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                                Our Leadership
                            </h2>
                            <p className="text-xl text-gray-600 dark:text-gray-400">
                                Two dedicated panels working together to serve the DIU community
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Advisory Panel Card */}
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-64 bg-gradient-to-br from-indigo-500 to-purple-600">
                                    {advisorPanel?.image && (
                                        <Image
                                            src={advisorPanel.image}
                                            alt="Advisory Panel"
                                            fill
                                            className="object-contain object-center bg-white dark:bg-gray-900"
                                        />
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Advisory Panel
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        Distinguished faculty members who provide strategic guidance, mentorship, and oversight for all club activities and initiatives.
                                    </p>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <FiUsers className="w-4 h-4 mr-2" />
                                            <span>4 Faculty Members</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <FiAward className="w-4 h-4 mr-2" />
                                            <span>Strategic Guidance</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <FiBookOpen className="w-4 h-4 mr-2" />
                                            <span>Academic Mentorship</span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/committee/advisory"
                                        className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 font-semibold"
                                    >
                                        View Advisory Panel
                                        <FiArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                                    </Link>
                                </div>
                            </motion.div>

                            {/* Student Panel Card */}
                            <motion.div
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.6 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="relative h-64 bg-gradient-to-br from-green-500 to-blue-600">
                                    {studentPanel?.image && (
                                        <Image
                                            src={studentPanel.image}
                                            alt="Student Panel"
                                            fill
                                            className="object-contain object-center bg-white dark:bg-gray-900"
                                        />
                                    )}
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                                        Student Panel
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                        Dynamic student leaders who organize events, manage day-to-day operations, and foster a vibrant programming community.
                                    </p>
                                    <div className="space-y-2 mb-6">
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <FiUsers className="w-4 h-4 mr-2" />
                                            <span>6 Student Leaders</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <FiAward className="w-4 h-4 mr-2" />
                                            <span>Event Organization</span>
                                        </div>
                                        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                            <FiBookOpen className="w-4 h-4 mr-2" />
                                            <span>Peer Mentorship</span>
                                        </div>
                                    </div>
                                    <Link
                                        href="/committee/student"
                                        className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 font-semibold"
                                    >
                                        View Student Panel
                                        <FiArrowLeft className="w-4 h-4 ml-2 rotate-180" />
                                    </Link>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white dark:bg-gray-800">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, amount: 0.2 }}
                            transition={{ duration: 0.6 }}
                        >
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                                Our Mission
                            </h2>
                            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
                                The DIU Computer & Programming Club committee is dedicated to fostering a vibrant community of learners,
                                innovators, and problem-solvers. Through collaborative leadership, we create opportunities for students
                                to develop technical skills, participate in competitions, and build lasting professional networks.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <FiTarget className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Excellence</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Striving for the highest standards in programming and technology</p>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <FiUsers className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Building a supportive and inclusive learning environment</p>
                                </div>
                                <div className="p-6 bg-gray-50 dark:bg-gray-700 rounded-xl">
                                    <FiAward className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-3" />
                                    <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Innovation</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">Encouraging creative problem-solving and technological advancement</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
}
