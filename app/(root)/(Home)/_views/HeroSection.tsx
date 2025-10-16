import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import {
  FiAward,
  FiUsers,
  FiCode,
  FiArrowRight,
  FiMousePointer,
} from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useTheme } from "next-themes";

export default function HeroSection() {
  const { data: session } = useSession();
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Create motion values for counting animations
  const contestsCount = useMotionValue(0);
  const participantsCount = useMotionValue(0);
  const winnersCount = useMotionValue(0);

  // Transform motion values to rounded integers
  const contests = useTransform(contestsCount, (latest) => Math.round(latest));
  const participants = useTransform(participantsCount, (latest) =>
    Math.round(latest)
  );
  const winners = useTransform(winnersCount, (latest) => Math.round(latest));

  useEffect(() => {
    // Animate the counts when component mounts
    animate(contestsCount, 50, { duration: 2, ease: "easeOut" });
    animate(participantsCount, 1000, { duration: 2, ease: "easeOut" });
    animate(winnersCount, 100, { duration: 2, ease: "easeOut" });
  }, []);

  return (
    <div className={`relative h-screen overflow-hidden ${mounted && theme === "dark" ? "bg-[#0A0A0A]" : "bg-gradient-to-br from-gray-50 to-gray-100"}`}>
      {/* Background Gradient */}
      <div className={`absolute inset-0 ${mounted && theme === "dark" ? "bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-[#1A1A1A] via-[#0A0A0A] to-[#0A0A0A]" : "bg-gradient-to-br from-gray-50 via-white to-gray-100"}`} />

      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] bg-purple-500/10 rounded-full blur-3xl animate-blob opacity-70" />
          <div className="absolute top-1/3 right-1/4 w-[35rem] h-[35rem] bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000 opacity-70" />
          <div className="absolute bottom-1/4 left-1/3 w-[25rem] h-[25rem] bg-indigo-500/10 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-70" />
        </div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            {/* Left Column */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-2xl"
              >
                <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                  Elevate Your{" "}
                  <span className="relative">
                    <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400">
                      Coding Journey
                    </span>
                    <span className="absolute inset-x-0 bottom-0 h-3 bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 opacity-30 blur-lg" />
                  </span>
                </h1>
                <p className={`text-lg sm:text-xl mb-6 sm:mb-8 leading-relaxed ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                  Join our elite community of programmers. Compete in
                  challenging contests, solve complex problems, and rise through
                  the ranks.
                </p>
                <div className="flex flex-wrap gap-4 mb-8 sm:mb-12">
                  {session ? (
                    <Link
                      href="/dashboard"
                      className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center font-medium text-sm sm:text-base"
                    >
                      Go to Dashboard
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  ) : (
                    <Link
                      href="/auth/signin"
                      className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white rounded-2xl hover:opacity-90 transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center font-medium text-sm sm:text-base"
                    >
                      Start Competing
                      <FiArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  )}
                  <Link
                    href="/wings"
                    className={`px-6 sm:px-8 py-3 sm:py-4 rounded-2xl transition-all duration-300 text-sm sm:text-base inline-block ${mounted && theme === "dark" ? "bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10" : "bg-gray-100 border border-gray-200 text-gray-700 hover:bg-gray-200"}`}
                  >
                    Learn More
                  </Link>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6">
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`${mounted && theme === "dark" ? "bg-white/5 backdrop-blur-sm border border-white/10" : "bg-white/80 backdrop-blur-sm border border-gray-200"} p-4 sm:p-6 rounded-2xl sm:rounded-3xl`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <FiCode className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400" />
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        <motion.span>{contests}</motion.span>+
                      </h3>
                    </div>
                    <p className={`text-sm sm:text-base ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Active Contests
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`${mounted && theme === "dark" ? "bg-white/5 backdrop-blur-sm border border-white/10" : "bg-white/80 backdrop-blur-sm border border-gray-200"} p-4 sm:p-6 rounded-2xl sm:rounded-3xl`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-purple-500/10 border border-purple-500/20">
                        <FiUsers className="w-4 h-4 sm:w-6 sm:h-6 text-purple-400" />
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        <motion.span>{participants}</motion.span>+
                      </h3>
                    </div>
                    <p className={`text-sm sm:text-base ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Participants
                    </p>
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -5 }}
                    className={`${mounted && theme === "dark" ? "bg-white/5 backdrop-blur-sm border border-white/10" : "bg-white/80 backdrop-blur-sm border border-gray-200"} p-4 sm:p-6 rounded-2xl sm:rounded-3xl`}
                  >
                    <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
                      <div className="p-1.5 sm:p-2 rounded-lg sm:rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                        <FiAward className="w-4 h-4 sm:w-6 sm:h-6 text-indigo-400" />
                      </div>
                      <h3 className={`text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                        <motion.span>{winners}</motion.span>+
                      </h3>
                    </div>
                    <p className={`text-sm sm:text-base ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                      Winners
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative aspect-[4/3] w-[90%] ml-auto">
                {/* Decorative Elements */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-transparent rounded-[2.5rem] blur-2xl" />

                {/* Main Image Container */}
                <div className="relative z-10 w-full h-full rounded-[2.5rem] overflow-hidden border border-white/10 backdrop-blur-sm group">
                  <Image
                    src="https://images.unsplash.com/photo-1627398242454-45a1465c2479?q=80&w=2000&auto=format&fit=crop"
                    alt="Programming Contest"
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                    priority
                    suppressHydrationWarning
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>

                {/* Decorative Circles */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-indigo-500/10 rounded-full blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl" />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className={`absolute bottom-0 left-0 right-0 h-32 ${mounted && theme === "dark" ? "bg-gradient-to-t from-[#0A0A0A] to-transparent" : "bg-gradient-to-t from-gray-50 to-transparent"}`} />

      {/* Decorative Mouse Icon */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <div className="relative">
          {/* Mouse Container */}
          <div className={`w-5 h-8 sm:w-6 sm:h-10 rounded-full flex items-start justify-center p-1 sm:p-1.5 ${mounted && theme === "dark" ? "border border-white/20" : "border border-gray-300"}`}>
            {/* Mouse Wheel */}
            <div className={`w-0.5 h-0.5 sm:w-1 sm:h-1 rounded-full ${mounted && theme === "dark" ? "bg-white/40" : "bg-gray-400"}`} />
          </div>

          {/* Animated Mouse Pointer */}
          <motion.div
            className="absolute -bottom-2 sm:-bottom-3 left-1/2 -translate-x-1/2"
            animate={{
              y: [0, 4, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FiMousePointer className={`w-2.5 h-2.5 sm:w-3 sm:h-3 ${mounted && theme === "dark" ? "text-white/40" : "text-gray-400"}`} />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}