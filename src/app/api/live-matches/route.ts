import { NextRequest, NextResponse } from 'next/server';
import { footballDataService } from '@/lib/football-data';

export async function GET(request: NextRequest) {
  try {
    // Get live matches
    const liveMatches = await footballDataService.getLiveMatches();

    return NextResponse.json({
      success: true,
      data: liveMatches.matches || [],
      total: liveMatches.matches?.length || 0
    });

  } catch (error) {
    console.error('Live Matches API Error:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Canlı maçlar yüklenirken hata oluştu',
      data: [],
      total: 0
    }, { status: 500 });
  }
}
