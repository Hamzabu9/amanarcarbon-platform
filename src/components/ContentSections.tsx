import React from 'react';
import { ArrowRight } from 'lucide-react';

/**
 * Content Sections Component - Highlights and Insights
 * 
 * These sections serve multiple purposes in the conversion funnel:
 * - Highlights: Recent achievements/product updates for credibility
 * - Insights: Thought leadership content for SEO and expertise demonstration
 * 
 * Design pattern:
 * - Article cards with consistent structure for easy scanning
 * - Aspect ratios optimized for various content types
 * - "See all" links encourage deeper site exploration
 * - Placeholder content structured for easy CMS integration later
 */

// Highlights Section - Recent company/product news
function Highlights() {
  return (
    <section id="highlights" className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight mb-8">Highlights</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <article key={i} className="rounded-2xl overflow-hidden border border-gray-200 hover:shadow-md transition-shadow">
              {/* Image placeholder - 16:9 aspect ratio standard for web content */}
              <div className="aspect-[16/9] bg-gray-100" />
              <div className="p-5">
                <h3 className="font-semibold">Feature headline</h3>
                <p className="mt-1 text-sm text-gray-600">
                  Short summary explaining the milestone and what it means for the market.
                </p>
                <button className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                  Explore <ArrowRight className="size-4" />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Insights Section - Thought leadership and market analysis
function Insights() {
  return (
    <section id="insights" className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="md:flex items-end justify-between gap-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Carbon explored</h2>
          <a 
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-600 transition-colors" 
            href="#"
          >
            See all insights <ArrowRight className="size-4" />
          </a>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[1,2,3].map((i) => (
            <article key={i} className="rounded-2xl p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow">
              {/* Article metadata - builds content credibility */}
              <div className="text-xs text-gray-500">Sept 28, 2025 • 5 min</div>
              <h3 className="mt-2 font-semibold">Insight article title</h3>
              <p className="mt-1 text-sm text-gray-600">
                A concise teaser for the analysis. Replace with your own editorial content.
              </p>
              <button className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
                Read article <ArrowRight className="size-4" />
              </button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

// Combined export for cleaner imports
export { Highlights, Insights };