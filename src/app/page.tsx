import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Brain, 
  BarChart3, 
  Target, 
  FileText, 
  Briefcase, 
  Zap,
  CheckCircle,
  TrendingUp,
  Shield,
  Users,
  Star,
  ArrowRight,
  Play,
  Sparkles
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Football Analytics
                </h1>
                <p className="text-xs text-gray-500">Powered by AI</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/signin">Giriş Yap</Link>
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700" asChild>
                <Link href="/auth/signup">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Ücretsiz Başla
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-20 pb-32">
        <div className="max-w-7xl mx-auto text-center">
          {/* Hero Badge */}
          <div className="inline-flex items-center space-x-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-2 mb-8">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-700">AI destekli futbol analizi</span>
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          </div>

          {/* Hero Title */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Futbolda
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
              {" "}Geleceği{" "}
            </span>
            Tahmin Et
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto leading-relaxed">
            Gelişmiş yapay zeka algoritmaları ile futbol maçlarını analiz edin, 
            <span className="font-semibold text-gray-800"> profesyonel tahminler yapın</span> ve 
            kazançlarınızı artırın. İlk 7 gün tamamen ücretsiz!
          </p>

          {/* Hero CTA */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="text-lg px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-200" 
              asChild
            >
              <Link href="/auth/signup">
                <CheckCircle className="w-5 h-5 mr-2" />
                7 Gün Ücretsiz Dene
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-8 py-4 border-2 hover:bg-gray-50" 
              asChild
            >
              <Link href="/matches/demo">
                <Play className="w-5 h-5 mr-2" />
                Demo İzle
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 text-gray-600">
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Kredi kartı gerektirmez</span>
            </div>
            <div className="flex items-center space-x-2">
              <Users className="w-5 h-5 text-blue-500" />
              <span>10,000+ aktif kullanıcı</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>4.8/5 müşteri memnuniyeti</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-20 w-20 h-20 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-20 h-20 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-20 h-20 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Neden 
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                AI Football Analytics
              </span>
              ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Modern teknoloji ile futbol analizini bir üst seviyeye taşıyoruz
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">AI Destekli Analiz</CardTitle>
                <CardDescription className="text-gray-600">
                  Gelişmiş makine öğrenimi ile derinlemesine maç analizi
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  5 yıllık geçmiş veriler, takım form durumu ve oyuncu istatistikleri 
                  kullanılarak %85+ doğruluk oranı ile tahminler yapılır.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <BarChart3 className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Detaylı İstatistikler</CardTitle>
                <CardDescription className="text-gray-600">
                  Kapsamlı takım ve oyuncu performans metrikleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Gol ortalamaları, form durumu, ev sahibi avantajı ve 50+ farklı 
                  metrikle detaylı analiz raporları.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Akıllı Tahminler</CardTitle>
                <CardDescription className="text-gray-600">
                  Yüksek doğruluk oranı ile maç sonuçları ve bahis önerileri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  AI destekli algoritmalar ile maç sonuçları, gol sayıları ve 
                  özel bahis kategorilerinde güvenilir tahminler.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Kişisel Panel</CardTitle>
                <CardDescription className="text-gray-600">
                  Tahminlerinizi kaydedin ve gelişiminizi takip edin
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Kendi tahminlerinizi kaydedip analiz edin, başarı oranınızı 
                  ölçün ve stratejinizi sürekli geliştirin.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Çalışma Alanları</CardTitle>
                <CardDescription className="text-gray-600">
                  Bahis stratejilerinizi organize edin ve planınn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Farklı stratejiler için ayrı alanlar oluşturun, kar/zarar 
                  takibi yapın ve portföyünüzü yönetin.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-lg">
              <CardHeader>
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-900">Anlık Güncellemeler</CardTitle>
                <CardDescription className="text-gray-600">
                  Gerçek zamanlı maç verileri ve son dakika analizleri
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  Maç sırasında anlık güncellemeler, değişen oranlar ve 
                  son dakika içgörüleri ile her zaman bir adım önde olun.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Rakamlarla Başarımız</h2>
            <p className="text-xl text-blue-100">Kullanıcılarımızın güvenini kazanan sonuçlar</p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">85%</div>
              <div className="text-blue-100">Tahmin Doğruluğu</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">10K+</div>
              <div className="text-blue-100">Aktif Kullanıcı</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">1M+</div>
              <div className="text-blue-100">Analiz Edilen Maç</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-white mb-2">₺2.5M</div>
              <div className="text-blue-100">Kullanıcı Kazancı</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Basit ve Şeffaf Fiyatlandırma</h2>
            <p className="text-xl text-gray-600">7 gün ücretsiz deneme ile başlayın, istediğiniz zaman iptal edin</p>
          </div>

          <div className="max-w-lg mx-auto">
            <Card className="border-2 border-blue-500 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <CardHeader className="text-center pt-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl mb-4 mx-auto">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">Premium Plan</CardTitle>
                <CardDescription className="text-lg">Tüm özelliklere sınırsız erişim</CardDescription>
                <div className="text-5xl font-bold text-blue-600 mt-6">
                  ₺49<span className="text-xl text-gray-500 font-normal">/ay</span>
                </div>
                <div className="text-sm text-gray-500 mt-2">İlk 7 gün ücretsiz</div>
              </CardHeader>
              <CardContent className="pb-8">
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Sınırsız AI analiz</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>5 yıllık geçmiş veri erişimi</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Kişisel panel ve çalışma alanları</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Anlık bildirimler ve uyarılar</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Premium müşteri desteği</span>
                  </li>
                  <li className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Gelişmiş analitik raporları</span>
                  </li>
                </ul>
                <Button 
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-lg py-6 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" 
                  asChild
                >
                  <Link href="/auth/signup">
                    <Sparkles className="w-5 h-5 mr-2" />
                    7 Gün Ücretsiz Başla
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <p className="text-sm text-gray-500 text-center mt-4">
                  Kredi kartı gerekmez • İstediğiniz zaman iptal edebilirsiniz
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-gray-900 to-black py-20">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Futbolda Kazanmaya Hazır mısınız?
          </h2>
          <p className="text-xl text-gray-300 mb-10">
            AI destekli analiz platformumuza katılın ve profesyonel tahminlerle kazançlarınızı artırın.
          </p>
          <Button 
            size="lg" 
            className="text-xl px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200"
            asChild
          >
            <Link href="/auth/signup">
              <Sparkles className="w-6 h-6 mr-3" />
              Hemen Başla - 7 Gün Ücretsiz
              <ArrowRight className="w-6 h-6 ml-3" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">AI Football Analytics</h3>
                <p className="text-sm text-gray-500">Futbolda AI ile kazanın</p>
              </div>
            </div>
            <div className="text-center text-gray-600 text-sm">
              <p>&copy; 2025 AI Football Analytics. Tüm hakları saklıdır.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
