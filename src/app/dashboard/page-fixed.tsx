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

  const refreshData = () => {
    setRefreshKey(prev => prev + 1);
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR', {
      day: 'numeric',
      month: 'short'
    });
  };

  const getMatchStatus = (match: any) => {
    switch (match.status) {
      case 'LIVE':
      case 'IN_PLAY':
        return { text: 'Canlı', color: 'bg-red-500 text-white animate-pulse', icon: Play };
      case 'PAUSED':
        return { text: 'Devre', color: 'bg-orange-500 text-white', icon: Clock };
      case 'FINISHED':
        return { text: 'Bitti', color: 'bg-green-500 text-white', icon: CheckCircle };
      case 'SCHEDULED':
        return { text: formatTime(match.utcDate), color: 'bg-blue-500 text-white', icon: Clock };
      case 'POSTPONED':
        return { text: 'Ertelendi', color: 'bg-yellow-500 text-white', icon: AlertCircle };
      case 'CANCELLED':
        return { text: 'İptal', color: 'bg-gray-500 text-white', icon: AlertCircle };
      default:
        return { text: 'Bilinmiyor', color: 'bg-gray-400 text-white', icon: AlertCircle };
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
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            AI Futbol Analiz Dashboard
          </h1>
          <p className="text-gray-600 mt-2 flex items-center">
            <Activity className="h-4 w-4 mr-1 text-blue-500" />
            Maç analizleri, tahminler ve canlı skorlar
          </p>
        </div>
        <Button onClick={refreshData} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          Yenile
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bugünkü Maçlar</p>
                <p className="text-2xl font-bold text-gray-900">
                  {matchesLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    matchesData?.todayMatches?.length || 0
                  )}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Canlı Maçlar</p>
                <p className="text-2xl font-bold text-gray-900">
                  {liveLoading ? (
                    <Loader2 className="h-6 w-6 animate-spin" />
                  ) : (
                    liveMatches?.length || 0
                  )}
                </p>
              </div>
              <div className="bg-red-100 p-3 rounded-full">
                <Play className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">AI Tahminleri</p>
                <p className="text-2xl font-bold text-gray-900">156</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full">
                <Zap className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Başarı Oranı</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="today" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
          <TabsTrigger value="today" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
            <Calendar className="h-4 w-4 mr-2" />
            Bugünkü Maçlar
          </TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
            <Flame className="h-4 w-4 mr-2" />
            Canlı Maçlar ({liveMatches?.length || 0})
          </TabsTrigger>
          <TabsTrigger value="predictions" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
            <Target className="h-4 w-4 mr-2" />
            AI Tahminleri
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
            <BarChart3 className="h-4 w-4 mr-2" />
            Analizler
          </TabsTrigger>
        </TabsList>

        {/* Today's Matches Tab */}
        <TabsContent value="today">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
              <CardTitle className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-600" />
                Bugünkü Maçlar
              </CardTitle>
              <CardDescription>
                Günün tüm maçları ve tahminler
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {matchesLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                  <span className="ml-2 text-gray-600">Maçlar yükleniyor...</span>
                </div>
              ) : matchesData?.todayMatches && matchesData.todayMatches.length > 0 ? (
                <div className="space-y-4">
                  {matchesData.todayMatches.slice(0, 10).map((match: any) => {
                    const status = getMatchStatus(match);
                    return (
                      <div key={match.id} className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors cursor-pointer">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-center min-w-[100px]">
                              <div className="font-medium text-sm">{match.homeTeam.shortName || match.homeTeam.name}</div>
                              <div className="text-xs text-gray-500">Ev Sahibi</div>
                            </div>
                            
                            <div className="text-center min-w-[80px]">
                              {match.status === 'FINISHED' ? (
                                <div className="text-2xl font-bold text-gray-900">
                                  {match.score?.fullTime?.home || 0}
                                  {' : '}
                                  {match.score?.fullTime?.away || 0}
                                </div>
                              ) : (
                                <div className="text-lg font-medium text-gray-600">
                                  vs
                                </div>
                              )}
                              <Badge className={status.color}>
                                <status.icon className="h-3 w-3 mr-1" />
                                {status.text}
                              </Badge>
                            </div>
                            
                            <div className="text-center min-w-[100px]">
                              <div className="font-medium text-sm">{match.awayTeam.shortName || match.awayTeam.name}</div>
                              <div className="text-xs text-gray-500">Deplasman</div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{match.competition.name}</div>
                            <div className="text-xs text-gray-500">{formatDate(match.utcDate)}</div>
                            <Button size="sm" variant="outline" className="mt-2">
                              <Target className="h-3 w-3 mr-1" />
                              Analiz
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Bugün maç yok</h3>
                  <p className="text-gray-600">Bugünkü maçlar burada görünecek</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Live Matches Tab */}
        <TabsContent value="live">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
              <CardTitle className="flex items-center">
                <Play className="h-5 w-5 mr-2 text-red-600" />
                Canlı Maçlar
              </CardTitle>
              <CardDescription>
                Anlık skor takibi ve canlı güncellemeler
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              {liveLoading ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-red-600" />
                  <span className="ml-2 text-gray-600">Canlı maçlar yükleniyor...</span>
                </div>
              ) : liveMatches && liveMatches.length > 0 ? (
                <div className="space-y-4">
                  {liveMatches.map((match) => {
                    const status = getMatchStatus(match);
                    return (
                      <div key={match.id} className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-4 border border-red-200">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="text-center min-w-[100px]">
                              <div className="font-medium text-sm">{match.homeTeam.shortName || match.homeTeam.name}</div>
                              <div className="text-xs text-gray-500">Ev Sahibi</div>
                            </div>
                            
                            <div className="text-center min-w-[80px]">
                              <div className="text-2xl font-bold text-gray-900">
                                {match.score?.fullTime?.home !== null ? match.score.fullTime.home : '-'}
                                {' : '}
                                {match.score?.fullTime?.away !== null ? match.score.fullTime.away : '-'}
                              </div>
                              <Badge className={status.color}>
                                <status.icon className="h-3 w-3 mr-1" />
                                {status.text}
                              </Badge>
                            </div>
                            
                            <div className="text-center min-w-[100px]">
                              <div className="font-medium text-sm">{match.awayTeam.shortName || match.awayTeam.name}</div>
                              <div className="text-xs text-gray-500">Deplasman</div>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{match.competition.name}</div>
                            <div className="text-xs text-gray-500">
                              {match.minute && `${match.minute}'`}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Eye className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Şu an canlı maç yok</h3>
                  <p className="text-gray-600">Canlı maçlar burada görünecek</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* AI Predictions Tab */}
        <TabsContent value="predictions">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 border-b">
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2 text-purple-600" />
                AI Tahminleri
              </CardTitle>
              <CardDescription>
                Gelişmiş AI algoritmaları ile maç tahminleri
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid gap-4">
                {/* Sample AI Predictions */}
                <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full">
                        <Zap className="h-4 w-4 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Arsenal vs Chelsea</h4>
                        <p className="text-sm text-gray-600">Premier Lig • Bugün 17:00</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-100 text-purple-700">
                      AI Güven: %87
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tahmini Sonuç</span>
                      <span className="font-medium">Arsenal Kazanır</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Beklenen Skor</span>
                      <span className="font-medium">2-1</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Gol Tahmini</span>
                      <span className="font-medium">2.5+ Gol</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-lg p-4 border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="bg-white p-2 rounded-full">
                        <Zap className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">Manchester City vs Liverpool</h4>
                        <p className="text-sm text-gray-600">Premier Lig • Yarın 20:00</p>
                      </div>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">
                      AI Güven: %92
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Tahmini Sonuç</span>
                      <span className="font-medium">Beraberlik</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Beklenen Skor</span>
                      <span className="font-medium">2-2</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Risk Seviyesi</span>
                      <span className="font-medium text-yellow-600">Orta</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics">
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                Detaylı Analizler
              </CardTitle>
              <CardDescription>
                Takım ve oyuncu performans analizleri
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Performance Stats */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-3">Son 30 Gün Performansı</h4>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Doğru Tahmin</span>
                      <span className="font-medium text-green-600">78%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Karlılık</span>
                      <span className="font-medium text-blue-600">+24%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '24%' }}></div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Risk Yönetimi</span>
                      <span className="font-medium text-purple-600">Düşük</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
                
                {/* Top Leagues */}
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900 mb-3">En Başarılı Ligler</h4>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm font-medium">Premier Lig</span>
                      </div>
                      <Badge className="bg-green-100 text-green-700">%82</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">La Liga</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700">%79</Badge>
                    </div>
                    
                    <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-3">
                        <Trophy className="h-4 w-4 text-orange-400" />
                        <span className="text-sm font-medium">Bundesliga</span>
                      </div>
                      <Badge className="bg-purple-100 text-purple-700">%75</Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
