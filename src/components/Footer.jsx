import logoUlpc from '../assets/logo_ULPC.jpg';
import logoJunta from '../assets/logo_junta.png'; // <-- 1. Importas a imagem da Junta aqui!

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-10 mt-12 border-t-4 border-orange-500">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Secção 1: Logos e Nome */}
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-4 bg-white p-2 rounded-lg">
            {/* Logo da ULPC */}
            <img src={logoUlpc} alt="Logo ULPC" className="w-14 h-14 object-contain mix-blend-multiply" />
            
            {/* Logo da Junta de Freguesia */}
            <img src={logoJunta} alt="Logo Junta de Freguesia" className="w-14 h-14 object-contain mix-blend-multiply" />
          </div>
          <p className="text-sm text-center md:text-left mt-2 font-medium">
            Unidade Local de Proteção Civil<br/>
            União das Freguesias de Parceiros e Azoia
          </p>
        </div>

        {/* Secção 2: Contactos */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-slate-700 pb-1 w-full text-center md:text-left">Contactos</h3>
          <ul className="space-y-2 text-sm text-center md:text-left">
            <li><span className="font-semibold text-orange-400">Emergência:</span> 112</li>
            <li><span className="font-semibold text-orange-400">Proteção Civil Municipal:</span> 244 839 300</li>
            <li><span className="font-semibold text-orange-400">Direto:</span> 968 506 078</li>
            <li><span className="font-semibold text-orange-400">Email:</span> ulpc.pa@gmail.com</li>
          </ul>
        </div>

        {/* Secção 3: Localização */}
        <div className="flex flex-col items-center md:items-start">
          <h3 className="text-white font-bold text-lg mb-4 border-b-2 border-slate-700 pb-1 w-full text-center md:text-left">Localização Base</h3>
          <address className="not-italic text-sm space-y-1 text-center md:text-left">
            <p className="font-medium text-white">Edifício da Junta de Freguesia</p>
            <p>Rua Principal, n.º 123</p>
            <p>2400-000 Parceiros, Leiria</p>
          </address>
        </div>

      </div>

      {/* Copyright */}
      <div className="text-center text-xs text-slate-500 mt-10 pt-4 border-t border-slate-800">
        &copy; {new Date().getFullYear()} ULPC Parceiros e Azoia. Todos os direitos reservados.
      </div>
    </footer>
  );
}