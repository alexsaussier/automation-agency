import { NextResponse } from 'next/server'
import type { PublishResponse } from '@/types/fb-ads'

export interface PublishRequestBody {
  variationIds?: string[] // if empty, publish all draft variations
}

/**
 * POST /api/fb-ads/publish
 *
 * Pushes ad variations to the Facebook Marketing API as PAUSED drafts.
 *
 * For each variation:
 * - Creates an AdCreative with the composed image + copy
 * - Creates an Ad in the target ad set with status=PAUSED
 * - Saves the returned Facebook ad ID back to Vercel KV
 *
 * Required env vars:
 *   FB_ACCESS_TOKEN, FB_AD_ACCOUNT_ID, FB_AD_SET_ID, FB_PAGE_ID
 *
 * TODO: implement Facebook Marketing API calls
 */
export async function POST(): Promise<NextResponse<PublishResponse>> {
  return NextResponse.json(
    { success: false, error: 'Not implemented yet' },
    { status: 501 }
  )
}
