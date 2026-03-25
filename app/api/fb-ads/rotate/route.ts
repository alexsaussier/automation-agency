import { NextResponse } from 'next/server'
import type { RotateResponse } from '@/types/fb-ads'

/**
 * POST /api/fb-ads/rotate
 *
 * Runs the weekly rotation cycle (can also be triggered manually from dashboard):
 * 1. Fetches latest performance data from Facebook Insights
 * 2. Ranks all active ads by CTR (primary metric)
 * 3. Pauses the bottom 25% on Facebook (status → PAUSED)
 * 4. Calls the generate endpoint with top performers as style reference
 * 5. Publishes the newly generated ads as PAUSED drafts
 * 6. Appends a RotationLogEntry to Vercel KV
 *
 * Also called by the Vercel Cron at /api/fb-ads/cron-rotate every Monday 09:00 UTC.
 *
 * TODO: implement rotation logic
 */
export async function POST(): Promise<NextResponse<RotateResponse>> {
  return NextResponse.json(
    { success: false, error: 'Not implemented yet' },
    { status: 501 }
  )
}
