import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })

export interface MatchAnalysis {
  prediction: string
  confidenceScore: number
  keyFactors: string[]
  goalPrediction: {
    homeGoals: number
    awayGoals: number
  }
  riskAssessment: string
}

export interface TeamStats {
  name: string
  recentForm: string[]
  goalsFor: number
  goalsAgainst: number
  wins: number
  draws: number
  losses: number
}

export async function analyzeMatch(
  homeTeam: TeamStats,
  awayTeam: TeamStats,
  historicalMatches: any[]
): Promise<MatchAnalysis> {
  try {
    const prompt = `
    Sen bir profesyonel futbol analistisisin. Aşağıdaki verileri kullanarak detaylı bir maç analizi yap:

    EV SAHİBİ TAKIM: ${homeTeam.name}
    - Son form: ${homeTeam.recentForm.join(', ')}
    - Attığı gol: ${homeTeam.goalsFor}
    - Yediği gol: ${homeTeam.goalsAgainst}
    - Galibiyet: ${homeTeam.wins}
    - Beraberlik: ${homeTeam.draws}
    - Mağlubiyet: ${homeTeam.losses}

    DEPLASMAN TAKIMI: ${awayTeam.name}
    - Son form: ${awayTeam.recentForm.join(', ')}
    - Attığı gol: ${awayTeam.goalsFor}
    - Yediği gol: ${awayTeam.goalsAgainst}
    - Galibiyet: ${awayTeam.wins}
    - Beraberlik: ${awayTeam.draws}
    - Mağlubiyet: ${awayTeam.losses}

    GEÇMİŞ KARŞILAŞMALAR: ${historicalMatches.length} maç analiz edildi

    Lütfen şu formatta cevap ver:
    1. Genel tahmin (kim kazanır veya berabere)
    2. Güven skoru (0-100)
    3. Ana faktörler (3-5 madde)
    4. Gol tahmini (ev sahibi - deplasman)
    5. Risk değerlendirmesi

    Türkçe ve profesyonel bir dille yanıtla.
    `

    const fullPrompt = `Sen profesyonel bir futbol analisti ve tahmin uzmanısın. Verilen istatistikleri kullanarak objektif ve detaylı analizler yaparsın.\n\n${prompt}`
    
    const result = await model.generateContent(fullPrompt)
    const response = result.response.text() || ''
    
    // Response'u parse et ve yapılandır
    const analysis = parseAIResponse(response)
    
    return analysis
  } catch (error) {
    console.error('AI Analysis Error:', error)
    throw new Error('Maç analizi yapılırken bir hata oluştu')
  }
}

function parseAIResponse(response: string): MatchAnalysis {
  // Basit parsing logic - production'da daha sofistike olabilir
  const lines = response.split('\n').filter(line => line.trim())
  
  return {
    prediction: extractPrediction(response),
    confidenceScore: extractConfidence(response),
    keyFactors: extractFactors(response),
    goalPrediction: extractGoals(response),
    riskAssessment: extractRisk(response)
  }
}

function extractPrediction(text: string): string {
  const match = text.match(/(?:tahmin|prediction)[\s:]*([^\n]+)/i)
  return match?.[1]?.trim() || 'Analiz tamamlanamadı'
}

function extractConfidence(text: string): number {
  const match = text.match(/(?:güven|confidence)[\s:]*(\d+)/i)
  return match ? parseInt(match[1]) : 70
}

function extractFactors(text: string): string[] {
  const factorSection = text.match(/(?:faktör|factor)[\s:]*([^0-9]+?)(?:\d+\.|$)/i)
  if (factorSection) {
    return factorSection[1]
      .split(/[-•\n]/)
      .filter(f => f.trim())
      .map(f => f.trim())
      .slice(0, 5)
  }
  return ['Form durumu', 'Ev sahibi avantajı', 'Geçmiş performans']
}

function extractGoals(text: string): { homeGoals: number; awayGoals: number } {
  const match = text.match(/(\d+)\s*-\s*(\d+)/)
  if (match) {
    return {
      homeGoals: parseInt(match[1]),
      awayGoals: parseInt(match[2])
    }
  }
  return { homeGoals: 1, awayGoals: 1 }
}

function extractRisk(text: string): string {
  const match = text.match(/(?:risk|değerlendirme)[\s:]*([^\n]+)/i)
  return match?.[1]?.trim() || 'Orta seviye risk'
}
