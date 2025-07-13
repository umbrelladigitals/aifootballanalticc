import { NextRequest, NextResponse } from 'next/server';
import { footballDataService } from '@/lib/football-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const competitionId = searchParams.get('competitionId');

    if (!competitionId) {
      return NextResponse.json(
        { error: 'Competition ID is required' },
        { status: 400 }
      );
    }

    const standings = await footballDataService.getCompetitionStandings(
      parseInt(competitionId)
    );

    return NextResponse.json({
      success: true,
      standings: standings.standings
    });

  } catch (error) {
    console.error('Standings fetch error:', error);
    return NextResponse.json(
      { error: 'Puan durumu alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}
