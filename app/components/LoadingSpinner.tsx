"use client";

export function LoadingSpinner({ className = "h-5 w-5" }) {
  return (
    <div className="flex justify-center">
      <div
        className={`${className} animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600`}
      />
    </div>
  );
}
