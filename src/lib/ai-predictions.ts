// AI Tahmin Sistemi
export interface AIPrediction {
  id: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  league: string;
  matchDate: string;
  predictions: {
    result: {
      prediction: '1' | 'X' | '2'; // 1: Ev sahibi, X: Beraberlik, 2: Deplasman
      confidence: number; // 0-100 arası güven skoru
      odds: number;
    };
    goalsOver25: {
      prediction: boolean;
      confidence: number;
      odds: number;
    };
    bothTeamsScore: {
      prediction: boolean;
      confidence: number;
      odds: number;
    };
    correctScore: {
      prediction: string; // "2-1" gibi
      confidence: number;
      odds: number;
    };
  };
  factors: {
    homeForm: number; // 0-100
    awayForm: number; // 0-100
    headToHead: number; // 0-100
    injuries: string[];
    weather?: string;
    motivation: number; // 0-100
  };
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  expectedValue: number; // Beklenen değer
}

export interface BettingCoupon {
  id: string;
  name: string;
  workspaceId: string;
  selections: CouponSelection[];
  stake: number;
  totalOdds: number;
  potentialWin: number;
  confidenceScore: number; // AI tarafından hesaplanan güven skoru
  riskLevel: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'PENDING' | 'WON' | 'LOST' | 'VOID';
  createdAt: Date;
  settledAt?: Date;
}

export interface CouponSelection {
  id: string;
  matchId: string;
  homeTeam: string;
  awayTeam: string;
  betType: 'RESULT' | 'OVER_UNDER' | 'BOTH_TEAMS_SCORE' | 'CORRECT_SCORE';
  selection: string;
  odds: number;
  aiPrediction?: AIPrediction;
  confidence: number;
}

// AI Tahmin Servisi
class AIPredictionService {
  private apiKey = process.env.FOOTBALL_DATA_API_KEY;
  private baseUrl = 'https://api.football-data.org/v4';

  async generatePredictions(matchId: string): Promise<AIPrediction> {
    try {
      // 1. Maç detaylarını al
      const matchData = await this.getMatchData(matchId);
      
      // 2. Takım formlarını analiz et
      const teamAnalysis = await this.analyzeTeamForms(matchData.homeTeam.id, matchData.awayTeam.id);
      
      // 3. Head-to-head analiz
      const h2hAnalysis = await this.analyzeHeadToHead(matchData.homeTeam.id, matchData.awayTeam.id);
      
      // 4. AI algoritmalarını çalıştır
      const predictions = this.calculatePredictions(matchData, teamAnalysis, h2hAnalysis);
      
      return {
        id: `pred_${matchId}_${Date.now()}`,
        matchId,
        homeTeam: matchData.homeTeam.name,
        awayTeam: matchData.awayTeam.name,
        league: matchData.competition.name,
        matchDate: matchData.utcDate,
        predictions,
        factors: {
          homeForm: teamAnalysis.homeForm,
          awayForm: teamAnalysis.awayForm,
          headToHead: h2hAnalysis.advantage,
          injuries: teamAnalysis.injuries,
          motivation: teamAnalysis.motivation
        },
        riskLevel: this.calculateRiskLevel(predictions),
        expectedValue: this.calculateExpectedValue(predictions)
      };
    } catch (error) {
      console.error('AI Prediction Error:', error);
      throw new Error('AI tahmin oluşturulamadı');
    }
  }

  private async getMatchData(matchId: string) {
    const response = await fetch(`${this.baseUrl}/matches/${matchId}`, {
      headers: {
        'X-Auth-Token': this.apiKey || ''
      }
    });
    
    if (!response.ok) {
      throw new Error('Maç verisi alınamadı');
    }
    
    return response.json();
  }

  private async analyzeTeamForms(homeTeamId: string, awayTeamId: string) {
    // Takım formlarını analiz et (son 5 maç)
    // Bu gerçek bir AI analizi olacak, şimdilik örnek veri
    return {
      homeForm: Math.floor(Math.random() * 40) + 60, // 60-100 arası
      awayForm: Math.floor(Math.random() * 40) + 60,
      injuries: ['Oyuncu 1', 'Oyuncu 2'],
      motivation: Math.floor(Math.random() * 30) + 70
    };
  }

  private async analyzeHeadToHead(homeTeamId: string, awayTeamId: string) {
    // Head-to-head analiz
    return {
      advantage: Math.floor(Math.random() * 100),
      recentResults: []
    };
  }

  private calculatePredictions(matchData: any, teamAnalysis: any, h2hAnalysis: any) {
    // AI algoritmaları burada çalışacak
    // Şimdilik örnek hesaplama
    const homeAdvantage = (teamAnalysis.homeForm + h2hAnalysis.advantage) / 2;
    const awayAdvantage = (teamAnalysis.awayForm + (100 - h2hAnalysis.advantage)) / 2;
    
    let resultPrediction: '1' | 'X' | '2';
    let resultConfidence: number;
    
    if (homeAdvantage > awayAdvantage + 15) {
      resultPrediction = '1';
      resultConfidence = Math.min(homeAdvantage, 95);
    } else if (awayAdvantage > homeAdvantage + 15) {
      resultPrediction = '2';
      resultConfidence = Math.min(awayAdvantage, 95);
    } else {
      resultPrediction = 'X';
      resultConfidence = 70;
    }

    return {
      result: {
        prediction: resultPrediction,
        confidence: resultConfidence,
        odds: this.calculateOdds(resultPrediction, resultConfidence)
      },
      goalsOver25: {
        prediction: Math.random() > 0.4,
        confidence: Math.floor(Math.random() * 30) + 65,
        odds: 1.8
      },
      bothTeamsScore: {
        prediction: Math.random() > 0.45,
        confidence: Math.floor(Math.random() * 25) + 70,
        odds: 1.9
      },
      correctScore: {
        prediction: this.predictCorrectScore(resultPrediction),
        confidence: Math.floor(Math.random() * 20) + 40,
        odds: 8.5
      }
    };
  }

  private calculateOdds(prediction: '1' | 'X' | '2', confidence: number): number {
    // Güven skoruna göre oran hesapla
    const baseOdds = { '1': 2.2, 'X': 3.4, '2': 2.8 };
    const confidenceMultiplier = (100 - confidence) / 100;
    return baseOdds[prediction] * (1 + confidenceMultiplier);
  }

  private predictCorrectScore(result: '1' | 'X' | '2'): string {
    const scores = {
      '1': ['2-1', '2-0', '3-1', '1-0'],
      'X': ['1-1', '2-2', '0-0'],
      '2': ['1-2', '0-2', '1-3', '0-1']
    };
    
    const possibleScores = scores[result];
    return possibleScores[Math.floor(Math.random() * possibleScores.length)];
  }

  private calculateRiskLevel(predictions: any): 'LOW' | 'MEDIUM' | 'HIGH' {
    const avgConfidence = (
      predictions.result.confidence + 
      predictions.goalsOver25.confidence + 
      predictions.bothTeamsScore.confidence
    ) / 3;
    
    if (avgConfidence >= 80) return 'LOW';
    if (avgConfidence >= 65) return 'MEDIUM';
    return 'HIGH';
  }

  private calculateExpectedValue(predictions: any): number {
    // Expected Value hesaplama
    const resultEV = (predictions.result.confidence / 100) * predictions.result.odds - 1;
    const goalsEV = (predictions.goalsOver25.confidence / 100) * predictions.goalsOver25.odds - 1;
    const bttsEV = (predictions.bothTeamsScore.confidence / 100) * predictions.bothTeamsScore.odds - 1;
    
    return (resultEV + goalsEV + bttsEV) / 3;
  }
}

// Kupon Yönetim Servisi
class CouponService {
  calculateCouponConfidence(selections: CouponSelection[]): number {
    if (selections.length === 0) return 0;
    
    // Kombine güven skoru hesaplama
    const individualConfidences = selections.map(s => s.confidence);
    const avgConfidence = individualConfidences.reduce((a, b) => a + b, 0) / selections.length;
    
    // Seçim sayısına göre güven skorunu azalt
    const selectionPenalty = Math.max(0, (selections.length - 1) * 5);
    
    return Math.max(0, avgConfidence - selectionPenalty);
  }

  calculateTotalOdds(selections: CouponSelection[]): number {
    return selections.reduce((total, selection) => total * selection.odds, 1);
  }

  calculateRiskLevel(confidence: number): 'LOW' | 'MEDIUM' | 'HIGH' {
    if (confidence >= 75) return 'LOW';
    if (confidence >= 60) return 'MEDIUM';
    return 'HIGH';
  }

  validateCoupon(coupon: BettingCoupon): { isValid: boolean; errors: string[] } {
    const errors: string[] = [];
    
    if (coupon.selections.length === 0) {
      errors.push('Kupon en az bir seçim içermelidir');
    }
    
    if (coupon.stake <= 0) {
      errors.push('Bahis miktarı 0\'dan büyük olmalıdır');
    }
    
    if (coupon.selections.length > 10) {
      errors.push('Kupon en fazla 10 seçim içerebilir');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }
}

export const aiPredictionService = new AIPredictionService();
export const couponService = new CouponService();
