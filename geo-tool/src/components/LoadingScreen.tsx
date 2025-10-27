import { Lightbulb, Edit3, BarChart3 } from 'lucide-react'

interface LoadingScreenProps {
  message: string
}

const LoadingScreen = ({ message }: LoadingScreenProps) => {
  // Determine which icon to show based on the message
  const getIcon = () => {
    if (message.includes('Prompt')) {
      return <Lightbulb size={32} color="white" />
    } else if (message.includes('Rewriting') || message.includes('Content')) {
      return <Edit3 size={32} color="white" />
    } else if (message.includes('Analyzing') || message.includes('Insights')) {
      return <BarChart3 size={32} color="white" />
    }
    return <Lightbulb size={32} color="white" />
  }

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="loading-icon">
          {getIcon()}
        </div>
        <h3 style={{ 
          fontFamily: 'Inter, sans-serif', 
          fontWeight: 300,
          color: 'white',
          margin: '16px 0 8px 0'
        }}>
          {message}
        </h3>
        <p style={{ 
          fontFamily: 'Inter, sans-serif',
          color: 'rgba(255, 255, 255, 0.8)',
          margin: 0
        }}>
          Please wait while we process your request...
        </p>
      </div>
      <div className="spinner"></div>
    </div>
  )
}

export default LoadingScreen