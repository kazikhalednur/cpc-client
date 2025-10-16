"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "@/app/components/Navigation";
import { useAuth } from "@/lib/auth/AuthContext";
import {
    FiCalendar,
    FiClock,
    FiArrowLeft,
    FiShare2,
    FiHeart,
    FiBookmark,
    FiTwitter,
    FiFacebook,
    FiLinkedin
} from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { useGetBlogBySlugQuery } from "@/lib/api/blogApi";
import { useLikeBlogMutation, useBookmarkBlogMutation } from "@/lib/api/blogApi";

// Using API data via useGetBlogBySlugQuery

export default function BlogDetail() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState<number | null>(null);
    const [bookmarked, setBookmarked] = useState(false);
    const [bookmarksCount, setBookmarksCount] = useState<number | null>(null);
    const params = useParams();
    const slug = params?.slug as string;

    useEffect(() => {
        setMounted(true);
    }, []);
    const { isAuthenticated } = useAuth();
    const { data: post, isLoading, refetch } = useGetBlogBySlugQuery(slug, { refetchOnMountOrArgChange: true, refetchOnFocus: true, refetchOnReconnect: true });
    const [likeBlog] = useLikeBlogMutation();
    const [bookmarkBlog] = useBookmarkBlogMutation();

    useEffect(() => {
        if (post) {
            setLiked(!!post.isLiked);
            setLikesCount(post.likes);
            setBookmarked(!!post.isBookmarked);
            setBookmarksCount(post.bookmarks);
        }
    }, [post]);

    useEffect(() => {
        // When auth state changes, refetch to include/exclude auth-only fields
        refetch();
    }, [isAuthenticated, refetch]);

    if (!mounted) {
        return null;
    }

    if (isLoading || !post) {
        return (
            <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
                <Navigation />
                <div className="pt-20 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <p className={`text-lg ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>Loading...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={`min-h-screen ${theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navigation />

            <div className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                    {/* Back Button */}
                    <Link
                        href="/blogs"
                        className={`inline-flex items-center mb-8 text-sm font-medium transition-colors ${theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-gray-900"
                            }`}
                    >
                        <FiArrowLeft className="mr-2" />
                        Back to Blog
                    </Link>

                    {/* Article Header */}
                    <header className="mb-8">
                        {/* Category */}
                        <div className="mb-4">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${theme === "dark" ? "bg-indigo-600 text-white" : "bg-indigo-100 text-indigo-800"
                                }`}>
                                {post.category}
                            </span>
                        </div>

                        {/* Title */}
                        <h1 className={`text-3xl md:text-5xl font-bold mb-6 leading-tight ${theme === "dark" ? "text-white" : "text-gray-900"
                            }`}>
                            {post.title}
                        </h1>

                        {/* Meta */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6 sm:mb-8">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-3">
                                    <Image
                                        src={post.authorAvatar}
                                        alt={post.author}
                                        width={44}
                                        height={44}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <p className={`font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                            {post.author}
                                        </p>
                                        <p className={`text-sm ${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                                            {post.authorBio}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-sm">
                                <div className="flex items-center gap-2">
                                    <FiCalendar className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
                                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                        {new Date(post.publishedAt).toLocaleDateString()}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiClock className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
                                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                        {post.readTime}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FiEye className={theme === "dark" ? "text-gray-400" : "text-gray-500"} />
                                    <span className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
                                        {post.viewsCount ?? 0}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-4 mb-8">
                            <button
                                onClick={async () => {
                                    try {
                                        const res = await likeBlog({ slug }).unwrap();
                                        setLiked(res.liked);
                                        setLikesCount(res.likes);
                                    } catch (_e) {
                                        // ignore for now or show toast
                                    }
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${liked
                                    ? "bg-red-100 text-red-700"
                                    : theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <FiHeart className={liked ? "fill-current" : ""} />
                                {likesCount ?? post.likes}
                            </button>

                            <button
                                onClick={async () => {
                                    try {
                                        const res = await bookmarkBlog({ slug }).unwrap();
                                        setBookmarked(res.bookmarked);
                                        setBookmarksCount(res.bookmarks);
                                    } catch (_e) {
                                        // ignore for now or show toast
                                    }
                                }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${bookmarked
                                    ? "bg-blue-100 text-blue-700"
                                    : theme === "dark"
                                        ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <FiBookmark className={bookmarked ? "fill-current" : ""} />
                                {bookmarksCount ?? post.bookmarks}
                            </button>

                            <button
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === "dark"
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                    }`}
                            >
                                <FiShare2 />
                                Share
                            </button>
                        </div>

                        {/* Featured Image */}
                        <div className="w-full mb-6 sm:mb-8">
                            <Image
                                src={post.image}
                                alt={post.title}
                                priority
                                loading="eager"
                                sizes="100vw"
                                width={0}
                                height={0}
                                style={{ width: "100%", height: "auto" }}
                                className="rounded-lg"
                            />
                        </div>
                    </header>

                    {/* Article Content */}
                    <article className={`prose max-w-none prose-base sm:prose-lg ${theme === "dark" ? "prose-invert" : ""}`}>
                        <div
                            className={`${theme === "dark" ? "bg-gray-800 text-gray-300" : "bg-white text-gray-700"} rounded-lg shadow-lg p-4 sm:p-8`}
                            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
                        />
                    </article>

                    {/* Tags */}
                    <div className="mt-8 mb-8">
                        <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className={`px-3 py-1 rounded-full text-sm ${theme === "dark"
                                        ? "bg-gray-700 text-gray-300"
                                        : "bg-gray-100 text-gray-700"
                                        }`}
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Social Share */}
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6 mb-8`}>
                        <h3 className={`text-lg font-semibold mb-4 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Share this article
                        </h3>
                        <div className="flex gap-4">
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === "dark" ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-blue-600 text-white hover:bg-blue-700"
                                }`}>
                                <FiTwitter />
                                Twitter
                            </button>
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === "dark" ? "bg-blue-700 text-white hover:bg-blue-800" : "bg-blue-700 text-white hover:bg-blue-800"
                                }`}>
                                <FiFacebook />
                                Facebook
                            </button>
                            <button className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${theme === "dark" ? "bg-blue-800 text-white hover:bg-blue-900" : "bg-blue-800 text-white hover:bg-blue-900"
                                }`}>
                                <FiLinkedin />
                                LinkedIn
                            </button>
                        </div>
                    </div>

                    {/* Author Bio */}
                    <div className={`${theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-6`}>
                        <div className="flex items-start gap-4">
                            <Image
                                src={post.authorAvatar}
                                alt={post.author}
                                width={80}
                                height={80}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className={`text-xl font-semibold mb-2 ${theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    {post.author}
                                </h3>
                                <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-600"}`}>
                                    {post.authorBio || "No bio available"}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
