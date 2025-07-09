import React, { createContext, useContext, useState, useEffect } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, X, CreditCard, Shield, CheckCircle } from 'lucide-react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  // Checkout Modal Component
  const CheckoutModal = ({ onClose }) => {
    const [customerInfo, setCustomerInfo] = useState({
      email: '',
      firstName: '',
      lastName: '',
      phone: '',
      address: ''
    });

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setCustomerInfo(prev => ({
        ...prev,
        [name]: value
      }));
    };

    const handlePayazaPayment = () => {
      const totalAmount = getTotalPrice();
      const orderItems = cartItems.map(item => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity
      }));

      const paymentData = {
        merchant_key: "PZ78-PKLIVE-DDA9F9B0-6ACC-4045-B689-D0A0842D1876",
        connection_mode: "live", // or "test" for testing
        checkout_amount: totalAmount * 100, // Amount in kobo/pesewas
        currency_code: "GHS",
        email_address: customerInfo.email,
        first_name: customerInfo.firstName,
        last_name: customerInfo.lastName,
        phone_number: customerInfo.phone,
        transaction_reference: `order_${Date.now()}`,
        description: `Purchase of ${cartItems.length} item(s)`,
        merchant_reference: `ORDER_${Date.now()}`,
        callback_url: window.location.origin + "/payment-callback",
        notification_url: window.location.origin + "/payment-webhook",
        metadata: {
          order_items: JSON.stringify(orderItems),
          customer_address: customerInfo.address,
          total_items: getTotalItems()
        }
      };

      // Initialize Payaza Checkout
      if (window.PayazaCheckout) {
        const checkout = new window.PayazaCheckout();
        
        checkout.setup({
          ...paymentData,
          onSuccess: function(response) {
            console.log('Payment successful:', response);
            setPaymentSuccess(true);
            clearCart(); // Clear cart after successful payment
            onClose();
            // Here you can send the payment details to your backend
            // to verify the transaction and process the order
          },
          onError: function(error) {
            console.error('Payment error:', error);
            alert('Payment failed. Please try again.');
          },
          onClose: function() {
            console.log('Payment window closed');
          }
        });

        checkout.open();
      } else {
        alert('Payment system is not available. Please try again later.');
      }
    };

    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-gray-900">Complete Your Order</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 text-2xl"
            >
              ×
            </button>
          </div>

          {/* Order Summary */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-bold text-gray-900 mb-3">Order Summary</h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between items-center text-sm">
                  <span className="text-gray-600">{item.title} x{item.quantity}</span>
                  <span className="font-medium">GH₵{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between items-center font-bold text-lg">
                <span>Total:</span>
                <span className="text-green-600">GH₵{getTotalPrice().toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={customerInfo.firstName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={customerInfo.lastName}
                  onChange={handleInputChange}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleInputChange}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20"
                placeholder="+233 XX XXX XXXX"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
              <textarea
                name="address"
                value={customerInfo.address}
                onChange={handleInputChange}
                rows={3}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500/20 resize-none"
                placeholder="Enter your delivery address..."
                required
              />
            </div>
          </form>

          {/* Security Notice */}
          <div className="flex items-center gap-2 mt-4 p-3 bg-green-50 rounded-lg">
            <Shield className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">
              Secure payment powered by Payaza. Your payment information is encrypted and protected.
            </p>
          </div>

          {/* Payment Button */}
          <div className="mt-6">
            {customerInfo.email && customerInfo.firstName && customerInfo.lastName && customerInfo.phone && customerInfo.address ? (
              <button 
                onClick={handlePayazaPayment}
                className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Pay GH₵{getTotalPrice().toFixed(2)} Securely
              </button>
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Complete form to proceed
              </button>
            )}
          </div>

          <p className="text-xs text-gray-500 text-center mt-4">
            By proceeding, you agree to our terms and conditions. You will receive order confirmation via email after successful payment.
          </p>
        </div>
      </div>
    );
  };

  // Success Modal Component
  const SuccessModal = ({ onClose }) => (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Order Successful!</h3>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. You will receive order confirmation and tracking details via email shortly.
        </p>
        <button
          onClick={() => {
            setPaymentSuccess(false);
            onClose();
          }}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );

  // Cart Sidebar Component
  const CartSidebar = () => (
    <div className={`fixed inset-0 z-50 ${isCartOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isCartOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={toggleCart}
      />
      
      {/* Cart Panel */}
      <div className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform duration-300 ${
        isCartOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <ShoppingCart className="w-6 h-6" />
              Shopping Cart ({getTotalItems()})
            </h2>
            <button
              onClick={toggleCart}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Your cart is empty</p>
                <p className="text-gray-400 text-sm">Add some products to get started</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 bg-gray-50 rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 text-sm">{item.title}</h3>
                      <p className="text-green-600 font-bold">GH₵{item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-2 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cartItems.length > 0 && (
            <div className="border-t p-6 space-y-4">
              <div className="flex justify-between items-center text-xl font-bold">
                <span>Total:</span>
                <span className="text-green-600">GH₵{getTotalPrice().toFixed(2)}</span>
              </div>
              <button
                onClick={() => setShowCheckoutModal(true)}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
              >
                <CreditCard className="w-5 h-5" />
                Proceed to Checkout
              </button>
              <button
                onClick={clearCart}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 py-2 rounded-lg font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const value = {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    getTotalPrice,
    getTotalItems,
    isCartOpen
  };

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartSidebar />
      
      {/* Checkout Modal */}
      {showCheckoutModal && (
        <CheckoutModal 
          onClose={() => setShowCheckoutModal(false)} 
        />
      )}

      {/* Success Modal */}
      {paymentSuccess && (
        <SuccessModal 
          onClose={() => setPaymentSuccess(false)} 
        />
      )}
    </CartContext.Provider>
  );
};