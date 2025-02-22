"use client";

import { useState, useEffect } from "react";
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
import EventForm, { EventFormData } from "./_components/EventForm";
import { useDebounce } from "@/hooks/useDebounce";
import { EventData } from "@/types/event";
import { Role } from "@/types/role";
import toast from "react-hot-toast";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";

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

  const fetchEvents = async () => {
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
  };

  useEffect(() => {
    fetchEvents();
  }, [debouncedSearch, status]);

  const handleSubmit = async (data: EventFormData) => {
    try {
      const formData = {
        ...data,
        guests: data.guests.filter(Boolean), // Remove empty strings
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
      {/* Header with search and filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Manage Events
        </h1>
        <button
          onClick={() => setIsFormOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-lg transition-colors shadow-md hover:shadow-lg"
        >
          <FiPlus className="h-5 w-5" />
          Add New Event
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search events..."
            className="pl-10 w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white"
          />
        </div>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value as EventStatus | "ALL")}
          className="rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white"
        >
          <option value="ALL">All Status</option>
          <option value="UPCOMING">Upcoming</option>
          <option value="ONGOING">Ongoing</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Event List */}
      {isLoading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <LoadingSpinner className="h-8 w-8" />
        </div>
      ) : events.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-12">
          <div className="text-6xl mb-4">🎪</div>
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p>Start by creating your first event!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="relative h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-4 py-1.5 rounded-full text-xs font-semibold ${
                      event.status === "UPCOMING"
                        ? "bg-emerald-500 text-white"
                        : event.status === "ONGOING"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="absolute bottom-2 left-2 right-2">
                  <h3 className="text-lg font-bold text-white line-clamp-1">
                    {event.title}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-2">
                  {event.shortDescription}
                </p>

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
                  <button
                    onClick={() => {
                      setSelectedEvent(event);
                      setIsFormOpen(true);
                    }}
                    className="p-2 text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-lg transition-colors"
                    title="Edit Event"
                  >
                    <FiEdit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    title="Delete Event"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
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
