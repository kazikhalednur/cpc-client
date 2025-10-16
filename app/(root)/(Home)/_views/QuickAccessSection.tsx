"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import QuickAccessCard from "./QuickAccessCard";

const QuickAccessSection = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className={`py-12 ${mounted && theme === "dark" ? "bg-gray-900" : "bg-white"}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Quick Access
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Access our most popular resources and features quickly
          </p>
        </div>
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
  );
};

export default QuickAccessSection;

