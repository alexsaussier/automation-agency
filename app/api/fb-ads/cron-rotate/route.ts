import { NextRequest, NextResponse } from 'next/server'

/**
 * GET /api/fb-ads/cron-rotate
 *
 * Vercel Cron endpoint — runs every Monday at 09:00 UTC.
 * Validates the CRON_SECRET header then delegates to the rotate route logic.
 *
 * Configured in vercel.json:
 * {
 *   "crons": [{
 *     "path": "/api/fb-ads/cron-rotate",
 *     "schedule": "0 9 * * 1"
 *   }]
 * }
 *
 * Required env vars:
 *   CRON_SECRET — set in Vercel dashboard, auto-sent by Vercel Cron as
 *                 Authorization: Bearer <CRON_SECRET>
 *
 * TODO: implement delegation to rotate logic
 */
export async function GET(req: NextRequest): Promise<NextResponse> {
  const authHeader = req.headers.get('authorization')

  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // TODO: call rotate logic here
  return NextResponse.json(
    { success: false, error: 'Not implemented yet' },
    { status: 501 }
  )
}
