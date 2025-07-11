import React, { useState } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2';
import { apiPostProducts } from '../../../services/products'; 

const AddProductModal = ({ onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    unit: '',
    price: '',
    stock: '',
    image: null,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileChange = (e) => {
    handleChange('image', e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('unit', formData.unit);
    data.append('price', parseFloat(formData.price));
    data.append('stock', parseInt(formData.stock));
    data.append('image', formData.image);

    try {
      const res = await apiPostProducts(data);

      console.log('Product created:', res.data);

      await Swal.fire({
        icon: 'success',
        title: 'Product Added',
        text: 'Your product was successfully created.',
        confirmButtonColor: '#16a34a',
      });

      onSuccess?.();
      onClose();
    } catch (error) {
      console.error('Product creation failed:', error);

      const errMsg =
        error.response?.data?.message || 'Failed to create product. Please try again.';

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: errMsg,
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
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Castor Oil"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Unit</label>
            <input
              type="text"
              value={formData.unit}
              onChange={(e) => handleChange('unit', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="kg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Price</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange('price', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="30"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => handleChange('stock', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="1000"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
              required
            />
          </div>

          <div className="flex justify-end mt-6">
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
              disabled={isSubmitting}
              className="ml-3 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Submitting...' : 'Add Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProductModal;
