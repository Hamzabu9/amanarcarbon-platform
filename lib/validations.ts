import { z } from 'zod'

// User validation schemas
export const userRegistrationSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['INDIVIDUAL', 'BUSINESS', 'ENTERPRISE']).optional(),
})

export const userProfileSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  bio: z.string().max(500, 'Bio must be less than 500 characters').optional(),
  location: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
  phone: z.string().optional(),
  dateOfBirth: z.string().datetime().optional(),
})

// Organization validation schemas
export const organizationSchema = z.object({
  name: z.string().min(2, 'Organization name must be at least 2 characters'),
  description: z.string().optional(),
  website: z.string().url('Invalid website URL').optional(),
  type: z.enum(['BUSINESS', 'NGO', 'GOVERNMENT', 'EDUCATIONAL']),
  size: z.enum(['SMALL', 'MEDIUM', 'LARGE', 'ENTERPRISE']),
  industry: z.string().optional(),
  location: z.string().optional(),
})

// Carbon project validation schemas
export const carbonProjectSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  description: z.string().min(50, 'Description must be at least 50 characters'),
  location: z.string().min(2, 'Location is required'),
  country: z.string().min(2, 'Country is required'),
  projectType: z.enum([
    'REFORESTATION',
    'RENEWABLE_ENERGY',
    'ENERGY_EFFICIENCY',
    'WASTE_MANAGEMENT',
    'CARBON_CAPTURE',
    'BLUE_CARBON',
    'AGRICULTURE',
    'OTHER'
  ]),
  standard: z.enum(['VCS', 'GOLD_STANDARD', 'CARBON_CREDIT_STANDARD', 'ISO_14064', 'OTHER']),
  methodology: z.string().min(5, 'Methodology is required'),
  estimatedCredits: z.number().positive('Estimated credits must be positive'),
  pricePerCredit: z.number().positive('Price per credit must be positive'),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
})

// Transaction validation schemas
export const transactionSchema = z.object({
  projectId: z.string().min(1, 'Project ID is required'),
  creditId: z.string().optional(),
  amount: z.number().positive('Amount must be positive'),
  currency: z.string().default('USD'),
  paymentMethod: z.string().optional(),
})

// Climate risk assessment schemas
export const climateRiskSchema = z.object({
  location: z.string().min(2, 'Location is required'),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }),
  riskFactors: z.array(z.string()).optional(),
})

// User impact schemas
export const userImpactSchema = z.object({
  impactType: z.enum([
    'CARBON_OFFSET',
    'EMISSION_REDUCTION',
    'RENEWABLE_ENERGY',
    'REFORESTATION',
    'CONSERVATION',
    'EDUCATION',
    'OTHER'
  ]),
  value: z.number().positive('Value must be positive'),
  unit: z.string().min(1, 'Unit is required'),
  description: z.string().optional(),
  projectId: z.string().optional(),
})

// Community post schemas
export const communityPostSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters'),
  content: z.string().min(20, 'Content must be at least 20 characters'),
  type: z.enum(['GENERAL', 'PROJECT_UPDATE', 'SUCCESS_STORY', 'QUESTION', 'ANNOUNCEMENT', 'EVENT']),
  tags: z.array(z.string()).optional(),
})

// API response schemas
export const apiResponseSchema = z.object({
  success: z.boolean(),
  message: z.string(),
  data: z.any().optional(),
  error: z.string().optional(),
})

// Pagination schemas
export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

// Search and filter schemas
export const projectFilterSchema = z.object({
  projectType: z.string().optional(),
  standard: z.string().optional(),
  country: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
})

export const userFilterSchema = z.object({
  role: z.string().optional(),
  verified: z.boolean().optional(),
  location: z.string().optional(),
  search: z.string().optional(),
})
