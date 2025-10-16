"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

import WingsSection from "./_views/WingsSection";
import NoticeSection from "./_views/NoticeSection";
import { Navigation } from "@/app/components/Navigation";
import FeaturedContests from "./_views/FeaturedContests";
import EventsSlider from "./_views/EventsSlider";
import HeroSection from "./_views/HeroSection";
import CommitteeSection from "./_views/CommitteeSection";
import RecentAchievements from "./_views/RecentAchievements";
import QuickAccessSection from "./_views/QuickAccessSection";
import LatestBlogs from "./_views/LatestBlogs";

export default function Home() {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

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

      <QuickAccessSection />

      {/* Wings Section */}
      <WingsSection />

      {/* Committee Section */}
      <CommitteeSection />

      {/* Events Slider */}
      <EventsSlider />

      {/* Featured Contests */}
      <FeaturedContests />

      <RecentAchievements />

      <LatestBlogs />


    </div>
  );
}
