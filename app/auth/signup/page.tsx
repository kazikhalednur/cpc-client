"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "../../components/LoadingSpinner";
import { useGoogleSignupMutation } from "@/lib/api/googleAuthApi";
import { useAuth } from "@/lib/auth/AuthContext";
import toast from "react-hot-toast";

import CPCLogo from "../../../assets/images/CPC-Logo.png";


export default function SignUp() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState("");
  const [googleSignup, { isLoading: isGoogleSignupLoading }] = useGoogleSignupMutation();
  const CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  // Restore student ID from localStorage and handle Google OAuth callback
  useEffect(() => {
    const savedStudentId = localStorage.getItem('pending_student_id');
    if (savedStudentId) {
      setStudentId(savedStudentId);
    }

    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');

    if (code && (studentId || savedStudentId)) {
      handleGoogleCallback(code);
    }
  }, [studentId]);

  const handleGoogleCallback = async (code: string) => {
    try {
      setIsLoading(true);
      const currentStudentId = studentId || localStorage.getItem('pending_student_id') || '';

      if (!currentStudentId.trim()) {
        toast.error('Student ID is required for signup');
        return;
      }

      console.log('Attempting Google signup with:', { code: code.substring(0, 20) + '...', student_id: currentStudentId });

      const result = await googleSignup({
        code,
        student_id: currentStudentId,
      }).unwrap();

      console.log('Google signup result:', result);

      if (result.success) {
        // Use auth context to store tokens
        login({
          access: result.data.access,
          refresh: result.data.refresh,
        });

        // Clean up pending student ID
        localStorage.removeItem('pending_student_id');

        toast.success('Account created successfully!');
        router.push('/');
      } else {
        toast.error(result.message || 'Signup failed');
      }
    } catch (error: any) {
      console.error('Google signup error details:', {
        error,
        message: error?.message,
        data: error?.data,
        status: error?.status,
        originalStatus: error?.originalStatus
      });

      let errorMessage = 'Signup failed. Please try again.';

      if (error?.data?.message) {
        errorMessage = error.data.message;
      } else if (error?.message) {
        errorMessage = error.message;
      } else if (error?.status) {
        errorMessage = `Server error (${error.status}). Please try again.`;
      }

      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!studentId.trim()) {
      toast.error('Please enter your Student ID first');
      return;
    }

    try {
      setIsLoading(true);
      // Store student ID for callback
      localStorage.setItem('pending_student_id', studentId);

      // Generate redirect URI on client side
      const redirectUri = `${window.location.origin}/auth/signup`;

      const googleAuthUrl = 'https://accounts.google.com/o/oauth2/v2/auth'

      const options = {
        client_id: CLIENT_ID,
        redirect_uri: redirectUri,
        response_type: 'code',
        scope: 'openid email profile',
        access_type: 'offline',
        prompt: 'consent',
      }

      const qs = new URLSearchParams(options).toString()
      localStorage.setItem('qs', qs)
      window.location.href = `${googleAuthUrl}?${qs}`
    } catch (error) {
      console.error('Error initiating Google signup:', error);
      toast.error('Failed to initiate Google signup');
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
            Join CPC Community
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 font-medium">
            Create your account to get started
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <label
              htmlFor="studentId"
              className="block text-sm font-semibold text-gray-700 mb-1"
            >
              Student ID
            </label>
            <input
              id="studentId"
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="appearance-none rounded-lg relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-400 text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-all duration-200"
            />
          </div>

          <button
            type="button"
            onClick={handleGoogleSignUp}
            disabled={isLoading || isGoogleSignupLoading}
            className="group relative w-full flex items-center justify-center gap-2 py-3 px-4 border border-gray-300 text-sm font-medium rounded-md bg-white text-gray-800 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 disabled:opacity-50"
          >
            {isLoading || isGoogleSignupLoading ? (
              <span className="flex items-center">
                <LoadingSpinner />
                {isGoogleSignupLoading ? 'Creating account...' : 'Redirecting to Google...'}
              </span>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-5 w-5">
                  <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303C33.602,31.91,29.21,35,24,35c-6.627,0-12-5.373-12-12  s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,5.053,29.268,3,24,3C12.955,3,4,11.955,4,23  s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                  <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.108,18.961,13,24,13c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657  C34.046,5.053,29.268,3,24,3C16.318,3,9.656,7.337,6.306,14.691z" />
                  <path fill="#4CAF50" d="M24,43c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.001,26.715,36,24,36  c-5.176,0-9.549-3.111-11.297-7.528l-6.522,5.025C9.568,39.556,16.227,43,24,43z" />
                  <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-1.086,3.176-3.382,5.74-6.24,7.195l0.001-0.001l6.19,5.238  C33.018,41.205,44,34,44,23C44,22.659,43.862,21.35,43.611,20.083z" />
                </svg>
                Sign up with Google
              </>
            )}
          </button>

          <div className="text-sm text-black text-center">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
