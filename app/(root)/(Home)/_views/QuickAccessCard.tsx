import React from "react";
import { useTheme } from "next-themes";

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
  const { theme } = useTheme();
  return (
    <a
      href={link}
      className={`group p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
               hover:-translate-y-1 ${theme === "dark"
          ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
          : "bg-gradient-to-br from-white to-gray-50 border border-gray-100"}`}
    >
      <div
        className={`text-3xl mb-4 w-12 h-12 rounded-lg 
                    flex items-center justify-center group-hover:scale-110 transition-transform ${theme === "dark"
            ? "bg-blue-900/30 text-blue-400"
            : "bg-blue-50 text-blue-600"}`}
      >
        {icon}
      </div>
      <h3 className={`text-xl font-bold mb-2 ${theme === "dark" ? "text-white" : "text-gray-800"}`}>
        {title}
      </h3>
      <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>{description}</p>
    </a>
  );
};

export default QuickAccessCard;
