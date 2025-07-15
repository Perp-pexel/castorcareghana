import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye, X } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  apiGetEducations,
  apiUpdateEducations,
  apiDeleteEducations
} from '../../../services/products';
import { useAuth } from '../contexts/AuthContext';

const CLOUDINARY_UPLOAD_URL = import.meta.env.VITE_CLOUDINARY_UPLOAD_URL;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const SuperAdminEducationManagement = () => {
  const { hasPermission } = useAuth();

  const [educations, setEducations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [showMediaViewer, setShowMediaViewer] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);
  const [editingEducation, setEditingEducation] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    url: '',
    fee: '',
    media: [],
    mediaFiles: [],
    mediaUrls: ['']
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
        url: post.url,
        fee: post.fee || '',
        media: post.media || [],
        mediaFiles: [],
        mediaUrls: ['']
      });
    } else {
      setEditingEducation(null);
      setFormValues({
        title: '',
        description: '',
        url: '',
        fee: '',
        media: [],
        mediaFiles: [],
        mediaUrls: ['']
      });
    }
    setShowForm(true);
  };

  const uploadFile = async (file) => {
    const data = new FormData();
    data.append('file', file);
    data.append('upload_preset', UPLOAD_PRESET);
    try {
      const res = await fetch(CLOUDINARY_UPLOAD_URL, { method: 'POST', body: data });
      const json = await res.json();
      return json.secure_url;
    } catch {
      Swal.fire('Upload failed', '', 'error');
      return '';
    }
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
    let updatedMedia = [...formValues.media];

    for (const file of formValues.mediaFiles) {
      const url = await uploadFile(file);
      if (url) {
        updatedMedia.push({
          type: file.type.startsWith('image') ? 'image'
            : file.type.startsWith('video') ? 'video'
            : file.type.startsWith('audio') ? 'audio'
            : 'document',
          filename: file.name,
          fileUrl: url
        });
      }
    }

    for (const link of formValues.mediaUrls) {
      if (link.trim()) {
        const type = link.endsWith('.mp4') ? 'video'
          : link.endsWith('.mp3') ? 'audio'
          : link.includes('.pdf') ? 'document'
          : 'image';
        updatedMedia.push({
          type,
          filename: link.split('/').pop(),
          fileUrl: link
        });
      }
    }

    const payload = {
      title: formValues.title,
      description: formValues.description,
      url: formValues.url,
      fee: formValues.fee,
      media: updatedMedia
    };

    try {
      await apiUpdateEducations(editingEducation._id, payload);
      fetchEducations();
      setShowForm(false);
      Swal.fire('Saved successfully', '', 'success');
    } catch {
      Swal.fire('Error saving post', '', 'error');
    }
  };

  const getFirstImage = (media = []) => media.find(m => m.type === 'image')?.fileUrl;

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
              key={post._id}
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
              <p className="text-green-600 mt-1">{post.fee ? `GHS ${post.fee}` : 'Free'}</p>
              <div className="flex gap-3 mt-3">
                <Eye className="text-green-600" />
                <Edit className="text-blue-600" onClick={(e) => { e.stopPropagation(); openForm(post); }} />
                <Trash2 className="text-red-600" onClick={(e) => { e.stopPropagation(); handleDelete(post._id); }} />
              </div>
            </div>
          ))}
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg max-w-lg w-full p-6 overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">{editingEducation ? 'Edit Post' : 'Add Post'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Title" value={formValues.title}
                onChange={e => setFormValues({ ...formValues, title: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" required />

              <textarea rows={3} placeholder="Description" value={formValues.description}
                onChange={e => setFormValues({ ...formValues, description: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" required />

              <input type="text" placeholder="Fee (optional)" value={formValues.fee}
                onChange={e => setFormValues({ ...formValues, fee: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" />

              <input type="text" placeholder="Resource URL" value={formValues.url}
                onChange={e => setFormValues({ ...formValues, url: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg" />

              {/* Upload files */}
              
             <label className="block text-sm font-medium text-gray-700 mb-1">
  Media Uploads <span className="text-xs text-gray-500">(You can add multiple files)</span>
</label>

<div className="flex items-center gap-2 mb-2">
  <button
    type="button"
    onClick={() => document.getElementById('media-file-input').click()}
    className="px-4 py-2 text-sm bg-gray-100 border rounded hover:bg-gray-200"
  >
    + Add Files
  </button>
  <input
    id="media-file-input"
    type="file"
    multiple
    accept="image/*,video/*,audio/*,application/*,text/*"
    onChange={(e) => {
      const newFiles = Array.from(e.target.files);
      setFormValues(prev => ({
        ...prev,
        mediaFiles: [...prev.mediaFiles, ...newFiles]
      }));
    }}
    className="hidden"
  />
</div>

{/* File list with remove buttons */}
{formValues.mediaFiles.length > 0 && (
  <ul className="mt-2 space-y-2 text-sm text-gray-600">
    {formValues.mediaFiles.map((file, index) => (
      <li
        key={index}
        className="flex items-center justify-between px-3 py-1 rounded"
      >
        <span className="truncate max-w-[70%]">{file.name}</span>
        <button
          type="button"
          onClick={() => {
            const updated = [...formValues.mediaFiles];
            updated.splice(index, 1);
            setFormValues(prev => ({ ...prev, mediaFiles: updated }));
          }}
          className="text-red-600 text-xs hover:underline"
        >
          Remove
        </button>
      </li>
    ))}
  </ul>
)}

              {/* Show existing media */}
              {formValues.media.map((mediaItem, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded mt-1">
                  <span className="text-sm truncate">{mediaItem.filename}</span>
                  <button type="button" className="text-red-600 text-sm"
                    onClick={() => {
                      const newMedia = [...formValues.media];
                      newMedia.splice(index, 1);
                      setFormValues({ ...formValues, media: newMedia });
                    }}>
                    Remove
                  </button>
                </div>
              ))}

              {/* Media URL input */}
              {formValues.mediaUrls.map((url, index) => (
                <div key={index} className="flex items-center gap-2 mt-2">
                  <input type="text" placeholder="Add media URL" value={url}
                    onChange={e => {
                      const urls = [...formValues.mediaUrls];
                      urls[index] = e.target.value;
                      setFormValues({ ...formValues, mediaUrls: urls });
                    }}
                    className="flex-1 px-3 py-2 border rounded-lg" />
                  <button type="button" className="text-red-600 text-xs hover:underline"
                    onClick={() => {
                      const urls = [...formValues.mediaUrls];
                      urls.splice(index, 1);
                      setFormValues({ ...formValues, mediaUrls: urls });
                    }}>
                    Remove
                  </button>
                </div>
              ))}

              <button type="button" className="text-sm text-blue-600"
                onClick={() => setFormValues({ ...formValues, mediaUrls: [...formValues.mediaUrls, ''] })}>
                + Add another media URL
              </button>

              <div className="flex justify-end gap-3">
                <button type="button" className="px-4 py-2 text-gray-600" onClick={() => setShowForm(false)}>
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  Save Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Viewer */}
      {showMediaViewer && currentPost && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full p-6 overflow-y-auto max-h-[90vh] relative">
            <button onClick={() => setShowMediaViewer(false)} className="absolute top-4 right-4 text-gray-600 hover:text-red-600">
              <X size={20} />
            </button>
            <h2 className="text-lg font-semibold mb-2">{currentPost.title}</h2>
            <p className="text-gray-700 mb-2">{currentPost.description}</p>
            <p className="text-green-600 mb-2">{currentPost.fee ? `GHS ${currentPost.fee}` : 'Free'}</p>
            {currentPost.url && (
              <a href={currentPost.url} className="text-blue-600 underline block mb-4" target="_blank">
                Visit Resource
              </a>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentPost.media.map((m, i) => (
                <div key={i}>
                  {m.type === 'image' && <img src={m.fileUrl} alt={m.filename} className="rounded" />}
                  {m.type === 'video' && <video src={m.fileUrl} controls className="rounded w-full" />}
                  {m.type === 'audio' && <audio src={m.fileUrl} controls className="w-full" />}
                  {m.type === 'document' && (
                    <a href={m.fileUrl} target="_blank" rel="noopener noreferrer" className="underline text-blue-600">
                      {m.filename}
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

export default SuperAdminEducationManagement;
