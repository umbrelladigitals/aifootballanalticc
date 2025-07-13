import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Target, 
  TrendingUp, 
  TrendingDown,
  Clock, 
  CheckCircle,
  XCircle,
  Award,
  Calendar,
  BarChart3,
  Plus
} from "lucide-react";
import Link from "next/link";

const mockPredictions = [
  {
    id: 1,
    matchId: "man-utd-vs-liverpool",
    homeTeam: "Manchester United",
    awayTeam: "Liverpool", 
    prediction: "Liverpool Galibiyet",
    confidence: 85,
    odds: 3.20,
    stake: 50,
    status: "won" as const,
    result: "Liverpool 2-1",
    payout: 160,
    date: "2025-01-10",
    profit: 110
  },
  {
    id: 2,
    matchId: "barcelona-vs-real-madrid",
    homeTeam: "Barcelona",
    awayTeam: "Real Madrid",
    prediction: "Çok Gollü Maç (3+ Gol)",
    confidence: 72,
    odds: 1.85,
    stake: 75,
    status: "lost" as const,
    result: "Barcelona 1-0",
    payout: 0,
    date: "2025-01-12",
    profit: -75
  },
  {
    id: 3,
    matchId: "bayern-vs-dortmund",
    homeTeam: "Bayern Munich",
    awayTeam: "Borussia Dortmund",
    prediction: "Bayern Munich Galibiyet",
    confidence: 78,
    odds: 1.85,
    stake: 100,
    status: "pending" as const,
    result: null,
    payout: null,
    date: "2025-01-16",
    profit: null
  }
];

const stats = {
  totalPredictions: 25,
  winRate: 68,
  totalProfit: 450,
  averageOdds: 2.35,
  bestStreak: 7,
  currentStreak: 3
};

export default function PredictionsPage() {
  const pendingPredictions = mockPredictions.filter(p => p.status === 'pending');
  const completedPredictions = mockPredictions.filter(p => p.status !== 'pending');

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Tahminlerim
            </h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <Target className="h-4 w-4 mr-1 text-green-500" />
              Tahmin geçmişiniz ve performans analizi
            </p>
          </div>
          <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Yeni Tahmin
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-6 gap-4">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-700">{stats.totalPredictions}</div>
              <div className="text-xs text-blue-600">Toplam Tahmin</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-700">%{stats.winRate}</div>
              <div className="text-xs text-green-600">Başarı Oranı</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-700">₺{stats.totalProfit}</div>
              <div className="text-xs text-purple-600">Toplam Kar</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-700">{stats.averageOdds}</div>
              <div className="text-xs text-orange-600">Ortalama Oran</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-yellow-50 to-yellow-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-yellow-700">{stats.bestStreak}</div>
              <div className="text-xs text-yellow-600">En İyi Seri</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-indigo-50 to-indigo-100">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-indigo-700">{stats.currentStreak}</div>
              <div className="text-xs text-indigo-600">Güncel Seri</div>
            </CardContent>
          </Card>
        </div>

        {/* Predictions Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border">
            <TabsTrigger value="pending" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              <Clock className="h-4 w-4 mr-2" />
              Bekleyen ({pendingPredictions.length})
            </TabsTrigger>
            <TabsTrigger value="completed" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <BarChart3 className="h-4 w-4 mr-2" />
              Tamamlanan ({completedPredictions.length})
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <TrendingUp className="h-4 w-4 mr-2" />
              Analiz
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <div className="space-y-4">
              {pendingPredictions.length > 0 ? (
                pendingPredictions.map((prediction) => (
                  <Card key={prediction.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-4">
                          <div className="w-3 h-3 bg-orange-500 rounded-full animate-pulse"></div>
                          <div>
                            <div className="font-bold text-lg">
                              {prediction.homeTeam} vs {prediction.awayTeam}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(prediction.date).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">
                          Beklemede
                        </Badge>
                      </div>
                      
                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <div className="text-sm text-gray-500">Tahmin</div>
                          <div className="font-semibold text-gray-900">{prediction.prediction}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Güven</div>
                          <div className="font-semibold text-blue-600">%{prediction.confidence}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Oran</div>
                          <div className="font-semibold text-green-600">{prediction.odds}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500">Bahis</div>
                          <div className="font-semibold text-purple-600">₺{prediction.stake}</div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex justify-between items-center">
                        <div className="text-sm text-gray-600">
                          Potansiyel Kazanç: <span className="font-semibold text-green-600">₺{(prediction.stake * prediction.odds).toFixed(0)}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/dashboard/matches/${prediction.matchId}`}>
                            Maç Detayı
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-12 text-center">
                    <Clock className="h-16 w-16 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Bekleyen tahmin yok</h3>
                    <p className="text-gray-500 mb-6">Yeni tahminler yaparak AI analizlerimizden yararlanın</p>
                    <Button className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700">
                      <Plus className="h-4 w-4 mr-2" />
                      İlk Tahmini Yap
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </TabsContent>

          <TabsContent value="completed">
            <div className="space-y-4">
              {completedPredictions.map((prediction) => (
                <Card key={prediction.id} className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center">
                          {prediction.status === 'won' ? (
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                          ) : (
                            <XCircle className="h-5 w-5 text-red-500 mr-2" />
                          )}
                          <div>
                            <div className="font-bold text-lg">
                              {prediction.homeTeam} vs {prediction.awayTeam}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {new Date(prediction.date).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge className={
                          prediction.status === 'won' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }>
                          {prediction.status === 'won' ? 'Kazandı' : 'Kaybetti'}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">
                          {prediction.result}
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-5 gap-4">
                      <div>
                        <div className="text-sm text-gray-500">Tahmin</div>
                        <div className="font-semibold text-gray-900">{prediction.prediction}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Oran</div>
                        <div className="font-semibold">{prediction.odds}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Bahis</div>
                        <div className="font-semibold">₺{prediction.stake}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Kazanç</div>
                        <div className="font-semibold">₺{prediction.payout || 0}</div>
                      </div>
                      <div>
                        <div className="text-sm text-gray-500">Kar/Zarar</div>
                        <div className={`font-semibold flex items-center ${
                          prediction.profit && prediction.profit > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {prediction.profit && prediction.profit > 0 ? (
                            <TrendingUp className="h-3 w-3 mr-1" />
                          ) : (
                            <TrendingDown className="h-3 w-3 mr-1" />
                          )}
                          ₺{Math.abs(prediction.profit || 0)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                    Performans Analizi
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bu Ay Kazanılan</span>
                      <span className="font-bold text-green-600">₺180</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Bu Ay Kaybedilen</span>
                      <span className="font-bold text-red-600">₺75</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-gray-900 font-medium">Net Kar</span>
                      <span className="font-bold text-blue-600">₺105</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <Award className="h-5 w-5 mr-2 text-green-600" />
                    Başarı Ödülleri
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center mr-3">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">5 Maç Serisi</span>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-gray-400 rounded-full flex items-center justify-center mr-3">
                          <Award className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium">10 Maç Serisi</span>
                      </div>
                      <div className="text-gray-400 text-sm">7/10</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
