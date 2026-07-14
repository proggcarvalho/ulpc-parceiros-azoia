export default function Galeria() {
  // Lista de fotografias. Mais tarde, basta trocares o 'url' pelos teus imports locais.
  const fotos = [
    { id: 1, url: "https://images.unsplash.com/photo-1599839619722-39751411ea63?auto=format&fit=crop&w=800&q=80", legenda: "Simulacro na escola primária" },
    { id: 2, url: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=800&q=80", legenda: "Limpeza de faixas florestais" },
    { id: 3, url: "https://images.unsplash.com/photo-1541888001646-3023028d7285?auto=format&fit=crop&w=800&q=80", legenda: "Apoio à população no inverno" },
    { id: 4, url: "https://images.unsplash.com/photo-1591534958611-37d4520930f4?auto=format&fit=crop&w=800&q=80", legenda: "Reunião de coordenação" },
    { id: 5, url: "https://images.unsplash.com/photo-1582216834114-118f6735e263?auto=format&fit=crop&w=800&q=80", legenda: "Verificação de pontos de água" },
    { id: 6, url: "https://images.unsplash.com/photo-1577977464043-4316db11e2f3?auto=format&fit=crop&w=800&q=80", legenda: "Equipa no terreno" }
  ];

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Galeria Operacional</h1>
        <p className="text-slate-600">Registo fotográfico das ações e treinos da nossa equipa.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
        {fotos.map((foto) => (
          <div key={foto.id} className="group overflow-hidden rounded-xl shadow-sm border border-slate-200 bg-white cursor-pointer relative">
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={foto.url}
                alt={foto.legenda}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-4 absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-900 to-transparent pt-12">
              <p className="text-white font-medium text-sm drop-shadow-md">{foto.legenda}</p>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}