import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10).max(500).optional(),
})

// POST /api/projects/[id]/reviews - Create or update project review
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = reviewSchema.parse(body)

    // Check if project exists
    const project = await prisma.carbonProject.findUnique({
      where: { id: params.id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Check if user has purchased credits from this project
    const hasPurchased = await prisma.transaction.findFirst({
      where: {
        userId: session.user.id,
        projectId: params.id,
        status: 'COMPLETED'
      }
    })

    if (!hasPurchased) {
      return NextResponse.json(
        { error: 'You must purchase credits from this project before reviewing' },
        { status: 403 }
      )
    }

    // Create or update review
    const review = await prisma.projectReview.upsert({
      where: {
        projectId_userId: {
          projectId: params.id,
          userId: session.user.id
        }
      },
      create: {
        projectId: params.id,
        userId: session.user.id,
        rating: validatedData.rating,
        comment: validatedData.comment
      },
      update: {
        rating: validatedData.rating,
        comment: validatedData.comment
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: review
    })
  } catch (error) {
    console.error('Error creating review:', error)
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

// GET /api/projects/[id]/reviews - Get project reviews
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')

    const reviews = await prisma.projectReview.findMany({
      where: { projectId: params.id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.projectReview.count({
      where: { projectId: params.id }
    })

    // Calculate average rating
    const avgRating = await prisma.projectReview.aggregate({
      where: { projectId: params.id },
      _avg: { rating: true }
    })

    return NextResponse.json({
      success: true,
      data: {
        reviews,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        },
        averageRating: avgRating._avg.rating || 0,
        totalReviews: total
      }
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
