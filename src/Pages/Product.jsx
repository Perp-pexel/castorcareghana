import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const currencySymbols = {
  USD: '$', EUR: '€', GHS: '₵', GBP: '£',
  NGN: '₦', XOF: 'CFA', CAD: 'C$', ZAR: 'R',
  JPY: '¥', CNY: '¥', INR: '₹',
};

const supportedCurrencies = Object.keys(currencySymbols);
const BASE_URL = import.meta.env.VITE_BASE_URL;
const CLOUD_NAME = import.meta.env.VITE_CLOUD_NAME;
const CLOUDINARY_BASE = import.meta.env.VITE_CLOUDINARY_URL || `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/`;
const PAYAZA_PUBLIC_KEY = import.meta.env.VITE_PAYAZA_PUBLIC_KEY;
const EXCHANGE_KEY = import.meta.env.VITE_EXCHANGE_KEY;

const Product = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [currency, setCurrency] = useState('GHS');
  const [rates, setRates] = useState({});
  const [error, setError] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkoutView, setCheckoutView] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${BASE_URL}/products`).then((res) => setProducts(res.data)).catch(console.error);
  }, []);

  useEffect(() => {
    axios.get('https://api.currencyapi.com/v3/latest', {
      headers: { apikey: EXCHANGE_KEY },
      params: { base_currency: 'GHS', currencies: supportedCurrencies.join(',') },
    })
      .then((res) => {
        const newRates = {};
        supportedCurrencies.forEach((c) => {
          if (res.data.data[c]) newRates[c] = res.data.data[c].value;
        });
        setRates(newRates);
        setError(null);
      })
      .catch(() => setError('Failed to load exchange rates'));
  }, []);

  const convertPrice = (priceInGHS) => {
    const rate = rates?.[currency];
    if (currency === 'GHS' || !rate || typeof priceInGHS !== 'number') return Number(priceInGHS || 0);
    return Number(priceInGHS * rate);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity('');
    setCheckoutView(false);
  };

  const confirmOrder = () => {
    if (!selectedProduct || !quantity || quantity < 1) {
      alert('Please select product and quantity');
      return;
    }
    setCheckoutView(true);
  };

  const handlePayment = () => {
    if (!selectedProduct || !quantity || quantity < 1) return alert('Invalid product or quantity.');
    if (!email || !firstName || !phoneNumber) return alert('Please fill all fields.');

    const amount = parseFloat((selectedProduct.price * quantity).toFixed(2));

    if (!window.PayazaCheckout) {
      alert('Payaza Checkout is not loaded. Try refreshing the page.');
      return;
    }

    const transactionRef = "TRX-" + Date.now();

    const payazaCheckout = PayazaCheckout.setup({
      merchant_key: PAYAZA_PUBLIC_KEY,
      connection_mode: "Live",
      checkout_amount: amount,
      currency_code: "GHS",
      email_address: email,
      first_name: firstName,
      last_name: 'Customer',
      phone_number: phoneNumber,
      transaction_reference: transactionRef,
      virtual_account_configuration: { expires_in_minutes: 15 },
      additional_details: { note: "Castor Care Product Order" },
    });

    payazaCheckout.setCallback((response) => {
      if (response.status === "successful") {
        alert('✅ Payment successful!');
      } else {
        alert("❌ Payment failed or cancelled.");
      }
    });

    payazaCheckout.setOnClose(() => {
      console.log("🟡 Payaza popup closed by user.");
    });

    payazaCheckout.showPopup();
  };

  const handleRedirectToSignIn = () => {
    const amount = parseFloat((selectedProduct.price * quantity).toFixed(2));
    localStorage.setItem('pendingPayazaEmail', email);
    localStorage.setItem('pendingPayazaAmount', amount);
    localStorage.setItem('redirectToPayaza', 'true');
    localStorage.setItem('redirectAfterLogin', 'payaza');
    navigate('/signin');
  };

  const handleRedirectToSignUp = () => {
    const amount = parseFloat((selectedProduct.price * quantity).toFixed(2));
    localStorage.setItem('pendingPayazaEmail', email);
    localStorage.setItem('pendingPayazaAmount', amount);
    localStorage.setItem('redirectToPayaza', 'true');
    localStorage.setItem('redirectAfterLogin', 'payaza');
    navigate('/signup');
  };

  useEffect(() => {
    const shouldRedirect = localStorage.getItem('redirectToPayaza') === 'true';
    const storedEmail = localStorage.getItem('pendingPayazaEmail');
    const storedAmount = parseFloat(localStorage.getItem('pendingPayazaAmount'));

    if (shouldRedirect && storedEmail && storedAmount) {
      localStorage.removeItem('pendingPayazaEmail');
      localStorage.removeItem('pendingPayazaAmount');
      localStorage.removeItem('redirectToPayaza');
      setEmail(storedEmail);

      setTimeout(() => {
        handlePayment();
      }, 500);
    }
  }, []);

  const totalPrice = selectedProduct && quantity ? convertPrice(selectedProduct.price) * quantity : 0;
  const totalInGHS = selectedProduct && quantity ? (selectedProduct.price * quantity).toFixed(2) : '0.00';

  return (
    <div style={{ padding: '40px', marginTop: '8%', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ fontSize: '30px', fontWeight: 'bold', textAlign: 'center', marginBottom: '30px' }}>
        Order Our Products
      </h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label style={{ marginRight: '10px' }}>Select Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} style={{ padding: '8px' }}>
          {supportedCurrencies.map((curr) => (
            <option key={curr} value={curr}>{curr} ({currencySymbols[curr]})</option>
          ))}
        </select>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center' }}>
        {products.map((product) => {
          const imageUrl = product.image.startsWith('http') ? product.image : `${CLOUDINARY_BASE}${product.image}`;
          const priceDisplay = Number(convertPrice(product.price)).toFixed(2);

          return (
            <div key={product._id} onClick={() => handleProductClick(product)} style={{
              width: '300px', height: '350px', padding: '16px',
              border: '1px solid #ccc', borderRadius: '10px',
              textAlign: 'center', cursor: 'pointer',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }}>
              <img src={imageUrl} alt={product.title} style={{ width: '90%', height: '220px', objectFit: 'cover', borderRadius: '8px' }} />
              <h3>{product.title}</h3>
              <p>From: {currencySymbols[currency]}{priceDisplay} / {product.unit}</p>
              <p style={{ fontSize: '12px', color: 'gray' }}>Stock: {product.stock}</p>
            </div>
          );
        })}
      </div>

      {selectedProduct && !checkoutView && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-2 right-3 text-lg">✕</button>
            <img src={selectedProduct.image.startsWith('http') ? selectedProduct.image : `${CLOUDINARY_BASE}${selectedProduct.image}`} alt={selectedProduct.title} className="w-full h-50 object-cover rounded" />
            <div className="mt-4">
              <p className="text-sm mt-2 text-right">
                {currencySymbols[currency]}{Number(convertPrice(selectedProduct.price)).toFixed(2)} / {selectedProduct.unit}
              </p>
              <label className="block mb-1">Quantity:</label>
              <input type="number" min="1" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="w-full p-2 border border-gray-300 rounded mb-4" />
              <p className="font-semibold">Total: {currencySymbols[currency]}{totalPrice.toFixed(2)}</p>
              <small className="text-gray-500">Charged in GHS: ₵{totalInGHS}</small>
              <button onClick={confirmOrder} className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Confirm Order</button>
            </div>
          </div>
        </div>
      )}

      {checkoutView && selectedProduct && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-96 relative">
            <button onClick={() => setCheckoutView(false)} className="absolute top-2 right-3 text-lg">✕</button>
            <h3 className="text-lg font-bold mb-2">Checkout</h3>
            <p><strong>Product:</strong> {selectedProduct.title}</p>
            <p><strong>Quantity:</strong> {quantity} {selectedProduct.unit}</p>
            <p><strong>Total:</strong> {currencySymbols[currency]}{totalPrice.toFixed(2)}<br />
              <small className="text-gray-500">Charged in GHS: ₵{totalInGHS}</small>
            </p>

            <label className="block mt-3">Name:</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded mb-2" placeholder="Your Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label className="block">Phone Number:</label>
            <input type="tel" className="w-full p-2 border border-gray-300 rounded mb-2" placeholder="e.g. 0551234567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            <label className="block">Email:</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded mb-3" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button onClick={handlePayment} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Pay with Payaza</button>
            <p className="mt-2 text-sm text-center">Have an account? <span className="text-blue-600 cursor-pointer" onClick={handleRedirectToSignIn}>Sign in</span></p>
            <p className="mt-1 text-sm text-center">No account yet? <span className="text-blue-600 cursor-pointer" onClick={handleRedirectToSignUp}>Sign up</span></p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
