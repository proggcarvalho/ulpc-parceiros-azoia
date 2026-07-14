export default function Noticias() {
  // Substitui o link abaixo pelo link real da página de Facebook da ULPC
  const facebookPageUrl = "https://www.facebook.com/profile.php?id=61589034533442"; 

  return (
    <div className="max-w-6xl mx-auto flex flex-col gap-8 pb-10">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Notícias e Atualizações</h1>
        <p className="text-slate-600">Acompanhe as últimas informações e alertas da nossa página oficial.</p>
      </div>

      <div className="flex justify-center mt-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 w-full max-w-[550px] flex justify-center overflow-hidden">
          {/* iFrame oficial do Facebook */}
          <iframe
            src={`https://www.facebook.com/plugins/page.php?href=${encodeURIComponent(facebookPageUrl)}&tabs=timeline&width=500&height=600&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true`}
            width="500"
            height="600"
            style={{ border: 'none', overflow: 'hidden' }}
            allowFullScreen={true}
            loading="lazy"
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            title="Feed do Facebook"
          ></iframe>
        </div>
      </div>
    </div>
  );
}