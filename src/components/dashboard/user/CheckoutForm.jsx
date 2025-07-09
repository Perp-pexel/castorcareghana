import React, { useEffect, useState } from 'react';

const PAYAZA_PUBLIC_KEY = "PZ78-PKLIVE-DDA9F9B0-6ACC-4045-B689-D0A0842D1876"; // Use test key for dev

const CheckoutForm = ({ total, items, onSuccess }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!window.PayazaCheckout) {
      console.error("PayazaCheckout not loaded.");
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!window.PayazaCheckout) {
      alert('Payaza payment library not loaded. Please try again later.');
      return;
    }

    setLoading(true);

    const transactionRef = "TRX-" + Date.now();

    const payazaCheckout = PayazaCheckout.setup({
      merchant_key: PAYAZA_PUBLIC_KEY,
      connection_mode: "Live", // Use "Test" if needed
      checkout_amount: total,
      currency_code: "GHS",
      email_address: email,
      first_name: 'Customer',
      last_name: 'Checkout',
      phone_number: "0000000000", // Optional
      transaction_reference: transactionRef,
      virtual_account_configuration: { expires_in_minutes: 15 },
      additional_details: {
        note: "Castor Care Order"
      }
    });

    payazaCheckout.setCallback((response) => {
      if (response.status === "successful") {
        // Save to localStorage
        const orders = JSON.parse(localStorage.getItem('orders') || '[]');
        const newOrder = {
          id: transactionRef,
          date: new Date().toISOString().split("T")[0],
          status: 'processing',
          total,
          items,
          timeline: [
            { status: 'Order Placed', date: new Date().toLocaleString(), completed: true },
            { status: 'Order Confirmed', date: 'Pending', completed: false },
            { status: 'Preparing for Shipment', date: 'Pending', completed: false },
            { status: 'Out for Delivery', date: 'Pending', completed: false },
            { status: 'Delivered', date: 'Pending', completed: false }
          ]
        };
        orders.unshift(newOrder);
        localStorage.setItem('orders', JSON.stringify(orders));

        onSuccess(); // Clears cart
      } else {
        alert("Payment failed or cancelled.");
      }

      setLoading(false);
    });

    payazaCheckout.setOnClose(() => {
      setLoading(false);
    });

    payazaCheckout.showPopup();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1 font-medium">Email Address</label>
        <input
          type="email"
          required
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full border px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded"
      >
        {loading ? 'Processing Payment...' : `Pay GH₵${total.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
