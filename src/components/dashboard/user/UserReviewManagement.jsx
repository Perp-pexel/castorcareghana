import React, { useEffect, useState } from 'react';
import {
  Star, Search, Edit, Trash2,
  ThumbsUp, MessageCircle, Eye, Plus
} from 'lucide-react';
import { apiGetAllReviews, apiDeleteReview } from '../../../services/products';
import { getUserData } from '../../../services/auth';

const UserReviewManagement = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserData();
      setCurrentUser(user);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiGetAllReviews();
        const normalized = (res.data || []).map((r) => ({
          id: r.id,
          userId: r.userId || r.buyerId || '',
          productName: r.productName || '',
          productImage: r.productImage || '',
          farmer: r.farmer || '',
          rating: r.rating || 0,
          title: r.title || '',
          content: r.comment || '',
          date: r.date || '',
          helpful: r.helpful || 0,
          replies: r.replies || 0,
          verified: r.verified || false,
          status: r.status || 'published',
        }));
        setReviews(normalized);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, []);

  const handleDeleteReview = async (id) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    try {
      await apiDeleteReview(id);
      setReviews((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert('Failed to delete review');
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.farmer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'published' && review.status === 'published') ||
      (selectedFilter === 'pending' && review.status === 'pending') ||
      (selectedFilter === 'high-rated' && review.rating >= 4) ||
      (selectedFilter === 'low-rated' && review.rating <= 3) ||
      (selectedFilter === 'mine' && review.userId === currentUser?.id);

    return matchesSearch && matchesFilter;
  });

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

  const ReviewCard = ({ review }) => (
    <div className="bg-white rounded-xl border p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start gap-4">
        <img
          src={review.productImage}
          alt={review.productName}
          className="w-16 h-16 rounded object-cover"
        />
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-gray-900">{review.productName}</h3>
              <p className="text-sm text-gray-600">by {review.farmer}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(review.status)}`}>
                {review.status}
              </span>
              {currentUser?.id === review.userId && (
                <div className="flex gap-1">
                  <button className="text-gray-400 hover:text-blue-600">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    className="text-gray-400 hover:text-red-600"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span>• {review.date}</span>
            {review.verified && (
              <>
                <span>•</span>
                <span className="text-green-600 font-medium">Verified Purchase</span>
              </>
            )}
          </div>

          <h4 className="font-semibold text-gray-900 mt-2">{review.title}</h4>
          <p className="text-sm text-gray-700 line-clamp-3">{review.content}</p>

          <div className="flex gap-6 mt-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <ThumbsUp className="w-4 h-4" />
              {review.helpful} helpful
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-4 h-4" />
              {review.replies} replies
            </div>
            <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
              <Eye className="w-4 h-4" />
              View full review
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 shadow-lg overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h2>
        <form className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Rating</label>
            <div className="flex gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <button type="button" key={i} className="text-gray-300 hover:text-yellow-400">
                  <Star className="w-8 h-8" />
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Summarize your experience"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Comment</label>
            <textarea
              rows={5}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:ring-green-500 focus:border-green-500"
              placeholder="Write your full review..."
            />
          </div>
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowReviewModal(false)}
              className="text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (loading) return <div className="p-10 text-center">Loading reviews...</div>;
  if (error) return <div className="p-10 text-center text-red-600">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white p-6 rounded-xl shadow-sm border flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Reviews</h1>
            <p className="text-gray-600 text-sm">Manage your product reviews</p>
          </div>
          <button
            onClick={() => setShowReviewModal(true)}
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" />
            Write Review
          </button>
        </div>

        {/* Search and Filter */}
        <div className="bg-white p-4 rounded-xl shadow-sm border flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search reviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <select
            value={selectedFilter}
            onChange={(e) => setSelectedFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
          >
            <option value="all">All Reviews</option>
            <option value="published">Published</option>
            <option value="pending">Pending</option>
            <option value="high-rated">High Rated (4-5 stars)</option>
            <option value="low-rated">Low Rated (1-3 stars)</option>
            <option value="mine">Only My Reviews</option>
          </select>
        </div>

        {/* Review Cards */}
        {filteredReviews.length > 0 ? (
          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">No reviews found</h3>
            <p className="text-gray-600">Try adjusting your search or filter</p>
          </div>
        )}

        {showReviewModal && <ReviewModal />}
      </div>
    </div>
  );
};

export default UserReviewManagement;
