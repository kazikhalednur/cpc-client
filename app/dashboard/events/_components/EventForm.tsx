"use client";

import { useState } from "react";
import { FiX, FiPlus, FiTrash } from "react-icons/fi";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { EventData } from "@/types/event";

const eventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  shortDescription: z.string().min(1, "Short description is required").max(200),
  description: z.string().min(1, "Description is required"),
  image: z.string().min(1, "Image URL is required"),
  keynoteSpeaker: z.string().min(1, "Keynote speaker is required"),
  guests: z.array(z.string()).min(1, "At least one guest is required"),
  eventDate: z.string().refine((date) => new Date(date) > new Date(), {
    message: "Event date must be in the future",
  }),
  registrationDeadline: z
    .string()
    .refine((date) => new Date(date) > new Date(), {
      message: "Registration deadline must be in the future",
    }),
  venue: z.string().min(1, "Venue is required"),
  status: z.enum(["UPCOMING", "ONGOING", "COMPLETED"]),
});

type EventFormData = z.infer<typeof eventSchema>;
export type { EventFormData };

interface EventFormProps {
  event?: EventData | null;
  onClose: () => void;
  onSubmit: (data: EventFormData) => Promise<void>;
}

export default function EventForm({
  event,
  onClose,
  onSubmit,
}: EventFormProps) {
  const [guests, setGuests] = useState<string[]>(event?.guests || [""]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
  } = useForm<EventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: event
      ? {
          ...event,
          eventDate: new Date(event.eventDate).toISOString().slice(0, 16),
          registrationDeadline: new Date(event.registrationDeadline)
            .toISOString()
            .slice(0, 16),
          status: event.status,
        }
      : {
          guests: [""],
          status: "UPCOMING" as const,
        },
  });

  const addGuest = () => {
    setGuests([...guests, ""]);
  };

  const removeGuest = (index: number) => {
    setGuests(guests.filter((_, i) => i !== index));
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {event ? "Edit Event" : "Create New Event"}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Title
            </label>
            <input
              {...register("title")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Event Title"
            />
            {errors.title && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.title.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Short Description
            </label>
            <textarea
              {...register("shortDescription")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              rows={2}
              placeholder="Brief description of the event"
            />
            {errors.shortDescription && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.shortDescription.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Description
            </label>
            <textarea
              {...register("description")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              rows={4}
              placeholder="Detailed description"
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Image URL
            </label>
            <input
              {...register("image")}
              type="url"
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Image URL"
            />
            {errors.image && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Keynote Speaker
            </label>
            <input
              {...register("keynoteSpeaker")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Name of keynote speaker"
            />
            {errors.keynoteSpeaker && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.keynoteSpeaker.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Guests
            </label>
            <div className="space-y-2">
              {guests.map((_, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    {...register(`guests.${index}`)}
                    className="flex-1 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
                    placeholder="Guest name"
                  />
                  {guests.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeGuest(index)}
                      className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                    >
                      <FiTrash className="h-5 w-5" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addGuest}
                className="flex items-center gap-2 text-blue-600 hover:bg-blue-50 px-4 py-2 rounded-lg"
              >
                <FiPlus className="h-5 w-5" />
                Add Guest
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Event Date
              </label>
              <input
                {...register("eventDate")}
                type="datetime-local"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              {errors.eventDate && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.eventDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
                Registration Deadline
              </label>
              <input
                {...register("registrationDeadline")}
                type="datetime-local"
                className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
              {errors.registrationDeadline && (
                <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                  {errors.registrationDeadline.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Venue/Platform
            </label>
            <input
              {...register("venue")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              placeholder="Event venue or online platform"
            />
            {errors.venue && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.venue.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Status
            </label>
            <select
              {...register("status")}
              className="w-full rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 p-2.5 text-gray-900 dark:text-white"
            >
              <option value="UPCOMING">Upcoming</option>
              <option value="ONGOING">Ongoing</option>
              <option value="COMPLETED">Completed</option>
            </select>
            {errors.status && (
              <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                {errors.status.message}
              </p>
            )}
          </div>

          <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              {isSubmitting
                ? "Saving..."
                : event
                ? "Update Event"
                : "Create Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
