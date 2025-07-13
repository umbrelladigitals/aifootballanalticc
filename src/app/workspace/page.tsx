'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useMatches } from '@/hooks/useFootballData'
import { AIPrediction, BettingCoupon, CouponSelection, aiPredictionService, couponService } from '@/lib/ai-predictions'
import { 
  Target, 
  TrendingUp, 
  TrendingDown, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Plus, 
  Trash2,
  Brain,
  Zap,
  Calculator,
  Trophy,
  DollarSign,
  BarChart3,
  Shield,
  Activity,
  Star,
  Eye
} from 'lucide-react'

interface BettingWorkspace {
  id: string
  name: string
  description: string
  budget: number
  totalGain: number
  totalLoss: number
  coupons: BettingCoupon[]
  aiPredictions: AIPrediction[]
}

export default function Workspace() {
  const [workspaces, setWorkspaces] = useState<BettingWorkspace[]>([
    {
      id: '1',
      name: 'Premier League Stratejim',
      description: 'Premier League maçları için özel strateji',
      budget: 1000,
      totalGain: 250,
      totalLoss: 100,
      coupons: [],
      aiPredictions: []
    }
  ])
  const [selectedWorkspace, setSelectedWorkspace] = useState<BettingWorkspace | null>(null)
  const [activeCoupon, setActiveCoupon] = useState<BettingCoupon | null>(null)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCouponOpen, setIsCouponOpen] = useState(false)
  const [isAIOpen, setIsAIOpen] = useState(false)
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
      ...newWorkspace,
      totalGain: 0,
      totalLoss: 0,
      coupons: [],
      aiPredictions: []
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
  const loadAIPredictions = async () => {
    if (!selectedWorkspace || !matchesData) return
    
    setLoadingPredictions(true)
    try {
      const predictions: AIPrediction[] = []
      
      // Bugünkü ve yaklaşan maçlar için tahmin oluştur
      const matchesToPredict = [
        ...(matchesData.todayMatches || []),
        ...(matchesData.upcomingMatches || [])
      ].slice(0, 10) // İlk 10 maç
      
      for (const match of matchesToPredict) {
        try {
          const prediction = await aiPredictionService.generatePredictions(match.id.toString())
          predictions.push(prediction)
        } catch (error) {
          console.error(`Prediction error for match ${match.id}:`, error)
        }
      }
      
      setAiPredictions(predictions)
      
      // Workspace'e tahminleri kaydet
      const updatedWorkspace = {
        ...selectedWorkspace,
        aiPredictions: predictions
      }
      setSelectedWorkspace(updatedWorkspace)
      
      // Workspaces listesini güncelle
      setWorkspaces(prev => prev.map(w => 
        w.id === selectedWorkspace.id ? updatedWorkspace : w
      ))
      
    } catch (error) {
      console.error('AI Predictions Loading Error:', error)
    } finally {
      setLoadingPredictions(false)
    }
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
    if (!activeCoupon) return
    
    const newSelection: CouponSelection = {
      id: `sel_${Date.now()}`,
      matchId: prediction.matchId,
      homeTeam: prediction.homeTeam,
      awayTeam: prediction.awayTeam,
      betType: betType as any,
      selection,
      odds,
      aiPrediction: prediction,
      confidence: prediction.predictions.result.confidence
    }
    
    const updatedSelections = [...activeCoupon.selections, newSelection]
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">⚽</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Çalışma Alanları</h1>
            </div>
            <Button variant="outline">Dashboard'a Dön</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Çalışma Alanlarım</h1>
            <p className="text-gray-600 mt-2">Bahis stratejilerinizi organize edin ve takip edin</p>
          </div>
          
          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button>Yeni Alan Oluştur</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Yeni Çalışma Alanı</DialogTitle>
                <DialogDescription>
                  Bahis stratejiniz için yeni bir çalışma alanı oluşturun
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Alan Adı</Label>
                  <Input
                    id="name"
                    placeholder="Örn: Premier League Stratejim"
                    value={newWorkspace.name}
                    onChange={(e) => setNewWorkspace({...newWorkspace, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Açıklama</Label>
                  <Input
                    id="description"
                    placeholder="Bu alanı nasıl kullanacağınızı açıklayın"
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
                  Alan Oluştur
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Workspaces Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {workspaces.map((workspace) => {
            const profit = calculateProfit(workspace)
            const profitPercentage = workspace.budget > 0 ? (profit / workspace.budget) * 100 : 0
            
            return (
              <Card key={workspace.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{workspace.name}</span>
                    <Badge variant={profit >= 0 ? "default" : "destructive"}>
                      {profit >= 0 ? '+' : ''}₺{profit}
                    </Badge>
                  </CardTitle>
                  <CardDescription>{workspace.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Bütçe</span>
                      <span className="font-medium">₺{workspace.budget}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Kazanç</span>
                      <span className="font-medium text-green-600">₺{workspace.totalGain}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Kayıp</span>
                      <span className="font-medium text-red-600">₺{workspace.totalLoss}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2 border-t">
                      <span className="text-sm font-medium">Net Kar/Zarar</span>
                      <div className="text-right">
                        <div className={`font-bold ${getProfitColor(profit)}`}>
                          {profit >= 0 ? '+' : ''}₺{profit}
                        </div>
                        <div className={`text-xs ${getProfitColor(profit)}`}>
                          ({profitPercentage >= 0 ? '+' : ''}{profitPercentage.toFixed(1)}%)
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">Aktif Kupon</span>
                      <Badge variant="outline">{workspace.coupons.length}</Badge>
                    </div>
                  </div>
                  <Button className="w-full mt-4" variant="outline">
                    Alanı Aç
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Workspace Detail */}
        {workspaces.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Premier League Stratejim - Detaylar</CardTitle>
              <CardDescription>Bahis geçmişi ve aktif bahisler</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="active" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="active">Aktif Bahisler</TabsTrigger>
                  <TabsTrigger value="history">Geçmiş</TabsTrigger>
                  <TabsTrigger value="analytics">Analitik</TabsTrigger>
                </TabsList>

                <TabsContent value="active">
                  <div className="text-center text-gray-500 py-8">
                    <p>Henüz aktif bahis bulunmuyor.</p>
                    <Button className="mt-4">Yeni Bahis Ekle</Button>
                  </div>
                </TabsContent>

                <TabsContent value="history">
                  <div className="text-center text-gray-500 py-8">
                    <p>Bahis geçmişi bulunmuyor.</p>
                  </div>
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Toplam Bahis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-blue-600">0</div>
                        <div className="text-xs text-gray-500">Bu ay</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Başarı Oranı</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-green-600">0%</div>
                        <div className="text-xs text-gray-500">Kazanılan bahisler</div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-600">Ortalama Oran</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold text-purple-600">0.00</div>
                        <div className="text-xs text-gray-500">Bahis oranları</div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
