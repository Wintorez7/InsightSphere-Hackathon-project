'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Upload,
  FileSearch,
  Search,
  Tag,
  FileText,
  Link2,
  BarChart3,
  Sparkles
} from 'lucide-react';

const features = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description: 'Support for PDF, DOCX, TXT and more. Drag and drop or bulk upload thousands of files instantly.',
    color: 'text-blue-400'
  },
  {
    icon: FileSearch,
    title: 'AI Text Extraction',
    description: 'Advanced OCR and text extraction that works with scanned documents and complex layouts.',
    color: 'text-purple-400'
  },
  {
    icon: Search,
    title: 'Semantic Vector Search',
    description: 'Find documents by meaning, not just keywords. Our AI understands context and intent.',
    color: 'text-orange-400'
  },
  {
    icon: Tag,
    title: 'Auto Tagging',
    description: 'Automatically categorize and tag documents based on content with AI-powered classification.',
    color: 'text-green-400'
  },
  {
    icon: FileText,
    title: 'Smart Document Summaries',
    description: 'Get instant AI-generated summaries of lengthy documents to save time and boost productivity.',
    color: 'text-pink-400'
  },
  {
    icon: Link2,
    title: 'Related Content Suggestions',
    description: 'Discover connections between documents you never knew existed with intelligent linking.',
    color: 'text-cyan-400'
  },
  {
    icon: BarChart3,
    title: 'Dashboard Analytics',
    description: 'Track search patterns, document usage, and team collaboration with comprehensive insights.',
    color: 'text-yellow-400'
  },
  {
    icon: Sparkles,
    title: 'AI-Powered Insights',
    description: 'Uncover hidden patterns and trends across your document library with machine learning.',
    color: 'text-red-400'
  }
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
              Master Your Documents
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Powerful features designed to transform how you discover, organize, and leverage your knowledge base
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              className="bg-gray-900/50 border-white/10 hover:border-white/20 transition-all duration-300 hover:transform hover:scale-105 group"
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl bg-gray-800/50 flex items-center justify-center mb-4 group-hover:bg-gray-800 transition-colors`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>
                <CardTitle className="text-lg text-white">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
