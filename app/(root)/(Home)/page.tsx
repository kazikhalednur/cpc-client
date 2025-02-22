"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

import cpclogo from "../../../assets/images/CPC-Logo.png";
import ContestCard from "./_views/ContestCard";
import QuickAccessCard from "./_views/QuickAccessCard";
import AchievementCard from "./_views/AchievementCard";
import WingsSection from "./_views/WingsSection";
import HeroSection from "./_views/HeroSection";
import NoticeSection from "./_views/NoticeSection";
import { useSession } from "next-auth/react";

// Add this component before the Home component
const Navigation = () => {
  const { data: session } = useSession();
  const [isLoggedIn] = useState(true);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    console.log("session: ", session);
  }, [session]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  const user = {
    name: "John Doe",
    image: null, // Set to null to test fallback avatar
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav
      className="fixed top-0 w-full z-50 transition-all duration-300 ease-in-out
                    bg-white/80 dark:bg-gray-900/80 backdrop-blur-md 
                    border-b border-blue-100/50 dark:border-blue-800/50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="relative h-10 transition-transform duration-300 group-hover:scale-105 flex items-center">
              <Image
                src={cpclogo}
                alt="CPC Logo"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { name: "Home", href: "/" },
              { name: "Events", href: "/events" },
              { name: "Verify Certificate", href: "/verify" },
              { name: "Contests", href: "/contests" },
              { name: "Prompt", href: "/prompt" },
              { name: "Datathon", href: "/datathon" },
            ].map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 
                          transition-all duration-300 relative group"
              >
                {item.name}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 
                               dark:from-blue-400 dark:to-purple-400 transition-all duration-300 group-hover:w-full"
                />
              </Link>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <div className="flex items-center space-x-4">
            <motion.button
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
              className="w-10 h-10 rounded-full flex items-center justify-center
                         bg-gray-100 dark:bg-gray-800 
                         hover:bg-blue-50 dark:hover:bg-blue-900/50
                         transition-all duration-300 ease-in-out
                         border border-blue-100/50 dark:border-blue-800/50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle theme"
            >
              <motion.div
                className="relative w-5 h-5"
                initial={false}
                animate={{ rotate: theme === "dark" ? 0 : 180 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {/* Sun/Moon Icon */}
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    theme === "dark" ? "opacity-0" : "opacity-100"
                  }`}
                >
                  {/* Sun Icon */}
                  <svg
                    className="w-5 h-5 text-amber-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <div
                  className={`absolute inset-0 transition-opacity duration-300 ${
                    theme === "dark" ? "opacity-100" : "opacity-0"
                  }`}
                >
                  {/* Moon Icon */}
                  <svg
                    className="w-5 h-5 text-blue-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                </div>
              </motion.div>
            </motion.button>

            {isLoggedIn ? (
              <div className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 py-1.5 px-3 rounded-full">
                {user.image ? (
                  <Image
                    src={user.image}
                    alt="User avatar"
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="font-medium text-gray-900 dark:text-white">
                  {user.name}
                </span>
              </div>
            ) : (
              <Link
                href="/signin"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-full hover:from-blue-700 hover:to-blue-800 transition shadow-lg hover:shadow-blue-500/25"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      {/* Hero Section */}
      <HeroSection />

      {/* Announcement Section */}
      <NoticeSection />

      {/* Wings Section */}
      <WingsSection />

      {/* Quick Access Section */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <QuickAccessCard
              title="Problem Set"
              icon="📝"
              description="Practice with our curated problems"
              link="/problems"
            />
            <QuickAccessCard
              title="Leaderboard"
              icon="🏆"
              description="See top performers"
              link="/leaderboard"
            />
            <QuickAccessCard
              title="Resources"
              icon="📚"
              description="Learning materials & guides"
              link="/resources"
            />
            <QuickAccessCard
              title="Blog"
              icon="✍️"
              description="Technical articles & editorials"
              link="/blog"
            />
          </div>
        </div>
      </section>

      {/* Upcoming Contests */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">
            Featured Contests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ContestCard
              title="ICPC Mock Contest"
              date="2024-04-15"
              time="14:00 UTC"
              duration="5 hours"
              platform="Codeforces"
              type="Team Contest"
            />
            <ContestCard
              title="Weekly Practice Contest"
              date="2024-04-18"
              time="16:00 UTC"
              duration="2.5 hours"
              platform="AtCoder"
              type="Individual"
            />
            <ContestCard
              title="Beginner's Contest"
              date="2024-04-20"
              time="13:00 UTC"
              duration="3 hours"
              platform="LeetCode"
              type="Individual"
            />
          </div>
        </div>
      </section>

      {/* Recent Achievements - Light Background */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Recent Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "ICPC Regional 2024",
                team: "Team Phoenix",
                rank: "2nd Runner Up",
                image:
                  "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&auto=format&fit=crop&q=60",
              },
              {
                title: "National Hackathon 2024",
                team: "Team Dragons",
                rank: "Champions",
                image:
                  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=60",
              },
              {
                title: "Google CodeJam 2024",
                team: "Team Titans",
                rank: "Top 100 Global",
                image:
                  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=800&auto=format&fit=crop&q=60",
              },
            ].map((achievement, index) => (
              <AchievementCard key={index} {...achievement} />
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts - Updated background and cards */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Design */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950">
          {/* Animated Background Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float" />
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000" />
            <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000" />
          </div>
          {/* Grid Pattern Overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Latest from Blog
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full" />
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Understanding Dynamic Programming",
                author: "Sarah Johnson",
                date: "Apr 10, 2024",
                readTime: "8 min read",
                preview:
                  "Master the art of dynamic programming with this comprehensive guide covering key concepts, patterns, and practical examples...",
                image:
                  "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&auto=format&fit=crop&q=60",
              },
              {
                title: "Graph Algorithms in Competitive Programming",
                author: "Michael Chen",
                date: "Apr 8, 2024",
                readTime: "12 min read",
                preview:
                  "Deep dive into essential graph algorithms including DFS, BFS, Dijkstra's, and their applications in competitive programming...",
                image:
                  "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=800&auto=format&fit=crop&q=60",
              },
              {
                title: "Mastering Binary Search",
                author: "Alex Kumar",
                date: "Apr 5, 2024",
                readTime: "6 min read",
                preview:
                  "Learn advanced binary search techniques and how to apply them to solve complex competitive programming problems...",
                image:
                  "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&auto=format&fit=crop&q=60",
              },
            ].map((post, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                           hover:-translate-y-1 overflow-hidden border border-white/20 hover:border-white/30 group"
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-300 transition-colors duration-300">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-2 text-gray-300 mb-4 text-sm">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className="text-gray-300 mb-4 line-clamp-2">
                    {post.preview}
                  </p>
                  <a
                    href="#"
                    className="inline-flex items-center text-indigo-300 hover:text-indigo-200 font-medium group/link"
                  >
                    Read more
                    <span className="ml-1 transform transition-transform group-hover/link:translate-x-1">
                      →
                    </span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <a
              href="/blog"
              className="inline-flex items-center px-6 py-3 rounded-full bg-white/10 backdrop-blur-lg 
                         border border-white/20 text-white font-medium hover:bg-white/15 hover:border-white/30
                         transition-all duration-300 hover:scale-105 group"
            >
              View All Posts
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer with more sections */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white">CPC</h3>
              <p className="text-gray-400">
                Nurturing competitive programming talent and fostering a
                community of problem solvers.
              </p>
              <div className="flex gap-4">
                <SocialIcon
                  href="https://github.com"
                  icon={<FaGithub size={20} />}
                />
                <SocialIcon
                  href="https://linkedin.com"
                  icon={<FaLinkedinIn size={20} />}
                />
                <SocialIcon
                  href="https://discord.com"
                  icon={<FaDiscord size={20} />}
                />
                <SocialIcon
                  href="mailto:contact@cpc.com"
                  icon={<FiMail size={20} />}
                />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/contests"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Contests
                  </a>
                </li>
                <li>
                  <a
                    href="/leaderboard"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Leaderboard
                  </a>
                </li>
                <li>
                  <a
                    href="/problems"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Problem Set
                  </a>
                </li>
                <li>
                  <a
                    href="/resources"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Resources
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/tutorials"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Tutorials
                  </a>
                </li>
                <li>
                  <a
                    href="/workshops"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Workshops
                  </a>
                </li>
                <li>
                  <a
                    href="/blog"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="/faq"
                    className="text-gray-300 hover:text-white dark:text-gray-400 dark:hover:text-white transition"
                  >
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Contact</h3>
              <ul className="space-y-2">
                <li className="text-gray-300 dark:text-gray-400">
                  Email: cpc@example.com
                </li>
                <li className="text-gray-300 dark:text-gray-400">
                  Location: Room 501, CS Building
                </li>
                <li>
                  <a href="/contact" className="text-gray-400 hover:text-white">
                    Contact Form
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Add Copyright Section */}
          <div className="border-t border-gray-800 pt-6 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} Competitive Programming Club. All
                rights reserved.
              </p>
              <div className="flex gap-6 text-sm">
                <a
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition"
                >
                  Privacy Policy
                </a>
                <a
                  href="/terms"
                  className="text-gray-400 hover:text-white transition"
                >
                  Terms of Service
                </a>
                <a
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition"
                >
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const SocialIcon = ({
  href,
  icon,
}: {
  href: string;
  icon: React.ReactNode;
}) => (
  <a
    href={href}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-500 dark:hover:bg-blue-500 hover:text-white transform hover:scale-110 transition-all duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);
