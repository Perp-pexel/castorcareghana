import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  apiGetUserProducts,
  apiUpdateProduct,
  apiDeleteProduct,
  apiPostProducts
} from '../../../services/products';
import { useAuth } from '../contexts/AuthContext';

const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_URL;
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const UNIT_OPTIONS = ['kg', 'g', 'liter', 'ml', 'pck', 'each', 'pcs', 'pound', 'box'];

const ProductManagement = () => {
  const { hasPermission } = useAuth();

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    price: '',
    unit: '',
    stock: '',
    image: '',
    imageFile: null
  });

  const fetchProducts = async () => {
    try {
      const res = await apiGetUserProducts();
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormValues({
      title: product.title || '',
      description: product.description || '',
      price: product.price || '',
      unit: product.unit || '',
      stock: product.stock || '',
      image: product.image || '',
      imageFile: null
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const confirmed = await Swal.fire({
      icon: 'warning',
      title: 'Are you sure?',
      text: 'This product will be permanently deleted.',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    });

    if (confirmed.isConfirmed) {
      try {
        await apiDeleteProduct(id);
        await fetchProducts();
        Swal.fire('Deleted!', 'Product has been removed.', 'success');
      } catch (err) {
        console.error('Failed to delete product:', err);
        Swal.fire('Error', 'Could not delete product.', 'error');
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormValues({ ...formValues, imageFile: file });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = formValues.image;

    if (formValues.imageFile) {
      const data = new FormData();
      data.append('file', formValues.imageFile);
      data.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);

      try {
        const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: 'POST',
          body: data
        });
        const file = await res.json();
        imageUrl = file.secure_url;
      } catch (err) {
        console.error('Upload error:', err);
      }
    }

    try {
      if (editingProduct) {
        await apiUpdateProduct(editingProduct._id, {
          ...formValues,
          image: imageUrl
        });
        Swal.fire('Success', 'Product updated!', 'success');
      } else {
        await apiPostProducts({
          ...formValues,
          image: imageUrl
        });
        Swal.fire('Success', 'Product added!', 'success');
      }

      await fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Submit failed:', err);
      Swal.fire('Error', 'Failed to submit product.', 'error');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewProduct = (product) => {
    Swal.fire({
      title: product.title,
      html: `
        <img src="${product.image?.startsWith('http') ? product.image : `${CLOUDINARY_BASE_URL}${product.image}`}" 
             alt="${product.title}" 
             class="w-60 h-60 mx-auto object-cover rounded-md mb-2"/>
        <p><strong>Description:</strong> ${product.description}</p>
        <p><strong>Price:</strong> GHS ${product.price} / ${product.unit}</p>
        <p><strong>Stock:</strong> ${product.stock}</p>
      `,
      showCloseButton: true
    });
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage and edit your products</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <div className="relative flex-1 mr-4">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <button
            onClick={() => {
              setFormValues({
                title: '', description: '', price: '', unit: '', stock: '', image: '', imageFile: null
              });
              setEditingProduct(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            <Plus className="w-4 h-4" /> Add Product
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-30 m-30 mt-10">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => handleViewProduct(product)}
            >
              {product.image && (
                <img
                  src={
                    product.image.startsWith('http')
                      ? product.image
                      : `${CLOUDINARY_BASE_URL}${product.image}`
                  }
                  alt={product.title}
                  className="w-full h-60 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.title}</h3>
              <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
              <p className="text-green-600 font-medium">GHS {product.price} / {product.unit}</p>

              <div className="mt-3 flex items-center">
                <button
                  className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleViewProduct(product);
                  }}
                >
                  <Eye className="w-4 h-4" />
                </button>

                {hasPermission('updateProduct') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(product);
                    }}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}

                {hasPermission('deleteProduct') && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(product._id);
                    }}
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

      {showModal && (
        <div className="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">
              {editingProduct ? 'Edit Product' : 'Add Product'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input
                type="text"
                placeholder="Title"
                value={formValues.title}
                onChange={(e) => setFormValues({ ...formValues, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={formValues.description}
                onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="number"
                  placeholder="Price"
                  value={formValues.price}
                  onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
                <select
                  value={formValues.unit}
                  onChange={(e) => setFormValues({ ...formValues, unit: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="">Select Unit</option>
                  {UNIT_OPTIONS.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="number"
                placeholder="Stock"
                value={formValues.stock}
                onChange={(e) => setFormValues({ ...formValues, stock: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Image URL (optional)"
                value={formValues.image}
                onChange={(e) => setFormValues({ ...formValues, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    setEditingProduct(null);
                  }}
                  className="px-4 py-2 text-gray-600"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded-lg">
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductManagement;
