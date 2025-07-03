import React from 'react'

import  { useState } from 'react';
import { 
  Star, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Plus,
  Calendar,
  Package,
  ThumbsUp,
  MessageCircle,
  Eye
} from 'lucide-react';

const UserReviewManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);

  const reviews = [
    {
      id: 1,
      productName: 'Organic Tomatoes',
      productImage: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      farmer: 'Green Valley Farm',
      rating: 5,
      title: 'Absolutely amazing quality!',
      content: 'These tomatoes were incredibly fresh and flavorful. You can really taste the difference when they\'re grown organically. Will definitely order again!',
      date: '2024-01-15',
      helpful: 12,
      replies: 2,
      verified: true,
      status: 'published'
    },
    {
      id: 2,
      productName: 'Fresh Lettuce Bundle',
      productImage: 'https://images.pexels.com/photos/1656663/pexels-photo-1656663.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      farmer: 'Sunshine Organics',
      rating: 4,
      title: 'Good quality, fast delivery',
      content: 'The lettuce was crisp and fresh. Packaging was excellent and delivery was faster than expected. Only minor issue was one leaf was slightly wilted.',
      date: '2024-01-12',
      helpful: 8,
      replies: 1,
      verified: true,
      status: 'published'
    },
    {
      id: 3,
      productName: 'Seasonal Fruit Box',
      productImage: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      farmer: 'Orchard Hills',
      rating: 3,
      title: 'Mixed experience',
      content: 'Some fruits were perfectly ripe while others were overripe. The variety was good but quality control could be better.',
      date: '2024-01-10',
      helpful: 5,
      replies: 0,
      verified: true,
      status: 'pending'
    },
    {
      id: 4,
      productName: 'Herb Garden Starter Kit',
      productImage: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      farmer: 'Urban Greens',
      rating: 5,
      title: 'Perfect for beginners!',
      content: 'Everything I needed to start my herb garden. Clear instructions and healthy plants. Already seeing great growth after 2 weeks!',
      date: '2024-01-08',
      helpful: 15,
      replies: 3,
      verified: true,
      status: 'published'
    }
  ];

  const pendingReviews = [
    {
      id: 5,
      productName: 'Garden Tool Set',
      productImage: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      farmer: 'Farm Supply Co.',
      purchaseDate: '2024-01-20',
      orderNumber: '#ORD-005'
    }
  ];

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'published' && review.status === 'published') ||
      (selectedFilter === 'pending' && review.status === 'pending') ||
      (selectedFilter === 'high-rated' && review.rating >= 4) ||
      (selectedFilter === 'low-rated' && review.rating <= 3);
    
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-4">
        <img 
          src={review.productImage} 
          alt={review.productName}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{review.productName}</h3>
              <p className="text-gray-600 text-sm">by {review.farmer}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(review.status)}`}>
                {review.status}
              </span>
              <div className="flex items-center gap-1">
                <button className="text-gray-400 hover:text-blue-600 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="text-gray-400 hover:text-red-600 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star 
                  key={i} 
                  className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="text-sm text-gray-600">•</span>
            <span className="text-sm text-gray-600">{review.date}</span>
            {review.verified && (
              <>
                <span className="text-sm text-gray-600">•</span>
                <span className="text-sm text-green-600 font-medium">Verified Purchase</span>
              </>
            )}
          </div>

          <h4 className="font-medium text-gray-900 mb-2">{review.title}</h4>
          <p className="text-gray-700 text-sm mb-4 line-clamp-3">{review.content}</p>

          <div className="flex items-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>{review.helpful} helpful</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              <span>{review.replies} replies</span>
            </div>
            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
              <Eye className="w-4 h-4" />
              <span>View full review</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const PendingReviewCard = ({ item }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center gap-4">
        <img 
          src={item.productImage} 
          alt={item.productName}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <h3 className="font-bold text-gray-900 mb-1">{item.productName}</h3>
          <p className="text-gray-600 text-sm mb-2">by {item.farmer}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>Purchased: {item.purchaseDate}</span>
            <span>Order: {item.orderNumber}</span>
          </div>
        </div>
        <button 
          onClick={() => setShowReviewModal(true)}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Write Review
        </button>
      </div>
    </div>
  );

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="text-gray-300 hover:text-yellow-400 transition-colors"
                >
                  <Star className="w-8 h-8" />
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Review Title</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Summarize your experience"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Review</label>
            <textarea
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Share your thoughts about this product..."
            ></textarea>
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Reviews</h1>
              <p className="text-gray-600">Manage your product reviews and feedback</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-xl">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{reviews.length}</p>
                <p className="text-sm text-gray-600">Reviews Written</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Reviews */}
        {pendingReviews.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Pending Reviews</h2>
            <p className="text-gray-600 mb-6">Share your experience with these recent purchases</p>
            <div className="space-y-4">
              {pendingReviews.map((item) => (
                <PendingReviewCard key={item.id} item={item} />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search reviews..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            <select
              value={selectedFilter}
              onChange={(e) => setSelectedFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Reviews</option>
              <option value="published">Published</option>
              <option value="pending">Pending</option>
              <option value="high-rated">High Rated (4-5 stars)</option>
              <option value="low-rated">Low Rated (1-3 stars)</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Empty State */}
        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {/* Review Modal */}
        {showReviewModal && <ReviewModal />}
      </div>
    </div>
  );
};

export default UserReviewManagement;