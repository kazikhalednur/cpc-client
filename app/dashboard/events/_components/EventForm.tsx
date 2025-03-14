"use client";

import { useState } from "react";
import {
  FiX,
  FiImage,
  FiCalendar,
  FiMapPin,
  FiUsers,
  FiInfo,
} from "react-icons/fi";
import { EventData } from "@/types/event";
import { motion } from "framer-motion";

interface EventFormProps {
  event?: EventData | null;
  onClose: () => void;
  onSubmit: (data: Partial<EventData>) => void;
}

const FormSection = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
      <Icon className="w-5 h-5 text-indigo-500" />
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

export default function EventForm({
  event,
  onClose,
  onSubmit,
}: EventFormProps) {
  const [formData, setFormData] = useState({
    title: event?.title || "",
    shortDescription: event?.shortDescription || "",
    description: event?.description || "",
    image: event?.image || "",
    keynoteSpeaker: event?.keynoteSpeaker || "",
    guests: event?.guests || [],
    eventDate: event?.eventDate?.split("T")[0] || "",
    time: event?.eventDate?.split("T")[1]?.split(".")[0]?.slice(0, 5) || "",
    registrationDeadline: event?.registrationDeadline?.split("T")[0] || "",
    deadlineTime:
      event?.registrationDeadline?.split("T")[1]?.split(".")[0]?.slice(0, 5) ||
      "",
    venue: event?.venue || "",
    status: event?.status || "UPCOMING",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Combine date and time for event date
    const eventDateTime = new Date(
      `${formData.eventDate}T${formData.time || "00:00"}:00.000Z`
    );

    // Combine date and time for registration deadline
    const deadlineDateTime = new Date(
      `${formData.registrationDeadline}T${
        formData.deadlineTime || "00:00"
      }:00.000Z`
    );

    // Submit only the fields that exist in the schema
    onSubmit({
      title: formData.title,
      shortDescription: formData.shortDescription,
      description: formData.description,
      image: formData.image,
      keynoteSpeaker: formData.keynoteSpeaker,
      guests: formData.guests.filter(Boolean),
      eventDate: eventDateTime.toISOString(),
      registrationDeadline: deadlineDateTime.toISOString(),
      venue: formData.venue,
      status: formData.status as "UPCOMING" | "ONGOING" | "COMPLETED",
    });
  };

  const inputClasses = `w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 
    bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
    focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 
    dark:focus:border-indigo-400 dark:focus:ring-indigo-400 
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    transition-all duration-200`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-gray-50 dark:bg-gray-900 rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="sticky top-0 bg-white dark:bg-gray-800 border-b dark:border-gray-700 p-6 rounded-t-xl">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {event ? "Edit Event" : "Create New Event"}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Fill in the details for your event
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 
                rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-8">
          <FormSection title="Basic Information" icon={FiInfo}>
            <div className="grid gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Enter event title"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Short Description
                </label>
                <input
                  type="text"
                  value={formData.shortDescription}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      shortDescription: e.target.value,
                    })
                  }
                  className={inputClasses}
                  placeholder="Brief description of the event"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Full Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={4}
                  className={inputClasses}
                  placeholder="Detailed description of the event..."
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Schedule" icon={FiCalendar}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Event Date
                </label>
                <input
                  type="date"
                  value={formData.eventDate}
                  onChange={(e) =>
                    setFormData({ ...formData, eventDate: e.target.value })
                  }
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Event Time
                </label>
                <input
                  type="time"
                  value={formData.time}
                  onChange={(e) =>
                    setFormData({ ...formData, time: e.target.value })
                  }
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Registration Deadline
                </label>
                <input
                  type="date"
                  value={formData.registrationDeadline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      registrationDeadline: e.target.value,
                    })
                  }
                  className={inputClasses}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Deadline Time
                </label>
                <input
                  type="time"
                  value={formData.deadlineTime}
                  onChange={(e) =>
                    setFormData({ ...formData, deadlineTime: e.target.value })
                  }
                  className={inputClasses}
                  required
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Location & Speakers" icon={FiMapPin}>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Venue
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) =>
                    setFormData({ ...formData, venue: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Event location"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Keynote Speaker
                </label>
                <input
                  type="text"
                  value={formData.keynoteSpeaker}
                  onChange={(e) =>
                    setFormData({ ...formData, keynoteSpeaker: e.target.value })
                  }
                  className={inputClasses}
                  placeholder="Main speaker name"
                  required
                />
              </div>
              <div className="col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                  Guest Speakers
                </label>
                <input
                  type="text"
                  value={formData.guests.join(", ")}
                  onChange={(e) => {
                    const input = e.target.value;

                    if (input.includes(",")) {
                      const guestList = input
                        .split(",")
                        .map((name) => name.trim())
                        .filter((name) => name.length > 0);
                      setFormData({
                        ...formData,
                        guests: guestList,
                      });
                    } else {
                      setFormData({
                        ...formData,
                        guests: input ? [input] : [],
                      });
                    }
                  }}
                  className={inputClasses}
                  placeholder="Enter guest names separated by commas (e.g., John Doe, Jane Smith)"
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Event Image" icon={FiImage}>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Image URL
              </label>
              <input
                type="url"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
                className={inputClasses}
                placeholder="Enter image URL"
                required
              />
            </div>
          </FormSection>

          <div className="sticky bottom-0 bg-gray-50 dark:bg-gray-900 pt-6 pb-6 -mx-6 px-6 mt-8 border-t dark:border-gray-800">
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-gray-700 bg-white dark:bg-gray-800 dark:text-gray-300 
                  rounded-lg border border-gray-300 dark:border-gray-600 hover:bg-gray-50 
                  dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 text-white bg-gradient-to-r from-indigo-500 to-purple-600 
                  rounded-lg hover:from-indigo-600 hover:to-purple-700 shadow-sm 
                  hover:shadow-indigo-500/25 transition-all duration-200"
              >
                {event ? "Update Event" : "Create Event"}
              </button>
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
