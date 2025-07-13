import React, { useEffect, useState } from 'react';
import {
  Search, Heart, ShoppingCart, Eye,
  Grid3X3, List
} from 'lucide-react';
import { apiGetAllProducts } from '../../../services/products';
import { useCart } from '../contexts/CartContext';

const CLOUDINARY_URL = import.meta.env.VITE_CLOUDINARY_URL;

const getImageUrl = (image) => {
  if (!image) return 'https://via.placeholder.com/300x200?text=No+Image';
  if (image.startsWith('http')) return image;
  return `${CLOUDINARY_URL}${image}`;
};


const UserProductView = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [favorites, setFavorites] = useState([]);
  const [viewProduct, setViewProduct] = useState(null);
  const { addToCart, toggleCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await apiGetAllProducts();
        setProducts(response.data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.title?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all';
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const ProductCard = ({ product }) => (
    <div
      onClick={() => setViewProduct(product)}
      className={`bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all group cursor-pointer ${viewMode === 'list' ? 'flex' : ''}`}
    >
      <div className={`relative ${viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}`}>
        <img
          src={getImageUrl(product.image)}
          alt={product.title}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
          className={`object-cover group-hover:scale-105 transition-transform duration-300 ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}`}
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(product._id || product.id);
            }}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors"
          >
            <Heart
              className="w-4 h-4"
              color={favorites.includes(product._id || product.id) ? '#dc2626' : '#4b5563'}
              fill={favorites.includes(product._id || product.id) ? '#dc2626' : 'none'}
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setViewProduct(product);
            }}
            className="bg-white/90 hover:bg-white p-2 rounded-full shadow-sm transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </button>
        </div>
      </div>

      <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
        <div className={`${viewMode === 'list' ? 'flex justify-between items-start' : ''}`}>
          <div className={`${viewMode === 'list' ? 'flex-1 pr-6' : ''}`}>
            <h3 className="font-bold text-gray-900 mb-1">{product.title}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          </div>
          <div className={`${viewMode === 'list' ? 'text-right' : ''}`}>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl font-bold text-green-600">GH₵{product.price} / {product.unit}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(product);
                  toggleCart();
                }}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
              >
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const ViewModal = () => {
    if (!viewProduct) return null;
    return (
      <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
          <button
            onClick={() => setViewProduct(null)}
            className="absolute top-1 right-3 text-gray-500 hover:bg-green-200 p-2 rounded-full text-xl"
          >
            ×
          </button>
          <img
            src={getImageUrl(viewProduct.image)}
            alt={viewProduct.title}
            className="w-full object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold mb-2">{viewProduct.title}</h2>
          <p className="text-gray-600 mb-3">{viewProduct.description}</p>
          <div className="text-lg text-green-600 font-semibold">GH₵{viewProduct.price} / {viewProduct.unit}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
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
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <Grid3X3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Product List/Grid */}
        <div className={`${viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-20 gap-15' : 'space-y-4'}`}>
          {sortedProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>

        {sortedProducts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}

        <ViewModal />
      </div>
    </div>
  );
};

export default UserProductView;
