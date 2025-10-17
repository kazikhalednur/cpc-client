"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Navigation } from "@/app/components/Navigation";
import {
    FiCalendar,
    FiClock,
    FiTag,
    FiArrowLeft,
    FiUser,
    FiLoader,
    FiAlertCircle,
    FiShare2,
    FiBookmark
} from "react-icons/fi";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { Notice } from "@/types/notice";
import { noticeApi } from "@/lib/api/noticeApi";

const categoryColors: { [key: string]: string } = {
    announcement: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900 dark:text-blue-200 dark:border-blue-700",
    event: "bg-green-100 text-green-800 border-green-200 dark:bg-green-900 dark:text-green-200 dark:border-green-700",
    achievement: "bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:border-yellow-700",
    general: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
};

const priorityColors: { [key: string]: string } = {
    high: "bg-red-100 text-red-800 border-red-200 dark:bg-red-900 dark:text-red-200 dark:border-red-700",
    medium: "bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-900 dark:text-orange-200 dark:border-orange-700",
    low: "bg-gray-100 text-gray-800 border-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600",
};

export default function NoticeDetailPage() {
    const params = useParams();
    const router = useRouter();
    const noticeId = params.id as string;

    const [notice, setNotice] = useState<Notice | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        if (noticeId) {
            loadNotice();
        }
    }, [noticeId, loadNotice]);


    const loadNotice = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const noticeData = await noticeApi.getNoticeById(noticeId);
            setNotice(noticeData);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to load notice");
            console.error("Error loading notice:", err);
        } finally {
            setLoading(false);
        }
    }, [noticeId]);

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

    const formatDateTime = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getCategoryDisplayName = (category: string | undefined) => {
        if (!category) return 'General'; // Default to General if category is undefined/null

        const categoryMap: { [key: string]: string } = {
            'Announcements': 'Announcement',
            'Events': 'Event',
            'Achievements': 'Achievement',
            'General': 'General'
        };
        return categoryMap[category] || category;
    };

    const getPriorityDisplayName = (priority: string | undefined) => {
        if (!priority) return 'low'; // Default to low if priority is undefined/null

        const priorityMap: { [key: string]: string } = {
            'HIGH': 'high',
            'MEDIUM': 'medium',
            'LOW': 'low'
        };
        return priorityMap[priority] || priority.toLowerCase();
    };

    const handleShare = async () => {
        if (navigator.share && notice) {
            try {
                await navigator.share({
                    title: notice.title,
                    text: notice.content.substring(0, 200) + "...",
                    url: window.location.href,
                });
            } catch {
                // Fallback to clipboard
                navigator.clipboard.writeText(window.location.href);
            }
        } else {
            // Fallback to clipboard
            navigator.clipboard.writeText(window.location.href);
        }
    };

    const handleBack = () => {
        router.back();
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="flex items-center gap-3 text-gray-600 dark:text-gray-400">
                        <FiLoader className="w-8 h-8 animate-spin" />
                        <span className="text-lg">Loading notice...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !notice) {
        return (
            <div className="min-h-screen bg-background">
                <Navigation />
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="text-red-500 dark:text-red-400 mb-6">
                            <FiAlertCircle className="w-16 h-16 mx-auto mb-4" />
                            <h1 className="text-2xl font-bold mb-2">Notice Not Found</h1>
                            <p className="text-gray-600 dark:text-gray-400 mb-6">
                                {error || "The notice you're looking for doesn't exist or has been removed."}
                            </p>
                            <div className="flex gap-4 justify-center">
                                <button
                                    onClick={handleBack}
                                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                >
                                    <FiArrowLeft className="w-4 h-4" />
                                    Go Back
                                </button>
                                <Link
                                    href="/notices"
                                    className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                >
                                    View All Notices
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            {/* Header Section */}
            <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 text-white py-16">
                <div className="container mx-auto px-4">
                    <div className="flex items-center gap-4 mb-6">
                        <button
                            onClick={handleBack}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                        >
                            <FiArrowLeft className="w-5 h-5" />
                        </button>
                        <div className="flex-1">
                            <h1 className="text-3xl font-bold mb-2">Notice Details</h1>
                            <p className="text-indigo-100">
                                Viewing notice: {notice.title}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Notice Content */}
            <section className="py-12">
                <div className="container mx-auto px-4">
                    <motion.article
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg border-l-4 ${notice.priority === "HIGH" ? "border-red-500" :
                            notice.priority === "MEDIUM" ? "border-orange-500" : "border-gray-300"
                            } ${notice.is_pinned ? "ring-2 ring-indigo-200 dark:ring-indigo-800" : ""}`}
                    >
                        <div className="p-8">
                            {/* Header */}
                            <div className="mb-8">
                                <div className="flex items-center gap-3 mb-4">
                                    {notice.is_pinned && (
                                        <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 
                                         text-sm font-medium rounded-full">
                                            📌 Pinned
                                        </span>
                                    )}
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${categoryColors[getCategoryDisplayName(notice.category)]}`}>
                                        {getCategoryDisplayName(notice.category)}
                                    </span>
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${priorityColors[getPriorityDisplayName(notice.priority)]}`}>
                                        {getPriorityDisplayName(notice.priority).charAt(0).toUpperCase() + getPriorityDisplayName(notice.priority).slice(1)} Priority
                                    </span>
                                </div>

                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    {notice.title}
                                </h1>

                                {/* Meta Information */}
                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-6">
                                    <div className="flex items-center gap-2">
                                        <FiUser className="w-4 h-4" />
                                        <span>By CPC Admin</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiCalendar className="w-4 h-4" />
                                        <span>{formatDate(notice.published_at)}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FiClock className="w-4 h-4" />
                                        <span>{formatTime(notice.published_at)}</span>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={handleShare}
                                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
                                    >
                                        <FiShare2 className="w-4 h-4" />
                                        Share
                                    </button>
                                    <button className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center gap-2">
                                        <FiBookmark className="w-4 h-4" />
                                        Save
                                    </button>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="prose prose-lg max-w-none dark:prose-invert mb-8">
                                <div className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                                    {notice.content}
                                </div>
                            </div>

                            {/* Tags */}
                            {notice.tags && Array.isArray(notice.tags) && notice.tags.length > 0 && (
                                <div className="mb-8">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                        <FiTag className="w-5 h-5" />
                                        Tags
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {notice.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 
                                 text-sm rounded-full hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                                            >
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Footer */}
                            <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        <p>Published on {formatDateTime(notice.published_at)}</p>
                                        <p>Notice ID: {notice.id}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <button
                                            onClick={handleBack}
                                            className="px-6 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 
                                             rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                                        >
                                            <FiArrowLeft className="w-4 h-4" />
                                            Back to Notices
                                        </button>
                                        <Link
                                            href="/notices"
                                            className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                        >
                                            View All Notices
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.article>
                </div>
            </section>
        </div>
    );
}
