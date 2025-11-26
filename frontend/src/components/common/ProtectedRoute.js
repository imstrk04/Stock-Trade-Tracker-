import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Sidebar from '../layout/Sidebar';

const ProtectedRoute = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-6 lg:p-10 bg-gray-50 dark:bg-gray-900">
        <Outlet /> 
      </main>
    </div>
  );
};

export default ProtectedRoute;