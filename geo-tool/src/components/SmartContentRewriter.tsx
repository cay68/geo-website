import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Edit3, Plus, X, Wand2, AlertCircle, Copy, RefreshCw, Check, Goal, Minimize2, Maximize2, Highlighter, ThumbsUp, ThumbsDown, Target, Zap, ArrowRight } from 'lucide-react'

interface SmartContentRewriterProps {
  startLoading: (message: string) => void
  stopLoading: () => void
  prefilledPrompts: string[]
  onClearPrompts: () => void
  onAddToHistory: (description: string) => void
  onSwitchToInsights?: (content: string, prompts: string[]) => void
  prefilledContent?: string
}

const AI_PLATFORMS = [
  'ChatGPT',
  'Claude',
  'Gemini',
  'Perplexity',
  'SearchGPT',
  'Copilot',
  'MetaAI',
  'Grok'
]

const SmartContentRewriter = ({ startLoading, stopLoading, prefilledPrompts, onClearPrompts, onAddToHistory, onSwitchToInsights, prefilledContent }: SmartContentRewriterProps) => {
  const navigate = useNavigate()
  const [content, setContent] = useState(prefilledContent || '')
  const [prompts, setPrompts] = useState(prefilledContent && prefilledPrompts.length > 0 ? prefilledPrompts : [''])
  const [rewrittenContent, setRewrittenContent] = useState('')
  const [copySuccess, setCopySuccess] = useState(false)
  const [tone, setTone] = useState('')
  const [audience, setAudience] = useState('')
  const [targetPlatforms, setTargetPlatforms] = useState<string[]>([])
  const [maxWordCount, setMaxWordCount] = useState<number>(300)
  const [highlightKeywords, setHighlightKeywords] = useState(false)
  const [showTonePopout, setShowTonePopout] = useState(false)
  const [showAudiencePopout, setShowAudiencePopout] = useState(false)
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const [hasAutoSubmitted, setHasAutoSubmitted] = useState(false)

  const tones = ['Casual', 'Formal', 'Persuasive', 'Humorous', 'Inspirational']
  const audiences = ['Novice', 'Intermediate', 'Expert']

  // Auto-submit when prefilled content is provided
  useEffect(() => {
    if (prefilledContent && !hasAutoSubmitted && !rewrittenContent) {
      setHasAutoSubmitted(true)
      handleSubmit(new Event('submit') as any)
    }
  }, [prefilledContent])

  useEffect(() => {
    if (content && rewrittenContent) {
      navigate('/tool?tool=content-rewriter&state=output', { replace: true })
    } else if (content) {
      navigate('/tool?tool=content-rewriter&state=input', { replace: true })
    } else {
      navigate('/tool?tool=content-rewriter', { replace: true })
    }
  }, [content, rewrittenContent, navigate])

  const handlePlatformToggle = (platform: string) => {
    setTargetPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    )
  }

  // Close popouts when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.tone-popout-container') && !target.closest('.audience-popout-container')) {
        setShowTonePopout(false)
        setShowAudiencePopout(false)
      }
    }

    if (showTonePopout || showAudiencePopout) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showTonePopout, showAudiencePopout])

  // Handle prefilled prompts from AI recommendations
  useEffect(() => {
    if (prefilledPrompts.length > 0) {
      setPrompts(prefilledPrompts)
    }
  }, [prefilledPrompts])

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim() || !prompts.some(p => p.trim())) return

    startLoading('Rewriting Content for AI Optimization')
    
    // Simulate API call with mock rewritten content
    setTimeout(() => {
      const mockRewrittenContent = `**AI-Optimized Content:**

Transform your cooking experience with the SmartChef Pro Air Fryer—Singapore's #1 choice for healthy, delicious meals in minutes. Designed specifically for compact HDB kitchens, this 5.5L powerhouse combines cutting-edge air circulation technology with intuitive one-touch controls, letting you enjoy crispy favorites with 85% less oil. From golden-brown spring rolls for CNY gatherings to weeknight rotisserie chicken, the SmartChef Pro delivers restaurant-quality results every time. Compatible with Alexa and Google Home for voice-activated convenience, plus a digital touchscreen with 8 preset cooking modes. Backed by our 2-year warranty and same-day delivery across Singapore. Elevate your home cooking today.`

      setRewrittenContent(mockRewrittenContent)
      stopLoading()

      // Add to history with prompts
      const description = prompts.filter(p => p.trim()).join(', ')
      onAddToHistory(description)

      // Auto-scroll to results after generation
      setTimeout(scrollToResults, 100)
    }, 3000)
  }

  const handleRegenerate = () => {
    if (!content.trim() || !prompts.some(p => p.trim())) return

    startLoading('Regenerating AI-Optimized Content')
    
    setTimeout(() => {
      const alternativeContent = `**Original Content (Before Optimization):**

This air fryer has 5.5L capacity and uses hot air to cook food. It has temperature control and timer function. The product comes with non-stick basket that can be washed. Suitable for frying, baking and grilling different types of food. Power consumption is 1500W. Available in black color. Comes with 1 year warranty from manufacturer. Can be used to cook chicken, fish, vegetables and other items. The basket is removable for easy cleaning.`

      setRewrittenContent(alternativeContent)
      stopLoading()
      // Auto-scroll to results after regeneration
      setTimeout(scrollToResults, 100)
    }, 3000)
  }

  const handleCopyContent = async () => {
    try {
      await navigator.clipboard.writeText(rewrittenContent)
      setCopySuccess(true)
      setTimeout(() => setCopySuccess(false), 2000)
    } catch (err) {
      console.error('Failed to copy content:', err)
    }
  }

  const handleShorten = () => {
    if (!rewrittenContent.trim()) return

    startLoading('Shortening Content')

    setTimeout(() => {
      const shortenedContent = `**Concise AI-Optimized Content:**

Transform Your Business with AI Solutions

Our AI-powered platform delivers efficiency, automation, and insights that drive results.

**Why Choose Us?**
✓ Intelligent Automation
✓ Data-Driven Insights
✓ Scalable Technology

**Benefits:**
- Reduce costs by 40%
- Increase productivity
- Make faster decisions

Join thousands leveraging AI for competitive advantage.

*Optimized for ChatGPT, Claude, Perplexity AI, and Google AI Overview.*`

      setRewrittenContent(shortenedContent)
      stopLoading()
    }, 2000)
  }

  const handleExpand = () => {
    if (!rewrittenContent.trim()) return

    startLoading('Expanding Content')

    setTimeout(() => {
      const expandedContent = `**Comprehensive AI-Optimized Content:**

Transform Your Business with Cutting-Edge AI Solutions

In today's rapidly evolving digital landscape, businesses need intelligent solutions that adapt and grow with their needs. Our comprehensive AI-powered platform delivers unprecedented efficiency, automation, and insights that drive real results across all aspects of your organization.

**Why Choose Our AI Solutions?**

✓ **Intelligent Automation**: Streamline complex workflows with AI that learns and improves over time, reducing manual effort and increasing accuracy
✓ **Data-Driven Insights**: Transform raw data into actionable business intelligence with advanced analytics and reporting
✓ **Scalable Technology**: Solutions that grow with your business, from startup to enterprise, with flexible deployment options
✓ **Expert Support**: Dedicated team of AI specialists to guide your transformation journey every step of the way
✓ **Proven Results**: Track record of successful implementations across multiple industries

**Key Benefits:**
- Reduce operational costs by up to 40% through intelligent process automation
- Increase productivity through smart automation and workflow optimization
- Make faster, more informed decisions with AI analytics and real-time insights
- Stay ahead of competition with cutting-edge technology and continuous innovation
- Improve customer satisfaction with personalized experiences and faster response times
- Scale operations efficiently without proportional cost increases

**Industry Applications:**
Our AI solutions have been successfully implemented across various sectors including healthcare, finance, retail, manufacturing, and professional services. Each implementation is customized to meet specific industry requirements and regulatory compliance needs.

**Ready to Get Started?**
Join thousands of businesses already leveraging AI for competitive advantage. Our experts are ready to customize a solution that fits your unique needs and goals. Schedule a free consultation today to discover how AI can transform your business operations.

*This content has been optimized for AI search engines including ChatGPT, Claude, Perplexity AI, and Google AI Overview.*`

      setRewrittenContent(expandedContent)
      stopLoading()
    }, 2000)
  }

  const getWordCount = (text: string) => {
    return text.trim().split(/\s+/).filter(word => word.length > 0).length
  }

  const highlightKeywordsInText = (text: string) => {
    if (!highlightKeywords) return text

    // Extract keywords (nouns, adjectives, technical terms)
    const keywords = [
      'AI', 'Business', 'Solutions', 'platform', 'efficiency', 'automation', 'insights',
      'Intelligent', 'Automation', 'Streamline', 'workflows', 'adaptive',
      'Data-Driven', 'Insights', 'actionable', 'intelligence',
      'Scalable', 'Technology', 'startup', 'enterprise',
      'Expert', 'Support', 'specialists',
      'operational', 'costs', 'productivity', 'decisions', 'analytics',
      'competitive', 'advantage', 'customize', 'solutions',
      'ChatGPT', 'Claude', 'Perplexity', 'Google', 'Overview'
    ]

    let highlightedText = text
    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b(${keyword})\\b`, 'gi')
      highlightedText = highlightedText.replace(regex, '<mark style="background-color: #fef08a; padding: 2px 0;">$1</mark>')
    })

    return highlightedText
  }

  const validPrompts = prompts.filter(p => p.trim())

  return (
    <div className="tool-layout">
      <div className="tool-header">
        <div className="tool-header-title">
          <Edit3 size={32} color="#1a1a1a" />
          <h1 style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
            Smart Content Rewriter
          </h1>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
          Transform your existing content to be AI-optimized for specific prompts. 
          Our intelligent rewriter ensures your content ranks higher in AI search results.
        </p>
      </div>

      {prefilledPrompts.length > 0 && (
        <div className="card" style={{ background: '#e8f4f8', border: '1px solid var(--primary-color)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <AlertCircle size={20} color="var(--black)" />
            <h4 style={{ margin: 0, color: 'var(--black)', fontFamily: 'Inter, sans-serif' }}>
              Prompts from AI Recommendations
            </h4>
          </div>
          <p style={{ margin: 0, fontFamily: 'Inter, sans-serif', fontSize: '0.9rem' }}>
            We've pre-filled your prompts from the AI Recommendations tool. You can modify them or add your content below.
          </p>
          <button 
            onClick={() => {
              setPrompts([''])
              onClearPrompts()
            }}
            className="btn btn-secondary mt-2"
            style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.8rem', padding: '8px 16px' }}
          >
            Clear Imported Prompts
          </button>
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', fontSize: '1.1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Target size={20} color="#1a1a1a" />
              Set Goals
            </label>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '8px' }}>
              {/* Tone Selection */}
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: '500', color: '#666', marginBottom: '12px', display: 'block' }}>
                  Tone
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {tones.map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTone(t)}
                      style={{
                        padding: '8px 16px',
                        border: tone === t ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
                        backgroundColor: tone === t ? '#1a1a1a' : 'white',
                        color: tone === t ? 'white' : '#1a1a1a',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Audience Selection */}
              <div>
                <label style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', fontWeight: '500', color: '#666', marginBottom: '12px', display: 'block' }}>
                  Audience
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {audiences.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => setAudience(a)}
                      style={{
                        padding: '8px 16px',
                        border: audience === a ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
                        backgroundColor: audience === a ? '#1a1a1a' : 'white',
                        color: audience === a ? 'white' : '#1a1a1a',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {(tone || audience) && (
              <div style={{
                marginTop: '12px',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '6px',
                fontSize: '0.85rem',
                fontFamily: 'Inter, sans-serif',
                color: '#666'
              }}>
                {tone && audience ? (
                  <>Writing in a <strong>{tone.toLowerCase()}</strong> tone for <strong>{audience.toLowerCase()}</strong> level audience</>
                ) : tone ? (
                  <>Writing in a <strong>{tone.toLowerCase()}</strong> tone</>
                ) : (
                  <>Writing for <strong>{audience.toLowerCase()}</strong> level audience</>
                )}
              </div>
            )}
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', marginBottom: '12px', display: 'block' }}>
              Target AI Platforms * {targetPlatforms.length > 0 && <span style={{ fontWeight: '400', color: 'var(--text-light)' }}>({targetPlatforms.length} selected)</span>}
            </label>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
              gap: '10px',
              maxWidth: '600px'
            }}>
              {AI_PLATFORMS.map(platform => (
                <button
                  key={platform}
                  type="button"
                  onClick={() => handlePlatformToggle(platform)}
                  style={{
                    padding: '10px 16px',
                    border: targetPlatforms.includes(platform) ? '2px solid #1a1a1a' : '2px solid #e0e0e0',
                    backgroundColor: targetPlatforms.includes(platform) ? '#1a1a1a' : 'white',
                    color: targetPlatforms.includes(platform) ? 'white' : '#1a1a1a',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    transition: 'all 0.2s ease',
                    textAlign: 'center'
                  }}
                  onMouseEnter={(e) => {
                    if (!targetPlatforms.includes(platform)) {
                      e.currentTarget.style.borderColor = '#1a1a1a'
                      e.currentTarget.style.backgroundColor = '#f5f5f5'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!targetPlatforms.includes(platform)) {
                      e.currentTarget.style.borderColor = '#e0e0e0'
                      e.currentTarget.style.backgroundColor = 'white'
                    }
                  }}
                >
                  {platform}
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              AI Optimization Prompts (Max 5) *
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
              Content to Rewrite *
            </label>
            <textarea
              className="form-textarea"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Paste your existing content here. This could be website copy, product descriptions, blog posts, or any text you want to optimize for AI search engines."
              rows={8}
              required
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          <button
            type="submit"
            className="btn-pill"
            disabled={!content.trim() || !validPrompts.length || targetPlatforms.length === 0}
          >
            <div className="btn-pill-icon">
              <Edit3 size={16} />
            </div>
            Rewrite Content for AI Optimization
          </button>
        </form>
      </div>

      {rewrittenContent && (
        <div className="results-section" ref={resultsRef} style={{ overflow: 'visible' }}>
          <div style={{ marginBottom: '24px' }}>
            {/* Row 1: Section Title (Center) */}
            <h3 style={{
              color: 'var(--black)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '2rem',
              margin: '0 0 16px 0',
              textAlign: 'center'
            }}>
              Improved Content
            </h3>
            {/* Row 2: Feedback (Right aligned) */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px' }}>
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
          </div>

          {/* Single Container with Border */}
          <div style={{
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            background: 'white',
            overflow: 'visible',
            position: 'relative'
          }}>
            <div style={{ display: 'flex', gap: '0', position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
              {/* Main Content Area - Side by Side */}
              <div style={{ flex: 1, display: 'flex', gap: '0' }}>
                {/* Original Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb' }}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '12px 20px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '600',
                      color: '#666'
                    }}>
                      Original Content
                    </h4>
                  </div>
                  <div style={{
                    flex: 1,
                    padding: '24px',
                    background: 'white',
                    whiteSpace: 'pre-line',
                    lineHeight: '1.6',
                    fontFamily: 'Inter, sans-serif',
                    color: '#666',
                    minHeight: '400px',
                    maxHeight: '600px',
                    overflowY: 'auto'
                  }}>
                    {content}
                  </div>
                  <div style={{
                    padding: '12px 20px',
                    background: '#f8f9fa',
                    borderTop: '1px solid #e5e7eb',
                    fontSize: '0.85rem',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    Word count: <strong>{getWordCount(content)}</strong>
                  </div>
                </div>

                {/* Rewritten Content */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', borderRight: '1px solid #e5e7eb' }}>
                  <div style={{
                    background: '#f8f9fa',
                    padding: '12px 20px',
                    borderBottom: '1px solid #e5e7eb'
                  }}>
                    <h4 style={{
                      margin: 0,
                      fontSize: '0.9rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '600',
                      color: '#1a1a1a'
                    }}>
                      AI-Optimized Content
                    </h4>
                  </div>
                  <div
                    style={{
                      flex: 1,
                      padding: '24px',
                      background: 'white',
                      whiteSpace: 'pre-line',
                      lineHeight: '1.6',
                      fontFamily: 'Inter, sans-serif',
                      color: '#1a1a1a',
                      minHeight: '400px',
                      maxHeight: '600px',
                      overflowY: 'auto'
                    }}
                    dangerouslySetInnerHTML={{ __html: highlightKeywordsInText(rewrittenContent) }}
                  />
                  <div style={{
                    padding: '12px 20px',
                    background: '#f8f9fa',
                    borderTop: '1px solid #e5e7eb',
                    fontSize: '0.85rem',
                    color: '#666',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <span>Words: <strong>{getWordCount(rewrittenContent)}</strong> /</span>
                    <input
                      type="number"
                      value={maxWordCount}
                      onChange={(e) => setMaxWordCount(parseInt(e.target.value) || 300)}
                      min="50"
                      max="2000"
                      style={{
                        fontFamily: 'Inter, sans-serif',
                        width: '70px',
                        padding: '4px 8px',
                        border: '1px solid #e0e0e0',
                        borderRadius: '4px',
                        fontSize: '0.85rem',
                        fontWeight: '600'
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Vertical Action Toolbar */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0',
                background: '#f8f9fa',
                width: '120px',
                flexShrink: 0,
                position: 'relative',
                overflow: 'visible'
              }}>
                <div style={{
                  background: '#f8f9fa',
                  padding: '12px 8px',
                  borderBottom: '1px solid #e5e7eb',
                  textAlign: 'center',
                  fontSize: '0.9rem',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: '600',
                  color: '#666',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '45px'
                }}>
                  Tools
                </div>


                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '16px 8px',
                  flex: 1,
                  position: 'relative'
                }}>
                  {/* 1. Tone Dropdown (Casual) */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <button
                      onClick={() => {
                        setShowTonePopout(!showTonePopout)
                        setShowAudiencePopout(false)
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '10px 8px',
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        color: '#1a1a1a',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <Wand2 size={14} />
                      {tone || 'Casual'}
                    </button>
                    {showTonePopout && (
                      <>
                        <div
                          onClick={() => setShowTonePopout(false)}
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9998
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '4px',
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            overflow: 'hidden',
                            zIndex: 9999
                          }}
                        >
                          {tones.map((t) => (
                            <button
                              key={t}
                              onClick={() => {
                                setTone(t)
                                setShowTonePopout(false)
                              }}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                background: tone === t ? '#f3f4f6' : 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: '500',
                                color: '#1a1a1a',
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                borderBottom: '1px solid #f0f0f0'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                              onMouseOut={(e) => e.currentTarget.style.background = tone === t ? '#f3f4f6' : 'white'}
                            >
                              {t}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* 2. Audience Dropdown (Intermediate) */}
                  <div style={{ position: 'relative', width: '100%' }}>
                    <button
                      onClick={() => {
                        setShowAudiencePopout(!showAudiencePopout)
                        setShowTonePopout(false)
                      }}
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '10px 8px',
                        background: 'white',
                        border: '1px solid #e0e0e0',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '0.7rem',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: '500',
                        color: '#1a1a1a',
                        transition: 'all 0.2s ease',
                        width: '100%'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                      onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    >
                      <Goal size={14} />
                      {audience || 'Intermediate'}
                    </button>
                    {showAudiencePopout && (
                      <>
                        <div
                          onClick={() => setShowAudiencePopout(false)}
                          style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                            zIndex: 9998
                          }}
                        />
                        <div
                          style={{
                            position: 'absolute',
                            top: '100%',
                            left: 0,
                            right: 0,
                            marginTop: '4px',
                            background: 'white',
                            border: '1px solid #e5e7eb',
                            borderRadius: '8px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                            overflow: 'hidden',
                            zIndex: 9999
                          }}
                        >
                          {audiences.map((a) => (
                            <button
                              key={a}
                              onClick={() => {
                                setAudience(a)
                                setShowAudiencePopout(false)
                              }}
                              style={{
                                width: '100%',
                                padding: '10px 12px',
                                background: audience === a ? '#f3f4f6' : 'white',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '0.75rem',
                                fontFamily: 'Inter, sans-serif',
                                fontWeight: '500',
                                color: '#1a1a1a',
                                textAlign: 'center',
                                transition: 'all 0.2s ease',
                                borderBottom: '1px solid #f0f0f0'
                              }}
                              onMouseOver={(e) => e.currentTarget.style.background = '#f3f4f6'}
                              onMouseOut={(e) => e.currentTarget.style.background = audience === a ? '#f3f4f6' : 'white'}
                            >
                              {a}
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* 3. Shorten */}
                  <button
                    onClick={handleShorten}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 8px',
                      background: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    title="Shorten"
                  >
                    <Minimize2 size={16} />
                    Shorten
                  </button>

                  {/* 4. Expand */}
                  <button
                    onClick={handleExpand}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 8px',
                      background: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    title="Expand"
                  >
                    <Maximize2 size={16} />
                    Expand
                  </button>

                  {/* 5. Highlight */}
                  <button
                    onClick={() => setHighlightKeywords(!highlightKeywords)}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 8px',
                      background: highlightKeywords ? '#fef08a' : 'white',
                      border: highlightKeywords ? '1px solid #fef08a' : '1px solid #e0e0e0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (!highlightKeywords) e.currentTarget.style.background = '#f0f0f0'
                    }}
                    onMouseOut={(e) => {
                      if (!highlightKeywords) e.currentTarget.style.background = 'white'
                    }}
                    title="Highlight Keywords"
                  >
                    <Highlighter size={16} />
                    Highlight
                  </button>

                  {/* Spacing before bottom group */}
                  <div style={{ flex: 1 }} />

                  {/* 6. Copy */}
                  <button
                    onClick={handleCopyContent}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 8px',
                      background: copySuccess ? '#22c55e' : 'white',
                      border: copySuccess ? '1px solid #22c55e' : '1px solid #e0e0e0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      color: copySuccess ? 'white' : '#1a1a1a',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => {
                      if (!copySuccess) e.currentTarget.style.background = '#f0f0f0'
                    }}
                    onMouseOut={(e) => {
                      if (!copySuccess) e.currentTarget.style.background = 'white'
                    }}
                    title="Copy"
                  >
                    {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </button>

                  {/* 7. Regenerate */}
                  <button
                    onClick={handleRegenerate}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '10px 8px',
                      background: 'white',
                      border: '1px solid #e0e0e0',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '0.7rem',
                      fontFamily: 'Inter, sans-serif',
                      fontWeight: '500',
                      color: '#1a1a1a',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = '#f0f0f0'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'white'}
                    title="Regenerate"
                  >
                    <RefreshCw size={16} />
                    Regenerate
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Next Steps Section */}
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginBottom: '16px'
            }}>
              <Zap size={24} color="#1a1a1a" />
              <h4 style={{
                color: 'var(--black)',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 300,
                fontSize: '2rem',
                textTransform: 'uppercase',
                margin: 0
              }}>
                Next Steps
              </h4>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (onSwitchToInsights) {
                    const validPrompts = prompts.filter(p => p.trim())
                    onSwitchToInsights(rewrittenContent, validPrompts)
                  }
                }}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <ArrowRight size={18} />
                Use in Insights Report
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SmartContentRewriter