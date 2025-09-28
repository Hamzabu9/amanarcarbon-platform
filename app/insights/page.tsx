'use client';

import React from 'react';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';

export default function Insights() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white text-gray-900">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-6">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
            Coming Soon
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Insights & Research
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're preparing comprehensive insights on carbon markets, climate technology, and sustainable business practices. Stay tuned for our research and analysis.
          </p>
        </div>

        {/* Coming Soon Content */}
        <div className="text-center py-16">
          <div className="max-w-2xl mx-auto">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <div className="w-12 h-12 bg-emerald-600 rounded-full flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Content Coming Soon</h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We're working hard to bring you the latest insights, research, and analysis on carbon markets and climate technology. Our team of experts is preparing comprehensive content to help you stay informed and make better decisions.
            </p>
            <div className="bg-gray-50 rounded-2xl p-8 mb-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">What to Expect</h3>
              <div className="grid sm:grid-cols-2 gap-4 text-left">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Market analysis and trends</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Technology insights</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Policy updates</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2"></div>
                  <span className="text-gray-700">Case studies</span>
                </div>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="bg-emerald-600 rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Get Notified</h3>
              <p className="text-emerald-100 mb-6">
                Be the first to know when we publish new insights and research.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border-0 rounded-xl focus:outline-none focus:ring-2 focus:ring-white/50 text-base bg-white/90"
                />
                <button className="bg-white text-emerald-600 px-6 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-all duration-200 hover:scale-105 shadow-md">
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}