import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  User, 
  Trophy, 
  Target, 
  TrendingUp,
  Calendar,
  Award,
  BarChart3,
  Crown,
  Star,
  Activity,
  Clock,
  CheckCircle
} from "lucide-react";

const achievements = [
  { id: 1, title: "İlk Tahmin", description: "İlk tahmininizi yaptınız", icon: Target, earned: true, date: "2025-01-01" },
  { id: 2, title: "5 Maç Serisi", description: "Ardışık 5 doğru tahmin", icon: Trophy, earned: true, date: "2025-01-08" },
  { id: 3, title: "Yüksek Oran Avcısı", description: "3.0+ oranlı 10 doğru tahmin", icon: TrendingUp, earned: true, date: "2025-01-10" },
  { id: 4, title: "10 Maç Serisi", description: "Ardışık 10 doğru tahmin", icon: Award, earned: false, progress: 7 },
  { id: 5, title: "Lig Uzmanı", description: "Bir ligde %85+ başarı oranı", icon: Star, earned: false, progress: 78 },
  { id: 6, title: "AI Senkronizasyonu", description: "AI ile %90+ uyumlu 20 tahmin", icon: Activity, earned: false, progress: 15 }
];

const recentActivity = [
  { type: "prediction", description: "Liverpool vs Arsenal maçı için tahmin yaptı", date: "2025-01-13", result: "won" },
  { type: "achievement", description: "Yüksek Oran Avcısı başarımını kazandı", date: "2025-01-10", result: "achievement" },
  { type: "prediction", description: "Barcelona vs Valencia maçı için tahmin yaptı", date: "2025-01-09", result: "pending" },
  { type: "prediction", description: "Bayern vs Frankfurt maçı için tahmin yaptı", date: "2025-01-08", result: "lost" },
  { type: "achievement", description: "5 Maç Serisi başarımını kazandı", date: "2025-01-08", result: "achievement" }
];

export default function ProfilePage() {
  const earnedAchievements = achievements.filter(a => a.earned);
  const pendingAchievements = achievements.filter(a => !a.earned);

  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Profilim
            </h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <User className="h-4 w-4 mr-1 text-blue-500" />
              Kişisel profil ve başarılarınız
            </p>
          </div>
        </div>

        {/* Profile Overview */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b text-center">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-gray-900">Kullanıcı Test</CardTitle>
              <CardDescription className="flex items-center justify-center">
                <Crown className="h-4 w-4 mr-1 text-yellow-500" />
                Premium Üye
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Üyelik Tarihi</span>
                  <span className="font-medium">1 Ocak 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Son Aktivite</span>
                  <span className="font-medium">2 saat önce</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Toplam Puan</span>
                  <span className="font-medium text-purple-600">1,247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Seviye</span>
                  <Badge className="bg-blue-100 text-blue-700">Uzman</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="border-0 shadow-lg lg:col-span-2">
            <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
              <CardTitle className="flex items-center">
                <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
                Hızlı İstatistikler
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">168</div>
                  <div className="text-sm text-blue-600">Toplam Tahmin</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">%74</div>
                  <div className="text-sm text-green-600">Başarı Oranı</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <div className="text-2xl font-bold text-purple-600">₺1,430</div>
                  <div className="text-sm text-purple-600">Toplam Kar</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">7</div>
                  <div className="text-sm text-orange-600">En Uzun Seri</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="achievements" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border">
            <TabsTrigger value="achievements" className="data-[state=active]:bg-yellow-50 data-[state=active]:text-yellow-700">
              <Trophy className="h-4 w-4 mr-2" />
              Başarılar ({earnedAchievements.length})
            </TabsTrigger>
            <TabsTrigger value="activity" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <Activity className="h-4 w-4 mr-2" />
              Son Aktiviteler
            </TabsTrigger>
            <TabsTrigger value="progress" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <Target className="h-4 w-4 mr-2" />
              İlerleme
            </TabsTrigger>
          </TabsList>

          <TabsContent value="achievements">
            <div className="space-y-6">
              {/* Earned Achievements */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b">
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                    Kazanılan Başarılar
                  </CardTitle>
                  <CardDescription>Elde ettiğiniz başarılar ve ödüller</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {earnedAchievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                            <achievement.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900 truncate">{achievement.title}</div>
                            <div className="text-xs text-gray-500">
                              {new Date(achievement.date!).toLocaleDateString('tr-TR')}
                            </div>
                          </div>
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pending Achievements */}
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-gray-600" />
                    Devam Eden Başarılar
                  </CardTitle>
                  <CardDescription>Henüz tamamlanmayan başarılar ve ilerleme durumları</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {pendingAchievements.map((achievement) => (
                      <div key={achievement.id} className="p-4 border rounded-lg">
                        <div className="flex items-center space-x-3 mb-3">
                          <div className="w-10 h-10 bg-gray-400 rounded-full flex items-center justify-center">
                            <achievement.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-gray-900">{achievement.title}</div>
                            <div className="text-sm text-gray-600">{achievement.description}</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm font-medium text-blue-600">
                              {achievement.progress}/
                              {achievement.title.includes('10') ? '10' : 
                               achievement.title.includes('20') ? '20' : 
                               achievement.title.includes('%85') ? '85' : '100'}
                            </div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ 
                              width: `${
                                achievement.title.includes('10') ? (achievement.progress! / 10) * 100 :
                                achievement.title.includes('20') ? (achievement.progress! / 20) * 100 :
                                achievement.title.includes('%85') ? (achievement.progress! / 85) * 100 :
                                achievement.progress
                              }%` 
                            }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-blue-600" />
                  Son Aktiviteler
                </CardTitle>
                <CardDescription>Son işlemleriniz ve aktiviteleriniz</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.result === 'won' ? 'bg-green-100' :
                        activity.result === 'lost' ? 'bg-red-100' :
                        activity.result === 'achievement' ? 'bg-yellow-100' :
                        'bg-orange-100'
                      }`}>
                        {activity.type === 'prediction' ? (
                          <Target className={`h-5 w-5 ${
                            activity.result === 'won' ? 'text-green-600' :
                            activity.result === 'lost' ? 'text-red-600' :
                            'text-orange-600'
                          }`} />
                        ) : (
                          <Trophy className="h-5 w-5 text-yellow-600" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{activity.description}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(activity.date).toLocaleDateString('tr-TR')}
                        </div>
                      </div>
                      <div>
                        {activity.result === 'won' && (
                          <Badge className="bg-green-100 text-green-700">Kazandı</Badge>
                        )}
                        {activity.result === 'lost' && (
                          <Badge className="bg-red-100 text-red-700">Kaybetti</Badge>
                        )}
                        {activity.result === 'pending' && (
                          <Badge className="bg-orange-100 text-orange-700">Beklemede</Badge>
                        )}
                        {activity.result === 'achievement' && (
                          <Badge className="bg-yellow-100 text-yellow-700">Başarı</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Aylık İlerleme
                  </CardTitle>
                  <CardDescription>Bu ayki performans hedefleriniz</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Tahmin Sayısı</span>
                        <span className="font-medium">23/30</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-blue-500 h-3 rounded-full" style={{ width: '77%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Başarı Oranı</span>
                        <span className="font-medium">%78/80</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-green-500 h-3 rounded-full" style={{ width: '98%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="text-gray-600">Kar Hedefi</span>
                        <span className="font-medium">₺180/250</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div className="bg-purple-500 h-3 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                  <CardTitle className="flex items-center">
                    <Star className="h-5 w-5 mr-2 text-purple-600" />
                    Seviye İlerlemesi
                  </CardTitle>
                  <CardDescription>Bir sonraki seviyeye kalan puan</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-3xl font-bold text-purple-600 mb-2">1,247</div>
                    <div className="text-sm text-gray-600">Mevcut Puan</div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Badge className="bg-blue-100 text-blue-700">Uzman</Badge>
                      <span className="text-sm text-gray-500">Mevcut Seviye</span>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-4 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <Badge className="bg-purple-100 text-purple-700">Master</Badge>
                      <span className="text-sm text-gray-500">Sonraki Seviye</span>
                    </div>
                    
                    <div className="text-center text-sm text-gray-600">
                      Master seviyesine <span className="font-semibold text-purple-600">253 puan</span> kaldı
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
