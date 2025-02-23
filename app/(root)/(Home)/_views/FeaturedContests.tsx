"use client";

import Image from "next/image";
import Link from "next/link";
import { FiClock, FiUsers, FiAward, FiTrendingUp } from "react-icons/fi";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { useState, useRef } from "react";

interface Contest {
  id: string;
  title: string;
  image: string;
  date: string;
  participants: number;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Upcoming" | "Ongoing" | "Completed";
  platform: string;
  prize: string;
  description: string;
}

const FeaturedContests = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const contests: Contest[] = [
    {
      id: "1",
      title: "Weekly Programming Contest",
      image:
        "https://images.unsplash.com/photo-1623479322729-28b25c16b011?ixlib=rb-4.0.3",
      date: "2024-03-01T15:00:00",
      participants: 156,
      difficulty: "Medium",
      status: "Upcoming",
      platform: "Codeforces",
      prize: "$500",
      description:
        "Test your algorithmic skills in this weekly competitive programming contest. Solve challenging problems and compete with fellow programmers.",
    },
    {
      id: "2",
      title: "AI/ML Hackathon",
      image:
        "https://images.unsplash.com/photo-1591453089816-0fbb971b454c?ixlib=rb-4.0.3",
      date: "2024-03-15T09:00:00",
      participants: 98,
      difficulty: "Hard",
      status: "Upcoming",
      platform: "Kaggle",
      prize: "$1000",
      description:
        "Build innovative AI solutions for real-world problems. Great opportunity for ML enthusiasts to showcase their skills.",
    },
    {
      id: "3",
      title: "Web Development Challenge",
      image:
        "https://images.unsplash.com/photo-1534972195531-d756b9bfa9f2?ixlib=rb-4.0.3",
      date: "2024-03-10T10:00:00",
      participants: 124,
      difficulty: "Easy",
      status: "Upcoming",
      platform: "DevChallenges",
      prize: "$300",
      description:
        "Create responsive and modern web applications using the latest technologies. Perfect for frontend and full-stack developers.",
    },
    {
      id: "4",
      title: "Data Science Competition",
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3",
      date: "2024-03-20T14:00:00",
      participants: 212,
      difficulty: "Hard",
      status: "Upcoming",
      platform: "DataCamp",
      prize: "$2000",
      description:
        "Analyze complex datasets and develop predictive models in this challenging data science competition.",
    },
    {
      id: "5",
      title: "Mobile App Innovation",
      image:
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3",
      date: "2024-04-05T09:00:00",
      participants: 76,
      difficulty: "Medium",
      status: "Upcoming",
      platform: "DevPost",
      prize: "$1500",
      description:
        "Design and develop innovative mobile applications that solve real-world problems. Open for both Android and iOS developers.",
    },
    {
      id: "6",
      title: "Cybersecurity Challenge",
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3",
      date: "2024-03-25T10:00:00",
      participants: 89,
      difficulty: "Hard",
      status: "Upcoming",
      platform: "HackTheBox",
      prize: "$2500",
      description:
        "Test your security skills in this intensive cybersecurity challenge. Identify vulnerabilities and propose solutions.",
    },
  ];

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(contests.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) =>
        (prev - 1 + Math.ceil(contests.length / 3)) %
        Math.ceil(contests.length / 3)
    );
  };

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
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          <div className="absolute top-4 right-4 flex gap-2">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium 
                            ${
                              contest.difficulty === "Easy" &&
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }
                            ${
                              contest.difficulty === "Medium" &&
                              "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            }
                            ${
                              contest.difficulty === "Hard" &&
                              "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                            }`}
                            >
                              {contest.difficulty}
                            </span>
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium 
                            ${
                              contest.status === "Upcoming" &&
                              "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400"
                            }
                            ${
                              contest.status === "Ongoing" &&
                              "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            }
                            ${
                              contest.status === "Completed" &&
                              "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}
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
                                {new Date(contest.date).toLocaleDateString()}
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
                            Register Now
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
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentSlide
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
