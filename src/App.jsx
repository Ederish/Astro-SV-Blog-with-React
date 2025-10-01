import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CardNews from './components/CardNews';
import Post from './components/Post';
import CloseButton from './components/CloseButton';
import Sidebar from './components/Sidebar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="progress-bar"></div>
      <section>
        <h1>Astro SV</h1>
        {/* Boton de cierre del Sidebar */}
        <CloseButton />
        {/* Barra lateral de navegación */}
        <Sidebar />

        {/* Contenido dinámico según la ruta */}
        <Routes>
          {/* Página principal: listado general de posts */}
          <Route path="/" element={<CardNews />} />

          {/* Post individual */}
          <Route path="/post/:id" element={<Post />} />

          {/* Página de WordPress */}
          <Route path="/page/:id" element={<Post />} />

          {/* Posts filtrados por categoría */}
          <Route path="/category/:id" element={<CardNews />} />
        </Routes>
      </section>
    </Router>
  );
}
export default App;