"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { IconType } from "react-icons";
import {
  FiHome,
  FiAward,
  FiBook,
  FiCalendar,
  FiSettings,
  FiUsers,
  FiBarChart,
} from "react-icons/fi";
import CPCLogo from "@/assets/images/CPC-Logo.png";

interface SidebarItem {
  icon: IconType;
  label: string;
  href: string;
  description?: string;
}

const sidebarItems: SidebarItem[] = [
  {
    icon: FiHome,
    label: "Overview",
    href: "/dashboard",
    description: "Dashboard overview and statistics",
  },
  {
    icon: FiCalendar,
    label: "Events",
    href: "/dashboard/events",
    description: "Manage upcoming events",
  },
  {
    icon: FiAward,
    label: "Contests",
    href: "/dashboard/contests",
    description: "Organize programming contests",
  },
  {
    icon: FiBook,
    label: "Resources",
    href: "/dashboard/resources",
    description: "Learning materials and guides",
  },
  {
    icon: FiUsers,
    label: "Users",
    href: "/dashboard/users",
    description: "Manage user accounts",
  },
  {
    icon: FiSettings,
    label: "Settings",
    href: "/dashboard/settings",
    description: "System configurations",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo Section */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-gray-200 dark:border-gray-700">
        <Image
          src={CPCLogo}
          alt="CPC Logo"
          width={40}
          height={40}
          className="h-8 w-auto"
        />
        <div>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white">
            CPC Dashboard
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Admin Panel
          </p>
        </div>
      </div>

      {/* Navigation Section */}
      <nav className="flex-1 overflow-y-auto p-4">
        <div className="space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 
                  ${isActive
                    ? "bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50"
                  }`}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className={`p-2 rounded-lg transition-colors duration-200 
                      ${isActive
                        ? "bg-indigo-100 dark:bg-indigo-900/50"
                        : "bg-gray-100 dark:bg-gray-800 group-hover:bg-gray-200 dark:group-hover:bg-gray-700"
                      }`}
                  >
                    <item.icon
                      className={`h-5 w-5 transition-colors duration-200 
                        ${isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-500 dark:text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                        }`}
                    />
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-medium ${isActive
                          ? "text-indigo-600 dark:text-indigo-400"
                          : "text-gray-700 dark:text-gray-200"
                        }`}
                    >
                      {item.label}
                    </p>
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5 hidden group-hover:block">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                {isActive && (
                  <div className="w-1.5 h-8 bg-indigo-600 dark:bg-indigo-400 rounded-full" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer Section */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <FiBarChart className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Analytics
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                View detailed stats
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
