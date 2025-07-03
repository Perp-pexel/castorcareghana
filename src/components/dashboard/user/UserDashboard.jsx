import React, { useEffect, useState } from 'react';
import {
  ShoppingBag, BookOpen, Star, Heart, Eye,
  Calendar, MapPin, Phone, Mail, Edit3, User, Package
} from 'lucide-react';
import { getUserData } from '../../../services/auth';

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState([
    { label: 'Total Orders', value: 0, icon: ShoppingBag, color: 'bg-blue-500', change: '+0%' },
    { label: 'Courses Completed', value: 0, icon: BookOpen, color: 'bg-green-500', change: '+0%' },
    { label: 'Reviews Written', value: 0, icon: Star, color: 'bg-yellow-500', change: '+0%' },
    { label: 'Wishlist Items', value: 0, icon: Heart, color: 'bg-red-500', change: '+0%' }
  ]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await getUserData();
        const data = res.data;
        setUser(data);

        
        setStats(prev => [
          { ...prev[0], value: data.orders?.length || 0, change: '+0%' },
          { ...prev[1], value: data.courses?.length || 0, change: '+0%' },
          { ...prev[2], value: data.reviews?.length || 0, change: '+0%' },
          { ...prev[3], value: data.wishlist?.length || 0, change: '+0%' }
        ]);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchUser();
  }, []);

  const recentOrders = [
    { id: '#ORD-001', product: 'Organic Tomatoes', status: 'Delivered', date: '2024-01-15', amount: '$24.99' },
    { id: '#ORD-002', product: 'Fresh Lettuce Bundle', status: 'In Transit', date: '2024-01-14', amount: '$18.50' },
    { id: '#ORD-003', product: 'Seasonal Fruit Box', status: 'Processing', date: '2024-01-13', amount: '$45.00' }
  ];

  const recentActivity = [
    { action: 'Completed course', item: 'Sustainable Farming Basics', time: '2 hours ago', icon: BookOpen },
    { action: 'Left review for', item: 'Organic Carrots', time: '1 day ago', icon: Star },
    { action: 'Added to wishlist', item: 'Premium Seed Collection', time: '2 days ago', icon: Heart },
    { action: 'Placed order', item: 'Fresh Herb Bundle', time: '3 days ago', icon: ShoppingBag }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return 'bg-green-100 text-green-800';
      case 'In Transit': return 'bg-blue-100 text-blue-800';
      case 'Processing': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!user) return <div className="p-6 text-center">Loading user data...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center ring-4 ring-green-100">
                <User className="w-12 h-12 text-green-600" />
              </div>
              <div className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full">
                <Edit3 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName}!</h1>
              <p className="text-gray-600 mb-4">Here's what's happening with your account today.</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{user.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{user.phone || 'N/A'}</div>
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{user.location || 'N/A'}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Member since {user.createdAt?.slice(0, 10)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-sm font-medium text-green-600">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Orders + Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">{order.id}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{order.product}</p>
                    <p className="text-gray-500 text-xs">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">{order.amount}</p>
                    <button className="text-green-600 hover:text-green-700 text-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <activity.icon className="w-4 h-4 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-gray-900 text-sm">
                      <span className="font-medium">{activity.action}</span> {activity.item}
                    </p>
                    <p className="text-gray-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
              <ShoppingBag className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-blue-900">Browse Products</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl hover:from-green-100 hover:to-green-200 transition-all group">
              <BookOpen className="w-8 h-8 text-green-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-green-900">Take Courses</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:from-yellow-100 hover:to-yellow-200 transition-all group">
              <Star className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-yellow-900">Write Reviews</span>
            </button>
            <button className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
              <Package className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-purple-900">Track Orders</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
