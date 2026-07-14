import imgCastelo from '../assets/CasteloLeiria.jpg'; // <-- 1. Importar a imagem do Castelo

export default function Home() {
  return (
    <div className="flex flex-col gap-8">
      
      {/* Secção Principal (Hero) com Imagem de Fundo */}
      <section className="relative rounded-2xl overflow-hidden shadow-sm border border-slate-200 min-h-[400px] flex items-center justify-center">
        
        {/* A imagem de fundo a ocupar o espaço todo */}
        <img 
          src={imgCastelo} 
          alt="Castelo de Leiria" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        
        {/* Camada escura semitransparente para o texto ser legível */}
        <div className="absolute inset-0 bg-slate-900/70"></div>

        {/* O Texto por cima da imagem */}
        <div className="relative z-10 text-center p-8 md:p-12">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Unidade Local de Proteção Civil
          </h1>
          <h2 className="text-xl md:text-2xl text-orange-400 font-semibold mb-6 drop-shadow-md">
            Parceiros e Azoia
          </h2>
          <p className="text-slate-200 max-w-2xl mx-auto text-lg drop-shadow">
            A nossa missão é garantir a segurança, prevenir riscos e apoiar a comunidade local em situações de emergência e catástrofe.
          </p>
        </div>
      </section>

      {/* Cartões de Informação Rápida */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Cartão Alertas */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-orange-300 transition">
          <div className="text-3xl mb-3">🚨</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Estado de Alerta</h3>
          <p className="text-slate-600 text-sm">
            Neste momento não existem alertas ativos graves na freguesia.
          </p>
        </div>

        {/* Cartão Emergência */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-orange-300 transition">
          <div className="text-3xl mb-3">📞</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">Emergência</h3>
          <p className="text-slate-600 text-sm mb-2">
            Em caso de emergência médica ou incêndio, ligue sempre <strong>112</strong>.
          </p>
        </div>

        {/* Cartão Contactos Base */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:border-orange-300 transition">
          <div className="text-3xl mb-3">📍</div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">A Nossa Base</h3>
          <p className="text-slate-600 text-sm">
            Junta de Freguesia de Parceiros e Azoia.
          </p>
        </div>
      </section>
    </div>
  );
}