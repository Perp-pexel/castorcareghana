import React, { useEffect, useState } from 'react';
import {
  Package, Truck, CheckCircle, Clock, MapPin, Calendar,
  Search, RefreshCw, Download, MessageCircle, Star, Eye
} from 'lucide-react';

const UserOrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  // Load from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(savedOrders);
  }, []);

  const getStatusInfo = (status) => {
    switch (status) {
      case 'delivered':
        return { color: 'bg-green-100 text-green-800', icon: CheckCircle, label: 'Delivered' };
      case 'in-transit':
        return { color: 'bg-blue-100 text-blue-800', icon: Truck, label: 'In Transit' };
      case 'processing':
        return { color: 'bg-yellow-100 text-yellow-800', icon: Clock, label: 'Processing' };
      default:
        return { color: 'bg-gray-100 text-gray-800', icon: Package, label: 'Unknown' };
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.title?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = selectedStatus === 'all' || order.status === selectedStatus;

    const matchesTimeframe = selectedTimeframe === 'all' ||
      (selectedTimeframe === 'week' && new Date(order.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (selectedTimeframe === 'month' && new Date(order.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));

    return matchesSearch && matchesStatus && matchesTimeframe;
  });

  const OrderCard = ({ order }) => {
    const statusInfo = getStatusInfo(order.status);
    const StatusIcon = statusInfo.icon;

    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <h3 className="text-xl font-bold text-gray-900">{order.id}</h3>
              <span className={`px-3 py-1 text-sm font-medium rounded-full ${statusInfo.color} flex items-center gap-2`}>
                <StatusIcon className="w-4 h-4" />
                {statusInfo.label}
              </span>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">GH₵{order.total.toFixed(2)}</p>
              <p className="text-sm text-gray-600">{order.items.length} items</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Ordered: {order.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>Status: {statusInfo.label}</span>
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img src={item.image} alt={item.title} className="w-12 h-12 rounded object-cover" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">GH₵{item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6">
          <h4 className="font-medium text-gray-900 mb-4">Order Timeline</h4>
          <div className="space-y-4">
            {(order.timeline || []).map((step, index) => (

              <div key={index} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step.completed ? 'bg-green-600' : 'bg-gray-300'}`}>
                  {step.completed ? (
                    <CheckCircle className="w-4 h-4 text-white" />
                  ) : (
                    <Clock className="w-4 h-4 text-gray-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                    {step.status}
                  </p>
                  <p className="text-sm text-gray-600">{step.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
          <p className="text-gray-600">Track your orders made through Payaza</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-6">
          {filteredOrders.length > 0 ? (
            filteredOrders.map(order => <OrderCard key={order.id} order={order} />)
          ) : (
            <div className="bg-white text-center rounded-xl shadow-sm border border-gray-200 p-12">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
              <p className="text-gray-600">Try making a purchase or adjusting your filters.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrderTracking;
