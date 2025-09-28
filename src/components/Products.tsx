import React from 'react';
import { ArrowRight, ShoppingCart, Shield, Users } from 'lucide-react';

/**
 * Products Showcase Section
 * 
 * This section details our product offerings for different user personas.
 * Product strategy:
 * - Each product addresses specific workflow needs in carbon credit lifecycle
 * - Icons provide visual differentiation and easy recognition
 * - Feature lists give concrete value for each product
 * - Hover effects create interactivity without overwhelming the design
 * 
 * B2B messaging approach:
 * - Technical specifications build credibility with expert buyers
 * - Workflow integration points appeal to operations teams
 * - ROI implications (risk reduction, efficiency gains) for decision makers
 */
export default function Products() {
  const products = [
    { 
      icon: ShoppingCart, 
      title: "Carbon Marketplace", 
      desc: "Comprehensive platform for buying and selling carbon credits with project submission, verification, and streamlined purchasing.", 
      points: ["Project Submission Portal", "Verification Workflow", "Carbon Footprint Calculator", "Marketplace with search & filters", "Stripe & crypto payments"] 
    },
    { 
      icon: Shield, 
      title: "Climate Risk Intelligence", 
      desc: "AI-powered climate risk assessment with satellite data integration and predictive analytics for organizations.", 
      points: ["Carbon Risk Toolkit", "Predictive Climate Model", "Data Dashboard with charts & maps", "API Access", "Government/Investor Portal"] 
    },
    { 
      icon: Users, 
      title: "Impact & Engagement Hub", 
      desc: "Community-driven platform for tracking carbon impact, engagement, and corporate reporting with gamification.", 
      points: ["Offset & Impact Dashboard", "Community & Co-funding Tools", "Corporate Reporting Templates", "Gamification with badges", "Social sharing tools"] 
    },
  ];

  return (
    <section id="products" className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section header with downloadable resource */}
        <div className="md:flex items-end justify-between gap-6 mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Our 3 Main Products</h2>
          <a 
            className="inline-flex items-center gap-2 text-sm font-medium hover:text-emerald-600 transition-colors" 
            href="/pricing"
          >
            View pricing plans <ArrowRight className="size-4" />
          </a>
        </div>
        
        {/* Products grid - 3 columns on desktop for optimal scanning */}
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div 
              key={product.title} 
              className="rounded-2xl p-6 bg-white border border-gray-200 hover:shadow-md transition-shadow"
            >
              <product.icon className="size-6 text-emerald-600" />
              <h3 className="mt-3 font-semibold">{product.title}</h3>
              <p className="mt-1 text-sm text-gray-600">{product.desc}</p>
              
              {/* Feature points list - provides concrete value props */}
              <ul className="mt-3 text-sm text-gray-600 list-disc pl-5 space-y-1">
                {product.points.map(point => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              
              {/* Learn more CTA - drives deeper engagement */}
              <a 
                href={`/products/${product.title.toLowerCase().replace(/\s+/g, '-')}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
              >
                Learn more <ArrowRight className="size-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}