import React, { useState, useEffect } from 'react';
import { apiSignup } from '../../../services/auth';
import Swal from 'sweetalert2';

const AddUserModal = ({ editingUser, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    contact: '',
    role: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingUser) {
      setFormData({
        firstName: editingUser.firstName || '',
        lastName: editingUser.lastName || '',
        email: editingUser.email || '',
        password: '',
        contact: editingUser.contact || '',
        role: (editingUser.role || '').toLowerCase(),
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        contact: '',
        role: '',
      });
    }
  }, [editingUser]);

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      Swal.fire({
        title: 'Missing Role',
        text: 'Please select a role before submitting.',
        icon: 'warning',
        confirmButtonColor: '#dc2626',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
        role: formData.role,
      };

      await apiSignup(payload);

      await Swal.fire({
        title: 'Success!',
        text: 'User created successfully!',
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#16a34a',
        timer: 2000,
        timerProgressBar: true,
      });

      onSuccess();
    } catch (error) {
      console.error('User registration failed:', error);

      Swal.fire({
        title: 'Error!',
        text: error.response?.data?.message || 'User registration failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#dc2626',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editingUser ? 'Edit Buyer' : 'Add New Buyer'}
        </h2>
        <form className="space-y-4" onSubmit={handleUserSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
            <input
              type="text"
              value={formData.firstName}
              onChange={(e) => handleInputChange('firstName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter first name"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
            <input
              type="text"
              value={formData.lastName}
              onChange={(e) => handleInputChange('lastName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter last name"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter email"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => handleInputChange('password', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter password"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              value={formData.role}
              onChange={(e) => handleInputChange('role', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              required
              disabled={isSubmitting}
            >
              <option value="">-- Select Role --</option>
              <option value="buyer">Buyer</option>
              <option value="farmer">Farmer</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Super Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact</label>
            <input
              type="tel"
              value={formData.contact}
              onChange={(e) => handleInputChange('contact', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter phone number"
              required
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              )}
              {isSubmitting ? 'Processing...' : editingUser ? 'Update' : 'Add'} User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
