"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { Navigation } from "@/app/components/Navigation";

export default function TermsOfService() {
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
                            Terms of Service
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
                                    1. Acceptance of Terms
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        By accessing and using the DIU CPC (Computer Programming Club) website and services,
                                        you accept and agree to be bound by the terms and provision of this agreement.
                                    </p>
                                    <p>
                                        If you do not agree to abide by the above, please do not use this service.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    2. Description of Service
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        DIU CPC provides a platform for programming contests, educational resources,
                                        and community engagement for students interested in computer programming and
                                        competitive programming.
                                    </p>
                                    <p>Our services include:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Online programming contests and competitions</li>
                                        <li>Educational resources and tutorials</li>
                                        <li>Community forums and discussion boards</li>
                                        <li>Leaderboards and performance tracking</li>
                                        <li>Event announcements and notifications</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    3. User Accounts
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        To access certain features of our service, you may be required to create an account.
                                        You are responsible for:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Providing accurate and complete information</li>
                                        <li>Maintaining the security of your account credentials</li>
                                        <li>All activities that occur under your account</li>
                                        <li>Notifying us immediately of any unauthorized use</li>
                                        <li>Ensuring your account information remains current</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    4. Acceptable Use
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>You agree not to use our service to:</p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Violate any applicable laws or regulations</li>
                                        <li>Infringe on the rights of others</li>
                                        <li>Transmit harmful or malicious code</li>
                                        <li>Attempt to gain unauthorized access to our systems</li>
                                        <li>Interfere with the proper functioning of the service</li>
                                        <li>Engage in any form of cheating or unfair practices in contests</li>
                                        <li>Harass, abuse, or harm other users</li>
                                        <li>Post inappropriate, offensive, or illegal content</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    5. Contest Rules and Fair Play
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        All contests and competitions are governed by specific rules designed to ensure
                                        fair play and equal opportunity for all participants.
                                    </p>
                                    <ul className="list-disc pl-6 space-y-2">
                                        <li>Participants must solve problems independently</li>
                                        <li>Collaboration during contests is strictly prohibited</li>
                                        <li>Submissions must be original work</li>
                                        <li>Any form of cheating will result in disqualification</li>
                                        <li>Contest results are final and binding</li>
                                    </ul>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    6. Intellectual Property
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        The service and its original content, features, and functionality are and will
                                        remain the exclusive property of DIU CPC and its licensors.
                                    </p>
                                    <p>
                                        You retain ownership of your submissions and solutions, but grant us a
                                        non-exclusive license to use, display, and distribute your content in
                                        connection with our services.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    7. Privacy and Data Protection
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        Your privacy is important to us. Please review our Privacy Policy,
                                        which also governs your use of the service, to understand our practices.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    8. Disclaimers and Limitations
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        The service is provided on an "AS IS" and "AS AVAILABLE" basis.
                                        We make no warranties, expressed or implied, and hereby disclaim
                                        all other warranties including, without limitation, implied warranties
                                        or conditions of merchantability, fitness for a particular purpose,
                                        or non-infringement of intellectual property.
                                    </p>
                                    <p>
                                        In no event shall DIU CPC be liable for any indirect, incidental,
                                        special, consequential, or punitive damages, including without
                                        limitation, loss of profits, data, use, goodwill, or other
                                        intangible losses.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    9. Termination
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We may terminate or suspend your account and bar access to the service
                                        immediately, without prior notice or liability, under our sole discretion,
                                        for any reason whatsoever and without limitation, including but not limited
                                        to a breach of the Terms.
                                    </p>
                                    <p>
                                        If you wish to terminate your account, you may simply discontinue using
                                        the service or contact us to request account deletion.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    10. Changes to Terms
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        We reserve the right, at our sole discretion, to modify or replace these
                                        Terms at any time. If a revision is material, we will provide at least
                                        30 days notice prior to any new terms taking effect.
                                    </p>
                                    <p>
                                        By continuing to access or use our service after those revisions become
                                        effective, you agree to be bound by the revised terms.
                                    </p>
                                </div>
                            </section>

                            <section className="mb-8">
                                <h2 className={`text-2xl font-bold mb-4 ${mounted && theme === "dark" ? "text-white" : "text-gray-900"}`}>
                                    11. Contact Information
                                </h2>
                                <div className={`space-y-4 ${mounted && theme === "dark" ? "text-gray-300" : "text-gray-700"}`}>
                                    <p>
                                        If you have any questions about these Terms of Service, please contact us:
                                    </p>
                                    <div className={`${mounted && theme === "dark" ? "bg-gray-700" : "bg-gray-100"} p-4 rounded-lg`}>
                                        <p><strong>Email:</strong>cpc@diu.edu.bd</p>
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
