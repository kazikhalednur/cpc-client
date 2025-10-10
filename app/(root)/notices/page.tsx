"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/app/components/Navigation";
import { FiCalendar, FiClock, FiTag, FiArrowLeft, FiSearch, FiFilter, FiLoader } from "react-icons/fi";
import Link from "next/link";
import { Notice, NoticeFilters } from "@/types/notice";
import { noticeApi } from "@/lib/api/noticeApi";


const categoryColors = {
    announcement: "bg-blue-100 text-blue-800 border-blue-200",
    event: "bg-green-100 text-green-800 border-green-200",
    achievement: "bg-yellow-100 text-yellow-800 border-yellow-200",
    general: "bg-gray-100 text-gray-800 border-gray-200",
};

const priorityColors = {
    high: "bg-red-100 text-red-800 border-red-200",
    medium: "bg-orange-100 text-orange-800 border-orange-200",
    low: "bg-gray-100 text-gray-800 border-gray-200",
};

export default function NoticesPage() {
    const [notices, setNotices] = useState<Notice[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [selectedPriority, setSelectedPriority] = useState<string>("all");

    // Load notices on component mount
    useEffect(() => {
        loadNotices();
    }, []);

    // Filter notices when search/filter parameters change
    useEffect(() => {
        if (notices.length > 0) {
            loadNotices();
        }
    }, [searchTerm, selectedCategory, selectedPriority]);

    const loadNotices = async () => {
        try {
            setLoading(true);
            setError(null);

            const filters: Partial<NoticeFilters> = {
                searchTerm: searchTerm || undefined,
                category: selectedCategory !== "all" ? selectedCategory : undefined,
                priority: selectedPriority !== "all" ? selectedPriority : undefined,
            };

            const response = await noticeApi.getNotices(filters);
            setNotices(response.data);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load notices");
            console.error("Error loading notices:", err);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const formatTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-6">
                        <Link
                            href="/"
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </Link>
                        <div>
                            <h1 className="text-4xl font-bold mb-2">Notices & Announcements</h1>
                            <p className="text-indigo-100">
                                Stay updated with the latest news, events, and announcements from CPC
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="py-8 bg-gray-50 dark:bg-gray-900">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col lg:flex-row gap-4 items-center">
                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search notices..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                        </div>

                        {/* Category Filter */}
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="all">All Categories</option>
                            <option value="announcement">Announcements</option>
                            <option value="event">Events</option>
                            <option value="achievement">Achievements</option>
                            <option value="general">General</option>
                        </select>

                        {/* Priority Filter */}
                        <select
                            value={selectedPriority}
                            onChange={(e) => setSelectedPriority(e.target.value)}
                            className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                       focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="all">All Priorities</option>
                            <option value="high">High Priority</option>
                            <option value="medium">Medium Priority</option>
                            <option value="low">Low Priority</option>
                        </select>
                    </div>
                </div>
            </section>

            {/* Notices List */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-12">
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                                <FiLoader className="w-6 h-6 animate-spin" />
                                <span>Loading notices...</span>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && (
                        <div className="text-center py-12">
                            <div className="text-red-500 dark:text-red-400 mb-4">
                                <h3 className="text-xl font-medium mb-2">Error Loading Notices</h3>
                                <p>{error}</p>
                                <button
                                    onClick={loadNotices}
                                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Notices List */}
                    {!loading && !error && (
                        <div className="grid gap-6">
                            {notices.map((notice, index) => (
                                <motion.article
                                    key={notice.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 ${notice.priority === "high" ? "border-red-500" :
                                        notice.priority === "medium" ? "border-orange-500" : "border-gray-300"
                                        } ${notice.isPinned ? "ring-2 ring-indigo-200 dark:ring-indigo-800" : ""}`}
                                >
                                    <div className="p-6">
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3 mb-2">
                                                    {notice.isPinned && (
                                                        <span className="px-2 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 
                                         text-xs font-medium rounded-full">
                                                            📌 Pinned
                                                        </span>
                                                    )}
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${categoryColors[notice.category]}`}>
                                                        {notice.category.charAt(0).toUpperCase() + notice.category.slice(1)}
                                                    </span>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[notice.priority]}`}>
                                                        {notice.priority.charAt(0).toUpperCase() + notice.priority.slice(1)} Priority
                                                    </span>
                                                </div>
                                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                                    {notice.title}
                                                </h2>
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                                            {notice.content}
                                        </p>

                                        {/* Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {notice.tags.map((tag, tagIndex) => (
                                                <span
                                                    key={tagIndex}
                                                    className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                                 text-xs rounded-full"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Footer */}
                                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1">
                                                    <FiCalendar className="w-4 h-4" />
                                                    <span>{formatDate(notice.publishedAt)}</span>
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <FiClock className="w-4 h-4" />
                                                    <span>{formatTime(notice.publishedAt)}</span>
                                                </div>
                                                <span>By {notice.author}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            ))}

                            {/* No Results */}
                            {notices.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="text-gray-400 dark:text-gray-600 mb-4">
                                        <FiSearch className="w-16 h-16 mx-auto mb-4" />
                                        <h3 className="text-xl font-medium text-gray-900 dark:text-white mb-2">
                                            No notices found
                                        </h3>
                                        <p className="text-gray-600 dark:text-gray-400">
                                            Try adjusting your search terms or filters
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
