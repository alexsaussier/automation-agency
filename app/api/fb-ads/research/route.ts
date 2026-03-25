import { NextResponse } from 'next/server'
import type { ResearchResponse } from '@/types/fb-ads'

/**
 * POST /api/fb-ads/research
 *
 * Uses Perplexity API to scan Reddit and YouTube for pain points
 * of SMB owners considering AI automation. Stores structured insights
 * in Vercel KV for use by the ad generator.
 *
 * TODO: implement Perplexity API call + KV storage
 */
export async function POST(): Promise<NextResponse<ResearchResponse>> {
  return NextResponse.json(
    { success: false, error: 'Not implemented yet' },
    { status: 501 }
  )
}

/**
 * GET /api/fb-ads/research
 *
 * Returns the latest cached research insights from Vercel KV.
 *
 * TODO: implement KV read
 */
export async function GET(): Promise<NextResponse<ResearchResponse>> {
  return NextResponse.json(
    { success: false, error: 'Not implemented yet' },
    { status: 501 }
  )
}
