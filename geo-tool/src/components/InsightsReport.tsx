import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BarChart3, TrendingUp, TrendingDown, Download, RefreshCw, ArrowUp, ArrowDown, ThumbsUp, ThumbsDown, Plus, X } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area, AreaChart, Line, LineChart } from 'recharts'

interface InsightsReportProps {
  startLoading: (message: string) => void
  stopLoading: () => void
  onAddToHistory: (description: string) => void
  prefilledContent?: string
  prefilledPrompts?: string[]
  onClearData?: () => void
}

interface BrandRanking {
  rank: number
  name: string
  score: number
  change: number
  icon: string
  totalMentions?: number
}

interface PromptAnalysis {
  prompt: string
  appearances: number
}

const InsightsReport = ({ startLoading, stopLoading, onAddToHistory, prefilledContent, prefilledPrompts, onClearData }: InsightsReportProps) => {
  const navigate = useNavigate()
  const [industry, setIndustry] = useState('')
  const [prompts, setPrompts] = useState<string[]>((prefilledPrompts && prefilledPrompts.length > 0) ? prefilledPrompts : [''])
  const [content, setContent] = useState(prefilledContent || '')
  const [websiteLink, setWebsiteLink] = useState('')
  const [businessName, setBusinessName] = useState('Your Brand')
  const [dashboardData, setDashboardData] = useState<any>(null)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const [isDashboardExpanded, setIsDashboardExpanded] = useState(false)
  const resultsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (industry && dashboardData) {
      navigate('/tool?tool=insights-report&state=output', { replace: true })
    } else if (industry) {
      navigate('/tool?tool=insights-report&state=input', { replace: true })
    } else {
      navigate('/tool?tool=insights-report', { replace: true })
    }
  }, [industry, dashboardData, navigate])

  const industries = [
    'Technology',
    'Healthcare',
    'Finance',
    'E-commerce',
    'Education',
    'Real Estate',
    'Manufacturing',
    'Marketing & Advertising',
    'Food & Beverage',
    'Travel & Hospitality',
    'Other'
  ]

  const addPrompt = () => {
    if (prompts.length < 5) {
      setPrompts([...prompts, ''])
    }
  }

  const removePrompt = (index: number) => {
    if (prompts.length > 1) {
      setPrompts(prompts.filter((_, i) => i !== index))
    }
  }

  const updatePrompt = (index: number, value: string) => {
    const newPrompts = [...prompts]
    newPrompts[index] = value
    setPrompts(newPrompts)
  }

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const validPrompts = prompts.filter(p => p.trim())
    if (!industry.trim() || validPrompts.length === 0 || !websiteLink.trim()) return

    startLoading('Generating Insights Dashboard')

    // Extract business name from website link (domain name)
    let extractedBusinessName = 'Your Brand'
    try {
      const url = new URL(websiteLink.startsWith('http') ? websiteLink : `https://${websiteLink}`)
      const hostname = url.hostname.replace('www.', '')
      extractedBusinessName = hostname.split('.')[0].charAt(0).toUpperCase() + hostname.split('.')[0].slice(1)
    } catch (e) {
      // Use a portion of the input as business name if URL parsing fails
      extractedBusinessName = websiteLink.split('.')[0].charAt(0).toUpperCase() + websiteLink.split('.')[0].slice(1)
    }

    // Update the business name state
    setBusinessName(extractedBusinessName)

    // Simulate API call with mock dashboard data
    setTimeout(() => {
      const keywordList = validPrompts

      const userScore = Math.floor(Math.random() * 10) + 85
      const competitorScores = [94, 87, 82, 78, 76].map(s => s + Math.floor(Math.random() * 5) - 2)
      const userRank = competitorScores.filter(s => s > userScore).length + 1

      const mockData = {
        visibilityScore: userScore,
        scoreChange: Math.random() > 0.5 ? Math.floor(Math.random() * 5) + 1 : -Math.floor(Math.random() * 3) - 1,
        totalMentions: Math.floor(Math.random() * 500) + 200,
        avgRanking: userRank,

        // Overview insights
        overviewInsights: [
          `Mandy's Home Store ranks #2 in the Home & Living Appliances industry for AI visibility`,
          `Your brand appears in ${Math.floor(Math.random() * 30) + 60}% of relevant AI search results`,
          `Primary competitors: Courts (${competitorScores[0]}%), Gain City (${competitorScores[1]}%)`,
          `Strongest presence on ChatGPT and Perplexity platforms`
        ],

        // Closest competitor
        closestCompetitor: {
          name: 'Courts',
          score: competitorScores[0],
          difference: Math.abs(competitorScores[0] - userScore),
          icon: '🏆'
        },

        // Brand industry rankings
        brandRankings: [
          { rank: 1, name: 'Courts', score: competitorScores[0], totalMentions: Math.floor(Math.random() * 300) + 400, change: 2, icon: '🏆' },
          { rank: 2, name: "Mandy's Home Store", score: userScore, totalMentions: Math.floor(Math.random() * 300) + 350, change: userRank === 2 ? (Math.random() > 0.5 ? 1 : -1) : -1, icon: '💼' },
          { rank: 3, name: 'Gain City', score: competitorScores[1], totalMentions: Math.floor(Math.random() * 300) + 300, change: 3, icon: '🏢' },
          { rank: 4, name: 'Best Denki', score: competitorScores[2], totalMentions: Math.floor(Math.random() * 300) + 250, change: -2, icon: '🚀' },
          { rank: 5, name: 'Harvey Norman', score: competitorScores[3], totalMentions: Math.floor(Math.random() * 300) + 200, change: 1, icon: '📊' }
        ],

        // Platform breakdown
        platformData: [
          { name: 'ChatGPT', value: Math.floor(Math.random() * 30) + 30, color: '#10b981' },
          { name: 'Claude', value: Math.floor(Math.random() * 25) + 20, color: '#8b5cf6' },
          { name: 'Perplexity', value: Math.floor(Math.random() * 20) + 15, color: '#f59e0b' },
          { name: 'Gemini', value: Math.floor(Math.random() * 15) + 10, color: '#3b82f6' },
          { name: 'Others', value: Math.floor(Math.random() * 10) + 5, color: '#6b7280' }
        ],

        // Prompts analysis data for bar chart
        promptsAnalysis: [
          { prompt: 'Best online store for home appliances in Singapore', appearances: Math.floor(Math.random() * 100) + 350 },
          { prompt: 'Smart home gadgets for HDB flats', appearances: Math.floor(Math.random() * 100) + 280 },
          { prompt: 'Where to buy quality kitchen appliances Singapore', appearances: Math.floor(Math.random() * 100) + 220 },
          { prompt: 'Festive deals on cooking appliances', appearances: Math.floor(Math.random() * 100) + 180 },
          { prompt: 'Energy-efficient home appliances with warranty', appearances: Math.floor(Math.random() * 100) + 150 }
        ],

        // Visibility trend data - expanded to 12 months
        visibilityTrend: [
          { month: 'Jan', yourBrand: 65, competitor: 82 },
          { month: 'Feb', yourBrand: 68, competitor: 85 },
          { month: 'Mar', yourBrand: 72, competitor: 84 },
          { month: 'Apr', yourBrand: 70, competitor: 86 },
          { month: 'May', yourBrand: 75, competitor: 88 },
          { month: 'Jun', yourBrand: 78, competitor: 90 },
          { month: 'Jul', yourBrand: 82, competitor: 89 },
          { month: 'Aug', yourBrand: 80, competitor: 91 },
          { month: 'Sep', yourBrand: 85, competitor: 92 },
          { month: 'Oct', yourBrand: 87, competitor: 93 },
          { month: 'Nov', yourBrand: 89, competitor: 94 },
          { month: 'Dec', yourBrand: userScore, competitor: competitorScores[0] }
        ]
      }

      setDashboardData(mockData)
      stopLoading()

      // Add to history
      onAddToHistory(`${extractedBusinessName} - ${industry}`)

      // Auto-scroll to results after generation
      setTimeout(scrollToResults, 100)
    }, 3000)
  }

  const handleRegenerate = () => {
    handleSubmit(new Event('submit') as any)
  }

  const handleDownload = () => {
    if (!dashboardData) return

    let reportContent = `GEO INSIGHTS DASHBOARD REPORT
=====================================
Business: ${businessName}
Industry: ${industry}
Generated: ${new Date().toLocaleDateString()}

OVERVIEW:
---------
Visibility Score: ${dashboardData.visibilityScore}%
Score Change: ${dashboardData.scoreChange > 0 ? '+' : ''}${dashboardData.scoreChange}%
Total Mentions: ${dashboardData.totalMentions}
Average Ranking: #${dashboardData.avgRanking}

BRAND INDUSTRY RANKING:
-----------------------
${dashboardData.brandRankings.map((brand: BrandRanking) =>
  `${brand.rank}. ${brand.name} - ${brand.score}% (${brand.change > 0 ? '+' : ''}${brand.change}%)`
).join('\n')}

PLATFORM BREAKDOWN:
-------------------
${dashboardData.platformData.map((platform: any) =>
  `${platform.name}: ${platform.value} appearances`
).join('\n')}

TOP PERFORMING PROMPTS:
-----------------------
${dashboardData.promptsAnalysis.map((prompt: PromptAnalysis, i: number) =>
  `${i + 1}. "${prompt.prompt}" - ${prompt.appearances} appearances`
).join('\n')}

Generated by GEO (Generative Engine Optimizer)
`

    const blob = new Blob([reportContent], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `GEO-Dashboard-${businessName}-${new Date().toISOString().split('T')[0]}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="tool-layout">
      <div className="tool-header">
        <div className="tool-header-title">
          <BarChart3 size={32} color="#1a1a1a" />
          <h1 style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
            Insights Report
          </h1>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
          Analyze your brand's AI visibility and performance. Get comprehensive insights
          about your presence across AI platforms.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '1.1rem', marginBottom: '12px' }}>
              Industry *
            </label>
            <div style={{ position: 'relative' }}>
              <select
                className="form-input"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                required
                style={{
                  fontFamily: 'Inter, sans-serif',
                  width: '100%',
                  padding: '14px 40px 14px 18px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  backgroundColor: 'white',
                  color: industry ? '#1a1a1a' : '#9ca3af',
                  appearance: 'none',
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  transition: 'all 0.2s ease',
                  outline: 'none',
                  fontWeight: industry ? '500' : '400'
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = '#1a1a1a'
                  e.currentTarget.style.boxShadow = '0 0 0 3px rgba(26, 26, 26, 0.1)'
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = '#e5e7eb'
                  e.currentTarget.style.boxShadow = 'none'
                }}
                onMouseOver={(e) => {
                  if (e.currentTarget !== document.activeElement) {
                    e.currentTarget.style.borderColor = '#d1d5db'
                  }
                }}
                onMouseOut={(e) => {
                  if (e.currentTarget !== document.activeElement) {
                    e.currentTarget.style.borderColor = '#e5e7eb'
                  }
                }}
              >
                <option value="" disabled style={{ color: '#9ca3af' }}>Select an industry</option>
                {industries.map((ind) => (
                  <option key={ind} value={ind} style={{ color: '#1a1a1a', padding: '10px' }}>{ind}</option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div style={{
                position: 'absolute',
                right: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                display: 'flex',
                alignItems: 'center'
              }}>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ opacity: 0.6 }}
                >
                  <path
                    d="M4 6L8 10L12 6"
                    stroke="#1a1a1a"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              Target Prompts (Max 5) *
            </label>
            <div className="prompt-list">
              {prompts.map((prompt, index) => (
                <div key={index} className="prompt-item">
                  <span style={{ fontWeight: '600', color: 'var(--black)', minWidth: '20px', fontFamily: 'Inter, sans-serif' }}>
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={prompt}
                    onChange={(e) => updatePrompt(index, e.target.value)}
                    placeholder={`Enter prompt ${index + 1} (e.g., "Best AI tools for small businesses")`}
                    required={index === 0}
                    style={{ fontFamily: 'Inter, sans-serif' }}
                  />
                  {prompts.length > 1 && (
                    <button
                      type="button"
                      className="remove-prompt"
                      onClick={() => removePrompt(index)}
                    >
                      <X size={12} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {prompts.length < 5 && (
              <button
                type="button"
                className="add-prompt"
                onClick={addPrompt}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <span style={{ fontSize: '1.2rem', fontWeight: '300' }}>+</span>
                Add Prompt
              </button>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              Content to Analyze
            </label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your content here for detailed analysis. This could be website copy, product descriptions, blog posts, or any text you want to analyze for AI visibility."
              rows={6}
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              Website Link *
            </label>
            <input
              type="text"
              className="form-input"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              placeholder="Enter your website URL (e.g., example.com or https://example.com)"
              required
              style={{
                fontFamily: 'Inter, sans-serif',
                width: '100%',
                padding: '12px 16px',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '1rem'
              }}
            />
          </div>

          <button
            type="submit"
            className="btn-pill"
            disabled={!industry.trim() || prompts.filter(p => p.trim()).length === 0 || !websiteLink.trim()}
          >
            <div className="btn-pill-icon">
              <BarChart3 size={16} />
            </div>
            Generate Dashboard
          </button>
        </form>
      </div>

      {dashboardData && (
        <div className="dashboard-container" ref={resultsRef} style={{
          marginTop: '48px',
          borderRadius: '12px',
          position: 'relative',
          padding: '32px',
          background: 'white',
          border: '1px solid #e5e7eb'
        }}>
          {/* Header with Actions */}
          <div style={{ marginBottom: '32px' }}>
            {/* Row 1: Section Title (Center) */}
            <div style={{ textAlign: 'center', marginBottom: '4px' }}>
              <h2 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '1.8rem',
                fontWeight: '600',
                color: '#1a1a1a',
                margin: 0
              }}>
                Brand Visibility Dashboard
              </h2>
              <p style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.9rem',
                color: '#6b7280',
                margin: '4px 0 16px 0'
              }}>
                AI visibility analysis for {businessName} in {industry}
              </p>
            </div>
            {/* Row 2: Feedback (Left) + Action Buttons (Right) */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', color: '#666' }}>
                  How did we do?
                </span>
                <button
                  onClick={() => setFeedback(feedback === 'up' ? null : 'up')}
                  style={{
                    padding: '8px 12px',
                    border: feedback === 'up' ? '2px solid #10b981' : '2px solid #e0e0e0',
                    backgroundColor: feedback === 'up' ? '#10b981' : 'white',
                    color: feedback === 'up' ? 'white' : '#1a1a1a',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ThumbsUp size={16} />
                </button>
                <button
                  onClick={() => setFeedback(feedback === 'down' ? null : 'down')}
                  style={{
                    padding: '8px 12px',
                    border: feedback === 'down' ? '2px solid #ef4444' : '2px solid #e0e0e0',
                    backgroundColor: feedback === 'down' ? '#ef4444' : 'white',
                    color: feedback === 'down' ? 'white' : '#1a1a1a',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <ThumbsDown size={16} />
                </button>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button
                  onClick={handleDownload}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: '#f9fafb',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#f9fafb'}
                >
                  <Download size={16} />
                  Export
                </button>
                <button
                  onClick={handleRegenerate}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 20px',
                    background: '#1a1a1a',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = '#2a2a2a'}
                  onMouseOut={(e) => e.currentTarget.style.background = '#1a1a1a'}
                >
                  <RefreshCw size={16} />
                  Refresh
                </button>
              </div>
            </div>
          </div>

          {/* Row 1: Top Performing Prompts Bar Chart */}
          <div style={{
            borderRadius: '12px',
            padding: '24px',
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '3px dashed #d1d5db'
          }}>
            <h3 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#6b7280',
              margin: '0 0 20px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Top Performing Prompts
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {dashboardData.promptsAnalysis.map((item: PromptAnalysis, index: number) => {
                  const maxValue = Math.max(...dashboardData.promptsAnalysis.map((p: PromptAnalysis) => p.appearances))
                  const percentage = (item.appearances / maxValue) * 100
                  return (
                    <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        flex: '0 0 320px',
                        fontSize: '0.9rem',
                        color: '#4b5563',
                        fontFamily: 'Inter, sans-serif',
                        lineHeight: '1.4'
                      }}>
                        {item.prompt}
                      </div>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <div style={{
                          height: '28px',
                          width: `${percentage}%`,
                          background: '#4a4a4a',
                          borderRadius: '0 4px 4px 0',
                          transition: 'width 0.3s ease'
                        }} />
                        <div style={{
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          fontFamily: 'Inter, sans-serif',
                          minWidth: '40px'
                        }}>
                          {item.appearances}
                        </div>
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>

          {/* Row 2: Three Metric Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '3px dashed #d1d5db'
          }}>
            {/* Brand Ranking */}
            <div style={{
              borderRadius: '12px',
              padding: '16px 20px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '120px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: '#6b7280',
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}>
                Brand Ranking
              </div>
              <div style={{
                fontSize: '3rem',
                fontWeight: '700',
                color: '#1a1a1a',
                fontFamily: 'Inter, sans-serif',
                lineHeight: 1
              }}>
                #{dashboardData.avgRanking}
              </div>
              <div style={{
                fontSize: '0.75rem',
                color: dashboardData.scoreChange > 0 ? '#10b981' : '#ef4444',
                marginTop: '12px',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '4px',
                fontWeight: '500'
              }}>
                {dashboardData.scoreChange > 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {Math.abs(dashboardData.scoreChange)}% vs last week
              </div>
            </div>

            {/* Brand Visibility Speedometer */}
            <div style={{
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              minHeight: '120px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: '#6b7280',
                marginBottom: '16px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}>
                Visibility Score
              </div>
              <div style={{
                position: 'relative',
                width: '120px',
                height: '60px',
                marginBottom: '8px'
              }}>
                <svg width="120" height="60" viewBox="0 0 120 60" style={{ overflow: 'visible' }}>
                  {/* Background arc */}
                  <path
                    d="M 10 60 A 50 50 0 0 1 110 60"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    strokeLinecap="round"
                  />
                  {/* Progress arc */}
                  <path
                    d="M 10 60 A 50 50 0 0 1 110 60"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={`${(dashboardData.visibilityScore / 100) * 157} 157`}
                  />
                </svg>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -20%)',
                  fontSize: '1.6rem',
                  fontWeight: '700',
                  color: '#1a1a1a',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {dashboardData.visibilityScore}%
                </div>
              </div>
              <div style={{
                fontSize: '0.65rem',
                color: '#9ca3af',
                fontFamily: 'Inter, sans-serif',
                display: 'flex',
                justifyContent: 'space-between',
                width: '120px',
                paddingLeft: '10px',
                paddingRight: '10px'
              }}>
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>

            {/* Closest Competitor */}
            <div style={{
              borderRadius: '12px',
              padding: '16px 20px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              minHeight: '120px',
              border: '1px solid #e5e7eb'
            }}>
              <div style={{
                fontSize: '0.7rem',
                color: '#6b7280',
                marginBottom: '12px',
                fontFamily: 'Inter, sans-serif',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                fontWeight: '600'
              }}>
                Closest Competitor
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '10px'
              }}>
                <div style={{ fontSize: '1.6rem' }}>{dashboardData.closestCompetitor.icon}</div>
                <div>
                  <div style={{
                    fontSize: '1rem',
                    fontWeight: '600',
                    color: '#1a1a1a',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {dashboardData.closestCompetitor.name}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#6b7280',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {dashboardData.closestCompetitor.score}% visibility
                  </div>
                </div>
              </div>
              <div style={{
                padding: '8px',
                background: '#fef3f2',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontFamily: 'Inter, sans-serif',
                color: '#991b1b',
                fontWeight: '500'
              }}>
                Gap: <strong>{dashboardData.closestCompetitor.difference}%</strong> behind
              </div>
            </div>
          </div>

          <div style={{ position: 'relative' }}>
          {/* Row 2.5: Visibility Trend Chart */}
          <div style={{
            borderRadius: '12px',
            padding: '32px',
            marginBottom: '32px',
            background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
            border: '1px solid #e5e7eb',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <h3 style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  color: '#1a1a1a',
                  margin: '0 0 4px 0'
                }}>
                  Visibility Trend Analysis
                </h3>
                <p style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.85rem',
                  color: '#6b7280',
                  margin: 0
                }}>
                  Track your brand's AI visibility performance over time
                </p>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 12px',
                background: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#10b981'
                }}></div>
                <span style={{ fontSize: '0.75rem', color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>
                  Last 12 months
                </span>
              </div>
            </div>
            <ResponsiveContainer width="100%" height={350}>
              <AreaChart data={dashboardData.visibilityTrend} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorYourBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.35}/>
                    <stop offset="40%" stopColor="#60a5fa" stopOpacity={0.2}/>
                    <stop offset="100%" stopColor="#93c5fd" stopOpacity={0.05}/>
                  </linearGradient>
                  <linearGradient id="colorCompetitor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6b7280" stopOpacity={0.15}/>
                    <stop offset="50%" stopColor="#9ca3af" stopOpacity={0.08}/>
                    <stop offset="100%" stopColor="#d1d5db" stopOpacity={0.02}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis
                  dataKey="month"
                  stroke="#9ca3af"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                />
                <YAxis
                  stroke="#9ca3af"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  tickLine={false}
                  axisLine={{ stroke: '#e5e7eb' }}
                  domain={[50, 100]}
                  style={{ fontFamily: 'Inter, sans-serif' }}
                  label={{ value: 'Visibility Score (%)', angle: -90, position: 'insideLeft', style: { fill: '#6b7280', fontSize: 12, fontFamily: 'Inter, sans-serif' } }}
                />
                <Tooltip
                  contentStyle={{
                    background: 'rgba(255, 255, 255, 0.95)',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.85rem',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  labelStyle={{ fontWeight: '600', color: '#1a1a1a', marginBottom: '4px' }}
                />
                <Legend
                  wrapperStyle={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.85rem',
                    paddingTop: '20px'
                  }}
                  iconType="line"
                />
                <Area
                  type="monotone"
                  dataKey="yourBrand"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  fill="url(#colorYourBrand)"
                  name="Your Brand"
                  dot={false}
                  activeDot={false}
                />
                <Area
                  type="monotone"
                  dataKey="competitor"
                  stroke="#6b7280"
                  strokeWidth={3}
                  fill="url(#colorCompetitor)"
                  name="Top Competitor"
                  dot={false}
                  activeDot={false}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Dashed divider after visibility chart */}
          <div style={{
            borderBottom: '3px dashed #d1d5db',
            marginBottom: '32px'
          }}></div>

          {/* Row 3: Leaderboard and Pie Chart */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            marginBottom: '32px',
            paddingBottom: '32px',
            borderBottom: '3px dashed #d1d5db'
          }}>
            {/* Brand Industry Leaderboard */}
            <div style={{
              borderRadius: '12px',
              padding: '24px',
              borderRight: '3px dashed #d1d5db',
              paddingRight: '32px',
              marginRight: '-10px'
            }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#6b7280',
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Brand Industry Leaderboard
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                  {dashboardData.brandRankings.map((brand: BrandRanking, index: number) => (
                    <div
                      key={brand.rank}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '16px 12px',
                        borderBottom: index < dashboardData.brandRankings.length - 1 ? '1px solid #e5e7eb' : 'none',
                        transition: 'all 0.2s ease',
                        backgroundColor: brand.name === "Mandy's Home Store" ? '#f3f4f6' : 'transparent',
                        borderRadius: brand.name === "Mandy's Home Store" ? '8px' : '0',
                        marginLeft: brand.name === "Mandy's Home Store" ? '-12px' : '0',
                        marginRight: brand.name === "Mandy's Home Store" ? '-12px' : '0'
                      }}
                    >
                      <div style={{
                        fontSize: '1.1rem',
                        fontWeight: '700',
                        color: brand.rank === 1 ? '#f59e0b' : brand.rank === 2 ? '#9ca3af' : brand.rank === 3 ? '#cd7f32' : '#6b7280',
                        minWidth: '28px',
                        fontFamily: 'Inter, sans-serif'
                      }}>
                        {brand.rank}
                      </div>
                      <div style={{ fontSize: '1.3rem' }}>{brand.icon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: '0.95rem',
                          fontWeight: '600',
                          color: '#1a1a1a',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {brand.name}
                        </div>
                        <div style={{
                          fontSize: '0.75rem',
                          color: '#6b7280',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {brand.totalMentions} mentions
                        </div>
                      </div>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '0.75rem',
                          color: brand.change > 0 ? '#10b981' : '#ef4444',
                          fontFamily: 'Inter, sans-serif',
                          fontWeight: '500'
                        }}>
                          {brand.change > 0 ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                          {Math.abs(brand.change)}%
                        </div>
                        <div style={{
                          fontSize: '1.1rem',
                          fontWeight: '700',
                          color: '#1a1a1a',
                          fontFamily: 'Inter, sans-serif',
                          minWidth: '55px',
                          textAlign: 'right'
                        }}>
                          {brand.score}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
            </div>

            {/* Platform Distribution Pie Chart */}
            <div style={{
              borderRadius: '12px',
              padding: '24px'
            }}>
              <h3 style={{
                fontFamily: 'Inter, sans-serif',
                fontSize: '0.85rem',
                fontWeight: '600',
                color: '#6b7280',
                margin: '0 0 20px 0',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}>
                Platform Distribution
              </h3>
              <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={dashboardData.platformData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={(entry: any) => `${entry.name} ${(entry.percent * 100).toFixed(0)}%`}
                      outerRadius={85}
                      fill="#8884d8"
                      dataKey="value"
                      style={{ fontSize: '0.85rem', fontFamily: 'Inter, sans-serif', fontWeight: '500' }}
                    >
                      {dashboardData.platformData.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      contentStyle={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '6px',
                        fontFamily: 'Inter, sans-serif',
                        fontSize: '0.85rem'
                      }}
                    />
                  </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Row 4: Overview Analysis */}
          <div style={{
            borderRadius: '12px',
            padding: '24px'
          }}>
            <h3 style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.85rem',
              fontWeight: '600',
              color: '#6b7280',
              margin: '0 0 16px 0',
              textTransform: 'uppercase',
              letterSpacing: '0.05em'
            }}>
              Overview Analysis
            </h3>
            <ul style={{
              margin: 0,
              paddingLeft: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}>
              {dashboardData.overviewInsights.map((insight: string, index: number) => (
                <li key={index} style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: '0.95rem',
                  color: '#4b5563',
                  lineHeight: '1.6'
                }}>
                  {insight}
                </li>
              ))}
            </ul>
          </div>

          {!isDashboardExpanded && (
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backdropFilter: 'blur(8px)',
                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                paddingTop: '100px',
                borderRadius: '12px'
              }}>
                <button
                  onClick={() => {
                    setIsDashboardExpanded(true)
                    navigate('/tool?tool=insights-report&state=output&section=expanded', { replace: true })
                  }}
                  style={{
                    padding: '16px 40px',
                    background: 'rgba(107, 114, 128, 0.15)',
                    color: '#1a1a1a',
                    border: '1px solid rgba(107, 114, 128, 0.3)',
                    borderRadius: '12px',
                    fontSize: '1.1rem',
                    fontWeight: '600',
                    fontFamily: 'Inter, sans-serif',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px'
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.25)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)'
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = 'rgba(107, 114, 128, 0.15)'
                    e.currentTarget.style.transform = 'translateY(0)'
                    e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.1)'
                  }}
                >
                  <BarChart3 size={24} />
                  Click to See More
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default InsightsReport
