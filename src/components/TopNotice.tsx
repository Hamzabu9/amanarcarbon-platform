import React from 'react';

/**
 * Top Notice Banner Component
 * 
 * This component displays a prominent message about the company's value proposition.
 * Design rationale:
 * - Positioned at the very top to immediately communicate core value
 * - Subtle emerald background reinforces brand colors
 * - Cookie preferences link addresses GDPR/privacy compliance
 * - Compact design doesn't overwhelm the main content
 * 
 * Business purpose:
 * - Immediately establishes trust and transparency theme
 * - "Amanar" means "trust" in multiple languages - reinforces brand meaning
 * - Prepares visitors for the detailed explanations that follow
 */
export default function TopNotice() {
  return (
    <div className="w-full bg-emerald-50 text-emerald-900 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-4">
        <span className="font-medium">
          Amanar (Trust): transparent carbon quality & risk analytics
        </span>
        {/* GDPR/Privacy compliance - important for B2B software in regulated markets */}
        <button className="underline decoration-dotted hover:decoration-solid transition-all">
          Cookie preferences
        </button>
      </div>
    </div>
  );
}