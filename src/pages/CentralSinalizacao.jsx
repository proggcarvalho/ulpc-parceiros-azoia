import { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, Circle, Polygon } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Ícone personalizado para o Fogo
const fireIcon = new L.DivIcon({
  html: '<div style="font-size: 24px; filter: drop-shadow(0px 4px 4px rgba(0,0,0,0.5));">🔥</div>',
  className: 'custom-fire-icon',
  iconSize: [30, 30],
  iconAnchor: [15, 15]
});

// --- FUNÇÕES MATEMÁTICAS GEOGRÁFICAS ---
const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Raio da Terra em km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

const getBearing = (lat1, lon1, lat2, lon2) => {
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  let brng = Math.atan2(y, x) * 180 / Math.PI;
  return (brng + 360) % 360;
};

const getDestinationPoint = (lat, lng, distanceKm, bearingDeg) => {
  const R = 6371;
  const d = distanceKm / R;
  const brng = bearingDeg * Math.PI / 180;
  const lat1 = lat * Math.PI / 180;
  const lon1 = lng * Math.PI / 180;
  const lat2 = Math.asin(Math.sin(lat1) * Math.cos(d) + Math.cos(lat1) * Math.sin(d) * Math.cos(brng));
  const lon2 = lon1 + Math.atan2(Math.sin(brng) * Math.sin(d) * Math.cos(lat1), Math.cos(d) - Math.sin(lat1) * Math.sin(lat2));
  return [lat2 * 180 / Math.PI, lon2 * 180 / Math.PI];
};

const gerarCone = (center, radiusKm, bearing, angle) => {
  if (!center) return [];
  const points = [[center.lat, center.lng]];
  const startAngle = bearing - angle / 2;
  const endAngle = bearing + angle / 2;
  const steps = 30; // Suavidade da curva
  for (let i = 0; i <= steps; i++) {
    const currentAngle = startAngle + (i / steps) * angle;
    points.push(getDestinationPoint(center.lat, center.lng, radiusKm, currentAngle));
  }
  return points;
};

// Dicionário de ângulos do vento
const compassAngles = { N: 0, NE: 45, E: 90, SE: 135, S: 180, SO: 225, O: 270, NO: 315 };

// Componente para capturar cliques no mapa (agora serve para Casos e Fogos)
function CapturaCliqueMapa({ modo, aoClicar }) {
  useMapEvents({
    click(e) {
      if (modo !== 'NENHUM') aoClicar(e.latlng);
    },
  });
  return null;
}

export default function CentralSinalizacao() {
  const [filtro, setFiltro] = useState('Todos');
  const [casos, setCasos] = useState([]);
  
  // Modos de interação do mapa
  const [modoMapa, setModoMapa] = useState('NENHUM'); // 'CASO', 'FOGO', ou 'NENHUM'
  const [novaCoord, setNovaCoord] = useState(null);
  const [form, setForm] = useState({ nome: '', morada: '', prioridade: 'Baixa', observacoes: '' });

  // Estados da Simulação de Incêndio
  const [fogoCoord, setFogoCoord] = useState(null);
  const [raioFogo, setRaioFogo] = useState(1);
  const [usarVento, setUsarVento] = useState(true);
  const [direcaoVento, setDirecaoVento] = useState('SE');
  const [aberturaCone, setAberturaCone] = useState(110);
  
  const centro = [39.7333, -8.8215]; 

  const carregarCasos = async () => {
    try {
      const resposta = await fetch('http://localhost:5209/api/casos');
      const dados = await resposta.json();
      setCasos(dados);
    } catch (erro) {
      console.error("Erro ao carregar:", erro);
    }
  };

  useEffect(() => { carregarCasos(); }, []);

  // Calcular quais casos estão realmente na zona de risco
  const casosEmRiscoIds = useMemo(() => {
    if (!fogoCoord) return [];
    return casos.filter(caso => {
      if (!caso.latitude || !caso.longitude) return false;
      const dist = getDistance(fogoCoord.lat, fogoCoord.lng, caso.latitude, caso.longitude);
      if (dist > raioFogo) return false;
      if (!usarVento) return true;
      
      const bearing = getBearing(fogoCoord.lat, fogoCoord.lng, caso.latitude, caso.longitude);
      const windDeg = compassAngles[direcaoVento];
      let diff = Math.abs(bearing - windDeg);
      if (diff > 180) diff = 360 - diff;
      return diff <= aberturaCone / 2;
    }).map(c => c.id);
  }, [casos, fogoCoord, raioFogo, usarVento, direcaoVento, aberturaCone]);

  const handleSubmitCaso = async (e) => {
    e.preventDefault();
    const casoPronto = { ...form, latitude: novaCoord ? novaCoord.lat : 0, longitude: novaCoord ? novaCoord.lng : 0 };
    try {
      const resposta = await fetch('http://localhost:5209/api/casos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(casoPronto),
      });
      if (resposta.ok) {
        setModoMapa('NENHUM'); setNovaCoord(null); setForm({ nome: '', morada: '', prioridade: 'Baixa', observacoes: '' });
        carregarCasos();
      }
    } catch (erro) { console.error(erro); }
  };

  const apagarCaso = async (id, nome) => {
    if (window.confirm(`Tens a certeza que queres remover o caso de ${nome}?`)) {
      try {
        const resposta = await fetch(`http://localhost:5209/api/casos/${id}`, { method: 'DELETE' });
        if (resposta.ok) carregarCasos();
      } catch (erro) { console.error(erro); }
    }
  };

  // Filtragem
  const casosFiltrados = casos.filter(c => {
    if (filtro === 'Em risco') return casosEmRiscoIds.includes(c.id);
    return filtro === 'Todos' || c.prioridade === filtro;
  });

  const contadores = {
    Alta: casos.filter(c => c.prioridade === 'Alta').length,
    Média: casos.filter(c => c.prioridade === 'Média').length,
    Baixa: casos.filter(c => c.prioridade === 'Baixa').length,
  };

  const casosRiscoAlta = casos.filter(c => casosEmRiscoIds.includes(c.id) && c.prioridade === 'Alta').length;

  return (
    <div className="flex flex-col h-[85vh] bg-white border border-slate-200 rounded-xl shadow-lg overflow-hidden mt-4">
      <div className="bg-[#1e2a45] text-white px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4 z-20">
        <div>
          <p className="text-[10px] text-slate-300 font-semibold tracking-widest uppercase mb-1">
            ULPC - União de Freguesias de Parceiros e Azoia
          </p>
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">Central de Comando de Ocorrências</h1>
        </div>
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

      <div className="flex flex-col md:flex-row flex-1 overflow-hidden relative">
        
        {/* ÁREA DO MAPA (ESQUERDA) */}
        <div className={`w-full md:w-2/3 h-[50vh] md:h-full z-0 relative ${modoMapa !== 'NENHUM' ? 'cursor-crosshair' : ''}`}>
          
          {modoMapa === 'CASO' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-orange-500 text-white px-6 py-2 rounded-full shadow-lg font-bold animate-pulse pointer-events-none">
              📍 Clique no mapa para definir a morada do caso
            </div>
          )}
          {modoMapa === 'FOGO' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-red-600 text-white px-6 py-2 rounded-full shadow-lg font-bold animate-pulse pointer-events-none">
              🔥 Clique no mapa para definir a origem do incêndio
            </div>
          )}

          <MapContainer center={centro} zoom={14} style={{ height: '100%', width: '100%' }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            
            <CapturaCliqueMapa 
              modo={modoMapa} 
              aoClicar={(coords) => {
                if (modoMapa === 'CASO') setNovaCoord(coords);
                if (modoMapa === 'FOGO') { setFogoCoord(coords); setModoMapa('NENHUM'); }
              }} 
            />

            {/* Simulação de Fogo renderizada no mapa */}
            {fogoCoord && (
              <>
                <Marker position={[fogoCoord.lat, fogoCoord.lng]} icon={fireIcon}>
                  <Popup>Foco de Incêndio</Popup>
                </Marker>
                
                {/* Círculo Geral Tracejado */}
                <Circle 
                  center={[fogoCoord.lat, fogoCoord.lng]} 
                  radius={raioFogo * 1000} 
                  pathOptions={{ color: 'red', fillOpacity: 0.1, dashArray: '5, 10', weight: 2 }} 
                />

                {/* Cone do Vento */}
                {usarVento && (
                  <Polygon 
                    positions={gerarCone(fogoCoord, raioFogo, compassAngles[direcaoVento], aberturaCone)}
                    pathOptions={{ color: 'red', fillColor: '#ef4444', fillOpacity: 0.3, weight: 1 }}
                  />
                )}
              </>
            )}

            {/* Marcador temp do formulário */}
            {modoMapa === 'CASO' && novaCoord && (
               <Marker position={[novaCoord.lat, novaCoord.lng]}><Popup>Localização selecionada.</Popup></Marker>
            )}

            {/* Casos da BD */}
            {casosFiltrados.map((caso) => (
              caso.latitude !== 0 && caso.longitude !== 0 && (
                <Marker key={caso.id} position={[caso.latitude, caso.longitude]}>
                  <Popup className="custom-popup">
                    <div className="p-0.5">
                      <h4 className="font-bold text-slate-800 text-[15px] mb-0.5">
                        {caso.nome} {casosEmRiscoIds.includes(caso.id) && '🔥'}
                      </h4>
                      <p className="text-xs text-slate-600 mb-1">{caso.morada}</p>
                      <p className={`text-xs font-bold mb-1.5 uppercase ${caso.prioridade === 'Alta' ? 'text-red-500' : caso.prioridade === 'Média' ? 'text-yellow-500' : 'text-green-500'}`}>
                        {caso.prioridade} {casosEmRiscoIds.includes(caso.id) && '- EM RISCO EXTREMO'}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              )
            ))}
          </MapContainer>

          {/* PAINEL FLUTUANTE DE SIMULAÇÃO DE INCÊNDIO */}
          <div className="absolute bottom-4 left-4 z-[1000] bg-white p-5 rounded-lg shadow-xl border border-slate-200 w-72 max-h-[80vh] overflow-y-auto">
            <h3 className="font-bold text-red-600 mb-2 flex items-center gap-2">🔥 Simulação de incêndio</h3>
            
            {fogoCoord ? (
              <div className="text-[10px] text-slate-500 mb-4 bg-slate-50 p-2 rounded">
                Foco definido em {fogoCoord.lat.toFixed(5)}, {fogoCoord.lng.toFixed(5)}. Ajuste os parâmetros abaixo.
              </div>
            ) : (
              <button 
                onClick={() => setModoMapa('FOGO')}
                className="w-full bg-red-100 hover:bg-red-200 text-red-700 font-bold py-2 rounded mb-4 text-xs transition"
              >
                📍 Marcar Origem no Mapa
              </button>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Raio de Ação (KM)</label>
                <input type="number" step="0.1" value={raioFogo} onChange={(e) => setRaioFogo(parseFloat(e.target.value) || 0)} className="w-full text-sm p-2 border border-slate-300 rounded" />
              </div>

              <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
                <input type="checkbox" checked={usarVento} onChange={(e) => setUsarVento(e.target.checked)} className="rounded text-red-600 focus:ring-red-500" />
                Considerar direção do vento (cone)
              </label>

              {usarVento && (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Direção do Vento (Sopra para)</label>
                    <div className="grid grid-cols-3 gap-1">
                      {['NO', 'N', 'NE', 'O', '', 'E', 'SO', 'S', 'SE'].map((dir, i) => (
                        dir === '' ? <div key={i} /> : (
                          <button 
                            key={dir} 
                            onClick={() => setDirecaoVento(dir)}
                            className={`py-1 text-xs font-bold rounded border ${direcaoVento === dir ? 'bg-[#1e2a45] text-white border-[#1e2a45]' : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'}`}
                          >
                            {dir}
                          </button>
                        )
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-600 uppercase mb-1">Abertura do Cone (Graus)</label>
                    <input type="number" value={aberturaCone} onChange={(e) => setAberturaCone(parseFloat(e.target.value) || 0)} className="w-full text-sm p-2 border border-slate-300 rounded" />
                  </div>
                </>
              )}

              <div className="flex gap-2 pt-2">
                <button onClick={() => setFogoCoord(null)} className="flex-1 bg-white border border-slate-300 text-slate-600 hover:bg-slate-50 text-xs font-bold py-2 rounded transition">
                  Limpar
                </button>
                <button onClick={() => setFiltro('Em risco')} className="flex-1 bg-[#b23b3b] hover:bg-red-800 text-white text-xs font-bold py-2 rounded transition shadow">
                  Casos em Risco
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* BARRA LATERAL (DIREITA) */}
        <div className="w-full md:w-1/3 bg-white flex flex-col z-10 md:border-l border-slate-200 relative">
          
          {modoMapa !== 'CASO' ? (
            <>
              <div className="p-5 border-b border-slate-100">
                <h2 className="text-lg font-bold text-slate-800 mb-1">Casos Sinalizados</h2>
                <p className="text-xs text-slate-500 mb-4">Filtrar lista por nível de risco</p>
                
                {/* ALERTA DE RISCO (Visível apenas se houver simulação) */}
                {fogoCoord && (
                  <div className="bg-red-50 border border-red-200 text-red-800 p-3 rounded text-xs mb-4">
                    <span className="font-bold">{casosEmRiscoIds.length} caso(s)</span> na zona de risco do incêndio — <span className="font-bold">{casosRiscoAlta} de prioridade alta</span>. Consulte o separador "Em risco".
                  </div>
                )}

                <div className="flex rounded-md border border-slate-200 overflow-hidden">
                  {['Todos', 'Alta', 'Média', 'Baixa', 'Em risco'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFiltro(tab)}
                      className={`flex-1 py-1.5 text-xs font-medium transition ${
                        filtro === tab 
                          ? (tab === 'Em risco' ? 'bg-red-600 text-white' : 'bg-[#1e2a45] text-white') 
                          : (tab === 'Em risco' ? 'bg-white text-red-600 hover:bg-red-50' : 'bg-white text-slate-600 hover:bg-slate-50')
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 pb-20">
                {casosFiltrados.length === 0 && <p className="text-sm text-center text-slate-400 mt-10">Nenhum caso encontrado.</p>}
                
                {casosFiltrados.map((caso) => {
                  const emRisco = casosEmRiscoIds.includes(caso.id);
                  return (
                    <div key={caso.id} className={`border-l-4 p-4 rounded-r-lg shadow-sm border-t border-b border-r border-slate-100 mb-3 hover:bg-slate-50 transition ${
                      emRisco ? 'border-red-600 bg-red-50/30' :
                      caso.prioridade === 'Alta' ? 'border-red-500 bg-red-50/10' :
                      caso.prioridade === 'Média' ? 'border-yellow-500 bg-yellow-50/10' :
                      'border-green-500 bg-green-50/10'
                    }`}>
                      <div className="flex justify-between items-start mb-1">
                        <h3 className="font-semibold text-slate-800">{caso.nome} {emRisco && '🔥'}</h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-bold tracking-wide ${caso.prioridade === 'Alta' ? 'text-red-500' : caso.prioridade === 'Média' ? 'text-yellow-600' : 'text-green-600'}`}>
                            {caso.prioridade.toUpperCase()}
                          </span>
                          <button onClick={() => apagarCaso(caso.id, caso.nome)} className="text-slate-400 hover:text-red-500 text-sm font-bold transition ml-2" title="Resolver Caso">✕</button>
                        </div>
                      </div>
                      <p className="text-xs text-slate-600 mb-1">{caso.morada}</p>
                      <p className="text-[11px] text-slate-500 italic truncate">{caso.observacoes}</p>
                    </div>
                  );
                })}
              </div>

              {/* Botão flutuante Novo Caso */}
              <button 
                onClick={() => setModoMapa('CASO')}
                className="absolute bottom-6 right-6 bg-[#b27e46] hover:bg-[#8e6132] text-white font-bold py-3 px-6 rounded-full shadow-lg transition"
              >
                + Novo caso
              </button>
            </>
          ) : (
            /* Formulário lateral de Novo Caso (mantém-se igual) */
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 h-full">
              <div className="flex justify-between items-center mb-6 border-b border-slate-200 pb-3">
                <h2 className="text-lg font-bold text-slate-800">Registar Ocorrência</h2>
                <button onClick={() => {setModoMapa('NENHUM'); setNovaCoord(null);}} className="text-slate-400 hover:text-slate-600 text-sm font-bold">✕ Cancelar</button>
              </div>
              <form onSubmit={handleSubmitCaso} className="flex flex-col gap-4">
                <div><label className="block text-xs font-bold text-slate-600 mb-1">Nome</label><input type="text" required className="w-full text-sm p-2 border border-slate-300 rounded" value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} /></div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1">Morada</label><input type="text" required className="w-full text-sm p-2 border border-slate-300 rounded" value={form.morada} onChange={e => setForm({...form, morada: e.target.value})} /></div>
                <div className="bg-white p-3 border border-slate-200 rounded text-center">
                  <label className="block text-xs font-bold text-slate-600 mb-2">Localização GPS</label>
                  {novaCoord ? <span className="text-xs font-mono bg-green-100 text-green-700 px-2 py-1 rounded">Capturado! ✅</span> : <span className="text-xs text-orange-600 font-medium animate-pulse">Aguardando clique no mapa...</span>}
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-600 mb-1">Prioridade</label>
                  <select className="w-full text-sm p-2 border border-slate-300 rounded" value={form.prioridade} onChange={e => setForm({...form, prioridade: e.target.value})}>
                    <option value="Baixa">Baixa</option><option value="Média">Média</option><option value="Alta">Alta</option>
                  </select>
                </div>
                <div><label className="block text-xs font-bold text-slate-600 mb-1">Detalhes</label><textarea rows="3" className="w-full text-sm p-2 border border-slate-300 rounded" value={form.observacoes} onChange={e => setForm({...form, observacoes: e.target.value})} /></div>
                <button type="submit" className="w-full mt-2 bg-[#1e2a45] text-white font-bold py-3 rounded">Gravar</button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}