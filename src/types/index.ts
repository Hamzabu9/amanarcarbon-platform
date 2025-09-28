/**
 * Type Definitions for Amanar Carbon Platform
 * 
 * Centralized type definitions ensure consistency across the application
 * and provide clear contracts for data structures used throughout the platform.
 * This is especially important for carbon credit data which requires precision
 * and regulatory compliance.
 */

// Navigation and routing types
export interface NavigationItem {
  label: string;
  href: string;
  description?: string;
}

import React from 'react';

// Product-related types for consistent data structure
export interface Product {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  useCases: string[];
  pricing?: {
    tier: string;
    price: string;
    features: string[];
  }[];
}

// Carbon calculator types for emissions calculations
export interface EmissionFactor {
  category: string;
  subcategory: string;
  factor: number; // kg CO2e per unit
  unit: string;
  source: string;
}

export interface CalculationInput {
  category: string;
  subcategory: string;
  amount: number;
  unit: string;
}

export interface CalculationResult {
  totalEmissions: number; // kg CO2e
  breakdown: {
    category: string;
    emissions: number;
    percentage: number;
  }[];
  recommendations: string[];
  offsetCost: number; // USD
}

// Team member type for About page
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
  linkedin?: string;
  expertise: string[];
}

// Blog/insight article type
export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  readTime: number;
  tags: string[];
  featured?: boolean;
}