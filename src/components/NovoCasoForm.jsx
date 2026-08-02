import React, { useState, useEffect } from 'react';

export default function NovoCasoForm() {
  const [form, setForm] = useState({
    nome: '',
    morada: '',
    latitude: 0,
    longitude: 0,
    prioridade: 'Baixa',
    observacoes: ''
  });

  const [casos, setCasos] = useState([]);

  const carregarCasos = async () => {
    try {
      const resposta = await fetch('http://localhost:5209/api/casos');
      const dados = await resposta.json();
      setCasos(dados);
    } catch (erro) {
      console.error("Erro ao carregar os casos:", erro);
    }
  };

  useEffect(() => {
    carregarCasos();
  }, []);

  // Nova função de GPS
  const obterLocalizacao = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm({
            ...form,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          alert("Não foi possível obter a localização. Verifica se deste permissão ao browser.");
        }
      );
    } else {
      alert("O teu browser não suporta geolocalização.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch('http://localhost:5209/api/casos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (resposta.ok) {
        alert('Caso sinalizado com sucesso!');
        setForm({ nome: '', morada: '', latitude: 0, longitude: 0, prioridade: 'Baixa', observacoes: '' });
        carregarCasos();
      } else {
        alert('Erro ao guardar o caso.');
      }
    } catch (erro) {
      console.error("Erro na submissão:", erro);
    }
  };

  return (
    <div className="max-w-2xl bg-white p-8 rounded-lg shadow-md mt-4">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-2">Sinalizar Novo Caso</h2>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mb-10">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Cidadão</label>
          <input 
            type="text" 
            value={form.nome} 
            onChange={e => setForm({ ...form, nome: e.target.value })} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Morada / Ponto de Referência</label>
          <input 
            type="text" 
            value={form.morada} 
            onChange={e => setForm({ ...form, morada: e.target.value })} 
            required 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Zona das Coordenadas com Botão Mágico */}
        <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
          <div className="flex justify-between items-center mb-3">
            <label className="block text-sm font-bold text-gray-700">Coordenadas (Opcional)</label>
            <button 
              type="button" 
              onClick={obterLocalizacao}
              className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold py-2 px-3 rounded flex items-center gap-1 transition"
            >
              📍 Capturar GPS Atual
            </button>
          </div>
          
          <div className="flex gap-4">
            <div className="w-1/2">
              <input 
                type="number" 
                step="any"
                placeholder="Latitude"
                value={form.latitude === 0 ? '' : form.latitude} 
                onChange={e => setForm({ ...form, latitude: parseFloat(e.target.value) || 0 })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="w-1/2">
              <input 
                type="number" 
                step="any"
                placeholder="Longitude"
                value={form.longitude === 0 ? '' : form.longitude} 
                onChange={e => setForm({ ...form, longitude: parseFloat(e.target.value) || 0 })} 
                className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Nível de Risco / Prioridade</label>
          <select 
            value={form.prioridade} 
            onChange={e => setForm({ ...form, prioridade: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="Baixa">Baixa</option>
            <option value="Média">Média</option>
            <option value="Alta">Alta</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Observações da Ocorrência</label>
          <textarea 
            rows="3"
            placeholder="Descreva a vulnerabilidade (ex: Idoso com mobilidade reduzida, casa em zona de cheias...)" 
            value={form.observacoes} 
            onChange={e => setForm({ ...form, observacoes: e.target.value })} 
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button 
          type="submit" 
          className="mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-md transition duration-300"
        >
          Registar na Base de Dados
        </button>
      </form>

      <h2 className="text-xl font-bold text-slate-800 mb-4 border-b pb-2">Casos Registados</h2>
      {casos.length === 0 ? (
        <p className="text-gray-500 italic">Nenhum caso registado na base de dados.</p>
      ) : (
        <ul className="space-y-3">
          {casos.map((caso) => (
            <li key={caso.id} className="bg-slate-50 p-4 rounded-md border border-slate-200">
              <div className="flex justify-between items-start mb-2">
                <strong className="text-lg text-slate-700">{caso.nome}</strong>
                <span className={`px-2 py-1 rounded text-xs font-bold ${
                  caso.prioridade === 'Alta' ? 'bg-red-100 text-red-700' : 
                  caso.prioridade === 'Média' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {caso.prioridade}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-1"><span className="font-semibold">Morada:</span> {caso.morada}</p>
              <p className="text-sm text-gray-600 mb-2"><span className="font-semibold">Obs:</span> {caso.observacoes}</p>
              {caso.latitude !== 0 && (
                 <p className="text-xs text-blue-600 mb-2 hover:underline">
                   <a href={`https://www.google.com/maps/search/?api=1&query=${caso.latitude},${caso.longitude}`} target="_blank" rel="noreferrer">
                     Abrir no Google Maps
                   </a>
                 </p>
              )}
              <p className="text-xs text-gray-400">Registado a: {new Date(caso.dataRegisto).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}