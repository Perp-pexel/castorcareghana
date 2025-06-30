import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Eye, Package, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const ProductManagement = () => {
  const { hasPermission } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const [products] = useState([
    {
      id: '1',
      name: 'Organic Tomatoes',
      description: 'Fresh organic tomatoes grown without pesticides',
      price: 4.99,
      category: 'Vegetables',
      farmerId: '2',
      farmerName: 'Jane Smith',
      stock: 100,
      imageUrl: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg',
      createdAt: '2024-01-15',
      isActive: true
    },
    {
      id: '2',
      name: 'Free Range Eggs',
      description: 'Farm fresh eggs from free range chickens',
      price: 6.99,
      category: 'Dairy & Eggs',
      farmerId: '2',
      farmerName: 'Jane Smith',
      stock: 50,
      imageUrl: 'https://images.pexels.com/photos/162712/egg-white-food-protein-162712.jpeg',
      createdAt: '2024-01-20',
      isActive: true
    },
    {
      id: '3',
      name: 'Organic Apples',
      description: 'Sweet and crispy organic apples',
      price: 3.49,
      category: 'Fruits',
      farmerId: '2',
      farmerName: 'Jane Smith',
      stock: 0,
      imageUrl: 'https://images.pexels.com/photos/102104/pexels-photo-102104.jpeg',
      createdAt: '2024-01-25',
      isActive: false
    }
  ]);

  const categories = ['Vegetables', 'Fruits', 'Dairy & Eggs', 'Grains', 'Herbs'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const ProductModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {editingProduct ? 'Edit Product' : 'Add New Product'}
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter product name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              rows="3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Enter product description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
            <input
              type="number"
              step="0.01"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500">
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              type="number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0"
            />
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={() => setShowModal(false)}
              className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              {editingProduct ? 'Update' : 'Add'} Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  if (!hasPermission('getProducts')) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600">You don't have permission to view products.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
          <p className="text-gray-600 mt-1">Manage agricultural products and inventory</p>
        </div>
        {hasPermission('createProduct') && (
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
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
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
                  <span className="text-lg font-bold text-green-600">${product.price}</span>
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {product.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <Package className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{product.stock} in stock</span>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm text-gray-600">by {product.farmerName}</span>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    product.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-lg transition-colors text-sm">
                    <Eye className="w-4 h-4 inline mr-1" />
                    View
                  </button>
                  {hasPermission('updateProduct') && (
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowModal(true);
                      }}
                      className="px-3 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  )}
                  {hasPermission('deleteProduct') && (
                    <button className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showModal && <ProductModal />}
    </div>
  );
};

export default ProductManagement;