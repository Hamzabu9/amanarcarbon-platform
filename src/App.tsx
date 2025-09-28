import React from 'react';
import { useState } from 'react';
import Navigation from './components/Navigation';
import TopNotice from './components/TopNotice';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Products from './components/Products';
import { Highlights, Insights } from './components/ContentSections';
import TrustSection from './components/TrustSection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import CarbonCalculator from './components/CarbonCalculator';
import ProductPage from './components/ProductPage';
import ProductsOverview from './components/ProductsOverview';
import { getProductById } from './data/products';

/**
 * Amanar Carbon Website - Main Application Component
 * 
 * Enhanced Architecture Overview:
 * This is the complete public-facing website for the Amanar Carbon platform,
 * designed as a comprehensive resource for potential customers in the voluntary carbon market.
 * 
 * Page Structure:
 * - Home: Landing page with conversion funnel
 * - About: Team, mission, and company story
 * - Products Overview: Complete product comparison
 * - Individual Product Pages: Detailed product information
 * - Carbon Calculator: Interactive emissions calculator
 * - Insights: Thought leadership content (placeholder)
 * 
 * Navigation System:
 * - Client-side routing for smooth user experience
 * - Responsive navigation with mobile menu
 * - Product dropdown with individual product access
 * - Breadcrumb navigation for complex pages
 * 
 * Technical Features:
 * - Framer Motion for micro-interactions and professional feel
 * - Tailwind CSS for consistent, maintainable styling
 * - Lucide React icons for lightweight, professional iconography
 * - Component-based architecture for maintainability and testing
 * - TypeScript for type safety and better developer experience
 * - Modular data management for easy content updates
 * 
 * Future Integration Points:
 * - Authentication system integration
 * - CMS integration for content management
 * - Analytics and tracking implementation
 * - A/B testing framework integration
 * - SEO optimization and meta tag management
 */
function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handleNavigation = (page: string) => {
    setCurrentPage(page);
    // Scroll to top when navigating to new page
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      
      case 'calculator':
        return <CarbonCalculator />;
      
      case 'products-overview':
        return <ProductsOverview onNavigate={handleNavigation} />;
      
      case 'insights':
        // Placeholder for insights page - can be expanded later
        return (
          <div className="min-h-screen bg-white flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-semibold mb-4">Insights Coming Soon</h1>
              <p className="text-gray-600 mb-8">We're working on bringing you the latest carbon market insights.</p>
              <button 
                onClick={() => handleNavigation('home')}
                className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      
      default:
        // Handle product pages
        if (currentPage.startsWith('product-')) {
          const productId = currentPage.replace('product-', '');
          const product = getProductById(productId);
          
          if (product) {
            return <ProductPage product={product} />;
          }
        }
        
        // Default home page
        return (
          <div className="min-h-screen bg-white text-gray-900">
            <TopNotice />
            <main>
              <Hero />
              <ValueProps />
              <Products />
              <Highlights />
              <Insights />
              <TrustSection />
              <CTASection />
            </main>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Enhanced navigation system */}
      <Navigation currentPage={currentPage} onNavigate={handleNavigation} />
      
      {/* Dynamic page content */}
      {renderCurrentPage()}
      
      {/* Global footer */}
      <Footer />
    </div>
  );
}

export default App;