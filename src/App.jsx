import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import CardNews from './components/CardNews'
import Post from './components/Post' 
import './App.css'

function App() {
  return (
    <Router>
      <div className="progress-bar"></div>
      <section>
        <h1>Astro sv</h1>

        <Routes>
          <Route path="/" element={<CardNews />} />
          <Route path="/post/:id" element={<Post />} />
        </Routes>
      </section>
    </Router>
  )
}

export default App
