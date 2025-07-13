// Football Data API Service
import { mockFootballDataService } from './mock-football-data';

export interface Match {
  id: number;
  utcDate: string;
  status: 'SCHEDULED' | 'LIVE' | 'IN_PLAY' | 'PAUSED' | 'FINISHED' | 'POSTPONED' | 'SUSPENDED' | 'CANCELLED';
  minute?: number;
  homeTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  awayTeam: {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
  };
  score: {
    winner?: 'HOME_TEAM' | 'AWAY_TEAM' | 'DRAW';
    duration: string;
    fullTime: {
      home: number | null;
      away: number | null;
    };
    halfTime: {
      home: number | null;
      away: number | null;
    };
  };
  competition: {
    id: number;
    name: string;
    code: string;
    type: string;
    emblem: string;
  };
  season: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
  };
  odds?: {
    msg: string;
  };
}

export interface Competition {
  id: number;
  name: string;
  code: string;
  type: string;
  emblem: string;
  plan: string;
  currentSeason: {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner?: any;
  };
  numberOfAvailableSeasons: number;
  lastUpdated: string;
}

export interface Team {
  id: number;
  name: string;
  shortName: string;
  tla: string;
  crest: string;
  address: string;
  website: string;
  founded: number;
  clubColors: string;
  venue: string;
  runningCompetitions: Competition[];
  coach: {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
  };
  squad: Array<{
    id: number;
    name: string;
    position: string;
    dateOfBirth: string;
    nationality: string;
  }>;
  staff: Array<{
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    role: string;
  }>;
  lastUpdated: string;
}

export interface Standing {
  stage: string;
  type: string;
  group?: string;
  table: Array<{
    position: number;
    team: {
      id: number;
      name: string;
      shortName: string;
      tla: string;
      crest: string;
    };
    playedGames: number;
    form?: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
  }>;
}

class FootballDataService {
  private baseUrl: string;
  private apiKey: string;
  private useMockData: boolean;

  constructor() {
    this.baseUrl = process.env.FOOTBALL_API_URL || process.env.FOOTBALL_DATA_BASE_URL || 'https://api.football-data.org/v4';
    this.apiKey = process.env.FOOTBALL_API_KEY || process.env.FOOTBALL_DATA_API_KEY || '';
    this.useMockData = !this.apiKey || this.apiKey === 'your-football-data-api-key';
  }

  private async makeRequest<T>(endpoint: string): Promise<T> {
    // Use mock data if API key is not available
    if (this.useMockData) {
      console.log('Using mock data - API key not configured');
      throw new Error('API key not configured, using mock data');
    }

    const url = `${this.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        headers: {
          'X-Auth-Token': this.apiKey,
          'Content-Type': 'application/json',
        },
        next: { revalidate: 300 } // Cache for 5 minutes
      });

      if (!response.ok) {
        throw new Error(`Football Data API error: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Football Data API request failed:', error);
      throw error;
    }
  }

  // Get all available competitions
  async getCompetitions(): Promise<{ competitions: Competition[] }> {
    try {
      return this.makeRequest('/competitions');
    } catch (error) {
      return mockFootballDataService.getCompetitions();
    }
  }

  // Get matches for today
  async getTodayMatches(): Promise<{ matches: Match[] }> {
    try {
      const today = new Date().toISOString().split('T')[0];
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const tomorrowStr = tomorrow.toISOString().split('T')[0];
      
      // Bugün ve yarın için maç ara
      return this.makeRequest(`/matches?dateFrom=${today}&dateTo=${tomorrowStr}`);
    } catch (error) {
      return mockFootballDataService.getTodayMatches();
    }
  }

  // Get matches for a specific date range
  async getMatches(dateFrom?: string, dateTo?: string): Promise<{ matches: Match[] }> {
    try {
      let endpoint = '/matches';
      const params = new URLSearchParams();
      
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
      
      return this.makeRequest(endpoint);
    } catch (error) {
      return mockFootballDataService.getMatches(dateFrom, dateTo);
    }
  }

  // Get matches for a specific competition
  async getCompetitionMatches(competitionId: number, dateFrom?: string, dateTo?: string): Promise<{ matches: Match[] }> {
    try {
      let endpoint = `/competitions/${competitionId}/matches`;
      const params = new URLSearchParams();
      
      if (dateFrom) params.append('dateFrom', dateFrom);
      if (dateTo) params.append('dateTo', dateTo);
      
      if (params.toString()) {
        endpoint += `?${params.toString()}`;
      }
      
      return this.makeRequest(endpoint);
    } catch (error) {
      return mockFootballDataService.getCompetitionMatches(competitionId, dateFrom, dateTo);
    }
  }

  // Get competition standings
  async getCompetitionStandings(competitionId: number): Promise<{ standings: Standing[] }> {
    return this.makeRequest(`/competitions/${competitionId}/standings`);
  }

  // Get team information
  async getTeam(teamId: number): Promise<Team> {
    return this.makeRequest(`/teams/${teamId}`);
  }

  // Get team matches
  async getTeamMatches(teamId: number, dateFrom?: string, dateTo?: string): Promise<{ matches: Match[] }> {
    let endpoint = `/teams/${teamId}/matches`;
    const params = new URLSearchParams();
    
    if (dateFrom) params.append('dateFrom', dateFrom);
    if (dateTo) params.append('dateTo', dateTo);
    
    if (params.toString()) {
      endpoint += `?${params.toString()}`;
    }
    
    return this.makeRequest(endpoint);
  }

  // Get head-to-head matches between two teams
  async getHeadToHead(team1Id: number, team2Id: number, limit: number = 10): Promise<{ matches: Match[] }> {
    try {
      return this.makeRequest(`/teams/${team1Id}/matches?opponent=${team2Id}&limit=${limit}`);
    } catch (error) {
      // Return empty for mock data
      return { matches: [] };
    }
  }

  // Helper methods for better UX
  
  // Get live matches
  async getLiveMatches(): Promise<{ matches: Match[] }> {
    try {
      const { matches } = await this.getTodayMatches();
      return {
        matches: matches.filter(match => 
          match.status === 'LIVE' || match.status === 'IN_PLAY'
        )
      };
    } catch (error) {
      return mockFootballDataService.getLiveMatches();
    }
  }

  // Popular competitions IDs for easy access
  static readonly COMPETITIONS = {
    PREMIER_LEAGUE: 2021,
    CHAMPIONS_LEAGUE: 2001,
    BUNDESLIGA: 2002,
    SERIE_A: 2019,
    LIGUE_1: 2015,
    LA_LIGA: 2014,
    EREDIVISIE: 2003,
    PRIMEIRA_LIGA: 2017,
    CHAMPIONSHIP: 2016,
    EUROPEAN_CHAMPIONSHIP: 2018,
    WORLD_CUP: 2000,
    COPA_AMERICA: 2013,
    TURKISH_SUPER_LIG: 2024
  } as const;

  // Get upcoming matches for next 7 days
  async getUpcomingMatches(days: number = 7): Promise<{ matches: Match[] }> {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);

      return this.getMatches(
        today.toISOString().split('T')[0],
        futureDate.toISOString().split('T')[0]
      );
    } catch (error) {
      return mockFootballDataService.getUpcomingMatches(days);
    }
  }

  // Get popular leagues matches for today and upcoming days
  async getPopularLeaguesMatches(): Promise<{ [key: string]: Match[] }> {
    const popularLeagues = [
      { name: 'Premier League', id: FootballDataService.COMPETITIONS.PREMIER_LEAGUE },
      { name: 'Champions League', id: FootballDataService.COMPETITIONS.CHAMPIONS_LEAGUE },
      { name: 'La Liga', id: FootballDataService.COMPETITIONS.LA_LIGA },
      { name: 'Bundesliga', id: FootballDataService.COMPETITIONS.BUNDESLIGA },
      { name: 'Serie A', id: FootballDataService.COMPETITIONS.SERIE_A }
    ];

    const today = new Date().toISOString().split('T')[0];
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split('T')[0];
    
    const results: { [key: string]: Match[] } = {};

    for (const league of popularLeagues) {
      try {
        const { matches } = await this.getCompetitionMatches(league.id, today, nextWeekStr);
        results[league.name] = matches;
      } catch (error) {
        console.error(`Error fetching ${league.name} matches:`, error);
        results[league.name] = [];
      }
    }

    return results;
  }

  // Get team form (last 5 matches)
  async getTeamForm(teamId: number): Promise<string> {
    try {
      const today = new Date();
      const pastDate = new Date();
      pastDate.setDate(today.getDate() - 90); // Last 3 months

      const { matches } = await this.getTeamMatches(
        teamId,
        pastDate.toISOString().split('T')[0],
        today.toISOString().split('T')[0]
      );

      const finishedMatches = matches
        .filter(match => match.status === 'FINISHED')
        .sort((a, b) => new Date(b.utcDate).getTime() - new Date(a.utcDate).getTime())
        .slice(0, 5);

      let form = '';
      finishedMatches.forEach(match => {
        const isHome = match.homeTeam.id === teamId;
        const teamScore = isHome ? match.score.fullTime.home : match.score.fullTime.away;
        const opponentScore = isHome ? match.score.fullTime.away : match.score.fullTime.home;

        if (teamScore! > opponentScore!) {
          form += 'W';
        } else if (teamScore! < opponentScore!) {
          form += 'L';
        } else {
          form += 'D';
        }
      });

      return form;
    } catch (error) {
      console.error('Error fetching team form:', error);
      return '';
    }
  }

  // Get competition info with Turkish names
  getCompetitionDisplayName(competitionCode: string): string {
    const displayNames: { [key: string]: string } = {
      'PL': 'Premier Lig',
      'CL': 'Şampiyonlar Ligi',
      'BL1': 'Bundesliga',
      'SA': 'Serie A',
      'FL1': 'Ligue 1',
      'PD': 'La Liga',
      'DED': 'Eredivisie',
      'PPL': 'Primeira Liga',
      'ELC': 'Championship',
      'EC': 'Avrupa Şampiyonası',
      'WC': 'Dünya Kupası',
      'CLI': 'Copa America'
    };

    return displayNames[competitionCode] || competitionCode;
  }

  // Format match time for Turkish locale
  formatMatchTime(utcDate: string): string {
    const date = new Date(utcDate);
    return date.toLocaleString('tr-TR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  // Get match status in Turkish
  getMatchStatusTurkish(status: string): string {
    const statusMap: { [key: string]: string } = {
      'SCHEDULED': 'Planlandı',
      'LIVE': 'Canlı',
      'IN_PLAY': 'Oynanıyor',
      'PAUSED': 'Devre Arası',
      'FINISHED': 'Bitti',
      'POSTPONED': 'Ertelendi',
      'SUSPENDED': 'Askıya Alındı',
      'CANCELLED': 'İptal Edildi'
    };

    return statusMap[status] || status;
  }
}

export const footballDataService = new FootballDataService();
export default footballDataService;
