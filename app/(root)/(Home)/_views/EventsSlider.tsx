"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import Countdown from "react-countdown";
import { Event } from "@/types/event";
import { eventApi } from "@/lib/api/eventApi";

const EventsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await eventApi.getEvents();
      setEvents(response.data.results);
    } catch (err) {
      console.error("Error loading events:", err);
      const errorMessage = err instanceof Error ? err.message : "Failed to load events";
      setError(errorMessage);

      // Check if it's a connection error
      if (errorMessage.includes("Unable to connect to backend server")) {
        console.warn("Backend server not available, using fallback data");
        // You could set some fallback events here if needed
        setEvents([]);
      } else {
        setEvents([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => nextSlide(),
    onSwipedRight: () => prevSlide(),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % events.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + events.length) % events.length);
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

  // Show loading state
  if (loading) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don&apos;t miss out on our exciting events and workshops
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don&apos;t miss out on our exciting events and workshops
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-center max-w-md">
              <p className="text-red-600 dark:text-red-400 mb-4">
                {error.includes("Unable to connect to backend server")
                  ? "Unable to connect to the server. Please check your connection or try again later."
                  : "Failed to load events"
                }
              </p>
              <button
                onClick={loadEvents}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state
  if (events.length === 0) {
    return (
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Upcoming Events
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
            <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Don&apos;t miss out on our exciting events and workshops
            </p>
          </div>
          <div className="flex justify-center items-center h-64">
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">No events available at the moment</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don&apos;t miss out on our exciting events and workshops
          </p>
        </div>

        <div className="flex justify-between items-center mb-12">
          <div className="flex gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              ←
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white dark:bg-gray-800 shadow-md hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              →
            </button>
          </div>
        </div>

        <div
          ref={(el) => {
            sliderRef.current = el;
            handlers.ref(el);
          }}
          className="relative overflow-hidden rounded-2xl"
        >
          <motion.div
            animate={{ x: `-${currentSlide * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="flex"
          >
            {events.map((event) => (
              <div
                key={event.id}
                className="w-full flex-shrink-0 p-4"
                style={{ minWidth: "100%" }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg">
                  <div className="relative h-64 md:h-96">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover"
                      suppressHydrationWarning
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(event)}
                    </div>
                    {event.status === "UPCOMING" && (
                      <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-white">
                        <Countdown date={new Date(event.event_date)} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {event.short_description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>{new Date(event.event_date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        <span>{new Date(event.event_date).toLocaleTimeString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiMapPin className="w-4 h-4" />
                        <span>{event.venue}</span>
                      </div>
                    </div>

                    <Link
                      href={`/events/${event.id}`}
                      className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Slider dots */}
        <div className="flex justify-center gap-2 mt-6">
          {events.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${index === currentSlide
                ? "bg-indigo-600 dark:bg-indigo-400"
                : "bg-gray-300 dark:bg-gray-600"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSlider;
