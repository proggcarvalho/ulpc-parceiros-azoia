export default function Galeria() {
  // Lista de fotografias. Mais tarde, basta trocares o 'url' pelos teus imports locais.
  const fotos = [
    { id: 1, url: "https://scontent.flis12-1.fna.fbcdn.net/v/t39.30808-6/742208548_122110359723301151_4587287241561583797_n.jpg?stp=dst-jpg_tt6&cstp=mx1200x1600&ctp=s1200x1600&_nc_cat=100&ccb=1-7&_nc_sid=833d8c&_nc_ohc=TIVqieUXqGwQ7kNvwG7WX5t&_nc_oc=AdoGq8NezX9iNbx9cSHNw0NgSJbprFS9io3-Yq17qsH5DUiikaxzXYm3LKImO9unBqjQjJHlzv_q_Hk73RG2lINF&_nc_zt=23&_nc_ht=scontent.flis12-1.fna&_nc_gid=N1_RYvGuExn9n0vWSaSu5g&_nc_ss=7b2a8&oh=00_AQC0FKb3rXbXTIxrvh-Bf6QJ9e18f3KCnD4Hh7CorsveQQ&oe=6A5C4A3D", legenda: "Formação em Comunicações de Emergência" },
    { id: 2, url: "https://scontent.flis12-1.fna.fbcdn.net/v/t39.30808-6/744869991_1028315970201006_5431696702401152555_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=s1080x1350&_nc_cat=106&ccb=1-7&_nc_sid=127cfc&_nc_ohc=av9gdHHvc2IQ7kNvwGBLIuF&_nc_oc=Adpy5oITMOm6fYaMppe5eiZ0KC4hWQeeMetGAU4F7LRZN3L-lHYBl9l0oA4CpnxNvx1X-Zm7nVgY3qFdeypckx2o&_nc_zt=23&_nc_ht=scontent.flis12-1.fna&_nc_gid=qK30bIEuPtv4Dq6HAMI3iA&_nc_ss=7b2a8&oh=00_AQDOYT9ScBVlmOfE0oGyN_qezanFOx1a12-Ek0SnRlzG4A&oe=6A5C28DF", legenda: "Informações" },
    { id: 3, url: "https://scontent.flis12-1.fna.fbcdn.net/v/t39.30808-6/745046092_1028315976867672_6898451926400510567_n.jpg?stp=dst-jpg_tt6&cstp=mx1080x1350&ctp=s1080x1350&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=Nlg0rwBGE74Q7kNvwGqblwQ&_nc_oc=AdrFktA3TU-_fYxgXDjlCePsdeaish8VMLiT7ytC636V54QeAM63N_funv4BqXAkupQuupIAKUpLHETJHSG9bE-3&_nc_zt=23&_nc_ht=scontent.flis12-1.fna&_nc_gid=Rr8ak6s7xsf3dp3VqnOaxA&_nc_ss=7b2a8&oh=00_AQB87F8PM9qwIET88KSqmaXrChjeW2d9GGrXW46OKkRNPQ&oe=6A5C5463", legenda: "Informações" },

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