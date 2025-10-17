"use client";

import { useState } from "react";
import {
  FiX,
  FiImage,
  FiCalendar,
  FiAward,
  FiInfo,
} from "react-icons/fi";
import { Contest } from "@/app/types";
import { motion } from "framer-motion";

interface ContestFormProps {
  onClose: () => void;
  onSubmit: (data: Partial<Contest>) => Promise<void>;
  initialData?: Contest;
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
  onClose,
  onSubmit,
  initialData,
}: ContestFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    startDate: initialData?.startTime
      ? new Date(initialData.startTime).toISOString().split("T")[0]
      : "",
    startTime: initialData?.startTime
      ? new Date(initialData.startTime).toTimeString().split(" ")[0].slice(0, 5)
      : "",
    endDate: initialData?.endTime
      ? new Date(initialData.endTime).toISOString().split("T")[0]
      : "",
    endTime: initialData?.endTime
      ? new Date(initialData.endTime).toTimeString().split(" ")[0].slice(0, 5)
      : "",
    platform: initialData?.platform || "",
    difficulty: initialData?.difficulty || "EASY",
    prize: initialData?.prize || "",
    image: initialData?.image || "",
    status: initialData?.status || "UPCOMING",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title) newErrors.title = "Title is required";
    if (!formData.description)
      newErrors.description = "Description is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";
    if (!formData.platform) newErrors.platform = "Platform is required";
    if (!formData.prize) newErrors.prize = "Prize is required";

    const startDateTime = new Date(
      `${formData.startDate}T${formData.startTime}`
    );
    const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

    if (endDateTime <= startDateTime) {
      newErrors.endDate = "End date must be after start date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      setLoading(true);
      const startDateTime = new Date(
        `${formData.startDate}T${formData.startTime}`
      );
      const endDateTime = new Date(`${formData.endDate}T${formData.endTime}`);

      await onSubmit({
        ...formData,
        startTime: startDateTime.toISOString(),
        endTime: endDateTime.toISOString(),
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setLoading(false);
    }
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
                {initialData ? "Edit Contest" : "Create New Contest"}
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
                  className={`${inputClasses} ${errors.title ? "border-red-500" : ""
                    }`}
                  placeholder="e.g., Weekly Algorithm Challenge"
                  required
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-500">{errors.title}</p>
                )}
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
                  className={`${inputClasses} ${errors.description ? "border-red-500" : ""
                    }`}
                  placeholder="Describe the contest objectives and requirements..."
                  required
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.description}
                  </p>
                )}
              </div>
            </div>
          </FormSection>

          <FormSection title="Schedule" icon={FiCalendar}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Start Date
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className={`${inputClasses} ${errors.startDate ? "border-red-500" : ""
                    }`}
                  required
                />
                {errors.startDate && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.startDate}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Start Time
                </label>
                <input
                  type="time"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                  className={`${inputClasses} ${errors.startTime ? "border-red-500" : ""
                    }`}
                  required
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.startTime}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  End Date
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className={`${inputClasses} ${errors.endDate ? "border-red-500" : ""
                    }`}
                  required
                />
                {errors.endDate && (
                  <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  End Time
                </label>
                <input
                  type="time"
                  value={formData.endTime}
                  onChange={(e) =>
                    setFormData({ ...formData, endTime: e.target.value })
                  }
                  className={`${inputClasses} ${errors.endTime ? "border-red-500" : ""
                    }`}
                  required
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-500">{errors.endTime}</p>
                )}
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
                  className={`${inputClasses} ${errors.platform ? "border-red-500" : ""
                    }`}
                  placeholder="e.g., Codeforces, LeetCode"
                  required
                />
                {errors.platform && (
                  <p className="mt-1 text-sm text-red-500">{errors.platform}</p>
                )}
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
                  className={`${inputClasses} ${errors.prize ? "border-red-500" : ""
                    }`}
                  placeholder="e.g., $500"
                  required
                />
                {errors.prize && (
                  <p className="mt-1 text-sm text-red-500">{errors.prize}</p>
                )}
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
                  className={`${inputClasses} ${errors.difficulty ? "border-red-500" : ""
                    }`}
                  required
                >
                  <option value="EASY">Easy</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HARD">Hard</option>
                </select>
                {errors.difficulty && (
                  <p className="mt-1 text-sm text-red-500">
                    {errors.difficulty}
                  </p>
                )}
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
                  className={`${inputClasses} ${errors.status ? "border-red-500" : ""
                    }`}
                  required
                >
                  <option value="UPCOMING">Upcoming</option>
                  <option value="ONGOING">Ongoing</option>
                  <option value="COMPLETED">Completed</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-500">{errors.status}</p>
                )}
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
                className={`${inputClasses} ${errors.image ? "border-red-500" : ""
                  }`}
                placeholder="Enter image URL"
                required
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
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
                disabled={loading}
                className="px-5 py-2.5 text-white bg-gradient-to-r from-indigo-500 to-purple-600 
                  rounded-lg hover:from-indigo-600 hover:to-purple-700 shadow-sm 
                  hover:shadow-indigo-500/25 transition-all duration-200 disabled:opacity-50"
              >
                {loading ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
