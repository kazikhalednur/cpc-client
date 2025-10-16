"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedinIn, FaDiscord } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { useGetBlogsQuery } from "@/lib/api/blogApi";
import { useGetAchievementsQuery } from "@/lib/api/achievementApi";

import cpclogo from "../../../assets/images/CPC-Logo.png";
import ContestCard from "./_views/ContestCard";
import QuickAccessCard from "./_views/QuickAccessCard";
import AchievementCard from "./_views/AchievementCard";
import WingsSection from "./_views/WingsSection";
import NoticeSection from "./_views/NoticeSection";
import { useSession } from "next-auth/react";
import { Navigation } from "@/app/components/Navigation";
import FeaturedContests from "./_views/FeaturedContests";
import EventsSlider from "./_views/EventsSlider";
import HeroSection from "./_views/HeroSection";
import CommitteeSection from "./_views/CommitteeSection";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { data: blogsData } = useGetBlogsQuery({ page: 1, page_size: 3 });
  const { data: achievementsData } = useGetAchievementsQuery({ page: 1, page_size: 3 });

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className={`min-h-screen ${mounted && theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
      <Navigation />
      {/* Hero Section */}
      <HeroSection />

      {/* Announcement Section */}
      <NoticeSection />

      {/* Quick Access Section */}
      <section className={`py-12 ${mounted && theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
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
              link="/blogs"
            />
          </div>
        </div>
      </section>

      {/* Wings Section */}
      <WingsSection />

      {/* Committee Section */}
      <CommitteeSection />

      {/* Events Slider */}
      <EventsSlider />

      {/* Featured Contests */}
      <FeaturedContests />

      {/* Recent Achievements - Light Background */}
      <section className={`py-16 ${mounted && theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
        <div className="container mx-auto px-4">
          <h2 className={`text-3xl font-bold mb-8 text-center ${mounted && theme === "dark" ? "text-white" : "text-gray-800"}`}>
            Recent Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(achievementsData?.results || []).slice(0, 3).map((a, index) => (
              <AchievementCard key={a.id || index} title={a.title} team={a.team} rank={a.rank} image={a.image} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/achievements"
              className={`inline-flex items-center px-6 py-3 rounded-full ${mounted && theme === "dark" ? "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/15 hover:border-white/30" : "bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 hover:bg-white hover:border-gray-300"} font-medium transition-all duration-300 hover:scale-105 group`}
            >
              View All Achievements
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Blog Posts - Updated background and cards */}
      <section className="relative py-20 overflow-hidden">
        {/* Background Design */}
        <div className={`absolute inset-0 ${mounted && theme === "dark" ? "bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950" : "bg-gradient-to-br from-gray-100 via-indigo-50 to-purple-50"}`}>
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
            <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
              Latest from Blog
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full" />
          </div>

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {(blogsData?.results || []).slice(0, 3).map((post) => (
              <div
                key={post.id}
                className={`${mounted && theme === "dark" ? "bg-white/10 backdrop-blur-lg" : "bg-white/80 backdrop-blur-lg"} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                           hover:-translate-y-1 overflow-hidden ${mounted && theme === "dark" ? "border border-white/20 hover:border-white/30" : "border border-gray-200 hover:border-gray-300"} group`}
              >
                {/* Image Container */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    unoptimized
                    suppressHydrationWarning
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-gray-900/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className={`text-xl font-bold mb-3 ${mounted && theme === "dark" ? "text-white group-hover:text-indigo-300" : "text-gray-900 group-hover:text-indigo-600"} transition-colors duration-300`}>
                    {post.title}
                  </h3>
                  <div className={`flex items-center gap-2 mb-4 text-sm ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <p className={`mb-4 line-clamp-2 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blogs/${post.slug}`}
                    className={`inline-flex items-center ${mounted && theme === "dark" ? "text-indigo-300 hover:text-indigo-200" : "text-indigo-600 hover:text-indigo-500"} font-medium group/link`}
                  >
                    Read more
                    <span className="ml-1 transform transition-transform group-hover/link:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* View All Button */}
          <div className="text-center mt-12">
            <Link
              href="/blogs"
              className={`inline-flex items-center px-6 py-3 rounded-full ${mounted && theme === "dark" ? "bg-white/10 backdrop-blur-lg border border-white/20 text-white hover:bg-white/15 hover:border-white/30" : "bg-white/80 backdrop-blur-lg border border-gray-200 text-gray-900 hover:bg-white hover:border-gray-300"} font-medium transition-all duration-300 hover:scale-105 group`}
            >
              View All Posts
              <span className="ml-2 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer with more sections */}

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
