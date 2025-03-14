"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSave, FiX } from "react-icons/fi";
import { Contest } from "@/types/contest";
import toast from "react-hot-toast";

export default function NewContestPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<Partial<Contest>>({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    platform: "Codeforces",
    registrationDeadline: "",
    type: "Individual",
    difficulty: "Intermediate",
    rules: [],
    prizes: [],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/admin/contests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to create contest");

      toast.success("Contest created successfully!");
      router.push("/dashboard/contests");
    } catch (error) {
      console.error("Failed to create contest:", error);
      toast.error("Failed to create contest");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create New Contest
          </h1>
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 
                    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                    focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 
                    focus:border-indigo-500 dark:focus:border-indigo-400
                    placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  placeholder="Enter contest title"
                  required
                />
              </div>
              {/* Add more form fields */}
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg 
                text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800
                focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2
                focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Creating...</span>
                </>
              ) : (
                <>
                  <FiSave className="w-5 h-5" />
                  <span>Create Contest</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
