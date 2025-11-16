'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Zap, XCircle, TrendingUp } from 'lucide-react';

export function CreditSystemSection() {
  return (
    <section className="py-32 px-6 bg-gradient-to-b from-black via-gray-950 to-black">
      <div className="max-w-6xl mx-auto">
        <Card className="bg-gray-900/50 border-white/10">
          <CardHeader className="border-b border-white/10">
            <CardTitle className="text-2xl text-white">Credit System Explained</CardTitle>
            <p className="text-sm text-gray-400">How your credits work</p>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Daily Reset</h3>
                      <p className="text-sm text-gray-400">
                        Free users get 5 credits per day, while Premium users get 25 credits per day.
                        Credits reset at midnight.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-5 h-5 text-orange-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">Credit Usage</h3>
                      <p className="text-sm text-gray-400">
                        Each resume analysis costs 1 credit. Premium users get higher quality
                        analyses and more detailed feedback.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
                      <XCircle className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-2">No Accumulation</h3>
                      <p className="text-sm text-gray-400">
                        Unused credits don't roll over to the next day. Each day starts fresh
                        with your maximum credit allocation.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/30 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Pro Tip</h3>
                    <p className="text-sm text-gray-300">
                      Premium users get 5x more daily analyses (25 vs 5) and access to advanced features like
                      detailed keyword optimization and PDF exports. Upgrade today to maximize your job search success!
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
