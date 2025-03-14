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
} from "react-icons/fi";
import { EventData } from "@/types/event";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import Countdown from "react-countdown";
import toast from "react-hot-toast";

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "ALL" | "UPCOMING" | "ONGOING" | "COMPLETED"
  >("ALL");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const params = new URLSearchParams();
        if (search) params.append("search", search);
        if (filter !== "ALL") params.append("status", filter);

        const res = await fetch(`/api/events?${params}`);
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast.error("Failed to load events");
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(fetchEvents, 300);
    return () => clearTimeout(timeoutId);
  }, [search, filter]);

  const getStatusBadge = (event: EventData) => {
    const now = new Date().getTime();
    const eventDate = new Date(event.eventDate).getTime();

    let status = event.status;
    if (now > eventDate + 24 * 60 * 60 * 1000) {
      status = "COMPLETED";
    } else if (now >= eventDate && now <= eventDate + 24 * 60 * 60 * 1000) {
      status = "ONGOING";
    }

    const badges = {
      UPCOMING: `bg-gradient-to-r from-emerald-500/10 to-green-500/10 
        text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 
        dark:border-emerald-400/20`,

      ONGOING: `bg-gradient-to-r from-blue-500/10 to-indigo-500/10 
        text-blue-700 dark:text-blue-400 border border-blue-500/20 
        dark:border-blue-400/20`,

      COMPLETED: `bg-gradient-to-r from-gray-500/10 to-slate-500/10 
        text-gray-700 dark:text-gray-400 border border-gray-500/20 
        dark:border-gray-400/20`,
    };

    return (
      <span
        className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm 
          shadow-sm ${badges[status]}`}
      >
        {status.charAt(0) + status.slice(1).toLowerCase()}
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
        <div className="grid md:flex gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700 mb-8">
          <div className="relative flex-1">
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
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
              dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
          >
            <option value="ALL">All Events</option>
            <option value="UPCOMING">Upcoming</option>
            <option value="ONGOING">Ongoing</option>
            <option value="COMPLETED">Completed</option>
          </select>
        </div>

        {/* Events Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <LoadingSpinner className="h-8 w-8" />
          </div>
        ) : events.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No events found</p>
          </div>
        ) : (
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
                        <Countdown date={new Date(event.eventDate)} />
                      </div>
                    )}
                  </div>

                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {event.shortDescription}
                    </p>

                    <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4 text-indigo-500" />
                        <span>
                          {new Date(event.eventDate).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4 text-indigo-500" />
                        <span>
                          {new Date(event.eventDate).toLocaleTimeString([], {
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
        )}
      </div>
    </div>
  );
}
