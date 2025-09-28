'use client';

import React from 'react';
import Navigation from '../../../src/components/Navigation';
import ProductPage from '../../../src/components/ProductPage';
import Footer from '../../../src/components/Footer';
import { getProductById } from '../../../src/data/products';

/**
 * WHAT: Amanar Ratings product page
 * WHY: Detailed information about the ratings product
 * FUTURE: Will include dynamic pricing and signup flows
 */

export default function AmanarRatings() {
  const product = getProductById('amanar-ratings');
  
  if (!product) {
    return (
      <div className="min-h-screen bg-white text-gray-900">
        <Navigation />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <h1 className="text-4xl font-semibold mb-4">Product Not Found</h1>
            <p className="text-gray-600">The requested product could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      <ProductPage product={product} />
      <Footer />
    </div>
  );
}
