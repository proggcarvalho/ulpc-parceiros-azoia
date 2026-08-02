import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logoUlpc from '../assets/logo_ULPC1.png'; // Confirma se o caminho da imagem está correto!

export default function Login() {
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Senha provisória para a apresentação (podes mudar para o que quiseres)
    if (password === 'ulpc2026') {
      localStorage.setItem('ulpc_admin_auth', 'true');
      navigate('/central-admin');
    } else {
      setErro(true);
      setPassword('');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh]">
      <div className="bg-white p-8 rounded-xl shadow-md border border-slate-200 w-full max-w-md">
        
        <div className="flex flex-col items-center mb-8">
          <img src={logoUlpc} alt="Logótipo ULPC" className="w-20 h-20 object-contain mix-blend-multiply mb-4" />
          <h1 className="text-2xl font-bold text-slate-800">Acesso Restrito</h1>
          <p className="text-sm text-slate-500 mt-1 text-center">
            Área exclusiva para elementos autorizados da equipa ULPC Parceiros e Azoia.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Código de Acesso
            </label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setErro(false);
              }}
              placeholder="Introduza a password..."
              className={`w-full bg-slate-50 border ${erro ? 'border-red-500' : 'border-slate-300'} rounded-lg py-2.5 px-4 focus:outline-none focus:ring-2 focus:ring-blue-800 transition`}
            />
            {erro && <p className="text-xs text-red-500 mt-1.5 font-medium">Código incorreto. Tente novamente.</p>}
          </div>

          <button 
            type="submit"
            className="w-full bg-[#1e2a45] text-white font-semibold py-2.5 rounded-lg hover:bg-blue-900 transition mt-2 shadow-sm"
          >
            Entrar no Portal
          </button>
        </form>
        
      </div>
    </div>
  );
}