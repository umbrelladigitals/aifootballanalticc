import { NextRequest, NextResponse } from 'next/server'
import { analyzeMatch, TeamStats } from '@/lib/ai-service'
import { footballDataService } from '@/lib/football-api'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { homeTeamId, awayTeamId } = await request.json()

    if (!homeTeamId || !awayTeamId) {
      return NextResponse.json(
        { error: 'Takım ID\'leri gereklidir' },
        { status: 400 }
      )
    }

    // Takım bilgilerini çek
    const [homeTeam, awayTeam] = await Promise.all([
      footballDataService.getTeam(homeTeamId),
      footballDataService.getTeam(awayTeamId)
    ])

    if (!homeTeam || !awayTeam) {
      return NextResponse.json(
        { error: 'Takım bilgileri bulunamadı' },
        { status: 404 }
      )
    }

    // Takım istatistiklerini çek
    const [homeStats, awayStats, headToHead] = await Promise.all([
      footballDataService.getTeamStats(homeTeamId),
      footballDataService.getTeamStats(awayTeamId),
      footballDataService.getHeadToHead(homeTeamId, awayTeamId)
    ])

    // AI analizi için veri hazırla
    const homeTeamStats: TeamStats = {
      name: homeTeam.name,
      recentForm: homeStats?.form ? homeStats.form.split('') : ['W', 'W', 'D', 'L', 'W'],
      goalsFor: homeStats?.goalsFor || 15,
      goalsAgainst: homeStats?.goalsAgainst || 8,
      wins: homeStats?.won || 8,
      draws: homeStats?.draw || 3,
      losses: homeStats?.lost || 2
    }

    const awayTeamStats: TeamStats = {
      name: awayTeam.name,
      recentForm: awayStats?.form ? awayStats.form.split('') : ['L', 'W', 'W', 'D', 'L'],
      goalsFor: awayStats?.goalsFor || 12,
      goalsAgainst: awayStats?.goalsAgainst || 10,
      wins: awayStats?.won || 6,
      draws: awayStats?.draw || 4,
      losses: awayStats?.lost || 3
    }

    // AI analizi yap
    const analysis = await analyzeMatch(homeTeamStats, awayTeamStats, headToHead)

    return NextResponse.json({
      success: true,
      analysis,
      teams: {
        home: homeTeam,
        away: awayTeam
      },
      stats: {
        home: homeStats,
        away: awayStats
      },
      headToHead: headToHead.slice(0, 5) // Son 5 karşılaşma
    })

  } catch (error) {
    console.error('Match analysis error:', error)
    return NextResponse.json(
      { error: 'Analiz yapılırken bir hata oluştu' },
      { status: 500 }
    )
  }
}
