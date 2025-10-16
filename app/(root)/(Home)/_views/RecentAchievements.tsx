"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import AchievementCard from "./AchievementCard";
import { useGetAchievementsQuery } from "@/lib/api/achievementApi";

const RecentAchievements = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { data: achievementsData } = useGetAchievementsQuery({ page: 1, page_size: 3 });

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className={`py-16 ${mounted && theme === "dark" ? "bg-gray-800" : "bg-gray-50"}`}>
            <div className="container mx-auto px-4">
                <h2 className={`text-3xl font-bold mb-8 text-center ${mounted && theme === "dark" ? "text-white" : "text-gray-800"}`}>
                    Recent Achievements
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(achievementsData?.results || []).slice(0, 3).map((a: any, index: number) => (
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
    );
};

export default RecentAchievements;


