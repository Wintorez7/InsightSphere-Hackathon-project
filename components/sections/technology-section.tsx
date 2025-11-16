'use client';

import { Brain, Zap } from 'lucide-react';

export function TechnologySection() {
  return (
    <section className="py-32 px-6 bg-black">
      <div className="max-w-4xl mx-auto text-center">
        <p className="text-sm text-gray-400 uppercase tracking-wider mb-4">
          Built with Advanced Technology
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Powered by Industry-Leading AI
        </h2>
        <p className="text-lg text-gray-400 mb-16 max-w-2xl mx-auto">
          InsightSphere combines cutting-edge AI models and robust cloud infrastructure
          to deliver accurate semantic search and intelligent document indexing
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 border border-white/10 flex items-center justify-center mb-4">
              <Brain className="w-12 h-12 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">AI Embeddings</h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Advanced neural networks for semantic understanding
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-amber-900/30 to-amber-800/20 border border-amber-500/30 flex items-center justify-center mb-4">
              <Zap className="w-12 h-12 text-amber-400" />
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Vector Search</h3>
            <p className="text-sm text-gray-400 text-center max-w-xs">
              Lightning-fast similarity matching across millions of documents
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
