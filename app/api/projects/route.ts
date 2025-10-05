import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { carbonProjectSchema, projectFilterSchema, paginationSchema } from '@/lib/validations'

// GET /api/projects - Get all carbon projects
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const filters = projectFilterSchema.parse({
      projectType: searchParams.get('projectType'),
      standard: searchParams.get('standard'),
      country: searchParams.get('country'),
      minPrice: searchParams.get('minPrice') ? parseFloat(searchParams.get('minPrice')!) : undefined,
      maxPrice: searchParams.get('maxPrice') ? parseFloat(searchParams.get('maxPrice')!) : undefined,
      status: searchParams.get('status'),
      search: searchParams.get('search'),
    })

    const pagination = paginationSchema.parse({
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10'),
      sortBy: searchParams.get('sortBy'),
      sortOrder: searchParams.get('sortOrder') as 'asc' | 'desc' || 'desc',
    })

    const where: any = {
      isActive: true,
    }

    if (filters.projectType) where.projectType = filters.projectType
    if (filters.standard) where.standard = filters.standard
    if (filters.country) where.country = filters.country
    if (filters.status) where.status = filters.status
    if (filters.minPrice || filters.maxPrice) {
      where.pricePerCredit = {}
      if (filters.minPrice) where.pricePerCredit.gte = filters.minPrice
      if (filters.maxPrice) where.pricePerCredit.lte = filters.maxPrice
    }
    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search, mode: 'insensitive' } },
        { description: { contains: filters.search, mode: 'insensitive' } },
        { location: { contains: filters.search, mode: 'insensitive' } }
      ]
    }

    const orderBy: any = {}
    if (pagination.sortBy) {
      orderBy[pagination.sortBy] = pagination.sortOrder
    } else {
      orderBy.createdAt = pagination.sortOrder
    }

    const projects = await prisma.carbonProject.findMany({
      where,
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
        credits: {
          where: { status: 'AVAILABLE' },
          select: {
            id: true,
            quantity: true,
            price: true
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
          take: 5
        },
        _count: {
          select: {
            reviews: true,
            credits: true
          }
        }
      },
      skip: (pagination.page - 1) * pagination.limit,
      take: pagination.limit,
      orderBy
    })

    const total = await prisma.carbonProject.count({ where })

    return NextResponse.json({
      success: true,
      data: {
        projects,
        pagination: {
          page: pagination.page,
          limit: pagination.limit,
          total,
          pages: Math.ceil(total / pagination.limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching projects:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST /api/projects - Create new carbon project
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = carbonProjectSchema.parse(body)

    const project = await prisma.carbonProject.create({
      data: {
        ...validatedData,
        ownerId: session.user.id,
        startDate: new Date(validatedData.startDate),
        endDate: validatedData.endDate ? new Date(validatedData.endDate) : undefined,
      },
      include: {
        owner: {
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
      data: project
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating project:', error)
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
