import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  apiGetEducations,
  apiUpdateEducations,
  apiDeleteEducations,
  apiCreateEducations
} from '../../../services/products';
import { useAuth } from '../contexts/AuthContext';

const EducationManagement = () => {
  const { hasPermission } = useAuth();

  const [educations, setEducations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [education, setEducation] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    url: '',
    fee: '',
    media: [],
    mediaFiles: []
  });

  useEffect(() => {
    fetchEducations();
  }, []);

  const fetchEducations = async () => {
    try {
      const res = await apiGetEducations();
      setEducations(res.data);
    } catch (err) {
      console.error('Failed to fetch educations:', err);
    }
  };

  const openForm = (post = null) => {
    if (post) {
      setEditingEducation(post);
      setFormValues({
        title: post.title,
        description: post.description,
        url: post.url || '',
        fee: post.fee || '',
        media: post.media || [],
        mediaFiles: []
      });
    } else {
      setEditingEducation(null);
      setFormValues({
        title: '',
        description: '',
        url: '',
        fee: '',
        media: [],
        mediaFiles: []
      });
    }
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: 'warning',
      title: 'Delete this post?',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Yes, delete'
    });

    if (confirmed.isConfirmed) {
      try {
        await apiDeleteEducations(id);
        fetchEducations();
        Swal.fire('Deleted', '', 'success');
      } catch {
        Swal.fire('Error deleting post', '', 'error');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append('title', formValues.title);
    formData.append('description', formValues.description);
    formData.append('url', formValues.url || '');
    formData.append('fee', formValues.fee || '');

    // Only include existing media if editing
    if (editingEducation?.id && formValues.media.length > 0) {
      formData.append('existingMedia', JSON.stringify(formValues.media));
    }

    [...formValues.mediaFiles].forEach(file => {
      formData.append('media', file);
    });

    try {
      if (editingEducation?.id) {
        await apiUpdateEducations(editingEducation.id, formData);
        Swal.fire('Updated successfully', '', 'success');
      } else {
        await apiCreateEducations(formData);
        Swal.fire('Created successfully', '', 'success');
      }
      fetchEducations();
      setShowForm(false);
    } catch (error) {
      console.error('Submit failed:', error);
      const message = error?.response?.data?.message || 'Form submission error';
      Swal.fire('Error saving post', message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const getFirstImage = (media = []) =>
    media.find(m => m.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp)$/))?.fileUrl;

  const handleRemoveSavedMedia = (index) => {
    setFormValues(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Education Management</h1>
        <button
          onClick={() => openForm()}
          className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          <Plus size={16} /> Add Education
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-green-500"
        />
      </div>

      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-20 m-20 mt-10">
        {educations
          .filter(post => post.title.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(post => (
            <div
              key={post.id}
              onClick={() => {
                setCurrentPost(post);
                setShowMediaViewer(true);
              }}
              className="bg-white p-4 rounded-lg shadow hover:shadow-md cursor-pointer transition"
            >
              {getFirstImage(post.media) && (
                <img
                  src={getFirstImage(post.media)}
                  alt={post.title}
                  className="w-full h-70 object-cover rounded mb-3"
                />
              )}
              <h3 className="font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{post.description}</p>
              <p className="text-green-600 mt-1">
                {post.fee && parseFloat(post.fee) > 0 ? `GHS ${post.fee}` : 'Free'}
              </p>
              {post.owner && (
                <p className="text-xs text-gray-400 mt-1">
                  By {post.owner.firstName} {post.owner.lastName}
                </p>
              )}
              <div className="flex gap-3 mt-3">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentPost(post);
                    setShowMediaViewer(true);
                  }}
                >
                  <Eye className="text-green-600" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    openForm(post);
                  }}
                >
                  <Edit className="text-blue-600" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(post.id);
                  }}
                >
                  <Trash2 className="text-red-600" />
                </button>
              </div>
            </div>
          ))}
      </div>

     {showForm && (
  <div className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 overflow-auto">
    <div className="bg-white rounded-lg w-full max-w-lg relative max-h-[90vh] overflow-hidden">
      {/* Scrollable content */}
      <div className="overflow-y-auto max-h-[90vh] p-6 pb-20">
        <h2 className="text-xl font-semibold mb-4">
          {editingEducation ? 'Edit Education' : 'Add Education'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Title"
            value={formValues.title}
            onChange={e => setFormValues({ ...formValues, title: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          />
          <textarea
            placeholder="Description"
            value={formValues.description}
            onChange={e => setFormValues({ ...formValues, description: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            required
          ></textarea>
          <input
            type="url"
            placeholder="Course URL (optional)"
            value={formValues.url}
            onChange={e => setFormValues({ ...formValues, url: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            placeholder="Fee"
            value={formValues.fee}
            onChange={e => setFormValues({ ...formValues, fee: e.target.value })}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />
          <input
            type="file"
            multiple
            onChange={e =>
              setFormValues(prev => ({
                ...prev,
                mediaFiles: [...prev.mediaFiles, ...Array.from(e.target.files)]
              }))
            }
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
          />

          {(formValues.media.length > 0 || formValues.mediaFiles.length > 0) && (
            <div className="space-y-3 text-sm text-gray-700 mt-2">
              {formValues.media.length > 0 && (
                <div>
                  <h4 className="font-medium">Saved Media:</h4>
                  {formValues.media.map((m, index) => (
                    <div key={index} className="flex justify-between items-center gap-2 border p-2 rounded">
                      <div className="flex items-center gap-2">
                        {m.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp)$/) && (
                          <img src={m.fileUrl} alt="media" className="w-12 h-12 object-cover rounded" />
                        )}
                        {m.fileUrl?.match(/\.(mp4|webm)$/) && (
                          <video src={m.fileUrl} className="w-12 h-12 rounded" />
                        )}
                        {m.fileUrl?.match(/\.(mp3|wav)$/) && (
                          <audio src={m.fileUrl} controls className="w-40" />
                        )}
                        {m.fileUrl?.match(/\.(pdf|doc|docx)$/) && (
                          <a
                            href={m.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline text-xs"
                          >
                            {m.filename || 'View Document'}
                          </a>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemoveSavedMedia(index)}
                        className="text-red-600 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
              {formValues.mediaFiles.length > 0 && (
                <div>
                  <h4 className="font-medium">New Files:</h4>
                  {formValues.mediaFiles.map((file, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span>{file.name}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setFormValues(prev => ({
                            ...prev,
                            mediaFiles: prev.mediaFiles.filter((_, i) => i !== index)
                          }))
                        }
                        className="text-red-600 hover:underline text-xs"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-green-600 text-white rounded-lg"
            >
              {loading ? 'Saving...' : editingEducation ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>

      {/* Fixed close button */}
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-black"
            >
              <X />
            </button>
          </div>
        </div>
      )}


      {showMediaViewer && currentPost && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg p-4 w-full max-w-2xl overflow-y-auto max-h-[90vh] relative">
            <button
              className="absolute right-4 top-4 text-gray-600 hover:text-black"
              onClick={() => setShowMediaViewer(false)}
            >
              <X />
            </button>
            <h2 className="text-2xl font-bold mb-3">{currentPost.title}</h2>
            <p className="mb-2 text-gray-700">{currentPost.description}</p>
            <p className="text-green-600 font-semibold">
              {currentPost.fee && parseFloat(currentPost.fee) > 0 ? `GHS ${currentPost.fee}` : 'Free'}
            </p>
            {currentPost?.url?.trim() && (
  <a
    href={currentPost.url}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-3 inline-block"
  >
    Visit Site
  </a>
)}

            {currentPost.owner && (
              <p className="text-sm text-gray-500 mb-2">
                Posted by {currentPost.owner.firstName} {currentPost.owner.lastName}
              </p>
            )}
            <div className="grid grid-cols-1 gap-4 mt-4">
              {currentPost.media?.map((m, index) => (
                <div key={index}>
                  {m.fileUrl?.match(/\.(jpeg|jpg|png|gif|webp)$/) && (
                    <img src={m.fileUrl} alt="media" className="w-full rounded" />
                  )}
                  {m.fileUrl?.match(/\.(mp4|webm)$/) && (
                    <video controls src={m.fileUrl} className="w-full rounded" />
                  )}
                  {m.fileUrl?.match(/\.(mp3|wav)$/) && (
                    <audio controls src={m.fileUrl} className="w-full" />
                  )}
                  {m.fileUrl?.match(/\.(pdf|doc|docx)$/) && (
                    <a
                      href={m.fileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      View Document
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EducationManagement;
