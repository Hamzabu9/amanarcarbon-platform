import React from 'react';
import { CheckCircle, Zap, Globe, Shield, Users, BarChart3 } from 'lucide-react';

/**
 * Platform Features Section
 * 
 * Highlights the key features and benefits of the AmanarCarbon platform
 * to build trust and demonstrate value to potential users.
 */
export default function PlatformFeatures() {
  const features = [
    {
      icon: Zap,
      title: "AI-Powered Analytics",
      description: "Advanced machine learning algorithms provide accurate carbon risk assessments and predictive insights."
    },
    {
      icon: Globe,
      title: "Global Marketplace",
      description: "Access verified carbon credits from projects worldwide with transparent pricing and quality ratings."
    },
    {
      icon: Shield,
      title: "Verified Projects",
      description: "All projects undergo rigorous verification processes to ensure authenticity and impact."
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "Engage with like-minded individuals and organizations in collaborative climate action."
    },
    {
      icon: BarChart3,
      title: "Real-time Monitoring",
      description: "Track project performance and impact with satellite data and continuous monitoring."
    },
    {
      icon: CheckCircle,
      title: "Compliance Ready",
      description: "Generate reports and documentation for ESG compliance and regulatory requirements."
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Choose AmanarCarbon?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive platform combines cutting-edge technology with user-friendly design 
            to make carbon management accessible, transparent, and effective for everyone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-2xl mb-4">
                <feature.icon className="w-8 h-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
