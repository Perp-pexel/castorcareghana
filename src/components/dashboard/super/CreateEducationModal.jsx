import React, { useState } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { apiCreateEducations } from '../../../services/products'; 

const CreateEducationModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    url: '',
    fee: '',
    media: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('url', formData.url);
    data.append('fee', formData.fee);
    data.append('media', formData.media); 

    try {
      await apiCreateEducations(data);

      Swal.fire({
        icon: 'success',
        title: 'Education Created',
        text: 'Your education post was successfully created!',
        confirmButtonColor: '#16a34a',
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Education creation failed:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response?.data?.message || 'Failed to create education. Please try again.',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Create Education Post</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Best farm practice"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="How to prep farm fields"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">URL</label>
            <input
              type="url"
              value={formData.url}
              onChange={(e) => handleChange('url', e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Fee (GHS)</label>
            <input
              type="number"
              value={formData.fee}
              onChange={(e) => handleChange('fee', e.target.value)}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Media (image/video)</label>
            <input
              type="file"
              accept="image/*,video/*"
              onChange={(e) => handleChange('media', e.target.files[0])}
              required
              className="w-full"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded disabled:opacity-50 flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              )}
              {isSubmitting ? 'Submitting...' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEducationModal;
