'use client'

import type { ResearchInsights } from '@/types/fb-ads'

interface ResearchPanelProps {
  insights: ResearchInsights | null
  loading: boolean
  onRunResearch: () => void
}

export default function ResearchPanel({ insights, loading, onRunResearch }: ResearchPanelProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Audience Research</h2>
          <p className="text-sm text-gray-500 mt-1">
            Perplexity scans Reddit &amp; YouTube to surface real pain points from your target audience.
          </p>
        </div>
        <button
          onClick={onRunResearch}
          disabled={loading}
          className="px-4 py-2 bg-[#4d65ff] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e6] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Researching…' : insights ? 'Re-run Research' : 'Run Research'}
        </button>
      </div>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-36 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!loading && !insights && (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <div className="text-4xl mb-4">🔍</div>
          <p className="text-gray-500 font-medium">No research yet</p>
          <p className="text-gray-400 text-sm mt-1">Click "Run Research" to discover your audience's pain points</p>
        </div>
      )}

      {!loading && insights && (
        <>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span>Last updated: {new Date(insights.fetchedAt).toLocaleDateString()}</span>
            <span>·</span>
            <span>{insights.painPoints.length} pain points found</span>
          </div>

          {/* Top Themes */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Top Themes</h3>
            <div className="flex flex-wrap gap-2">
              {insights.topThemes.map((theme) => (
                <span key={theme} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-full font-medium">
                  {theme}
                </span>
              ))}
            </div>
          </div>

          {/* Common Language */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">Language They Use</h3>
            <div className="flex flex-wrap gap-2">
              {insights.commonLanguage.map((phrase) => (
                <span key={phrase} className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                  "{phrase}"
                </span>
              ))}
            </div>
          </div>

          {/* Pain Point Cards */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Pain Points</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {insights.painPoints.map((point) => (
                <div key={point.id} className="p-4 border border-gray-200 rounded-xl bg-white space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{point.title}</h4>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-xs text-gray-400">Intensity</span>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: point.emotionalScore >= 7 ? '#fee2e2' : point.emotionalScore >= 4 ? '#fef3c7' : '#dcfce7',
                          color: point.emotionalScore >= 7 ? '#dc2626' : point.emotionalScore >= 4 ? '#d97706' : '#16a34a',
                        }}
                      >
                        {point.emotionalScore}/10
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-xs leading-relaxed">{point.description}</p>
                  {point.exampleQuotes.length > 0 && (
                    <blockquote className="border-l-2 border-blue-300 pl-3 text-xs text-gray-500 italic">
                      "{point.exampleQuotes[0]}"
                    </blockquote>
                  )}
                  <span className="inline-block text-xs text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                    {point.sourceType === 'both' ? 'Reddit + YouTube' : point.sourceType === 'reddit' ? 'Reddit' : 'YouTube'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
