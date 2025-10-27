# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for GEO (Generative Engine Optimizer), a service focused on AI search optimization. The site is built using Nicepage 7.11.17, a visual website builder that generates HTML/CSS/JavaScript files.

## Architecture

**Technology Stack:**
- **Frontend**: Pure HTML5, CSS3, and JavaScript (no frameworks)
- **Builder**: Nicepage 7.11.17 visual website builder
- **Styling**: Custom CSS with Nicepage's base CSS framework
- **JavaScript Libraries**: 
  - jQuery (jquery.js)
  - Nicepage core functionality (nicepage.js)
  - International telephone input (intlTelInput/)

**File Structure:**
```
geo/
├── index.html              # Main landing page (redirects from Home.html)
├── Home.html              # Actual homepage content
├── *.css                  # Page-specific stylesheets
├── *.html                 # Individual pages (Terms, Privacy, etc.)
├── blog/                  # Blog section
│   ├── blog.html         # Blog listing page
│   ├── blog.json         # Blog data (large file ~281KB)
│   ├── post-*.html       # Individual blog posts
│   └── post.html         # Blog post template
├── images/               # All website assets
├── intlTelInput/         # Phone number input library
├── jquery.js            # jQuery library
├── nicepage.css         # Base framework styles
└── nicepage.js          # Core Nicepage functionality
```

## Key Pages and Content

**Main Pages:**
- `index.html` - Redirect page to Home.html
- `Home.html` - Landing page promoting GEO's AI optimization services
- `Terms-of-Service.html` - Legal terms
- `Privacy-Policy.html` - Privacy policy
- `Fulfillment-Policy.html` - Service fulfillment terms

**Blog System:**
- `blog/blog.html` - Blog listing page
- `blog/blog.json` - Contains blog post data and metadata (very large file)
- `blog/post-*.html` - Individual blog post pages
- Blog posts appear to be about AI search optimization topics

## Development Workflow

Since this is a Nicepage-generated site, most editing should be done through the Nicepage visual editor rather than direct code modification. However, for maintenance and minor updates:

**File Editing:**
- CSS files are page-specific and contain both custom styles and Nicepage-generated styles
- HTML files contain inline styles and Nicepage-specific markup
- The `blog.json` file is extremely large (281KB+) and may contain blog post content and metadata

**Dependencies:**
- No package.json or build system - this is a static site
- External dependencies are included as files (jQuery, intlTelInput)
- Google Fonts loaded via CDN
- No build, test, or deployment scripts identified

## Nicepage Integration

This site is generated and managed through Nicepage 7.11.17:
- All HTML files contain `<meta name="generator" content="Nicepage 7.11.17, nicepage.com">`
- CSS and JavaScript are Nicepage-framework dependent
- Direct code modifications may be overwritten if the site is regenerated through Nicepage
- Complex responsive layouts and animations are handled by Nicepage's framework

## Important Notes

- **No Build System**: This is a static website with no package.json, build scripts, or development dependencies
- **Large Files**: The `blog.json` file exceeds 256KB and contains extensive blog data
- **Visual Builder**: Primary development should be done through Nicepage's visual interface
- **Static Hosting**: Site can be deployed directly to any static hosting service
- **SEO Focus**: Site content is focused on AI search optimization and GEO services