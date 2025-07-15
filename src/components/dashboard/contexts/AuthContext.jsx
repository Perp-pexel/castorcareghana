import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUserData } from '.././../../services/auth';

export const AuthContext = createContext();

const rolePermissions = [
  {
    role: 'buyer',
    actions: [
      'createUser', 'updateUser', 'getUser', 'getUsers',
      'getProduct', 'getProducts', 'getEducation', 'getEducations',
      'createReview', 'updateReview', 'deleteReview', 'getReview', 'getReviews', 'trackOrders'
    ]
  },
  {
    role: 'user',
    actions: [
      'createUser', 'updateUser', 'getUser', 'getUsers',
      'getProduct', 'getProducts', 'getEducation', 'getEducations',
      'createReview', 'updateReview', 'deleteReview', 'getReview', 'getReviews', 'trackOrders'
    ]
  },
  {
    role: 'farmer',
    actions: [
      'createUser', 'updateUser', 'getUser', 'getUsers',
      'createProduct', 'updateProduct', 'getProduct', 'getProducts', 'deleteProduct',
      'createEducation', 'updateEducation', 'deleteEducation', 'getEducation', 'getEducations',
      'createReview', 'updateReview', 'deleteReview', 'getReview', 'getReviews'
    ]
  },
  {
    role: 'admin',
    actions: [
      'createProduct', 'updateProduct', 'deleteProduct', 'getProduct', 'getProducts',
      'createEducation', 'updateEducation', 'deleteEducation', 'getEducation', 'getEducations',
      'createUser', 'updateUser', 'deleteUser', 'getUser', 'getUsers',
      'createReview', 'updateReview', 'deleteReview', 'getReview', 'getReviews'
    ]
  },
  {
    role: 'superadmin',
    actions: [
      'createProduct', 'updateProduct', 'deleteProduct', 'getProduct', 'getProducts',
      'createEducation', 'updateEducation', 'deleteEducation', 'getEducation', 'getEducations',
      'createUser', 'updateUser', 'deleteUser', 'getUser', 'getUsers',
      'createReview', 'updateReview', 'deleteReview', 'getReview', 'getReviews'
    ]
  }
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = () => {
      try {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (token && storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          console.log('User initialized from localStorage:', userData);
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    console.log('User logged out');
    window.location.href = '/signin';
  };

  const hasPermission = (action) => {
    if (!user || !user.role) return false;
    const roleKey = user.role.toLowerCase();
    const permissions = rolePermissions.find(p => p.role === roleKey);
    return permissions ? permissions.actions.includes(action) : false;
  };

  const isAuthenticated = () => !!user && !!localStorage.getItem('token');

  const getUserRole = () => user?.role || null;

  const getUserInfo = () =>
    user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          contact: user.contact,
          fullName: `${user.firstName} ${user.lastName}`
        }
      : null;

  const refreshUser = async () => {
    try {
      const res = await getUserData(); // expects token to be sent via headers
      setUser(res.data);
      localStorage.setItem('user', JSON.stringify(res.data));
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  };

  const value = {
    user,
    setUser,
    logout,
    hasPermission,
    isAuthenticated,
    getUserRole,
    getUserInfo,
    refreshUser,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
