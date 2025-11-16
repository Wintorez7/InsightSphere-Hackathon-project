'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  FileText,
  TrendingUp,
  BarChart3,
  Search,
  Plus,
  ArrowUpRight
} from 'lucide-react';

export function DashboardPreview() {
  return (
    <section className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <Card className="bg-gradient-to-br from-gray-900 to-black border-white/10 shadow-2xl overflow-hidden">
          <CardHeader className="border-b border-white/10 p-6">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl text-white mb-1">Dashboard</CardTitle>
                <p className="text-sm text-gray-400">Welcome back, Sarah</p>
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Upgrade to Premium
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  New Analysis
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Total Analyses</span>
                    <FileText className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">1,247</div>
                  <p className="text-xs text-green-400 mt-2">+12% from previous period</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Average Match Score</span>
                    <TrendingUp className="w-5 h-5 text-green-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">85%</div>
                  <p className="text-xs text-green-400 mt-2">Across all analyses</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Improvement Rate</span>
                    <BarChart3 className="w-5 h-5 text-orange-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">10%</div>
                  <p className="text-xs text-orange-400 mt-2">Score improvement rate</p>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-gray-400">Top Job Category</span>
                    <Search className="w-5 h-5 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold text-white">Web</div>
                  <p className="text-xs text-purple-400 mt-2">Most analyzed job type</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="bg-gray-800/50 border-white/10">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-lg text-white">Account Status</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Credits</span>
                    <span className="text-white font-semibold">0 / 5</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Credit Type</span>
                    <span className="text-white font-semibold">Daily</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Next Reset</span>
                    <span className="text-white font-semibold">May 24, 2025 at midnight</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Uploaded Resumes</span>
                    <span className="text-white font-semibold">1</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-lg text-white flex items-center justify-between">
                    Recent Analyses
                    <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                      View All
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-white/10">
                    {[
                      { title: 'Web Developer Internship', date: '5/23/2025', score: 88 },
                      { title: 'Software Engineer', date: '5/23/2025', score: 92 },
                      { title: 'Software Engineer', date: '5/23/2025', score: 88 },
                      { title: 'Mobile Developer', date: '5/23/2025', score: 85 },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 hover:bg-white/5 transition-colors">
                        <div className="flex-1">
                          <p className="text-white text-sm font-medium">{item.title}</p>
                          <p className="text-gray-400 text-xs">{item.date}</p>
                        </div>
                        <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                          {item.score}%
                        </Badge>
                        <Button size="icon" variant="ghost" className="ml-2">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-gray-800/50 border-white/10">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-lg text-white">Match Score Distribution</CardTitle>
                </CardHeader>
                <CardContent className="p-6 flex items-center justify-center">
                  <div className="relative w-64 h-64">
                    <svg viewBox="0 0 100 100" className="transform -rotate-90">
                      <circle cx="50" cy="50" r="40" fill="none" stroke="#1f2937" strokeWidth="12" />
                      <circle
                        cx="50"
                        cy="50"
                        r="40"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        strokeDasharray="175 251"
                        strokeLinecap="round"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#f59e0b" />
                          <stop offset="50%" stopColor="#ef4444" />
                          <stop offset="100%" stopColor="#10b981" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-white">70%</div>
                        <div className="text-xs text-gray-400">High Match</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800/50 border-white/10">
                <CardHeader className="border-b border-white/10">
                  <CardTitle className="text-lg text-white">Analysis Timeline</CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="h-48 flex items-end justify-between gap-2">
                    {[20, 35, 45, 30, 55, 40, 65, 50, 75, 60, 85, 95].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm hover:opacity-80 transition-opacity"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
