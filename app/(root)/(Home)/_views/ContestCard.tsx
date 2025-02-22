import React from "react";

const ContestCard = ({
  title,
  date,
  time,
  duration,
  platform,
  type,
}: {
  title: string;
  date: string;
  time: string;
  duration: string;
  platform: string;
  type: string;
}) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                  p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                  hover:-translate-y-1 border border-gray-100 dark:border-gray-700"
    >
      <div className="flex items-center gap-3 mb-4">
        <div
          className="bg-blue-50 dark:bg-blue-900/30 w-10 h-10 rounded-lg 
                      flex items-center justify-center text-blue-600 dark:text-blue-400"
        >
          🏆
        </div>
        <h3 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h3>
      </div>
      <div className="space-y-3 text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
          <span className="w-5">📅</span> {date}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5">⏰</span> {time}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5">⌛</span> {duration}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5">🖥️</span> {platform}
        </div>
        <div className="flex items-center gap-2">
          <span className="w-5">👥</span> {type}
        </div>
      </div>
      <button
        className="mt-6 w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white 
                       py-3 rounded-full hover:from-blue-700 hover:to-blue-800 
                       transition-all hover:scale-105 font-medium shadow-lg 
                       hover:shadow-blue-500/25"
      >
        Register Now
      </button>
    </div>
  );
};

export default ContestCard;
