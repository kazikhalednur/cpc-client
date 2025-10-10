"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import CPCLogo from "../../../assets/images/CPC-Logo.png";
import { LoadingSpinner } from "../../components/LoadingSpinner";

export default function SignIn() {
  const [isLoading, setIsLoading] = useState(false);
  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      await signIn("google", { callbackUrl: "/dashboard" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white/80 backdrop-blur-sm p-8 rounded-xl shadow-xl">
        <div>
          <Image
            className="mx-auto h-20 w-auto"
            src={CPCLogo}
            alt="CPC Logo"
            width={100}
            height={80}
            priority
            suppressHydrationWarning
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Welcome Back!
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">Sign in to access your CPC account</p>
        </div>

        <div className="space-y-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isLoading}
            className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading ? (
              <span className="flex items-center">
                <LoadingSpinner />
                Redirecting to Google...
              </span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303C33.602,31.91,29.21,35,24,35c-6.627,0-12-5.373-12-12  s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,5.053,29.268,3,24,3C12.955,3,4,11.955,4,23  s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657  C34.046,5.053,29.268,3,24,3C16.318,3,9.656,7.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,43c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.001,26.715,36,24,36  c-5.176,0-9.549-3.111-11.297-7.528l-6.522,5.025C9.568,39.556,16.227,43,24,43z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-1.086,3.176-3.382,5.74-6.24,7.195l0.001-0.001l6.19,5.238  C33.018,41.205,44,34,44,23C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Continue with Google
              </>
            )}
          </button>
          <div className="text-sm text-black text-center">
            Don't have an account?{" "}
            <Link
              href="/auth/signup"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
