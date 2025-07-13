import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Trophy, 
  Target, 
  BarChart3,
  TrendingUp,
  Calendar,
  MapPin,
  Users,
  Activity,
  Star,
  Shield,
  Zap,
  Clock,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

// Mock data for match analysis
const matchData = {
  id: 1,
  homeTeam: "Manchester United",
  awayTeam: "Liverpool",
  league: "Premier League",
  date: "2025-01-15",
  time: "20:00",
  venue: "Old Trafford",
  confidence: 85,
  prediction: "Liverpool 2-1 Galibiyeti",
  odds: { home: 2.10, draw: 3.40, away: 3.20 },
  aiScore: 92
};

const teamStats = {
  home: {
    form: ["W", "L", "W", "D", "W"],
    goals: { scored: 12, conceded: 8 },
    homeRecord: { played: 8, wins: 5, draws: 2, losses: 1 },
    keyPlayers: ["Marcus Rashford", "Bruno Fernandes", "Casemiro"]
  },
  away: {
    form: ["W", "W", "D", "W", "L"],
    goals: { scored: 15, conceded: 6 },
    awayRecord: { played: 8, wins: 6, draws: 1, losses: 1 },
    keyPlayers: ["Mohamed Salah", "Virgil van Dijk", "Sadio Mané"]
  }
};

const headToHead = [
  { date: "2024-12-15", homeTeam: "Liverpool", awayTeam: "Manchester United", score: "2-1", result: "away" },
  { date: "2024-09-22", homeTeam: "Manchester United", awayTeam: "Liverpool", score: "0-3", result: "away" },
  { date: "2024-04-07", homeTeam: "Liverpool", awayTeam: "Manchester United", score: "2-2", result: "draw" },
  { date: "2024-01-14", homeTeam: "Manchester United", awayTeam: "Liverpool", score: "1-2", result: "away" },
  { date: "2023-10-29", homeTeam: "Liverpool", awayTeam: "Manchester United", score: "3-1", result: "home" }
];

const predictions = [
  { type: "Maç Sonucu", prediction: "Liverpool Galibiyet", confidence: 85, reasoning: "Liverpool'un deplasman formu ve Man United'ın savunma sorunları" },
  { type: "Gol Sayısı", prediction: "2.5 Üst", confidence: 78, reasoning: "Her iki takımın da son maçlardaki gol ortalaması yüksek" },
  { type: "İlk Yarı", prediction: "Beraberlik", confidence: 72, reasoning: "Son karşılaşmalarda ilk yarılar genelde dengeli geçiyor" },
  { type: "Kartlar", prediction: "5+ Sarı Kart", confidence: 68, reasoning: "Rekabet yoğunluğu ve hakem geçmişi analizi" }
];

export default function MatchDetailPage() {
  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" asChild>
              <Link href="/dashboard/matches">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Maçlara Dön
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Maç Analizi
              </h1>
              <p className="text-gray-600 mt-2 flex items-center">
                <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
                Detaylı AI destekli maç analizi
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">AI Güven Skoru</div>
            <div className="text-2xl font-bold text-blue-600">{matchData.aiScore}/100</div>
          </div>
        </div>

        {/* Match Overview */}
        <Card className="border-0 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 border-b">
            <div className="flex items-center justify-between mb-4">
              <Badge variant="secondary" className="bg-white text-gray-700">
                <MapPin className="h-3 w-3 mr-1" />
                {matchData.league}
              </Badge>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">AI Score: {matchData.aiScore}</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 items-center">
              {/* Home Team */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-700">MU</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{matchData.homeTeam}</h3>
                <p className="text-sm text-gray-500">Ev Sahibi</p>
                <div className="mt-2">
                  <div className="text-lg font-bold text-red-600">{matchData.odds.home}</div>
                  <div className="text-xs text-gray-500">Oran</div>
                </div>
              </div>

              {/* Match Info */}
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-300 mb-2">VS</div>
                <div className="space-y-2">
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(matchData.date).toLocaleDateString('tr-TR')}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {matchData.time}
                  </div>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {matchData.venue}
                  </div>
                </div>
              </div>

              {/* Away Team */}
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-red-700">LIV</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900">{matchData.awayTeam}</h3>
                <p className="text-sm text-gray-500">Deplasman</p>
                <div className="mt-2">
                  <div className="text-lg font-bold text-green-600">{matchData.odds.away}</div>
                  <div className="text-xs text-gray-500">Oran</div>
                </div>
              </div>
            </div>

            {/* AI Prediction */}
            <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-blue-600" />
                  <span className="font-medium text-blue-700">AI Tahmini</span>
                  <Badge className="bg-green-100 text-green-700">%{matchData.confidence} güven</Badge>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  <Target className="h-4 w-4 mr-2" />
                  Tahmin Yap
                </Button>
              </div>
              <div className="mt-2 font-semibold text-gray-900">{matchData.prediction}</div>
            </div>
          </div>
        </Card>

        <Tabs defaultValue="analysis" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger value="analysis" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analiz
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <Users className="h-4 w-4 mr-2" />
              Takım İstatistikleri
            </TabsTrigger>
            <TabsTrigger value="h2h" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Trophy className="h-4 w-4 mr-2" />
              Karşılaşma Geçmişi
            </TabsTrigger>
            <TabsTrigger value="predictions" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              <Target className="h-4 w-4 mr-2" />
              Tahmin Detayları
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analysis">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-blue-600" />
                    Takım Formu
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">{matchData.homeTeam}</span>
                        <div className="flex space-x-1">
                          {teamStats.home.form.map((result, index) => (
                            <div key={index} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              result === 'W' ? 'bg-green-500 text-white' :
                              result === 'D' ? 'bg-yellow-500 text-white' :
                              'bg-red-500 text-white'
                            }`}>
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-bold text-green-600">{teamStats.home.goals.scored}</div>
                          <div className="text-gray-500">Attığı Gol</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-bold text-red-600">{teamStats.home.goals.conceded}</div>
                          <div className="text-gray-500">Yediği Gol</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">{matchData.awayTeam}</span>
                        <div className="flex space-x-1">
                          {teamStats.away.form.map((result, index) => (
                            <div key={index} className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              result === 'W' ? 'bg-green-500 text-white' :
                              result === 'D' ? 'bg-yellow-500 text-white' :
                              'bg-red-500 text-white'
                            }`}>
                              {result}
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-bold text-green-600">{teamStats.away.goals.scored}</div>
                          <div className="text-gray-500">Attığı Gol</div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="font-bold text-red-600">{teamStats.away.goals.conceded}</div>
                          <div className="text-gray-500">Yediği Gol</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-green-600" />
                    Ev/Deplasman Performansı
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">{matchData.homeTeam} (Ev Sahibi)</h4>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{teamStats.home.homeRecord.wins}</div>
                          <div className="text-gray-500">Galibiyet</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-bold text-yellow-600">{teamStats.home.homeRecord.draws}</div>
                          <div className="text-gray-500">Beraberlik</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="font-bold text-red-600">{teamStats.home.homeRecord.losses}</div>
                          <div className="text-gray-500">Mağlubiyet</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium text-gray-900 mb-3">{matchData.awayTeam} (Deplasman)</h4>
                      <div className="grid grid-cols-3 gap-3 text-sm">
                        <div className="text-center p-2 bg-green-50 rounded">
                          <div className="font-bold text-green-600">{teamStats.away.awayRecord.wins}</div>
                          <div className="text-gray-500">Galibiyet</div>
                        </div>
                        <div className="text-center p-2 bg-yellow-50 rounded">
                          <div className="font-bold text-yellow-600">{teamStats.away.awayRecord.draws}</div>
                          <div className="text-gray-500">Beraberlik</div>
                        </div>
                        <div className="text-center p-2 bg-red-50 rounded">
                          <div className="font-bold text-red-600">{teamStats.away.awayRecord.losses}</div>
                          <div className="text-gray-500">Mağlubiyet</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
                  <CardTitle>{matchData.homeTeam}</CardTitle>
                  <CardDescription>Ev sahibi takım istatistikleri</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Anahtar Oyuncular</h4>
                      <div className="space-y-2">
                        {teamStats.home.keyPlayers.map((player, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {player.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{player}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
                  <CardTitle>{matchData.awayTeam}</CardTitle>
                  <CardDescription>Deplasman takımı istatistikleri</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Anahtar Oyuncular</h4>
                      <div className="space-y-2">
                        {teamStats.away.keyPlayers.map((player, index) => (
                          <div key={index} className="flex items-center space-x-2 p-2 bg-gray-50 rounded">
                            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              {player.split(' ').map(n => n[0]).join('')}
                            </div>
                            <span className="font-medium">{player}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="h2h">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Trophy className="h-5 w-5 mr-2 text-purple-600" />
                  Son 5 Karşılaşma
                </CardTitle>
                <CardDescription>Takımların karşılaşma geçmişi</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {headToHead.map((match, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">
                          {match.homeTeam} vs {match.awayTeam}
                        </div>
                        <div className="text-sm text-gray-500">
                          {new Date(match.date).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      <div className="text-center mx-4">
                        <div className="font-bold text-lg">{match.score}</div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          match.result === 'home' ? 'bg-blue-100 text-blue-700' :
                          match.result === 'away' ? 'bg-red-100 text-red-700' :
                          'bg-gray-100 text-gray-700'
                        }>
                          {match.result === 'home' ? 'Ev Sahibi' :
                           match.result === 'away' ? 'Deplasman' : 'Beraberlik'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="predictions">
            <div className="space-y-6">
              {predictions.map((pred, index) => (
                <Card key={index} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{pred.type}</h3>
                        <p className="text-blue-600 font-medium">{pred.prediction}</p>
                      </div>
                      <Badge className={
                        pred.confidence >= 80 ? 'bg-green-100 text-green-700' :
                        pred.confidence >= 70 ? 'bg-yellow-100 text-yellow-700' :
                        'bg-orange-100 text-orange-700'
                      }>
                        %{pred.confidence} güven
                      </Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{pred.reasoning}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
