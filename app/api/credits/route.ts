import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const creditFilterSchema = z.object({
  projectId: z.string().optional(),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD', 'RETIRED', 'CANCELLED']).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  vintage: z.number().optional(),
  search: z.string().optional(),
})

// GET /api/credits - Get available carbon credits
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = creditFilterSchema.parse({
      projectId: searchParams.get('projectId'),
      status: searchParams.get('status') as any,
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      vintage: searchParams.get('vintage') ? parseInt(searchParams.get('vintage')!) : undefined,
      search: searchParams.get('search'),
    })

    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {
      status: filters.status || 'AVAILABLE',
    }

    if (filters.projectId) where.projectId = filters.projectId
    if (filters.vintage) where.vintage = filters.vintage
    if (filters.minPrice || filters.maxPrice) {
      where.price = {}
      if (filters.minPrice) where.price.gte = filters.minPrice
      if (filters.maxPrice) where.price.lte = filters.maxPrice
    }

    const credits = await prisma.carbonCredit.findMany({
      where,
      include: {
        project: {
          include: {
            owner: {
              select: {
                id: true,
                name: true,
                image: true,
                profile: {
                  select: {
                    firstName: true,
                    lastName: true,
                    isVerified: true
                  }
                }
              }
            },
            organization: {
              select: {
                id: true,
                name: true,
                logo: true,
                isVerified: true
              }
            },
            reviews: {
              select: {
                rating: true,
                comment: true,
                createdAt: true,
                user: {
                  select: {
                    name: true,
                    image: true
                  }
                }
              },
              orderBy: { createdAt: 'desc' },
              take: 3
            },
            _count: {
              select: {
                reviews: true,
                credits: true
              }
            }
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.carbonCredit.count({ where })

    return NextResponse.json({
      success: true,
      data: {
        credits,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching credits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/credits - Reserve carbon credits
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { creditIds, amount } = body

    if (!creditIds || !Array.isArray(creditIds) || creditIds.length === 0) {
      return NextResponse.json(
        { error: 'Credit IDs are required' },
        { status: 400 }
      )
    }

    // Check if credits are available
    const credits = await prisma.carbonCredit.findMany({
      where: {
        id: { in: creditIds },
        status: 'AVAILABLE'
      }
    })

    if (credits.length !== creditIds.length) {
      return NextResponse.json(
        { error: 'Some credits are no longer available' },
        { status: 400 }
      )
    }

    // Reserve credits
    await prisma.carbonCredit.updateMany({
      where: {
        id: { in: creditIds }
      },
      data: {
        status: 'RESERVED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Credits reserved successfully',
      data: { reservedCount: credits.length }
    })
  } catch (error) {
    console.error('Error reserving credits:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
