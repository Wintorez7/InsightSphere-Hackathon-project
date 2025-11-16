'use client';

import Link from "next/link";
import { Search } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <Search className="w-6 h-6 text-blue-400" />
            <Link href="/">
              <span className="text-xl font-bold hover:opacity-80 transition">
                InsightSphere
              </span>
            </Link>
          </div>

          {/* NAVIGATION */}
          <div className="hidden md:flex items-center gap-10">

            <a href="#how-it-works" className="text-sm text-gray-400 hover:text-white transition-colors">
              How it works
            </a>

            <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">
              Features
            </a>

            {/* Upload direct page */}
            <a href="#pricing" className="text-sm text-gray-400 hover:text-white transition-colors">
              Pricing
            </a>

            {/* Dropdown Menu - ShadCN */}
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="text-sm text-gray-400 hover:text-white">
                    More
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="bg-white text-black p-4 rounded-md shadow-xl">
                    <div className="grid gap-2 w-[200px]">
                       <Link href="/documents" className="hover:bg-gray-100 p-2 rounded">
                        Documents
                      </Link>
                      <Link href="/search" className="hover:bg-gray-100 p-2 rounded">
                        Ai Search
                      </Link>
                      {/* Upload direct page */}
                      <Link href="/upload" className="hover:bg-gray-100 p-2 rounded">
                        Upload Docs
                      </Link>
                    
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

          </div>

          
        </div>
      </div>
    </nav>
  );
}
