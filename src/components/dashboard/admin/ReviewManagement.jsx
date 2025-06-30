import React, { useState } from 'react';
import { Search, Star, Eye, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ReviewManagement = () => {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const [reviews] = useState([
    {
      id: '1',
      productId: '1',
      productName: 'Organic Tomatoes',
      userId: '1',
      userName: 'John Doe',
      rating: 5,
      comment: 'Excellent quality tomatoes! Fresh and delicious.',
      createdAt: '2024-01-15',
      isVerified: true
    },
    {
      id: '2',
      productId: '2',
      productName: 'Free Range Eggs',
      userId: '1',
      userName: 'John Doe',
      rating: 4,
      comment: 'Good eggs, but could be fresher.',
      createdAt: '2024-01-20',
      isVerified: false
    },
    {
      id: '3',
      productId: '1',
      productName: 'Organic Tomatoes',
      userId: '4',
      userName: 'Alice Brown',
      rating: 5,
      comment: 'Best tomatoes I have ever bought! Will definitely order again.',
      createdAt: '2024-01-25',
      isVerified: true
    }
  ]);

  const filteredReviews = reviews.filter(review => {
    const matchesSearch = review.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRating = selectedRating === 'all' || review.rating === parseInt(selectedRating);
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'verified' && review.isVerified) ||
                         (selectedStatus === 'unverified' && !review.isVerified);
    return matchesSearch && matchesRating && matchesStatus;
  });

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (!hasPermission('getReviews')) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">You don't have permission to view reviews.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600 mt-1">Manage customer reviews and feedback</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
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
              value={selectedRating}
              onChange={(e) => setSelectedRating(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
            </select>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{review.productName}</h3>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600 ml-2">({review.rating}/5)</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>by {review.userName}</span>
                    <span>{new Date(review.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <div className="flex items-center gap-1">
                    {review.isVerified ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <XCircle className="w-5 h-5 text-red-500" />
                    )}
                    <span className={`text-sm ${review.isVerified ? 'text-green-600' : 'text-red-600'}`}>
                      {review.isVerified ? 'Verified' : 'Unverified'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                <button className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>
                {hasPermission('updateReview') && !review.isVerified && (
                  <button className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors text-sm">
                    Verify
                  </button>
                )}
                {hasPermission('deleteReview') && (
                  <button className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="p-12 text-center">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No reviews found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewManagement;