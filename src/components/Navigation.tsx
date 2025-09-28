/**
 * Enhanced Navigation Component
 * 
 * This component provides comprehensive site navigation including:
 * - Main navigation menu
 * - Mobile-responsive hamburger menu
 * - Product dropdown with individual product links
 * - Smooth transitions and animations
 * - Active state management for current page
 */

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Menu, X, ChevronDown } from 'lucide-react';
import { products } from '../data/products';

interface NavigationProps {
  currentPage?: string;
  onNavigate?: (page: string) => void;
}

export default function Navigation({ onNavigate }: NavigationProps) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);

  const navigationItems = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Calculator', href: '/calculator' },
    { label: 'Insights', href: '/insights' },
    { label: 'Contact', href: '/contact' }
  ];

  const handleNavigation = (page: string) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsMobileMenuOpen(false);
    setIsProductsDropdownOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo and Brand */}
        <button 
          onClick={() => handleNavigation('home')}
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
        >
          <div className="size-7 rounded-xl bg-emerald-600" />
          <span className="font-semibold tracking-tight">Amanar Carbon</span>
        </button>
        
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 text-sm">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`hover:text-emerald-600 transition-colors ${
                pathname === item.href ? 'text-emerald-600 font-medium' : 'text-gray-700'
              }`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Products Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
              className="flex items-center gap-1 hover:text-emerald-600 transition-colors text-gray-700"
            >
              Products <ChevronDown className="size-4" />
            </button>
            
            {isProductsDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-200 p-4 z-50">
                <div className="grid gap-2">
                  {products.map((product) => {
                    const ProductIcon = product.icon;
                    return (
                      <Link
                        key={product.id}
                        href={`/products/${product.id}`}
                        className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                      >
                        <div className="p-2 rounded-lg bg-emerald-100 text-emerald-600">
                          <ProductIcon className="size-4" />
                        </div>
                        <div>
                          <div className="font-medium text-sm">{product.title}</div>
                          <div className="text-xs text-gray-600 leading-relaxed">
                            {product.description.slice(0, 80)}...
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
                <div className="border-t border-gray-200 mt-4 pt-4">
                  <Link
                    href="/products"
                    className="flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    View All Products <ArrowRight className="size-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
        
        {/* Desktop CTA Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button className="text-sm font-medium px-3 py-2 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
            Log in
          </button>
          <button className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
            Book a demo <ArrowRight className="size-4" />
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <nav className="space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block w-full text-left py-2 text-base ${
                    pathname === item.href ? 'text-emerald-600 font-medium' : 'text-gray-700'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile Products Section */}
              <div className="border-t border-gray-200 pt-4">
                <div className="text-sm font-medium text-gray-900 mb-3">Products</div>
                <div className="space-y-2 pl-4">
                  {products.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="block w-full text-left py-1 text-sm text-gray-600 hover:text-emerald-600 transition-colors"
                    >
                      {product.title}
                    </Link>
                  ))}
                </div>
              </div>
              
              {/* Mobile CTA Buttons */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <button className="w-full text-sm font-medium px-4 py-3 rounded-xl border border-gray-300 hover:bg-gray-50 transition-colors">
                  Log in
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold px-4 py-3 rounded-xl bg-emerald-600 text-white hover:bg-emerald-700 transition-colors">
                  Book a demo <ArrowRight className="size-4" />
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
      
      {/* Dropdown Overlay */}
      {isProductsDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsProductsDropdownOpen(false)}
        />
      )}
    </header>
  );
}