"use client";

import { useState } from "react";
import {
  FiX,
  FiImage,
  FiCalendar,
  FiClock,
  FiAward,
  FiTag,
  FiInfo,
} from "react-icons/fi";
import { Contest } from "@/app/types";
import { motion } from "framer-motion";

interface ContestFormProps {
  contest?: Contest | null;
  onClose: () => void;
  onSubmit: (data: Partial<Contest>) => void;
}

const FormSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <Icon className="w-5 h-5 text-indigo-500" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

export default function ContestForm({
  contest,
  onClose,
  onSubmit,
}: ContestFormProps) {
  const [formData, setFormData] = useState({
    title: contest?.title || "",
    description: contest?.description || "",
    date: contest?.date?.split("T")[0] || "",
    time: contest?.date?.split("T")[1]?.split(".")[0] || "",
    platform: contest?.platform || "",
    difficulty: contest?.difficulty || "Medium",
    prize: contest?.prize || "",
    image: contest?.image || "",
    status: contest?.status || "Upcoming",
    participants: contest?.participants || 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const combinedDate = new Date(
      `${formData.date}T${formData.time}`
    ).toISOString();
    onSubmit({
      ...formData,
      date: combinedDate,
    });
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
    bg-white dark:bg-gray-800 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
    dark:focus:border-indigo-400 dark:focus:ring-indigo-400 transition-all duration-200
    placeholder:text-gray-400 dark:placeholder:text-gray-500`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-50 dark:bg-gray-900 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {contest ? "Edit Contest" : "Create New Contest"}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Fill in the details for your programming contest
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 
                rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <FormSection title="Basic Information" icon={FiInfo}>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="e.g., Weekly Algorithm Challenge"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className={inputClasses}
                  placeholder="Describe the contest objectives and requirements..."
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Schedule" icon={FiCalendar}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Contest Details" icon={FiAward}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Platform
                </label>
                <input
                  type="text"
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="e.g., Codeforces, LeetCode"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Prize
                </label>
                <input
                  type="text"
                  value={formData.prize}
                  onChange={(e) =>
                    setFormData({ ...formData, prize: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="e.g., $500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Difficulty
                </label>
                <select
                  value={formData.difficulty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      difficulty: e.target.value as Contest["difficulty"],
                    })
                  }
                  className={inputClasses}
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      status: e.target.value as Contest["status"],
                    })
                  }
                  className={inputClasses}
                  required
                >
                  <option value="Upcoming">Upcoming</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </FormSection>

          <FormSection title="Contest Image" icon={FiImage}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className={inputClasses}
                placeholder="Enter image URL"
                required
              />
            </div>
          </FormSection>

          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 pt-6 pb-6 -mx-6 px-6 mt-8 border-t dark:border-gray-800">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 
                  rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 
                  dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-white bg-gradient-to-r from-indigo-500 to-purple-600 
                  rounded-lg hover:from-indigo-600 hover:to-purple-700 shadow-sm 
                  hover:shadow-indigo-500/25 transition-all duration-200"
              >
                {contest ? "Update Contest" : "Create Contest"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
