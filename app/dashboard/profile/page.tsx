"use client";

import { useState, useRef } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import {
  FiEdit2,
  FiSave,
  FiCamera,
  FiGithub,
  FiLinkedin,
  FiCode,
  FiUser,
  FiMail,
  FiBook,
} from "react-icons/fi";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

export default function Profile() {
  const { data: session, update } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreview, setImagePreview] = useState(
    session?.user?.image || "/default-avatar.png"
  );

  const [formData, setFormData] = useState({
    name: session?.user?.name || "",
    studentId: "",
    department: "",
    batch: "",
    bio: "",
    github: "",
    linkedin: "",
    codeforces: "",
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Show preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload logic here
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch("/api/user/upload-image", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      await update({ image: data.imageUrl });
      toast.success("Profile image updated!");
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update profile");

      await update(formData);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  const inputClasses = `mt-2 block w-full px-4 py-2.5 rounded-lg border border-gray-200 
    dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
    shadow-sm focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 
    disabled:bg-gray-50 dark:disabled:bg-gray-900 
    disabled:text-gray-500 dark:disabled:text-gray-400
    placeholder:text-gray-400 dark:placeholder:text-gray-500
    transition-colors duration-200`;

  const labelClasses =
    "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg border border-gray-200 dark:border-gray-700">
        {/* Cover Image & Profile Section */}
        <div className="relative h-60 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute -bottom-16 left-8 space-y-1">
            <div className="relative group">
              <Image
                src={imagePreview}
                alt="Profile"
                width={128}
                height={128}
                className="rounded-xl border-4 border-white dark:border-gray-800 shadow-lg"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl 
                  opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiCamera className="w-6 h-6 text-white" />
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </div>
          </div>
        </div>

        <div className="pt-20 px-8 pb-8">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                {session?.user?.name}
              </h1>
              <p className="mt-1 text-base text-gray-600 dark:text-gray-400">
                {formData.department} • {formData.batch}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 px-4 py-2 text-white bg-gradient-to-r 
                from-indigo-500 to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 
                transition-all duration-200 shadow-sm hover:shadow-indigo-500/25"
            >
              {isEditing ? (
                <>
                  <FiSave className="w-4 h-4" /> Save Profile
                </>
              ) : (
                <>
                  <FiEdit2 className="w-4 h-4" /> Edit Profile
                </>
              )}
            </motion.button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <FiUser className="text-indigo-500" /> Basic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className={labelClasses}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    disabled={!isEditing}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClasses}>Student ID</label>
                  <input
                    type="text"
                    name="studentId"
                    disabled={!isEditing}
                    value={formData.studentId}
                    onChange={(e) =>
                      setFormData({ ...formData, studentId: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className={labelClasses}>Department</label>
                  <select
                    name="department"
                    disabled={!isEditing}
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className={inputClasses}
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="SWE">SWE</option>
                    <option value="CIS">CIS</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClasses}>Batch</label>
                  <input
                    type="text"
                    name="batch"
                    disabled={!isEditing}
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>

                <div className="col-span-2">
                  <label className={labelClasses}>Bio</label>
                  <textarea
                    name="bio"
                    disabled={!isEditing}
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Academic Information */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <FiBook className="text-indigo-500" /> Academic Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className={labelClasses}>Department</label>
                  <select
                    name="department"
                    disabled={!isEditing}
                    value={formData.department}
                    onChange={(e) =>
                      setFormData({ ...formData, department: e.target.value })
                    }
                    className={inputClasses}
                  >
                    <option value="">Select Department</option>
                    <option value="CSE">CSE</option>
                    <option value="SWE">SWE</option>
                    <option value="CIS">CIS</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClasses}>Batch</label>
                  <input
                    type="text"
                    name="batch"
                    disabled={!isEditing}
                    value={formData.batch}
                    onChange={(e) =>
                      setFormData({ ...formData, batch: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {/* Social Profiles */}
            <div className="space-y-6">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                <FiCode className="text-indigo-500" /> Social Profiles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className={labelClasses}>GitHub Profile</label>
                  <div className="relative">
                    <FiGithub className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="url"
                      name="github"
                      disabled={!isEditing}
                      value={formData.github}
                      onChange={(e) =>
                        setFormData({ ...formData, github: e.target.value })
                      }
                      className={`${inputClasses} pl-10`}
                      placeholder="https://github.com/username"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClasses}>LinkedIn Profile</label>
                  <div className="relative">
                    <FiLinkedin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
                    <input
                      type="url"
                      name="linkedin"
                      disabled={!isEditing}
                      value={formData.linkedin}
                      onChange={(e) =>
                        setFormData({ ...formData, linkedin: e.target.value })
                      }
                      className={`${inputClasses} pl-10`}
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className={labelClasses}>Codeforces Handle</label>
                  <input
                    type="text"
                    name="codeforces"
                    disabled={!isEditing}
                    value={formData.codeforces}
                    onChange={(e) =>
                      setFormData({ ...formData, codeforces: e.target.value })
                    }
                    className={inputClasses}
                  />
                </div>
              </div>
            </div>

            {isEditing && (
              <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-200 dark:border-gray-700">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 
                    rounded-lg hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-300 
                    dark:border-gray-600 dark:hover:bg-gray-700"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="px-4 py-2 text-white bg-gradient-to-r from-indigo-500 
                    to-purple-600 rounded-lg hover:from-indigo-600 hover:to-purple-700 
                    transition-all duration-200 shadow-sm hover:shadow-indigo-500/25"
                >
                  Save Changes
                </motion.button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
