import React from 'react';
import { Shield, Satellite, BarChart3 } from 'lucide-react';

/**
 * Value Propositions Section
 * 
 * This section communicates our core differentiators in the carbon credit market.
 * Strategic messaging:
 * - "Independent & transparent" addresses trust issues in VCM
 * - "Earth observation first" shows technical sophistication
 * - "Portfolio-grade analytics" speaks to institutional buyers
 * 
 * Visual design:
 * - Icons provide quick visual recognition of concepts
 * - Three-column grid creates balanced, scannable layout
 * - Background color differentiation separates from other sections
 */
export default function ValueProps() {
  const features = [
    { 
      icon: Shield, 
      title: "Independent & transparent", 
      desc: "Risk‑based opinions with published methodologies and clear rationales." 
    },
    { 
      icon: Satellite, 
      title: "Earth observation first", 
      desc: "EO signals + field data + registries for continuous quality insight." 
    },
    { 
      icon: BarChart3, 
      title: "Portfolio‑grade analytics", 
      desc: "Scenario analysis, risk aggregation and decision‑ready dashboards." 
    },
  ];

  return (
    <section id="methodology" className="border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {features.map((feature) => (
          <div key={feature.title} className="rounded-2xl p-6 bg-gray-50 hover:bg-gray-100 transition-colors">
            <feature.icon className="size-6 text-emerald-600" />
            <h3 className="mt-3 font-semibold text-lg">{feature.title}</h3>
            <p className="mt-1 text-gray-600 text-sm leading-relaxed">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}