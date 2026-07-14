export default function Contactos() {
  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-10 pb-10">
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Contactos</h1>
        <p className="text-slate-600">Estamos à disposição para ajudar a nossa comunidade.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        
        {/* Informações */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
            <h3 className="font-bold text-blue-800 mb-3">Informações de Contacto</h3>
            <p className="text-slate-600 mb-4">Em caso de emergência, utilize sempre os números de socorro direto.</p>
            <ul className="space-y-3 text-slate-700">
              <li><strong>Emergência:</strong> 112</li>
              <li><strong>Proteção Civil Municipal:</strong> 244 839 300</li>
              <li><strong>Contacto Direto:</strong> 968 506 078</li>
              <li><strong>Email:</strong> ulpc.pa@gmail.com</li>
              <li><strong>Sede:</strong> Edifício da Junta de Freguesia de Parceiros e Azoia</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
            <h3 className="font-bold text-slate-800 mb-3">Horário de Atendimento</h3>
            <p className="text-slate-600">Segunda a Sexta-feira: 09:00 - 17:00</p>
            <p className="text-slate-600">Disponibilidade permanente para situações de emergência.</p>
          </div>
        </div>

        {/* Mapa (Placeholder) */}
        <div className="rounded-xl shadow-sm border border-slate-200 overflow-hidden h-[400px]">
            <iframe 
                width="100%" 
                height="100%" 
                frameBorder="0" 
                style={{ border: 0 }} 
                src="https://www.google.com/maps?q=Junta+de+Freguesia+de+Parceiros+e+Azoia&output=embed" 
                allowFullScreen 
                title="Mapa da Junta de Freguesia"
            ></iframe>
        </div>
      </div>
    </div>
  );
}