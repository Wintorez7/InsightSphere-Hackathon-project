'use client';

import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-orange-500/20 to-blue-600/30 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-black to-black" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <Badge
          variant="secondary"
          className="mb-8 px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
        >
          <span className="flex items-center gap-2">
            AI-Powered Knowledge Discovery
            <ArrowRight className="w-4 h-4" />
          </span>
        </Badge>

        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          Find Anything From{' '}
          <span className="bg-gradient-to-r from-purple-400 via-orange-400 to-blue-400 text-transparent bg-clip-text">
            Any Document
          </span>{' '}
          — Instantly.
        </h1>

        <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed">
          Transform your document search with semantic AI-powered indexing.
          Find exactly what you need across thousands of files in milliseconds.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-100 text-lg px-8 py-6 rounded-full font-semibold"
          >
            Get Started Free
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/20 text-black hover:bg-white/10 hover:text-white text-lg px-8 py-6 rounded-full font-semibold"
          >
            Try Demo Search
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
