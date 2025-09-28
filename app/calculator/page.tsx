'use client';

import React from 'react';
import Navigation from '../../src/components/Navigation';
import CarbonCalculator from '../../src/components/CarbonCalculator';
import Footer from '../../src/components/Footer';

/**
 * WHAT: Carbon calculator page for the AmanarCarbon platform
 * WHY: Provides interactive emissions calculator for users
 * FUTURE: Will include AI recommendations and offset purchasing
 */

export default function Calculator() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <CarbonCalculator />
      <Footer />
    </div>
  );
}
