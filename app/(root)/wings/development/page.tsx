"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/app/components/Navigation";
import { FiCode, FiGitBranch, FiMonitor, FiSmartphone, FiArrowLeft, FiExternalLink, FiUsers, FiCalendar } from "react-icons/fi";
import { useRouter } from "next/navigation";

export default function DevelopmentPage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const technologies = [
        {
            icon: FiMonitor,
            title: "Web Development",
            description: "Learn modern web technologies including React, Next.js, Node.js, and more.",
            color: "text-blue-500",
            technologies: ["React", "Next.js", "Node.js", "Express", "MongoDB"]
        },
        {
            icon: FiSmartphone,
            title: "Mobile Development",
            description: "Build cross-platform mobile applications using React Native and Flutter.",
            color: "text-green-500",
            technologies: ["React Native", "Flutter", "Swift", "Kotlin"]
        },
        {
            icon: FiCode,
            title: "Backend Development",
            description: "Master server-side development with various frameworks and databases.",
            color: "text-purple-500",
            technologies: ["Python", "Django", "FastAPI", "PostgreSQL", "Redis"]
        },
        {
            icon: FiGitBranch,
            title: "DevOps & Deployment",
            description: "Learn deployment strategies, CI/CD, and cloud technologies.",
            color: "text-orange-500",
            technologies: ["Docker", "AWS", "GitHub Actions", "Kubernetes"]
        }
    ];

    const projects = [
        {
            title: "CPC Website",
            description: "The official website for Competitive Programming Club built with Next.js and Tailwind CSS.",
            status: "Completed",
            tech: ["Next.js", "Tailwind CSS", "TypeScript"],
            link: "#"
        },
        {
            title: "Contest Management System",
            description: "A comprehensive platform for managing programming contests and competitions.",
            status: "In Progress",
            tech: ["React", "Node.js", "MongoDB"],
            link: "#"
        },
        {
            title: "Mobile App for CPC",
            description: "Cross-platform mobile application for CPC members to stay updated with events and contests.",
            status: "Planning",
            tech: ["React Native", "Firebase"],
            link: "#"
        }
    ];

    const upcomingEvents = [
        {
            title: "Web Development Workshop",
            date: "March 18, 2024",
            time: "2:00 PM",
            description: "Learn the fundamentals of modern web development with hands-on projects"
        },
        {
            title: "Mobile App Development Bootcamp",
            date: "March 25, 2024",
            time: "10:00 AM",
            description: "Build your first mobile app using React Native"
        },
        {
            title: "Git & GitHub Workshop",
            date: "April 1, 2024",
            time: "3:00 PM",
            description: "Master version control and collaborative development"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white py-16">
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
                                    <FiCode className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">Development Wing</h1>
                                    <p className="text-purple-100 text-lg">
                                        The best way to get a project done faster is to start sooner
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
                                About Development Wing
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                The Development Wing focuses on practical software development skills and real-world
                                project experience. We believe in learning by doing and encourage students to start
                                building projects from day one.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our goal is to bridge the gap between academic learning and industry requirements,
                                preparing students for successful careers in software development through hands-on
                                experience with modern technologies and best practices.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Technologies Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Technologies We Work With
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={tech.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <tech.icon className={`w-6 h-6 ${tech.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {tech.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {tech.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tech.technologies.map((technology) => (
                                        <span
                                            key={technology}
                                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                                        >
                                            {technology}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Projects Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Projects
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
                    </div>

                    <div className="max-w-4xl mx-auto">
                        {projects.map((project, index) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'Completed'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : project.status === 'In Progress'
                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                                        }`}>
                                        {project.status}
                                    </span>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-4">
                                    {project.description}
                                </p>
                                <div className="flex items-center justify-between">
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((technology) => (
                                            <span
                                                key={technology}
                                                className="px-2 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 text-xs rounded-full"
                                            >
                                                {technology}
                                            </span>
                                        ))}
                                    </div>
                                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
                                        View
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
                        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto rounded-full" />
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
                                    <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2">
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
            <section className="py-16 bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Start Developing?
                    </h2>
                    <p className="text-purple-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join our development community and start building amazing projects
                        with modern technologies and best practices.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-purple-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            Join Now
                        </button>
                        <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-purple-600 transition-colors font-semibold">
                            View Projects
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
