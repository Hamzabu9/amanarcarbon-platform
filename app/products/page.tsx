'use client';

import React from 'react';
import Navigation from '../../src/components/Navigation';
import ProductsOverview from '../../src/components/ProductsOverview';
import Footer from '../../src/components/Footer';

/**
 * WHAT: Products overview page for the AmanarCarbon platform
 * WHY: Showcases all platform products and services
 * FUTURE: Will include dynamic product management and pricing
 */

export default function Products() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <ProductsOverview onNavigate={() => {}} />
      <Footer />
    </div>
  );
}
