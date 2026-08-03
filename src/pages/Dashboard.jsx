import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [casos, setCasos] = useState([]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        const resposta = await fetch('http://localhost:5209/api/casos');
        if (resposta.ok) {
          const dados = await resposta.json();
          setCasos(dados);
        }
      } catch (erro) {
        console.error("Erro ao carregar estatísticas:", erro);
      }
    };
    carregarDados();
  }, []);

  // Cálculos Estatísticos
  const total = casos.length;
  const alta = casos.filter(c => c.prioridade === 'Alta').length;
  const media = casos.filter(c => c.prioridade === 'Média').length;
  const baixa = casos.filter(c => c.prioridade === 'Baixa').length;

  const percAlta = total === 0 ? 0 : Math.round((alta / total) * 100);
  const percMedia = total === 0 ? 0 : Math.round((media / total) * 100);
  const percBaixa = total === 0 ? 0 : Math.round((baixa / total) * 100);

  return (
    <div className="p-6 bg-slate-50 min-h-[85vh]">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex items-center gap-3 mb-8 border-b border-slate-200 pb-4">
          <span className="text-3xl">📊</span>
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Dashboard de Ocorrências</h1>
            <p className="text-sm text-slate-500">Ponto de situação geral da Proteção Civil</p>
          </div>
        </div>

        {/* Cartões de Resumo */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-[#1e2a45] mb-2">{total}</span>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total de Casos</span>
          </div>
          <div className="bg-red-50 p-6 rounded-xl shadow-sm border border-red-100 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-red-600 mb-2">{alta}</span>
            <span className="text-xs font-bold text-red-800 uppercase tracking-wider">Risco Alto</span>
          </div>
          <div className="bg-yellow-50 p-6 rounded-xl shadow-sm border border-yellow-100 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-yellow-600 mb-2">{media}</span>
            <span className="text-xs font-bold text-yellow-800 uppercase tracking-wider">Risco Médio</span>
          </div>
          <div className="bg-green-50 p-6 rounded-xl shadow-sm border border-green-100 flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-green-600 mb-2">{baixa}</span>
            <span className="text-xs font-bold text-green-800 uppercase tracking-wider">Risco Baixo</span>
          </div>
        </div>

        {/* Gráficos Visuais (CSS Puro) */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-bold text-slate-800 mb-6">Distribuição de Prioridades</h2>
          
          <div className="space-y-6">
            {/* Barra Alta */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-red-600">Alta Prioridade</span>
                <span className="text-slate-600">{percAlta}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div className="bg-red-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${percAlta}%` }}></div>
              </div>
            </div>

            {/* Barra Média */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-yellow-600">Média Prioridade</span>
                <span className="text-slate-600">{percMedia}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div className="bg-yellow-400 h-4 rounded-full transition-all duration-1000" style={{ width: `${percMedia}%` }}></div>
              </div>
            </div>

            {/* Barra Baixa */}
            <div>
              <div className="flex justify-between text-sm font-bold mb-1">
                <span className="text-green-600">Baixa Prioridade</span>
                <span className="text-slate-600">{percBaixa}%</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden">
                <div className="bg-green-500 h-4 rounded-full transition-all duration-1000" style={{ width: `${percBaixa}%` }}></div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}