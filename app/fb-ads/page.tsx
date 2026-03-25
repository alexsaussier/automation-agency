'use client'

import { useState, useCallback } from 'react'
import ResearchPanel from '@/components/fb-ads/ResearchPanel'
import AdVariationsGrid from '@/components/fb-ads/AdVariationsGrid'
import PerformanceDashboard from '@/components/fb-ads/PerformanceDashboard'
import type {
  ResearchInsights,
  AdVariation,
  RotationLogEntry,
} from '@/types/fb-ads'

type Tab = 'research' | 'generator' | 'performance'

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'research',    label: 'Research',    icon: '🔍' },
  { id: 'generator',  label: 'Generator',   icon: '✨' },
  { id: 'performance', label: 'Performance', icon: '📊' },
]

export default function FbAdsDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>('research')

  // Research state
  const [insights, setInsights] = useState<ResearchInsights | null>(null)
  const [researchLoading, setResearchLoading] = useState(false)

  // Generator state
  const [variations, setVariations] = useState<AdVariation[]>([])
  const [generateLoading, setGenerateLoading] = useState(false)
  const [publishing, setPublishing] = useState(false)

  // Performance state
  const [rotationLog, setRotationLog] = useState<RotationLogEntry[]>([])
  const [analyticsLoading, setAnalyticsLoading] = useState(false)
  const [rotating, setRotating] = useState(false)

  const handleRunResearch = useCallback(async () => {
    setResearchLoading(true)
    try {
      const res = await fetch('/api/fb-ads/research', { method: 'POST' })
      const data = await res.json()
      if (data.success) setInsights(data.data)
      else console.error('Research failed:', data.error)
    } catch (err) {
      console.error('Research error:', err)
    } finally {
      setResearchLoading(false)
    }
  }, [])

  const handleGenerate = useCallback(async () => {
    setGenerateLoading(true)
    try {
      const res = await fetch('/api/fb-ads/generate', { method: 'POST' })
      const data = await res.json()
      if (data.success) setVariations(data.data)
      else console.error('Generation failed:', data.error)
    } catch (err) {
      console.error('Generation error:', err)
    } finally {
      setGenerateLoading(false)
    }
  }, [])

  const handlePublish = useCallback(async (ids: string[]) => {
    setPublishing(true)
    try {
      const res = await fetch('/api/fb-ads/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variationIds: ids }),
      })
      const data = await res.json()
      if (data.success) {
        setVariations((prev) =>
          prev.map((v) =>
            ids.includes(v.id) ? { ...v, status: 'pending_publish' as const } : v
          )
        )
      } else {
        console.error('Publish failed:', data.error)
      }
    } catch (err) {
      console.error('Publish error:', err)
    } finally {
      setPublishing(false)
    }
  }, [])

  const handleRefreshAnalytics = useCallback(async (range: string) => {
    setAnalyticsLoading(true)
    try {
      const res = await fetch(`/api/fb-ads/analytics?dateRange=${range}`)
      const data = await res.json()
      if (data.success) {
        const snapshot = data.data
        setVariations((prev) =>
          prev.map((v) => {
            const entry = snapshot.ads.find((a: { id: string }) => a.id === v.id)
            return entry ? { ...v, performance: entry.performance } : v
          })
        )
      }
    } catch (err) {
      console.error('Analytics error:', err)
    } finally {
      setAnalyticsLoading(false)
    }
  }, [])

  const handleRunRotation = useCallback(async () => {
    setRotating(true)
    try {
      const res = await fetch('/api/fb-ads/rotate', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        // Refresh variations and rotation log
        const genRes = await fetch('/api/fb-ads/generate')
        const genData = await genRes.json()
        if (genData.success) setVariations(genData.data)
      } else {
        console.error('Rotation failed:', data.error)
      }
    } catch (err) {
      console.error('Rotation error:', err)
    } finally {
      setRotating(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a href="/" className="text-gray-400 hover:text-gray-600 transition-colors">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
              </a>
              <div className="w-px h-5 bg-gray-200" />
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#4d65ff] flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </div>
                <span className="font-semibold text-gray-900">BrightBots Ads</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <nav className="flex items-center gap-1">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{tab.icon}</span>
                  {tab.label}
                  {tab.id === 'generator' && variations.length > 0 && (
                    <span className="text-xs bg-[#4d65ff] text-white rounded-full px-1.5 py-0.5 leading-none">
                      {variations.length}
                    </span>
                  )}
                </button>
              ))}
            </nav>

            {/* Status indicator */}
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Live
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'research' && (
          <ResearchPanel
            insights={insights}
            loading={researchLoading}
            onRunResearch={handleRunResearch}
          />
        )}

        {activeTab === 'generator' && (
          <AdVariationsGrid
            variations={variations}
            loading={generateLoading}
            onGenerate={handleGenerate}
            onPublish={handlePublish}
            publishing={publishing}
          />
        )}

        {activeTab === 'performance' && (
          <PerformanceDashboard
            variations={variations}
            rotationLog={rotationLog}
            loading={analyticsLoading}
            onRefreshAnalytics={handleRefreshAnalytics}
            onRunRotation={handleRunRotation}
            rotating={rotating}
          />
        )}
      </main>
    </div>
  )
}
