import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Equipa from './pages/Equipa';
import Regulamento from './pages/Regulamento';
import Galeria from './pages/Galeria';
import Contactos from './pages/Contactos';
import Noticias from './pages/Noticias'; 
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="container mx-auto p-4 mt-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipa" element={<Equipa />} />
            <Route path="/regulamento" element={<Regulamento />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contactos" element={<Contactos />} />
            <Route path="/noticias" element={<Noticias />} /> {/* <-- Adicionamos a Rota */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;