import React, { useState } from "react";
import { motion } from "framer-motion";

const NoticeSection = () => {
  const [theme] = useState<"light" | "dark">("light");
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`py-4 backdrop-blur-md border-y ${
        theme === "light"
          ? "bg-gradient-to-r from-blue-50/80 to-purple-50/80 border-blue-100"
          : "bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-800/20"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* Notice Icon with Pulse Effect */}
          <div className="relative mr-4">
            <div
              className={`absolute inset-0 rounded-full ${
                theme === "light" ? "bg-blue-400/20" : "bg-blue-500/20"
              } animate-ping`}
            />
            <div
              className={`relative rounded-full p-2 ${
                theme === "light"
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
                <span
                  className={`inline-flex items-center gap-2 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      theme === "light" ? "text-blue-600" : "text-blue-400"
                    }`}
                  >
                    🏆 New!
                  </span>
                  ICPC Regional Contest 2024 Registration Open
                </span>
                <span
                  className={`inline-flex items-center gap-2 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      theme === "light" ? "text-purple-600" : "text-purple-400"
                    }`}
                  >
                    📚 New!
                  </span>
                  Advanced Algorithm Workshop Series
                </span>
                <span
                  className={`inline-flex items-center gap-2 ${
                    theme === "light" ? "text-gray-700" : "text-gray-200"
                  }`}
                >
                  <span
                    className={`font-semibold ${
                      theme === "light" ? "text-blue-600" : "text-blue-400"
                    }`}
                  >
                    🌟 Achievement!
                  </span>
                  Congratulations to Team Phoenix - ICPC Regional Finalists
                </span>
              </motion.div>
            </div>
          </div>

          {/* View All Button */}
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/notices"
            className={`ml-4 px-4 py-1.5 rounded-full text-white text-sm font-medium 
                    hidden md:flex items-center gap-2 ${
                      theme === "light"
                        ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                        : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    }`}
          >
            View All
            <span className="text-xs">→</span>
          </motion.a>
        </div>
      </div>
    </motion.section>
  );
};

export default NoticeSection;
