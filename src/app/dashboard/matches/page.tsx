import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Trophy, 
  Search, 
  Filter, 
  Clock, 
  Target, 
  TrendingUp,
  BarChart3,
  Calendar,
  MapPin,
  Star
} from "lucide-react";
import Link from "next/link";

const mockMatches = [
  {
    id: 1,
    homeTeam: "Manchester United",
    awayTeam: "Liverpool",
    league: "Premier League",
    date: "2025-01-15",
    time: "20:00",
    confidence: 85,
    prediction: "Liverpool 2-1 Galibiyeti",
    odds: { home: 2.10, draw: 3.40, away: 3.20 },
    aiScore: 92,
    status: "upcoming"
  },
  {
    id: 2,
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    league: "La Liga",
    date: "2025-01-15",
    time: "22:00",
    confidence: 72,
    prediction: "Çok Gollü Maç (3+ Gol)",
    odds: { home: 2.50, draw: 3.10, away: 2.80 },
    aiScore: 88,
    status: "upcoming"
  },
  {
    id: 3,
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    league: "Bundesliga",
    date: "2025-01-16",
    time: "18:30",
    confidence: 78,
    prediction: "Bayern Munich Galibiyet",
    odds: { home: 1.85, draw: 3.60, away: 4.20 },
    aiScore: 90,
    status: "upcoming"
  },
  {
    id: 4,
    homeTeam: "PSG",
    awayTeam: "Marseille",
    league: "Ligue 1",
    date: "2025-01-16",
    time: "21:00",
    confidence: 81,
    prediction: "PSG 3-1 Galibiyet",
    odds: { home: 1.65, draw: 4.00, away: 5.50 },
    aiScore: 95,
    status: "upcoming"
  }
];

export default function MatchesPage() {
  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Maç Analizleri
            </h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <Trophy className="h-4 w-4 mr-1 text-blue-500" />
              AI destekli maç tahminleri ve analizleri
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Toplam Maç</div>
            <div className="text-2xl font-bold text-blue-600">{mockMatches.length}</div>
          </div>
        </div>

        {/* Filters */}
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
            <CardTitle className="flex items-center">
              <Filter className="h-5 w-5 mr-2 text-blue-600" />
              Filtreler
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Arama</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input placeholder="Takım ara..." className="pl-10" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Lig</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Lig seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tüm Ligler</SelectItem>
                    <SelectItem value="premier-league">Premier League</SelectItem>
                    <SelectItem value="la-liga">La Liga</SelectItem>
                    <SelectItem value="bundesliga">Bundesliga</SelectItem>
                    <SelectItem value="ligue-1">Ligue 1</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Tarih</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Tarih seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="today">Bugün</SelectItem>
                    <SelectItem value="tomorrow">Yarın</SelectItem>
                    <SelectItem value="week">Bu Hafta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Güven Oranı</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Güven oranı" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Tümü</SelectItem>
                    <SelectItem value="high">Yüksek (%80+)</SelectItem>
                    <SelectItem value="medium">Orta (%60-80)</SelectItem>
                    <SelectItem value="low">Düşük (%60-)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Matches Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {mockMatches.map((match) => (
            <Card key={match.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 border-b">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="secondary" className="bg-white text-gray-700">
                    <MapPin className="h-3 w-3 mr-1" />
                    {match.league}
                  </Badge>
                  <div className="flex items-center space-x-2">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium">AI Score: {match.aiScore}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(match.date).toLocaleDateString('tr-TR')}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{match.time}</span>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    match.confidence >= 80 ? 'bg-green-100 text-green-700' :
                    match.confidence >= 60 ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    %{match.confidence} güven
                  </div>
                </div>
              </div>

              <CardContent className="p-6">
                {/* Teams */}
                <div className="flex items-center justify-center mb-6">
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-blue-700">
                        {match.homeTeam.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <div className="font-bold text-lg text-gray-900">{match.homeTeam}</div>
                    <div className="text-sm text-gray-500">Ev Sahibi</div>
                  </div>
                  
                  <div className="px-4">
                    <div className="text-4xl font-bold text-gray-300">VS</div>
                  </div>
                  
                  <div className="text-center flex-1">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-2">
                      <span className="text-2xl font-bold text-purple-700">
                        {match.awayTeam.split(' ').map(word => word[0]).join('')}
                      </span>
                    </div>
                    <div className="font-bold text-lg text-gray-900">{match.awayTeam}</div>
                    <div className="text-sm text-gray-500">Deplasman</div>
                  </div>
                </div>

                {/* Prediction */}
                <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center mb-2">
                    <Target className="h-4 w-4 mr-2 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">AI Tahmini</span>
                  </div>
                  <div className="font-semibold text-gray-900">{match.prediction}</div>
                </div>

                {/* Odds */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Ev Sahibi</div>
                    <div className="font-bold text-gray-900">{match.odds.home}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Beraberlik</div>
                    <div className="font-bold text-gray-900">{match.odds.draw}</div>
                  </div>
                  <div className="text-center p-2 bg-gray-50 rounded-lg">
                    <div className="text-xs text-gray-500">Deplasman</div>
                    <div className="font-bold text-gray-900">{match.odds.away}</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button 
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                    asChild
                  >
                    <Link href={`/dashboard/matches/${match.id}`}>
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Detaylı Analiz
                    </Link>
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Tahmin Yap
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center">
          <Button variant="outline" size="lg">
            Daha Fazla Maç Yükle
          </Button>
        </div>
      </div>
  );
}
