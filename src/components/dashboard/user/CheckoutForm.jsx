import React, { useState } from 'react';
import { apiPayForProducts } from '../../../services/products';

const CheckoutForm = ({ total, items, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     
      const item = items[0];

      const response = await apiPayForProducts({
        product: item.id, // or item.product
        amount: item.price,
        currency: 'GHS',
        quantity: item.quantity,
        email,
      });

      // Redirect to payment URL
      if (response.checkout_url || response.redirect_url) {
        window.location.href = response.checkout_url || response.redirect_url;
      } else {
        alert("Couldn't get payment link");
      }

      onSuccess?.();
    } catch (error) {
      console.error('Checkout Error:', error);
      alert('Payment failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label>Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="mt-1 block w-full border rounded"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 text-white py-3 rounded"
      >
        {loading ? 'Processing...' : `Pay GH₵${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
