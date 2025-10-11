"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/app/components/Navigation";
import { FiBook, FiSearch, FiEdit3, FiUsers, FiArrowLeft, FiExternalLink, FiCalendar, FiAward } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ResearchJournalPage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const researchAreas = [
        {
            icon: FiSearch,
            title: "Algorithm Research",
            description: "Explore new algorithmic approaches and optimization techniques for complex computational problems.",
            color: "text-emerald-500",
            topics: ["Graph Algorithms", "Machine Learning", "Optimization", "Data Structures"]
        },
        {
            icon: FiBook,
            title: "Academic Writing",
            description: "Learn the art of academic writing, research methodology, and publication processes.",
            color: "text-blue-500",
            topics: ["Research Papers", "Technical Writing", "Citation", "Peer Review"]
        },
        {
            icon: FiEdit3,
            title: "Journal Publications",
            description: "Contribute to academic journals and share your research findings with the global community.",
            color: "text-purple-500",
            topics: ["IEEE Papers", "ACM Publications", "Conference Papers", "Open Access"]
        },
        {
            icon: FiUsers,
            title: "Collaborative Research",
            description: "Work with peers and faculty on interdisciplinary research projects and publications.",
            color: "text-orange-500",
            topics: ["Team Research", "Mentorship", "Cross-disciplinary", "Industry Collaboration"]
        }
    ];

    const publications = [
        {
            title: "Optimization Techniques in Competitive Programming",
            authors: "CPC Research Team",
            journal: "ACM Computing Surveys",
            year: "2024",
            status: "Published",
            link: "#"
        },
        {
            title: "Machine Learning Applications in Algorithm Design",
            authors: "Dr. Smith, CPC Students",
            journal: "IEEE Transactions on Knowledge",
            year: "2024",
            status: "Under Review",
            link: "#"
        },
        {
            title: "Educational Impact of Programming Contests",
            authors: "CPC Research Wing",
            journal: "Computer Science Education",
            year: "2023",
            status: "Published",
            link: "#"
        }
    ];

    const upcomingEvents = [
        {
            title: "Research Methodology Workshop",
            date: "March 22, 2024",
            time: "2:00 PM",
            description: "Learn proper research methodology and academic writing techniques"
        },
        {
            title: "Journal Publication Seminar",
            date: "March 29, 2024",
            time: "10:00 AM",
            description: "Understanding the publication process and peer review system"
        },
        {
            title: "Research Collaboration Meetup",
            date: "April 5, 2024",
            time: "3:00 PM",
            description: "Connect with fellow researchers and explore collaboration opportunities"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 text-white py-16">
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
                                    <FiBook className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">Research & Journal</h1>
                                    <p className="text-emerald-100 text-lg">
                                        Why do we do basic research? To learn about ourselves
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
                                About Research & Journal Wing
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                The Research & Journal Wing is dedicated to fostering academic excellence and
                                research culture within the competitive programming community. We believe that
                                research is essential for understanding ourselves and advancing the field.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our mission is to encourage students to engage in meaningful research,
                                contribute to academic publications, and develop critical thinking skills
                                that extend beyond programming competitions.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Research Areas Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Research Areas
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {researchAreas.map((area, index) => (
                            <motion.div
                                key={area.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <area.icon className={`w-6 h-6 ${area.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {area.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {area.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {area.topics.map((topic) => (
                                        <span
                                            key={topic}
                                            className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 text-sm rounded-full"
                                        >
                                            {topic}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Publications Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Recent Publications
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {publications.map((publication, index) => (
                            <motion.div
                                key={publication.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {publication.title}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${publication.status === 'Published'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                        }`}>
                                        {publication.status}
                                    </span>
                                </div>
                                <div className="text-gray-600 dark:text-gray-300 mb-4">
                                    <p className="font-medium">{publication.authors}</p>
                                    <p className="text-sm">{publication.journal} • {publication.year}</p>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                                        <FiAward className="w-4 h-4" />
                                        <span>Academic Publication</span>
                                    </div>
                                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
                                        Read
                                        <FiExternalLink className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Upcoming Events Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Upcoming Events
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-emerald-600 to-teal-600 mx-auto rounded-full" />
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
                                    <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2">
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
            <section className="py-16 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Your Research Journey?
                    </h2>
                    <p className="text-emerald-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join our research community and contribute to the advancement of
                        computer science through meaningful research and publications.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-emerald-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            Join Now
                        </button>
                        <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-emerald-600 transition-colors font-semibold">
                            View Publications
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
