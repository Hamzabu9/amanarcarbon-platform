import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET /api/gamification/leaderboard - Get leaderboard
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'total_offset'
    const period = searchParams.get('period') || 'all_time'
    const limit = parseInt(searchParams.get('limit') || '50')

    let leaderboard: any[] = []

    switch (type) {
      case 'total_offset':
        leaderboard = await getOffsetLeaderboard(period, limit)
        break
      case 'projects_created':
        leaderboard = await getProjectsLeaderboard(period, limit)
        break
      case 'community_engagement':
        leaderboard = await getEngagementLeaderboard(period, limit)
        break
      case 'climate_impact':
        leaderboard = await getImpactLeaderboard(period, limit)
        break
      default:
        return NextResponse.json({ error: 'Invalid leaderboard type' }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      data: {
        leaderboard,
        type,
        period,
        total: leaderboard.length
      }
    })
  } catch (error) {
    console.error('Error fetching leaderboard:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

async function getOffsetLeaderboard(period: string, limit: number) {
  const dateFilter = getDateFilter(period)
  
  const leaderboard = await prisma.userProfile.findMany({
    where: {
      totalOffset: { gt: 0 },
      ...dateFilter
    },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          image: true,
          role: true
        }
      }
    },
    orderBy: { totalOffset: 'desc' },
    take: limit
  })

  return leaderboard.map((profile, index) => ({
    rank: index + 1,
    userId: profile.user.id,
    name: profile.user.name,
    image: profile.user.image,
    role: profile.user.role,
    score: profile.totalOffset,
    unit: 'credits',
    badge: getBadgeForOffset(profile.totalOffset)
  }))
}

async function getProjectsLeaderboard(period: string, limit: number) {
  const dateFilter = getDateFilter(period)
  
  const leaderboard = await prisma.carbonProject.groupBy({
    by: ['ownerId'],
    where: {
      isActive: true,
      ...dateFilter
    },
    _count: { id: true },
    orderBy: { _count: { id: 'desc' } },
    take: limit
  })

  const userIds = leaderboard.map(item => item.ownerId)
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      name: true,
      image: true,
      role: true
    }
  })

  return leaderboard.map((item, index) => {
    const user = users.find(u => u.id === item.ownerId)
    return {
      rank: index + 1,
      userId: item.ownerId,
      name: user?.name || 'Unknown',
      image: user?.image,
      role: user?.role,
      score: item._count.id,
      unit: 'projects',
      badge: getBadgeForProjects(item._count.id)
    }
  })
}

async function getEngagementLeaderboard(period: string, limit: number) {
  const dateFilter = getDateFilter(period)
  
  const leaderboard = await prisma.communityPost.groupBy({
    by: ['userId'],
    where: {
      isActive: true,
      ...dateFilter
    },
    _sum: { likes: true },
    _count: { id: true },
    orderBy: { _sum: { likes: 'desc' } },
    take: limit
  })

  const userIds = leaderboard.map(item => item.userId)
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      name: true,
      image: true,
      role: true
    }
  })

  return leaderboard.map((item, index) => {
    const user = users.find(u => u.id === item.userId)
    return {
      rank: index + 1,
      userId: item.userId,
      name: user?.name || 'Unknown',
      image: user?.image,
      role: user?.role,
      score: item._sum.likes || 0,
      unit: 'likes',
      badge: getBadgeForEngagement(item._sum.likes || 0)
    }
  })
}

async function getImpactLeaderboard(period: string, limit: number) {
  const dateFilter = getDateFilter(period)
  
  const leaderboard = await prisma.userImpact.groupBy({
    by: ['userId'],
    where: {
      verified: true,
      ...dateFilter
    },
    _sum: { value: true },
    _count: { id: true },
    orderBy: { _sum: { value: 'desc' } },
    take: limit
  })

  const userIds = leaderboard.map(item => item.userId)
  const users = await prisma.user.findMany({
    where: { id: { in: userIds } },
    select: {
      id: true,
      name: true,
      image: true,
      role: true
    }
  })

  return leaderboard.map((item, index) => {
    const user = users.find(u => u.id === item.userId)
    return {
      rank: index + 1,
      userId: item.userId,
      name: user?.name || 'Unknown',
      image: user?.image,
      role: user?.role,
      score: item._sum.value || 0,
      unit: 'impact points',
      badge: getBadgeForImpact(item._sum.value || 0)
    }
  })
}

function getDateFilter(period: string) {
  const now = new Date()
  switch (period) {
    case 'week':
      return {
        createdAt: {
          gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        }
      }
    case 'month':
      return {
        createdAt: {
          gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000)
        }
      }
    case 'year':
      return {
        createdAt: {
          gte: new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000)
        }
      }
    default:
      return {}
  }
}

function getBadgeForOffset(offset: number) {
  if (offset >= 1000) return '🌍 Climate Champion'
  if (offset >= 500) return '🌱 Green Leader'
  if (offset >= 100) return '🌿 Eco Warrior'
  if (offset >= 50) return '🍃 Nature Lover'
  return '🌱 Getting Started'
}

function getBadgeForProjects(projects: number) {
  if (projects >= 10) return '🏗️ Project Master'
  if (projects >= 5) return '🔨 Builder'
  if (projects >= 2) return '🛠️ Creator'
  return '🌱 Starter'
}

function getBadgeForEngagement(likes: number) {
  if (likes >= 1000) return '🌟 Community Star'
  if (likes >= 500) return '💬 Influencer'
  if (likes >= 100) return '🗣️ Active Member'
  if (likes >= 10) return '👋 Newcomer'
  return '🌱 Getting Started'
}

function getBadgeForImpact(impact: number) {
  if (impact >= 1000) return '⚡ Impact Hero'
  if (impact >= 500) return '💪 Change Maker'
  if (impact >= 100) return '🎯 Achiever'
  if (impact >= 10) return '🌱 Growing'
  return '🌱 Getting Started'
}
