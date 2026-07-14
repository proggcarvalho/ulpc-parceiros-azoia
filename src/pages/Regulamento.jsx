export default function Regulamento() {
  // O texto introdutório do documento
  const introducao = "O presente Regulamento define a organização, funcionamento, competências, articulação institucional e normas operacionais da Unidade Local de Proteção Civil (ULPC) da União das Freguesias de Parceiros e Azóia, em conformidade com a legislação nacional aplicável em matéria de proteção civil.";

  // Estrutura de Capítulos e Artigos
  const capitulos = [
    {
      titulo: "CAPÍTULO I — DISPOSIÇÕES GERAIS",
      artigos: [
        { num: "Artigo 1.º", nome: "Objeto", texto: "O presente Regulamento estabelece as normas de organização, funcionamento e atuação da Unidade Local de Proteção Civil da União das Freguesias de Parceiros e Azóia, adiante designada por ULPC." },
        { num: "Artigo 2.º", nome: "Enquadramento Legal", texto: "A ULPC rege-se pela Lei n.º 27/2006, de 3 de julho, na redação atual, pela Lei n.º 65/2007, pelo Decreto-Lei n.º 44/2019, pelo Decreto-Lei n.º 82/2021 e demais legislação aplicável." },
        { num: "Artigo 3.º", nome: "Missão", texto: "A ULPC tem por missão desenvolver ações de prevenção, preparação, sensibilização, apoio operacional e recuperação, visando reduzir riscos coletivos e apoiar as populações em situações de acidente grave ou catástrofe." }
      ]
    },
    {
      titulo: "CAPÍTULO II — ORGANIZAÇÃO E ESTRUTURA",
      artigos: [
        { num: "Artigo 4.º", nome: "Dependência Hierárquica", texto: "A ULPC funciona sob autoridade do Presidente da Junta de Freguesia, enquanto responsável máximo local de proteção civil, sendo a coordenação operacional assegurada por um Coordenador da ULPC." },
        { num: "Artigo 5.º", nome: "Estrutura Orgânica", texto: "A ULPC integra as seguintes áreas funcionais: a) Prevenção e Riscos; b) Sensibilização Pública; c) Gestão de Ocorrências." },
        { num: "Artigo 6.º", nome: "Coordenação", texto: "Os responsáveis das áreas funcionais são nomeados pelo Presidente da Junta, sob proposta do Coordenador da ULPC." }
      ]
    },
    {
      titulo: "CAPÍTULO III — COMPETÊNCIAS",
      artigos: [
        { num: "Artigo 7.º", nome: "Competências Gerais", texto: "Compete à ULPC identificar riscos, apoiar operações de proteção e socorro, colaborar com o SMPC, apoiar ações de gestão de combustível, promover simulacros e sensibilização pública." },
        { num: "Artigo 8.º", nome: "Prevenção e Riscos", texto: "A área de Prevenção e Riscos assegura o levantamento de vulnerabilidades, cartografia de risco, identificação de caminhos florestais e pontos de água, bem como apoio aos processos de gestão de combustível." },
        { num: "Artigo 9.º", nome: "Sensibilização Pública", texto: "A área de Sensibilização Pública promove campanhas informativas, programas Aldeia Segura Pessoas Seguras, simulacros e ações de formação." },
        { num: "Artigo 10.º", nome: "Gestão de Ocorrências", texto: "A área de Gestão de Ocorrências assegura o apoio logístico, evacuação, comunicações e articulação com os agentes de proteção civil." }
      ]
    },
    {
      titulo: "CAPÍTULO IV — FUNCIONAMENTO OPERACIONAL",
      artigos: [
        { num: "Artigo 11.º", nome: "Ativação", texto: "A ULPC pode ser ativada pelo Presidente da Junta, Coordenador da ULPC ou mediante solicitação do Serviço Municipal de Proteção Civil." },
        { num: "Artigo 12.º", nome: "Prontidão Operacional", texto: "Durante períodos críticos ou de risco elevado podem ser implementadas escalas de prevenção, vigilância ou reforço operacional." },
        { num: "Artigo 13.º", nome: "Comunicações", texto: "As comunicações operacionais relevantes devem ser reportadas ao Coordenador da ULPC e articuladas com o Serviço Municipal de Proteção Civil." }
      ]
    },
    {
      titulo: "CAPÍTULO V — FORMAÇÃO E EXERCÍCIOS",
      artigos: [
        { num: "Artigo 14.º", nome: "Formação", texto: "Os elementos da ULPC devem frequentar ações de formação e atualização promovidas pelas entidades competentes." },
        { num: "Artigo 15.º", nome: "Simulacros", texto: "A ULPC promoverá e participará em simulacros e exercícios operacionais internos e municipais." }
      ]
    },
    {
      titulo: "CAPÍTULO VI — DIREITOS E DEVERES",
      artigos: [
        { num: "Artigo 16.º", nome: "Direitos", texto: "Os elementos da ULPC têm direito a formação, equipamentos de proteção individual e enquadramento operacional adequado." },
        { num: "Artigo 17.º", nome: "Deveres", texto: "Os elementos da ULPC devem atuar com disciplina, zelo, sigilo e respeito pelas orientações da coordenação." }
      ]
    },
    {
      titulo: "CAPÍTULO VII — ARTICULAÇÃO INSTITUCIONAL",
      artigos: [
        { num: "Artigo 18.º", nome: "Cooperação", texto: "A ULPC coopera com o Serviço Municipal de Proteção Civil, Bombeiros, forças de segurança, autoridades de saúde e demais entidades relevantes." },
        { num: "Artigo 19.º", nome: "Participação Operacional", texto: "A freguesia assegura participação nos mecanismos municipais de coordenação operacional, designadamente no CCOM em regime de rotatividade." }
      ]
    },
    {
      titulo: "CAPÍTULO VIII — DISPOSIÇÕES FINAIS",
      artigos: [
        { num: "Artigo 20.º", nome: "Equipamentos", texto: "Os equipamentos afetos à ULPC constituem património da Junta de Freguesia e devem ser utilizados exclusivamente para fins operacionais." },
        { num: "Artigo 21.º", nome: "Casos Omissos", texto: "Os casos omissos serão resolvidos pelo Presidente da Junta em conformidade com a legislação aplicável." },
        { num: "Artigo 22.º", nome: "Entrada em Vigor", texto: "O presente Regulamento entra em vigor após aprovação pelos órgãos competentes da União das Freguesias." }
      ]
    }
  ];

  // Estrutura dos Anexos
  const anexos = [
    { num: "ANEXO I", titulo: "ORGANOGRAMA DA ULPC", texto: "Inclui a estrutura composta pelo Presidente da Junta, Coordenador da ULPC e três áreas funcionais: Prevenção e Riscos, Sensibilização Pública e Gestão de Ocorrências." },
    { num: "ANEXO II", titulo: "COMPOSIÇÃO FUNCIONAL", texto: "Listagem nominal dos responsáveis de área, equipas operacionais e elementos designados pela Junta de Freguesia." },
    { num: "ANEXO III", titulo: "PROCEDIMENTOS OPERACIONAIS", texto: "Definição simplificada dos procedimentos de ativação, comunicações, apoio à evacuação, logística e articulação com o SMPC." },
    { num: "ANEXO IV", titulo: "PLANO ANUAL DE FORMAÇÃO", texto: "Plano anual de formação interna e participação em ações promovidas pelo Município, ANEPC ou outras entidades." },
    { num: "ANEXO V", titulo: "NORMAS DE ATIVAÇÃO EM SITUAÇÕES CRÍTICAS", texto: "Procedimentos específicos para incêndios rurais, fenómenos meteorológicos adversos e apoio às populações." }
  ];

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-8 pb-10">
      
      {/* Cabeçalho da Página */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Regulamento de Funcionamento</h1>
        <p className="text-slate-600">Unidade Local de Proteção Civil de Parceiros e Azóia</p>
      </div>

      {/* Caixa Principal de Leitura */}
      <div className="bg-white p-6 md:p-10 rounded-xl shadow-sm border border-slate-200">
        
        {/* Introdução */}
        <p className="text-lg text-slate-700 font-medium mb-8 pb-8 border-b border-slate-200 leading-relaxed">
          {introducao}
        </p>

        {/* Listagem dos Capítulos e Artigos */}
        <div className="space-y-10">
          {capitulos.map((capitulo, index) => (
            <section key={index}>
              <h2 className="text-xl font-bold text-blue-800 mb-5 pb-2 border-b-2 border-blue-100">
                {capitulo.titulo}
              </h2>
              
              <div className="space-y-5">
                {capitulo.artigos.map((artigo, artIndex) => (
                  <div key={artIndex} className="text-slate-700 text-justify">
                    <span className="font-bold text-slate-800 mr-2">
                      {artigo.num} — {artigo.nome}:
                    </span>
                    <span>{artigo.texto}</span>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* Secção de Anexos */}
        <div className="mt-12 pt-8 border-t-2 border-slate-200">
          <h2 className="text-xl font-bold text-slate-800 mb-5">ANEXOS</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {anexos.map((anexo, index) => (
              <div key={index} className="bg-slate-50 p-4 rounded-lg border border-slate-200">
                <h3 className="font-bold text-blue-800 text-sm mb-1">{anexo.num}</h3>
                <h4 className="font-semibold text-slate-700 mb-2">{anexo.titulo}</h4>
                <p className="text-sm text-slate-600">{anexo.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}