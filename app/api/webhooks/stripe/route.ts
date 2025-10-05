import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { prisma } from '@/lib/prisma'
import Stripe from 'stripe'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent
        const transactionId = paymentIntent.metadata.transactionId

        if (transactionId) {
          // Update transaction status
          await prisma.transaction.update({
            where: { stripePaymentId: paymentIntent.id },
            data: { status: 'COMPLETED' }
          })

          // Reserve and transfer carbon credits
          const transaction = await prisma.transaction.findUnique({
            where: { stripePaymentId: paymentIntent.id },
            include: { project: true }
          })

          if (transaction) {
            // Get available credits
            const credits = await prisma.carbonCredit.findMany({
              where: {
                projectId: transaction.projectId,
                status: 'AVAILABLE'
              },
              take: transaction.amount
            })

            // Transfer credits to buyer
            await prisma.carbonCredit.updateMany({
              where: {
                id: { in: credits.map(c => c.id) }
              },
              data: {
                status: 'SOLD',
                buyerId: transaction.userId
              }
            })

            // Update user impact
            await prisma.userImpact.create({
              data: {
                userId: transaction.userId,
                impactType: 'CARBON_OFFSET',
                value: transaction.amount,
                unit: 'credits',
                description: `Carbon offset purchase from ${transaction.project.title}`,
                projectId: transaction.projectId,
                verified: true
              }
            })

            // Update user profile with total offset
            await prisma.userProfile.upsert({
              where: { userId: transaction.userId },
              create: {
                userId: transaction.userId,
                totalOffset: transaction.amount
              },
              update: {
                totalOffset: {
                  increment: transaction.amount
                }
              }
            })
          }
        }
        break
      }

      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        await prisma.transaction.update({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: 'FAILED' }
        })
        break
      }

      case 'payment_intent.canceled': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent

        await prisma.transaction.update({
          where: { stripePaymentId: paymentIntent.id },
          data: { status: 'CANCELLED' }
        })
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Error processing webhook:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}
