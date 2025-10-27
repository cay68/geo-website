# GEO Tool - UI Implementation

A modern, responsive UI for the Generative Engine Optimizer (GEO) tool, built with React, TypeScript, and Vite.

## Features

### 🧠 AI Prompt Recommendations
- Input detailed business description
- Get personalized AI prompt recommendations
- Optimized for ChatGPT, Claude, Perplexity AI, and Google AI Overview

### ✍️ Smart Content Rewriter  
- Add up to 5 optimization prompts
- Input existing content to rewrite
- Get AI-optimized content for better search rankings

### 📊 Insights Report
- Analyze content against up to 5 prompts
- Get detailed performance scores and recommendations
- Visual progress indicators and actionable insights

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Lucide React** for icons
- **CSS Variables** for theming (matching the main GEO website)

## Design System

The UI follows the established GEO brand guidelines:
- **Primary Colors**: Blue (#478ac9), Dark Blue (#2c5aa0)
- **Accent**: Yellow (#ffc107)
- **Typography**: Montserrat (headings), Open Sans (body)
- **Gradients**: Purple-blue gradient backgrounds
- **Components**: Modern cards with hover effects, rounded buttons

## Getting Started

### Prerequisites
- Node.js 16+ and npm

### Installation
```bash
cd geo-tool
npm install
```

### Development
```bash
npm run dev
```
Opens at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # App header with GEO branding
│   ├── Dashboard.tsx           # Main dashboard with feature cards
│   ├── AIPromptRecommendations.tsx  # AI prompt generation tool
│   ├── SmartContentRewriter.tsx     # Content optimization tool
│   └── InsightsReport.tsx      # Content analysis tool
├── App.tsx                     # Main app component with routing
├── App.css                     # Component-specific styles
├── index.css                   # Global styles and design system
└── main.tsx                    # App entry point
```

## Features Implemented

### ✅ Completed
- Responsive dashboard with feature cards
- All 3 core tools (AI Prompts, Content Rewriter, Insights Report)
- Mock data integration (ready for API integration)
- Loading states and form validation
- Modern, accessible UI components
- Mobile-responsive design
- Brand-consistent styling

### 🔄 Mock Data (Ready for API Integration)
- AI Prompt Recommendations: Returns 8 sample prompts
- Content Rewriter: Returns formatted, optimized content
- Insights Report: Returns scored analysis with recommendations

## Next Steps for Integration

1. **API Integration**: Replace mock data with actual API calls
2. **Authentication**: Add user login/registration if required  
3. **Data Persistence**: Save user inputs and results
4. **Export Features**: Add download/copy functionality
5. **Error Handling**: Implement comprehensive error states

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## Deployment

The built files can be deployed to any static hosting service:
- Vercel
- Netlify  
- AWS S3 + CloudFront
- GitHub Pages

Built files will be in the `dist/` folder after running `npm run build`.