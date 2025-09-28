import React from 'react';
import { Star, Quote } from 'lucide-react';

/**
 * Testimonials Section
 * 
 * Social proof through customer testimonials and case studies
 * to build credibility and trust with potential users.
 */
export default function Testimonials() {
  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Sustainability Director",
      company: "TechCorp",
      content: "AmanarCarbon has revolutionized our carbon management approach. The AI-powered risk assessment helped us identify and mitigate climate risks we never knew existed.",
      rating: 5
    },
    {
      name: "Marcus Rodriguez",
      role: "ESG Manager",
      company: "GreenFinance",
      content: "The marketplace is incredibly user-friendly and the verification process gives us confidence in every credit we purchase. It's become an essential tool for our ESG reporting.",
      rating: 5
    },
    {
      name: "Dr. Amara Okafor",
      role: "Climate Scientist",
      company: "EarthWatch NGO",
      content: "The community features and impact tracking have helped us engage our supporters and demonstrate real environmental impact. The gamification elements make climate action fun and engaging.",
      rating: 5
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Trusted by Climate Leaders</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our users say about their experience with AmanarCarbon
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-emerald-600 mb-4" />
              
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              
              <div className="border-t border-gray-100 pt-4">
                <div className="font-semibold text-gray-900">{testimonial.name}</div>
                <div className="text-sm text-gray-600">{testimonial.role}</div>
                <div className="text-sm text-emerald-600 font-medium">{testimonial.company}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
