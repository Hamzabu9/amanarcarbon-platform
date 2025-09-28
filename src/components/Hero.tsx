import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SatelliteGlobe from './SatelliteGlobe';

/**
 * Hero Section Component
 * 
 * This is the primary conversion section of the landing page.
 * Design strategy:
 * - Animated headline draws attention and creates professional impression
 * - Two-column layout balances text content with visual elements
 * - Dual CTA approach: primary (platform exploration) and secondary (ratings)
 * - Stats grid builds credibility through specific numbers
 * - Visual placeholder prepared for future interactive elements (maps, charts, etc.)
 * 
 * Conversion optimization:
 * - Primary headline focuses on trust (core market need in carbon credits)
 * - Descriptive text explains what the platform does without jargon
 * - Multiple engagement paths accommodate different user intents
 * - Statistics provide concrete proof points for enterprise buyers
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10">
        {/* Content Column */}
        <div>
          {/* Animated headline - motion.h1 creates professional entrance effect */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold tracking-tight"
          >
            Accelerate your carbon strategy
          </motion.h1>
          
          {/* Value proposition - explains what we do and why it matters */}
          <p className="mt-4 text-gray-600 md:text-lg leading-relaxed">
            AmanarCarbon provides a comprehensive platform with three main products: Carbon Marketplace for buying and selling credits, Climate Risk Intelligence for AI-powered risk assessment, and Impact & Engagement Hub for community-driven climate action.
          </p>
          
          {/* CTA Buttons - Primary and secondary actions */}
          <div className="mt-6 flex flex-wrap gap-3">
            <a 
              href="/products" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
            >
              Explore our products <ArrowRight className="size-4" />
            </a>
            <a 
              href="/calculator" 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-300 font-medium hover:bg-gray-50 transition-colors"
            >
              Calculate your footprint
            </a>
          </div>
          
          {/* Statistics Grid - Social proof through numbers */}
          <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
            {[
              { k: "3", v: "main products" },
              { k: "AI-powered", v: "risk assessment" },
              { k: "Global", v: "marketplace" },
            ].map((metric) => (
              <div key={metric.v} className="rounded-2xl p-4 bg-gray-50">
                <div className="text-xl font-semibold">{metric.k}</div>
                <div className="text-gray-600">{metric.v}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Visual Column - Interactive Satellite Globe */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden border border-gray-200"
          >
            <SatelliteGlobe />
          </motion.div>
          
          {/* Live telemetry indicator - builds trust in real-time monitoring */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute right-4 bottom-4 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-lg border border-gray-200"
          >
            <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <div className="text-xs font-medium text-gray-700">Live satellite data</div>
            </div>
            <div className="text-[10px] text-gray-500">real-time • verified • global</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}