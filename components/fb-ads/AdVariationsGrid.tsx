'use client'

import { useState } from 'react'
import AdCard from './AdCard'
import type { AdVariation, AdAngle } from '@/types/fb-ads'

const ANGLES: { value: AdAngle | 'all'; label: string }[] = [
  { value: 'all',          label: 'All' },
  { value: 'pain',         label: 'Pain Point' },
  { value: 'benefit',      label: 'Benefit' },
  { value: 'social_proof', label: 'Social Proof' },
  { value: 'question',     label: 'Question Hook' },
  { value: 'urgency',      label: 'Urgency' },
]

interface AdVariationsGridProps {
  variations: AdVariation[]
  loading: boolean
  onGenerate: () => void
  onPublish: (ids: string[]) => void
  publishing: boolean
}

export default function AdVariationsGrid({
  variations,
  loading,
  onGenerate,
  onPublish,
  publishing,
}: AdVariationsGridProps) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set())
  const [angleFilter, setAngleFilter] = useState<AdAngle | 'all'>('all')

  const filtered = angleFilter === 'all'
    ? variations
    : variations.filter((v) => v.angle === angleFilter)

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const toggleSelectAll = () => {
    if (selectedIds.size === filtered.length) {
      setSelectedIds(new Set())
    } else {
      setSelectedIds(new Set(filtered.map((v) => v.id)))
    }
  }

  const drafts = variations.filter((v) => v.status === 'draft')

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Ad Variations</h2>
          <p className="text-sm text-gray-500 mt-1">
            {variations.length > 0
              ? `${variations.length} variations · ${drafts.length} unpublished`
              : 'Generate 25 ad creatives based on your research insights'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {selectedIds.size > 0 && (
            <button
              onClick={() => onPublish(Array.from(selectedIds))}
              disabled={publishing}
              className="px-4 py-2 bg-[#4d65ff] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e6] disabled:opacity-50 transition-colors"
            >
              {publishing ? 'Publishing…' : `Publish ${selectedIds.size} selected`}
            </button>
          )}
          {drafts.length > 0 && selectedIds.size === 0 && (
            <button
              onClick={() => onPublish(drafts.map((v) => v.id))}
              disabled={publishing}
              className="px-4 py-2 border border-[#4d65ff] text-[#4d65ff] text-sm font-medium rounded-lg hover:bg-blue-50 disabled:opacity-50 transition-colors"
            >
              {publishing ? 'Publishing…' : 'Publish All Drafts'}
            </button>
          )}
          <button
            onClick={onGenerate}
            disabled={loading}
            className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Generating…' : variations.length > 0 ? 'Regenerate' : 'Generate Ads'}
          </button>
        </div>
      </div>

      {/* Angle Filter */}
      {variations.length > 0 && (
        <div className="flex items-center gap-2 flex-wrap">
          {ANGLES.map((a) => (
            <button
              key={a.value}
              onClick={() => setAngleFilter(a.value)}
              className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                angleFilter === a.value
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {a.label}
              {a.value !== 'all' && (
                <span className="ml-1.5 text-xs opacity-60">
                  {variations.filter((v) => v.angle === a.value).length}
                </span>
              )}
            </button>
          ))}
          {filtered.length > 0 && (
            <button
              onClick={toggleSelectAll}
              className="ml-auto text-sm text-gray-400 hover:text-gray-600 transition-colors"
            >
              {selectedIds.size === filtered.length ? 'Deselect all' : 'Select all'}
            </button>
          )}
        </div>
      )}

      {/* Loading skeleton */}
      {loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {Array.from({ length: 25 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-gray-200 overflow-hidden animate-pulse">
              <div className="aspect-square bg-gray-100" />
              <div className="p-3 space-y-2">
                <div className="h-3 bg-gray-100 rounded w-1/2" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-3 bg-gray-100 rounded w-3/4" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && variations.length === 0 && (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <div className="text-4xl mb-4">✨</div>
          <p className="text-gray-500 font-medium">No ad variations yet</p>
          <p className="text-gray-400 text-sm mt-1">Run research first, then click "Generate Ads"</p>
        </div>
      )}

      {/* Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((ad) => (
            <AdCard
              key={ad.id}
              ad={ad}
              selected={selectedIds.has(ad.id)}
              onToggleSelect={toggleSelect}
            />
          ))}
        </div>
      )}
    </div>
  )
}
