"use client";

import { motion } from "framer-motion";
import { Navigation } from "@/app/components/Navigation";
import { FiBriefcase, FiUsers, FiTrendingUp, FiTarget, FiArrowLeft, FiExternalLink, FiCalendar, FiAward } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function JobCareerPage() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    const careerServices = [
        {
            icon: FiBriefcase,
            title: "Career Guidance",
            description: "Get personalized career advice and guidance from industry professionals and alumni.",
            color: "text-orange-500",
            services: ["Resume Review", "Interview Prep", "Career Planning", "Skill Assessment"]
        },
        {
            icon: FiUsers,
            title: "Industry Networking",
            description: "Connect with industry professionals, alumni, and potential employers through networking events.",
            color: "text-blue-500",
            services: ["Networking Events", "Industry Talks", "Alumni Meetups", "Company Visits"]
        },
        {
            icon: FiTrendingUp,
            title: "Skill Development",
            description: "Enhance your technical and soft skills through workshops and training programs.",
            color: "text-green-500",
            services: ["Technical Skills", "Soft Skills", "Leadership", "Communication"]
        },
        {
            icon: FiTarget,
            title: "Job Placement",
            description: "Access exclusive job opportunities and internship programs from our industry partners.",
            color: "text-purple-500",
            services: ["Job Listings", "Internships", "Placement Support", "Company Partnerships"]
        }
    ];

    const successStories = [
        {
            name: "Sarah Ahmed",
            position: "Software Engineer at Google",
            company: "Google",
            story: "CPC's career guidance helped me land my dream job at Google. The networking events and interview preparation were invaluable.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Mohammad Rahman",
            position: "Data Scientist at Microsoft",
            company: "Microsoft",
            story: "The industry collaboration program connected me with mentors who guided me through my career transition into data science.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        {
            name: "Fatima Khan",
            position: "Product Manager at Amazon",
            company: "Amazon",
            story: "CPC's skill development workshops helped me build the leadership skills needed for my current role as a Product Manager.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        }
    ];

    const upcomingEvents = [
        {
            title: "Industry Networking Event",
            date: "March 20, 2024",
            time: "6:00 PM",
            description: "Connect with industry professionals from top tech companies"
        },
        {
            title: "Resume Building Workshop",
            date: "March 27, 2024",
            time: "2:00 PM",
            description: "Learn how to create a compelling resume that stands out to employers"
        },
        {
            title: "Mock Interview Session",
            date: "April 3, 2024",
            time: "10:00 AM",
            description: "Practice your interview skills with industry professionals"
        }
    ];

    const partnerCompanies = [
        { name: "Google", logo: "🔍" },
        { name: "Microsoft", logo: "🪟" },
        { name: "Amazon", logo: "📦" },
        { name: "Meta", logo: "📘" },
        { name: "Netflix", logo: "🎬" },
        { name: "Uber", logo: "🚗" }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 text-white py-16">
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
                                    <FiBriefcase className="w-8 h-8" />
                                </div>
                                <div>
                                    <h1 className="text-4xl font-bold mb-2">Job Career & Industry Collaboration</h1>
                                    <p className="text-orange-100 text-lg">
                                        Let's learn how to build a better and more skilled career
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
                                About Job Career & Industry Collaboration
                            </h2>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-6">
                                The Job Career & Industry Collaboration wing is dedicated to bridging the gap
                                between academic learning and industry requirements. We help students build
                                successful careers in technology through comprehensive career guidance and
                                industry partnerships.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
                                Our mission is to prepare students for the competitive job market by providing
                                career guidance, networking opportunities, skill development programs, and
                                direct connections with industry leaders and potential employers.
                            </p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Services
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {careerServices.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                                        <service.icon className={`w-6 h-6 ${service.color}`} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                            {service.title}
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-300">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {service.services.map((serviceItem) => (
                                        <span
                                            key={serviceItem}
                                            className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200 text-sm rounded-full"
                                        >
                                            {serviceItem}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Success Stories
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {successStories.map((story, index) => (
                            <motion.div
                                key={story.name}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                            >
                                <div className="text-center mb-4">
                                    <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                                        <img
                                            src={story.image}
                                            alt={story.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {story.name}
                                    </h3>
                                    <p className="text-orange-600 dark:text-orange-400 font-medium">
                                        {story.position}
                                    </p>
                                    <p className="text-gray-500 dark:text-gray-400 text-sm">
                                        {story.company}
                                    </p>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 text-sm italic">
                                    "{story.story}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Partner Companies Section */}
            <section className="py-16 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Our Industry Partners
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full" />
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 max-w-4xl mx-auto">
                        {partnerCompanies.map((company, index) => (
                            <motion.div
                                key={company.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow"
                            >
                                <div className="text-4xl mb-2">{company.logo}</div>
                                <p className="text-gray-700 dark:text-gray-300 font-medium">
                                    {company.name}
                                </p>
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
                        <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-red-600 mx-auto rounded-full" />
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
                                                <FiAward className="w-4 h-4" />
                                                <span>{event.time}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center gap-2">
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
            <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Ready to Build Your Career?
                    </h2>
                    <p className="text-orange-100 text-lg mb-8 max-w-2xl mx-auto">
                        Join our career development program and get the guidance you need
                        to build a successful career in technology.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button className="px-8 py-3 bg-white text-orange-600 rounded-lg hover:bg-gray-100 transition-colors font-semibold">
                            Join Now
                        </button>
                        <button className="px-8 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-orange-600 transition-colors font-semibold">
                            View Opportunities
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
