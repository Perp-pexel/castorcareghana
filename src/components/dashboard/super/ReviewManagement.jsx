import React, { useState, useEffect } from 'react';
import { Search, Star, Trash2, Pencil } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Swal from 'sweetalert2';

import {
  apiGetAllReviews,
  apiDeleteReview,
  apiUpdateReview,
} from '../../../services/products';

const SuperAdminReviewManagement = () => {
  const { hasPermission } = useAuth();
 
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRating, setSelectedRating] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await apiGetAllReviews();
        setReviews(res.data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This review will be permanently deleted.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirmed.isConfirmed) {
      try {
        await apiDeleteReview(id);
        setReviews((prev) => prev.filter((r) => r.id !== id));
        Swal.fire('Deleted!', 'The review has been removed.', 'success');
      } catch (err) {
        console.error('Failed to delete review:', err);
        Swal.fire('Error', 'Could not delete review.', 'error');
      }
    }
  };

  const handleEdit = async (review) => {
    const { value: formValues } = await Swal.fire({
      title: 'Edit Review',
      html: `
        <label for="rating">Rating (1-5)</label>
        <input id="rating" type="number" min="1" max="5" value="${review.rating}" class="swal2-input" />
        <label for="comment">Comment</label>
        <textarea id="comment" class="swal2-textarea">${review.comment}</textarea>
      `,
      focusConfirm: false,
      showCancelButton: true,
      preConfirm: () => {
        const rating = parseInt(document.getElementById('rating').value);
        const comment = document.getElementById('comment').value.trim();

        if (!rating || rating < 1 || rating > 5 || !comment) {
          Swal.showValidationMessage('Please enter valid rating and comment');
        }

        return { rating, comment };
      },
    });

    if (formValues) {
      try {
        await apiUpdateReview(review.id, formValues);
        setReviews((prev) =>
          prev.map((r) =>
            r.id === review.id ? { ...r, ...formValues } : r
          )
        );
        Swal.fire('Updated!', 'Review has been updated.', 'success');
      } catch (err) {
        console.error('Failed to update review:', err);
        Swal.fire('Error', 'Could not update review.', 'error');
      }
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.productName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.userName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRating =
      selectedRating === 'all' || review.rating === parseInt(selectedRating);

    const matchesStatus = selectedStatus === 'all';

    return matchesSearch && matchesRating && matchesStatus;
  });

  const renderStars = (rating) =>
    Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));

  if (!hasPermission('getReviews')) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">
          You don't have permission to view reviews.
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">Loading reviews...</div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Review Management</h1>
          <p className="text-gray-600 mt-1">
            Manage customer reviews and feedback
          </p>
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
            </select>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {review.productName}
                    </h3>
                    <div className="flex items-center gap-1">
                      {renderStars(review.rating)}
                      <span className="text-sm text-gray-600 ml-2">
                        ({review.rating}/5)
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-3">{review.comment}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>by {review.userName}</span>
                    <span>
                      {new Date(review.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-4 border-t border-gray-100">
                {hasPermission('updateReview') && (
                  <button
                    onClick={() => handleEdit(review)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" />
                    Edit
                  </button>
                )}

                {hasPermission('deleteReview') && (
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
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
            <p className="text-gray-600">
              No reviews found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuperAdminReviewManagement;
