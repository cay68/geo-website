import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import Tool from './pages/Tool'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/tool" element={<Tool />} />
    </Routes>
  )
}

export default App
