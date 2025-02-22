"use client";

import { useState } from "react";
import { FiBook, FiVideo, FiFileText, FiDownload } from "react-icons/fi";

interface Resource {
  id: string;
  title: string;
  description: string;
  type: "document" | "video" | "code" | "link";
  category: string;
  url: string;
  downloadCount: number;
}

export default function Resources() {
  const [activeCategory, setActiveCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Resources" },
    { id: "algorithms", name: "Algorithms" },
    { id: "dataStructures", name: "Data Structures" },
    { id: "cpp", name: "C++" },
    { id: "problemSolving", name: "Problem Solving" },
    { id: "competitiveProgramming", name: "Competitive Programming" },
  ];

  const [resources] = useState<Resource[]>([
    {
      id: "1",
      title: "Introduction to Algorithms",
      description:
        "Comprehensive guide to basic algorithms and their implementations",
      type: "document",
      category: "algorithms",
      url: "/resources/intro-to-algorithms.pdf",
      downloadCount: 156,
    },
    // Add more resources...
  ]);

  const getIconByType = (type: Resource["type"]) => {
    switch (type) {
      case "document":
        return FiFileText;
      case "video":
        return FiVideo;
      case "code":
        return FiBook;
      default:
        return FiFileText;
    }
  };

  const filteredResources = resources.filter(
    (resource) =>
      activeCategory === "all" || resource.category === activeCategory
  );

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Learning Resources
        </h1>
      </div>

      {/* Categories */}
      <div className="flex overflow-x-auto pb-4 mb-6 gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap
              ${
                activeCategory === category.id
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300"
              }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      {/* Resources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredResources.map((resource) => {
          const Icon = getIconByType(resource.type);
          return (
            <div
              key={resource.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <Icon className="w-6 h-6 text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {resource.title}
                  </h3>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {resource.description}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                    <FiDownload className="mr-1" />
                    {resource.downloadCount} downloads
                  </span>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center"
                  >
                    <FiDownload className="mr-2" />
                    Download
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
