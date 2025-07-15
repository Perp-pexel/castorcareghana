import React, { useEffect, useState } from 'react';
import { apiGetAllFarmerProducts } from '../../../services/products';
import { Loader2 } from 'lucide-react';
import Modal from 'react-modal';

const CLOUDINARY_BASE_URL = import.meta.env.VITE_CLOUDINARY_URL;

Modal.setAppElement('#root'); // Set this only once in your app

function AdminFarmerProductsManagement() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await apiGetAllFarmerProducts();
        setProducts(res.data);
      } catch (err) {
        console.error('Failed to fetch farmer products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const openModal = (product) => setSelectedProduct(product);
  const closeModal = () => setSelectedProduct(null);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return 'https://via.placeholder.com/300';
    if (imagePath.startsWith('http')) return imagePath;
    return `${CLOUDINARY_BASE_URL}/${imagePath}`;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin w-6 h-6 text-green-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Farmer Products</h2>
      {products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              onClick={() => openModal(product)}
              className="bg-white border border-gray-200 rounded-xl shadow hover:shadow-md cursor-pointer transition"
            >
              <img
                src={getImageUrl(product.image)}
                alt={product.title}
                className="w-full h-40 object-cover rounded-t-xl"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold">{product.title}</h3>
                <p className="text-sm text-gray-600">Unit: {product.unit}</p>
                <p className="text-green-600 font-medium">₵{product.price} / {product.unit}</p>
                <p className="text-sm text-gray-500">Stock: {product.stock}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for product detail */}
      <Modal
        isOpen={!!selectedProduct}
        onRequestClose={closeModal}
        contentLabel="Product Details"
        className="max-w-3xl w-[90%] mx-auto mt-20 bg-white p-6 rounded-xl shadow-xl overflow-y-auto max-h-[90vh]"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        {selectedProduct && (
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src={getImageUrl(selectedProduct.image)}
              alt={selectedProduct.title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div>
              <h2 className="text-2xl font-bold mb-3">{selectedProduct.title}</h2>
              <p className="mb-2"><span className="font-semibold">Unit:</span> {selectedProduct.unit}</p>
              <p className="mb-2"><span className="font-semibold">Price:</span> ₵{selectedProduct.price}</p>
              <p className="mb-2"><span className="font-semibold">Stock:</span> {selectedProduct.stock}</p>
              <button
                onClick={closeModal}
                className="mt-6 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default AdminFarmerProductsManagement;
