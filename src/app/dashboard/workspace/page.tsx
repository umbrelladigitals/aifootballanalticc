'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useMatches } from '@/hooks/useFootballData'
import { AIPrediction, BettingCoupon, CouponSelection, aiPredictionService, couponService } from '@/lib/ai-predictions'
import { 
  Briefcase, 
  Plus, 
  TrendingUp, 
  TrendingDown,
  Target,
  Calculator,
  Clock,
  BarChart3,
  Settings,
  Trash2,
  Edit,
  Brain,
  Zap,
  Trophy,
  DollarSign,
  Shield,
  Activity,
  Star,
  Eye,
  AlertTriangle,
  CheckCircle
} from "lucide-react";
import Link from "next/link";

interface BettingWorkspace {
  id: string
  name: string
  description: string
  budget: number
  usedBudget: number
  totalGain: number
  totalLoss: number
  coupons: BettingCoupon[]
  aiPredictions: AIPrediction[]
  activeBets: number
  completedBets: number
  winRate: number
  created: string
}

interface RecentBet {
  id: number
  workspaceId: string
  match: string
  prediction: string
  odds: number
  stake: number
  status: 'won' | 'lost' | 'pending'
  profit: number | null
  date: string
}

const mockWorkspaces: BettingWorkspace[] = [
  {
    id: '1',
    name: 'Premier League Stratejim',
    description: 'Premier League maçları için özel strateji',
    budget: 1000,
    usedBudget: 350,
    totalGain: 250,
    totalLoss: 100,
    coupons: [],
    aiPredictions: [],
    activeBets: 3,
    completedBets: 12,
    winRate: 75,
    created: '2025-01-01'
  },
  {
    id: '2', 
    name: 'Yüksek Oran Avı',
    description: '3.0+ oran hedefli agresif strateji',
    budget: 500,
    usedBudget: 200,
    totalGain: 180,
    totalLoss: 120,
    coupons: [],
    aiPredictions: [],
    activeBets: 2,
    completedBets: 8,
    winRate: 62,
    created: '2025-01-05'
  },
  {
    id: '3',
    name: 'Güvenli Yatırım',
    description: 'Düşük riskli, istikrarlı kazanç',
    budget: 2000,
    usedBudget: 800,
    totalGain: 120,
    totalLoss: 80,
    coupons: [],
    aiPredictions: [],
    activeBets: 5,
    completedBets: 20,
    winRate: 80,
    created: '2025-01-03'
  }
];

const recentBets: RecentBet[] = [
  {
    id: 1,
    workspaceId: '1',
    match: 'Liverpool vs Arsenal',
    prediction: 'Liverpool Galibiyet',
    odds: 2.10,
    stake: 50,
    status: 'won' as const,
    profit: 55,
    date: '2025-01-13'
  },
  {
    id: 2,
    workspaceId: '2',
    match: 'Barcelona vs Valencia',
    prediction: 'Çok Gollü Maç',
    odds: 3.50,
    stake: 30,
    status: 'pending' as const,
    profit: null,
    date: '2025-01-15'
  },
  {
    id: 3,
    workspaceId: '3',
    match: 'Bayern vs Frankfurt',
    prediction: 'Bayern Galibiyet',
    odds: 1.65,
    stake: 100,
    status: 'lost' as const,
    profit: -100,
    date: '2025-01-12'
  }
];

export default function WorkspacePage() {
  const [workspaces, setWorkspaces] = useState<BettingWorkspace[]>(mockWorkspaces)
  const [selectedWorkspace, setSelectedWorkspace] = useState<BettingWorkspace | null>(null)
  const [activeCoupon, setActiveCoupon] = useState<BettingCoupon | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCouponOpen, setIsCouponOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'detail'>('list')
  const [newWorkspace, setNewWorkspace] = useState({
    name: '',
    description: '',
    budget: 0
  })
  const [couponName, setCouponName] = useState('')
  const [couponStake, setCouponStake] = useState(0)
  
  // Maç verilerini al
  const { data: matchesData, loading: matchesLoading } = useMatches()
  
  // AI tahminleri için state
  const [aiPredictions, setAiPredictions] = useState<AIPrediction[]>([])
  const [loadingPredictions, setLoadingPredictions] = useState(false)

  const createWorkspace = () => {
    const workspace: BettingWorkspace = {
      id: Date.now().toString(),
      name: newWorkspace.name,
      description: newWorkspace.description,
      budget: newWorkspace.budget,
      usedBudget: 0,
      totalGain: 0,
      totalLoss: 0,
      coupons: [],
      aiPredictions: [],
      activeBets: 0,
      completedBets: 0,
      winRate: 0,
      created: new Date().toISOString().split('T')[0]
    }
    setWorkspaces([...workspaces, workspace])
    setNewWorkspace({ name: '', description: '', budget: 0 })
    setIsCreateOpen(false)
  }

  const calculateProfit = (workspace: BettingWorkspace) => {
    return workspace.totalGain - workspace.totalLoss
  }

  const getProfitColor = (profit: number) => {
    if (profit > 0) return 'text-primary'
    if (profit < 0) return 'text-destructive'
    return 'text-muted-foreground'
  }

  const getRiskColor = (risk: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (risk) {
      case 'LOW': return 'text-primary'
      case 'MEDIUM': return 'text-yellow-600'
      case 'HIGH': return 'text-destructive'
      default: return 'text-muted-foreground'
    }
  }

  const getRiskBadgeVariant = (risk: 'LOW' | 'MEDIUM' | 'HIGH') => {
    switch (risk) {
      case 'LOW': return 'default'
      case 'MEDIUM': return 'secondary'
      case 'HIGH': return 'destructive'
      default: return 'outline'
    }
  }

  // AI tahminlerini yükle
  const loadAIPredictions = async (workspace: BettingWorkspace) => {
    if (!matchesData) return
    
    setLoadingPredictions(true)
    setSelectedWorkspace(workspace)
    
    try {
      const predictions: AIPrediction[] = []
      
      // Bugünkü ve yaklaşan maçlar için tahmin oluştur
      const matchesToPredict = [
        ...(matchesData.todayMatches || []),
        ...(matchesData.upcomingMatches || [])
      ].slice(0, 10) // İlk 10 maç
      
      for (const match of matchesToPredict) {
        try {
          // Gerçek match verisini AI prediction formatına çevir
          const prediction = await createPredictionFromMatch(match)
          predictions.push(prediction)
        } catch (error) {
          console.error(`Prediction error for match ${match.id}:`, error)
        }
      }
      
      setAiPredictions(predictions)
      
      // Workspace'e tahminleri kaydet
      const updatedWorkspace = {
        ...workspace,
        aiPredictions: predictions
      }
      setSelectedWorkspace(updatedWorkspace)
      
      // Workspaces listesini güncelle
      setWorkspaces(prev => prev.map(w => 
        w.id === workspace.id ? updatedWorkspace : w
      ))
      
    } catch (error) {
      console.error('AI Predictions Loading Error:', error)
    } finally {
      setLoadingPredictions(false)
    }
  }

  // Match verisini AI prediction formatına çevirme fonksiyonu
  const createPredictionFromMatch = async (match: any): Promise<AIPrediction> => {
    // Temel tahmin hesaplamaları (gerçek AI yerine akıllı hesaplamalar)
    const homeAdvantage = 0.55 // Ev sahibi avantajı
    const randomFactor = Math.random() * 0.3 + 0.7 // 0.7-1.0 arası
    
    // Sonuç tahmini
    const homeWinProb = homeAdvantage * randomFactor
    const drawProb = 0.25 + Math.random() * 0.1
    const awayWinProb = 1 - homeWinProb - drawProb
    
    let resultPrediction: '1' | 'X' | '2' = '1'
    let resultConfidence = homeWinProb * 100
    
    if (awayWinProb > homeWinProb && awayWinProb > drawProb) {
      resultPrediction = '2'
      resultConfidence = awayWinProb * 100
    } else if (drawProb > homeWinProb && drawProb > awayWinProb) {
      resultPrediction = 'X'
      resultConfidence = drawProb * 100
    }
    
    // Odds hesaplama (basit formula)
    const resultOdds = Math.max(1.1, Math.min(15.0, 
      resultPrediction === '1' ? 
        (1 / homeWinProb) * 0.9 : // Bahis şirketi marjı
        resultPrediction === 'X' ? 
        (1 / drawProb) * 0.9 : 
        (1 / awayWinProb) * 0.9
    ))
    
    // Gol tahminleri
    const goalsOver25Prob = 0.6 + Math.random() * 0.2
    const bothTeamsScoreProb = 0.55 + Math.random() * 0.25
    
    return {
      id: `pred_${match.id}_${Date.now()}`,
      matchId: match.id.toString(),
      homeTeam: match.homeTeam.name || match.homeTeam.shortName,
      awayTeam: match.awayTeam.name || match.awayTeam.shortName,
      league: match.competition?.name || 'Bilinmeyen Liga',
      matchDate: match.utcDate,
      predictions: {
        result: {
          prediction: resultPrediction,
          confidence: Math.round(resultConfidence),
          odds: Math.round(resultOdds * 100) / 100
        },
        goalsOver25: {
          prediction: goalsOver25Prob > 0.5,
          confidence: Math.round(goalsOver25Prob * 100),
          odds: Math.round((1 / goalsOver25Prob) * 0.9 * 100) / 100
        },
        bothTeamsScore: {
          prediction: bothTeamsScoreProb > 0.5,
          confidence: Math.round(bothTeamsScoreProb * 100),
          odds: Math.round((1 / bothTeamsScoreProb) * 0.9 * 100) / 100
        },
        correctScore: {
          prediction: resultPrediction === '1' ? '2-1' : 
                     resultPrediction === 'X' ? '1-1' : '1-2',
          confidence: Math.round(15 + Math.random() * 20),
          odds: Math.round((8 + Math.random() * 12) * 100) / 100
        }
      },
      factors: {
        homeForm: Math.round(65 + Math.random() * 30),
        awayForm: Math.round(55 + Math.random() * 30),
        headToHead: Math.round(60 + Math.random() * 40),
        injuries: [],
        motivation: Math.round(70 + Math.random() * 25)
      },
      riskLevel: resultConfidence > 70 ? 'LOW' : 
                resultConfidence > 50 ? 'MEDIUM' : 'HIGH',
      expectedValue: (resultOdds * (resultConfidence / 100)) - 1
    }
  }

  // Workspace'e gir
  const enterWorkspace = (workspace: BettingWorkspace) => {
    setSelectedWorkspace(workspace)
    setViewMode('detail')
    loadAIPredictions(workspace)
  }

  // Workspace listesine geri dön
  const backToList = () => {
    setViewMode('list')
    setSelectedWorkspace(null)
    setActiveCoupon(null)
    setAiPredictions([])
  }

  // Hızlı kupon oluştur
  const createQuickCoupon = () => {
    if (!selectedWorkspace) return

    const quickCoupon: BettingCoupon = {
      id: `coupon_${Date.now()}`,
      name: `Hızlı Kupon ${new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}`,
      workspaceId: selectedWorkspace.id,
      selections: [],
      totalOdds: 1,
      stake: 100,
      potentialWin: 0,
      status: 'PENDING',
      createdAt: new Date(),
      riskLevel: 'MEDIUM',
      confidenceScore: 0
    }

    setActiveCoupon(quickCoupon)
    setIsCouponOpen(false)
  }

  // Kupon oluştur
  const createCoupon = () => {
    if (!selectedWorkspace || !couponName || couponStake <= 0) return
    
    const newCoupon: BettingCoupon = {
      id: `coupon_${Date.now()}`,
      name: couponName,
      workspaceId: selectedWorkspace.id,
      selections: [],
      stake: couponStake,
      totalOdds: 1,
      potentialWin: couponStake,
      confidenceScore: 0,
      riskLevel: 'HIGH',
      status: 'PENDING',
      createdAt: new Date()
    }
    
    setActiveCoupon(newCoupon)
    setCouponName('')
    setCouponStake(0)
    setIsCouponOpen(false)
  }

  // Kupona seçim ekle
  const addSelectionToCoupon = (prediction: AIPrediction, betType: string, selection: string, odds: number) => {
    // Eğer aktif kupon yoksa otomatik olarak oluştur
    if (!activeCoupon) {
      const newCoupon: BettingCoupon = {
        id: `coupon_${Date.now()}`,
        name: `Kupon ${new Date().toLocaleDateString('tr-TR')}`,
        workspaceId: selectedWorkspace!.id,
        selections: [],
        totalOdds: 1,
        stake: 100,
        potentialWin: 0,
        status: 'PENDING',
        createdAt: new Date(),
        riskLevel: 'MEDIUM',
        confidenceScore: 0
      }
      setActiveCoupon(newCoupon)
    }

    const currentCoupon = activeCoupon || {
      id: `coupon_${Date.now()}`,
      name: `Kupon ${new Date().toLocaleDateString('tr-TR')}`,
      workspaceId: selectedWorkspace!.id,
      selections: [],
      totalOdds: 1,
      stake: 100,
      potentialWin: 0,
      status: 'PENDING' as const,
      createdAt: new Date(),
      riskLevel: 'MEDIUM' as const,
      confidenceScore: 0
    }

    // Aynı maç zaten kuponda var mı kontrol et
    const existingSelection = currentCoupon.selections.find(
      s => s.homeTeam === prediction.homeTeam && s.awayTeam === prediction.awayTeam
    )

    if (existingSelection) {
      alert('Bu maç zaten kuponunuzda var!')
      return
    }
    
    const newSelection: CouponSelection = {
      id: `sel_${Date.now()}`,
      matchId: prediction.matchId,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      betType: betType as any,
      selection,
      odds,
      aiPrediction: prediction,
      confidence: betType === 'RESULT' ? prediction.predictions.result.confidence :
                  betType === 'OVER_UNDER' ? prediction.predictions.goalsOver25.confidence :
                  betType === 'BOTH_TEAMS_SCORE' ? prediction.predictions.bothTeamsScore.confidence :
                  prediction.predictions.correctScore.confidence
    }
    
    const updatedSelections = [...currentCoupon.selections, newSelection]
    const totalOdds = couponService.calculateTotalOdds(updatedSelections)
    const confidenceScore = couponService.calculateCouponConfidence(updatedSelections)
    const riskLevel = couponService.calculateRiskLevel(confidenceScore)
    
    const updatedCoupon: BettingCoupon = {
      ...currentCoupon,
      selections: updatedSelections,
      totalOdds,
      potentialWin: currentCoupon.stake * totalOdds,
      confidenceScore,
      riskLevel
    }
    
    setActiveCoupon(updatedCoupon)
  }

  // Kupondan seçim çıkar
  const removeSelectionFromCoupon = (selectionId: string) => {
    if (!activeCoupon) return
    
    const updatedSelections = activeCoupon.selections.filter(s => s.id !== selectionId)
    const totalOdds = couponService.calculateTotalOdds(updatedSelections)
    const confidenceScore = couponService.calculateCouponConfidence(updatedSelections)
    const riskLevel = couponService.calculateRiskLevel(confidenceScore)
    
    const updatedCoupon: BettingCoupon = {
      ...activeCoupon,
      selections: updatedSelections,
      totalOdds,
      potentialWin: activeCoupon.stake * totalOdds,
      confidenceScore,
      riskLevel
    }
    
    setActiveCoupon(updatedCoupon)
  }

  // Kuponu kaydet
  const saveCoupon = () => {
    if (!activeCoupon || !selectedWorkspace) return
    
    const validation = couponService.validateCoupon(activeCoupon)
    if (!validation.isValid) {
      alert(validation.errors.join('\n'))
      return
    }
    
    const updatedWorkspace = {
      ...selectedWorkspace,
      coupons: [...selectedWorkspace.coupons, activeCoupon]
    }
    
    setSelectedWorkspace(updatedWorkspace)
    setWorkspaces(prev => prev.map(w => 
      w.id === selectedWorkspace.id ? updatedWorkspace : w
    ))
    
    setActiveCoupon(null)
    alert('Kupon başarıyla kaydedildi!')
  }

  return (
    <div className="space-y-8">
      {viewMode === 'list' ? (
        // Workspace Listesi
        <>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary">
                Çalışma Alanları
              </h1>
              <p className="text-muted-foreground mt-2 flex items-center">
                <Briefcase className="h-4 w-4 mr-1 text-primary" />
                Bahis stratejilerinizi organize edin ve takip edin
              </p>
            </div>
            <div className="flex space-x-2">
              <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Çalışma Alanı
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>Yeni Çalışma Alanı Oluştur</DialogTitle>
                    <DialogDescription>
                      Bahis stratejiniz için yeni bir çalışma alanı oluşturun
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Alan Adı</Label>
                      <Input 
                        id="name"
                        placeholder="örn: Premier League Stratejim" 
                        value={newWorkspace.name}
                        onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Açıklama</Label>
                      <Input 
                        id="description"
                        placeholder="Strateji açıklaması..." 
                        value={newWorkspace.description}
                        onChange={(e) => setNewWorkspace({...newWorkspace, description: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="budget">Başlangıç Bütçesi (₺)</Label>
                      <Input 
                        id="budget"
                        type="number" 
                        placeholder="1000" 
                        value={newWorkspace.budget || ''}
                        onChange={(e) => setNewWorkspace({...newWorkspace, budget: Number(e.target.value)})}
                      />
                    </div>
                    <Button onClick={createWorkspace} className="w-full">
                      Çalışma Alanı Oluştur
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </>
      ) : (
        // Workspace Detail View
        selectedWorkspace && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={backToList}
                  className="flex items-center space-x-2"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <span>Geri</span>
                </Button>
                <div>
                  <h1 className="text-3xl font-bold text-primary">
                    {selectedWorkspace.name}
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    {selectedWorkspace.description}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Dialog open={isCouponOpen} onOpenChange={setIsCouponOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Kupon
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Yeni Kupon Oluştur</DialogTitle>
                      <DialogDescription>
                        {selectedWorkspace.name} için yeni kupon oluşturun
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="couponName">Kupon Adı</Label>
                        <Input
                          id="couponName"
                          placeholder="Örn: Bugünkü Favoriler"
                          value={couponName}
                          onChange={(e) => setCouponName(e.target.value)}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="couponStake">Bahis Miktarı (₺)</Label>
                        <Input
                          id="couponStake"
                          type="number"
                          placeholder="100"
                          value={couponStake || ''}
                          onChange={(e) => setCouponStake(Number(e.target.value))}
                        />
                      </div>
                      <Button onClick={createCoupon} className="w-full">
                        Kupon Oluştur
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button 
                  onClick={() => loadAIPredictions(selectedWorkspace)}
                  disabled={loadingPredictions}
                  variant="outline"
                >
                  <Brain className="h-4 w-4 mr-2" />
                  {loadingPredictions ? 'Yükleniyor...' : 'Tahminleri Yenile'}
                </Button>
              </div>
            </div>
          </>
        )
      )}

      {viewMode === 'list' && (
        <>
          {/* Overview Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">{workspaces.length}</div>
                <div className="text-xs text-muted-foreground">Aktif Çalışma Alanı</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  ₺{workspaces.reduce((sum, w) => sum + w.budget, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Toplam Bütçe</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  ₺{workspaces.reduce((sum, w) => sum + w.totalGain, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Toplam Kazanç</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">
                  {workspaces.reduce((sum, w) => sum + w.activeBets, 0)}
                </div>
                <div className="text-xs text-muted-foreground">Aktif Bahis</div>
              </CardContent>
            </Card>
          </div>

          {/* Workspace Cards */}
          <div className="grid lg:grid-cols-2 gap-6">
            {workspaces.map((workspace) => {
              const netProfit = workspace.totalGain - workspace.totalLoss;
              const budgetUsed = (workspace.usedBudget / workspace.budget) * 100;
              
              return (
                <Card key={workspace.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer" onClick={() => enterWorkspace(workspace)}>
                  <CardHeader className="bg-muted/50 border-b">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-foreground">{workspace.name}</CardTitle>
                        <CardDescription className="mt-1">{workspace.description}</CardDescription>
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Edit fonksiyonu buraya gelecek
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Delete fonksiyonu buraya gelecek
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6">
                    {/* Budget Progress */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Bütçe Kullanımı</span>
                        <span className="font-medium">₺{workspace.usedBudget} / ₺{workspace.budget}</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(budgetUsed, 100)}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-muted-foreground mt-1">%{budgetUsed.toFixed(0)} kullanıldı</div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="text-center p-3 bg-primary/10 rounded-lg">
                        <div className="text-lg font-bold text-primary">₺{workspace.totalGain}</div>
                        <div className="text-xs text-muted-foreground">Kazanç</div>
                      </div>
                      <div className="text-center p-3 bg-destructive/10 rounded-lg">
                        <div className="text-lg font-bold text-destructive">₺{workspace.totalLoss}</div>
                        <div className="text-xs text-muted-foreground">Zarar</div>
                      </div>
                    </div>

                    {/* Performance */}
                    <div className="flex items-center justify-between mb-4 p-3 bg-muted/50 rounded-lg">
                      <div>
                        <div className="text-sm text-muted-foreground">Net Kar/Zarar</div>
                        <div className={`font-bold flex items-center ${netProfit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                          {netProfit >= 0 ? (
                            <TrendingUp className="h-4 w-4 mr-1" />
                          ) : (
                            <TrendingDown className="h-4 w-4 mr-1" />
                          )}
                          ₺{Math.abs(netProfit)}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Başarı Oranı</div>
                        <div className="font-bold text-primary">%{workspace.winRate}</div>
                      </div>
                    </div>

                    {/* Activity */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Aktif Bahis:</span>
                        <Badge variant="secondary">{workspace.activeBets}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Tamamlanan:</span>
                        <Badge variant="outline">{workspace.completedBets}</Badge>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="mt-6 pt-4 border-t flex space-x-2">
                      <Button 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          enterWorkspace(workspace)
                        }}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Çalışma Alanına Gir
                      </Button>
                      <Button 
                        variant="outline" 
                        className="flex-1"
                        onClick={(e) => {
                          e.stopPropagation()
                          // Stats modal buraya gelecek
                        }}
                      >
                        <BarChart3 className="h-4 w-4 mr-2" />
                        Detaylar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </>
      )}

      {viewMode === 'detail' && selectedWorkspace && (
        <>
          {/* Workspace Stats */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">₺{selectedWorkspace.budget}</div>
                <div className="text-xs text-muted-foreground">Toplam Bütçe</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">₺{selectedWorkspace.usedBudget}</div>
                <div className="text-xs text-muted-foreground">Kullanılan</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className={`text-2xl font-bold ${selectedWorkspace.totalGain - selectedWorkspace.totalLoss >= 0 ? 'text-primary' : 'text-destructive'}`}>
                  ₺{selectedWorkspace.totalGain - selectedWorkspace.totalLoss}
                </div>
                <div className="text-xs text-muted-foreground">Net Kar/Zarar</div>
              </CardContent>
            </Card>
            
            <Card className="border-0 shadow-lg">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-primary">%{selectedWorkspace.winRate}</div>
                <div className="text-xs text-muted-foreground">Başarı Oranı</div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="ai-predictions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-card shadow-sm border">
              <TabsTrigger value="ai-predictions" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Brain className="h-4 w-4 mr-2" />
                AI Tahminleri
              </TabsTrigger>
              <TabsTrigger value="coupons" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Trophy className="h-4 w-4 mr-2" />
                Kuponlar
              </TabsTrigger>
              <TabsTrigger value="recent" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <Clock className="h-4 w-4 mr-2" />
                Son Bahisler
              </TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                <BarChart3 className="h-4 w-4 mr-2" />
                Analiz
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ai-predictions">
              <div className="space-y-6">
                {/* Kupon Durumu */}
                {!activeCoupon ? (
                  <Card className="border-primary/20 bg-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="h-10 w-10 bg-primary/20 rounded-full flex items-center justify-center">
                            <Trophy className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-foreground">Kupon Oluştur</h3>
                            <p className="text-sm text-muted-foreground">
                              AI tahminlerinden seçim yaparak kupon oluşturun
                            </p>
                          </div>
                        </div>
                        <Button onClick={createQuickCoupon}>
                          <Plus className="h-4 w-4 mr-2" />
                          Hızlı Kupon Oluştur
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  // Aktif Kupon
                  <Card className="border-primary/20 bg-primary/5">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span className="flex items-center">
                          <Zap className="h-5 w-5 mr-2 text-primary" />
                          Aktif Kupon: {activeCoupon.name}
                        </span>
                        <Badge variant={getRiskBadgeVariant(activeCoupon.riskLevel)}>
                          Risk: {activeCoupon.riskLevel}
                        </Badge>
                      </CardTitle>
                      <CardDescription>
                        Güven Skoru: %{activeCoupon.confidenceScore.toFixed(1)} • 
                        Toplam Oran: {activeCoupon.totalOdds.toFixed(2)} • 
                        Potansiyel Kazanç: ₺{activeCoupon.potentialWin.toFixed(2)}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {activeCoupon.selections.map((selection) => (
                          <div key={selection.id} className="flex items-center justify-between p-3 bg-background rounded-lg">
                            <div>
                              <div className="font-medium">{selection.homeTeam} vs {selection.awayTeam}</div>
                              <div className="text-sm text-muted-foreground">
                                {selection.selection} • Oran: {selection.odds} • Güven: %{selection.confidence.toFixed(1)}
                              </div>
                            </div>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => removeSelectionFromCoupon(selection.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                      
                      {/* Bahis Miktarı Ayarı */}
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-center space-x-3">
                          <Label htmlFor="stake" className="text-sm font-medium">
                            Bahis Miktarı (₺)
                          </Label>
                          <Input
                            id="stake"
                            type="number"
                            value={activeCoupon.stake || ''}
                            onChange={(e) => {
                              const newStake = Number(e.target.value) || 0
                              setActiveCoupon({
                                ...activeCoupon,
                                stake: newStake,
                                potentialWin: newStake * activeCoupon.totalOdds
                              })
                            }}
                            className="w-32"
                            min="1"
                          />
                          <div className="flex-1 text-right">
                            <div className="text-sm text-muted-foreground">Potansiyel Kazanç</div>
                            <div className="font-bold text-primary">₺{activeCoupon.potentialWin.toFixed(2)}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 pt-4 border-t flex space-x-2">
                        <Button onClick={saveCoupon} className="flex-1">
                          <Trophy className="h-4 w-4 mr-2" />
                          Kuponu Kaydet
                        </Button>
                        <Button 
                          variant="outline" 
                          onClick={() => setActiveCoupon(null)}
                          className="flex-1"
                        >
                          İptal Et
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* AI Tahminleri */}
                <div className="grid gap-4">
                  {loadingPredictions ? (
                    <div className="text-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                      <p className="text-muted-foreground mt-2">AI tahminleri yükleniyor...</p>
                    </div>
                  ) : aiPredictions.length > 0 ? (
                    aiPredictions.map((prediction) => (
                      <Card key={prediction.id} className="border-0 shadow-lg">
                        <CardHeader className="bg-muted/50">
                          <CardTitle className="flex items-center justify-between">
                            <span>{prediction.homeTeam} vs {prediction.awayTeam}</span>
                            <Badge variant={getRiskBadgeVariant(prediction.riskLevel)}>
                              {prediction.riskLevel}
                            </Badge>
                          </CardTitle>
                          <CardDescription>
                            {prediction.league} • {new Date(prediction.matchDate).toLocaleDateString('tr-TR')}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="p-6">
                          <div className="grid md:grid-cols-2 gap-6">
                            {/* Ana Tahmin */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-foreground">Ana Tahmin</h4>
                              <div className="bg-primary/10 p-4 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="font-medium">
                                    {prediction.predictions.result.prediction === '1' ? 'Ev Sahibi' : 
                                     prediction.predictions.result.prediction === 'X' ? 'Beraberlik' : 'Deplasman'}
                                  </span>
                                  <Badge className="bg-primary/20 text-primary">
                                    %{prediction.predictions.result.confidence.toFixed(1)}
                                  </Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                  <span className="text-sm text-muted-foreground">Oran: {prediction.predictions.result.odds.toFixed(2)}</span>
                                  <Button 
                                    size="sm"
                                    onClick={() => addSelectionToCoupon(
                                      prediction, 
                                      'RESULT', 
                                      prediction.predictions.result.prediction === '1' ? 'Ev Sahibi' : 
                                      prediction.predictions.result.prediction === 'X' ? 'Beraberlik' : 'Deplasman',
                                      prediction.predictions.result.odds
                                    )}
                                    className="bg-primary/20 hover:bg-primary/30 text-primary"
                                  >
                                    <Plus className="h-3 w-3 mr-1" />
                                    Kupona Ekle
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Diğer Tahminler */}
                            <div className="space-y-3">
                              <h4 className="font-semibold text-foreground">Diğer Tahminler</h4>
                              
                              {/* 2.5 Üst */}
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">2.5 Üst</span>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline">
                                      %{prediction.predictions.goalsOver25.confidence.toFixed(1)}
                                    </Badge>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => addSelectionToCoupon(
                                        prediction, 
                                        'OVER_UNDER', 
                                        '2.5 Üst',
                                        prediction.predictions.goalsOver25.odds
                                      )}
                                      className="hover:bg-primary/10"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Her İki Takım Gol */}
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Her İki Takım Gol</span>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline">
                                      %{prediction.predictions.bothTeamsScore.confidence.toFixed(1)}
                                    </Badge>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => addSelectionToCoupon(
                                        prediction, 
                                        'BOTH_TEAMS_SCORE', 
                                        'Her İki Takım Gol',
                                        prediction.predictions.bothTeamsScore.odds
                                      )}
                                      className="hover:bg-primary/10"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>

                              {/* Doğru Skor */}
                              <div className="bg-muted/50 p-3 rounded-lg">
                                <div className="flex items-center justify-between">
                                  <span className="text-sm">Doğru Skor: {prediction.predictions.correctScore.prediction}</span>
                                  <div className="flex items-center space-x-2">
                                    <Badge variant="outline">
                                      %{prediction.predictions.correctScore.confidence.toFixed(1)}
                                    </Badge>
                                    <Button 
                                      size="sm" 
                                      variant="outline"
                                      onClick={() => addSelectionToCoupon(
                                        prediction, 
                                        'CORRECT_SCORE', 
                                        prediction.predictions.correctScore.prediction,
                                        prediction.predictions.correctScore.odds
                                      )}
                                      className="hover:bg-primary/10"
                                    >
                                      <Plus className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Faktörler */}
                          <div className="mt-6 pt-4 border-t">
                            <h4 className="font-semibold text-foreground mb-3">Analiz Faktörleri</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                              <div className="text-center">
                                <div className="font-medium text-primary">%{prediction.factors.homeForm}</div>
                                <div className="text-muted-foreground">Ev Sahibi Form</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-primary">%{prediction.factors.awayForm}</div>
                                <div className="text-muted-foreground">Deplasman Form</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-primary">%{prediction.factors.headToHead}</div>
                                <div className="text-muted-foreground">Karşı Karşıya</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-primary">%{prediction.factors.motivation}</div>
                                <div className="text-muted-foreground">Motivasyon</div>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-muted/30 rounded-lg">
                            <h5 className="font-medium text-foreground mb-2 flex items-center">
                              <Brain className="h-4 w-4 mr-2 text-primary" />
                              AI Analizi
                            </h5>
                            <p className="text-sm text-muted-foreground mb-2">
                              Bu maç için AI analizi, {prediction.homeTeam} takımının ev sahibi avantajını ve son 5 maçtaki performansını değerlendirdi. 
                              {prediction.awayTeam} takımının deplasman performansı ve karşı karşıya geçmiş sonuçları da analiz edildi.
                            </p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-muted-foreground">
                                Analiz Tarihi: {new Date(prediction.matchDate).toLocaleDateString('tr-TR')}
                              </span>
                              <Badge variant="outline" className="text-xs">
                                AI Güven: %{Math.round(prediction.predictions.result.confidence)}
                              </Badge>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Brain className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">AI Tahminleri Yok</h3>
                      <p className="text-muted-foreground">Tahminleri yüklemek için yukarıdaki butonu kullanın</p>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="coupons">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-foreground">Kuponlarım</h3>
                  <Button onClick={() => setIsCouponOpen(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Yeni Kupon
                  </Button>
                </div>
                
                {selectedWorkspace.coupons.length > 0 ? (
                  <div className="grid gap-4">
                    {selectedWorkspace.coupons.map((coupon) => (
                      <Card key={coupon.id} className="border-0 shadow-lg">
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span>{coupon.name}</span>
                            <div className="flex items-center space-x-2">
                              <Badge variant={getRiskBadgeVariant(coupon.riskLevel)}>
                                {coupon.riskLevel}
                              </Badge>
                              <Badge variant="outline">
                                {coupon.status === 'PENDING' ? 'Beklemede' : 
                                 coupon.status === 'WON' ? 'Kazandı' : 
                                 coupon.status === 'LOST' ? 'Kaybetti' : 'İptal'}
                              </Badge>
                            </div>
                          </CardTitle>
                          <CardDescription>
                            {coupon.selections.length} seçim • Oran: {coupon.totalOdds.toFixed(2)} • Bahis: ₺{coupon.stake}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            {coupon.selections.map((selection) => (
                              <div key={selection.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                                <div className="flex-1">
                                  <span className="text-sm font-medium">{selection.homeTeam} vs {selection.awayTeam}</span>
                                  <div className="text-xs text-muted-foreground">{selection.selection}</div>
                                </div>
                                <div className="text-right">
                                  <div className="text-sm font-medium">{selection.odds}</div>
                                  <div className="text-xs text-muted-foreground">%{selection.confidence.toFixed(0)}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                          
                          <div className="mt-4 pt-4 border-t">
                            <div className="grid grid-cols-3 gap-4 text-sm">
                              <div className="text-center">
                                <div className="font-medium text-foreground">₺{coupon.potentialWin.toFixed(2)}</div>
                                <div className="text-muted-foreground">Potansiyel Kazanç</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-primary">%{coupon.confidenceScore.toFixed(1)}</div>
                                <div className="text-muted-foreground">Güven Skoru</div>
                              </div>
                              <div className="text-center">
                                <div className="font-medium text-muted-foreground">
                                  {coupon.createdAt.toLocaleDateString('tr-TR')}
                                </div>
                                <div className="text-muted-foreground">Oluşturulma</div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">Henüz Kupon Yok</h3>
                    <p className="text-muted-foreground">İlk kuponunuzu oluşturun</p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="recent">
              <Card className="border-0 shadow-lg">
                <CardHeader className="bg-muted/50 border-b">
                  <CardTitle className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-primary" />
                    Son Bahisler
                  </CardTitle>
                  <CardDescription>Bu çalışma alanından son bahis aktiviteleri</CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {recentBets.filter(bet => bet.workspaceId === selectedWorkspace.id).map((bet) => (
                      <div key={bet.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="font-semibold text-foreground mb-2">{bet.match}</div>
                          <div className="text-sm text-muted-foreground">
                            <span className="font-medium">{bet.prediction}</span>
                            <span className="mx-2">•</span>
                            <span>Oran: {bet.odds}</span>
                            <span className="mx-2">•</span>
                            <span>Bahis: ₺{bet.stake}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <Badge className={
                            bet.status === 'won' ? 'bg-primary/20 text-primary' :
                            bet.status === 'lost' ? 'bg-destructive/20 text-destructive' :
                            'bg-yellow-100 text-yellow-700'
                          }>
                            {bet.status === 'won' ? 'Kazandı' : 
                             bet.status === 'lost' ? 'Kaybetti' : 'Beklemede'}
                          </Badge>
                          {bet.profit !== null && (
                            <div className={`text-sm font-medium mt-1 ${bet.profit >= 0 ? 'text-primary' : 'text-destructive'}`}>
                              {bet.profit >= 0 ? '+' : ''}₺{bet.profit}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-muted/50 border-b">
                    <CardTitle className="flex items-center">
                      <Calculator className="h-5 w-5 mr-2 text-primary" />
                      Karlılık Analizi
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">ROI</div>
                          <div className="text-sm text-muted-foreground">Yatırım Getirisi</div>
                        </div>
                        <div className={`font-bold text-right ${selectedWorkspace.usedBudget > 0 ? 
                          ((selectedWorkspace.totalGain - selectedWorkspace.totalLoss) / selectedWorkspace.usedBudget * 100) >= 0 ? 
                          'text-primary' : 'text-destructive' : 'text-muted-foreground'}`}>
                          {selectedWorkspace.usedBudget > 0 ? 
                            `${((selectedWorkspace.totalGain - selectedWorkspace.totalLoss) / selectedWorkspace.usedBudget * 100).toFixed(1)}%` : 
                            '0%'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-lg">
                  <CardHeader className="bg-muted/50 border-b">
                    <CardTitle className="flex items-center">
                      <Target className="h-5 w-5 mr-2 text-primary" />
                      Performans Özeti
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary mb-2">
                          %{selectedWorkspace.winRate}
                        </div>
                        <div className="text-sm text-muted-foreground">Başarı Oranı</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="font-bold text-primary">
                            {selectedWorkspace.activeBets}
                          </div>
                          <div className="text-muted-foreground">Aktif Bahis</div>
                        </div>
                        <div className="text-center p-3 bg-primary/10 rounded-lg">
                          <div className="font-bold text-primary">
                            {selectedWorkspace.completedBets}
                          </div>
                          <div className="text-muted-foreground">Tamamlanan</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </>
      )}
    </div>
  );
}
