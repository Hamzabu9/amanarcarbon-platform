import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { stripe } from '@/lib/stripe'
import { z } from 'zod'

const subscriptionSchema = z.object({
  planId: z.string(),
  amount: z.number().positive(),
  frequency: z.enum(['MONTHLY', 'QUARTERLY', 'YEARLY']),
  projectId: z.string().optional(),
  paymentMethodId: z.string().optional(),
})

// POST /api/subscriptions - Create subscription
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = subscriptionSchema.parse(body)

    // Create Stripe subscription
    const subscription = await stripe.subscriptions.create({
      customer: session.user.id, // You'll need to create/retrieve Stripe customer
      items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Carbon Offset Subscription - ${validatedData.frequency}`,
            description: `Monthly carbon offset subscription for ${validatedData.amount} credits`
          },
          unit_amount: Math.round(validatedData.amount * 15 * 100), // Assuming $15 per credit
          recurring: {
            interval: validatedData.frequency === 'MONTHLY' ? 'month' : 
                     validatedData.frequency === 'QUARTERLY' ? 'month' : 'year',
            interval_count: validatedData.frequency === 'QUARTERLY' ? 3 : 1
          }
        }
      }],
      payment_behavior: 'default_incomplete',
      payment_settings: { save_default_payment_method: 'on_subscription' },
      expand: ['latest_invoice.payment_intent']
    })

    // Create subscription record in database
    const dbSubscription = await prisma.subscription.create({
      data: {
        userId: session.user.id,
        stripeSubscriptionId: subscription.id,
        planId: validatedData.planId,
        amount: validatedData.amount,
        frequency: validatedData.frequency,
        projectId: validatedData.projectId,
        status: 'PENDING',
        nextBillingDate: new Date(Date.now() + (validatedData.frequency === 'MONTHLY' ? 30 : 
                                               validatedData.frequency === 'QUARTERLY' ? 90 : 365) * 24 * 60 * 60 * 1000)
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        subscription: dbSubscription,
        clientSecret: (subscription.latest_invoice as any)?.payment_intent?.client_secret
      }
    })
  } catch (error) {
    console.error('Error creating subscription:', error)
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

// GET /api/subscriptions - Get user subscriptions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const subscriptions = await prisma.subscription.findMany({
      where: { userId: session.user.id },
      include: {
        project: {
          select: {
            id: true,
            title: true,
            location: true,
            projectType: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({
      success: true,
      data: subscriptions
    })
  } catch (error) {
    console.error('Error fetching subscriptions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// PUT /api/subscriptions/[id] - Update subscription
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { action, amount, frequency } = body

    const subscription = await prisma.subscription.findFirst({
      where: {
        id: params.id,
        userId: session.user.id
      }
    })

    if (!subscription) {
      return NextResponse.json({ error: 'Subscription not found' }, { status: 404 })
    }

    switch (action) {
      case 'cancel':
        await stripe.subscriptions.cancel(subscription.stripeSubscriptionId)
        await prisma.subscription.update({
          where: { id: params.id },
          data: { status: 'CANCELLED' }
        })
        break

      case 'pause':
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          pause_collection: { behavior: 'void' }
        })
        await prisma.subscription.update({
          where: { id: params.id },
          data: { status: 'PAUSED' }
        })
        break

      case 'resume':
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          pause_collection: null
        })
        await prisma.subscription.update({
          where: { id: params.id },
          data: { status: 'ACTIVE' }
        })
        break

      case 'update':
        await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
          items: [{
            id: subscription.stripeSubscriptionId,
            price_data: {
              currency: 'usd',
              product_data: {
                name: `Carbon Offset Subscription - ${frequency}`,
                description: `Monthly carbon offset subscription for ${amount} credits`
              },
              unit_amount: Math.round(amount * 15 * 100),
              recurring: {
                interval: frequency === 'MONTHLY' ? 'month' : 
                         frequency === 'QUARTERLY' ? 'month' : 'year',
                interval_count: frequency === 'QUARTERLY' ? 3 : 1
              }
            }
          }]
        })
        await prisma.subscription.update({
          where: { id: params.id },
          data: {
            amount,
            frequency,
            nextBillingDate: new Date(Date.now() + (frequency === 'MONTHLY' ? 30 : 
                                                   frequency === 'QUARTERLY' ? 90 : 365) * 24 * 60 * 60 * 1000)
          }
        })
        break

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      message: `Subscription ${action}d successfully`
    })
  } catch (error) {
    console.error('Error updating subscription:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
