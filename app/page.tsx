'use client';

import React from 'react';
import Navigation from '../src/components/Navigation';
import TopNotice from '../src/components/TopNotice';
import Hero from '../src/components/Hero';
import ValueProps from '../src/components/ValueProps';
import Products from '../src/components/Products';
import PlatformFeatures from '../src/components/PlatformFeatures';
import Testimonials from '../src/components/Testimonials';
import { Highlights, Insights } from '../src/components/ContentSections';
import TrustSection from '../src/components/TrustSection';
import CTASection from '../src/components/CTASection';
import LeadCaptureForm from '../src/components/LeadCaptureForm';
import Footer from '../src/components/Footer';

/**
 * WHAT: Homepage component for the AmanarCarbon platform
 * WHY: Serves as the main landing page with conversion funnel and product showcase
 * FUTURE: Will include authentication state, personalized content, and analytics tracking
 */

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Enhanced navigation system */}
      <Navigation />
      
      <TopNotice />
      <main>
        <Hero />
        <ValueProps />
        <Products />
        <PlatformFeatures />
        <Testimonials />
        <Highlights />
        <Insights />
        <TrustSection />
        <CTASection />
        <div className="py-16">
          <LeadCaptureForm />
        </div>
      </main>
      
      {/* Global footer */}
      <Footer />
    </div>
  );
}
