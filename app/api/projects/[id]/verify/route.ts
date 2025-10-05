import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const verificationSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'REQUIRES_REVISION']),
  comments: z.string().optional(),
  documents: z.array(z.string()).optional(),
})

// POST /api/projects/[id]/verify - Verify a carbon project
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = verificationSchema.parse(body)

    // Check if project exists
    const project = await prisma.carbonProject.findUnique({
      where: { id: params.id }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    // Update project status
    const updatedProject = await prisma.carbonProject.update({
      where: { id: params.id },
      data: {
        status: validatedData.status === 'APPROVED' ? 'VERIFIED' : 
                validatedData.status === 'REJECTED' ? 'REJECTED' : 'UNDER_REVIEW',
        verificationDate: validatedData.status === 'APPROVED' ? new Date() : undefined
      }
    })

    // Create verification record
    const verification = await prisma.projectVerification.create({
      data: {
        projectId: params.id,
        verifierId: session.user.id,
        status: validatedData.status,
        comments: validatedData.comments,
        documents: validatedData.documents || [],
        verifiedAt: validatedData.status === 'APPROVED' ? new Date() : undefined
      }
    })

    // If approved, create carbon credits
    if (validatedData.status === 'APPROVED') {
      const creditsPerBatch = 100
      const totalBatches = Math.ceil(project.estimatedCredits / creditsPerBatch)

      for (let batch = 0; batch < totalBatches; batch++) {
        const batchSize = Math.min(creditsPerBatch, project.estimatedCredits - (batch * creditsPerBatch))
        
        for (let i = 0; i < batchSize; i++) {
          await prisma.carbonCredit.create({
            data: {
              projectId: project.id,
              serialNumber: `${project.id}-${batch + 1}-${i + 1}`,
              vintage: new Date().getFullYear(),
              quantity: 1,
              price: project.pricePerCredit,
              status: 'AVAILABLE'
            }
          })
        }
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        project: updatedProject,
        verification
      }
    })
  } catch (error) {
    console.error('Error verifying project:', error)
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

// GET /api/projects/[id]/verify - Get verification history
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const verifications = await prisma.projectVerification.findMany({
      where: { projectId: params.id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            status: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: verifications
    })
  } catch (error) {
    console.error('Error fetching verifications:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
