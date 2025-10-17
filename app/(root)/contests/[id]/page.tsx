"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
// import { motion } from "framer-motion";
import { useGetContestByIdQuery } from "@/lib/api/contestApi";
import {
    FiCalendar,
    FiClock,
    FiUsers,
    FiAward,
    FiExternalLink,
    FiTag,
    FiArrowLeft,
    FiCheckCircle,
    FiXCircle,
    FiAlertCircle,
    // FiCode,
    FiStar,
} from "react-icons/fi";
export default function ContestDetailPage() {
    const params = useParams();
    const id = useMemo(() => (Array.isArray(params.id) ? params.id[0] : params.id) as string, [params.id]);
    const { data: contest, isLoading } = useGetContestByIdQuery(id, { skip: !id });
    type Participant = { id: string; name: string; registeredAt: string };
    const participants: Participant[] = [];

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

        if (days > 0) return `${days} days, ${hours} hours remaining`;
        if (hours > 0) return `${hours} hours, ${minutes} minutes remaining`;
        return `${minutes} minutes remaining`;
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

    if (!contest) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
                <div className="container mx-auto px-4 py-16">
                    <div className="text-center">
                        <div className="text-6xl mb-4">❌</div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                            Contest Not Found
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-8">
                            The contest you&apos;re looking for doesn&apos;t exist or has been removed.
                        </p>
                        <Link
                            href="/contests"
                            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                        >
                            <FiArrowLeft className="w-4 h-4 mr-2" />
                            Back to Contests
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
            {/* Back Button */}
            <div className="container mx-auto px-4 py-6">
                <Link
                    href="/contests"
                    className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors duration-300"
                >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Back to Contests
                </Link>
            </div>

            {/* Contest Header */
            }
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {/* Contest Image and Basic Info */}
                            <div className="lg:col-span-2">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                                    {/* Contest Image */}
                                    <div className="relative h-64 bg-gradient-to-br from-indigo-500 to-purple-600">
                                        {contest.image ? (
                                            <Image
                                                src={contest.image}
                                                alt={contest.title}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <FiAward className="w-24 h-24 text-white opacity-50" />
                                            </div>
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                                                    contest.status
                                                )}`}
                                            >
                                                {contest.status}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Contest Details */}
                                    <div className="p-8">
                                        <div className="flex items-start justify-between mb-6">
                                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                                {contest.title}
                                            </h1>
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-semibold ${getDifficultyColor(
                                                    contest.difficulty
                                                )}`}
                                            >
                                                {contest.difficulty as string}
                                            </span>
                                        </div>

                                        {(contest as unknown as { shortDescription?: string }).shortDescription && (
                                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-6">
                                                {(contest as unknown as { shortDescription?: string }).shortDescription}
                                            </p>
                                        )}

                                        {(contest as unknown as { rawHtmlDescription?: string }).rawHtmlDescription ? (
                                            <div
                                                className="prose prose-indigo dark:prose-invert max-w-none mb-8"
                                                dangerouslySetInnerHTML={{ __html: (contest as unknown as { rawHtmlDescription: string }).rawHtmlDescription }}
                                            />
                                        ) : (
                                            <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8">
                                                {contest.description}
                                            </p>
                                        )}

                                        {/* Contest Stats */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <FiUsers className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                                                <div className="text-2xl font-bold text-gray-900 dark:text-white">
                                                    {contest.participants}
                                                    {(contest as unknown as { maxParticipants?: number }).maxParticipants ? ` / ${(contest as unknown as { maxParticipants?: number }).maxParticipants}` : ""}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Participants
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <FiTag className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {contest.platform}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Platform
                                                </div>
                                            </div>
                                            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                                <FiAward className="w-8 h-8 text-indigo-600 dark:text-indigo-400 mx-auto mb-2" />
                                                <div className="text-lg font-bold text-gray-900 dark:text-white">
                                                    {Array.isArray((contest as unknown as { prizes?: unknown[]; prize?: string }).prizes) && (contest as unknown as { prizes?: unknown[] }).prizes!.length > 0
                                                        ? `${(contest as unknown as { prizes: unknown[] }).prizes.length} prize${(contest as unknown as { prizes: unknown[] }).prizes.length > 1 ? "s" : ""}`
                                                        : (contest as unknown as { prize?: string }).prize || "No prizes listed"}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    Prize
                                                </div>
                                            </div>
                                        </div>

                                        {Array.isArray((contest as unknown as { prizes?: Array<{ position?: string; prize?: string; title?: string }> }).prizes) && (contest as unknown as { prizes: Array<{ position?: string; prize?: string; title?: string }> }).prizes.length > 0 && (
                                            <div className="mb-8">
                                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                                                    <FiAward className="w-5 h-5 mr-2 text-yellow-500" />
                                                    Prizes
                                                </h3>
                                                <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                                                    {(contest as unknown as { prizes: Array<{ position?: string; prize?: string; title?: string }> }).prizes.map((p, idx: number) => (
                                                        <li key={idx}>
                                                            {p.position ? `${p.position}: ` : ""}{p.prize || p.title || JSON.stringify(p)}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Registration Panel */}
                            <div className="lg:col-span-1">
                                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-24">
                                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                                        Contest Details
                                    </h3>

                                    {/* Time Information */}
                                    <div className="space-y-4 mb-6">
                                        <div className="flex items-start space-x-3">
                                            <FiCalendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    Start Time
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatDate(contest.startTime as string)}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-start space-x-3">
                                            <FiClock className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                                            <div>
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    End Time
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatDate(contest.endTime as string)}
                                                </div>
                                            </div>
                                        </div>
                                        {(contest as unknown as { registrationDeadline?: string }).registrationDeadline && (
                                            <div className="flex items-start space-x-3">
                                                <FiCalendar className="w-5 h-5 text-indigo-600 dark:text-indigo-400 mt-1" />
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        Registration Deadline
                                                    </div>
                                                    <div className="text-sm text-gray-600 dark:text-gray-400">
                                                        {formatDate((contest as unknown as { registrationDeadline: string }).registrationDeadline)}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Status and Time Remaining */}
                                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                        <div className="text-center">
                                            {contest.status === "ONGOING" && (
                                                <div className="flex items-center justify-center text-green-600 dark:text-green-400 mb-2">
                                                    <FiCheckCircle className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Contest is Live!</span>
                                                </div>
                                            )}
                                            {contest.status === "UPCOMING" && (
                                                <div className="flex items-center justify-center text-blue-600 dark:text-blue-400 mb-2">
                                                    <FiAlertCircle className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Starting Soon</span>
                                                </div>
                                            )}
                                            {contest.status === "COMPLETED" && (
                                                <div className="flex items-center justify-center text-gray-600 dark:text-gray-400 mb-2">
                                                    <FiXCircle className="w-5 h-5 mr-2" />
                                                    <span className="font-semibold">Contest Ended</span>
                                                </div>
                                            )}
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {contest.status === "ONGOING" && getTimeRemaining(contest.endTime as string)}
                                                {contest.status === "UPCOMING" && getTimeRemaining(contest.startTime as string)}
                                                {contest.status === "COMPLETED" && "Thank you for participating!"}
                                            </div>
                                        </div>
                                    </div>

                                    {(contest as unknown as { organizer?: string }).organizer && (
                                        <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                            <div className="text-sm font-medium text-gray-900 dark:text-white mb-1">Organizer</div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">{(contest as unknown as { organizer: string }).organizer}</div>
                                        </div>
                                    )}

                                    {/* External Link */}
                                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-600">
                                        <a
                                            href={(contest as unknown as { platformLink?: string }).platformLink || `https://${contest.platform.toLowerCase()}.com`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg font-semibold hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center"
                                        >
                                            <FiExternalLink className="w-4 h-4 mr-2" />
                                            Visit {contest.platform}
                                        </a>
                                    </div>

                                    {(contest as unknown as { registrationLink?: string }).registrationLink && (
                                        <div className="mt-4">
                                            <a
                                                href={(contest as unknown as { registrationLink: string }).registrationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 flex items-center justify-center"
                                            >
                                                Register Now
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Participants Section */}
            {participants.length > 0 && (
                <section className="py-16 bg-white dark:bg-gray-800">
                    <div className="container mx-auto px-4">
                        <div className="max-w-6xl mx-auto">
                            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">
                                Participants ({participants.length})
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {participants.map((participant) => (
                                    <div
                                        key={participant.id}
                                        className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex items-center space-x-3"
                                    >
                                        <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center">
                                            <FiStar className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <div>
                                            <div className="font-medium text-gray-900 dark:text-white">
                                                {participant.name}
                                            </div>
                                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                                {new Date(participant.registeredAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}
