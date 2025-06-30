import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

const DashboardRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'admin') navigate('/dashboard/admin');
    else if (user?.role === 'farmer') navigate('/dashboard/farmer');
    else if (user?.role === 'user') navigate('/dashboard/user');
    else navigate('/dashboard/admin'); 
  }, [user, navigate]);

  return null;
};

export default DashboardRedirect;
