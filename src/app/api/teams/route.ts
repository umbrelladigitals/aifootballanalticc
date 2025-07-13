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
    const teamId = searchParams.get('teamId');

    if (!teamId) {
      return NextResponse.json(
        { error: 'Team ID is required' },
        { status: 400 }
      );
    }

    const team = await footballDataService.getTeam(parseInt(teamId));

    return NextResponse.json({
      success: true,
      team
    });

  } catch (error) {
    console.error('Team fetch error:', error);
    return NextResponse.json(
      { error: 'Takım bilgileri alınırken bir hata oluştu' },
      { status: 500 }
    );
  }
}
