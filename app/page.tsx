'use client';

import { HeroSection } from '@/components/sections/hero-section';
import { DashboardPreview } from '@/components/sections/dashboard-preview';
import { TechnologySection } from '@/components/sections/technology-section';
import { FeaturesSection } from '@/components/sections/features-section';
import { PricingSection } from '@/components/sections/pricing-section';
import { CreditSystemSection } from '@/components/sections/credit-system-section';
import { TestimonialsSection } from '@/components/sections/testimonials-section';
import { Footer } from '@/components/sections/footer';
import { Navbar } from '@/components/sections/navbar';

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <DashboardPreview />
      <TechnologySection />
      <FeaturesSection />
      <PricingSection />
      <CreditSystemSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
