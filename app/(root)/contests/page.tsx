"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useGetContestsQuery } from "@/lib/api/contestApi";
import { useDebounce } from "@/hooks/useDebounce";
import {
    FiSearch,
    FiFilter,
    FiCalendar,
    FiUsers,
    FiAward,
    FiExternalLink,
    FiClock,
    FiTag,
    FiChevronDown,
    FiChevronUp,
} from "react-icons/fi";
type NormalizedContest = {
    id: string;
    title: string;
    description: string;
    startTime: string;
    endTime: string;
    platform: string;
    difficulty: "EASY" | "MEDIUM" | "HARD" | string;
    prize?: string;
    image: string;
    status: string;
    participants: number;
};

export default function ContestsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
    const [selectedStatus, setSelectedStatus] = useState<string>("all");
    const [showFilters, setShowFilters] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const debouncedSearch = useDebounce(searchTerm, 500);
    const pageSize = 12;
    const difficultyParam = selectedDifficulty === "all"
        ? undefined
        : selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1).toLowerCase();
    const { data, isLoading } = useGetContestsQuery({
        page: currentPage,
        page_size: pageSize,
        search: debouncedSearch || undefined,
        status: selectedStatus !== "all" ? selectedStatus : undefined,
        difficulty_level: difficultyParam,
    });
    const contests: NormalizedContest[] = data?.results || [];
    const totalContests = data?.count || 0;
    const hasMore = Boolean(data?.next);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case "EASY":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
            case "MEDIUM":
                return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
            case "HARD":
                return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "UPCOMING":
                return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300";
            case "ONGOING":
                return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
            case "COMPLETED":
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
            default:
                return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    const getTimeRemaining = (endTime: string) => {
        const now = new Date();
        const end = new Date(endTime);
        const diff = end.getTime() - now.getTime();

        if (diff <= 0) return "Ended";

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (days > 0) return `${days}d ${hours}h remaining`;
        if (hours > 0) return `${hours}h ${minutes}m remaining`;
        return `${minutes}m remaining`;
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                    </div>
                </div>
            </div>
        );
    }

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
                            <span className="text-yellow-300">Contests</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed">
                            Participate in exciting contests and showcase your skills
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Search and Filters */}
            <section className="py-8 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Search Bar */}
                        <div className="relative mb-6">
                            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search contests by title, description, or platform..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <div className="flex items-center justify-between mb-4">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300"
                            >
                                <FiFilter className="w-4 h-4" />
                                <span>Filters</span>
                                {showFilters ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
                            </button>

                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {totalContests} contest{totalContests !== 1 ? "s" : ""} found
                            </div>
                        </div>

                        {/* Filter Options */}
                        {showFilters && (
                            <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
                            >
                                {/* Difficulty Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Difficulty
                                    </label>
                                    <select
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="all">All Difficulties</option>
                                        <option value="EASY">Easy</option>
                                        <option value="MEDIUM">Medium</option>
                                        <option value="HARD">Hard</option>
                                    </select>
                                </div>

                                {/* Status Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Status
                                    </label>
                                    <select
                                        value={selectedStatus}
                                        onChange={(e) => setSelectedStatus(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    >
                                        <option value="all">All Status</option>
                                        <option value="UPCOMING">Upcoming</option>
                                        <option value="ONGOING">Ongoing</option>
                                        <option value="COMPLETED">Completed</option>
                                    </select>
                                </div>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Contests Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {contests.length === 0 && !isLoading ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">🔍</div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                No contests found
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                                Try adjusting your search criteria or check back later for new contests.
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {contests.map((contest, index) => (
                                <motion.div
                                    key={contest.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    {/* Contest Image */}
                                    <div className="relative h-48 bg-gradient-to-br from-indigo-500 to-purple-600">
                                        {contest.image ? (
                                            <Image
                                                src={contest.image}
                                                alt={contest.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <FiAward className="w-16 h-16 text-white opacity-50" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                                                    contest.status
                                                )}`}
                                            >
                                                {contest.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contest Content */}
                                    <div className="p-6">
                                        <div className="flex items-start justify-between mb-4">
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors duration-300">
                                                {contest.title}
                                            </h3>
                                            <span
                                                className={`px-2 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                                                    contest.difficulty
                                                )}`}
                                            >
                                                {contest.difficulty}
                                            </span>
                                        </div>

                                        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                                            {contest.description}
                                        </p>

                                        <div className="space-y-2 mb-4">
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FiCalendar className="w-4 h-4 mr-2" />
                                                <span>Start: {formatDate(contest.startTime)}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FiClock className="w-4 h-4 mr-2" />
                                                <span>End: {formatDate(contest.endTime)}</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FiUsers className="w-4 h-4 mr-2" />
                                                <span>{contest.participants} participants</span>
                                            </div>
                                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                                <FiTag className="w-4 h-4 mr-2" />
                                                <span>{contest.platform}</span>
                                            </div>
                                        </div>

                                        {contest.prize && (
                                            <div className="mb-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                                                <div className="flex items-center text-sm font-semibold text-yellow-800 dark:text-yellow-300">
                                                    <FiAward className="w-4 h-4 mr-2" />
                                                    Prize: {contest.prize}
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-500 dark:text-gray-400">
                                                {contest.status === "ONGOING" && (
                                                    <span className="text-green-600 dark:text-green-400 font-semibold">
                                                        {getTimeRemaining(contest.endTime)}
                                                    </span>
                                                )}
                                                {contest.status === "UPCOMING" && (
                                                    <span className="text-blue-600 dark:text-blue-400 font-semibold">
                                                        Starts {getTimeRemaining(contest.startTime)}
                                                    </span>
                                                )}
                                                {contest.status === "COMPLETED" && (
                                                    <span className="text-gray-500 dark:text-gray-400">
                                                        Contest ended
                                                    </span>
                                                )}
                                            </div>
                                            <Link
                                                href={`/contests/${contest.id}`}
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300 group"
                                            >
                                                <span>View Details</span>
                                                <FiExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                                            </Link>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Pagination */}
            <section className="pb-16">
                <div className="container mx-auto px-4">
                    {totalContests > 0 && (
                        <div className="max-w-6xl mx-auto flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-6">
                            <button
                                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Previous
                            </button>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                Page {currentPage} of {Math.max(1, Math.ceil(totalContests / 12))}
                            </div>
                            <button
                                onClick={() => setCurrentPage((p) => p + 1)}
                                disabled={!hasMore}
                                className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
