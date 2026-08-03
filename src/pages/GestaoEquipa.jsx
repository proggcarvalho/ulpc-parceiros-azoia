import React, { useState, useEffect } from 'react';

export default function GestaoEquipa() {
  const [membros, setMembros] = useState([]);
  const [form, setForm] = useState({ nome: '', email: '', passwordHash: '', cargo: 'Operacional' });
  const [mensagem, setMensagem] = useState('');

  // 1. Carregar a lista de operacionais
  const carregarMembros = async () => {
    try {
      const resposta = await fetch('http://localhost:5209/api/auth/membros');
      if (resposta.ok) {
        const dados = await resposta.json();
        setMembros(dados);
      }
    } catch (erro) {
      console.error("Erro ao carregar equipa:", erro);
    }
  };

  useEffect(() => {
    carregarMembros();
  }, []);

  // 2. Adicionar novo membro
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem('');

    try {
      const resposta = await fetch('http://localhost:5209/api/auth/registar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (resposta.ok) {
        setMensagem('✅ Operacional adicionado com sucesso!');
        setForm({ nome: '', email: '', passwordHash: '', cargo: 'Operacional' });
        carregarMembros(); // Atualiza a lista automaticamente
      } else {
        setMensagem('❌ Erro: Esse email já deve estar registado.');
      }
    } catch (erro) {
      setMensagem('❌ Erro de ligação ao servidor.');
    }
  };

  return (
    <div className="p-6 bg-slate-50 min-h-[85vh]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-6">
        
        {/* Lado Esquerdo: Formulário de Adição */}
        <div className="w-full md:w-1/3 bg-white p-6 rounded-xl shadow-md border border-slate-200 h-fit">
          <div className="flex items-center gap-3 mb-6 border-b border-slate-100 pb-4">
            <span className="text-2xl">🛡️</span>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Novo Operacional</h2>
              <p className="text-xs text-slate-500">Adicionar acesso à plataforma</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Nome Completo</label>
              <input type="text" required className="w-full text-sm p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#1e2a45] outline-none" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Email</label>
              <input type="email" required className="w-full text-sm p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#1e2a45] outline-none" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Palavra-passe (Temporária)</label>
              <input type="password" required className="w-full text-sm p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#1e2a45] outline-none" value={form.passwordHash} onChange={e => setForm({...form, passwordHash: e.target.value})} />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Cargo</label>
              <select className="w-full text-sm p-2.5 border border-slate-300 rounded focus:ring-2 focus:ring-[#1e2a45] outline-none" value={form.cargo} onChange={e => setForm({...form, cargo: e.target.value})}>
                <option value="Operacional">Operacional</option>
                <option value="Coordenador">Coordenador</option>
                <option value="Admin">Administrador</option>
              </select>
            </div>

            <button type="submit" className="w-full mt-2 bg-[#1e2a45] hover:bg-slate-800 text-white font-bold py-3 rounded transition shadow">
              Criar Acesso
            </button>
            
            {mensagem && <p className="text-xs font-bold text-center mt-3 text-slate-700">{mensagem}</p>}
          </form>
        </div>

        {/* Lado Direito: Lista de Equipa */}
        <div className="w-full md:w-2/3 bg-white p-6 rounded-xl shadow-md border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Equipa Registada ({membros.length})</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {membros.map(membro => (
              <div key={membro.id} className="p-4 border border-slate-200 rounded-lg flex items-start gap-4 hover:shadow-md transition bg-slate-50">
                <div className="w-12 h-12 bg-[#1e2a45] rounded-full flex items-center justify-center text-white font-bold text-lg shrink-0 shadow-inner">
                  {membro.nome.charAt(0).toUpperCase()}
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-800 truncate">{membro.nome}</h3>
                  <p className="text-xs text-slate-500 truncate mb-1">{membro.email}</p>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    membro.cargo === 'Coordenador' || membro.cargo === 'Admin' 
                    ? 'bg-orange-100 text-orange-700 border border-orange-200' 
                    : 'bg-blue-100 text-blue-700 border border-blue-200'
                  }`}>
                    {membro.cargo.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}