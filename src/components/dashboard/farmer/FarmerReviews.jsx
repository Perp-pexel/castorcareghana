import React, { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  MessageSquare, 
  ThumbsUp, 
  ThumbsDown,
  User,
  Calendar,
  TrendingUp,
  Award,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

function FarmerReviews() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const reviews = [
    {
      id: 1,
      customer: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      product: 'Organic Tomatoes',
      rating: 5,
      date: '2024-01-15',
      status: 'published',
      verified: true,
      comment: 'Absolutely amazing tomatoes! Fresh, juicy, and full of flavor. The quality is outstanding and they arrived perfectly ripe. Will definitely order again!',
      helpful: 12,
      response: null
    },
    {
      id: 2,
      customer: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=100',
      product: 'Fresh Lettuce',
      rating: 4,
      date: '2024-01-14',
      status: 'published',
      verified: true,
      comment: 'Good quality lettuce, very fresh and crispy. Packaging was excellent. Only minor issue was delivery took a day longer than expected.',
      helpful: 8,
      response: 'Thank you for your feedback! We apologize for the delivery delay and are working with our logistics partner to improve timing.'
    },
    {
      id: 3,
      customer: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      product: 'Organic Carrots',
      rating: 5,
      date: '2024-01-13',
      status: 'published',
      verified: false,
      comment: 'These carrots are incredible! Sweet, crunchy, and perfect for my family. My kids actually ask for more vegetables now!',
      helpful: 15,
      response: 'So wonderful to hear your kids are enjoying our carrots! Thank you for choosing organic.'
    },
    {
      id: 4,
      customer: 'David Wilson',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      product: 'Bell Peppers',
      rating: 2,
      date: '2024-01-12',
      status: 'pending',
      verified: true,
      comment: 'Peppers arrived with some bruising and weren\'t as fresh as expected. Disappointed with this order.',
      helpful: 3,
      response: null
    },
    {
      id: 5,
      customer: 'Lisa Thompson',
      avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
      product: 'Fresh Spinach',
      rating: 5,
      date: '2024-01-11',
      status: 'published',
      verified: true,
      comment: 'Best spinach I\'ve ever bought! So fresh and clean, no grit or wilted leaves. Perfect for salads and smoothies.',
      helpful: 9,
      response: 'Thank you! We take great care in washing and packaging our leafy greens.'
    },
    {
      id: 6,
      customer: 'Robert Martinez',
      avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
      product: 'Organic Potatoes',
      rating: 4,
      date: '2024-01-10',
      status: 'published',
      verified: true,
      comment: 'Great potatoes, perfect for roasting. Good size and quality. Would like to see more variety in the future.',
      helpful: 6,
      response: null
    }
  ];

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 65 },
    { stars: 4, count: 48, percentage: 20 },
    { stars: 3, count: 24, percentage: 10 },
    { stars: 2, count: 8, percentage: 3 },
    { stars: 1, count: 4, percentage: 2 }
  ];

  const totalReviews = ratingDistribution.reduce((sum, item) => sum + item.count, 0);
  const averageRating = (
    ratingDistribution.reduce((sum, item) => sum + (item.stars * item.count), 0) / totalReviews
  ).toFixed(1);

  const getFilteredReviews = () => {
    let filtered = reviews;

    // Filter by tab
    switch (activeTab) {
      case 'published':
        filtered = filtered.filter(review => review.status === 'published');
        break;
      case 'pending':
        filtered = filtered.filter(review => review.status === 'pending');
        break;
      case 'high-rated':
        filtered = filtered.filter(review => review.rating >= 4);
        break;
      case 'low-rated':
        filtered = filtered.filter(review => review.rating <= 2);
        break;
      default:
        break;
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(review =>
        review.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.product.toLowerCase().includes(searchTerm.toLowerCase()) ||
        review.comment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Customer Reviews</h1>
        <p className="text-gray-600 mt-2">Manage and respond to customer feedback on your products.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{totalReviews}</p>
            </div>
            <MessageSquare className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Rating</p>
              <div className="flex items-center mt-2">
                <p className="text-2xl font-bold text-gray-900 mr-2">{averageRating}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Response Rate</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">85%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending Reviews</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">
                {reviews.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <AlertCircle className="h-8 w-8 text-orange-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Rating Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Rating Distribution</h2>
          <div className="space-y-3">
            {ratingDistribution.map((item) => (
              <div key={item.stars} className="flex items-center space-x-3">
                <div className="flex items-center space-x-1 w-12">
                  <span className="text-sm font-medium">{item.stars}</span>
                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary-600 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{item.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Reviews List */}
        <div className="lg:col-span-3 space-y-6">
          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search reviews..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>
              <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </button>
            </div>

            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {[
                  { id: 'all', name: 'All Reviews' },
                  { id: 'published', name: 'Published' },
                  { id: 'pending', name: 'Pending' },
                  { id: 'high-rated', name: 'High Rated' },
                  { id: 'low-rated', name: 'Low Rated' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Reviews */}
          <div className="space-y-4">
            {getFilteredReviews().map((review) => (
              <div key={review.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-start space-x-4">
                  <img
                    src={review.avatar}
                    alt={review.customer}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="text-lg font-semibold text-gray-900">{review.customer}</h3>
                          {review.verified && (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{review.product}</p>
                      </div>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(review.status)}`}>
                        {review.status}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 mb-3">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {review.date}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{review.comment}</p>
                    
                    {review.response && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="flex items-center space-x-2 mb-2">
                          <div className="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                            <User className="h-3 w-3 text-white" />
                          </div>
                          <span className="text-sm font-medium text-gray-900">Your Response</span>
                        </div>
                        <p className="text-sm text-gray-700">{review.response}</p>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {review.helpful} helpful
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        {!review.response && (
                          <button className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                            Respond
                          </button>
                        )}
                        {review.status === 'pending' && (
                          <>
                            <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                              Approve
                            </button>
                            <button className="px-3 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors text-sm">
                              Reject
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerReviews;