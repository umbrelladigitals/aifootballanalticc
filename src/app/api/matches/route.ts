import { NextRequest, NextResponse } from 'next/server'
import { footballDataService } from '@/lib/football-data'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

export async function GET(request: NextRequest) {
  try {
    // Session check disabled for development
    // const session = await getServerSession(authOptions)
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    // }

    const { searchParams } = new URL(request.url)
    const competitionId = searchParams.get('competitionId')
    const dateFrom = searchParams.get('dateFrom')
    const dateTo = searchParams.get('dateTo')
    const teamId = searchParams.get('teamId')

    let matches;

    if (teamId) {
      matches = await footballDataService.getTeamMatches(
        parseInt(teamId),
        dateFrom || undefined,
        dateTo || undefined
      );
    } else if (competitionId) {
      matches = await footballDataService.getCompetitionMatches(
        parseInt(competitionId),
        dateFrom || undefined,
        dateTo || undefined
      );
    } else {
      matches = await footballDataService.getMatches(
        dateFrom || undefined,
        dateTo || undefined
      );
    }

    // Bugünün maçlarını filtrele
    const today = new Date()
    const todayMatches = matches.matches.filter(match => {
      const matchDate = new Date(match.utcDate)
      return matchDate.toDateString() === today.toDateString()
    })

    // Gelecek maçları al
    const upcomingMatches = matches.matches.filter(match => {
      const matchDate = new Date(match.utcDate)
      return matchDate > today
    }).slice(0, 10)

    // Geçmiş maçları al
    const pastMatches = matches.matches.filter(match => {
      const matchDate = new Date(match.utcDate)
      return matchDate < today && match.status === 'FINISHED'
    }).slice(0, 10)

    return NextResponse.json({
      success: true,
      todayMatches,
      upcomingMatches,
      pastMatches,
      total: matches.matches.length
    })

  } catch (error) {
    console.error('Matches fetch error:', error)
    return NextResponse.json(
      { error: 'Maçlar alınırken bir hata oluştu' },
      { status: 500 }
    )
  }
}
