"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiSearch,
  FiFilter,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Event, EventApiResponse } from "@/types/event";
import { eventApi } from "@/lib/api/eventApi";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import Countdown from "react-countdown";
import toast from "react-hot-toast";
import { useDebounce } from "@/hooks/useDebounce";

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "ALL" | "UPCOMING" | "ONGOING" | "COMPLETED"
  >("ALL");
  const [wingFilter, setWingFilter] = useState<string>("ALL");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [pageSize] = useState(6); // Events per page

  const debouncedSearch = useDebounce(search, 300);

  // Available wings for filtering
  const wings = [
    { value: "ALL", label: "All Wings" },
    { value: "DEV", label: "Development Wing" },
    { value: "ACM", label: "ACM Task Force" },
    { value: "JCIC", label: "Job Career & Industry Collaboration" },
    { value: "R&J", label: "Research & Journal" },
  ];

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Prepare query parameters
        const params: any = {
          page: currentPage,
          page_size: pageSize,
        };

        if (debouncedSearch) {
          params.search = debouncedSearch;
        }

        if (statusFilter !== "ALL") {
          params.status = statusFilter;
        }

        if (wingFilter !== "ALL") {
          params.wing = wingFilter;
        }

        const response = await eventApi.getEvents(params);

        setEvents(response.data.results);
        setTotalCount(response.data.count);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        console.error("Failed to fetch events:", error);
        setError(error instanceof Error ? error.message : "Failed to load events");
        toast.error("Failed to load events");
        setEvents([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [debouncedSearch, statusFilter, wingFilter, currentPage, pageSize]);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch, statusFilter, wingFilter]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getStatusBadge = (event: Event) => {
    const now = new Date().getTime();
    const eventDate = new Date(event.event_date).getTime();

    // Calculate status dynamically based on backend status and time
    let status: string;
    if (event.status === "CANCELLED") {
      status = "cancelled";
    } else if (event.status === "COMPLETED" || now > eventDate + 24 * 60 * 60 * 1000) {
      // 24 hours after event
      status = "completed";
    } else if (event.status === "ONGOING" || (now >= eventDate && now <= eventDate + 24 * 60 * 60 * 1000)) {
      // During event
      status = "ongoing";
    } else {
      status = "upcoming";
    }

    const badges: { [key: string]: string } = {
      upcoming: `bg-gradient-to-r from-emerald-500/10 to-green-500/10 
        text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 
        dark:border-emerald-400/20`,

      ongoing: `bg-gradient-to-r from-blue-500/10 to-indigo-500/10 
        text-blue-700 dark:text-blue-400 border border-blue-500/20 
        dark:border-blue-400/20`,

      completed: `bg-gradient-to-r from-gray-500/10 to-slate-500/10 
        text-gray-700 dark:text-gray-400 border border-gray-500/20 
        dark:border-gray-400/20`,

      cancelled: `bg-gradient-to-r from-red-500/10 to-rose-500/10 
        text-red-700 dark:text-red-400 border border-red-500/20 
        dark:border-red-400/20`,
    };

    return (
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm 
          shadow-sm ${badges[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Events
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover and participate in our upcoming events and workshops
          </p>
        </div>

        {/* Filters */}
        <div className="grid md:grid-cols-4 gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="relative md:col-span-2">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
                dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="ALL">All Status</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>
          <select
            value={wingFilter}
            onChange={(e) => setWingFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            {wings.map((wing) => (
              <option key={wing.value} value={wing.value}>
                {wing.label}
              </option>
            ))}
          </select>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No events found</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {events.map((event) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl 
                    transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
                >
                  <Link href={`/events/${event.id}`}>
                    <div className="relative h-48">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="absolute top-4 right-4">
                        {getStatusBadge(event)}
                      </div>
                      {event.status === "UPCOMING" && (
                        <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-white">
                          <Countdown date={new Date(event.event_date)} />
                        </div>
                      )}
                    </div>

                    <div className="p-5">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                        {event.short_description}
                      </p>

                      <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4 text-indigo-500" />
                          <span>
                            {new Date(event.event_date).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiClock className="w-4 h-4 text-indigo-500" />
                          <span>
                            {new Date(event.event_date).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4 text-indigo-500" />
                          <span className="line-clamp-1">{event.venue}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 space-x-2">
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <FiChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex space-x-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                    // Show first page, last page, current page, and pages around current page
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <button
                          key={page}
                          onClick={() => handlePageChange(page)}
                          className={`px-3 py-2 text-sm font-medium rounded-lg ${currentPage === page
                              ? "text-white bg-indigo-600 border border-indigo-600"
                              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            }`}
                        >
                          {page}
                        </button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-3 py-2 text-sm text-gray-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  })}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                  <FiChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}

            {/* Results info */}
            <div className="text-center mt-6 text-sm text-gray-500 dark:text-gray-400">
              Showing {events.length} of {totalCount} events
            </div>
          </>
        )}
      </div>
    </div>
  );
}
