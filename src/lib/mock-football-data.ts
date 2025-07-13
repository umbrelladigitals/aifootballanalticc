// Mock data for development when API key is not available
import { Match, Competition, Team, Standing } from './football-data';

export const mockMatches: Match[] = [
  {
    id: 1,
    utcDate: new Date().toISOString(),
    status: 'LIVE',
    minute: 67,
    homeTeam: {
      id: 57,
      name: 'Arsenal FC',
      shortName: 'Arsenal',
      tla: 'ARS',
      crest: 'https://crests.football-data.org/57.png'
    },
    awayTeam: {
      id: 61,
      name: 'Chelsea FC',
      shortName: 'Chelsea',
      tla: 'CHE',
      crest: 'https://crests.football-data.org/61.png'
    },
    score: {
      winner: undefined,
      duration: 'REGULAR',
      fullTime: {
        home: 2,
        away: 1
      },
      halfTime: {
        home: 1,
        away: 0
      }
    },
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    season: {
      id: 1564,
      startDate: '2024-08-10',
      endDate: '2025-05-25',
      currentMatchday: 20
    }
  },
  {
    id: 2,
    utcDate: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
    status: 'SCHEDULED',
    homeTeam: {
      id: 65,
      name: 'Manchester City FC',
      shortName: 'Man City',
      tla: 'MCI',
      crest: 'https://crests.football-data.org/65.png'
    },
    awayTeam: {
      id: 64,
      name: 'Liverpool FC',
      shortName: 'Liverpool',
      tla: 'LIV',
      crest: 'https://crests.football-data.org/64.png'
    },
    score: {
      winner: undefined,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    },
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    season: {
      id: 1564,
      startDate: '2024-08-10',
      endDate: '2025-05-25',
      currentMatchday: 20
    }
  },
  {
    id: 3,
    utcDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
    status: 'SCHEDULED',
    homeTeam: {
      id: 66,
      name: 'Manchester United FC',
      shortName: 'Man United',
      tla: 'MUN',
      crest: 'https://crests.football-data.org/66.png'
    },
    awayTeam: {
      id: 73,
      name: 'Tottenham Hotspur FC',
      shortName: 'Tottenham',
      tla: 'TOT',
      crest: 'https://crests.football-data.org/73.png'
    },
    score: {
      winner: undefined,
      duration: 'REGULAR',
      fullTime: {
        home: null,
        away: null
      },
      halfTime: {
        home: null,
        away: null
      }
    },
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    season: {
      id: 1564,
      startDate: '2024-08-10',
      endDate: '2025-05-25',
      currentMatchday: 20
    }
  },
  {
    id: 4,
    utcDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // yesterday
    status: 'FINISHED',
    homeTeam: {
      id: 328,
      name: 'Burnley FC',
      shortName: 'Burnley',
      tla: 'BUR',
      crest: 'https://crests.football-data.org/328.png'
    },
    awayTeam: {
      id: 354,
      name: 'Crystal Palace FC',
      shortName: 'Crystal Palace',
      tla: 'CRY',
      crest: 'https://crests.football-data.org/354.png'
    },
    score: {
      winner: 'AWAY_TEAM',
      duration: 'REGULAR',
      fullTime: {
        home: 1,
        away: 3
      },
      halfTime: {
        home: 0,
        away: 2
      }
    },
    competition: {
      id: 2021,
      name: 'Premier League',
      code: 'PL',
      type: 'LEAGUE',
      emblem: 'https://crests.football-data.org/PL.png'
    },
    season: {
      id: 1564,
      startDate: '2024-08-10',
      endDate: '2025-05-25',
      currentMatchday: 20
    }
  }
];

export const mockCompetitions: Competition[] = [
  {
    id: 2021,
    name: 'Premier League',
    code: 'PL',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/PL.png',
    plan: 'TIER_ONE',
    currentSeason: {
      id: 1564,
      startDate: '2024-08-10',
      endDate: '2025-05-25',
      currentMatchday: 20
    },
    numberOfAvailableSeasons: 32,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2001,
    name: 'UEFA Champions League',
    code: 'CL',
    type: 'CUP',
    emblem: 'https://crests.football-data.org/CL.png',
    plan: 'TIER_ONE',
    currentSeason: {
      id: 1565,
      startDate: '2024-09-17',
      endDate: '2025-05-31',
      currentMatchday: 4
    },
    numberOfAvailableSeasons: 30,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2014,
    name: 'Primera División',
    code: 'PD',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/PD.png',
    plan: 'TIER_ONE',
    currentSeason: {
      id: 1566,
      startDate: '2024-08-18',
      endDate: '2025-05-25',
      currentMatchday: 19
    },
    numberOfAvailableSeasons: 30,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2002,
    name: 'Bundesliga',
    code: 'BL1',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/BL1.png',
    plan: 'TIER_ONE',
    currentSeason: {
      id: 1567,
      startDate: '2024-08-23',
      endDate: '2025-05-17',
      currentMatchday: 18
    },
    numberOfAvailableSeasons: 30,
    lastUpdated: new Date().toISOString()
  },
  {
    id: 2019,
    name: 'Serie A',
    code: 'SA',
    type: 'LEAGUE',
    emblem: 'https://crests.football-data.org/SA.png',
    plan: 'TIER_ONE',
    currentSeason: {
      id: 1568,
      startDate: '2024-08-18',
      endDate: '2025-05-25',
      currentMatchday: 19
    },
    numberOfAvailableSeasons: 30,
    lastUpdated: new Date().toISOString()
  }
];

export class MockFootballDataService {
  async getTodayMatches(): Promise<{ matches: Match[] }> {
    const today = new Date();
    const todayMatches = mockMatches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate.toDateString() === today.toDateString();
    });
    
    return { matches: todayMatches };
  }

  async getLiveMatches(): Promise<{ matches: Match[] }> {
    const liveMatches = mockMatches.filter(match => 
      match.status === 'LIVE' || match.status === 'IN_PLAY'
    );
    
    return { matches: liveMatches };
  }

  async getUpcomingMatches(days: number = 7): Promise<{ matches: Match[] }> {
    const now = new Date();
    const futureDate = new Date();
    futureDate.setDate(now.getDate() + days);
    
    const upcomingMatches = mockMatches.filter(match => {
      const matchDate = new Date(match.utcDate);
      return matchDate > now && matchDate <= futureDate;
    });
    
    return { matches: upcomingMatches };
  }

  async getMatches(dateFrom?: string, dateTo?: string): Promise<{ matches: Match[] }> {
    let filteredMatches = mockMatches;
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.utcDate) >= fromDate
      );
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.utcDate) <= toDate
      );
    }
    
    return { matches: filteredMatches };
  }

  async getCompetitionMatches(competitionId: number, dateFrom?: string, dateTo?: string): Promise<{ matches: Match[] }> {
    const competitionMatches = mockMatches.filter(match => 
      match.competition.id === competitionId
    );
    
    let filteredMatches = competitionMatches;
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.utcDate) >= fromDate
      );
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.utcDate) <= toDate
      );
    }
    
    return { matches: filteredMatches };
  }

  async getCompetitions(): Promise<{ competitions: Competition[] }> {
    return { competitions: mockCompetitions };
  }

  async getTeamMatches(teamId: number, dateFrom?: string, dateTo?: string): Promise<{ matches: Match[] }> {
    const teamMatches = mockMatches.filter(match => 
      match.homeTeam.id === teamId || match.awayTeam.id === teamId
    );
    
    let filteredMatches = teamMatches;
    
    if (dateFrom) {
      const fromDate = new Date(dateFrom);
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.utcDate) >= fromDate
      );
    }
    
    if (dateTo) {
      const toDate = new Date(dateTo);
      filteredMatches = filteredMatches.filter(match => 
        new Date(match.utcDate) <= toDate
      );
    }
    
    return { matches: filteredMatches };
  }

  // Helper methods for display
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

export const mockFootballDataService = new MockFootballDataService();
