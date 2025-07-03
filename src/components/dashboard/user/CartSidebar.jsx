import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import CheckoutForm from '../../dashboard/user/CheckoutForm'; 

const CartSidebar = () => {
  const {
    isOpen,
    toggleCart,
    items,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showCheckout, setShowCheckout] = useState(false);

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const total = subtotal;

  return (
    <div
      className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } transition-transform duration-300`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="w-6 h-6 mr-2" />
            {showCheckout ? 'Checkout' : 'Your Cart'}
          </h2>
          <button onClick={toggleCart} className="hover:bg-gray-100 p-2 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {!showCheckout ? (
            <>
              {items.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
                  <p className="text-gray-500 text-lg">Your cart is empty</p>
                  <p className="text-gray-400">Add some products to get started!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map(item => (
                    <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                      <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-600">GH₵{item.price}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-gray-200 rounded">
                          <Minus size={16} />
                        </button>
                        <span className="w-6 text-center font-medium">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-gray-200 rounded">
                          <Plus size={16} />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-full">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
         <CheckoutForm total={total} items={items} onSuccess={clearCart} />


          )}
        </div>

        {/* Footer */}
        {items.length > 0 && !showCheckout && (
          <div className="p-6 border-t space-y-4">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>GH₵{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>GH₵{total.toFixed(2)}</span>
            </div>
            <button
              onClick={() => setShowCheckout(true)}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
            >
              Checkout - GH₵{total.toFixed(2)}
            </button>
          </div>
        )}

        {showCheckout && (
          <div className="p-6 border-t">
            <button
              onClick={() => setShowCheckout(false)}
              className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50"
            >
              Back to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartSidebar;
