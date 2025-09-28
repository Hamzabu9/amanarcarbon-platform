/**
 * Products Overview Page Component
 * 
 * This page provides a comprehensive overview of all Amanar Carbon products
 * in a single view, allowing users to compare features and choose the right
 * solution for their needs.
 */

import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { products } from '../data/products';

interface ProductsOverviewProps {
  onNavigate?: (page: string) => void;
}

export default function ProductsOverview({ onNavigate }: ProductsOverviewProps) {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-50 to-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900 mb-6">
              Complete Carbon Intelligence Platform
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              From independent ratings to real-time monitoring, our integrated suite of products 
              provides everything you need to make confident carbon decisions.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
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

      {/* Products Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => {
              const ProductIcon = product.icon;
              return (
                <div key={product.id} className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-3 rounded-xl bg-emerald-600 text-white">
                      <ProductIcon className="size-6" />
                    </div>
                    <h3 className="text-xl font-semibold">{product.title}</h3>
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-medium mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {product.features.slice(0, 4).map((feature, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="size-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <button
                    onClick={() => onNavigate?.(`product-${product.id}`)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-semibold hover:bg-emerald-700 transition-colors"
                  >
                    Learn More <ArrowRight className="size-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold mb-4">Integrated Platform Benefits</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our products work together seamlessly to provide a complete view of your carbon portfolio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Assess</h3>
              <p className="text-sm text-gray-600">Use Ratings and Scorecards to evaluate project quality</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">Monitor</h3>
              <p className="text-sm text-gray-600">Track performance with real-time satellite monitoring</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Analyze</h3>
              <p className="text-sm text-gray-600">Aggregate data with Registry Analytics and Portfolio Studio</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold">4</span>
              </div>
              <h3 className="font-semibold mb-2">Optimize</h3>
              <p className="text-sm text-gray-600">Get expert guidance with Advisory services</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-700 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-4">
            Ready to transform your carbon strategy?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Join leading organizations using our platform to make better carbon decisions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-emerald-600 font-semibold hover:bg-gray-50 transition-colors">
              Start Free Trial <ArrowRight className="size-5" />
            </button>
            <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/30 font-semibold hover:bg-white/10 transition-colors">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}