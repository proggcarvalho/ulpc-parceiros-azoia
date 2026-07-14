import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Equipa from './pages/Equipa';
import Regulamento from './pages/Regulamento';
import Galeria from './pages/Galeria';
import Contactos from './pages/Contactos'; // <-- 1. Importámos a página
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        
        <main className="container mx-auto p-4 mt-6 flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/equipa" element={<Equipa />} />
            <Route path="/regulamento" element={<Regulamento />} />
            <Route path="/galeria" element={<Galeria />} />
            <Route path="/contactos" element={<Contactos />} /> {/* <-- 2. Adicionámos a Rota */}
          </Routes>
        </main>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;