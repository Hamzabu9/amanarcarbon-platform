import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Header Component - Public Site Navigation
 * 
 * This component serves as the main navigation for the public website.
 * Design decisions:
 * - Sticky positioning ensures navigation is always accessible
 * - Backdrop blur creates modern glass effect while maintaining readability
 * - Logo and branding positioned prominently for brand recognition
 * - Login button hidden on mobile to prioritize CTA (Book a demo)
 * - Navigation links use hash routing for single-page experience
 * 
 * Future considerations:
 * - Login button will eventually route to authentication system
 * - Navigation structure prepared for additional pages/sections
 * - Mobile menu can be added when site grows beyond current scope
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand Identity */}
        <div className="flex items-center gap-3">
          {/* Simple colored square as logo - easily replaceable with actual brand asset */}
          <div className="size-7 rounded-xl bg-emerald-600" />
          <span className="font-semibold tracking-tight">Amanar Carbon</span>
        </div>
        
        {/* Desktop Navigation - Hidden on mobile to reduce clutter */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-gray-700 transition-colors" href="#ratings">Ratings</a>
          <a className="hover:text-gray-700 transition-colors" href="#products">Products</a>
          <a className="hover:text-gray-700 transition-colors" href="#methodology">Methodology</a>
          <a className="hover:text-gray-700 transition-colors" href="#insights">Insights</a>
        </nav>
        
        {/* CTA Section - Login and Demo Request */}
        <div className="flex items-center gap-3">
          {/* Login button - hidden on small screens to prioritize demo CTA */}
          <button className="hidden sm:inline-flex text-sm font-medium px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
            Log in
          </button>
          
          {/* Primary CTA - Most important action for lead generation */}
          <button className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            Book a demo <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </header>
  );
}