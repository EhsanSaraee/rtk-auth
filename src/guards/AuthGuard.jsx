import { useAuth } from 'hooks/auth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const AuthGuard = () => {
   const { token } = useAuth();
   const location = useLocation();

   return token ? (
      <Outlet />
   ) : (
      <Navigate to="/login" state={{ from: location }} replace />
   );
};

export default AuthGuard;
