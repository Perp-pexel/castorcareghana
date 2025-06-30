import React from 'react';
import { Users, Package, BookOpen, Star, TrendingUp, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminDashboard = () => {
  const { user, hasPermission } = useAuth();

  const stats = [
    { id: 'users', label: 'Total Users', value: '1,247', icon: Users, color: 'bg-blue-500', permission: 'getUsers' },
    { id: 'products', label: 'Products', value: '324', icon: Package, color: 'bg-green-500', permission: 'getProducts' },
    { id: 'education', label: 'Education Posts', value: '89', icon: BookOpen, color: 'bg-purple-500', permission: 'getEducations' },
    { id: 'reviews', label: 'Reviews', value: '2,156', icon: Star, color: 'bg-yellow-500', permission: 'getReviews' },
  ];

  const recentActivities = [
    { id: 1, action: 'New user registered', user: 'John Doe', time: '2 minutes ago' },
    { id: 2, action: 'Product added', user: 'Farmer Smith', time: '5 minutes ago' },
    { id: 3, action: 'Education post published', user: 'Admin User', time: '10 minutes ago' },
    { id: 4, action: 'Review submitted', user: 'Jane User', time: '15 minutes ago' },
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600 mt-1">Here's what's happening in your dashboard today.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full">
          <Activity className="w-5 h-5 text-green-600" />
          <span className="text-green-800 font-medium">System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          if (stat.permission && !hasPermission(stat.permission)) return null;
          
          const Icon = stat.icon;
          
          return (
            <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="flex items-center mt-4 text-sm">
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
                <span className="text-green-600 font-medium">+12%</span>
                <span className="text-gray-500 ml-1">from last month</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-600">by {activity.user}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            {hasPermission('createUser') && (
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left">
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Add User</p>
                <p className="text-sm text-gray-600">Create new user account</p>
              </button>
            )}
            {hasPermission('createProduct') && (
              <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <Package className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">List new product</p>
              </button>
            )}
            {hasPermission('createEducation') && (
              <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <BookOpen className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Create Post</p>
                <p className="text-sm text-gray-600">Share knowledge</p>
              </button>
            )}
            {hasPermission('getReviews') && (
              <button className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-left">
                <Star className="w-6 h-6 text-yellow-600 mb-2" />
                <p className="font-medium text-gray-900">View Reviews</p>
                <p className="text-sm text-gray-600">Check feedback</p>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;