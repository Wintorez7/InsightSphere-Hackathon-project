'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';

export function PricingSection() {
  return (
    <section id="pricing" className="py-32 px-6 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Subscription
          </h2>
          <p className="text-gray-400">Manage your subscription plan and billing</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          <Card className="bg-gradient-to-br from-gray-900 to-gray-950 border-white/10">
            <CardHeader className="border-b border-white/10">
              <CardTitle className="text-2xl text-white">Free</CardTitle>
              <p className="text-sm text-gray-400">Perfect for occasional job applications</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="text-5xl font-bold text-white mb-2">$0</div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">5 resume analyses per day</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Basic match scoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Key skills identification</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Resume storage</span>
                </div>
              </div>

              <Button
                className="w-full bg-gray-700 text-white hover:bg-gray-600"
                size="lg"
                disabled
              >
                Current Plan
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-gray-900 to-black border-white/20 relative overflow-hidden">
            <div className="absolute top-4 right-4">
              <Badge className="bg-red-500 text-white border-0">
                -50%
              </Badge>
            </div>
            <Badge className="absolute top-4 left-8 bg-white text-black border-0 px-4 py-1">
              Most Popular
            </Badge>

            <CardHeader className="border-b border-white/10 pt-16">
              <CardTitle className="text-2xl text-white">Pro</CardTitle>
              <p className="text-sm text-gray-400">For serious job seekers</p>
            </CardHeader>
            <CardContent className="p-8">
              <div className="mb-8">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl text-gray-400 line-through">$9.99/month</span>
                </div>
                <div className="text-5xl font-bold text-green-400">$5<span className="text-2xl text-gray-400">/month</span></div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">25 resume analyses per day</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Advanced match scoring</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Detailed keyword optimization</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Priority support</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Export to PDF</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Application tracker (coming soon)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Cover letter generator (coming soon)</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Personalized email templates (coming soon)</span>
                </div>
              </div>

              <Button
                className="w-full bg-white text-black hover:bg-gray-100"
                size="lg"
              >
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
