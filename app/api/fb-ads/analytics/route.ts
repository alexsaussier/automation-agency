import { NextResponse } from 'next/server'
import type { AnalyticsResponse } from '@/types/fb-ads'

/**
 * GET /api/fb-ads/analytics
 *
 * Fetches performance data for all active ads from the Facebook Insights API.
 * Metrics retrieved: impressions, clicks, ctr, cpc, spend, conversions.
 * Results are stored in Vercel KV and returned to the dashboard.
 *
 * Query params:
 *   ?dateRange=last_7d | last_14d | last_30d  (default: last_7d)
 *
 * Required env vars:
 *   FB_ACCESS_TOKEN, FB_AD_ACCOUNT_ID
 *
 * TODO: implement Facebook Insights API calls + KV caching
 */
export async function GET(): Promise<NextResponse<AnalyticsResponse>> {
  return NextResponse.json(
    { success: false, error: 'Not implemented yet' },
    { status: 501 }
  )
}
