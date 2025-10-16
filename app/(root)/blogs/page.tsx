"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";
import { FiCalendar, FiUser, FiClock, FiArrowRight, FiSearch } from "react-icons/fi";
import { useGetBlogCategoriesQuery, useGetBlogsQuery } from "@/lib/api/blogApi";


export default function BlogList() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const { data: apiCategories } = useGetBlogCategoriesQuery();
    const { data: blogsData, isLoading: isBlogsLoading } = useGetBlogsQuery({
        page: currentPage,
        page_size: 6,
        category: selectedCategory !== 'All' ? (apiCategories?.find(c => c.title === selectedCategory)?.slug || undefined) : undefined,
        author: searchQuery || undefined,
    });

    const postsPerPage = 6;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        // When filters change, reset to first page
        setCurrentPage(1);
    }, [searchQuery, selectedCategory]);

    // Calculate pagination
    const totalPages = Math.max(1, Math.ceil((blogsData?.count || 0) / postsPerPage));
    const startIndex = (currentPage - 1) * postsPerPage;
    const endIndex = startIndex + postsPerPage;
    const currentPosts = (blogsData?.results || []);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (!mounted) {
        return null;
    }

    const AuthorAvatar = ({ src, alt, size = 20 }: { src?: string; alt: string; size?: number }) => {
        const [error, setError] = useState(false);
        if (!src || error) {
            return (
                <div
                    className={`rounded-full flex items-center justify-center ${theme === "dark" ? "bg-gray-700 text-gray-300" : "bg-gray-200 text-gray-600"}`}
                    style={{ width: size, height: size }}
                    aria-label={alt}
                >
                    <FiUser size={Math.max(12, Math.floor(size * 0.7))} />
                </div>
            );
        }
        return (
            <Image
                src={src}
                alt={alt}
                width={size}
                height={size}
                className="rounded-full"
                onError={() => setError(true)}
            />
        );
    };

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navigation />

            <div className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Blog
                        </h1>
                        <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Insights, tutorials, and stories from the programming community
                        </p>
                    </div>

                    {/* Search and Filters */}
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6 mb-8`}>
                        <div className="flex flex-col md:flex-row gap-4">
                            {/* Search */}
                            <div className="flex-1 relative">
                                <FiSearch className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`} />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className={`w-full pl-10 pr-4 py-2 rounded-lg border ${theme === "dark"
                                        ? "bg-gray-700 border-gray-600 text-white placeholder-gray-400"
                                        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500"
                                        } focus:ring-2 focus:ring-indigo-500 focus:border-transparent`}
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="w-full md:w-64">
                                <label htmlFor="category" className="sr-only">Category</label>
                                <select
                                    id="category"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className={`w-full rounded-lg border px-3 py-2 text-sm ${theme === "dark" ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"} focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                                >
                                    <option value="All">All</option>
                                    {(apiCategories || []).map((c) => (
                                        <option key={c.slug} value={c.title}>{c.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mb-6">
                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Showing {blogsData && blogsData.results.length > 0 ? startIndex + 1 : 0}-{Math.min(endIndex, blogsData?.count || 0)} of {blogsData?.count || 0} articles
                        </p>
                    </div>

                    {/* Blog Posts Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
                        {currentPosts.map((post) => (
                            <article
                                key={post.id}
                                className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group`}
                            >
                                {/* Image */}
                                <div className="relative h-44 sm:h-48 w-full overflow-hidden">
                                    <Image
                                        src={post.image}
                                        alt={post.title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${theme === "dark" ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-800"
                                            }`}>
                                            {post.category}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4 sm:p-6">
                                    {/* Meta */}
                                    <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm mb-3">
                                        <div className="flex items-center gap-2">
                                            <Image
                                                src={post.authorAvatar}
                                                alt={post.author}
                                                width={20}
                                                height={20}
                                                className="rounded-full"
                                            />
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                                {post.author}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiCalendar className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                                {new Date(post.date).toLocaleDateString()}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <FiClock className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
                                            <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                                {post.readTime}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <h2 className={`text-lg sm:text-xl font-bold mb-3 group-hover:text-indigo-600 transition-colors ${theme === "dark" ? "text-white" : "text-gray-900"
                                        }`}>
                                        <Link href={`/blogs/${post.slug}`}>
                                            {post.title}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    <p className={`text-sm mb-4 line-clamp-3 ${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                        {post.excerpt}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {post.tags.slice(0, 3).map((tag) => (
                                            <span
                                                key={tag}
                                                className={`px-2 py-1 rounded text-xs ${theme === "dark"
                                                    ? "bg-gray-700 text-gray-300"
                                                    : "bg-gray-100 text-gray-600"
                                                    }`}
                                            >
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Read More */}
                                    <Link
                                        href={`/blogs/${post.slug}`}
                                        className={`inline-flex items-center text-sm font-medium group-hover:text-indigo-600 transition-colors ${theme === "dark" ? "text-indigo-400" : "text-indigo-600"
                                            }`}
                                    >
                                        Read more
                                        <FiArrowRight className="ml-1 group-hover:translate-x-1 transition-transform" />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* No Results */}
                    {currentPosts.length === 0 && (
                        <div className="text-center py-12">
                            <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                No articles found matching your criteria.
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            <button
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === 1
                                    ? theme === "dark" ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Previous
                            </button>

                            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                                <button
                                    key={page}
                                    onClick={() => handlePageChange(page)}
                                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === page
                                        ? "bg-indigo-600 text-white"
                                        : theme === "dark"
                                            ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                            : "bg-white text-gray-700 hover:bg-gray-50"
                                        }`}
                                >
                                    {page}
                                </button>
                            ))}

                            <button
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${currentPage === totalPages
                                    ? theme === "dark" ? "bg-gray-700 text-gray-500 cursor-not-allowed" : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    : theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-white text-gray-700 hover:bg-gray-50"
                                    }`}
                            >
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
