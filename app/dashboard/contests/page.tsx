"use client";

import { useState, useEffect } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiClock,
  FiAward,
  FiSearch,
  FiUsers,
} from "react-icons/fi";
import ContestForm from "./_components/ContestForm";
import { Contest } from "@/app/types";
import { motion } from "framer-motion";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import toast from "react-hot-toast";

type ContestStatus = "Upcoming" | "Ongoing" | "Completed";

export default function ContestDashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingContest, setEditingContest] = useState<Contest | undefined>(
    undefined
  );
  const [contests, setContests] = useState<Contest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ContestStatus | "ALL">("ALL");

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const res = await fetch("/api/admin/contests");
        if (!res.ok) throw new Error("Failed to fetch contests");
        const data = await res.json();
        setContests(data);
      } catch (error) {
        console.error("Error fetching contests:", error);
        toast.error("Failed to load contests");
      } finally {
        setIsLoading(false);
      }
    };

    fetchContests();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contest?")) {
      try {
        await fetch(`/api/contests/${id}`, { method: "DELETE" });
        setContests(contests.filter((contest) => contest.id !== id));
      } catch (error) {
        console.error("Error deleting contest:", error);
      }
    }
  };

  const handleSubmit = async (data: Partial<Contest>) => {
    try {
      const res = await fetch("/api/admin/contests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(responseData.message || "Failed to create contest");
        return;
      }

      setContests([...contests, responseData.data]);
      setIsFormOpen(false);
      toast.success("Contest created successfully!");
    } catch (error) {
      console.error("Error creating contest:", error);
      toast.error("Failed to create contest. Please try again.");
    }
  };

  const filteredContests = contests.filter((contest) => {
    const matchesSearch =
      contest.title.toLowerCase().includes(search.toLowerCase()) ||
      contest.description.toLowerCase().includes(search.toLowerCase()) ||
      contest.platform.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      status === "ALL" || contest.status.toUpperCase() === status.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Contests
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and organize programming contests
          </p>
        </div>
        <button
          onClick={() => {
            setEditingContest(undefined);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
            text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 
            shadow-sm hover:shadow-indigo-500/25"
        >
          <FiPlus className="w-5 h-5" />
          Add New Contest
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid md:flex gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contests..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as ContestStatus | "ALL")}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
            dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option value="ALL">All Status</option>
          <option value="Upcoming">Upcoming</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : filteredContests.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No contests found</p>
          <p>Start by creating your first contest!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((contest) => (
            <motion.div
              key={contest.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48">
                <img
                  src={contest.image || "/images/contest-placeholder.jpg"}
                  alt={contest.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        contest.status === "UPCOMING"
                          ? "bg-green-100 text-green-800"
                          : contest.status === "ONGOING"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {contest.status}
                    </span>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                      {contest.difficulty}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {contest.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-1">
                    {contest.description}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4 text-indigo-500" />
                    <span>
                      {new Date(contest.startTime).toLocaleDateString()} -{" "}
                      {new Date(contest.endTime).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiAward className="h-4 w-4 text-indigo-500" />
                    <span className="line-clamp-1">Prize: {contest.prize}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="h-4 w-4 text-indigo-500" />
                    <span className="line-clamp-1">
                      Platform: {contest.platform}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUsers className="h-4 w-4 text-indigo-500" />
                    <span>{contest.participants} participants</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingContest(contest);
                      setIsFormOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                    title="Edit Contest"
                  >
                    <FiEdit2 className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(contest.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    title="Delete Contest"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {isFormOpen && (
        <ContestForm
          initialData={editingContest}
          onClose={() => {
            setIsFormOpen(false);
            setEditingContest(undefined);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
