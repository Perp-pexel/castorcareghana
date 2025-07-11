import React, { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Eye } from 'lucide-react';
import Swal from 'sweetalert2';
import {
  apiGetAllProducts,
  apiUpdateProduct,
  apiDeleteProduct
} from '../../../services/products';
import { useAuth } from '../contexts/AuthContext';

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
    media: ''
  });

  const fetchProducts = async () => {
    try {
      const res = await apiGetAllProducts();
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
      media: product.media?.fileUrl || ''
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await apiUpdateProduct(editingProduct._id, {
        title: formValues.title,
        description: formValues.description,
        price: formValues.price
      });
      Swal.fire('Success', 'Product updated!', 'success');
      await fetchProducts();
      setShowModal(false);
      setEditingProduct(null);
    } catch (err) {
      console.error('Update failed:', err);
      Swal.fire('Error', 'Failed to update product.', 'error');
    }
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage and edit your products</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow"
            >
              {product.media?.fileUrl && (
                <img
                  src={product.media.fileUrl}
                  alt={product.title}
                  className="w-full h-48 object-cover rounded-lg mb-4"
                />
              )}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{product.title}</h3>
                  <p className="text-gray-600 mb-2 line-clamp-2">{product.description}</p>
                  <p className="text-green-600 font-medium">GHS {product.price}</p>
                </div>
                <div className="text-sm text-gray-500">
                  {new Date(product.createdAt).toLocaleDateString()}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button className="px-3 py-1 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                </button>

                {hasPermission('updateProduct') && (
                  <button
                    onClick={() => handleEdit(product)}
                    className="px-3 py-1 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                )}

                {hasPermission('deleteProduct') && (
                  <button
                    onClick={() => handleDelete(product._id)}
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
            <h2 className="text-xl font-bold mb-4">Edit Product</h2>
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
                  onChange={(e) => setFormValues({ ...formValues, description: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  rows={5}
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Price</label>
                <input
                  type="number"
                  value={formValues.price}
                  onChange={(e) => setFormValues({ ...formValues, price: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                />
              </div>
              <div className="flex justify-end gap-2">
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
                  Update Product
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
