import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Notice } from "@/types/notice";
import { noticeApi } from "@/lib/api/noticeApi";

const NoticeSection = () => {
  const [theme] = useState<"light" | "dark">("light");
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotices();
  }, []);

  const loadNotices = async () => {
    try {
      setLoading(true);
      setError(null);
      // Fetch latest notices, prioritizing pinned ones
      const response = await noticeApi.getNotices();
      // Take only the first 5 notices for the marquee
      setNotices(response.data.results.slice(0, 5));
    } catch (err) {
      console.error("Error loading notices:", err);
      setError(err instanceof Error ? err.message : "Failed to load notices");
      // Fallback to empty array if API fails
      setNotices([]);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'Announcements': '🏆',
      'Events': '📚',
      'Achievements': '🌟',
      'General': '📢'
    };
    return iconMap[category] || '📢';
  };

  const getCategoryColor = (category: string, theme: string) => {
    const colorMap: { [key: string]: { light: string; dark: string } } = {
      'Announcements': { light: 'text-blue-600', dark: 'text-blue-400' },
      'Events': { light: 'text-purple-600', dark: 'text-purple-400' },
      'Achievements': { light: 'text-yellow-600', dark: 'text-yellow-400' },
      'General': { light: 'text-green-600', dark: 'text-green-400' }
    };
    return colorMap[category]?.[theme as 'light' | 'dark'] || (theme === 'light' ? 'text-blue-600' : 'text-blue-400');
  };

  // Don't render if loading
  if (loading) {
    return null;
  }

  // Show fallback message if no notices
  if (notices.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`py-4 backdrop-blur-md border-y ${theme === "light"
          ? "bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-100"
          : "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/20"
          }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center">
            <div className="relative mr-4">
              <div
                className={`absolute inset-0 rounded-full ${theme === "light" ? "bg-blue-400/20" : "bg-blue-500/20"
                  } animate-ping`}
              />
              <div
                className={`relative rounded-full p-2 ${theme === "light"
                  ? "bg-gradient-to-r from-blue-400 to-purple-400"
                  : "bg-gradient-to-r from-blue-500 to-purple-500"
                  }`}
              >
                <span className="text-xl block text-white">📢</span>
              </div>
            </div>
            <div className="flex-1 text-center">
              <span
                className={`${theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
              >
                No announcements at the moment. Check back later!
              </span>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-4 backdrop-blur-md border-y ${theme === "light"
        ? "bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-100"
        : "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/20"
        }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Notice Icon with Pulse Effect */}
          <div className="relative mr-4">
            <div
              className={`absolute inset-0 rounded-full ${theme === "light" ? "bg-blue-400/20" : "bg-blue-500/20"
                } animate-ping`}
            />
            <div
              className={`relative rounded-full p-2 ${theme === "light"
                ? "bg-gradient-to-r from-blue-400 to-purple-400"
                : "bg-gradient-to-r from-blue-500 to-purple-500"
                }`}
            >
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-xl block text-white"
              >
                📢
              </motion.span>
            </div>
          </div>

          {/* Announcement Text with Marquee */}
          <div className="overflow-hidden flex-1 max-w-4xl">
            <div className="relative flex items-center h-12">
              <motion.div
                animate={{ x: [0, -1000] }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="whitespace-nowrap flex items-center gap-8 absolute"
              >
                {notices.map((notice, index) => (
                  <Link
                    key={notice.id}
                    href={`/notices/${notice.id}`}
                    className={`inline-flex items-center gap-2 hover:opacity-80 transition-opacity ${theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                  >
                    <span
                      className={`font-semibold ${getCategoryColor(notice.category, theme)}`}
                    >
                      {getCategoryIcon(notice.category)} {notice.is_pinned ? 'Pinned!' : 'New!'}
                    </span>
                    {notice.title}
                  </Link>
                ))}
                {/* Duplicate the notices for seamless loop */}
                {notices.map((notice, index) => (
                  <Link
                    key={`${notice.id}-duplicate`}
                    href={`/notices/${notice.id}`}
                    className={`inline-flex items-center gap-2 hover:opacity-80 transition-opacity ${theme === "light" ? "text-gray-700" : "text-gray-200"
                      }`}
                  >
                    <span
                      className={`font-semibold ${getCategoryColor(notice.category, theme)}`}
                    >
                      {getCategoryIcon(notice.category)} {notice.is_pinned ? 'Pinned!' : 'New!'}
                    </span>
                    {notice.title}
                  </Link>
                ))}
              </motion.div>
            </div>
          </div>

          {/* View All Button */}
          <Link href="/notices">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`ml-4 px-4 py-1.5 rounded-full text-white text-sm font-medium 
                      hidden md:flex items-center gap-2 cursor-pointer ${theme === "light"
                  ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                }`}
            >
              View All
              <span className="text-xs">→</span>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};

export default NoticeSection;
