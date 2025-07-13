'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

interface MatchAnalysis {
  prediction: string
  confidenceScore: number
  keyFactors: string[]
  goalPrediction: {
    homeGoals: number
    awayGoals: number
  }
  riskAssessment: string
}

interface Team {
  id: number
  name: string
  crest: string
}

interface MatchData {
  analysis: MatchAnalysis
  teams: {
    home: Team
    away: Team
  }
  stats: any
  headToHead: any[]
}

export default function MatchDetail() {
  const params = useParams()
  const [matchData, setMatchData] = useState<MatchData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const analyzeMatch = async () => {
    setIsLoading(true)
    setError('')

    try {
      // Demo amaçlı sabit takım ID'leri
      const response = await fetch('/api/matches/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          homeTeamId: 66, // Manchester United
          awayTeamId: 64, // Liverpool
        }),
      })

      if (response.ok) {
        const data = await response.json()
        setMatchData(data)
      } else {
        setError('Analiz yapılırken bir hata oluştu')
      }
    } catch (error) {
      setError('Bağlantı hatası')
    } finally {
      setIsLoading(false)
    }
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
              <h1 className="text-xl font-bold text-gray-900">AI Football Analytics</h1>
            </div>
            <Button variant="outline">Dashboard'a Dön</Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Match Header */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">MU</span>
                  </div>
                  <div className="font-semibold">Manchester United</div>
                  <div className="text-sm text-gray-500">Ev Sahibi</div>
                </div>
                
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-400 mb-2">VS</div>
                  <div className="text-sm text-gray-500">Premier League</div>
                  <div className="text-sm font-medium">Bugün 20:00</div>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-red-800 rounded-full flex items-center justify-center mx-auto mb-2">
                    <span className="text-white font-bold text-lg">LIV</span>
                  </div>
                  <div className="font-semibold">Liverpool</div>
                  <div className="text-sm text-gray-500">Deplasman</div>
                </div>
              </div>
              
              <Button 
                onClick={analyzeMatch} 
                disabled={isLoading}
                size="lg"
              >
                {isLoading ? 'Analiz Yapılıyor...' : 'AI Analizi Yap'}
              </Button>
            </div>
          </CardHeader>
        </Card>

        {error && (
          <Card className="mb-8 border-red-200 bg-red-50">
            <CardContent className="pt-6">
              <div className="text-red-600 text-center">{error}</div>
            </CardContent>
          </Card>
        )}

        {matchData && (
          <Tabs defaultValue="analysis" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="analysis">AI Analizi</TabsTrigger>
              <TabsTrigger value="stats">İstatistikler</TabsTrigger>
              <TabsTrigger value="history">Geçmiş</TabsTrigger>
              <TabsTrigger value="prediction">Tahminim</TabsTrigger>
            </TabsList>

            <TabsContent value="analysis">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🎯</span>
                      <span>AI Tahmini</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="text-lg font-semibold text-blue-600">
                          {matchData.analysis.prediction}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Gol Tahmini: {matchData.analysis.goalPrediction.homeGoals}-{matchData.analysis.goalPrediction.awayGoals}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">Güven Skoru:</span>
                        <Badge 
                          variant={matchData.analysis.confidenceScore > 75 ? "default" : "secondary"}
                        >
                          %{matchData.analysis.confidenceScore}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>⚠️</span>
                      <span>Risk Değerlendirmesi</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-gray-700">
                      {matchData.analysis.riskAssessment}
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <span>🔍</span>
                      <span>Anahtar Faktörler</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {matchData.analysis.keyFactors.map((factor, index) => (
                        <li key={index} className="flex items-start space-x-2">
                          <span className="text-blue-600 mt-1">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="stats">
              <Card>
                <CardHeader>
                  <CardTitle>Takım İstatistikleri</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    İstatistik verileri yükleniyor...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Karşılaşma Geçmişi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Son 5 karşılaşma yükleniyor...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prediction">
              <Card>
                <CardHeader>
                  <CardTitle>Kendi Tahminimi Yap</CardTitle>
                  <CardDescription>
                    Bu maç için kendi tahminizi kaydedin
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center text-gray-500 py-8">
                    Tahmin formu yükleniyor...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  )
}
