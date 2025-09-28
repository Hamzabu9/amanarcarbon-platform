import React from 'react';
import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github } from 'lucide-react';

/**
 * Enhanced Footer Component - Comprehensive Site Navigation and Information
 * 
 * Footer serves multiple business functions:
 * - SEO value through internal linking structure
 * - Legal compliance (privacy, terms, usage guidelines)
 * - Company information and contact paths
 * - Product discovery through organized links
 * - Social proof and contact information
 * 
 * Structure rationale:
 * - Multi-column layout provides clear information hierarchy
 * - Brand reinforcement through logo and description repetition
 * - Link organization matches user mental models
 * - Responsive design ensures usability on all devices
 * - Contact information builds trust and accessibility
 */
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand and company description */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="size-8 rounded-xl bg-emerald-600" />
              <span className="text-xl font-bold tracking-tight">Amanar Carbon</span>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Comprehensive carbon management platform with three main products: Carbon Marketplace, Climate Risk Intelligence, and Impact & Engagement Hub.
            </p>
            
            {/* Contact Information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Mail className="size-4 text-emerald-500" />
                <span>contact@amanarcarbon.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <Phone className="size-4 text-emerald-500" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-300">
                <MapPin className="size-4 text-emerald-500" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>
          
          {/* Company information links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Company</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/about" className="hover:text-emerald-400 transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-emerald-400 transition-colors">Contact</Link></li>
              <li><Link href="/careers" className="hover:text-emerald-400 transition-colors">Careers</Link></li>
              <li><Link href="/insights" className="hover:text-emerald-400 transition-colors">Blog & Insights</Link></li>
              <li><Link href="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link></li>
            </ul>
          </div>
          
          {/* Products and Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Products</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/products/carbon-marketplace" className="hover:text-emerald-400 transition-colors">Carbon Marketplace</Link></li>
              <li><Link href="/products/climate-risk-intelligence" className="hover:text-emerald-400 transition-colors">Climate Risk Intelligence</Link></li>
              <li><Link href="/products/impact-engagement-hub" className="hover:text-emerald-400 transition-colors">Impact & Engagement Hub</Link></li>
              <li><Link href="/calculator" className="hover:text-emerald-400 transition-colors">Carbon Calculator</Link></li>
              <li><Link href="/pricing" className="hover:text-emerald-400 transition-colors">Pricing</Link></li>
            </ul>
          </div>
          
          {/* Resources and Legal */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-white">Resources</h4>
            <ul className="space-y-3 text-gray-300 mb-6">
              <li><Link href="/insights" className="hover:text-emerald-400 transition-colors">Research & Insights</Link></li>
              <li><Link href="/case-studies" className="hover:text-emerald-400 transition-colors">Case Studies</Link></li>
              <li><Link href="/documentation" className="hover:text-emerald-400 transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-emerald-400 transition-colors">API Access</Link></li>
            </ul>
            
            <h4 className="text-lg font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-3 text-gray-300">
              <li><Link href="/privacy" className="hover:text-emerald-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-emerald-400 transition-colors">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-emerald-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        {/* Social Media and Newsletter */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Social Media Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-400">Follow us:</span>
              <div className="flex items-center gap-3">
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-emerald-600 transition-colors">
                  <Twitter className="size-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-emerald-600 transition-colors">
                  <Linkedin className="size-4" />
                </a>
                <a href="#" className="p-2 rounded-lg bg-gray-800 hover:bg-emerald-600 transition-colors">
                  <Github className="size-4" />
                </a>
              </div>
            </div>
            
            {/* Newsletter Signup */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-400">Stay updated:</span>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                />
                <button className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>&copy; 2024 Amanar Carbon. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <span>Made with ❤️ for the planet</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                <span>Carbon neutral hosting</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}