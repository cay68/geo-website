import { useNavigate } from 'react-router-dom'
import GeoLogoBlack from '../assets/GEO Logo Black.png'
import './Landing.css'

function Landing() {
  const navigate = useNavigate()

  return (
    <div className="landing-page">
      <header className="landing-header">
        <div className="landing-nav">
          <img src={GeoLogoBlack} alt="GEO Logo" className="landing-logo" />
          <button className="login-btn" onClick={() => navigate('/tool')}>
            Login
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 12h6m-6 0l3 3m-3-3l3-3"/>
              <path d="M20 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/>
            </svg>
          </button>
        </div>
      </header>

      <section className="hero-section">
        <div className="hero-content">
          <h3>rank where the future searches</h3>
          <h1>
            <span className="highlight">G</span>enerative{' '}
            <span className="highlight">E</span>ngine{' '}
            <span className="highlight">O</span>ptimizer
          </h1>
          <p>
            The world is moving to AI search. Get your products recommended by ChatGPT,
            Perplexity AI, Google AI's overview, and more.
          </p>
          <button className="cta-btn" onClick={() => navigate('/tool')}>
            Get Started
          </button>
        </div>
      </section>

      <section className="platforms-section">
        <h2>Billions of AI Prompts are answered daily, replacing traditional SEO rapidly.</h2>
        <div className="platforms-grid">
          <div className="platform-logo">ChatGPT</div>
          <div className="platform-logo">Claude</div>
          <div className="platform-logo">Copilot</div>
          <div className="platform-logo">Google AI</div>
          <div className="platform-logo">Perplexity</div>
        </div>
      </section>

      <section className="features-section">
        <div className="features-header">
          <h4>our</h4>
          <h2>features</h2>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <h3>01</h3>
            <h5>AI Prompt recommendations</h5>
            <p>
              GEO steps into the shoes of AI users to analyze how they prompt. Our proprietary
              algorithm studies your business to uncover the prompts you should rank for.
            </p>
          </div>
          <div className="feature-card">
            <h3>02</h3>
            <h5>smart content rewriter</h5>
            <p>
              GEO's proprietary algorithm rewrites your product pages and website content to be
              AI-Optimized, driving more traffic and conversions.
            </p>
          </div>
          <div className="feature-card">
            <h3>03</h3>
            <h5>INSIGHTS REPORT</h5>
            <p>
              Uncover your AI visibility score, optimization breakdown, and personalized
              recommendations to help your outpace your competitors.
            </p>
            <button className="learn-more-btn" onClick={() => navigate('/tool')}>
              Try It Now
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Landing
