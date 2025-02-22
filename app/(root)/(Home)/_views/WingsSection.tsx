import React from "react";
import { motion } from "framer-motion";

const WingsSection = () => {
  const wings = [
    {
      title: "ACM Task Force",
      description:
        "Where programmers become Gladiators. We organize workshops, classes, contests, and many more.",
      icon: "🏆",
      gradient: "from-blue-500 to-indigo-500",
      hoverGradient: "from-blue-600 to-indigo-600",
      iconBg: "bg-blue-500/10",
    },
    {
      title: "Development",
      description:
        "The best way to get a project done faster is to start sooner. Start development today.",
      icon: "💻",
      gradient: "from-purple-500 to-pink-500",
      hoverGradient: "from-purple-600 to-pink-600",
      iconBg: "bg-purple-500/10",
    },
    {
      title: "Research & Journal",
      description:
        "Why do we do basic research? To learn about ourselves. Start learning about yourself today.",
      icon: "📚",
      gradient: "from-emerald-500 to-teal-500",
      hoverGradient: "from-emerald-600 to-teal-600",
      iconBg: "bg-emerald-500/10",
    },
    {
      title: "Job Career & Industry Collaboration",
      description:
        "Worried about your career? Let's learn how to build a better and more skilled career.",
      icon: "🌟",
      gradient: "from-orange-500 to-red-500",
      hoverGradient: "from-orange-600 to-red-600",
      iconBg: "bg-orange-500/10",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {wings.map((wing, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group h-[340px] relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg 
                       hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-700 
                       flex flex-col"
              whileHover={{
                y: -5,
                transition: { duration: 0.2 },
              }}
            >
              {/* Gradient Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${wing.gradient} opacity-0 
                          group-hover:opacity-10 transition-opacity duration-300`}
              />

              <div className="p-6 flex-1">
                {/* Icon with Animation */}
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className={`${wing.iconBg} w-12 h-12 rounded-lg flex items-center justify-center 
                            text-2xl mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {wing.icon}
                </motion.div>

                {/* Title with Gradient Animation */}
                <h3
                  className="text-xl font-bold text-gray-900 dark:text-white mb-3 
                           group-hover:text-transparent group-hover:bg-clip-text 
                           group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-indigo-500
                           transition-all duration-300"
                >
                  {wing.title}
                </h3>

                {/* Description with reduced bottom margin */}
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {wing.description}
                </p>
              </div>

              {/* Button Container with adjusted padding */}
              <div className="px-6 pb-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full px-4 py-2.5 rounded-lg bg-gradient-to-r ${wing.gradient} 
                           hover:${wing.hoverGradient} text-white font-medium
                           transition-all duration-300 transform
                           flex items-center justify-center gap-2 group/btn`}
                >
                  <span>See More</span>
                  <motion.span
                    className="transform transition-transform duration-300"
                    animate={{ x: 0 }}
                    whileHover={{ x: 3 }}
                  >
                    →
                  </motion.span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WingsSection;
