"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";
import { useGetAchievementByIdQuery } from "@/lib/api/achievementApi";

export default function AchievementDetailPage() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const params = useParams();
    const id = params?.id as string;
    const { data: a, isLoading } = useGetAchievementByIdQuery(id);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;
    if (isLoading || !a) {
        return (
            <div className={`${theme === "dark" ? "bg-gray-900" : "bg-gray-50"} min-h-screen`}>
                <Navigation />
                <div className="pt-20 pb-16">
                    <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
                        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navigation />
            <div className="pt-20 pb-16">
                <div className="max-w-5xl mx-auto px-3 sm:px-6 lg:px-8">
                    <Link href="/achievements" className={`inline-flex items-center mb-6 text-sm ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"}`}>
                        ← Back to Achievements
                    </Link>

                    <h1 className={`text-3xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{a.title}</h1>
                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{a.team} • {a.rank} • {new Date(a.date).toLocaleDateString()}</p>

                    <div className="w-full my-6">
                        <Image src={a.image} alt={a.title} width={0} height={0} sizes="100vw" style={{ width: "100%", height: "auto" }} unoptimized className="rounded-lg" />
                    </div>

                    <article className={`prose max-w-none prose-base sm:prose-lg ${theme === "dark" ? "prose-invert" : ""}`}>
                        <div className={`${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"} rounded-lg shadow-lg p-4 sm:p-8`} dangerouslySetInnerHTML={{ __html: a.descriptionHtml || '' }} />
                    </article>
                </div>
            </div>
        </div>
    );
}
