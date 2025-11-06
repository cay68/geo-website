import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lightbulb, Edit3, BarChart3, User, Clock, Trash2, ChevronLeft, ChevronRight } from 'lucide-react'
import LoadingScreen from '../components/LoadingScreen'
import AIPromptRecommendations from '../components/AIPromptRecommendations'
import SmartContentRewriter from '../components/SmartContentRewriter'
import InsightsReport from '../components/InsightsReport'
import GeoLogoWhite from '../assets/GEO Logo White.png'
import '../App.css'

type ActiveTool = 'ai-prompts' | 'content-rewriter' | 'insights-report'

interface HistoryItem {
  id: string
  tool: ActiveTool
  title: string
  description: string
  timestamp: Date
}

function Tool() {
  const navigate = useNavigate()
  const location = useLocation()
  const [activeTool, setActiveTool] = useState<ActiveTool>('ai-prompts')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingMessage, setLoadingMessage] = useState('')
  const [generatedPrompts, setGeneratedPrompts] = useState<string[]>([])
  const [rewrittenContent, setRewrittenContent] = useState('')
  const [contentPrompts, setContentPrompts] = useState<string[]>([])
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [prefilledAIDescription, setPrefilledAIDescription] = useState('')
  const [prefilledContentRewriter, setPrefilledContentRewriter] = useState('')
  const [prefilledContentPrompts, setPrefilledContentPrompts] = useState<string[]>([])
  const [prefilledInsightsIndustry, setPrefilledInsightsIndustry] = useState('')
  const [prefilledInsightsWebsite, setPrefilledInsightsWebsite] = useState('')
  const [prefilledInsightsPrompts, setPrefilledInsightsPrompts] = useState<string[]>([])

  // Static history - never add new items
  const staticHistory: HistoryItem[] = [
    {
      id: '1',
      tool: 'insights-report',
      title: 'Brand Visibility Dashboard',
      description: "Mandy's Home Store - Home & Living Appliances",
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      tool: 'content-rewriter',
      title: 'Air Fryer Product Description',
      description: 'SmartChef Pro Air Fryer optimization',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: '3',
      tool: 'ai-prompts',
      title: 'Singapore Home Appliances Store',
      description: 'AI search optimization prompts',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    }
  ]

  // Sync URL with active tool
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const toolParam = params.get('tool')
    if (toolParam && ['ai-prompts', 'content-rewriter', 'insights-report'].includes(toolParam)) {
      setActiveTool(toolParam as ActiveTool)
    }
  }, [location.search])

  const updateURL = (tool: ActiveTool) => {
    navigate(`/tool?tool=${tool}`, { replace: true })
  }

  const tools = [
    {
      id: 'ai-prompts' as ActiveTool,
      icon: <Lightbulb size={20} />,
      title: 'AI Prompt Recommendations',
      subtitle: ''
    },
    {
      id: 'content-rewriter' as ActiveTool,
      icon: <Edit3 size={20} />,
      title: 'Smart Content Rewriter',
      subtitle: ''
    },
    {
      id: 'insights-report' as ActiveTool,
      icon: <BarChart3 size={20} />,
      title: 'Insights Report',
      subtitle: ''
    }
  ]

  const startLoading = (message: string) => {
    setLoadingMessage(message)
    setIsLoading(true)
  }

  const stopLoading = () => {
    setIsLoading(false)
    setLoadingMessage('')
  }

  const handleUsePromptsInRewriter = (prompts: string[]) => {
    setGeneratedPrompts(prompts)
    setActiveTool('content-rewriter')
    updateURL('content-rewriter')
  }

  // Do nothing when tools try to add history - keep it static
  const addToHistory = (_tool: ActiveTool, _description: string) => {
    // Static history - no new items added
  }

  const loadHistoryItem = (item: HistoryItem) => {
    // First clear all prefilled data
    setPrefilledAIDescription('')
    setPrefilledContentRewriter('')
    setPrefilledContentPrompts([])
    setPrefilledInsightsIndustry('')
    setPrefilledInsightsWebsite('')
    setPrefilledInsightsPrompts([])

    // Then set the active tool
    setActiveTool(item.tool)
    updateURL(item.tool)

    // Use setTimeout to ensure the component has mounted before setting prefilled data
    setTimeout(() => {
      if (item.tool === 'ai-prompts') {
        setPrefilledAIDescription('I own an online Shopify store in Singapore that sells home and kitchen appliances. My target audience includes homeowners, renters, and tech-savvy consumers aged 25-45 looking for quality, affordable home solutions.')
      } else if (item.tool === 'content-rewriter') {
        setPrefilledContentRewriter('SmartChef Pro Air Fryer 5.5L - Your kitchen companion for healthier cooking')
        setPrefilledContentPrompts(['Best air fryer for Singapore kitchens', 'Healthier cooking appliances'])
      } else if (item.tool === 'insights-report') {
        setPrefilledInsightsIndustry('E-commerce')
        setPrefilledInsightsWebsite('mandyshomestore.sg')
        setPrefilledInsightsPrompts(['Where to buy home appliances in Singapore', 'Best online store for kitchen products'])
      }
    }, 100)
  }

  const formatTimestamp = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)
    const diffDays = Math.floor(diffMs / 86400000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays === 1) return 'Yesterday'
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  const renderActiveContent = () => {
    switch (activeTool) {
      case 'content-rewriter':
        return (
          <SmartContentRewriter
            key={`content-rewriter-${prefilledContentRewriter}-${prefilledContentPrompts.join(',')}`}
            startLoading={startLoading}
            stopLoading={stopLoading}
            prefilledPrompts={prefilledContentPrompts.length > 0 ? prefilledContentPrompts : generatedPrompts}
            onClearPrompts={() => setGeneratedPrompts([])}
            onAddToHistory={(description) => addToHistory('content-rewriter', description)}
            onSwitchToInsights={(content, prompts) => {
              setRewrittenContent(content)
              setContentPrompts(prompts)
              setActiveTool('insights-report')
              updateURL('insights-report')
            }}
            prefilledContent={prefilledContentRewriter}
          />
        )
      case 'insights-report':
        return (
          <InsightsReport
            key={`insights-${prefilledInsightsIndustry}-${prefilledInsightsWebsite}-${prefilledInsightsPrompts.join(',')}`}
            startLoading={startLoading}
            stopLoading={stopLoading}
            onAddToHistory={(description) => addToHistory('insights-report', description)}
            prefilledContent={rewrittenContent}
            prefilledPrompts={prefilledInsightsPrompts.length > 0 ? prefilledInsightsPrompts : contentPrompts}
            onClearData={() => {
              setRewrittenContent('')
              setContentPrompts([])
            }}
            prefilledIndustry={prefilledInsightsIndustry}
            prefilledWebsiteLink={prefilledInsightsWebsite}
          />
        )
      default:
        return (
          <AIPromptRecommendations
            key={`ai-prompts-${prefilledAIDescription}`}
            startLoading={startLoading}
            stopLoading={stopLoading}
            onUseInRewriter={handleUsePromptsInRewriter}
            onAddToHistory={(description) => addToHistory('ai-prompts', description)}
            prefilledDescription={prefilledAIDescription}
          />
        )
    }
  }

  return (
    <div className="app">
      <div className="main-layout">
        <div className={`tools-sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
          <div className="sidebar-header">
            <div className="nav-bar">
              <div className="logo-section">
                <div
                  style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  <img
                    src={GeoLogoWhite}
                    alt="GEO Logo"
                    className="sidebar-logo"
                  />
                </div>
              </div>
              <button className="profile-btn">
                <User size={18} />
              </button>
            </div>

            <div className="hero-section">
              <h1 className="hero-title">
                <span className="geo-highlight">G</span>enerative<br />
                <span className="geo-highlight">E</span>ngine<br />
                <span className="geo-highlight">O</span>ptimization
              </h1>
            </div>

            <div className="offerings-section">
              <h3>Our tools</h3>
              <div className="tools-list">
                {tools.map((tool) => (
                  <button
                    key={tool.id}
                    className={`tool-item ${activeTool === tool.id ? 'active' : ''}`}
                    onClick={() => {
                      setActiveTool(tool.id)
                      setGeneratedPrompts([]) // Clear prompts when switching tools
                      updateURL(tool.id)
                    }}
                  >
                    <div className="tool-item-icon">
                      {tool.id === 'ai-prompts' && <Lightbulb />}
                      {tool.id === 'content-rewriter' && <Edit3 />}
                      {tool.id === 'insights-report' && <BarChart3 />}
                    </div>
                    <div className="tool-item-content">
                      <div className="tool-item-title">{tool.title}</div>
                      {tool.subtitle && <div className="tool-item-subtitle">{tool.subtitle}</div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="history-section">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={16} />
                Recent History
              </h3>
              {staticHistory.length > 0 ? (
                <div className="history-list">
                  {staticHistory.map((item) => (
                    <div
                      key={item.id}
                      className="history-item"
                      title={item.description}
                    >
                      <div
                        className="history-item-clickable"
                        onClick={() => loadHistoryItem(item)}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '12px',
                          flex: 1,
                          cursor: 'pointer'
                        }}
                      >
                        <div className="history-item-icon">
                          {item.tool === 'ai-prompts' && <Lightbulb size={12} />}
                          {item.tool === 'content-rewriter' && <Edit3 size={12} />}
                          {item.tool === 'insights-report' && <BarChart3 size={12} />}
                        </div>
                        <div className="history-item-content">
                          <div className="history-item-description">{item.description}</div>
                          <div className="history-item-time">{formatTimestamp(item.timestamp)}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  fontSize: '0.85rem',
                  fontFamily: 'Inter, sans-serif',
                  textAlign: 'center',
                  padding: '16px 0'
                }}>
                  No history yet. Start using the tools!
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Collapse Toggle Button */}
        <button
          className="sidebar-toggle"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          title={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isSidebarCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>

        <div className="content-area">
          {renderActiveContent()}
        </div>
      </div>
      {isLoading && <LoadingScreen message={loadingMessage} />}
    </div>
  )
}

export default Tool
