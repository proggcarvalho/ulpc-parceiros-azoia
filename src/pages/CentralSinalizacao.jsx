import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Truque para corrigir o ícone do marcador que costuma desaparecer no Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Componente invisível que deteta cliques no mapa
function CapturaCliqueMapa({ modoAdicao, aoClicar }) {
  useMapEvents({
    click(e) {
      if (modoAdicao) {
        aoClicar(e.latlng);
      }
    },
  });
  return null;
}

export default function CentralSinalizacao() {
  const [filtro, setFiltro] = useState('Todos');
  const [casos, setCasos] = useState([]);
  
  // Estados para controlar o formulário e o clique no mapa
  const [modoAdicao, setModoAdicao] = useState(false);
  const [novaCoord, setNovaCoord] = useState(null);
  const [form, setForm] = useState({ nome: '', morada: '', prioridade: 'Baixa', observacoes: '' });

  // Coordenadas centrais de Parceiros / Azoia
  const centro = [39.7333, -8.8215]; 

  // 1. Ir buscar os casos ao MySQL
  const carregarCasos = async () => {
    try {
      const resposta = await fetch('http://localhost:5209/api/casos');
      const dados = await resposta.json();
      setCasos(dados);
    } catch (erro) {
      console.error("Erro ao carregar casos:", erro);
    }
  };

  useEffect(() => {
    carregarCasos();
  }, []);

  // 2. Enviar um caso novo para a API
  const handleSubmit = async (e) => {
    e.preventDefault();
    const casoPronto = {
      ...form,
      latitude: novaCoord ? novaCoord.lat : 0,
      longitude: novaCoord ? novaCoord.lng : 0
    };

    try {
      const resposta = await fetch('http://localhost:5209/api/casos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(casoPronto),
      });

      if (resposta.ok) {
        alert('Caso guardado na base de dados com sucesso!');
        setModoAdicao(false);
        setNovaCoord(null);
        setForm({ nome: '', morada: '', prioridade: 'Baixa', observacoes: '' });
        carregarCasos();
      }
    } catch (erro) {
      console.error("Erro na submissão:", erro);
    }
  };

  // 3. Apagar um caso da API
  const apagarCaso = async (id, nome) => {
    if (window.confirm(`Tens a certeza que queres remover o caso de ${nome}?`)) {
      try {
        const resposta = await fetch(`http://localhost:5209/api/casos/${id}`, {
          method: 'DELETE',
        });

        if (resposta.ok) {
          // Recarrega a lista para o caso desaparecer do ecrã e do mapa automaticamente
          carregarCasos();
        }
      } catch (erro) {
        console.error("Erro ao apagar:", erro);
      }
    }
  };

  // Cálculos dinâmicos para a interface
  const casosFiltrados = casos.filter(c => filtro === 'Todos' || c.prioridade === filtro);
  const contadores = {
    Alta: casos.filter(c => c.prioridade === 'Alta').length,
    Média: casos.filter(c => c.prioridade === 'Média').length,
    Baixa: casos.filter(c => c.prioridade === 'Baixa').length,
  };

  return (
    <div className="flex flex-col h-[85vh] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden mt-4">
      
      {/* CABEÇALHO AZUL ESCURO */}
      <div className="bg-[#1e2a45] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <p className="text-[10px] text-slate-300 font-semibold tracking-widest uppercase mb-1">
            ULPC - União de Freguesias de Parceiros e Azoia
          </p>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            Central de Comando de Ocorrências
          </h1>
        </div>
        
        {/* Contadores Dinâmicos */}
        <div className="flex gap-6 md:gap-8 text-center">
          <div>
            <p className="text-xs text-slate-300 font-medium">Prioridade alta</p>
            <p className="text-xl font-bold text-red-400">{contadores.Alta}</p>
          </div>
          <div>
            <p className="text-xs text-slate-300 font-medium">Prioridade média</p>
            <p className="text-xl font-bold text-yellow-400">{contadores.Média}</p>
          </div>
          <div>
            <p className="text-xs text-slate-300 font-medium">Prioridade baixa</p>
            <p className="text-xl font-bold text-green-400">{contadores.Baixa}</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden">
        
        {/* ÁREA DO MAPA (ESQUERDA) */}
        <div className={`w-full md:w-2/3 h-[50vh] md:h-full z-0 relative ${modoAdicao ? 'cursor-crosshair' : ''}`}>
          
          {modoAdicao && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-orange-500 text-white px-6 py-2 rounded-full shadow-lg font-bold animate-pulse pointer-events-none">
              📍 Clique num ponto do mapa para definir o local
            </div>
          )}

          <MapContainer center={centro} zoom={14} style={{ height: '100%', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            />
            
            {/* Ativa a deteção de cliques no mapa */}
            <CapturaCliqueMapa modoAdicao={modoAdicao} aoClicar={setNovaCoord} />

            {/* Marcador temporário enquanto o admin escolhe o local */}
            {modoAdicao && novaCoord && (
               <Marker position={[novaCoord.lat, novaCoord.lng]}>
                 <Popup>Local selecionado para o novo caso.</Popup>
               </Marker>
            )}

            {/* Renderizar os casos da Base de Dados */}
            {casosFiltrados.map((caso) => (
              caso.latitude !== 0 && caso.longitude !== 0 && (
                <Marker key={caso.id} position={[caso.latitude, caso.longitude]}>
                  <Popup className="custom-popup">
                    <div className="p-0.5">
                      <h4 className="font-bold text-slate-800 text-[15px] mb-0.5">{caso.nome}</h4>
                      <p className="text-xs text-slate-600 mb-1">{caso.morada}</p>
                      <p className={`text-xs font-bold mb-1.5 uppercase ${
                        caso.prioridade === 'Alta' ? 'text-red-500' : 
                        caso.prioridade === 'Média' ? 'text-yellow-500' : 'text-green-500'
                      }`}>
                        {caso.prioridade}
                      </p>
                      <p className="text-xs text-slate-500 mb-2">{caso.observacoes}</p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>
        </div>

        {/* BARRA LATERAL (DIREITA) */}
        <div className="w-full md:w-1/3 bg-white flex flex-col z-10 md:border-l border-slate-200">
          
          {/* Se NÃO estiver a adicionar caso, mostra a lista */}
          {!modoAdicao ? (
            <>
              <div className="p-5 border-b border-slate-100 flex justify-between items-center">
                <div>
                  <h2 className="text-lg font-bold text-slate-800 mb-1">Sinalizações</h2>
                  <p className="text-xs text-slate-500">Filtrar por nível de risco</p>
                </div>
                <button 
                  onClick={() => setModoAdicao(true)}
                  className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-3 rounded shadow transition"
                >
                  + Novo Caso
                </button>
              </div>
              
              <div className="px-5 pt-4 pb-2">
                <div className="flex rounded-md border border-slate-200 overflow-hidden">
                  {['Todos', 'Alta', 'Média', 'Baixa'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFiltro(tab)}
                      className={`flex-1 py-1.5 text-xs font-medium transition ${
                        filtro === tab 
                          ? 'bg-[#1e2a45] text-white' 
                          : 'bg-white text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5">
                {casosFiltrados.length === 0 && (
                  <p className="text-sm text-center text-slate-400 mt-10">Nenhum caso encontrado.</p>
                )}
                {casosFiltrados.map((caso) => (
                  <div key={caso.id} className={`border-l-4 p-4 rounded-r-lg shadow-sm border-t border-b border-r border-slate-100 mb-3 hover:bg-slate-50 transition ${
                    caso.prioridade === 'Alta' ? 'border-red-500 bg-red-50/10' :
                    caso.prioridade === 'Média' ? 'border-yellow-500 bg-yellow-50/10' :
                    'border-green-500 bg-green-50/10'
                  }`}>
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-semibold text-slate-800">{caso.nome}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold tracking-wide ${
                          caso.prioridade === 'Alta' ? 'text-red-500' :
                          caso.prioridade === 'Média' ? 'text-yellow-600' :
                          'text-green-600'
                        }`}>
                          {caso.prioridade.toUpperCase()}
                        </span>
                        
                        {/* Botão de Remover */}
                        <button 
                          onClick={() => apagarCaso(caso.id, caso.nome)}
                          className="text-slate-400 hover:text-red-500 text-sm font-bold transition ml-2"
                          title="Resolver/Remover Caso"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-600 mb-1">{caso.morada}</p>
                    <p className="text-[11px] text-slate-500 italic truncate">{caso.observacoes}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* Formulário lateral de Novo Caso */
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                <h2 className="text-lg font-bold text-slate-800">Registar Ocorrência</h2>
                <button onClick={() => {setModoAdicao(false); setNovaCoord(null);}} className="text-slate-400 hover:text-slate-600 text-sm font-bold">
                  ✕ Cancelar
                </button>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Nome / Identificação</label>
                  <input type="text" required className="w-full text-sm p-2 border border-slate-300 rounded" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Morada</label>
                  <input type="text" required className="w-full text-sm p-2 border border-slate-300 rounded" value={form.morada} onChange={e => setForm({...form, morada: e.target.value})} />
                </div>

                <div className="bg-white p-3 border border-slate-200 rounded text-center">
                  <label className="block text-xs font-bold text-slate-600 mb-2">Localização GPS</label>
                  {novaCoord ? (
                    <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded">Capturado! ✅</span>
                  ) : (
                    <span className="text-xs text-orange-600 font-medium animate-pulse">Aguardando clique no mapa...</span>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Prioridade</label>
                  <select className="w-full text-sm p-2 border border-slate-300 rounded" value={form.prioridade} onChange={e => setForm({...form, prioridade: e.target.value})}>
                    <option value="Baixa">Baixa</option>
                    <option value="Média">Média</option>
                    <option value="Alta">Alta</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Detalhes (Opcional)</label>
                  <textarea rows="3" className="w-full text-sm p-2 border border-slate-300 rounded" value={form.observacoes} onChange={e => setForm({...form, observacoes: e.target.value})} />
                </div>

                <button type="submit" className="w-full mt-2 bg-[#1e2a45] hover:bg-slate-800 text-white font-bold py-3 rounded transition shadow-md">
                  Gravar e Enviar
                </button>
              </form>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}