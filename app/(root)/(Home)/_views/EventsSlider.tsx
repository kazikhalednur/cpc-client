"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { FiCalendar, FiMapPin, FiClock } from "react-icons/fi";
import Countdown from "react-countdown";

interface Event {
  id: string;
  title: string;
  image: string;
  date: string;
  venue: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  description: string;
}

const EventsSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);

  const events: Event[] = [
    {
      id: "1",
      title: "Tech Innovation Summit 2024",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3",
      date: "2024-04-15T09:00:00",
      venue: "Main Auditorium",
      status: "upcoming",
      description:
        "Join us for a day of innovation and technology insights with industry leaders and tech experts.",
    },
    {
      id: "2",
      title: "Competitive Programming Workshop",
      image:
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3",
      date: "2024-03-28T10:00:00",
      venue: "CSE Building Room 402",
      status: "upcoming",
      description:
        "Learn advanced algorithms and problem-solving techniques from competitive programming experts.",
    },
    {
      id: "3",
      title: "AI/ML Bootcamp",
      image:
        "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3",
      date: "2024-03-20T14:00:00",
      venue: "Virtual Event",
      status: "upcoming",
      description:
        "Intensive three-day bootcamp covering machine learning fundamentals and practical applications.",
    },
    {
      id: "4",
      title: "Web Development Hackathon",
      image:
        "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3",
      date: "2024-02-15T09:00:00",
      venue: "Innovation Lab",
      status: "completed",
      description:
        "48-hour hackathon to build innovative web applications using modern technologies.",
    },
    {
      id: "5",
      title: "Blockchain Technology Seminar",
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3",
      date: "2024-04-05T11:00:00",
      venue: "Conference Hall",
      status: "upcoming",
      description:
        "Explore the future of blockchain technology and its applications in various industries.",
    },
    {
      id: "6",
      title: "Cloud Computing Workshop",
      image:
        "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3",
      date: "2024-03-10T09:00:00",
      venue: "Online",
      status: "ongoing",
      description:
        "Hands-on workshop on cloud platforms, deployment, and best practices.",
    },
    {
      id: "7",
      title: "DevOps Masterclass",
      image:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3",
      date: "2024-04-20T10:00:00",
      venue: "Engineering Building",
      status: "upcoming",
      description:
        "Master the latest DevOps tools and practices with hands-on workshops and expert guidance.",
    },
    {
      id: "8",
      title: "UI/UX Design Workshop",
      image:
        "https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?ixlib=rb-4.0.3",
      date: "2024-03-30T13:00:00",
      venue: "Design Studio",
      status: "upcoming",
      description:
        "Learn modern UI/UX design principles and tools from industry professionals.",
    },
    {
      id: "9",
      title: "Open Source Contributors Meet",
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3",
      date: "2024-04-10T15:00:00",
      venue: "Community Hall",
      status: "upcoming",
      description:
        "Connect with open source contributors and learn how to contribute to major projects.",
    },
    {
      id: "10",
      title: "Game Development Workshop",
      image:
        "https://images.unsplash.com/photo-1556438064-2d7646166914?ixlib=rb-4.0.3",
      date: "2024-04-25T11:00:00",
      venue: "Gaming Lab",
      status: "upcoming",
      description:
        "Create your own games using modern game development engines and techniques.",
    },
  ];

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

  const getStatusBadge = (status: Event["status"]) => {
    const badges = {
      upcoming:
        "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      ongoing:
        "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      completed:
        "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
      cancelled: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-sm font-medium ${badges[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Upcoming Events
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full" />
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't miss out on our exciting events and workshops
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
                    />
                    <div className="absolute top-4 right-4">
                      {getStatusBadge(event.status)}
                    </div>
                    {event.status === "upcoming" && (
                      <div className="absolute bottom-4 left-4 bg-black/70 rounded-lg p-3 text-white">
                        <Countdown date={new Date(event.date)} />
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      {event.description}
                    </p>

                    <div className="flex flex-wrap gap-4 text-gray-600 dark:text-gray-400 mb-6">
                      <div className="flex items-center gap-2">
                        <FiCalendar className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FiClock className="w-4 h-4" />
                        <span>{new Date(event.date).toLocaleTimeString()}</span>
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
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide
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
