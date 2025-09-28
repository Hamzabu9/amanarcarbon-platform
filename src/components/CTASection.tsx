import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Call-to-Action Section with Lead Capture Form
 * 
 * This is the primary conversion point for the landing page.
 * Design strategy:
 * - Dark background creates visual prominence and urgency
 * - Two-column layout balances persuasive copy with form
 * - Form styling maintains brand consistency while standing out
 * - Button uses contrasting color for maximum visibility
 * 
 * Form field strategy:
 * - Minimal fields reduce friction while capturing qualification data
 * - Company email and name help with lead scoring
 * - First/last name personalization for follow-up communications
 * 
 * Future integration points:
 * - Form will connect to CRM (HubSpot, Salesforce)
 * - Email automation sequences for nurturing
 * - Lead scoring based on company size/industry
 */
export default function CTASection() {
  return (
    <section id="cta" className="bg-emerald-700 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        {/* Persuasive copy column */}
        <div>
          <h2 className="text-3xl font-semibold tracking-tight">
            Bring trust to your carbon strategy
          </h2>
          <p className="mt-2 text-emerald-100">
            Request a walkthrough of Amanar Ratings, Monitor, Registry Analytics and Portfolio Studio.
          </p>
        </div>
        
        {/* Lead capture form */}
        <form className="bg-white/5 backdrop-blur rounded-2xl p-6 grid grid-cols-1 gap-4">
          {/* Form fields designed for easy completion and data capture */}
          <input 
            className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-emerald-500" 
            placeholder="First name"
            type="text"
            required
          />
          <input 
            className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-emerald-500" 
            placeholder="Last name"
            type="text"
            required
          />
          <input 
            className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-emerald-500" 
            placeholder="Company email"
            type="email"
            required
          />
          <input 
            className="px-4 py-2 rounded-xl bg-white text-gray-900 placeholder:text-gray-400 border-0 focus:ring-2 focus:ring-emerald-500" 
            placeholder="Company name"
            type="text"
            required
          />
          
          {/* Primary submission button */}
          <button 
            type="submit"
            className="mt-2 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-black font-semibold hover:bg-gray-900 transition-colors"
          >
            Book a demo <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </section>
  );
}