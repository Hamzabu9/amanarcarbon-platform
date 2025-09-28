'use client';

import React from 'react';
import Navigation from '../../src/components/Navigation';
import AboutPage from '../../src/components/AboutPage';
import Footer from '../../src/components/Footer';

/**
 * WHAT: About page for the AmanarCarbon platform
 * WHY: Provides company information, team details, and mission statement
 * FUTURE: Will include dynamic content management and user testimonials
 */

export default function About() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <AboutPage />
      <Footer />
    </div>
  );
}
