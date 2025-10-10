import Image from "next/image";
import React from "react";

const AchievementCard = ({
  title,
  team,
  rank,
  image,
}: {
  title: string;
  team: string;
  rank: string;
  image: string;
}) => {
  return (
    <div
      className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 
                  hover:-translate-y-1 overflow-hidden border border-gray-100 dark:border-gray-700"
    >
      <div className="relative h-48 w-full group">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          suppressHydrationWarning
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
          {title}
        </h3>
        <div className="space-y-2">
          <p className="text-blue-600 dark:text-blue-400 font-medium">{team}</p>
          <p className="text-emerald-600 dark:text-emerald-400 font-semibold">
            {rank}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AchievementCard;
