import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, BookOpen, User, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  apiGetEducations,
  apiUpdateEducations,
  apiDeleteEducations
} from '../../../services/products';
import { useAuth } from '../contexts/AuthContext';

const EducationManagement = () => {
  const { hasPermission } = useAuth();

  const [educations, setEducations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    url: ''
  });

  const fetchEducations = async () => {
    try {
      const res = await apiGetEducations();
      setEducations(res.data);
    } catch (err) {
      console.error('Failed to fetch educations:', err);
    }
  };

  useEffect(() => {
    fetchEducations();
  }, []);

  const handleEdit = (education) => {
    setEditingEducation(education);
    setFormValues({
      title: education.title || '',
      description: education.description || '',
      url: education.url || ''
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This education post will be permanently deleted.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmed.isConfirmed) {
      try {
        await apiDeleteEducations(id);
        await fetchEducations();
        Swal.fire('Deleted!', 'Education post has been removed.', 'success');
      } catch (err) {
        console.error('Failed to delete education:', err);
        Swal.fire('Error', 'Could not delete education.', 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiUpdateEducations(editingEducation._id, {
        title: formValues.title,
        description: formValues.description,
        url: formValues.url
      });
      Swal.fire('Success', 'Education post updated!', 'success');
      await fetchEducations();
      setShowModal(false);
      setEditingEducation(null);
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire('Error', 'Failed to update post.', 'error');
    }
  };

  const filteredEducations = educations.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Education Management</h1>
          <p className="text-gray-600 mt-1">Manage educational content and farming resources</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search education posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredEducations.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{post.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">{post.description}</p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm underline"
                  >
                    {post.url}
                  </a>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>

                {hasPermission('updateEducation') && (
                  <button
                    onClick={() => handleEdit(post)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}

                {hasPermission('deleteEducation') && (
                  <button
                    onClick={() => handleDelete(post._id)}
                    className="px-3 py-1 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Education Post</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block mb-1 text-sm font-medium">Title</label>
                <input
                  type="text"
                  value={formValues.title}
                  onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">Description</label>
                <textarea
                  value={formValues.description}
                  onChange={(e) =>
                    setFormValues({ ...formValues, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={5}
                />
              </div>

              <div>
                <label className="block mb-1 text-sm font-medium">URL</label>
                <input
                  type="text"
                  value={formValues.url}
                  onChange={(e) => setFormValues({ ...formValues, url: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingEducation(null);
                  }}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-lg"
                >
                  Update Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationManagement;
