"use client";

import { useState, useEffect, useCallback } from "react";
import { useRole } from "@/hooks/useRole";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiCalendar,
  FiMapPin,
  FiClock,
  FiUser,
  FiSearch,
} from "react-icons/fi";
import EventForm from "./_components/EventForm";
import { useDebounce } from "@/hooks/useDebounce";
import { EventData } from "@/types/event";
import { Role } from "@/types/role";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { motion } from "framer-motion";
import Image from "next/image";

type EventStatus = "UPCOMING" | "ONGOING" | "COMPLETED";

export default function EventsPage() {
  const [events, setEvents] = useState<EventData[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<EventStatus | "ALL">("ALL");
  const debouncedSearch = useDebounce(search, 300);
  const { isAllowed } = useRole([Role.SUPER_ADMIN, Role.ADMIN]);

  const fetchEvents = useCallback(async () => {
    try {
      const params = new URLSearchParams();
      if (status !== "ALL") params.append("status", status);
      if (debouncedSearch) params.append("search", debouncedSearch);

      const res = await fetch(`/api/admin/events?${params}`);
      if (res.ok) {
        const data = await res.json();
        setEvents(data);
      }
    } catch (error) {
      console.error("Failed to fetch events:", error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, status]);

  useEffect(() => {
    fetchEvents();
  }, [debouncedSearch, status, fetchEvents]);

  const handleSubmit = async (data: Partial<EventData>) => {
    try {
      const formData = {
        ...data,
        guests: data.guests?.filter(Boolean) ?? [], // Add null check and default to empty array
      };

      const res = await fetch(
        selectedEvent
          ? `/api/admin/events/${selectedEvent.id}`
          : "/api/admin/events",
        {
          method: selectedEvent ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Failed to save event");
      }

      await fetchEvents();
      setIsFormOpen(false);
      setSelectedEvent(null);

      toast.success(
        selectedEvent
          ? "Event updated successfully!"
          : "Event created successfully!"
      );
    } catch (error) {
      console.error("Failed to save event:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to save event"
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/admin/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error("Failed to delete event");
      }

      await fetchEvents();
      toast.success("Event deleted successfully!");
    } catch (error) {
      console.error("Failed to delete event:", error);
      toast.error("Failed to delete event");
    }
  };


  if (!isAllowed) return null;

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Events
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Manage and organize your events
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedEvent(null);
            setIsFormOpen(true);
          }}
          className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 
            text-white rounded-lg hover:from-indigo-600 hover:to-purple-700 transition-all duration-200 
            shadow-sm hover:shadow-indigo-500/25"
        >
          <FiPlus className="w-5 h-5" />
          Add New Event
        </button>
      </div>

      {/* Filters Section */}
      <div className="grid md:flex gap-4 items-center bg-white dark:bg-gray-800 p-4 rounded-xl border border-gray-200 dark:border-gray-700">
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
          value={status}
          onChange={(e) => setStatus(e.target.value as EventStatus | "ALL")}
          className="px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 
            dark:bg-gray-800 focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
        >
          <option value="ALL">All Status</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400">No events found</p>
          <p>Start by creating your first event!</p>
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
              <div className="relative h-48">
                <Image
                  src={event.image}
                  alt={event.title}
                  width={400}
                  height={192}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-200 line-clamp-1">
                    {event.shortDescription}
                  </p>
                </div>
              </div>

              <div className="p-5">
                <div className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-2">
                    <FiCalendar className="h-4 w-4 text-indigo-500" />
                    <span>
                      {new Date(event.eventDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiClock className="h-4 w-4 text-indigo-500" />
                    <span>
                      Deadline:{" "}
                      {new Date(
                        event.registrationDeadline
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiMapPin className="h-4 w-4 text-indigo-500" />
                    <span className="line-clamp-1">{event.venue}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FiUser className="h-4 w-4 text-indigo-500" />
                    <span className="line-clamp-1">{event.keynoteSpeaker}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-end gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsFormOpen(true);
                    }}
                    className="p-2 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                    title="Edit Event"
                  >
                    <FiEdit2 className="h-5 w-5" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                    title="Delete Event"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Event Form Modal */}
      {isFormOpen && (
        <EventForm
          event={selectedEvent}
          onClose={() => {
            setIsFormOpen(false);
            setSelectedEvent(null);
          }}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
