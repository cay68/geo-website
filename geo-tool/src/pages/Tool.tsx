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
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: '1',
      tool: 'ai-prompts',
      title: 'AI Prompt Recommendations',
      description: 'Best AI tools for e-commerce optimization',
      timestamp: new Date(Date.now() - 1000 * 60 * 5) // 5 minutes ago
    },
    {
      id: '2',
      tool: 'content-rewriter',
      title: 'Smart Content Rewriter',
      description: 'SEO strategies for SaaS companies',
      timestamp: new Date(Date.now() - 1000 * 60 * 30) // 30 minutes ago
    },
    {
      id: '3',
      tool: 'insights-report',
      title: 'Insights Report',
      description: 'Digital marketing analytics and performance',
      timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) // 2 hours ago
    }
  ])
  const [currentDescription, setCurrentDescription] = useState('')

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

  const addToHistory = (tool: ActiveTool, description: string) => {
    const toolNames = {
      'ai-prompts': 'AI Prompt Recommendations',
      'content-rewriter': 'Smart Content Rewriter',
      'insights-report': 'Insights Report'
    }

    const newHistoryItem: HistoryItem = {
      id: Date.now().toString(),
      tool,
      title: toolNames[tool],
      description: description.slice(0, 60) + (description.length > 60 ? '...' : ''),
      timestamp: new Date()
    }

    setHistory(prev => [newHistoryItem, ...prev].slice(0, 20)) // Keep last 20 items
  }

  const loadHistoryItem = (item: HistoryItem) => {
    setActiveTool(item.tool)
    updateURL(item.tool)
  }

  const deleteHistoryItem = (e: React.MouseEvent, itemId: string) => {
    e.stopPropagation() // Prevent triggering loadHistoryItem
    setHistory(prev => prev.filter(item => item.id !== itemId))
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
            startLoading={startLoading}
            stopLoading={stopLoading}
            prefilledPrompts={generatedPrompts}
            onClearPrompts={() => setGeneratedPrompts([])}
            onAddToHistory={(description) => addToHistory('content-rewriter', description)}
            onSwitchToInsights={(content, prompts) => {
              setRewrittenContent(content)
              setContentPrompts(prompts)
              setActiveTool('insights-report')
              updateURL('insights-report')
            }}
          />
        )
      case 'insights-report':
        return (
          <InsightsReport
            startLoading={startLoading}
            stopLoading={stopLoading}
            onAddToHistory={(description) => addToHistory('insights-report', description)}
            prefilledContent={rewrittenContent}
            prefilledPrompts={contentPrompts}
            onClearData={() => {
              setRewrittenContent('')
              setContentPrompts([])
            }}
          />
        )
      default:
        return (
          <AIPromptRecommendations
            startLoading={startLoading}
            stopLoading={stopLoading}
            onUseInRewriter={handleUsePromptsInRewriter}
            onAddToHistory={(description) => addToHistory('ai-prompts', description)}
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
              {history.length > 0 ? (
                <div className="history-list">
                  {history.map((item) => (
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
                      <button
                        className="history-item-delete"
                        onClick={(e) => deleteHistoryItem(e, item.id)}
                        title="Delete"
                      >
                        <Trash2 size={12} />
                      </button>
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
