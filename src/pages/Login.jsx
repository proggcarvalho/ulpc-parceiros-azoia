import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErro('');
    setLoading(true);

    try {
      // Fala com a nossa nova rota de Login no C#
      const resposta = await fetch('http://localhost:5209/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          email: email, 
          passwordHash: password // O backend espera o campo com este nome no JSON
        })
      });

      if (resposta.ok) {
        const dados = await resposta.json();
        
        // Guarda o "crachá" de acesso (Token) e o nome do membro no browser
        localStorage.setItem('token', dados.token);
        localStorage.setItem('nomeAdmin', dados.nome);
        localStorage.setItem('cargoAdmin', dados.cargo);
        
        // Abre as portas da Central!
        navigate('/central-admin');
      } else {
        setErro('Email ou password incorretos. Tente novamente.');
      }
    } catch (error) {
      setErro('Erro de ligação ao servidor. Verifique se a API está a correr.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-slate-200 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-6">
          <div className="w-16 h-16 bg-[#1e2a45] rounded-full flex items-center justify-center mb-4 shadow-md">
            <span className="text-2xl text-orange-500">🛡️</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800">Acesso Restrito</h2>
          <p className="text-sm text-slate-500 text-center mt-2">
            Área exclusiva para elementos autorizados da equipa ULPC Parceiros e Azoia.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Email Operacional</label>
            <input 
              type="email" 
              required 
              placeholder=""
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e2a45] transition"
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1 uppercase">Palavra-passe</label>
            <input 
              type="password" 
              required 
              placeholder=""
              className="w-full px-4 py-3 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1e2a45] transition"
              value={password} 
              onChange={e => setPassword(e.target.value)} 
            />
          </div>

          {erro && (
            <p className="text-red-500 text-xs font-bold text-center bg-red-50 p-2 rounded border border-red-100">
              {erro}
            </p>
          )}

          <button 
            type="submit" 
            disabled={loading}
            className="mt-2 w-full bg-[#1e2a45] hover:bg-slate-800 text-white font-bold py-3 rounded-md transition shadow-md flex justify-center items-center"
          >
            {loading ? 'A verificar...' : 'Entrar no Portal'}
          </button>
        </form>

      </div>
    </div>
  );
}