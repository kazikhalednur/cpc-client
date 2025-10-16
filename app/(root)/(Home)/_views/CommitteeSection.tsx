"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useGetCommitteesQuery } from "@/lib/api/contestApi";

type CommitteeItem = {
    year: string;
    image: string;
    isCurrent?: boolean;
};

function CommitteeSlider({ items, label }: { items: CommitteeItem[]; label: string }) {
    const [index, setIndex] = useState(0);
    const current = items[index];

    useEffect(() => {
        if (!items.length) return;
        const duration = current?.isCurrent ? 10000 : 2000;
        const id = setTimeout(() => {
            setIndex((prev) => (prev + 1) % items.length);
        }, duration);
        return () => clearTimeout(id);
    }, [index, items, current]);

    const next = () => setIndex((prev) => (prev + 1) % items.length);
    const prev = () => setIndex((prev) => (prev - 1 + items.length) % items.length);

    return (
        <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
            {/* Year above image (centered, not overlay) */}
            <div className="px-4 pt-4 pb-3">
                <div className="w-full flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full shadow-lg bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-base font-semibold">
                        <span className="tracking-wide">{current?.year}</span>
                        {current?.isCurrent && (
                            <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">Running</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="relative w-full h-[40vh] md:h-[60vh] bg-white dark:bg-gray-900 p-2">
                {items.map((it, i) => (
                    <div
                        key={`${label}-${it.year}-${i}`}
                        className={`absolute inset-0 transition-opacity duration-500 ${i === index ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                    >
                        <Image src={it.image} alt={`${label} ${it.year}`} fill className="object-contain object-center" />
                    </div>
                ))}
                {/* Prev/Next buttons */}
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="absolute left-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/90 dark:bg-gray-900/80 hover:bg-white shadow flex items-center justify-center text-gray-800 dark:text-gray-100 pointer-events-auto"
                >
                    <FiChevronLeft className="h-6 w-6" />
                </button>
                <button
                    onClick={next}
                    aria-label="Next"
                    className="absolute right-3 top-1/2 -translate-y-1/2 z-30 h-10 w-10 rounded-full bg-white/90 dark:bg-gray-900/80 hover:bg-white shadow flex items-center justify-center text-gray-800 dark:text-gray-100 pointer-events-auto"
                >
                    <FiChevronRight className="h-6 w-6" />
                </button>
            </div>
            <div className="p-6">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">{label}</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {label === "Advisory Panel"
                        ? "Distinguished faculty members guiding the club's mission, strategy, and activities."
                        : "Dedicated student leaders organizing events, initiatives, and community activities."}
                </p>
                <Link
                    href={label === "Advisory Panel" ? "/committee/advisory" : "/committee/student"}
                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                >
                    View {label}
                </Link>
            </div>
        </div>
    );
}

export default function CommitteeSection() {
    const { data: committees = [] } = useGetCommitteesQuery();

    const advisoryItems: CommitteeItem[] = useMemo(() => {
        return committees
            .map(committee => {
                const advisorPanel = committee.panels.find(panel => panel.type === "ADVISOR");
                return advisorPanel ? {
                    year: committee.year,
                    image: advisorPanel.image,
                    isCurrent: committee.year === new Date().getFullYear().toString()
                } : null;
            })
            .filter(Boolean) as CommitteeItem[];
    }, [committees]);

    const studentItems: CommitteeItem[] = useMemo(() => {
        return committees
            .map(committee => {
                const studentPanel = committee.panels.find(panel => panel.type === "STUDENT");
                return studentPanel ? {
                    year: committee.year,
                    image: studentPanel.image,
                    isCurrent: committee.year === new Date().getFullYear().toString()
                } : null;
            })
            .filter(Boolean) as CommitteeItem[];
    }, [committees]);

    return (
        <section className="py-16 bg-white dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">Committee</h2>
                    <p className="mt-3 text-gray-600 dark:text-gray-400">Meet our Advisory Panel and Student Panel</p>
                </div>

                <div className="grid grid-cols-1 gap-8 mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5 }}
                    >
                        <CommitteeSlider items={advisoryItems} label="Advisory Panel" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <CommitteeSlider items={studentItems} label="Student Panel" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}


