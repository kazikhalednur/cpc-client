import React from "react";
// import { motion } from "framer-motion";
import Link from "next/link";
import { FiAward, FiCode, FiBook, FiBriefcase } from "react-icons/fi";

const WingsSection = () => {
  const wings = [
    {
      title: "ACM Task Force",
      description:
        "Where programmers become Gladiators. We organize workshops, classes, contests, and many more.",
      icon: FiAward,
      gradient: "from-blue-500 to-indigo-500",
      hoverGradient: "from-blue-600 to-indigo-600",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
      href: "/wings/acm",
    },
    {
      title: "Development",
      description:
        "The best way to get a project done faster is to start sooner. Start development today.",
      icon: FiCode,
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "from-purple-600 to-pink-600",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-500",
      href: "/wings/development",
    },
    {
      title: "Research & Journal",
      description:
        "Why do we do basic research? To learn about ourselves. Start learning about yourself today.",
      icon: FiBook,
      gradient: "from-emerald-500 to-teal-500",
      hoverGradient: "from-emerald-600 to-teal-600",
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
      href: "/wings/research",
    },
    {
      title: "Job Career & Industry Collaboration",
      description:
        "Worried about your career? Let's learn how to build a better and more skilled career.",
      icon: FiBriefcase,
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "from-orange-600 to-red-600",
      iconBg: "bg-orange-500/10",
      iconColor: "text-orange-500",
      href: "/wings/job",
    },
  ];
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Our Wings
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our specialized wings, each dedicated to nurturing different
            aspects of technology and career development.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wings.map((wing) => (
            <div
              key={wing.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl 
                         transition-all duration-300 hover:-translate-y-1 border border-gray-200 
                         dark:border-gray-700 flex flex-col"
            >
              <div className="flex items-center gap-4 mb-4">
                <div
                  className={`p-3 rounded-lg ${wing.iconBg} flex items-center justify-center`}
                >
                  <wing.icon className={`w-6 h-6 ${wing.iconColor}`} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {wing.title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 flex-grow">
                {wing.description}
              </p>
              <Link
                href={wing.href}
                className="mt-4 inline-flex items-center text-indigo-600 dark:text-indigo-400 
                           hover:text-indigo-700 dark:hover:text-indigo-300 font-medium"
              >
                Learn more
                <span className="ml-1 transform transition-transform group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WingsSection;
