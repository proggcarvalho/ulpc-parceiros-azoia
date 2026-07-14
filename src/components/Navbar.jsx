import { useState } from 'react';
import { Link } from 'react-router-dom';
import logoUlpc from '../assets/logo_ULPC1.png';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        
        {/* ESQUERDA: Logótipo e Texto Oficial */}
        <Link to="/" className="flex items-center gap-4">
          
          {/* AQUI ESTÁ O TEU LOGÓTIPO! */}
          <img src={logoUlpc} alt="Logótipo ULPC" className="w-16 h-16 object-contain flex-shrink-0 mix-blend-multiply" />          {/* Texto formatado como no site da ANEPC */}
          <div className="flex flex-col text-slate-800">
            <span className="text-lg md:text-xl font-extrabold tracking-wide leading-tight">UNIDADE LOCAL</span>
            <span className="text-sm font-medium leading-tight">DE PROTEÇÃO CIVIL</span>
            <span className="text-xs text-slate-500 mt-0.5 font-medium">PARCEIROS E AZOIA</span>
          </div>
        </Link>

        {/* DIREITA: Menu e Pesquisa (Desktop) */}
        <div className="hidden lg:flex flex-col items-end gap-3">
          
          {/* Links de Navegação */}
          <div className="flex gap-5 text-sm font-medium text-slate-600">
            <Link to="/" className="hover:text-blue-800 transition">Início</Link>
            <Link to="/equipa" className="hover:text-blue-800 transition">Equipa</Link>
            <Link to="/regulamento" className="hover:text-blue-800 transition">Regulamento</Link>
            <Link to="/galeria" className="hover:text-blue-800 transition">Galeria</Link>
            <Link to="/contactos" className="hover:text-blue-800 transition">Contactos</Link>
            <Link to="/noticias" className="block py-2 hover:text-orange-500 font-semibold text-blue-800" onClick={() => setIsOpen(false)}>Notícias</Link>
          </div>

          {/* Barra de Pesquisa */}
          <div className="relative w-72">
            <input 
              type="text" 
              placeholder="Pesquisar..." 
              className="w-full bg-slate-100 text-slate-700 text-sm rounded-full py-1.5 px-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-800"
            />
            <svg className="w-4 h-4 absolute right-3 top-2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Botão Hambúrguer (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-slate-600 hover:text-slate-900"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col space-y-4 shadow-lg absolute w-full">
          <Link to="/" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-800 font-medium">Início</Link>
          <Link to="/equipa" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-800 font-medium">Equipa / Órgãos</Link>
          <Link to="/regulamento" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-800 font-medium">Regulamento</Link>
          <Link to="/galeria" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-800 font-medium">Galeria</Link>
          <Link to="/contactos" onClick={() => setIsOpen(false)} className="block text-slate-600 hover:text-blue-800 font-medium">Contactos</Link>
          
          <div className="relative mt-2">
            <input type="text" placeholder="Pesquisar..." className="w-full bg-slate-100 rounded-full py-2 px-4 text-sm focus:outline-none" />
          </div>
        </div>
      )}
    </nav>
  );
}