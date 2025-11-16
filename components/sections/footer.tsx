'use client';

import { Separator } from '@/components/ui/separator';
import { Search } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Search className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold text-white">InsightSphere</span>
            </div>
            <p className="text-sm text-gray-400">
              AI-powered knowledge discovery and internal search platform for modern teams.
            </p>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">PRODUCT</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Pricing</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">API</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Documentation</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Blog</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Community</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Careers</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Terms</a></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © 2025 InsightSphere. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">Twitter</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
