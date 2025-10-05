import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const riskAssessmentSchema = z.object({
  location: z.string().min(2),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number()
  }),
  riskFactors: z.array(z.string()).optional(),
  assessmentType: z.enum(['GENERAL', 'AGRICULTURE', 'INFRASTRUCTURE', 'HEALTH', 'ECOSYSTEM']).default('GENERAL')
})

// POST /api/climate-risk - Create climate risk assessment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = riskAssessmentSchema.parse(body)

    // Simulate AI-powered risk assessment
    const riskScore = await calculateRiskScore(validatedData.coordinates, validatedData.assessmentType)
    const riskCategory = getRiskCategory(riskScore)
    const factors = await getRiskFactors(validatedData.coordinates, validatedData.assessmentType)
    const recommendations = generateRecommendations(riskCategory, validatedData.assessmentType)

    // Store assessment in database
    const assessment = await prisma.climateRiskAssessment.create({
      data: {
        location: validatedData.location,
        coordinates: validatedData.coordinates,
        riskScore,
        riskCategory,
        factors,
        recommendations,
        dataSource: 'AI_ANALYSIS',
        assessedAt: new Date(),
        expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
      }
    })

    return NextResponse.json({
      success: true,
      data: assessment
    })
  } catch (error) {
    console.error('Error creating risk assessment:', error)
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json(
        { error: 'Validation error', details: error.message },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// GET /api/climate-risk - Get risk assessments
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const location = searchParams.get('location')
    const riskCategory = searchParams.get('riskCategory')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const where: any = {}
    if (location) where.location = { contains: location, mode: 'insensitive' }
    if (riskCategory) where.riskCategory = riskCategory

    const assessments = await prisma.climateRiskAssessment.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { assessedAt: 'desc' }
    })

    const total = await prisma.climateRiskAssessment.count({ where })

    return NextResponse.json({
      success: true,
      data: {
        assessments,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching risk assessments:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// AI-powered risk calculation functions
async function calculateRiskScore(coordinates: { lat: number, lng: number }, type: string): Promise<number> {
  // Simulate AI analysis based on coordinates and assessment type
  const baseScore = Math.random() * 100
  
  // Adjust based on location (simulate real-world data)
  const latFactor = Math.abs(coordinates.lat) > 60 ? 1.2 : 1.0 // Higher risk at extreme latitudes
  const lngFactor = Math.abs(coordinates.lng) > 120 ? 1.1 : 1.0 // Higher risk at extreme longitudes
  
  // Adjust based on assessment type
  const typeMultiplier = {
    'GENERAL': 1.0,
    'AGRICULTURE': 1.3,
    'INFRASTRUCTURE': 1.1,
    'HEALTH': 1.4,
    'ECOSYSTEM': 1.2
  }[type] || 1.0

  return Math.min(100, Math.max(0, baseScore * latFactor * lngFactor * typeMultiplier))
}

function getRiskCategory(score: number): string {
  if (score >= 80) return 'CRITICAL'
  if (score >= 60) return 'HIGH'
  if (score >= 40) return 'MEDIUM'
  return 'LOW'
}

async function getRiskFactors(coordinates: { lat: number, lng: number }, type: string): Promise<any> {
  // Simulate risk factor analysis
  const factors = {
    temperature: {
      current: 25 + Math.random() * 10,
      projected: 25 + Math.random() * 15,
      trend: Math.random() > 0.5 ? 'increasing' : 'stable'
    },
    precipitation: {
      current: Math.random() * 2000,
      projected: Math.random() * 2500,
      variability: Math.random() * 50
    },
    seaLevel: {
      current: 0,
      projected: Math.random() * 2,
      trend: 'rising'
    },
    extremeEvents: {
      frequency: Math.random() * 10,
      intensity: Math.random() * 5,
      types: ['floods', 'droughts', 'heatwaves'].slice(0, Math.floor(Math.random() * 3) + 1)
    },
    ecosystem: {
      biodiversity: Math.random() * 100,
      forestCover: Math.random() * 100,
      waterStress: Math.random() * 100
    }
  }

  return factors
}

function generateRecommendations(category: string, type: string): string {
  const recommendations = {
    'LOW': [
      'Continue monitoring climate indicators',
      'Implement basic adaptation measures',
      'Maintain current resilience strategies'
    ],
    'MEDIUM': [
      'Develop comprehensive adaptation plan',
      'Invest in climate-resilient infrastructure',
      'Enhance early warning systems',
      'Diversify risk management strategies'
    ],
    'HIGH': [
      'Implement urgent adaptation measures',
      'Develop emergency response plans',
      'Invest heavily in climate resilience',
      'Consider relocation for critical infrastructure',
      'Establish climate insurance mechanisms'
    ],
    'CRITICAL': [
      'Immediate emergency response required',
      'Implement all available adaptation measures',
      'Consider strategic retreat from high-risk areas',
      'Establish comprehensive disaster management',
      'Coordinate with regional and national authorities'
    ]
  }

  const baseRecommendations = recommendations[category as keyof typeof recommendations] || []
  
  // Add type-specific recommendations
  const typeSpecific = {
    'AGRICULTURE': [
      'Implement drought-resistant crops',
      'Develop water-efficient irrigation systems',
      'Diversify crop varieties'
    ],
    'INFRASTRUCTURE': [
      'Strengthen building codes for climate resilience',
      'Improve drainage and flood management',
      'Enhance power grid resilience'
    ],
    'HEALTH': [
      'Develop heat wave response plans',
      'Improve air quality monitoring',
      'Enhance disease surveillance systems'
    ],
    'ECOSYSTEM': [
      'Protect and restore natural habitats',
      'Implement ecosystem-based adaptation',
      'Monitor biodiversity indicators'
    ]
  }

  const specificRecommendations = typeSpecific[type as keyof typeof typeSpecific] || []
  
  return [...baseRecommendations, ...specificRecommendations].join('; ')
}
