import React from 'react';
import {
  Home, Users, Package, BookOpen, Star,
  LogOut, User, Sprout, Settings, ClipboardList
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

const Sidebar = () => {
  const { user, logout, hasPermission, loading } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  if (loading || !user) {
    return null; // ⏳ Don't render sidebar until user is ready
  }
  const role = user?.role?.toLowerCase();
console.log("Sidebar ROLE:", role);
  const sidebarMenus = {
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'users', label: 'Users', icon: Users, permission: 'getUsers' },
      { id: 'products', label: 'Products', icon: Package, permission: 'getProducts' },
      { id: 'education', label: 'Education', icon: BookOpen, permission: 'getEducations' },
      { id: 'reviews', label: 'Reviews', icon: Star, permission: 'getReviews' },
    ],
    "superadmin": [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'users', label: 'Users', icon: Users, permission: 'getUsers' },
      { id: 'products', label: 'Products', icon: Package, permission: 'getProducts' },
      { id: 'farmerproducts', label: 'Farmer Products', icon: Package, permission: 'getProducts' },
      { id: 'education', label: 'Education', icon: BookOpen, permission: 'getEducations' },
      { id: 'reviews', label: 'Reviews', icon: Star, permission: 'getReviews' },
    ],
    farmer: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'products', label: 'My Products', icon: Package, permission: 'getProducts' },
      { id: 'education', label: 'Education Posts', icon: BookOpen, permission: 'getEducations' },
      { id: 'reviews', label: 'My Reviews', icon: Star, permission: 'getReviews' },
    ],
    buyer: [
      { id: 'dashboard', label: 'Dashboard', icon: Home },
      { id: 'products', label: 'Available Products', icon: Package, permission: 'getProducts' },
      { id: 'reviews', label: 'My Reviews', icon: Star, permission: 'getReviews' },
      { id: 'order-tracking', label: 'My Orders', icon: ClipboardList, permission: 'trackOrders' },
    ]
  };

  const menuItems = sidebarMenus[role] || [];

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'farmer': return 'bg-green-100 text-green-800';
      case 'buyer': return 'bg-blue-100 text-blue-800';
      case 'super-admin': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'admin': return Settings;
      case 'farmer': return Sprout;
      case 'buyer': return User;
      case 'super-admin': return Settings;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(role);

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out of your account.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/signin';
      }
    });
  };

  return (
    <div className="w-64 bg-white shadow-lg border-r border-green-100 flex flex-col">
      {/* Top Section */}
      <div className="p-6 border-b border-green-100">
        <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
          <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
            <RoleIcon className="w-5 h-5 text-green-700" />
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">
              {user?.firstName || 'User'} {user?.lastName || ''}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRoleColor(role)}`}>
                {role}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            if (item.permission && !hasPermission(item.permission)) return null;

            const Icon = item.icon;
            const targetPath = `/dashboard/${role}${item.id !== 'dashboard' ? `/${item.id}` : ''}`;
            const isActive = location.pathname === targetPath;

            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(targetPath)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 ${
                    isActive
                      ? 'bg-green-100 text-green-700 border-l-4 border-green-600'
                      : 'text-gray-600 hover:bg-green-50 hover:text-green-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-green-100">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-medium">Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
