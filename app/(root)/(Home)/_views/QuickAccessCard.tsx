import React from "react";

const QuickAccessCard = ({
  title,
  icon,
  description,
  link,
}: {
  title: string;
  icon: string;
  description: string;
  link: string;
}) => {
  return (
    <a
      href={link}
      className="group bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
               p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
               hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
      <div
        className="text-3xl mb-4 bg-blue-50 dark:bg-blue-900/30 w-12 h-12 rounded-lg 
                    flex items-center justify-center text-blue-600 dark:text-blue-400 
                    group-hover:scale-110 transition-transform"
      >
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </a>
  );
};

export default QuickAccessCard;
