import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/analytics - Get platform analytics
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'
    const projectId = searchParams.get('projectId')

    switch (type) {
      case 'overview':
        return await getOverviewAnalytics(session.user.role)
      
      case 'projects':
        return await getProjectAnalytics(projectId)
      
      case 'marketplace':
        return await getMarketplaceAnalytics()
      
      case 'user':
        return await getUserAnalytics(session.user.id)
      
      default:
        return NextResponse.json({ error: 'Invalid analytics type' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getOverviewAnalytics(userRole: string) {
  const [
    totalUsers,
    totalProjects,
    totalCredits,
    totalTransactions,
    totalRevenue,
    activeProjects,
    verifiedProjects,
    pendingProjects
  ] = await Promise.all([
    prisma.user.count(),
    prisma.carbonProject.count(),
    prisma.carbonCredit.count(),
    prisma.transaction.count(),
    prisma.transaction.aggregate({
      where: { status: 'COMPLETED' },
      _sum: { totalAmount: true }
    }),
    prisma.carbonProject.count({ where: { status: 'ACTIVE' } }),
    prisma.carbonProject.count({ where: { status: 'VERIFIED' } }),
    prisma.carbonProject.count({ where: { status: 'UNDER_REVIEW' } })
  ])

  const recentTransactions = await prisma.transaction.findMany({
    where: { status: 'COMPLETED' },
    include: {
      user: { select: { name: true, email: true } },
      project: { select: { title: true, projectType: true } }
    },
    orderBy: { createdAt: 'desc' },
    take: 10
  })

  const topProjects = await prisma.carbonProject.findMany({
    include: {
      _count: {
        select: {
          transactions: true,
          credits: true
        }
      }
    },
    orderBy: {
      transactions: {
        _count: 'desc'
      }
    },
    take: 5
  })

  return NextResponse.json({
    success: true,
    data: {
      overview: {
        totalUsers,
        totalProjects,
        totalCredits,
        totalTransactions,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        activeProjects,
        verifiedProjects,
        pendingProjects
      },
      recentTransactions,
      topProjects
    }
  })
}

async function getProjectAnalytics(projectId: string | null) {
  if (!projectId) {
    return NextResponse.json({ error: 'Project ID required' }, { status: 400 })
  }

  const [
    project,
    totalCredits,
    soldCredits,
    totalRevenue,
    transactions,
    reviews,
    avgRating
  ] = await Promise.all([
    prisma.carbonProject.findUnique({
      where: { id: projectId },
      include: {
        owner: { select: { name: true, email: true } },
        organization: { select: { name: true } }
      }
    }),
    prisma.carbonCredit.count({
      where: { projectId }
    }),
    prisma.carbonCredit.count({
      where: { projectId, status: 'SOLD' }
    }),
    prisma.transaction.aggregate({
      where: { projectId, status: 'COMPLETED' },
      _sum: { totalAmount: true }
    }),
    prisma.transaction.findMany({
      where: { projectId },
      include: {
        user: { select: { name: true, email: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    prisma.projectReview.count({
      where: { projectId }
    }),
    prisma.projectReview.aggregate({
      where: { projectId },
      _avg: { rating: true }
    })
  ])

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 })
  }

  return NextResponse.json({
    success: true,
    data: {
      project,
      metrics: {
        totalCredits,
        soldCredits,
        availableCredits: totalCredits - soldCredits,
        totalRevenue: totalRevenue._sum.totalAmount || 0,
        totalReviews: reviews,
        averageRating: avgRating._avg.rating || 0
      },
      recentTransactions: transactions
    }
  })
}

async function getMarketplaceAnalytics() {
  const [
    totalProjects,
    totalCredits,
    availableCredits,
    totalValue,
    projectsByType,
    projectsByStandard,
    topPerformingProjects
  ] = await Promise.all([
    prisma.carbonProject.count({ where: { status: 'VERIFIED' } }),
    prisma.carbonCredit.count(),
    prisma.carbonCredit.count({ where: { status: 'AVAILABLE' } }),
    prisma.carbonCredit.aggregate({
      where: { status: 'AVAILABLE' },
      _sum: { price: true }
    }),
    prisma.carbonProject.groupBy({
      by: ['projectType'],
      where: { status: 'VERIFIED' },
      _count: { id: true }
    }),
    prisma.carbonProject.groupBy({
      by: ['standard'],
      where: { status: 'VERIFIED' },
      _count: { id: true }
    }),
    prisma.carbonProject.findMany({
      where: { status: 'VERIFIED' },
      include: {
        _count: {
          select: {
            transactions: true,
            credits: true
          }
        }
      },
      orderBy: {
        transactions: {
          _count: 'desc'
        }
      },
      take: 10
    })
  ])

  return NextResponse.json({
    success: true,
    data: {
      overview: {
        totalProjects,
        totalCredits,
        availableCredits,
        totalValue: totalValue._sum.price || 0
      },
      distribution: {
        byType: projectsByType,
        byStandard: projectsByStandard
      },
      topPerformingProjects
    }
  })
}

async function getUserAnalytics(userId: string) {
  const [
    totalOffset,
    totalTransactions,
    totalSpent,
    recentTransactions,
    impactHistory
  ] = await Promise.all([
    prisma.userImpact.aggregate({
      where: { userId, impactType: 'CARBON_OFFSET' },
      _sum: { value: true }
    }),
    prisma.transaction.count({
      where: { userId, status: 'COMPLETED' }
    }),
    prisma.transaction.aggregate({
      where: { userId, status: 'COMPLETED' },
      _sum: { totalAmount: true }
    }),
    prisma.transaction.findMany({
      where: { userId },
      include: {
        project: { select: { title: true, projectType: true, location: true } }
      },
      orderBy: { createdAt: 'desc' },
      take: 10
    }),
    prisma.userImpact.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 20
    })
  ])

  return NextResponse.json({
    success: true,
    data: {
      metrics: {
        totalOffset: totalOffset._sum.value || 0,
        totalTransactions,
        totalSpent: totalSpent._sum.totalAmount || 0
      },
      recentTransactions,
      impactHistory
    }
  })
}
