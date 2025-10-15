"use client";

import Image from "next/image";
import Link from "next/link";
import { FiClock, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useState, useRef } from "react";
import { useGetContestsQuery } from "@/lib/api/contestApi";
import type { NormalizedContest } from "@/lib/api/contestApi";

const FeaturedContests = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const { data, isLoading } = useGetContestsQuery({
    status: "UPCOMING",
    page_size: 6,
  });

  const contests: NormalizedContest[] = data?.results || [];

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const nextSlide = () => {
    if (contests.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(contests.length / 3));
  };

  const prevSlide = () => {
    if (contests.length === 0) return;
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(contests.length / 3)) %
        Math.ceil(contests.length / 3)
    );
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "EASY":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "HARD":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "UPCOMING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "ONGOING":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "COMPLETED":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  if (isLoading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-400">Loading contests...</p>
          </div>
        </div>
      </section>
    );
  }

  if (contests.length === 0) {
    return (
      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Contests
            </h2>
            <p className="text-gray-600 dark:text-gray-400">No contests available at the moment.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Contests
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Participate in our featured programming contests and hackathons to
            showcase your skills
          </p>
        </div>

        <div className="flex justify-between items-center mb-12">
          <Link
            href="/contests"
            className="inline-flex items-center px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-700 
                     text-white font-medium transition-all duration-200 shadow-md hover:shadow-xl 
                     hover:shadow-indigo-500/20 group"
          >
            View All
            <FiTrendingUp className="ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 
                       dark:hover:bg-gray-700 transition-colors"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 
                       dark:hover:bg-gray-700 transition-colors"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={(el) => {
            sliderRef.current = el;
            handlers.ref(el);
          }}
          className="relative overflow-hidden"
        >
          <motion.div
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex"
          >
            {Array.from({ length: Math.ceil(contests.length / 3) }).map(
              (_, groupIndex) => (
                <div
                  key={groupIndex}
                  className="w-full flex-shrink-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  style={{ minWidth: "100%" }}
                >
                  {contests
                    .slice(groupIndex * 3, groupIndex * 3 + 3)
                    .map((contest) => (
                      <motion.div
                        key={contest.id}
                        whileHover={{ y: -8 }}
                        className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden 
                               border border-gray-200 dark:border-gray-700 group hover:shadow-xl 
                               transition-all duration-300"
                      >
                        <div className="relative h-48">
                          <Image
                            src={contest.image}
                            alt={contest.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            suppressHydrationWarning
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(contest.difficulty)}`}
                            >
                              {contest.difficulty}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(contest.status)}`}
                            >
                              {contest.status}
                            </span>
                          </div>
                          <div className="absolute bottom-4 left-4">
                            <span className="px-3 py-1 rounded-lg bg-white/90 dark:bg-gray-900/90 text-sm font-medium text-indigo-600 dark:text-indigo-400">
                              {contest.platform}
                            </span>
                          </div>
                        </div>

                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                            {contest.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                            {contest.description}
                          </p>

                          <div className="flex items-center justify-between text-gray-600 dark:text-gray-400 mb-6">
                            <div className="flex items-center gap-2">
                              <FiClock className="w-4 h-4" />
                              <span>
                                {new Date(contest.startTime).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiUsers className="w-4 h-4" />
                              <span>{contest.participants} participants</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <FiAward className="w-4 h-4 text-yellow-500" />
                              <span className="text-yellow-500 font-medium">
                                {contest.prize}
                              </span>
                            </div>
                          </div>

                          <Link
                            href={`/contests/${contest.id}`}
                            className="block w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 
                                   hover:to-purple-700 text-white text-center py-3 rounded-lg transition-all duration-300 
                                   shadow-md hover:shadow-xl hover:shadow-indigo-500/20"
                          >
                            View Contest
                          </Link>
                        </div>
                      </motion.div>
                    ))}
                </div>
              )
            )}
          </motion.div>
        </div>

        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: Math.ceil(contests.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide
                  ? "bg-indigo-600 dark:bg-indigo-400"
                  : "bg-gray-300 dark:bg-gray-600"
                  }`}
              />
            )
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedContests;
