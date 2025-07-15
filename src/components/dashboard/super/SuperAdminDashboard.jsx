import React, { useEffect, useState } from 'react';
import {
  Users, Package, BookOpen, Star, TrendingUp,
  Activity, Edit3, User, Mail, Phone, Calendar, X
} from 'lucide-react';
import Swal from 'sweetalert2';
import { getUserData, updateUserData } from '../../../services/auth';
import { apiGetUsers, apiGetAllProducts, apiGetAllReviews, apiGetEducations } from '../../../services/products';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import AddProductModal from '../admin/AddProductModal';
import CreateEducationModal from '../admin/CreateEducationModal';
import ViewReviewModal from '../admin/ViewReviewModal';
import AddUserModal from '../super/SuperAdminAddUsermodal';

const SuperAdminDashboard = () => {
  const { user, hasPermission, refreshUser } = useAuth();
  const [admin, setAdmin] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
 const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  contact: '',
  password: '',
  avatar: null,
});

  const [showProductModal, setShowProductModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showUserModal, setShowUserModal] = useState(false);

  const [stats, setStats] = useState([
    { id: 'users', label: 'Total Users', value: 0, icon: Users, color: 'bg-blue-500', permission: 'getUsers' },
    { id: 'products', label: 'Products', value: 0, icon: Package, color: 'bg-green-500', permission: 'getProducts' },
    { id: 'education', label: 'Education Posts', value: 0, icon: BookOpen, color: 'bg-purple-500', permission: 'getEducations' },
    { id: 'reviews', label: 'Reviews', value: 0, icon: Star, color: 'bg-yellow-500', permission: 'getReviews' },
  ]);

  const recentActivities = [];

  const fetchStats = async () => {
    try {
      const [usersRes, productsRes, reviewsRes, educationsRes] = await Promise.all([
        apiGetUsers(),
        apiGetAllProducts(),
        apiGetAllReviews(),
        apiGetEducations(),
      ]);

      const usersCount = usersRes?.data?.length || 0;
      const productsCount = productsRes?.data?.length || 0;
      const reviewsCount = reviewsRes?.data?.length || 0;
      const educationCount = educationsRes?.data?.length || 0;

      setStats(prevStats => prevStats.map(stat => {
        switch (stat.id) {
          case 'users':
            return { ...stat, value: usersCount };
          case 'products':
            return { ...stat, value: productsCount };
          case 'education':
            return { ...stat, value: educationCount };
          case 'reviews':
            return { ...stat, value: reviewsCount };
          default:
            return stat;
        }
      }));
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
    }
  };

  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await getUserData();
        setAdmin(res.data);
      } catch (err) {
        console.error("Error fetching admin data:", err);
      }
    };
    fetchAdmin();
    fetchStats();
  }, []);

  const openEditModal = () => {
    if (!admin) return;
   setFormData({
  firstName: admin.firstName || '',
  lastName: admin.lastName || '',
  contact: admin.contact || '',
  password: '',
});

    setShowEditModal(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const cleanData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      contact: formData.contact,
    };
    if (formData.password.trim()) {
      cleanData.password = formData.password;
    }
    try {
      const res = await updateUserData(cleanData);
      await refreshUser();
      setAdmin(res.data);
      setShowEditModal(false);
      Swal.fire({ icon: 'success', title: 'Profile updated', text: 'Your changes have been saved.' });
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: err.response?.data?.message || 'Something went wrong. Try again.',
      });
    }
  };

  if (!admin) return <div className="p-6 text-center">Loading admin data...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-start gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center ring-4 ring-green-100">
              <User className="w-8 h-8 text-green-600" />
            </div>
            <div onClick={openEditModal} className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full cursor-pointer hover:bg-green-600 transition">
              <Edit3 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Welcome back, {admin.firstName}!</h1>
            <p className="text-gray-600 mt-1">Here's what's happening in your dashboard today.</p>
            <div className="flex flex-wrap gap-3 mt-2 text-sm text-gray-500">
              <span className="flex items-center gap-1"><Mail className="w-4 h-4" />{admin.email}</span>
              <span className="flex items-center gap-1"><Phone className="w-4 h-4" />{admin.contact || 'N/A'}</span>
              <span className="flex items-center gap-1"><Calendar className="w-4 h-4" />Joined {admin.createdAt?.slice(0, 10)}</span>
            </div>
          </div>
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
                <span className="text-green-600 font-medium">+0%</span>
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
              <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left" onClick={() => setShowUserModal(true)}>
                <Users className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">Add User</p>
                <p className="text-sm text-gray-600">Create new user account</p>
              </button>
            )}
            {hasPermission('createProduct') && (
              <button onClick={() => setShowProductModal(true)} className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left">
                <Package className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-600">List new product</p>
              </button>
            )}
            {hasPermission('createEducation') && (
              <button onClick={() => setShowEducationModal(true)} className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left">
                <BookOpen className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Create Post</p>
                <p className="text-sm text-gray-600">Share knowledge</p>
              </button>
            )}
            <Link to="/dashboard/admin/reviews">
              <div className="p-4 bg-yellow-50 hover:bg-yellow-100 rounded-lg transition-colors text-left cursor-pointer">
                <Star className="w-6 h-6 text-yellow-600 mb-2" />
                <p className="font-medium text-gray-900">View Reviews</p>
                <p className="text-sm text-gray-600">Check feedback</p>
              </div>
            </Link>



          </div>
        </div>
      </div>

      {showProductModal && <AddProductModal onClose={() => setShowProductModal(false)} />}
      {showEducationModal && <CreateEducationModal onClose={() => setShowEducationModal(false)} />}
      {showReviewModal && <ViewReviewModal onClose={() => setShowReviewModal(false)} />}
      {showUserModal && <AddUserModal onClose={() => setShowUserModal(false)} onSuccess={fetchStats} />}

      {showEditModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              {['firstName', 'lastName', 'contact'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">{field}</label>
                  <input
                    type="text"
                    value={formData[field]}
                    onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                    required
                  />
                </div>
              ))}
              <div>
                <label className="block text-sm font-medium">New Password (optional)</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="text-right">
                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminDashboard;
