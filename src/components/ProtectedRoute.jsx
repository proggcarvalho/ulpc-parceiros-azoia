import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Verifica se o nosso "token" provisório está guardado no browser
  const isAuthenticated = localStorage.getItem('ulpc_admin_auth') === 'true';

  // Se não estiver autenticado, recambiamos o utilizador para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Se estiver tudo ok, deixamos passar para a página pretendida (children)
  return children;
}