"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/app/components/Navigation";
import { FiAward, FiCode, FiUsers, FiCalendar, FiBook, FiArrowLeft, FiExternalLink } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ACMTaskForcePage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const features = [
        {
            icon: FiCode,
            title: "Programming Contests",
            description: "Regular competitive programming contests to sharpen your algorithmic skills and problem-solving abilities.",
            color: "text-blue-500"
        },
        {
            icon: FiBook,
            title: "Workshops & Training",
            description: "Comprehensive workshops covering data structures, algorithms, and advanced programming concepts.",
            color: "text-green-500"
        },
        {
            icon: FiUsers,
            title: "Team Building",
            description: "Form teams for ICPC and other major competitions. Learn to work collaboratively on complex problems.",
            color: "text-purple-500"
        },
        {
            icon: FiAward,
            title: "Achievement Recognition",
            description: "Celebrate achievements and milestones. Get recognized for your programming excellence.",
            color: "text-orange-500"
        }
    ];

    const upcomingEvents = [
        {
            title: "Weekly Programming Contest",
            date: "Every Friday",
            time: "6:00 PM",
            description: "Test your skills in our weekly competitive programming contest"
        },
        {
            title: "Algorithm Workshop Series",
            date: "March 15, 2024",
            time: "2:00 PM",
            description: "Deep dive into advanced algorithms and data structures"
        },
        {
            title: "ICPC Practice Session",
            date: "March 20, 2024",
            time: "10:00 AM",
            description: "Team practice session for upcoming ICPC competition"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-3 rounded-lg bg-white/20">
                                    <FiAward className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">ACM Task Force</h1>
                                    <p className="text-blue-100 text-lg">
                                        Where programmers become Gladiators
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12"
                        >
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                                About ACM Task Force
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                The ACM Task Force is the competitive programming wing of CPC, dedicated to nurturing
                                the next generation of algorithmic problem solvers. We organize workshops, classes,
                                contests, and many more activities to help students excel in competitive programming.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our mission is to create a community of passionate programmers who can tackle
                                complex algorithmic challenges and represent our university in prestigious
                                competitions like ICPC, Google Code Jam, and more.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            What We Offer
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {features.map((feature, index) => (
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <feature.icon className={`w-6 h-6 ${feature.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Upcoming Events
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {upcomingEvents.map((event, index) => (
                            <motion.div
                                key={event.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {event.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300 mb-3">
                                            {event.description}
                                        </p>
                                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <FiCalendar className="w-4 h-4" />
                                                <span>{event.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <FiUsers className="w-4 h-4" />
                                                <span>{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                                        Join
                                        <FiExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Join Section */}
            <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Join ACM Task Force?
                    </h2>
                    <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
                        Become part of our competitive programming community and take your
                        algorithmic skills to the next level.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            Join Now
                        </button>
                        <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors font-semibold">
                            Learn More
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
