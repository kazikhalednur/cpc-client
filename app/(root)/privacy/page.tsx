"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Navigation } from "@/app/components/Navigation";

export default function PrivacyPolicy() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <div className={`min-h-screen ${mounted && theme === "dark" ? "bg-gray-900" : "bg-gray-50"}`}>
            <Navigation />

            <div className="pt-20 pb-16">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                            Privacy Policy
                        </h1>
                        <p className={`text-lg ${mounted && theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>
                            Last updated: {new Date().toLocaleDateString()}
                        </p>
                    </div>

                    {/* Content */}
                    <div className={`prose prose-lg max-w-none ${mounted && theme === "dark" ? "prose-invert" : ""}`}>
                        <div className={`${mounted && theme === "dark" ? "bg-gray-800" : "bg-white"} rounded-lg shadow-lg p-8`}>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    1. Information We Collect
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We collect information you provide directly to us, such as when you create an account,
                                        participate in contests, or contact us for support.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Personal information (name, email address, student ID)</li>
                                        <li>Academic information (university, department, year of study)</li>
                                        <li>Contest participation data and performance metrics</li>
                                        <li>Communication preferences and support interactions</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    2. How We Use Your Information
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>We use the information we collect to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Provide, maintain, and improve our services</li>
                                        <li>Process contest registrations and manage participation</li>
                                        <li>Send you technical notices, updates, and support messages</li>
                                        <li>Respond to your comments and questions</li>
                                        <li>Monitor and analyze trends and usage</li>
                                        <li>Personalize your experience on our platform</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    3. Information Sharing
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We do not sell, trade, or otherwise transfer your personal information to third parties
                                        without your consent, except in the following circumstances:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>With your explicit consent</li>
                                        <li>To comply with legal obligations</li>
                                        <li>To protect our rights and prevent fraud</li>
                                        <li>In connection with a business transfer or acquisition</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    4. Data Security
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We implement appropriate technical and organizational measures to protect your personal
                                        information against unauthorized access, alteration, disclosure, or destruction.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Encryption of data in transit and at rest</li>
                                        <li>Regular security assessments and updates</li>
                                        <li>Access controls and authentication mechanisms</li>
                                        <li>Staff training on data protection practices</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    5. Your Rights
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>You have the right to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Access your personal information</li>
                                        <li>Correct inaccurate or incomplete data</li>
                                        <li>Request deletion of your personal information</li>
                                        <li>Object to processing of your personal information</li>
                                        <li>Data portability</li>
                                        <li>Withdraw consent at any time</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    6. Cookies and Tracking
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We use cookies and similar tracking technologies to enhance your experience on our platform.
                                        You can control cookie settings through your browser preferences.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    7. Changes to This Policy
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We may update this Privacy Policy from time to time. We will notify you of any changes
                                        by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    8. Contact Us
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        If you have any questions about this Privacy Policy, please contact us at:
                                    </p>
                                    <div className={`${mounted && theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg`}>
                                        <p><strong>Email:</strong> cpc@diu.edu.bd</p>
                                        <p><strong>Address:</strong> Room KT-311, Knowledge Tower, Daffodil International University</p>
                                    </div>
                                </div>
                            </section>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
