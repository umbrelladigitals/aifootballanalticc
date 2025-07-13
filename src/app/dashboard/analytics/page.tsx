import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  Target,
  Trophy,
  Calendar,
  Users,
  Zap,
  Award,
  Star,
  Activity
} from "lucide-react";

const leagueStats = [
  { name: 'Premier League', predictions: 45, winRate: 78, profit: 320 },
  { name: 'La Liga', predictions: 38, winRate: 72, profit: 280 },
  { name: 'Bundesliga', predictions: 32, winRate: 81, profit: 410 },
  { name: 'Ligue 1', predictions: 28, winRate: 68, profit: 180 },
  { name: 'Serie A', predictions: 25, winRate: 75, profit: 240 }
];

const monthlyData = [
  { month: 'Ocak', predictions: 65, wins: 48, profit: 380 },
  { month: 'Aralık', predictions: 72, wins: 51, profit: 420 },
  { month: 'Kasım', predictions: 58, wins: 41, profit: 290 },
  { month: 'Ekim', predictions: 61, wins: 45, profit: 340 },
  { month: 'Eylül', predictions: 55, wins: 39, profit: 260 }
];

const topPredictions = [
  { match: 'Liverpool vs Manchester City', prediction: 'Liverpool Galibiyet', odds: 4.20, profit: 210, date: '2025-01-10' },
  { match: 'Barcelona vs Real Madrid', prediction: 'Çok Gollü Maç', odds: 3.80, profit: 190, date: '2025-01-08' },
  { match: 'Bayern vs Dortmund', prediction: 'Bayern 3+ Gol', odds: 3.50, profit: 175, date: '2025-01-05' },
  { match: 'PSG vs Marseille', prediction: 'PSG Galibiyet', odds: 2.10, profit: 110, date: '2025-01-12' }
];

export default function AnalyticsPage() {
  const totalPredictions = leagueStats.reduce((sum, league) => sum + league.predictions, 0);
  const totalProfit = leagueStats.reduce((sum, league) => sum + league.profit, 0);
  const averageWinRate = Math.round(leagueStats.reduce((sum, league) => sum + league.winRate, 0) / leagueStats.length);

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Analiz Merkezi
            </h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <BarChart3 className="h-4 w-4 mr-1 text-blue-500" />
              Detaylı performans analizi ve istatistikler
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-gray-500">Son güncelleme</div>
            <div className="text-sm font-medium">2 dakika önce</div>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Target className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-blue-700">{totalPredictions}</div>
              <div className="text-sm text-blue-600">Toplam Tahmin</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-green-700">%{averageWinRate}</div>
              <div className="text-sm text-green-600">Ortalama Başarı</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-purple-700">₺{totalProfit}</div>
              <div className="text-sm text-purple-600">Toplam Kar</div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-md bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-orange-700">8.2</div>
              <div className="text-sm text-orange-600">AI Skoru</div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="leagues" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white shadow-sm border">
            <TabsTrigger value="leagues" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Trophy className="h-4 w-4 mr-2" />
              Lig Analizi
            </TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <Calendar className="h-4 w-4 mr-2" />
              Aylık Performans
            </TabsTrigger>
            <TabsTrigger value="top" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Star className="h-4 w-4 mr-2" />
              En İyi Tahminler
            </TabsTrigger>
            <TabsTrigger value="trends" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              <Activity className="h-4 w-4 mr-2" />
              Trendler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="leagues">
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-blue-600" />
                    Lig Performansı
                  </CardTitle>
                  <CardDescription>Her ligdeki başarı oranınız ve kazancınız</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {leagueStats.map((league, index) => (
                      <div key={league.name} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                              {index + 1}
                            </div>
                            <div>
                              <div className="font-semibold text-gray-900">{league.name}</div>
                              <div className="text-sm text-gray-500">{league.predictions} tahmin</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`font-bold ${league.winRate >= 75 ? 'text-green-600' : league.winRate >= 65 ? 'text-yellow-600' : 'text-red-600'}`}>
                              %{league.winRate}
                            </div>
                            <div className="text-sm text-gray-500">başarı</div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="w-full bg-gray-200 rounded-full h-2 mr-4">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${league.winRate}%` }}
                            ></div>
                          </div>
                          <div className="text-sm font-medium text-green-600">+₺{league.profit}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                    Lig Dağılımı
                  </CardTitle>
                  <CardDescription>Tahmin dağılımınız ve odak alanlarınız</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    {leagueStats.map((league) => {
                      const percentage = ((league.predictions / totalPredictions) * 100).toFixed(1);
                      return (
                        <div key={league.name}>
                          <div className="flex justify-between text-sm mb-2">
                            <span className="font-medium text-gray-700">{league.name}</span>
                            <span className="text-gray-500">%{percentage}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div 
                              className="bg-gradient-to-r from-green-500 to-blue-500 h-3 rounded-full transition-all duration-300"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{league.predictions} tahmin</div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  Aylık Performans Trendi
                </CardTitle>
                <CardDescription>Son 5 ayın detaylı performans analizi</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900 mb-4">Aylık İstatistikler</h3>
                    {monthlyData.map((month) => {
                      const winRate = Math.round((month.wins / month.predictions) * 100);
                      return (
                        <div key={month.month} className="p-4 border rounded-lg">
                          <div className="flex justify-between items-center mb-2">
                            <div className="font-semibold text-gray-900">{month.month}</div>
                            <Badge className={
                              winRate >= 75 ? 'bg-green-100 text-green-700' :
                              winRate >= 65 ? 'bg-yellow-100 text-yellow-700' :
                              'bg-red-100 text-red-700'
                            }>
                              %{winRate}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-3 gap-2 text-sm">
                            <div>
                              <div className="text-gray-500">Tahmin</div>
                              <div className="font-medium">{month.predictions}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Kazanan</div>
                              <div className="font-medium text-green-600">{month.wins}</div>
                            </div>
                            <div>
                              <div className="text-gray-500">Kar</div>
                              <div className="font-medium text-blue-600">₺{month.profit}</div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Trend Analizi</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <TrendingUp className="h-5 w-5 text-green-600 mr-2" />
                          <span className="font-medium text-green-800">Artan Trend</span>
                        </div>
                        <p className="text-sm text-green-700">
                          Son 3 ayda başarı oranınız %12 artış gösterdi
                        </p>
                      </div>
                      
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Target className="h-5 w-5 text-blue-600 mr-2" />
                          <span className="font-medium text-blue-800">En İyi Ay</span>
                        </div>
                        <p className="text-sm text-blue-700">
                          Aralık ayında %71 başarı oranı ile en iyi performansı sergilediz
                        </p>
                      </div>
                      
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center mb-2">
                          <Trophy className="h-5 w-5 text-purple-600 mr-2" />
                          <span className="font-medium text-purple-800">Hedef</span>
                        </div>
                        <p className="text-sm text-purple-700">
                          Bu ay %80 başarı oranı hedefine %3 mesafede
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="top">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Star className="h-5 w-5 mr-2 text-purple-600" />
                  En Karlı Tahminler
                </CardTitle>
                <CardDescription>En yüksek kar getiren tahminleriniz</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {topPredictions.map((prediction, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                            <Award className="h-4 w-4 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{prediction.match}</div>
                            <div className="text-sm text-gray-500">
                              {new Date(prediction.date).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-600 text-lg">+₺{prediction.profit}</div>
                          <div className="text-sm text-gray-500">Oran: {prediction.odds}</div>
                        </div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-sm">
                          <span className="text-purple-600 font-medium">Tahmin:</span>
                          <span className="ml-2">{prediction.prediction}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="trends">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50 border-b">
                  <CardTitle className="flex items-center">
                    <Activity className="h-5 w-5 mr-2 text-orange-600" />
                    Tahmin Türü Analizi
                  </CardTitle>
                  <CardDescription>Hangi tahmin türlerinde daha başarılısınız</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium text-gray-900">Galibiyet Tahminleri</span>
                      <div className="text-right">
                        <div className="font-bold text-green-600">%82</div>
                        <div className="text-xs text-gray-500">42/51 tahmin</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium text-gray-900">Gol Tahminleri</span>
                      <div className="text-right">
                        <div className="font-bold text-blue-600">%75</div>
                        <div className="text-xs text-gray-500">24/32 tahmin</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                      <span className="font-medium text-gray-900">Handikap Tahminleri</span>
                      <div className="text-right">
                        <div className="font-bold text-yellow-600">%68</div>
                        <div className="text-xs text-gray-500">17/25 tahmin</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium text-gray-900">Kombinasyon</span>
                      <div className="text-right">
                        <div className="font-bold text-purple-600">%71</div>
                        <div className="text-xs text-gray-500">12/17 tahmin</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    AI Güven vs Başarı
                  </CardTitle>
                  <CardDescription>AI güven oranı ile gerçek başarı karşılaştırması</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">%80+ Güven</span>
                        <Badge className="bg-green-100 text-green-700">Mükemmel</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        AI %80+ güven verdiği tahminlerde gerçek başarı oranınız
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '87%' }}></div>
                        </div>
                        <span className="text-sm font-bold text-green-600">%87</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">%60-80 Güven</span>
                        <Badge className="bg-blue-100 text-blue-700">İyi</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Orta güven aralığındaki tahminlerde performansınız
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <span className="text-sm font-bold text-blue-600">%72</span>
                      </div>
                    </div>
                    
                    <div className="p-4 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">%60- Güven</span>
                        <Badge className="bg-yellow-100 text-yellow-700">Dikkat</Badge>
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Düşük güven aralığında risk artıyor
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '58%' }}></div>
                        </div>
                        <span className="text-sm font-bold text-yellow-600">%58</span>
                      </div>
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
