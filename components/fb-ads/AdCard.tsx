'use client'

import Image from 'next/image'
import type { AdVariation } from '@/types/fb-ads'

const ANGLE_LABELS: Record<AdVariation['angle'], { label: string; color: string }> = {
  pain:         { label: 'Pain Point',    color: 'bg-red-100 text-red-700' },
  benefit:      { label: 'Benefit',       color: 'bg-green-100 text-green-700' },
  social_proof: { label: 'Social Proof',  color: 'bg-purple-100 text-purple-700' },
  question:     { label: 'Question Hook', color: 'bg-yellow-100 text-yellow-700' },
  urgency:      { label: 'Urgency',       color: 'bg-orange-100 text-orange-700' },
}

const STATUS_BADGES: Record<AdVariation['status'], { label: string; color: string }> = {
  draft:           { label: 'Draft',            color: 'bg-gray-100 text-gray-500' },
  pending_publish: { label: 'Publishing…',      color: 'bg-blue-100 text-blue-600' },
  active:          { label: 'Active',           color: 'bg-green-100 text-green-700' },
  paused:          { label: 'Paused',           color: 'bg-yellow-100 text-yellow-700' },
  deleted:         { label: 'Removed',          color: 'bg-red-100 text-red-500' },
}

interface AdCardProps {
  ad: AdVariation
  selected: boolean
  onToggleSelect: (id: string) => void
}

export default function AdCard({ ad, selected, onToggleSelect }: AdCardProps) {
  const angle = ANGLE_LABELS[ad.angle]
  const status = STATUS_BADGES[ad.status]

  return (
    <div
      className={`relative border rounded-xl overflow-hidden bg-white transition-all cursor-pointer ${
        selected ? 'border-[#4d65ff] ring-2 ring-[#4d65ff]/20' : 'border-gray-200 hover:border-gray-300'
      }`}
      onClick={() => onToggleSelect(ad.id)}
    >
      {/* Selection checkbox */}
      <div className="absolute top-2 left-2 z-10">
        <div
          className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
            selected ? 'bg-[#4d65ff] border-[#4d65ff]' : 'bg-white border-gray-300'
          }`}
        >
          {selected && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>
      </div>

      {/* Ad Image Preview */}
      <div className="aspect-square bg-gray-100 relative">
        {ad.image.squareUrl ? (
          <Image
            src={ad.image.squareUrl}
            alt={ad.copy.headline}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 gap-2">
            <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18M3.75 3h16.5A.75.75 0 0121 3.75v13.5a.75.75 0 01-.75.75H3.75a.75.75 0 01-.75-.75V3.75A.75.75 0 013.75 3z" />
            </svg>
            <span className="text-xs">No image yet</span>
          </div>
        )}
      </div>

      {/* Copy */}
      <div className="p-3 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${angle.color}`}>
            {angle.label}
          </span>
          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${status.color}`}>
            {status.label}
          </span>
        </div>

        <p className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {ad.copy.headline}
        </p>
        <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
          {ad.copy.primaryText}
        </p>

        {/* Performance preview (if available) */}
        {ad.performance && (
          <div className="pt-2 border-t border-gray-100 grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-xs font-semibold text-gray-800">{ad.performance.ctr.toFixed(2)}%</p>
              <p className="text-xs text-gray-400">CTR</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">${ad.performance.cpc.toFixed(2)}</p>
              <p className="text-xs text-gray-400">CPC</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-800">${ad.performance.spend.toFixed(0)}</p>
              <p className="text-xs text-gray-400">Spend</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
