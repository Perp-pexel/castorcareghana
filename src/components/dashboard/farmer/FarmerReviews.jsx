import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  MessageCircle, 
  TrendingUp, 
  Users, 
  Award,
  Calendar,
  ThumbsUp,
  Quote,
  ExternalLink,
  Play,
  Loader2,
  AlertCircle
} from 'lucide-react';
import { apiGetReviews } from '../../../services/products';

const FarmerReviews = ({ farmerId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!farmerId) return;
    const fetchReviews = async () => {
      try {
        const response = await apiGetReviews(farmerId);
        setReviews(response.data);
      } catch (err) {
        setError('Failed to load reviews');
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [farmerId]);

  // Calculate review statistics
  const totalReviews = reviews.length;
  const averageRating = totalReviews > 0 
    ? (reviews.reduce((sum, review) => sum + (review.rating || 5), 0) / totalReviews).toFixed(1)
    : 0;
  const fiveStarCount = reviews.filter(review => (review.rating || 5) === 5).length;
  const recentReviews = reviews.slice(0, 6); // Show latest 6 reviews

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

  const formatDate = (dateString) => {
    if (!dateString) return 'Recently';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            Customer Reviews & Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            See what our valued customers are saying about our fresh, quality products and exceptional service
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Reviews</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{totalReviews}</p>
              </div>
              <MessageCircle className="h-10 w-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <div className="flex items-center mt-2">
                  <p className="text-3xl font-bold text-yellow-500 mr-2">{averageRating}</p>
                  <div className="flex">
                    {renderStars(Math.round(averageRating))}
                  </div>
                </div>
              </div>
              <Star className="h-10 w-10 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">5-Star Reviews</p>
                <p className="text-3xl font-bold text-green-600 mt-2">{fiveStarCount}</p>
              </div>
              <Award className="h-10 w-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
                <p className="text-3xl font-bold text-green-600 mt-2">
                  {totalReviews > 0 ? Math.round((fiveStarCount / totalReviews) * 100) : 0}%
                </p>
              </div>
              <TrendingUp className="h-10 w-10 text-green-500" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Blog/Video Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8 hover:shadow-xl transition-all duration-300">
              <div className="flex items-center mb-6">
                <Play className="h-6 w-6 text-green-600 mr-3" />
                <h2 className="text-2xl font-bold text-gray-800">Latest Updates</h2>
              </div>
              
              <div className="relative mb-6 group">
                <iframe
                  width="100%"
                  height="200"
                  src="https://www.youtube.com/embed/KJzmM9SL0mA"
                  title="Farm Updates Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-xl shadow-md"
                ></iframe>
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                Stay updated with our latest farming practices, seasonal harvests, and behind-the-scenes content. 
                Discover the passion and dedication that goes into every product we grow.
              </p>
              
              <Link
                to="/blog"
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
              >
                <span>Explore More</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-green-100 p-8">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center">
                  <Quote className="h-6 w-6 text-green-600 mr-3" />
                  <h2 className="text-2xl font-bold text-gray-800">Customer Testimonials</h2>
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="h-4 w-4 mr-1" />
                  <span>{totalReviews} happy customers</span>
                </div>
              </div>

              {loading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="h-8 w-8 animate-spin text-green-600" />
                  <span className="ml-3 text-gray-600">Loading reviews...</span>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center py-16">
                  <AlertCircle className="h-8 w-8 text-red-500 mr-3" />
                  <span className="text-red-500">{error}</span>
                </div>
              ) : totalReviews === 0 ? (
                <div className="text-center py-16">
                  <MessageCircle className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">No Reviews Yet</h3>
                  <p className="text-gray-500">Be the first to share your experience with our products!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {recentReviews.map((review, idx) => (
                    <div 
                      key={idx} 
                      className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 hover:shadow-md transition-all duration-300 hover:border-green-200"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                            {(review.name || 'A').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-gray-800">
                              {review.name || 'Anonymous Customer'}
                            </h3>
                            <div className="flex items-center mt-1">
                              <div className="flex mr-3">
                                {renderStars(review.rating || 5)}
                              </div>
                              <span className="text-sm text-gray-500 flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                {formatDate(review.date)}
                              </span>
                            </div>
                          </div>
                        </div>
                        <ThumbsUp className="h-5 w-5 text-green-600" />
                      </div>
                      
                      <blockquote className="text-gray-700 leading-relaxed italic">
                        "{review.comment || review.text || 'Great quality products and excellent service!'}"
                      </blockquote>
                      
                      {review.product && (
                        <div className="mt-4 inline-flex items-center px-3 py-1 bg-white rounded-full text-sm text-green-700 border border-green-200">
                          <span className="font-medium">Product: {review.product}</span>
                        </div>
                      )}
                    </div>
                  ))}
                  
                  {reviews.length > 6 && (
                    <div className="text-center pt-6">
                      <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
                        <span>View All Reviews</span>
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">Love Our Products?</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Share your experience and help other customers discover the quality and freshness of our farm products.
          </p>
          <button className="inline-flex items-center gap-2 px-8 py-3 bg-white text-green-600 rounded-xl font-semibold hover:bg-green-50 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
            <Star className="h-5 w-5" />
            <span>Write a Review</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FarmerReviews;