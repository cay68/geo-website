import { useState, useRef } from 'react'
import { Lightbulb, Sparkles, RefreshCw, ArrowRight, Zap, Upload, X, Pencil, RotateCw, HelpCircle, ThumbsUp, ThumbsDown } from 'lucide-react'

interface AIPromptRecommendationsProps {
  startLoading: (message: string) => void
  stopLoading: () => void
  onUseInRewriter: (prompts: string[]) => void
  onAddToHistory: (description: string) => void
}

const AIPromptRecommendations = ({ startLoading, stopLoading, onUseInRewriter, onAddToHistory }: AIPromptRecommendationsProps) => {
  const [businessDescription, setBusinessDescription] = useState('')
  const [websiteLink, setWebsiteLink] = useState('')
  const [websiteImage, setWebsiteImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [recommendations, setRecommendations] = useState<{prompt: string, reason: string}[]>([])
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editedPrompt, setEditedPrompt] = useState('')
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)
  const resultsRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const scrollToResults = () => {
    if (resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setWebsiteImage(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setWebsiteImage(null)
    setImagePreview('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!businessDescription.trim()) return

    startLoading('Generating AI Prompt Recommendations')

    // Simulate API call with mock data - 5 prompts max
    setTimeout(() => {
      const mockRecommendations = [
        {
          prompt: "Best AI-powered software solutions for small businesses",
          reason: "Targets business owners looking for AI solutions, high commercial intent"
        },
        {
          prompt: "How to optimize content for AI search engines",
          reason: "Addresses your core service offering and demonstrates expertise"
        },
        {
          prompt: "Top AI tools for business automation and efficiency",
          reason: "Captures productivity-focused audience with specific pain points"
        },
        {
          prompt: "AI content optimization strategies for 2024",
          reason: "Current year relevance increases search visibility and credibility"
        },
        {
          prompt: "Smart AI solutions for digital marketing",
          reason: "Broad appeal for marketing professionals seeking AI integration"
        }
      ]
      setRecommendations(mockRecommendations)
      stopLoading()

      // Add to history
      onAddToHistory(businessDescription)

      // Auto-scroll to results after a short delay
      setTimeout(scrollToResults, 100)
    }, 3000)
  }

  const handleRegenerate = () => {
    startLoading('Regenerating AI Prompt Recommendations')
    
    setTimeout(() => {
      const alternativeRecommendations = [
        {
          prompt: "AI automation tools for modern businesses",
          reason: "Emphasizes modernity and automation for tech-forward companies"
        },
        {
          prompt: "How to rank higher in AI search results",
          reason: "Direct appeal to SEO professionals and content creators"
        },
        {
          prompt: "Best AI platforms for content creation",
          reason: "Targets content creators and marketing teams specifically"
        },
        {
          prompt: "AI-driven SEO techniques that work",
          reason: "Combines AI focus with proven results messaging"
        },
        {
          prompt: "Advanced AI solutions for business growth",
          reason: "Appeals to growth-oriented businesses and decision makers"
        }
      ]
      setRecommendations(alternativeRecommendations)
      stopLoading()
      // Auto-scroll to results after regeneration
      setTimeout(scrollToResults, 100)
    }, 3000)
  }

  const handleUseInContentRewriter = () => {
    onUseInRewriter(recommendations.map(r => r.prompt))
  }

  const handleRegenerateSingle = (index: number) => {
    startLoading('Regenerating prompt...')

    setTimeout(() => {
      const alternativePrompts = [
        "AI-powered business optimization solutions",
        "Next-generation AI tools for entrepreneurs",
        "Innovative AI strategies for digital transformation",
        "Cutting-edge AI solutions for enterprise",
        "Modern AI platforms for business success"
      ]

      const newPrompt = alternativePrompts[Math.floor(Math.random() * alternativePrompts.length)]
      const newRecommendations = [...recommendations]
      newRecommendations[index] = {
        ...newRecommendations[index],
        prompt: newPrompt
      }
      setRecommendations(newRecommendations)
      stopLoading()
    }, 1500)
  }

  const handleEditPrompt = (index: number) => {
    setEditingIndex(index)
    setEditedPrompt(recommendations[index].prompt)
  }

  const handleSaveEdit = (index: number) => {
    const newRecommendations = [...recommendations]
    newRecommendations[index] = {
      ...newRecommendations[index],
      prompt: editedPrompt
    }
    setRecommendations(newRecommendations)
    setEditingIndex(null)
    setEditedPrompt('')
  }

  const handleCancelEdit = () => {
    setEditingIndex(null)
    setEditedPrompt('')
  }

  return (
    <div className="tool-layout">
      <div className="tool-header">
        <div className="tool-header-title">
          <Lightbulb size={32} color="#1a1a1a" />
          <h1 style={{ fontFamily: 'Inter, sans-serif', textTransform: 'uppercase' }}>
            AI Prompt Recommendations
          </h1>
        </div>
        <p style={{ fontFamily: 'Inter, sans-serif', color: 'var(--text-light)' }}>
          Describe your business and get up to 5 personalized AI prompt recommendations. 
          Our algorithm will analyze your description and suggest the most effective prompts for your niche.
        </p>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              Detailed Business Description *
              <div style={{ position: 'relative', display: 'inline-block' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'help',
                    fontWeight: '400',
                    fontSize: '0.85rem',
                    color: '#666',
                    textDecoration: 'underline',
                    textDecorationStyle: 'dotted',
                    position: 'relative'
                  }}
                  onMouseEnter={(e) => {
                    const tooltip = e.currentTarget.querySelector('.tooltip-content') as HTMLElement
                    if (tooltip) tooltip.style.display = 'block'
                  }}
                  onMouseLeave={(e) => {
                    const tooltip = e.currentTarget.querySelector('.tooltip-content') as HTMLElement
                    if (tooltip) tooltip.style.display = 'none'
                  }}
                >
                  What makes a good business description?
                  <div
                    className="tooltip-content"
                    style={{
                      display: 'none',
                      position: 'absolute',
                      top: '100%',
                      left: '0',
                      marginTop: '8px',
                      padding: '12px 16px',
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      lineHeight: '1.6',
                      minWidth: '320px',
                      maxWidth: '400px',
                      zIndex: 1000,
                      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      fontFamily: 'Inter, sans-serif',
                      whiteSpace: 'normal',
                      textDecoration: 'none'
                    }}
                  >
                    <div style={{ marginBottom: '8px', fontWeight: '600' }}>A good business description includes:</div>
                    <ul style={{ margin: 0, paddingLeft: '20px' }}>
                      <li>What you do and who you serve</li>
                      <li>Your unique value proposition</li>
                      <li>Main products/services</li>
                      <li>Target audience</li>
                      <li>Key differentiators</li>
                    </ul>
                    <div style={{ marginTop: '8px', fontStyle: 'italic', fontSize: '0.8rem', opacity: 0.9 }}>
                      Be as specific as possible to get the most relevant prompt recommendations.
                    </div>
                  </div>
                </span>
              </div>
            </label>
            <textarea
              className="form-textarea"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              placeholder=""
              rows={6}
              required
              style={{ fontFamily: 'Inter, sans-serif' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              Website Link
            </label>
            <input
              type="url"
              value={websiteLink}
              onChange={(e) => setWebsiteLink(e.target.value)}
              placeholder="https://example.com"
              style={{
                fontFamily: 'Inter, sans-serif',
                padding: '10px 16px',
                width: '100%',
                fontSize: '0.9rem',
                height: 'auto',
                border: '2px solid #e0e0e0',
                borderRadius: '8px',
                outline: 'none',
                transition: 'border-color 0.2s ease',
                lineHeight: 'normal',
                boxSizing: 'border-box'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#1a1a1a'
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e0e0e0'
              }}
            />
          </div>

          <div className="form-group">
            <label className="form-label" style={{ fontFamily: 'Inter, sans-serif', fontWeight: '600' }}>
              Website Screenshot/Image
            </label>
            <div style={{ marginTop: '8px' }}>
              {!imagePreview ? (
                <div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    id="website-image-upload"
                  />
                  <label
                    htmlFor="website-image-upload"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '12px 24px',
                      backgroundColor: '#f5f5f5',
                      border: '2px dashed #d0d0d0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontFamily: 'Inter, sans-serif',
                      transition: 'all 0.2s ease',
                      fontSize: '0.95rem'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ebebeb'
                      e.currentTarget.style.borderColor = '#1a1a1a'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f5f5f5'
                      e.currentTarget.style.borderColor = '#d0d0d0'
                    }}
                  >
                    <Upload size={18} />
                    Choose Image
                  </label>
                </div>
              ) : (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={imagePreview}
                    alt="Website preview"
                    style={{
                      maxWidth: '300px',
                      maxHeight: '200px',
                      borderRadius: '8px',
                      border: '2px solid #e0e0e0'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    style={{
                      position: 'absolute',
                      top: '-8px',
                      right: '-8px',
                      backgroundColor: '#1a1a1a',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '28px',
                      height: '28px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#333'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#1a1a1a'
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              )}
            </div>
          </div>

          <button
            type="submit"
            className="btn-pill"
            disabled={!businessDescription.trim()}
          >
            <div className="btn-pill-icon">
              <Lightbulb size={16} />
            </div>
            Generate AI Prompt Recommendations
          </button>
        </form>
      </div>

      {recommendations.length > 0 && (
        <div className="results-section" ref={resultsRef}>
          <div style={{ marginBottom: '32px' }}>
            {/* Row 1: Section Title (Center) */}
            <h3 style={{
              color: 'var(--black)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 300,
              fontSize: '2rem',
              margin: '0 0 16px 0',
              textAlign: 'center'
            }}>
              Your AI Prompt Recommendations
            </h3>
            {/* Row 2: Feedback (Left) + Regenerate All Button (Right) */}
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
              <button
                className="btn btn-accent"
                onClick={handleRegenerate}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <RefreshCw size={18} />
                Regenerate All
              </button>
            </div>
          </div>
          
          <div className="recommendations-container">
            {recommendations.map((recommendation, index) => (
              <div key={index} style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                <div className="recommendation-card" style={{ flex: 1, margin: 0 }}>
                  <div className="recommendation-header">
                    <span className="recommendation-number">{index + 1}</span>
                    <div className="recommendation-content" style={{ flex: 1 }}>
                      {editingIndex === index ? (
                        <div style={{ marginBottom: '12px' }}>
                          <input
                            type="text"
                            value={editedPrompt}
                            onChange={(e) => setEditedPrompt(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '10px 12px',
                              fontFamily: 'Inter, sans-serif',
                              fontSize: '1rem',
                              border: '2px solid #1a1a1a',
                              borderRadius: '6px',
                              outline: 'none',
                              marginBottom: '8px'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button
                              onClick={() => handleSaveEdit(index)}
                              style={{
                                padding: '6px 16px',
                                backgroundColor: '#1a1a1a',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEdit}
                              style={{
                                padding: '6px 16px',
                                backgroundColor: 'white',
                                color: '#1a1a1a',
                                border: '2px solid #e0e0e0',
                                borderRadius: '6px',
                                fontFamily: 'Inter, sans-serif',
                                fontSize: '0.85rem',
                                cursor: 'pointer',
                                fontWeight: '500'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <p className="recommendation-prompt">{recommendation.prompt}</p>
                      )}
                      <p className="recommendation-reason">
                        <strong>Reason:</strong> {recommendation.reason}
                      </p>
                    </div>
                  </div>
                </div>
                {editingIndex !== index && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', paddingTop: '4px' }}>
                    <button
                      onClick={() => handleEditPrompt(index)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.6
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.6'
                      }}
                      title="Edit prompt"
                    >
                      <Pencil size={18} color="#1a1a1a" />
                    </button>
                    <button
                      onClick={() => handleRegenerateSingle(index)}
                      style={{
                        padding: '4px',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'opacity 0.2s ease',
                        opacity: 0.6
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.6'
                      }}
                      title="Regenerate this prompt"
                    >
                      <RotateCw size={18} color="#1a1a1a" />
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          
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
                onClick={handleUseInContentRewriter}
                style={{ fontFamily: 'Inter, sans-serif' }}
              >
                <ArrowRight size={18} />
                Use in Content Rewriter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AIPromptRecommendations