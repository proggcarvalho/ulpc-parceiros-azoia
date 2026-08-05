import { Navigate } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  // Vai à memória do browser ver se o crachá (token) existe
  const token = localStorage.getItem('token');

  // Se não existir token, redireciona para o login de forma segura e silenciosa
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Se o token existir, desenha o ecrã protegido normalmente (a Central)
  return children;
}