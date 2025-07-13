import { NextResponse } from 'next/server';
import { footballDataService } from '@/lib/football-data';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  try {
    // Session check disabled for development
    // const session = await getServerSession(authOptions);
    // if (!session) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const competitions = await footballDataService.getCompetitions();

    // Filter to show only major competitions
    const majorCompetitions = competitions.competitions.filter(comp => 
      comp.plan === 'TIER_ONE' || 
      [2021, 2001, 2002, 2019, 2015, 2014].includes(comp.id)
    );

    return NextResponse.json({
      success: true,
      competitions: majorCompetitions
    });

  } catch (error) {
    console.error('Competitions fetch error:', error);
    return NextResponse.json(
      { error: 'Lig bilgileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}
