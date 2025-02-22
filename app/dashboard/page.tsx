"use client";

import { useSession } from "next-auth/react";
import { useRole } from "@/hooks/useRole";
import { Role } from "@/types/role";
import { useState, useEffect } from "react";
import {
  FiUsers,
  FiCalendar,
  FiAward,
  FiTrendingUp,
  FiClock,
  FiPlus,
} from "react-icons/fi";
import Link from "next/link";
import { LoadingSpinner } from "../components/LoadingSpinner";

interface DashboardStats {
  totalUsers: number;
  totalEvents: number;
  totalContests: number;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const { isAllowed, isLoading: roleLoading } = useRole([
    Role.SUPER_ADMIN,
    Role.ADMIN,
  ]);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isStatsLoading, setIsStatsLoading] = useState(true);

  useEffect(() => {
    // Only fetch if user is authenticated and has proper role
    if (status === "authenticated" && isAllowed) {
      const fetchStats = async () => {
        try {
          const res = await fetch("/api/admin/dashboard/stats");
          if (res.ok) {
            const data = await res.json();
            setStats(data);
          }
        } catch (error) {
          console.error("Failed to fetch dashboard stats:", error);
        } finally {
          setIsStatsLoading(false);
        }
      };

      fetchStats();
    } else if (status !== "loading") {
      // Set loading to false if not authenticated or not allowed
      setIsStatsLoading(false);
    }
  }, [status, isAllowed]); // Add dependencies to prevent continuous fetching

  if (status === "loading" || roleLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!isAllowed) return null;

  const quickActions = [
    {
      title: "Create Event",
      href: "/dashboard/events",
      icon: FiCalendar,
      bgColor: "bg-indigo-50 dark:bg-indigo-900/30",
      textColor: "text-indigo-700 dark:text-indigo-300",
      hoverBg: "hover:bg-indigo-100 dark:hover:bg-indigo-900/50",
    },
    {
      title: "Add Contest",
      href: "/dashboard/contests",
      icon: FiAward,
      bgColor: "bg-purple-50 dark:bg-purple-900/30",
      textColor: "text-purple-700 dark:text-purple-300",
      hoverBg: "hover:bg-purple-100 dark:hover:bg-purple-900/50",
    },
    {
      title: "Manage Users",
      href: "/dashboard/users",
      icon: FiUsers,
      bgColor: "bg-blue-50 dark:bg-blue-900/30",
      textColor: "text-blue-700 dark:text-blue-300",
      hoverBg: "hover:bg-blue-100 dark:hover:bg-blue-900/50",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {session?.user?.name}!
        </h1>
        <p className="text-indigo-100">
          Here's what's happening in your dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Users Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FiUsers className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Users
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isStatsLoading ? (
                  <LoadingSpinner className="h-6 w-6" />
                ) : (
                  stats?.totalUsers || 0
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Events Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
              <FiCalendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Events
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isStatsLoading ? (
                  <LoadingSpinner className="h-6 w-6" />
                ) : (
                  stats?.totalEvents || 0
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Contests Card */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FiAward className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Total Contests
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                {isStatsLoading ? (
                  <LoadingSpinner className="h-6 w-6" />
                ) : (
                  stats?.totalContests || 0
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.title}
              href={action.href}
              className={`flex items-center gap-3 p-4 rounded-lg ${action.bgColor} ${action.textColor} ${action.hoverBg} transition-colors`}
            >
              <action.icon className="h-5 w-5" />
              <span>{action.title}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
