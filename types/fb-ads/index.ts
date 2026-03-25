// ─── Research ────────────────────────────────────────────────────────────────

export interface PainPoint {
  id: string
  title: string
  description: string
  emotionalScore: number // 1-10
  sourceType: 'reddit' | 'youtube' | 'both'
  exampleQuotes: string[]
}

export interface ResearchInsights {
  fetchedAt: string
  painPoints: PainPoint[]
  targetAudience: string
  commonLanguage: string[]
  topThemes: string[]
}

// ─── Ad Creatives ─────────────────────────────────────────────────────────────

export type AdAngle = 'pain' | 'benefit' | 'social_proof' | 'question' | 'urgency'

export type AdStatus = 'draft' | 'pending_publish' | 'active' | 'paused' | 'deleted'

export type CTAType =
  | 'LEARN_MORE'
  | 'GET_QUOTE'
  | 'SIGN_UP'
  | 'CONTACT_US'
  | 'BOOK_TRAVEL'
  | 'APPLY_NOW'

export interface AdCopy {
  primaryText: string   // max 125 chars
  headline: string      // max 40 chars
  description: string   // max 30 chars
  ctaType: CTAType
}

export interface AdImage {
  prompt: string               // Gemini generation prompt
  squareUrl: string | null     // 1080x1080 composed image (Vercel Blob)
  storyUrl: string | null      // 1080x1920 composed image (Vercel Blob)
  generatedAt: string | null
}

export interface AdVariation {
  id: string
  angle: AdAngle
  copy: AdCopy
  image: AdImage
  status: AdStatus
  facebookAdId: string | null
  createdAt: string
  // Performance (populated after publishing)
  performance: AdPerformance | null
}

// ─── Performance ──────────────────────────────────────────────────────────────

export interface AdPerformance {
  impressions: number
  clicks: number
  ctr: number        // Click-through rate %
  cpc: number        // Cost per click $
  spend: number      // Total spend $
  conversions: number
  updatedAt: string
}

export interface PerformanceSnapshot {
  fetchedAt: string
  ads: Array<{ id: string; facebookAdId: string; performance: AdPerformance }>
}

// ─── Rotation ─────────────────────────────────────────────────────────────────

export interface RotationLogEntry {
  runAt: string
  pausedAdIds: string[]
  newAdIds: string[]
  reason: string
}

// ─── API Responses ────────────────────────────────────────────────────────────

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: string
}

export interface ResearchResponse extends ApiResponse<ResearchInsights> {}
export interface GenerateResponse extends ApiResponse<AdVariation[]> {}
export interface PublishResponse extends ApiResponse<{ publishedCount: number; adIds: string[] }> {}
export interface AnalyticsResponse extends ApiResponse<PerformanceSnapshot> {}
export interface RotateResponse extends ApiResponse<{ pausedCount: number; newAdsCount: number }> {}

// ─── KV Store Keys ────────────────────────────────────────────────────────────

export const KV_KEYS = {
  INSIGHTS: 'fb-ads:insights',
  VARIATIONS: 'fb-ads:variations',
  ROTATION_LOG: 'fb-ads:rotation-log',
  PERFORMANCE: 'fb-ads:performance-snapshot',
} as const
