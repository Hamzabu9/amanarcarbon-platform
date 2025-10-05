import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { transactionSchema } from '@/lib/validations'

// POST /api/payments - Create payment intent
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = transactionSchema.parse(body)

    // Get project details
    const project = await prisma.carbonProject.findUnique({
      where: { id: validatedData.projectId },
      include: {
        credits: {
          where: { status: 'AVAILABLE' },
          take: validatedData.amount
        }
      }
    })

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 })
    }

    if (project.credits.length < validatedData.amount) {
      return NextResponse.json(
        { error: 'Insufficient credits available' },
        { status: 400 }
      )
    }

    const totalAmount = validatedData.amount * project.pricePerCredit

    // Create payment intent with Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalAmount * 100), // Convert to cents
      currency: validatedData.currency.toLowerCase(),
      metadata: {
        userId: session.user.id,
        projectId: validatedData.projectId,
        amount: validatedData.amount.toString(),
        pricePerCredit: project.pricePerCredit.toString(),
      },
    })

    // Create transaction record
    const transaction = await prisma.transaction.create({
      data: {
        userId: session.user.id,
        projectId: validatedData.projectId,
        amount: validatedData.amount,
        pricePerCredit: project.pricePerCredit,
        totalAmount: totalAmount,
        currency: validatedData.currency,
        status: 'PENDING',
        stripePaymentId: paymentIntent.id,
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        clientSecret: paymentIntent.client_secret,
        transactionId: transaction.id,
        amount: totalAmount,
        currency: validatedData.currency
      }
    })
  } catch (error) {
    console.error('Error creating payment:', error)
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

// GET /api/payments - Get user transactions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const status = searchParams.get('status')

    const where: any = { userId: session.user.id }
    if (status) where.status = status

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        project: {
          select: {
            id: true,
            title: true,
            location: true,
            projectType: true,
            images: true
          }
        }
      },
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: 'desc' }
    })

    const total = await prisma.transaction.count({ where })

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit)
        }
      }
    })
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
