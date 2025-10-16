"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useGetBlogsQuery } from "@/lib/api/blogApi";
type LatestBlogItem = {
    id: string;
    title: string;
    slug: string;
    author: string;
    date: string;
    readTime: string;
    excerpt: string;
    image: string;
};

const LatestBlogs = () => {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const { data: blogsData } = useGetBlogsQuery({ page: 1, page_size: 3 });

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="relative py-20 overflow-hidden">
            <div className={`absolute inset-0 ${mounted && theme === "dark" ? "bg-gradient-to-br from-gray-900 via-indigo-950 to-purple-950" : "bg-gradient-to-br from-gray-100 via-indigo-50 to-purple-50"}`}>
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-float" />
                    <div className="absolute top-1/2 right-0 w-96 h-96 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-2000" />
                    <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-float animation-delay-4000" />
                </div>
                <div className="absolute inset-0 bg-grid-pattern opacity-5" />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                    <h2 className={`text-3xl md:text-4xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        Latest from Blog
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 mx-auto rounded-full" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {(blogsData?.results || []).slice(0, 3).map((post: LatestBlogItem) => (
                        <div
                            key={post.id}
                            className={`${mounted && theme === "dark" ? "bg-white/10 backdrop-blur-lg" : "bg-white/80 backdrop-blur-lg"} rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 
                         hover:-translate-y-1 overflow-hidden ${mounted && theme === "dark" ? "border border-white/20 hover:border-white/30" : "border border-gray-200 hover:border-gray-300"} group`}
                        >
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
    );
};

export default LatestBlogs;


