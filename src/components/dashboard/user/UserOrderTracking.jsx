import React, { useState } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  Search,
  Filter,
  Eye,
  Download,
  MessageCircle,
  Star,
  RefreshCw
} from 'lucide-react';

const UserOrderTracking = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState('all');

  const orders = [
    {
      id: 'ORD-001',
      date: '2024-01-20',
      status: 'delivered',
      total: 45.99,
      items: [
        { name: 'Organic Tomatoes', quantity: 2, price: 9.98, image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { name: 'Fresh Lettuce Bundle', quantity: 1, price: 3.49, image: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { name: 'Seasonal Fruit Box', quantity: 1, price: 24.99, image: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
      ],
      farmer: 'Green Valley Farm',
      deliveryAddress: '123 Main St, San Francisco, CA 94102',
      estimatedDelivery: '2024-01-22',
      actualDelivery: '2024-01-21',
      trackingNumber: 'TRK123456789',
      timeline: [
        { status: 'Order Placed', date: '2024-01-20 10:30 AM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-20 11:15 AM', completed: true },
        { status: 'Preparing for Shipment', date: '2024-01-20 2:00 PM', completed: true },
        { status: 'Out for Delivery', date: '2024-01-21 8:00 AM', completed: true },
        { status: 'Delivered', date: '2024-01-21 3:45 PM', completed: true }
      ]
    },
    {
      id: 'ORD-002',
      date: '2024-01-18',
      status: 'in-transit',
      total: 32.50,
      items: [
        { name: 'Herb Garden Starter Kit', quantity: 1, price: 19.99, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { name: 'Garden Tool Set', quantity: 1, price: 12.51, image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
      ],
      farmer: 'Urban Greens',
      deliveryAddress: '123 Main St, San Francisco, CA 94102',
      estimatedDelivery: '2024-01-22',
      trackingNumber: 'TRK987654321',
      timeline: [
        { status: 'Order Placed', date: '2024-01-18 2:15 PM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-18 3:00 PM', completed: true },
        { status: 'Preparing for Shipment', date: '2024-01-19 9:00 AM', completed: true },
        { status: 'Out for Delivery', date: '2024-01-21 7:30 AM', completed: true },
        { status: 'Delivered', date: 'Expected by 6:00 PM', completed: false }
      ]
    },
    {
      id: 'ORD-003',
      date: '2024-01-15',
      status: 'processing',
      total: 67.25,
      items: [
        { name: 'Premium Seed Collection', quantity: 2, price: 25.98, image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { name: 'Organic Fertilizer', quantity: 1, price: 15.99, image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' },
        { name: 'Watering Can Set', quantity: 1, price: 25.28, image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }
      ],
      farmer: 'Heritage Seeds Co.',
      deliveryAddress: '123 Main St, San Francisco, CA 94102',
      estimatedDelivery: '2024-01-25',
      timeline: [
        { status: 'Order Placed', date: '2024-01-15 4:20 PM', completed: true },
        { status: 'Order Confirmed', date: '2024-01-16 9:00 AM', completed: true },
        { status: 'Preparing for Shipment', date: 'In progress', completed: false },
        { status: 'Out for Delivery', date: 'Pending', completed: false },
        { status: 'Delivered', date: 'Pending', completed: false }
      ]
    }
  ];

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
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    
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
        {/* Order Header */}
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
              <p className="text-2xl font-bold text-gray-900">${order.total}</p>
              <p className="text-sm text-gray-600">{order.items.length} items</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>Ordered: {order.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <span>From: {order.farmer}</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" />
              <span>
                {order.status === 'delivered' ? `Delivered: ${order.actualDelivery}` : `Expected: ${order.estimatedDelivery}`}
              </span>
            </div>
          </div>
        </div>

        {/* Order Items */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Order Items</h4>
          <div className="space-y-3">
            {order.items.map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <img 
                  src={item.image} 
                  alt={item.name}
                  className="w-12 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">${item.price}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Order Timeline */}
        <div className="p-6 border-b border-gray-200">
          <h4 className="font-medium text-gray-900 mb-4">Order Timeline</h4>
          <div className="space-y-4">
            {order.timeline.map((step, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step.completed ? 'bg-green-600' : 'bg-gray-300'
                }`}>
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

        {/* Order Actions */}
        <div className="p-6">
          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors">
              <Eye className="w-4 h-4" />
              View Details
            </button>
            {order.trackingNumber && (
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                <RefreshCw className="w-4 h-4" />
                Track Package
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              Invoice
            </button>
            {order.status === 'delivered' && (
              <>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                  <Star className="w-4 h-4" />
                  Review
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
                  <Package className="w-4 h-4" />
                  Reorder
                </button>
              </>
            )}
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg transition-colors">
              <MessageCircle className="w-4 h-4" />
              Contact Farmer
            </button>
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
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Tracking</h1>
              <p className="text-gray-600">Track your orders and manage deliveries</p>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">1</p>
                <p className="text-sm text-gray-600">Delivered</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">1</p>
                <p className="text-sm text-gray-600">In Transit</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-yellow-600">1</p>
                <p className="text-sm text-gray-600">Processing</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
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
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="processing">Processing</option>
              <option value="in-transit">In Transit</option>
              <option value="delivered">Delivered</option>
            </select>
            <select
              value={selectedTimeframe}
              onChange={(e) => setSelectedTimeframe(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Time</option>
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
            </select>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserOrderTracking;