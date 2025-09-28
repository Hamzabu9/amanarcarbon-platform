/**
 * Individual Product Page Component
 * 
 * This component renders detailed information about a specific Amanar Carbon product.
 * It's designed to be reusable across all product pages while maintaining
 * consistent structure and styling.
 * 
 * Key features:
 * - Comprehensive product information display
 * - Interactive pricing tiers (when available)
 * - Call-to-action optimization for lead generation
 * - SEO-friendly structure with proper headings
 * - Responsive design for all device types
 */

import React from 'react';
import { ArrowRight, Check, Star } from 'lucide-react';
import { Product } from '../types';

interface ProductPageProps {
  product: Product;
}

export default function ProductPage({ product }: ProductPageProps) {
  const ProductIcon = product.icon;

  return (
    <div className="min-h-screen bg-white">
      {/* Product Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-emerald-600 text-white">
                <ProductIcon className="size-8" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
                  {product.title}
                </h1>
                <p className="text-emerald-600 font-medium mt-2">
                  Amanar Carbon Platform
                </p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              {product.description}
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors">
                Start Free Trial <ArrowRight className="size-5" />
              </button>
              <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-300 font-semibold hover:bg-gray-50 transition-colors">
                Schedule Demo
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Key Features */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Key Features</h2>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Check className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Benefits</h2>
              <ul className="space-y-4">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <Star className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Use Cases */}
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-gray-900">Use Cases</h2>
              <ul className="space-y-4">
                {product.useCases.map((useCase, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <ArrowRight className="size-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{useCase}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section (if available) */}
      {product.pricing && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-semibold mb-4">Pricing Plans</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Choose the plan that best fits your organization's needs. All plans include our core features with varying levels of access and support.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {product.pricing.map((tier, index) => (
                <div key={tier.tier} className={`rounded-2xl p-8 ${
                  index === 1 
                    ? 'bg-emerald-600 text-white ring-4 ring-emerald-600 ring-opacity-20' 
                    : 'bg-white border border-gray-200'
                }`}>
                  {index === 1 && (
                    <div className="text-center mb-4">
                      <span className="inline-block px-3 py-1 rounded-full bg-white/20 text-sm font-medium">
                        Most Popular
                      </span>
                    </div>
                  )}
                  
                  <h3 className="text-xl font-semibold mb-2">{tier.tier}</h3>
                  <div className="mb-6">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    {tier.price !== 'Custom' && <span className="text-sm opacity-75"> per month</span>}
                  </div>
                  
                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-3">
                        <Check className="size-4 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <button className={`w-full py-3 px-4 rounded-xl font-semibold transition-colors ${
                    index === 1
                      ? 'bg-white text-emerald-600 hover:bg-gray-50'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700'
                  }`}>
                    {tier.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to get started with {product.title}?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Join leading organizations using Amanar Carbon to make better carbon decisions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-600 font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial <ArrowRight className="size-5" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 font-semibold hover:bg-white/10 transition-colors">
              Schedule Demo
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}