"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiUsers,
  FiShare2,
  FiDownload,
  FiArrowLeft,
} from "react-icons/fi";
import { LoadingSpinner } from "@/app/components/LoadingSpinner";
import { EventData } from "@/types/event";
import Countdown from "react-countdown";
import Link from "next/link";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = params?.eventId as string;
  const [event, setEvent] = useState<EventData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      if (!eventId) return;

      try {
        const res = await fetch(`/api/events/${eventId}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);
      } catch (error) {
        console.error("Failed to fetch event:", error);
        toast.error("Failed to load event");
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  const handleShare = async () => {
    try {
      await navigator.share({
        title: event?.title,
        text: event?.shortDescription,
        url: window.location.href,
      });
    } catch (error) {
      navigator.clipboard.writeText(window.location.href);
      toast.success("Link copied to clipboard!");
    }
  };

  const handleRegister = async () => {
    setIsRegistering(true);
    try {
      // Add registration logic here
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Registration successful!");
    } catch (error) {
      toast.error("Failed to register");
    } finally {
      setIsRegistering(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!event) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-500 dark:text-gray-400">Event not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Back Button - More subtle */}
      <Link
        href="/events"
        className="fixed top-24 left-4 z-10 p-2.5 bg-white/80 dark:bg-gray-800/80 
          backdrop-blur-sm rounded-full shadow-md hover:shadow-lg hover:bg-white 
          dark:hover:bg-gray-800 transition-all duration-200"
      >
        <FiArrowLeft className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      </Link>

      {/* Hero Section - Better contrast */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent" />

        {/* Status Badge - More subtle */}
        <div className="absolute top-24 right-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm 
              ${
                event.status === "UPCOMING"
                  ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                  : event.status === "ONGOING"
                  ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                  : "bg-gray-500/10 text-gray-400 border border-gray-500/20"
              }`}
          >
            {event.status.charAt(0) + event.status.slice(1).toLowerCase()}
          </motion.div>
        </div>

        {/* Hero Content - Better readability */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-4xl"
            >
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">
                {event.title}
              </h1>
              <p className="text-base text-gray-200 mb-4">
                {event.shortDescription}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-white">
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FiCalendar className="w-4 h-4 text-indigo-300" />
                  <span>{new Date(event.eventDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FiClock className="w-4 h-4 text-indigo-300" />
                  <span>
                    {new Date(event.eventDate).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  <FiMapPin className="w-4 h-4 text-indigo-300" />
                  <span>{event.venue}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Content - Standard spacing */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                About This Event
              </h2>
              <div className="prose dark:prose-invert max-w-none">
                <div dangerouslySetInnerHTML={{ __html: event.description }} />
              </div>
            </motion.div>

            {/* Speakers Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md"
            >
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Featured Speakers
              </h2>
              <div className="space-y-6">
                {/* Keynote Speaker */}
                <div className="flex items-start gap-4 p-4 rounded-lg bg-indigo-50/50 dark:bg-indigo-900/10">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-xl font-bold text-white">
                    {event.keynoteSpeaker[0]}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {event.keynoteSpeaker}
                    </h3>
                    <p className="text-indigo-600 dark:text-indigo-400">
                      Keynote Speaker
                    </p>
                  </div>
                </div>

                {/* Guest Speakers */}
                <div className="grid md:grid-cols-2 gap-4">
                  {event.guests.map((guest: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50 dark:bg-gray-700/30"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-lg font-bold text-white">
                        {guest[0]}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {guest}
                        </h3>
                        <p className="text-blue-600 dark:text-blue-400">
                          Guest Speaker
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Column - Registration Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <div className="sticky top-24 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
              {event.status === "UPCOMING" && (
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    Event starts in
                  </p>
                  <Countdown
                    date={new Date(event.eventDate)}
                    className="text-2xl font-bold text-indigo-600 dark:text-indigo-400"
                  />
                </div>
              )}

              <button
                onClick={handleRegister}
                disabled={isRegistering || event.status !== "UPCOMING"}
                className={`w-full rounded-lg px-6 py-3 font-medium transition-all duration-200 
                  ${
                    event.status === "UPCOMING"
                      ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-indigo-500/25"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-700 dark:text-gray-500"
                  }`}
              >
                {isRegistering ? (
                  <LoadingSpinner className="h-5 w-5 mx-auto" />
                ) : event.status === "UPCOMING" ? (
                  "Register Now"
                ) : (
                  "Registration Closed"
                )}
              </button>

              <div className="space-y-4 text-sm text-gray-600 dark:text-gray-400 mt-6">
                <div className="flex items-center gap-2">
                  <FiUsers className="w-4 h-4" />
                  <span>Limited seats available</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCalendar className="w-4 h-4" />
                  <span>
                    Registration closes on{" "}
                    {new Date(event.registrationDeadline).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex justify-between">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FiShare2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={() => {
                      // Add to calendar logic
                      toast.success("Event saved to calendar!");
                    }}
                    className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400"
                  >
                    <FiDownload className="w-4 h-4" />
                    Save
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
