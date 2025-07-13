# AI Football Analytics

AI destekli futbol maç analizi ve tahmin platformu. Modern web teknolojileri ile geliştirilmiş, abonelik tabanlı SaaS uygulaması.

## 🚀 Özellikler

### 🧠 AI Destekli Analiz
- Google Gemini AI ile maç analizi
- 5 yıllık geçmiş veriler kullanılarak detaylı tahminler
- Takım form durumu ve istatistiksel analiz
- Güven skorları ile tahmin kalitesi

### 📊 Kapsamlı Veriler
- Football Data API entegrasyonu
- Gerçek zamanlı maç verileri
- Detaylı takım istatistikleri
- Karşılaşma geçmişi analizi

### 👥 Kullanıcı Özellikleri
- **Kişisel Panel**: Maç yorumları ve tahminleri kaydetme
- **Çalışma Alanı**: Bahis stratejilerini planlama
- **İstatistik Takibi**: Başarı oranı ölçümü
- **Premium Abonelik**: 7 gün ücretsiz deneme

### 💳 Abonelik Sistemi
- Stripe entegrasyonu ile güvenli ödeme
- 7 gün ücretsiz deneme
- Aylık ₺49 premium plan
- Esnek iptal seçenekleri

## 🛠️ Teknoloji Stack

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **UI Components**: Shadcn/ui
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL + Prisma ORM
- **AI**: Google Gemini API
- **External API**: Football Data API
- **Payments**: Stripe
- **Package Manager**: pnpm

## 📦 Kurulum

1. **Projeyi klonlayın**
```bash
git clone <repository-url>
cd aifootballanaltic
```

2. **Bağımlılıkları yükleyin**
```bash
pnpm install
```

3. **Environment değişkenlerini ayarlayın**
`.env` dosyasını oluşturun ve gerekli API anahtarlarını ekleyin:
```env
DATABASE_URL="your-database-url"
NEXTAUTH_SECRET="your-nextauth-secret"
GEMINI_API_KEY="your-gemini-api-key"
FOOTBALL_API_KEY="your-football-data-api-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
```

4. **Veritabanını kurun**
```bash
pnpm prisma generate
pnpm prisma db push
```

5. **Geliştirme sunucusunu başlatın**
```bash
pnpm dev
```

## 🚀 Kullanılabilir Komutlar

```bash
# Geliştirme sunucusu
pnpm dev

# Production build
pnpm build

# Production sunucusu
pnpm start

# Linting
pnpm lint

# Type checking
pnpm type-check

# Prisma komutları
pnpm db:generate    # Prisma client oluştur
pnpm db:push        # Schema'yı veritabanına uygula
pnpm db:migrate     # Migration çalıştır
pnpm db:studio      # Prisma Studio aç
```

## 📁 Proje Yapısı

```
src/
├── app/                    # Next.js App Router sayfaları
│   ├── dashboard/         # Dashboard sayfası
│   ├── auth/             # Authentication sayfaları
│   └── api/              # API routes
├── components/           # React bileşenleri
│   ├── ui/              # Shadcn/ui bileşenleri
│   └── custom/          # Özel bileşenler
├── lib/                 # Yardımcı kütüphaneler
│   ├── prisma.ts        # Prisma client
│   ├── auth.ts          # NextAuth yapılandırması
│   ├── ai-service.ts    # Gemini AI servisi
│   └── football-api.ts  # Football Data API
└── types/               # TypeScript type tanımları
```

## 🔧 API Entegrasyonları

### Football Data API
- Gerçek zamanlı maç verileri
- Takım istatistikleri
- Liga bilgileri

### Google Gemini AI
- Maç analizi
- Tahmin oluşturma
- Risk değerlendirmesi

### Stripe
- Abonelik yönetimi
- Ödeme işlemleri
- Webhook entegrasyonu

## 📱 Sayfalar

- **Ana Sayfa** (`/`): Landing page ve özellik tanıtımı
- **Dashboard** (`/dashboard`): Kullanıcı paneli
- **Authentication** (`/auth/*`): Giriş/kayıt sayfaları
- **Match Analysis** (`/matches/*`): Maç analiz sayfaları
- **Workspace** (`/workspace/*`): Bahis çalışma alanları

## 🎯 Geliştirme Roadmap

- [ ] Authentication sistemi tamamlama
- [ ] Stripe entegrasyonu
- [ ] Maç analizi sayfaları
- [ ] Real-time bildirimleri
- [ ] Mobile responsive tasarım
- [ ] PWA desteği
- [ ] Multi-language support

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje özel lisans altındadır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyiniz.

## 📞 İletişim

Proje bağlantısı: [GitHub Repository](https://github.com/username/aifootballanaltic)
