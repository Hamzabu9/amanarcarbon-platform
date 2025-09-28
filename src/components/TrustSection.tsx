import React from 'react';
import { Lock, BadgeCheck, Globe as Globe2 } from 'lucide-react';

/**
 * Trust and Security Section
 * 
 * Critical for B2B SaaS in regulated markets like carbon credits.
 * Security messaging addresses common enterprise concerns:
 * - Data protection: GDPR, SOC2, enterprise security requirements
 * - Method transparency: Addresses criticism of "black box" rating systems
 * - Claims alignment: Helps with regulatory compliance and corporate reporting
 * 
 * Visual approach:
 * - Icons reinforce security and transparency themes
 * - Three-column layout maintains consistency with other sections
 * - Gray background provides visual separation while maintaining readability
 */
export default function TrustSection() {
  const trustFeatures = [
    {
      icon: Lock,
      title: "Data protection",
      desc: "Role‑based access, audit trails and SSO. Add your policy links."
    },
    {
      icon: BadgeCheck,
      title: "Method transparency",
      desc: "Publish rationales & version methods so stakeholders can review assumptions."
    },
    {
      icon: Globe2,
      title: "Claims alignment",
      desc: "Templates for MRV & claims, aligned to your policies and buyer guardrails."
    }
  ];

  return (
    <section id="trust" className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-16 grid md:grid-cols-3 gap-6">
        {trustFeatures.map((feature) => (
          <div key={feature.title} className="rounded-2xl p-6 bg-gray-50">
            <feature.icon className="size-6 text-emerald-600" />
            <h3 className="mt-3 font-semibold">{feature.title}</h3>
            <p className="mt-1 text-sm text-gray-600">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}