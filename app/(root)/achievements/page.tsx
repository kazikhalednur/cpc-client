"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Navigation } from "@/app/components/Navigation";
import { useGetAchievementsQuery } from "@/lib/api/achievementApi";

export default function AchievementsPage() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");
    const pageSize = 9;

    useEffect(() => setMounted(true), []);

    useEffect(() => {
        setPage(1);
    }, [search]);
    const { data: achData } = useGetAchievementsQuery({ page, page_size: pageSize, search: search || undefined });
    const totalPages = Math.max(1, Math.ceil((achData?.count || 0) / pageSize));
    const current = achData?.results || [];

    const go = (p: number) => {
        setPage(p);
        if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!mounted) return null;

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navigation />
            <div className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-6 sm:mb-10">
                        <h1 className={`text-4xl md:text-5xl font-bold mb-3 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>Achievements</h1>
                        <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Explore our club&apos;s milestones and recognitions</p>
                    </div>

                    {/* Search */}
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-4 sm:p-6 mb-6`}>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search achievements by title, team, or rank..."
                            className={`w-full rounded-lg border px-3 py-2 text-sm ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400" : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                        />
                        <div className={`mt-2 text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>{achData?.count ?? 0} results</div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {current.map((a) => (
                            <Link key={a.id} href={`/achievements/${a.id}`} className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow`}>
                                <div className="relative h-44 w-full">
                                    <Image src={a.image} alt={a.title} fill className="object-cover" unoptimized />
                                </div>
                                <div className="p-5">
                                    <h3 className={`text-lg font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>{a.title}</h3>
                                    <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>{a.team} • {a.rank}</p>
                                    <p className={`text-sm mt-1 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>{new Date(a.date).toLocaleDateString()}</p>
                                </div>
                            </Link>
                        ))}
                    </div>

                    {(!achData || current.length === 0) && (
                        <div className="text-center py-12">
                            <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>No achievements found.</p>
                        </div>
                    )}

                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-10">
                            <button onClick={() => go(page - 1)} disabled={page === 1} className={`px-3 py-2 rounded-lg text-sm ${page === 1 ? (theme === "dark" ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400") : (theme === "dark" ? "bg-gray-800 text-gray-200 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50")}`}>Previous</button>
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                                <button key={p} onClick={() => go(p)} className={`px-3 py-2 rounded-lg text-sm ${p === page ? "bg-indigo-600 text-white" : (theme === "dark" ? "bg-gray-800 text-gray-200 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50")}`}>{p}</button>
                            ))}
                            <button onClick={() => go(page + 1)} disabled={page === totalPages} className={`px-3 py-2 rounded-lg text-sm ${page === totalPages ? (theme === "dark" ? "bg-gray-800 text-gray-500" : "bg-gray-100 text-gray-400") : (theme === "dark" ? "bg-gray-800 text-gray-200 hover:bg-gray-700" : "bg-white text-gray-700 hover:bg-gray-50")}`}>Next</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
