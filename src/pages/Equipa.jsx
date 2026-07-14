export default function Equipa() {
  // Dados estruturados baseados no Organigrama
  const pilares = [
    {
      id: 'A',
      titulo: 'Prevenção e Riscos',
      elementos: '5 elementos',
      corHeader: 'bg-amber-100 text-amber-900 border-amber-300',
      corCargo: 'text-amber-700',
      equipas: [
        { cargo: 'Responsável de área', desc: 'Coordena equipa de prevenção', nomes: ['José Lemos'] },
        { cargo: 'Técnicos de levantamento', desc: 'Riscos, pontos de água, caminhos', nomes: ['Daniel Pereira', 'Tiago Sousa'] },
        { cargo: 'Apoio admin. / proc. FGC', desc: 'Notificações e contraordenações', nomes: ['Andreia Pinto'] },
        { cargo: 'Vigilante florestal', desc: 'Apoio na época de incêndios', nomes: ['(a atribuir)'] },
      ]
    },
    {
      id: 'B',
      titulo: 'Sensibilização Pública',
      elementos: '6 elementos',
      corHeader: 'bg-blue-100 text-blue-900 border-blue-300',
      corCargo: 'text-blue-700',
      equipas: [
        { cargo: 'Responsável de área', desc: 'Coordena comunicação e formação', nomes: ['Filipa Branco'] },
        { cargo: 'Equipa de sensibilização', desc: 'ASPS, Aldeia Segura, escolas', nomes: ['Simão Pombo', 'Mónica Dias'] },
        { cargo: 'Comunicação e redes', desc: 'Avisos, alertas, difusão pública', nomes: ['C. Sousa Ferreira', 'C. Ferreira'] },
        { cargo: 'Apoio a simulacros', desc: 'Eventos formativos na freguesia', nomes: ['Cristiano Estrela'] },
      ]
    },
    {
      id: 'C',
      titulo: 'Gestão de Ocorrências',
      elementos: '6 elementos',
      corHeader: 'bg-red-100 text-red-900 border-red-300',
      corCargo: 'text-red-700',
      equipas: [
        { cargo: 'Responsável de área', desc: 'Coordena resposta a ocorrências', nomes: ['Manuel Carvalho'] },
        { cargo: 'Apoio operacional', desc: 'Suporte a bombeiros e SMPC', nomes: ['Tiago Faustino', 'Filipe Godinho'] },
        { cargo: 'Gestão de populações', desc: 'Evacuação e alojamento temporário', nomes: ['Carlos Cordeiro', 'Vitor Valente'] },
        { cargo: 'Apoio logístico', desc: 'Meios, materiais e comunicações', nomes: ['Delfim Rodrigues'] },
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-10 max-w-6xl mx-auto">
      
      {/* Cabeçalho da Página */}
      <div className="text-center mb-4">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Organograma da ULPC</h1>
        <p className="text-slate-600">União de Freguesias de Parceiros e Azoia | Município de Leiria</p>
      </div>

      {/* Estrutura de Liderança (Topo) */}
      <div className="flex flex-col items-center gap-4 relative">
        {/* Presidente */}
        <div className="bg-teal-50 border-2 border-teal-600 rounded-lg p-4 w-full max-w-md text-center shadow-sm">
          <h2 className="font-bold text-teal-800 text-lg">Presidente da Junta de Freguesia</h2>
          <p className="text-sm text-teal-600 italic">Autoridade máxima de responsabilidade</p>
        </div>

        {/* Seta para baixo */}
        <div className="h-6 w-0.5 bg-slate-300"></div>

        {/* Coordenador */}
        <div className="bg-indigo-50 border-2 border-indigo-500 rounded-lg p-4 w-full max-w-md text-center shadow-sm">
          <h2 className="font-bold text-indigo-800 text-lg">Coordenador da ULPC</h2>
          <p className="text-sm text-indigo-600 italic">Gestão operacional e articulação com SMPC</p>
        </div>
      </div>

      {/* Linha de ligação horizontal (escondida em telemóvel) */}
      <div className="hidden md:block h-0.5 bg-slate-300 w-2/3 mx-auto mt-2 mb-[-2rem]"></div>

      {/* Pilares (3 Colunas) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {pilares.map((pilar) => (
          <div key={pilar.id} className="flex flex-col gap-3">
            
            {/* Cabeçalho do Pilar */}
            <div className={`border-2 rounded-lg p-3 text-center shadow-sm ${pilar.corHeader}`}>
              <h3 className="font-bold text-lg">{pilar.id} - {pilar.titulo}</h3>
              <p className="text-sm opacity-80">{pilar.elementos}</p>
            </div>

            {/* Elementos da Equipa neste Pilar */}
            {pilar.equipas.map((equipa, index) => (
              <div key={index} className="flex flex-col items-center">
                {/* Pequena seta/linha de ligação */}
                <div className="h-3 w-0.5 bg-slate-200 my-1"></div>
                
                {/* Cartão do Elemento */}
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 w-full text-center shadow-sm">
                  <h4 className="font-bold text-slate-800">{equipa.cargo}</h4>
                  <p className="text-xs text-slate-500 italic mb-2">{equipa.desc}</p>
                  
                  <div className="flex flex-col gap-1">
                    {equipa.nomes.map((nome, nIdx) => (
                      <span key={nIdx} className={`font-semibold ${pilar.corCargo}`}>
                        {nome}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Rodapé / Notas (Siglas) */}
      <div className="mt-8 border-t border-slate-200 pt-6 text-xs text-slate-500 flex flex-col gap-2">
        <p><strong>Participação no CCOM:</strong> Presidente de Junta em sistema de rotatividade | <strong>Articulação permanente:</strong> SMPC de Leiria</p>
        <p><strong>FGC</strong> - Faixas de Gestão de Combustível: faixas de terreno onde a vegetação deve ser gerida para reduzir o risco de propagação de incêndios rurais (DL n.º 82/2021 e Despacho n.º 4223/2025).</p>
        <p><strong>ASPS</strong> - Aldeia Segura, Pessoas Seguras: programa nacional da ANEPC de sensibilização de comunidades em zonas de interface urbano-florestal para autoproteção face a incêndios rurais.</p>
      </div>

    </div>
  );
}