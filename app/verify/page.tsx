"use client";

import { useState } from "react";
import { FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";

interface Certificate {
  id: string;
  studentName: string;
  studentId: string;
  eventName: string;
  issueDate: string;
  certificateNumber: string;
  status: "valid" | "invalid";
}

export default function CertificateVerification() {
  const [certificateNumber, setCertificateNumber] = useState("");
  const [searchResult, setSearchResult] = useState<Certificate | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSearchResult(null);

    try {
      const response = await fetch(
        `/api/certificates/verify?number=${certificateNumber}`
      );
      if (!response.ok) throw new Error("Certificate not found");

      const data = await response.json();
      setSearchResult(data);
    } catch {
      setError("Invalid certificate number or certificate not found");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-3xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Certificate Verification
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Enter your certificate number to verify its authenticity
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <form onSubmit={handleVerify} className="flex gap-4">
            <input
              type="text"
              value={certificateNumber}
              onChange={(e) => setCertificateNumber(e.target.value)}
              placeholder="Enter certificate number"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !certificateNumber}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isLoading ? (
                "Verifying..."
              ) : (
                <>
                  <FiSearch className="mr-2" />
                  Verify
                </>
              )}
            </button>
          </form>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-8">
            <div className="flex items-center text-red-800 dark:text-red-400">
              <FiXCircle className="w-5 h-5 mr-2" />
              {error}
            </div>
          </div>
        )}

        {searchResult && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <FiCheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Certificate Verified
                  </h2>
                  <p className="text-green-600 dark:text-green-400 text-sm">
                    This certificate is valid and was issued by DIU CPC
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Student Name
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {searchResult.studentName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Student ID
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {searchResult.studentId}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Event Name
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {searchResult.eventName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500 dark:text-gray-400">
                    Issue Date
                  </label>
                  <p className="mt-1 text-gray-900 dark:text-white">
                    {searchResult.issueDate}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
