import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  CreditCard,
  Globe,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock,
  Crown
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Ayarlar
            </h1>
            <p className="text-gray-600 mt-2 flex items-center">
              <Settings className="h-4 w-4 mr-1 text-blue-500" />
              Hesap ve uygulama ayarlarını yönetin
            </p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white shadow-sm border">
            <TabsTrigger value="profile" className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700">
              <User className="h-4 w-4 mr-2" />
              Profil
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-green-50 data-[state=active]:text-green-700">
              <Bell className="h-4 w-4 mr-2" />
              Bildirimler
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-red-50 data-[state=active]:text-red-700">
              <Shield className="h-4 w-4 mr-2" />
              Güvenlik
            </TabsTrigger>
            <TabsTrigger value="subscription" className="data-[state=active]:bg-purple-50 data-[state=active]:text-purple-700">
              <Crown className="h-4 w-4 mr-2" />
              Abonelik
            </TabsTrigger>
            <TabsTrigger value="preferences" className="data-[state=active]:bg-orange-50 data-[state=active]:text-orange-700">
              <Globe className="h-4 w-4 mr-2" />
              Tercihler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 border-b">
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2 text-blue-600" />
                  Profil Bilgileri
                </CardTitle>
                <CardDescription>Kişisel bilgilerinizi güncelleyin</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-6">
                    <div className="text-center">
                      <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <User className="h-12 w-12 text-white" />
                      </div>
                      <Button variant="outline" size="sm">
                        Profil Fotoğrafı Değiştir
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">Ad</Label>
                        <Input id="firstName" placeholder="Adınız" defaultValue="Kullanıcı" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Soyad</Label>
                        <Input id="lastName" placeholder="Soyadınız" defaultValue="Test" />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">E-posta</Label>
                      <Input id="email" type="email" placeholder="email@example.com" defaultValue="kullanici@test.com" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Telefon</Label>
                      <Input id="phone" placeholder="+90 5XX XXX XX XX" />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bio">Hakkımda</Label>
                      <textarea 
                        id="bio" 
                        className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        placeholder="Kendiniz hakkında kısa bilgi..."
                      />
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                      Profili Güncelle
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Bell className="h-5 w-5 mr-2 text-green-600" />
                  Bildirim Ayarları
                </CardTitle>
                <CardDescription>Hangi bildirimleri almak istediğinizi seçin</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">E-posta Bildirimleri</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Maç Analizleri</div>
                            <div className="text-sm text-gray-500">Yeni AI analiz sonuçları</div>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-green-600" />
                          <div>
                            <div className="font-medium">Tahmin Sonuçları</div>
                            <div className="text-sm text-gray-500">Tahminlerinizin sonuçları</div>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Crown className="h-5 w-5 text-purple-600" />
                          <div>
                            <div className="font-medium">Abonelik Bildirimleri</div>
                            <div className="text-sm text-gray-500">Abonelik durumu ve faturalar</div>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Push Bildirimleri</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Smartphone className="h-5 w-5 text-orange-600" />
                          <div>
                            <div className="font-medium">Anlık Maç Güncellemeleri</div>
                            <div className="text-sm text-gray-500">Maç başlangıçları ve önemli anlar</div>
                          </div>
                        </div>
                        <Switch />
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Bell className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Yüksek Güvenli Tahminler</div>
                            <div className="text-sm text-gray-500">%80+ güven oranına sahip tahminler</div>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Bildirim Ayarlarını Kaydet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <div className="space-y-6">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50 border-b">
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2 text-red-600" />
                    Güvenlik Ayarları
                  </CardTitle>
                  <CardDescription>Hesabınızın güvenliğini artırın</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Şifre Değiştir</h3>
                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Mevcut Şifre</Label>
                          <Input id="currentPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">Yeni Şifre</Label>
                          <Input id="newPassword" type="password" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                          <Input id="confirmPassword" type="password" />
                        </div>
                        <Button className="bg-red-600 hover:bg-red-700">
                          <Lock className="h-4 w-4 mr-2" />
                          Şifreyi Değiştir
                        </Button>
                      </div>
                    </div>
                    
                    <div className="border-t pt-6">
                      <h3 className="font-semibold text-gray-900 mb-4">İki Faktörlü Doğrulama</h3>
                      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">2FA Güvenlik</div>
                          <div className="text-sm text-gray-500">Hesabınıza ek güvenlik katmanı ekleyin</div>
                        </div>
                        <Button variant="outline">
                          Etkinleştir
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="subscription">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b">
                <CardTitle className="flex items-center">
                  <Crown className="h-5 w-5 mr-2 text-purple-600" />
                  Abonelik Yönetimi
                </CardTitle>
                <CardDescription>Premium aboneliğinizi yönetin</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Current Plan */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <Crown className="h-8 w-8 text-purple-600" />
                        <div>
                          <div className="font-bold text-lg text-purple-800">Premium Plan</div>
                          <div className="text-sm text-purple-600">Aktif abonelik</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-purple-700">₺49/ay</div>
                        <div className="text-sm text-purple-600">6 gün kaldı</div>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="text-sm text-purple-600">Sonraki ödeme</div>
                        <div className="font-semibold">22 Ocak 2025</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm text-purple-600">Ödeme yöntemi</div>
                        <div className="font-semibold">**** **** **** 1234</div>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <Button variant="outline" className="flex-1">
                        <CreditCard className="h-4 w-4 mr-2" />
                        Ödeme Yöntemini Değiştir
                      </Button>
                      <Button variant="outline" className="text-red-600 hover:bg-red-50">
                        Aboneliği İptal Et
                      </Button>
                    </div>
                  </div>
                  
                  {/* Usage Stats */}
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">∞</div>
                      <div className="text-sm text-blue-600">AI Analiz</div>
                      <div className="text-xs text-gray-500">Sınırsız</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">127</div>
                      <div className="text-sm text-green-600">Bu Ay Kullanım</div>
                      <div className="text-xs text-gray-500">Analiz yapıldı</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">5</div>
                      <div className="text-sm text-purple-600">Çalışma Alanı</div>
                      <div className="text-xs text-gray-500">Maksimum 10</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preferences">
            <Card className="border-0 shadow-lg">
              <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50 border-b">
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-orange-600" />
                  Uygulama Tercihleri
                </CardTitle>
                <CardDescription>Uygulama deneyiminizi kişiselleştirin</CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Görünüm</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Sun className="h-5 w-5 text-yellow-600" />
                          <div>
                            <div className="font-medium">Tema</div>
                            <div className="text-sm text-gray-500">Açık/koyu tema seçimi</div>
                          </div>
                        </div>
                        <Select defaultValue="light">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Açık</SelectItem>
                            <SelectItem value="dark">Koyu</SelectItem>
                            <SelectItem value="system">Sistem</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Globe className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-medium">Dil</div>
                            <div className="text-sm text-gray-500">Uygulama dili</div>
                          </div>
                        </div>
                        <Select defaultValue="tr">
                          <SelectTrigger className="w-32">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="tr">Türkçe</SelectItem>
                            <SelectItem value="en">English</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Analiz Tercihleri</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Varsayılan Güven Seviyesi</div>
                          <div className="text-sm text-gray-500">Gösterilecek minimum güven oranı</div>
                        </div>
                        <Select defaultValue="70">
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="60">%60</SelectItem>
                            <SelectItem value="70">%70</SelectItem>
                            <SelectItem value="80">%80</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div>
                          <div className="font-medium">Favori Ligler</div>
                          <div className="text-sm text-gray-500">Öncelikli gösterilecek ligler</div>
                        </div>
                        <Button variant="outline" size="sm">
                          Düzenle
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-gradient-to-r from-orange-600 to-yellow-600 hover:from-orange-700 hover:to-yellow-700">
                    Tercihleri Kaydet
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  );
}
