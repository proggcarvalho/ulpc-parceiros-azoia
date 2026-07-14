import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Isto obriga a janela a voltar ao pixel 0,0 sempre que o caminho muda
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}