import { useState, useEffect } from 'react';
import { Match, Competition, Team, Standing } from '@/lib/football-data';

interface MatchesData {
  todayMatches: Match[];
  upcomingMatches: Match[];
  pastMatches: Match[];
  total: number;
}

export function useMatches(competitionId?: number, dateFrom?: string, dateTo?: string) {
  const [data, setData] = useState<MatchesData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        setError(null);

        const params = new URLSearchParams();
        if (competitionId) params.append('competitionId', competitionId.toString());
        if (dateFrom) params.append('dateFrom', dateFrom);
        if (dateTo) params.append('dateTo', dateTo);

        const response = await fetch(`/api/matches?${params.toString()}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch matches');
        }

        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, [competitionId, dateFrom, dateTo]);

  return { data, loading, error, refetch: () => {} };
}

export function useCompetitions() {
  const [data, setData] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCompetitions = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/competitions');
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch competitions');
        }

        setData(result.competitions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCompetitions();
  }, []);

  return { data, loading, error };
}

export function useStandings(competitionId: number) {
  const [data, setData] = useState<Standing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!competitionId) return;

    const fetchStandings = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/standings?competitionId=${competitionId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch standings');
        }

        setData(result.standings);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchStandings();
  }, [competitionId]);

  return { data, loading, error };
}

export function useTeam(teamId: number) {
  const [data, setData] = useState<Team | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!teamId) return;

    const fetchTeam = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`/api/teams?teamId=${teamId}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch team');
        }

        setData(result.team);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchTeam();
  }, [teamId]);

  return { data, loading, error };
}

// Utility hook for live match updates
export function useLiveMatches() {
  const [data, setData] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveMatches = async () => {
      try {
        const today = new Date().toISOString().split('T')[0];
        const response = await fetch(`/api/matches?dateFrom=${today}&dateTo=${today}`);
        const result = await response.json();

        if (!response.ok) {
          throw new Error(result.error || 'Failed to fetch live matches');
        }

        // Filter only live matches
        const liveMatches = result.todayMatches.filter((match: Match) => 
          match.status === 'LIVE' || match.status === 'IN_PLAY' || match.status === 'PAUSED'
        );

        setData(liveMatches);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchLiveMatches();

    // Poll for live matches every 30 seconds
    const interval = setInterval(fetchLiveMatches, 30000);

    return () => clearInterval(interval);
  }, []);

  return { data, loading, error };
}
