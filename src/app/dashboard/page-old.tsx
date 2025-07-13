'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useMatches, useCompetitions, useLiveMatches } from '@/hooks/useFootballData';
import { footballDataService } from '@/lib/football-data';
import { 
  Calendar, 
  Trophy, 
  TrendingUp, 
  Clock, 
  Star,
  Play,
  Pause,
  Target,
  DollarSign,
  BarChart3,
  Users,
  Zap,
  ArrowRight,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Loader2,
  Activity,
  Globe,
  Flame,
  Eye
} from 'lucide-react';

export default function DashboardPage() {
  const [selectedCompetition, setSelectedCompetition] = useState<number | undefined>(2021); // Premier League
  const [refreshKey, setRefreshKey] = useState(0);
  
  const { data: matchesData, loading: matchesLoading, error: matchesError } = useMatches(selectedCompetition);
  const { data: competitions, loading: competitionsLoading } = useCompetitions();
  const { data: liveMatches, loading: liveLoading } = useLiveMatches();

  // Refresh data function
  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const formatTime = (dateString: string) => {
    return footballDataService.formatMatchTime(dateString);
  };

  const getMatchStatus = (match: any) => {
    return footballDataService.getMatchStatusTurkish(match.status);
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'LIVE':
      case 'IN_PLAY':
        return 'bg-red-500 text-white animate-pulse';
      case 'FINISHED':
        return 'bg-green-500 text-white';
      case 'SCHEDULED':
        return 'bg-blue-500 text-white';
      case 'POSTPONED':
      case 'SUSPENDED':
        return 'bg-yellow-500 text-white';
      case 'CANCELLED':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  if (matchesError) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md mx-auto border-red-200">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Veri Yüklenirken Hata</h3>
            <p className="text-gray-600 mb-4">{matchesError}</p>
            <Button onClick={refreshData} variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Tekrar Dene
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">{/* Dashboard content will be added here */}
        return { text: 'Bilinmiyor', color: 'bg-gray-400 text-white', icon: AlertCircle };
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
            AI destekli futbol analiz platformu
          </p>
        </div>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600">
          <RefreshCw className="h-4 w-4 mr-2" />
          Verileri Yenile
        </Button>
      </div>

      {/* Live Matches Alert */}
      {liveMatches.length > 0 && (
        <Card className="border-0 shadow-lg bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center text-red-700">
              <Play className="h-5 w-5 mr-2 animate-pulse" />
              Şu Anda {liveMatches.length} Maç Canlı
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {liveMatches.slice(0, 3).map((match) => (
                <div key={match.id} className="flex items-center justify-between p-3 bg-white rounded-lg shadow-sm">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={match.homeTeam.crest} 
                      alt={match.homeTeam.name}
                      className="w-6 h-6"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                    <span className="font-medium">{match.homeTeam.shortName}</span>
                    <span className="text-red-600 font-bold">
                      {match.score.fullTime.home} - {match.score.fullTime.away}
                    </span>
                    <span className="font-medium">{match.awayTeam.shortName}</span>
                    <img 
                      src={match.awayTeam.crest} 
                      alt={match.awayTeam.name}
                      className="w-6 h-6"
                      onError={(e) => { e.currentTarget.style.display = 'none'; }}
                    />
                  </div>
                  <Badge className="bg-red-100 text-red-700 animate-pulse">
                    {match.minute}'
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-sm text-gray-600">Başarı Oranı</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">156</p>
                <p className="text-sm text-gray-600">Toplam Tahmin</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <DollarSign className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">₺2,340</p>
                <p className="text-sm text-gray-600">Toplam Kar</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Aktif Tahmin</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
          <TabsTrigger value="matches" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Maçlar
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            <Target className="h-4 w-4 mr-2" />
            Tahminler
          </TabsTrigger>
          <TabsTrigger value="workspace" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
            <Users className="h-4 w-4 mr-2" />
            Workspace
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analitik
          </TabsTrigger>
        </TabsList>

        <TabsContent value="matches">
          <div className="space-y-6">
            {/* Competition Filter */}
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                  Lig Seçimi
                </CardTitle>
              </CardHeader>
              <CardContent>
                {competitionsLoading ? (
                  <div className="flex items-center justify-center p-4">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-500" />
                    <span className="ml-2">Ligler yükleniyor...</span>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedCompetition === undefined ? "default" : "outline"}
                      onClick={() => setSelectedCompetition(undefined)}
                      size="sm"
                    >
                      Tüm Ligler
                    </Button>
                    {competitions.slice(0, 6).map((comp) => (
                      <Button
                        key={comp.id}
                        variant={selectedCompetition === comp.id ? "default" : "outline"}
                        onClick={() => setSelectedCompetition(comp.id)}
                        size="sm"
                        className="flex items-center space-x-2"
                      >
                        <img 
                          src={comp.emblem} 
                          alt={comp.name}
                          className="w-4 h-4"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span>{comp.code}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Today's Matches */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                  Bugünün Maçları
                </CardTitle>
                <CardDescription>
                  {new Date().toLocaleDateString('tr-TR', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {matchesLoading ? (
                  <div className="flex items-center justify-center p-8">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <span className="ml-3">Maçlar yükleniyor...</span>
                  </div>
                ) : matchesError ? (
                  <div className="text-center p-8 text-red-600">
                    <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                    <p>{matchesError}</p>
                  </div>
                ) : matchesData?.todayMatches.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">
                    <Calendar className="h-8 w-8 mx-auto mb-2" />
                    <p>Bugün maç bulunmuyor</p>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {matchesData?.todayMatches.slice(0, 5).map((match) => {
                      const status = getMatchStatus(match);
                      return (
                        <div key={match.id} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-4 flex-1">
                              <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <img 
                                  src={match.homeTeam.crest} 
                                  alt={match.homeTeam.name}
                                  className="w-8 h-8 flex-shrink-0"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                                <span className="font-medium truncate">{match.homeTeam.shortName}</span>
                              </div>
                              
                              <div className="flex items-center space-x-2 text-center min-w-0">
                                {match.status === 'FINISHED' || match.status === 'LIVE' || match.status === 'IN_PLAY' ? (
                                  <span className="font-bold text-lg">
                                    {match.score.fullTime.home} - {match.score.fullTime.away}
                                  </span>
                                ) : (
                                  <span className="text-gray-500 text-sm">vs</span>
                                )}
                              </div>
                              
                              <div className="flex items-center space-x-2 min-w-0 flex-1 justify-end">
                                <span className="font-medium truncate">{match.awayTeam.shortName}</span>
                                <img 
                                  src={match.awayTeam.crest} 
                                  alt={match.awayTeam.name}
                                  className="w-8 h-8 flex-shrink-0"
                                  onError={(e) => { e.currentTarget.style.display = 'none'; }}
                                />
                              </div>
                            </div>
                            
                            <div className="flex items-center space-x-3 ml-4">
                              <Badge className={status.color}>
                                <status.icon className="h-3 w-3 mr-1" />
                                {status.text}
                              </Badge>
                              <Button size="sm" variant="outline">
                                <ArrowRight className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          
                          {match.competition && (
                            <div className="mt-2 flex items-center text-sm text-gray-500">
                              <img 
                                src={match.competition.emblem} 
                                alt={match.competition.name}
                                className="w-4 h-4 mr-1"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                              {match.competition.name}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Upcoming Matches */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-green-600" />
                  Yaklaşan Maçlar
                </CardTitle>
                <CardDescription>Önümüzdeki günlerin programı</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                {matchesData?.upcomingMatches.length === 0 ? (
                  <div className="text-center p-8 text-gray-500">
                    <Clock className="h-8 w-8 mx-auto mb-2" />
                    <p>Yaklaşan maç bulunmuyor</p>
                  </div>
                ) : (
                  <div className="grid gap-3">
                    {matchesData?.upcomingMatches.slice(0, 5).map((match) => (
                      <div key={match.id} className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="text-sm text-gray-500 min-w-0">
                              {formatDate(match.utcDate)}
                            </div>
                            <div className="flex items-center space-x-2">
                              <img 
                                src={match.homeTeam.crest} 
                                alt={match.homeTeam.name}
                                className="w-6 h-6"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                              <span className="font-medium">{match.homeTeam.shortName}</span>
                              <span className="text-gray-400">vs</span>
                              <span className="font-medium">{match.awayTeam.shortName}</span>
                              <img 
                                src={match.awayTeam.crest} 
                                alt={match.awayTeam.name}
                                className="w-6 h-6"
                                onError={(e) => { e.currentTarget.style.display = 'none'; }}
                              />
                            </div>
                          </div>
                          <Badge variant="outline" className="text-blue-600">
                            {formatTime(match.utcDate)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="flex items-center">
                <Target className="h-5 w-5 mr-2 text-green-600" />
                Tahmin Merkezi
              </CardTitle>
              <CardDescription>AI destekli tahminlerinizi yönetin</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <Target className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h3 className="text-lg font-semibold mb-2">Tahmin Sistemi Geliştiriliyor</h3>
                <p className="text-gray-600 mb-4">AI tahmin motoru yakında aktif olacak</p>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500">
                  <Star className="h-4 w-4 mr-2" />
                  Erken Erişim Al
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="workspace">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-purple-600" />
                Bahis Workspace
              </CardTitle>
              <CardDescription>Bahis stratejilerinizi geliştirin</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <Users className="h-12 w-12 mx-auto mb-4 text-purple-500" />
                <h3 className="text-lg font-semibold mb-2">Workspace Özellikleri</h3>
                <p className="text-gray-600 mb-4">Gelişmiş analiz araçları yakında</p>
                <Button className="bg-gradient-to-r from-purple-500 to-blue-500">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Beta'ya Katıl
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-orange-600" />
                Performans Analizi
              </CardTitle>
              <CardDescription>Detaylı istatistik ve raporlar</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="text-center p-8">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-orange-500" />
                <h3 className="text-lg font-semibold mb-2">Analitik Dashboard</h3>
                <p className="text-gray-600 mb-4">Kapsamlı analiz araçları hazırlanıyor</p>
                <Button className="bg-gradient-to-r from-orange-500 to-red-500">
                  <Trophy className="h-4 w-4 mr-2" />
                  Premium Özellikler
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
