import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const impactSchema = z.object({
  impactType: z.enum([
    'CARBON_OFFSET',
    'EMISSION_REDUCTION',
    'RENEWABLE_ENERGY',
    'REFORESTATION',
    'CONSERVATION',
    'EDUCATION',
    'OTHER'
  ]),
  value: z.number().positive(),
  unit: z.string().min(1),
  description: z.string().min(10).max(500),
  projectId: z.string().optional(),
  verified: z.boolean().default(false)
})

// POST /api/impact - Create impact record
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = impactSchema.parse(body)

    const impact = await prisma.userImpact.create({
      data: {
        userId: session.user.id,
        impactType: validatedData.impactType,
        value: validatedData.value,
        unit: validatedData.unit,
        description: validatedData.description,
        projectId: validatedData.projectId,
        verified: validatedData.verified
      },
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      }
    })

    // Update user profile with total impact
    await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        totalOffset: validatedData.impactType === 'CARBON_OFFSET' ? validatedData.value : 0
      },
      update: {
        totalOffset: validatedData.impactType === 'CARBON_OFFSET' ? {
          increment: validatedData.value
        } : undefined
      }
    })

    return NextResponse.json({
      success: true,
      data: impact
    })
  } catch (error) {
    console.error('Error creating impact:', error)
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

// GET /api/impact - Get impact records
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId') || session.user.id
    const impactType = searchParams.get('impactType')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = { userId }
    if (impactType) where.impactType = impactType

    const impacts = await prisma.userImpact.findMany({
      where,
      include: {
        user: {
          select: {
            name: true,
            image: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.userImpact.count({ where })

    // Calculate total impact by type
    const impactStats = await prisma.userImpact.groupBy({
      by: ['impactType'],
      where: { userId },
      _sum: { value: true },
      _count: { id: true }
    })

    return NextResponse.json({
      success: true,
      data: {
        impacts,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        stats: impactStats
      }
    })
  } catch (error) {
    console.error('Error fetching impacts:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
