import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const retirementSchema = z.object({
  reason: z.string().min(10).max(500),
  retirementDate: z.string().datetime().optional(),
  certificate: z.string().optional(),
})

// POST /api/credits/[id]/retire - Retire carbon credits
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
    const validatedData = retirementSchema.parse(body)

    // Check if credit exists and belongs to user
    const credit = await prisma.carbonCredit.findFirst({
      where: {
        id: params.id,
        buyerId: session.user.id,
        status: 'SOLD'
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            projectType: true,
            location: true
          }
        }
      }
    })

    if (!credit) {
      return NextResponse.json(
        { error: 'Credit not found or not owned by user' },
        { status: 404 }
      )
    }

    // Retire the credit
    const retiredCredit = await prisma.carbonCredit.update({
      where: { id: params.id },
      data: {
        status: 'RETIRED',
        retirementDate: validatedData.retirementDate ? new Date(validatedData.retirementDate) : new Date(),
        retirementReason: validatedData.reason
      }
    })

    // Create retirement certificate
    const retirementCertificate = await prisma.retirementCertificate.create({
      data: {
        creditId: params.id,
        userId: session.user.id,
        projectId: credit.projectId,
        retirementDate: retiredCredit.retirementDate!,
        reason: validatedData.reason,
        certificateNumber: `RC-${Date.now()}-${params.id.slice(-6)}`,
        serialNumber: credit.serialNumber,
        vintage: credit.vintage,
        quantity: credit.quantity,
        projectTitle: credit.project.title,
        projectType: credit.project.projectType,
        projectLocation: credit.project.location
      }
    })

    // Update user impact
    await prisma.userImpact.create({
      data: {
        userId: session.user.id,
        impactType: 'CARBON_OFFSET',
        value: credit.quantity,
        unit: 'credits',
        description: `Retired ${credit.quantity} carbon credits from ${credit.project.title}`,
        projectId: credit.projectId,
        verified: true
      }
    })

    // Update user profile with total offset
    await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        totalOffset: credit.quantity
      },
      update: {
        totalOffset: {
          increment: credit.quantity
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        credit: retiredCredit,
        certificate: retirementCertificate
      }
    })
  } catch (error) {
    console.error('Error retiring credit:', error)
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

// GET /api/credits/[id]/retire - Get retirement history for credit
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const credit = await prisma.carbonCredit.findFirst({
      where: {
        id: params.id,
        buyerId: session.user.id
      },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            projectType: true,
            location: true
          }
        }
      }
    })

    if (!credit) {
      return NextResponse.json(
        { error: 'Credit not found or not owned by user' },
        { status: 404 }
      )
    }

    const retirementHistory = await prisma.retirementCertificate.findMany({
      where: { creditId: params.id },
      orderBy: { retirementDate: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: {
        credit,
        retirementHistory
      }
    })
  } catch (error) {
    console.error('Error fetching retirement history:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
