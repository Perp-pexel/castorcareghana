import React, { useEffect, useState } from 'react';
import {
  ShoppingBag, Star, BookOpen, Heart, Eye,
  Calendar, MapPin, Phone, Mail, Edit3, User, Package, X
} from 'lucide-react';
import { getUserData, updateUserData } from '../../../services/auth';
import Swal from 'sweetalert2';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { apiCreateReview } from '../../../services/products'; 

const UserDashboard = () => {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
  });
const [showReviewModal, setShowReviewModal] = useState(false);
const [rating, setRating] = useState(0);
const [comment, setComment] = useState('');

  const [stats, setStats] = useState([
    { label: 'Total Orders', value: 0, icon: ShoppingBag, color: 'bg-blue-500', change: '+0%' },
    { label: 'Reviews Written', value: 0, icon: Star, color: 'bg-yellow-500', change: '+0%' },
    { label: 'Wishlist Items', value: 0, icon: Heart, color: 'bg-red-500', change: '+0%' }
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getUserData();
        const data = res.data;
        setUser(data);

        const savedOrders = JSON.parse(localStorage.getItem('orderHistory')) || [];
        setOrders(savedOrders);

        setStats(prev => [
          { ...prev[0], value: savedOrders.length || 0 },
          { ...prev[1], value: data.reviews?.length || 0 },
          { ...prev[2], value: data.wishlist?.length || 0 }
        ]);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };
    fetchData();
  }, []);
  const openEditModal = () => {
    setFormData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      contact: user.contact || '',

    });
    setShowEditModal(true);
  };

  const { refreshUser } = useAuth();
  const handleUpdate = async (e) => {
    e.preventDefault();

    const cleanData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
  
      contact: formData.contact, 
    };

    if (formData.password?.trim()) {
      cleanData.password = formData.password;
    }

    try {
      console.log("Updating with:", cleanData)
      const res = await updateUserData(cleanData);
      await refreshUser();
      setUser(res.data);
      setShowEditModal(false);

      Swal.fire({
        icon: 'success',
        title: 'Profile updated',
        text: 'Your changes have been saved.',
      });
    } catch (err) {
      console.error("Update error:", err.response?.data || err.message);

      Swal.fire({
        icon: 'error',
        title: 'Update failed',
        text: err.response?.data?.details?.[0]?.message || err.response?.data?.message || 'Check the form and try again.',
      });
    }
  };

const handleSubmitReview = async () => {
  if (!rating || !comment.trim()) {
    return Swal.fire({
      icon: 'warning',
      title: 'Missing fields',
      text: 'Please rate and write a comment.',
    });
  }

  try {
    await apiCreateReview({ rating, comment });

    Swal.fire({
      icon: 'success',
      title: 'Review submitted',
      text: 'Thanks for your feedback!',
    });

    setShowReviewModal(false);
    setRating(0);
    setComment('');
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error?.response?.data?.message || 'Could not submit review.',
    });
  }
};

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
              <div
                onClick={openEditModal}
                className="absolute -bottom-2 -right-2 bg-green-500 text-white p-2 rounded-full cursor-pointer hover:bg-green-600 transition"
              >
                <Edit3 className="w-4 h-4" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user.firstName}!</h1>
              <p className="text-gray-600 mb-4">Here's what's happening with your account today.</p>
              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-2"><Mail className="w-4 h-4" />{user.email}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{user.contact || 'N/A'}</div>
                <div className="flex items-center gap-2"><Calendar className="w-4 h-4" />Member since {user.createdAt?.slice(0, 10)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
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
              {orders.slice(0, 3).map((order, index) => (
                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-medium text-gray-900">#{order.ref}</span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(order.status)}`}>{order.status}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{order.items.map(i => i.title).join(', ')}</p>
                    <p className="text-gray-500 text-xs">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-900">GH₵{order.total.toFixed(2)}</p>
                    <button className="text-green-600 hover:text-green-700 text-sm">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {orders.length === 0 && (
                <p className="text-gray-500 text-center">No recent orders</p>
              )}
            </div>
          </div>

          {/* Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Recent Activity</h2>
              <button className="text-green-600 hover:text-green-700 font-medium text-sm">View All</button>
            </div>
            <div className="space-y-4">
              <p className="text-gray-500">Recent activity data coming soon...</p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/dashboard/buyer/products" className="block">
              <div className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
                <ShoppingBag className="w-8 h-8 text-blue-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-blue-900">Browse Products</span>
              </div>
            </Link>

            <div
              onClick={() => setShowReviewModal(true)}
              className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl hover:from-yellow-100 hover:to-yellow-200 transition-all group cursor-pointer"
            >
              <Star className="w-8 h-8 text-yellow-600 group-hover:scale-110 transition-transform" />
              <span className="font-medium text-yellow-900">Write Reviews</span>
            </div>


            <Link to="/dashboard/buyer/order-tracking" className="block">
              <div className="flex flex-col items-center gap-3 p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
                <Package className="w-8 h-8 text-purple-600 group-hover:scale-110 transition-transform" />
                <span className="font-medium text-purple-900">Track Orders</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
              <button onClick={() => setShowEditModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
              <form onSubmit={handleUpdate} className="space-y-4">
                {['firstName', 'lastName', 'contact',].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium capitalize">{field}</label>
                    <input
                      type={'text'}
                      value={formData[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                      required={field !== 'password'}
                    />
                  </div>
                ))}
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
      {showReviewModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
      <button onClick={() => setShowReviewModal(false)} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
        <X className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-semibold mb-4">Rate Our Service</h2>

      {/* Star Rating */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className={star <= rating ? 'text-yellow-500' : 'text-gray-300'}
          >
            ★
          </button>
        ))}
      </div>

      {/* Comment Box */}
      <textarea
        rows={4}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        placeholder="Write your review here..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />

      {/* Submit */}
      <button
        onClick={handleSubmitReview}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
      >
        Submit Review
      </button>
    </div>
  </div>
)}

    </div>
  );
};

export default UserDashboard;
