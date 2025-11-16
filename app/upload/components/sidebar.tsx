"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Upload,
  FolderSearch,
  Search,
  Settings,
} from "lucide-react";

export function Sidebar() {
  const pathname = usePathname();

  const menu = [
    { name: "Documents", href: "/documents", icon: FolderSearch },
    { name: "Upload", href: "/upload", icon: Upload },
    { name: "Search", href: "/search", icon: Search },
    // { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-gradient-to-b from-black via-gray-900 to-black border-r border-white/10 hidden md:flex flex-col shadow-xl">

      {/* Logo Area */}
      <Link href={'/'}>
        <div className="p-6 font-bold text-2xl bg-gradient-to-r from-purple-400 to-blue-400 text-transparent bg-clip-text">
        InsightSphere
      </div>
      </Link>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-6">
        {menu.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 p-3 rounded-lg mb-2 transition-all duration-200
                ${
                  isActive
                    ? "bg-gradient-to-r from-purple-600/40 to-blue-600/40 text-white border border-purple-400/20 shadow-lg"
                    : "text-gray-400 hover:bg-gray-800/60 hover:text-white"
                }
              `}
            >
              <Icon
                className={`w-5 h-5 ${
                  isActive ? "text-purple-300" : "text-gray-500"
                }`}
              />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 text-gray-500 text-sm border-t border-white/10">
        © 2025 InsightSphere
      </div>
    </aside>
  );
}
