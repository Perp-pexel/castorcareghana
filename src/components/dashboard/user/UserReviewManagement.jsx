import React, { useEffect, useState } from 'react';
import {
  Star,
  Search,
  Edit,
  Trash2,
  Plus,
  ThumbsUp,
  MessageCircle,
  Eye,
} from 'lucide-react';
import { apiGetAllReviews } from '../../../services/products';

const UserReviewManagement = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showReviewModal, setShowReviewModal] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiGetAllReviews();
        const normalized = (res.data || []).map((r) => ({
          id: r.id,
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

  const filteredReviews = reviews.filter((review) => {
    const productName = review.productName || '';
    const farmer = review.farmer || '';
    const title = review.title || '';

    const matchesSearch =
      productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      farmer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      title.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesFilter =
      selectedFilter === 'all' ||
      (selectedFilter === 'published' && review.status === 'published') ||
      (selectedFilter === 'pending' && review.status === 'pending') ||
      (selectedFilter === 'high-rated' && review.rating >= 4) ||
      (selectedFilter === 'low-rated' && review.rating <= 3);

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

  const ReviewModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-6">Write a Review</h2>
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <button key={i} type="button" className="text-gray-300 hover:text-yellow-400 transition-colors">
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

  if (loading) {
    return <div className="p-10 text-center">Loading reviews...</div>;
  }

  if (error) {
    return <div className="p-10 text-center text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
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

        <div className="space-y-4">
          {filteredReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No reviews found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        {showReviewModal && <ReviewModal />}
      </div>
    </div>
  );
};

export default UserReviewManagement;
