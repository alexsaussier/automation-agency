'use client'

import { useState } from 'react'
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'
import type { AdVariation, RotationLogEntry } from '@/types/fb-ads'

type SortKey = 'ctr' | 'cpc' | 'spend' | 'impressions' | 'clicks'
type DateRange = 'last_7d' | 'last_14d' | 'last_30d'

interface PerformanceDashboardProps {
  variations: AdVariation[]
  rotationLog: RotationLogEntry[]
  loading: boolean
  onRefreshAnalytics: (range: DateRange) => void
  onRunRotation: () => void
  rotating: boolean
}

const ANGLE_LABELS: Record<string, string> = {
  pain: 'Pain',
  benefit: 'Benefit',
  social_proof: 'Social Proof',
  question: 'Question',
  urgency: 'Urgency',
}

export default function PerformanceDashboard({
  variations,
  rotationLog,
  loading,
  onRefreshAnalytics,
  onRunRotation,
  rotating,
}: PerformanceDashboardProps) {
  const [sortKey, setSortKey] = useState<SortKey>('ctr')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [dateRange, setDateRange] = useState<DateRange>('last_7d')

  const activeAds = variations.filter((v) => v.status === 'active' && v.performance)

  const sorted = [...activeAds].sort((a, b) => {
    const aVal = a.performance![sortKey]
    const bVal = b.performance![sortKey]
    return sortDir === 'desc' ? bVal - aVal : aVal - bVal
  })

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDir((d) => (d === 'desc' ? 'asc' : 'desc'))
    } else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  // Aggregate chart data per angle
  const chartData = Object.entries(
    activeAds.reduce<Record<string, { spend: number; clicks: number; impressions: number; count: number }>>(
      (acc, ad) => {
        const key = ANGLE_LABELS[ad.angle] ?? ad.angle
        if (!acc[key]) acc[key] = { spend: 0, clicks: 0, impressions: 0, count: 0 }
        acc[key].spend += ad.performance!.spend
        acc[key].clicks += ad.performance!.clicks
        acc[key].impressions += ad.performance!.impressions
        acc[key].count++
        return acc
      },
      {}
    )
  ).map(([angle, data]) => ({
    angle,
    avgCTR: data.impressions > 0 ? +((data.clicks / data.impressions) * 100).toFixed(2) : 0,
    spend: +data.spend.toFixed(2),
    clicks: data.clicks,
  }))

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">Performance</h2>
          <p className="text-sm text-gray-500 mt-1">
            {activeAds.length > 0
              ? `${activeAds.length} active ads · Data from Facebook Insights`
              : 'No active ads yet — publish drafts to see performance'}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select
            value={dateRange}
            onChange={(e) => {
              const r = e.target.value as DateRange
              setDateRange(r)
              onRefreshAnalytics(r)
            }}
            className="text-sm border border-gray-200 rounded-lg px-3 py-2 text-gray-700 bg-white"
          >
            <option value="last_7d">Last 7 days</option>
            <option value="last_14d">Last 14 days</option>
            <option value="last_30d">Last 30 days</option>
          </select>
          <button
            onClick={() => onRefreshAnalytics(dateRange)}
            disabled={loading}
            className="px-3 py-2 border border-gray-200 text-sm text-gray-600 rounded-lg hover:bg-gray-50 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Refreshing…' : 'Refresh'}
          </button>
          <button
            onClick={onRunRotation}
            disabled={rotating || activeAds.length < 4}
            className="px-4 py-2 bg-[#4d65ff] text-white text-sm font-medium rounded-lg hover:bg-[#3d52e6] disabled:opacity-50 transition-colors"
            title={activeAds.length < 4 ? 'Need at least 4 active ads to rotate' : ''}
          >
            {rotating ? 'Rotating…' : 'Run Rotation'}
          </button>
        </div>
      </div>

      {activeAds.length === 0 && !loading && (
        <div className="flex flex-col items-center justify-center py-24 border-2 border-dashed border-gray-200 rounded-xl text-center">
          <div className="text-4xl mb-4">📊</div>
          <p className="text-gray-500 font-medium">No performance data yet</p>
          <p className="text-gray-400 text-sm mt-1">Publish ads and enable them in Meta Ads Manager to see results here</p>
        </div>
      )}

      {activeAds.length > 0 && (
        <>
          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'Total Spend',   value: `$${activeAds.reduce((s, a) => s + a.performance!.spend, 0).toFixed(0)}` },
              { label: 'Total Clicks',  value: activeAds.reduce((s, a) => s + a.performance!.clicks, 0).toLocaleString() },
              { label: 'Avg CTR',       value: `${(activeAds.reduce((s, a) => s + a.performance!.ctr, 0) / activeAds.length).toFixed(2)}%` },
              { label: 'Avg CPC',       value: `$${(activeAds.reduce((s, a) => s + a.performance!.cpc, 0) / activeAds.length).toFixed(2)}` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Avg CTR by Angle</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="angle" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} unit="%" />
                  <Tooltip formatter={(v) => [`${v}%`, 'CTR']} />
                  <Bar dataKey="avgCTR" fill="#4d65ff" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold text-gray-700 mb-4">Spend &amp; Clicks by Angle</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="angle" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Legend wrapperStyle={{ fontSize: 11 }} />
                  <Line type="monotone" dataKey="spend"  stroke="#4d65ff" name="Spend ($)" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="clicks" stroke="#10b981" name="Clicks"    strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sortable Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Ad</th>
                  <th className="text-left px-4 py-3 text-gray-600 font-medium">Angle</th>
                  {(['ctr', 'cpc', 'spend', 'impressions', 'clicks'] as SortKey[]).map((k) => (
                    <th
                      key={k}
                      className="text-right px-4 py-3 text-gray-600 font-medium cursor-pointer hover:text-gray-900 select-none uppercase text-xs tracking-wide"
                      onClick={() => handleSort(k)}
                    >
                      {k} {sortKey === k ? (sortDir === 'desc' ? '↓' : '↑') : ''}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {sorted.map((ad, i) => (
                  <tr key={ad.id} className={i < Math.ceil(sorted.length * 0.25) ? 'bg-green-50/40' : i >= Math.floor(sorted.length * 0.75) ? 'bg-red-50/40' : ''}>
                    <td className="px-4 py-3 text-gray-900 font-medium max-w-xs truncate">{ad.copy.headline}</td>
                    <td className="px-4 py-3 text-gray-500 capitalize">{ad.angle.replace('_', ' ')}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{ad.performance!.ctr.toFixed(2)}%</td>
                    <td className="px-4 py-3 text-right text-gray-700">${ad.performance!.cpc.toFixed(2)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">${ad.performance!.spend.toFixed(0)}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{ad.performance!.impressions.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-gray-700">{ad.performance!.clicks.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Rotation log */}
          {rotationLog.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-3 uppercase tracking-wide">Rotation History</h3>
              <div className="space-y-2">
                {rotationLog.slice(0, 5).map((entry, i) => (
                  <div key={i} className="flex items-center gap-4 text-sm bg-white border border-gray-200 rounded-lg px-4 py-3">
                    <span className="text-gray-400 w-28 shrink-0">{new Date(entry.runAt).toLocaleDateString()}</span>
                    <span className="text-gray-600">{entry.reason}</span>
                    <span className="ml-auto text-red-500">−{entry.pausedAdIds.length} paused</span>
                    <span className="text-green-600">+{entry.newAdIds.length} new</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
