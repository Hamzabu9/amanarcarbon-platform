/**
 * Product Data Configuration - Updated for 3 Main Products Structure
 * 
 * Centralized product information for the new modular platform:
 * 1. Carbon Marketplace
 * 2. Climate Risk Intelligence  
 * 3. Impact & Engagement Hub
 */

import { ShoppingCart, Shield, Users } from 'lucide-react';
import { Product } from '../types';

export const products: Product[] = [
  {
    id: 'carbon-marketplace',
    icon: ShoppingCart,
    title: 'Carbon Marketplace',
    description: 'Comprehensive carbon credit marketplace with project submission, verification, and purchase capabilities for individuals and organizations.',
    features: [
      'Project Submission Portal for developers',
      'Verification Workflow with third-party validators',
      'Carbon Footprint Calculator for users',
      'Marketplace Listing with search and filters',
      'Checkout & Offset Purchase (Stripe/crypto)',
      'Project Rating Display integration',
      'Subscription Plans for monthly offset bundles'
    ],
    benefits: [
      'Streamlined carbon credit purchasing',
      'Verified project quality assurance',
      'Flexible payment options',
      'Automated offset tracking',
      'Cost-effective bulk purchasing'
    ],
    useCases: [
      'Individual carbon footprint offsetting',
      'Corporate sustainability programs',
      'ESG compliance and reporting',
      'Carbon neutral event planning',
      'Supply chain carbon management'
    ],
    pricing: [
      {
        tier: 'Individual',
        price: '$29/month',
        features: ['Personal calculator', 'Basic marketplace access', 'Email support']
      },
      {
        tier: 'Business',
        price: '$299/month',
        features: ['Team management', 'Advanced analytics', 'API access', 'Priority support']
      },
      {
        tier: 'Enterprise',
        price: 'Custom',
        features: ['Custom integrations', 'Dedicated support', 'White-label options', 'SLA guarantees']
      }
    ]
  },
  {
    id: 'climate-risk-intelligence',
    icon: Shield,
    title: 'Climate Risk Intelligence',
    description: 'Advanced climate risk assessment and predictive analytics platform with AI-powered insights and satellite data integration.',
    features: [
      'Carbon Risk Toolkit with scores and risk stages',
      'Predictive Climate Model with AI + satellite data',
      'Data Dashboard with charts, maps, and CSV export',
      'API Access for partner integrations',
      'Government/Investor Portal for bulk access',
      'Performance indicators and benchmarking'
    ],
    benefits: [
      'Proactive risk identification',
      'Data-driven decision making',
      'Regulatory compliance support',
      'Cost-effective risk management',
      'Enhanced transparency and reporting'
    ],
    useCases: [
      'Corporate climate risk assessment',
      'Investment portfolio analysis',
      'Government policy development',
      'Insurance risk modeling',
      'ESG reporting and compliance'
    ],
    pricing: [
      {
        tier: 'Starter',
        price: '$2,500/month',
        features: ['Basic risk scores', 'Standard reports', 'Email support']
      },
      {
        tier: 'Professional',
        price: '$7,500/month',
        features: ['Advanced analytics', 'API access', 'Custom dashboards', 'Priority support']
      },
      {
        tier: 'Enterprise',
        price: 'Custom',
        features: ['Custom models', 'Dedicated support', 'White-label options', 'SLA guarantees']
      }
    ]
  },
  {
    id: 'impact-engagement-hub',
    icon: Users,
    title: 'Impact & Engagement Hub',
    description: 'Comprehensive platform for tracking carbon impact, community engagement, and corporate reporting with gamification features.',
    features: [
      'Offset & Impact Dashboard for personal and corporate tracking',
      'Community & Co-funding Tools with project storytelling',
      'Corporate Reporting Tools with ESG/CSR compliance templates',
      'Gamification Layer with badges and leaderboards',
      'Project impact visualization',
      'Social sharing and collaboration tools'
    ],
    benefits: [
      'Enhanced user engagement',
      'Transparent impact tracking',
      'Streamlined compliance reporting',
      'Community building and collaboration',
      'Motivational gamification elements'
    ],
    useCases: [
      'Corporate sustainability programs',
      'Employee engagement initiatives',
      'Community carbon projects',
      'ESG reporting and compliance',
      'Educational and awareness campaigns'
    ],
    pricing: [
      {
        tier: 'Individual',
        price: '$19/month',
        features: ['Personal dashboard', 'Basic impact tracking', 'Community access']
      },
      {
        tier: 'Team',
        price: '$199/month',
        features: ['Team management', 'Advanced reporting', 'Custom branding', 'Priority support']
      },
      {
        tier: 'Enterprise',
        price: 'Custom',
        features: ['Custom integrations', 'Dedicated support', 'White-label options', 'SLA guarantees']
      }
    ]
  }
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};