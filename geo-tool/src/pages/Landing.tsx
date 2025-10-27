import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

function Landing() {
  const navigate = useNavigate()

  useEffect(() => {
    // Load Nicepage CSS
    const nicepageCss = document.createElement('link')
    nicepageCss.rel = 'stylesheet'
    nicepageCss.href = '/nicepage.css'
    document.head.appendChild(nicepageCss)

    const indexCss = document.createElement('link')
    indexCss.rel = 'stylesheet'
    indexCss.href = '/index.css'
    document.head.appendChild(indexCss)

    // Load jQuery
    const jqueryScript = document.createElement('script')
    jqueryScript.src = '/jquery.js'
    jqueryScript.defer = true
    document.body.appendChild(jqueryScript)

    // Load Nicepage scripts
    const nicepageScript = document.createElement('script')
    nicepageScript.src = '/nicepage.js'
    nicepageScript.defer = true
    document.body.appendChild(nicepageScript)

    return () => {
      document.head.removeChild(nicepageCss)
      document.head.removeChild(indexCss)
      document.body.removeChild(jqueryScript)
      document.body.removeChild(nicepageScript)
    }
  }, [])

  return (
    <>
      <header className="u-clearfix u-header u-header" id="header">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <a href="#" className="u-image u-logo u-image-1" onClick={(e) => { e.preventDefault(); navigate('/') }}>
            <img src="/images/GEO Logo Black.png" className="u-logo-image u-logo-image-1" alt="GEO Logo" />
          </a>
          <nav className="u-menu u-menu-one-level u-offcanvas u-menu-1" role="navigation" aria-label="Menu navigation">
            <div className="menu-collapse" style={{ fontSize: '1rem', letterSpacing: 0 }}>
              <a className="u-button-style u-custom-left-right-menu-spacing u-custom-padding-bottom u-custom-top-bottom-menu-spacing u-hamburger-link u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base" href="#" tabIndex={-1} aria-label="Open menu" aria-controls="1d69">
                <svg className="u-svg-link" viewBox="0 0 24 24"><use xlinkHref="#menu-hamburger"></use></svg>
                <svg className="u-svg-content" version="1.1" id="menu-hamburger" viewBox="0 0 16 16" x="0px" y="0px" xmlns="http://www.w3.org/2000/svg">
                  <g><rect y="1" width="16" height="2"></rect><rect y="7" width="16" height="2"></rect><rect y="13" width="16" height="2"></rect></g>
                </svg>
              </a>
            </div>
            <div className="u-custom-menu u-nav-container">
              <ul className="u-nav u-unstyled u-nav-1" role="menubar">
                <li role="none" className="u-nav-item">
                  <a
                    role="menuitem"
                    className="u-button-style u-nav-link u-text-active-palette-1-base u-text-hover-palette-2-base"
                    href="#"
                    onClick={(e) => { e.preventDefault(); navigate('/tool') }}
                    style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    Login
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 12h6m-6 0l3 3m-3-3l3-3"/>
                      <path d="M20 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/>
                      <path d="M16 1v6"/>
                    </svg>
                  </a>
                </li>
              </ul>
            </div>
            <div className="u-custom-menu u-nav-container-collapse" id="1d69" role="region" aria-label="Menu panel">
              <div className="u-black u-container-style u-inner-container-layout u-opacity u-opacity-95 u-sidenav">
                <div className="u-inner-container-layout u-sidenav-overflow">
                  <div className="u-menu-close" tabIndex={-1} aria-label="Close menu"></div>
                  <ul className="u-align-center u-nav u-popupmenu-items u-unstyled u-nav-2" role="menubar">
                    <li role="none" className="u-nav-item">
                      <a
                        role="menuitem"
                        className="u-button-style u-nav-link"
                        href="#"
                        onClick={(e) => { e.preventDefault(); navigate('/tool') }}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
                      >
                        Login
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 12h6m-6 0l3 3m-3-3l3-3"/>
                          <path d="M20 4v16a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2Z"/>
                          <path d="M16 1v6"/>
                        </svg>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="u-black u-menu-overlay u-opacity u-opacity-70"></div>
            </div>
          </nav>
        </div>
      </header>

      <section className="u-clearfix u-gradient u-section-1" id="carousel_14af">
        <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
          <div className="u-align-left u-container-align-left u-container-style u-expanded-width-xs u-group u-group-1">
            <div className="u-container-layout u-container-layout-1">
              <h3 className="u-text u-text-1">rank​ where the future searches</h3>
              <h1 className="u-text u-text-2">
                <span className="u-text-palette-5-dark-1">G</span>enerative
                <span className="u-text-palette-5-dark-1"> E</span>ngine
                <span className="u-text-palette-5-dark-1"> o</span>ptimize​​r
              </h1>
              <p className="u-text u-text-3">The world is moving to AI search. Get your products recommended by ChatGPT, Perplexity AI, Google AI's overview, and more.&nbsp;</p>
              <a href="#sec-874c" className="u-active-black u-align-left u-black u-border-none u-btn u-btn-round u-button-style u-hover-palette-5-dark-2 u-radius u-btn-1">Learn more</a>
            </div>
          </div>
          <img className="u-expanded-width-xs u-image u-image-round u-radius u-image-1" src="/images/997601a0f306bd2a8b263c61bb587bdcaea42ed792b7814f95f6a61e50a980af4661d9689096b31baa579fc6812070f7e73cd5fbaf1148e8496e1d_1280.jpg" alt="" />
        </div>
      </section>

      <section className="u-align-center u-clearfix u-container-align-center u-section-2" id="sec-ccbd">
        <div className="u-clearfix u-sheet u-valign-middle-lg u-valign-middle-md u-valign-middle-sm u-valign-middle-xs u-sheet-1">
          <h2 className="u-custom-font u-font-montserrat u-text u-text-default u-text-palette-5-dark-2 u-text-1">Billions of AI Prompts are answered daily, replacing traditional SEO rapidly.</h2>
          <div className="u-expanded-width u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div className="u-align-center u-container-align-center u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-1">
                  <img className="u-image u-image-contain u-image-default u-image-1" src="/images/chatgptlogo-1.png" alt="" />
                </div>
              </div>
              <div className="u-align-center u-container-align-center u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-2">
                  <img className="u-image u-image-contain u-image-default u-image-2" src="/images/claudelogo.png" alt="" />
                </div>
              </div>
              <div className="u-align-center u-container-align-center u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-3">
                  <img className="u-image u-image-contain u-image-default u-image-3" src="/images/copilotlogo.png" alt="" />
                </div>
              </div>
              <div className="u-align-center u-container-align-center u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-4">
                  <img className="u-image u-image-contain u-image-default u-image-4" src="/images/googleailogo-2.png" alt="" />
                </div>
              </div>
              <div className="u-align-center u-container-align-center u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-middle u-container-layout-5">
                  <img className="u-image u-image-contain u-image-default u-image-5" src="/images/perplexity.png" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="u-clearfix u-section-3" id="sec-e600">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="data-layout-selected u-clearfix u-expanded-width u-layout-wrap u-layout-wrap-1">
            <div className="u-gutter-0 u-layout">
              <div className="u-layout-row">
                <div className="u-size-30">
                  <div className="u-layout-col">
                    <div className="u-container-style u-layout-cell u-shape-rectangle u-size-60 u-layout-cell-1">
                      <div className="u-container-layout u-valign-bottom-xs u-valign-middle-md u-valign-middle-sm u-container-layout-1">
                        <h4 className="u-text u-text-default u-text-1">our</h4>
                        <h2 className="u-text u-text-default u-text-2">features</h2>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="u-size-30">
                  <div className="u-layout-col">
                    <div className="u-container-style u-layout-cell u-shape-rectangle u-size-20 u-layout-cell-2">
                      <div className="u-container-layout u-container-layout-2">
                        <h3 className="u-text u-text-default u-text-3">01</h3>
                        <h5 className="u-text u-text-default u-text-4">AI Prompt recommendations</h5>
                        <p className="u-text u-text-default u-text-5">GEO steps into the shoes of AI users to analyze how they prompt. Our proprietary algorithm studies your business to uncover the prompts you should rank for.&nbsp;</p>
                      </div>
                    </div>
                    <div className="u-container-style u-layout-cell u-shape-rectangle u-size-20 u-layout-cell-3">
                      <div className="u-container-layout u-container-layout-3">
                        <h3 className="u-text u-text-default u-text-6">02</h3>
                        <h5 className="u-text u-text-default u-text-7">smart content rewriter</h5>
                        <p className="u-text u-text-default u-text-8">GEO's proprietary algorithm rewrites your product pages and website content to be AI-Optimized, driving more traffic and conversions.&nbsp;</p>
                      </div>
                    </div>
                    <div className="u-container-style u-layout-cell u-shape-rectangle u-size-20 u-layout-cell-4">
                      <div className="u-container-layout u-container-layout-4">
                        <h3 className="u-text u-text-default u-text-9">03</h3>
                        <h5 className="u-text u-text-default u-text-10">INSIGHTS REPORT</h5>
                        <p className="u-text u-text-default u-text-11">Uncover your AI visibility score, optimization breakdown, and personalized recommendations to help your outpace your competitors. </p>
                        <a href="#sec-874c" className="u-active-black u-align-left u-black u-border-none u-btn u-btn-round u-button-style u-hover-palette-5-dark-2 u-radius u-btn-1">Learn more</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="u-black u-clearfix u-section-4" id="sec-4f69">
        <div className="u-clearfix u-sheet u-sheet-1">
          <div className="u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-list u-list-1">
            <div className="u-repeater u-repeater-1">
              <div className="u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-1">
                  <h3 className="u-custom-font u-custom-item u-font-oswald u-text u-text-default u-text-palette-4-base u-text-1" data-animation-name="counter" data-animation-event="scroll" data-animation-duration="3000">400%</h3>
                  <h6 className="u-custom-font u-font-oswald u-text u-text-default u-text-2">visibility boost with generative engine responses</h6>
                </div>
              </div>
              <div className="u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-2">
                  <h3 className="u-custom-font u-custom-item u-font-oswald u-text u-text-default u-text-palette-4-base u-text-3" data-animation-name="counter" data-animation-event="scroll" data-animation-duration="3000">79%</h3>
                  <h6 className="u-custom-font u-font-oswald u-text u-text-default u-text-4">of consumers expected to use ai search within the next 12 months</h6>
                </div>
              </div>
              <div className="u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-3">
                  <h3 className="u-custom-font u-custom-item u-font-oswald u-text u-text-default u-text-palette-4-base u-text-5" data-animation-name="counter" data-animation-event="scroll" data-animation-duration="3000">800M<br/></h3>
                  <h6 className="u-custom-font u-font-oswald u-text u-text-default u-text-6">weekly active chatgpt users</h6>
                </div>
              </div>
              <div className="u-container-style u-list-item u-repeater-item">
                <div className="u-container-layout u-similar-container u-valign-top u-container-layout-4">
                  <h3 className="u-custom-font u-custom-item u-font-oswald u-text u-text-default u-text-palette-2-base u-text-7" data-animation-name="counter" data-animation-event="scroll" data-animation-duration="3000">25%</h3>
                  <h6 className="u-custom-font u-font-oswald u-text u-text-default u-text-8">decline in traditional search traffic by 2026</h6>
                </div>
              </div>
            </div>
          </div>
          <div className="u-container-style u-expanded-width-md u-expanded-width-sm u-expanded-width-xs u-group u-group-1">
            <div className="u-container-layout u-valign-bottom-sm u-valign-bottom-xs u-valign-middle-lg u-valign-middle-md u-container-layout-5">
              <h2 className="u-text u-text-default u-text-9">what happens if you <span style={{fontWeight: 700}}><span style={{fontWeight: 400}}>don't</span> take action</span> ?</h2>
              <p className="u-text u-text-10">GEO is not merely a tool but a <b>NECESSITY&nbsp;</b>in the era of AI search. As consumers shift to AI search engines, businesses must adopt GEO strategies to stay visible. Leverage GEO to stay at the forefront of the new search paradigm.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="u-clearfix u-grey-10 u-section-5" id="sec-874c">
        <div className="u-clearfix u-sheet u-valign-middle u-sheet-1">
          <div className="data-layout-selected u-clearfix u-expanded-width u-gutter-0 u-layout-wrap u-layout-wrap-1">
            <div className="u-layout">
              <div className="u-layout-row">
                <div className="u-container-style u-layout-cell u-size-19 u-size-36-xxl u-layout-cell-1">
                  <div className="u-container-layout u-valign-bottom u-container-layout-1">
                    <h4 className="u-text u-text-default u-text-1">our</h4>
                    <h2 className="u-text u-text-2">Pricing</h2>
                  </div>
                </div>
                <div className="u-container-style u-layout-cell u-parallax u-shape-rectangle u-size-24-xxl u-size-41 u-layout-cell-2">
                  <div className="u-container-layout u-valign-middle u-container-layout-2">
                    <div className="custom-expanded u-list u-list-1">
                      <div className="u-repeater u-repeater-1">
                        <div className="u-container-style u-custom-item u-list-item u-palette-5-light-3 u-radius u-repeater-item u-shape-round u-list-item-1">
                          <div className="u-container-layout u-similar-container u-container-layout-3">
                            <h4 className="u-align-left u-text u-text-default u-text-3">Monthly</h4>
                            <h3 className="u-align-left u-text u-text-4">$38/ month</h3>
                            <p className="u-align-left u-text u-text-5">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-1"><img src="/images/324725-d82daece.png" alt=""/></span>AI Prompt Recommendations</p>
                            <div className="u-align-left u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-1"></div>
                            <p className="u-align-left u-text u-text-6">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-2"><img src="/images/324725-d82daece.png" alt=""/></span> Smart Content Rewriter</p>
                            <div className="u-align-left u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-2"></div>
                            <p className="u-align-left u-text u-text-7">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-3"><img src="/images/324725-d82daece.png" alt=""/></span> Insight Report</p>
                            <div className="custom-expanded u-align-left u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-3"></div>
                            <p className="u-align-left u-text u-text-8">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-4"><img src="/images/324725-d82daece.png" alt=""/></span> New features and updates</p>
                            <a href="#" className="u-active-black u-align-left u-black u-border-none u-btn u-btn-round u-button-style u-hover-palette-5-dark-2 u-radius u-btn-1">Subscribe</a>
                          </div>
                        </div>
                        <div className="u-container-style u-custom-item u-list-item u-palette-5-light-1 u-radius u-repeater-item u-shape-round u-list-item-2">
                          <div className="u-container-layout u-similar-container u-container-layout-4">
                            <h4 className="u-align-left u-text u-text-default u-text-9">Premium (Save $88)</h4>
                            <h3 className="u-align-left u-text u-text-10">$ 368/ year<br/></h3>
                            <p className="u-align-left u-text u-text-11">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-5"><img src="/images/324725-d82daece.png" alt=""/></span> AI Prompt Recommendations</p>
                            <div className="custom-expanded u-align-left u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-4"></div>
                            <p className="u-align-left u-text u-text-12">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-6"><img src="/images/324725-d82daece.png" alt=""/></span> Smart Content Rewriter</p>
                            <div className="custom-expanded u-align-left u-border-1 u-border-grey-dark-1 u-expanded-width u-line u-line-horizontal u-line-5"></div>
                            <p className="u-align-left u-text u-text-13">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-7"><img src="/images/324725-d82daece.png" alt=""/></span> Insight Report</p>
                            <div className="u-align-left u-border-1 u-border-grey-dark-1 u-line u-line-horizontal u-line-6"></div>
                            <p className="u-align-left u-text u-text-14">&nbsp;<span className="u-file-icon u-icon u-text-black u-icon-8"><img src="/images/324725-d82daece.png" alt=""/></span> New features and updates</p>
                            <a href="#" className="u-active-black u-align-left u-black u-border-none u-btn u-btn-round u-button-style u-hover-palette-5-dark-2 u-radius u-btn-2">Subscribe</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="u-clearfix u-footer u-white" id="footer">
        <div className="u-clearfix u-sheet u-valign-bottom-lg u-valign-bottom-sm u-valign-bottom-xs u-valign-middle-md u-sheet-1">
          <div className="data-layout-selected u-clearfix u-expanded-width u-gutter-30 u-layout-wrap u-layout-wrap-1">
            <div className="u-gutter-0 u-layout">
              <div className="u-layout-row">
                <div className="u-align-left u-container-align-left u-container-style u-layout-cell u-left-cell u-size-20 u-layout-cell-1">
                  <div className="u-container-layout u-container-layout-1">
                    <p className="u-small-text u-text u-text-variant u-text-1">
                      <a className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-1" href="#" title="Terms of Service">Terms of Service</a>
                    </p>
                    <p className="u-small-text u-text u-text-variant u-text-2">
                      <a className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-2" href="#" title="Privacy Policy">Privacy Policy</a>
                    </p>
                    <p className="u-small-text u-text u-text-variant u-text-3">
                      <a className="u-active-none u-border-none u-btn u-button-link u-button-style u-hover-none u-none u-text-palette-1-base u-btn-3" href="#" title="Fulfillment Policy">Fulfilment Policy</a>
                    </p>
                  </div>
                </div>
                <div className="u-container-style u-layout-cell u-size-20 u-layout-cell-2">
                  <div className="u-container-layout u-valign-middle u-container-layout-2">
                    <a href="#" className="u-image u-logo u-image-1" onClick={(e) => { e.preventDefault(); navigate('/') }}>
                      <img src="/images/GEO Logo Black.png" className="u-logo-image u-logo-image-1" alt="GEO Logo" />
                    </a>
                  </div>
                </div>
                <div className="u-align-right u-container-align-right u-container-style u-layout-cell u-right-cell u-size-20 u-layout-cell-3">
                  <div className="u-container-layout u-container-layout-3">
                    <div className="u-social-icons u-social-icons-1">
                      <a className="u-social-url" title="twitter" target="_blank" href="#"><span className="u-icon u-social-icon u-social-twitter u-icon-1"><svg className="u-svg-link" preserveAspectRatio="xMidYMin slice" viewBox="0 0 112 112"><circle fill="currentColor" className="st0" cx="56.1" cy="56.1" r="55"></circle><path fill="#FFFFFF" d="M83.8,47.3c0,0.6,0,1.2,0,1.7c0,17.7-13.5,38.2-38.2,38.2C38,87.2,31,85,25,81.2c1,0.1,2.1,0.2,3.2,0.2 c6.3,0,12.1-2.1,16.7-5.7c-5.9-0.1-10.8-4-12.5-9.3c0.8,0.2,1.7,0.2,2.5,0.2c1.2,0,2.4-0.2,3.5-0.5c-6.1-1.2-10.8-6.7-10.8-13.1 c0-0.1,0-0.1,0-0.2c1.8,1,3.9,1.6,6.1,1.7c-3.6-2.4-6-6.5-6-11.2c0-2.5,0.7-4.8,1.8-6.7c6.6,8.1,16.5,13.5,27.6,14 c-0.2-1-0.3-2-0.3-3.1c0-7.4,6-13.4,13.4-13.4c3.9,0,7.3,1.6,9.8,4.2c3.1-0.6,5.9-1.7,8.5-3.3c-1,3.1-3.1,5.8-5.9,7.4 c2.7-0.3,5.3-1,7.7-2.1C88.7,43,86.4,45.4,83.8,47.3z"></path></svg></span></a>
                      <a className="u-social-url" target="_blank" href="#"><span className="u-file-icon u-icon u-social-custom u-social-icon u-icon-2"><img src="/images/4250a36a77c5a8e3e4e06b99a6134fa7.jpg" alt=""/></span></a>
                    </div>
                    <h2 className="u-align-left u-hidden-md u-text u-text-4">connect with us</h2>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Landing
