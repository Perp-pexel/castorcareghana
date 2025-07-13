import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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

const ProductGrid = () => {
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
  const [slideIndex, setSlideIndex] = useState(0);
  const navigate = useNavigate();

  const itemsPerSlide = window.innerWidth >= 1024 ? 3 : 1;

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
        setCheckoutView(false);
        setSelectedProduct(null);
        setQuantity('');
        setEmail('');
        setFirstName('');
        setPhoneNumber('');
      } else {
        alert("❌ Payment failed or cancelled.");
      }
    });

    payazaCheckout.setOnClose(() => {
      console.log("🟡 Payaza popup closed by user.");
    });

    payazaCheckout.showPopup();
  };

  const totalPrice = selectedProduct && quantity ? convertPrice(selectedProduct.price) * quantity : 0;
  const totalInGHS = selectedProduct && quantity ? (selectedProduct.price * quantity).toFixed(2) : '0.00';

  const handlePrevSlide = () => setSlideIndex((prev) => Math.max(0, prev - itemsPerSlide));
  const handleNextSlide = () => setSlideIndex((prev) => Math.min(products.length - itemsPerSlide, prev + itemsPerSlide));

  return (
    <div className="px-10 py-16 mt-20 font-sans">
      <h2 className="text-3xl font-bold text-center mb-8">Order Our Products</h2>

      <div className="text-center mb-6">
        <label className="mr-2">Select Currency:</label>
        <select value={currency} onChange={(e) => setCurrency(e.target.value)} className="p-2 border rounded">
          {supportedCurrencies.map((curr) => (
            <option key={curr} value={curr}>{curr} ({currencySymbols[curr]})</option>
          ))}
        </select>
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>

      <div className="flex justify-center items-center gap-6">
        <button
          onClick={handlePrevSlide}
          disabled={slideIndex === 0}
          className="bg-green-600 text-white p-3 rounded-full text-xl hover:bg-green-700 disabled:opacity-50"
        >
          <FaChevronLeft />
        </button>

        <div className="flex gap-6 overflow-hidden">
          {products.slice(slideIndex, slideIndex + itemsPerSlide).map((product) => {
            const imageUrl = product.image.startsWith('http') ? product.image : `${CLOUDINARY_BASE}${product.image}`;
            const priceDisplay = Number(convertPrice(product.price)).toFixed(2);

            return (
              <div
                key={product._id}
                onClick={() => handleProductClick(product)}
                className="w-[300px] h-[350px] p-4 border border-gray-300 rounded-lg text-center cursor-pointer shadow-md"
              >
                <img src={imageUrl} alt={product.title} className="w-[90%] h-[220px] object-cover rounded-md mx-auto" />
                <h3 className="mt-2 font-semibold">{product.title}</h3>
                <p>From: {currencySymbols[currency]}{priceDisplay} / {product.unit}</p>
                <p className="text-xs text-gray-500">Stock: {product.stock}</p>
              </div>
            );
          })}
        </div>

        <button
          onClick={handleNextSlide}
          disabled={slideIndex + itemsPerSlide >= products.length}
          className="bg-green-600 text-white p-3 rounded-full text-xl hover:bg-green-700 disabled:opacity-50"
        >
          <FaChevronRight />
        </button>
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
            <p className="mt-2 text-sm text-center">Have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>Sign in</span></p>
            <p className="mt-1 text-sm text-center">No account yet? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
          </div>
        </div>
      )}

      <div className="text-center mt-8">
        <button
          onClick={() => navigate('/product')}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          View All Products
        </button>
      </div>
    </div>
  );
};

export default ProductGrid;
