'use client';

import React, { useState } from 'react';
import Navigation from '../../src/components/Navigation';
import Footer from '../../src/components/Footer';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqCategories = [
    {
      title: 'General',
      items: [
        {
          question: 'What is AmanarCarbon?',
          answer: 'AmanarCarbon is a comprehensive carbon tracking and management platform that helps individuals, businesses, NGOs, and governments track, reduce, and offset their carbon footprint through verified carbon credits and advanced analytics.'
        },
        {
          question: 'How does carbon offsetting work?',
          answer: 'Carbon offsetting involves investing in projects that reduce or remove greenhouse gas emissions from the atmosphere. These projects are verified by third-party standards and generate carbon credits that can be purchased to offset your own emissions.'
        },
        {
          question: 'What types of carbon credits do you offer?',
          answer: 'We offer a wide range of verified carbon credits including nature-based solutions (forest conservation, reforestation), renewable energy projects, methane capture, and other high-quality offset projects from around the world.'
        }
      ]
    },
    {
      title: 'Products & Services',
      items: [
        {
          question: 'What is the Carbon Marketplace?',
          answer: 'The Carbon Marketplace is our comprehensive platform for buying and selling carbon credits. It includes project submission portals, verification workflows, a carbon footprint calculator, and streamlined purchasing with multiple payment options including Stripe and crypto.'
        },
        {
          question: 'How does Climate Risk Intelligence work?',
          answer: 'Climate Risk Intelligence uses AI-powered analytics and satellite data to provide climate risk assessments, predictive models, and comprehensive dashboards. It helps organizations identify and manage climate-related risks with data-driven insights.'
        },
        {
          question: 'What is the Impact & Engagement Hub?',
          answer: 'The Impact & Engagement Hub is a comprehensive platform for tracking carbon impact, community engagement, and corporate reporting. It includes gamification features, community tools, and ESG compliance templates to enhance user engagement and impact transparency.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      items: [
        {
          question: 'How do I cancel my subscription?',
          answer: 'You can cancel your subscription at any time from your account settings. Your access will continue until the end of your current billing period, and you won\'t be charged again.'
        },
        {
          question: 'Do you offer refunds?',
          answer: 'We offer a 30-day money-back guarantee for all new subscriptions. If you\'re not satisfied with our service, contact our support team for a full refund.'
        },
        {
          question: 'Can I change my plan anytime?',
          answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately, and you\'ll be charged or credited the prorated amount.'
        }
      ]
    },
    {
      title: 'Technical',
      items: [
        {
          question: 'Do you have an API?',
          answer: 'Yes, we provide comprehensive APIs for data access, carbon calculations, and integration with your existing systems. API access is available on Business and Enterprise plans.'
        },
        {
          question: 'How secure is my data?',
          answer: 'We use enterprise-grade security including encryption at rest and in transit, regular security audits, and compliance with SOC 2 and ISO 27001 standards. Your data is never shared with third parties without your consent.'
        },
        {
          question: 'Can I export my data?',
          answer: 'Yes, you can export all your data including emissions calculations, offset purchases, and reports in various formats (CSV, PDF, Excel) at any time.'
        }
      ]
    }
  ];

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.items.length > 0);


  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our platform, services, and carbon management solutions.
          </p>
        </div>

        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-2xl mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 size-5" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {filteredCategories.map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h2 className="text-2xl font-semibold mb-6">{category.title}</h2>
              <div className="space-y-4">
                {category.items.map((item, itemIndex) => {
                  const globalIndex = itemIndex;
                  const isOpen = openItems.includes(globalIndex);
                  
                  return (
                    <div key={itemIndex} className="border border-gray-200 rounded-xl">
                      <button
                        onClick={() => toggleItem(globalIndex)}
                        className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                      >
                        <span className="font-medium text-gray-900">{item.question}</span>
                        {isOpen ? (
                          <ChevronUp className="size-5 text-gray-500" />
                        ) : (
                          <ChevronDown className="size-5 text-gray-500" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-4">
                          <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-20 bg-emerald-50 rounded-2xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Our support team is here to help. Get in touch and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@amanarcarbon.com"
              className="border border-emerald-600 text-emerald-600 px-8 py-3 rounded-xl font-semibold hover:bg-emerald-50 transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
