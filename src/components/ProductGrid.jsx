import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import o4 from '../assets/product/o4.webp';
import o9 from '../assets/product/o9.webp';
import c10 from '../assets/product/c10.jpg';
import m6 from '../assets/product/m6.jpg';
import s14 from '../assets/product/s14.jpg';
import s15 from '../assets/product/s15.avif';
import t6 from '../assets/product/t6.avif';
import g5 from '../assets/product/g5.avif';
import so1 from '../assets/product/so1.jpg';
import n9 from '../assets/product/n9.jpg';
import n10 from '../assets/product/n10.avif';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';


const products = [
  { id: 1, name: 'Castor Oil', price: { kg: 20, bag: 300 }, image: o4 },
  { id: 2, name: 'Castor Seed', price: { kg: 18, bag: 250 }, image: o9 },
  { id: 3, name: 'Cashew', price: { kg: 40, bag: 500 }, image: c10 },
  { id: 4, name: 'Maize', price: { kg: 25, bag: 350 }, image: m6 },
  { id: 5, name: 'Ginger', price: { kg: 30, bag: 400 }, image: g5 },
  { id: 6, name: 'Soybeans', price: { kg: 18, bag: 250 }, image: so1 },
  { id: 7, name: 'Shea Nuts', price: { kg: 22, bag: 280 }, image: s15 },
  { id: 8, name: 'Shea Butter', price: { kg: 22, bag: 280 }, image: s14 },
  { id: 9, name: 'Peanut', price: { kg: 24, bag: 310 }, image: n9 },
  { id: 10, name: 'Groundnut', price: { kg: 24, bag: 310 }, image: n10 },
  { id: 11, name: 'Tiger Nuts', price: { kg: 28, bag: 320 }, image: t6 },
];

const currencySymbols = {
  USD: '$', EUR: '€', GHS: '₵', GBP: '£',
  NGN: '₦', XOF: 'CFA', CAD: 'C$', ZAR: 'R',
  JPY: '¥', CNY: '¥', INR: '₹',
};

const supportedCurrencies = Object.keys(currencySymbols);

const ProductGrid = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [currency, setCurrency] = useState('GHS');
  const [rates, setRates] = useState({});
  const [loadingRates, setLoadingRates] = useState(false);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [productsPerPage, setProductsPerPage] = useState(3);

  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  const API_KEY = 'cur_live_o7Ylcc946R6Gqz3cMpRX0IfpSWK5bx78FHkywNRK';
  const API_URL = 'https://api.currencyapi.com/v3/latest';
  const PAYMENT_URL = 'https://business.payaza.africa/pay/castorcareghanalimited';

  useEffect(() => {
    const fetchRates = async () => {
      setLoadingRates(true);
      try {
        const response = await axios.get(API_URL, {
          headers: { apikey: API_KEY },
          params: {
            base_currency: 'GHS',
            currencies: supportedCurrencies.join(','),
          },
        });
        const fetchedRates = {};
        supportedCurrencies.forEach((curr) => {
          if (response.data.data[curr]) {
            fetchedRates[curr] = response.data.data[curr].value;
          }
        });
        setRates(fetchedRates);
      } catch (err) {
        console.error('Currency fetch error:', err);
        setError('Failed to fetch currency rates');
      } finally {
        setLoadingRates(false);
      }
    };
    fetchRates();
  }, []);

  useEffect(() => {
    const updateLayout = () => {
      const isMobile = window.innerWidth < 768;
      setProductsPerPage(isMobile ? 1 : 3);
      setCurrentIndex(0);
    };
    updateLayout();
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const convertPrice = (priceInGHS) => {
    if (currency === 'GHS' || !rates[currency]) return priceInGHS;
    return priceInGHS * rates[currency];
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setQuantity('');
    setUnit('kg');
  };

  const handlePayment = () => {
    const amount = selectedProduct && quantity
      ? convertPrice(selectedProduct.price[unit]) * quantity
      : 0;
    setPaymentAmount(amount.toFixed(2));
    setShowPayment(true);
  };

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data === 'payment_success') {
        alert('✅ Payment successful!');
        setShowPayment(false);
        setSelectedProduct(null);
        setQuantity('');
        setUnit('kg');
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const nextSlide = () => {
    if (currentIndex + productsPerPage < products.length) {
      setCurrentIndex(currentIndex + productsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - productsPerPage >= 0) {
      setCurrentIndex(currentIndex - productsPerPage);
    }
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.changedTouches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    if (touchStartX.current - touchEndX.current > 50) {
      nextSlide(); // swipe left
    } else if (touchEndX.current - touchStartX.current > 50) {
      prevSlide(); // swipe right
    }
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + productsPerPage);
  const totalPrice = selectedProduct && quantity
    ? convertPrice(selectedProduct.price[unit]) * quantity
    : 0;

  return (
    <div className="p-10 relative font-sans">
      <h2 className="text-center text-2xl font-semibold mb-8">Order Our Products</h2>

      <div className="text-center mb-6">
        <label className="mr-2">Select Currency:</label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          className="p-2 border rounded"
        >
          {supportedCurrencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr} ({currencySymbols[curr]})
            </option>
          ))}
        </select>
        {loadingRates && <p className="text-sm text-gray-500">Loading exchange rates...</p>}
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="flex items-center justify-center gap-6">
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
        className="bg-green-600 text-white p-3 rounded-full text-xl hover:bg-green-700 disabled:opacity-50"
>
  <FaChevronLeft />
        </button>

        <div
          className="flex gap-6 flex-col items-center md:flex-row md:justify-center"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {visibleProducts.map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              className="w-full max-w-xs md:w-64 p-4 border rounded-lg text-center shadow-md cursor-pointer hover:shadow-lg"
            >
              <img src={product.image} alt={product.name} className="w-full h-44 object-cover rounded mb-2" />
              <h3 className="font-semibold">{product.name}</h3>
              <p>From {currencySymbols[currency]}{convertPrice(product.price.kg).toFixed(2)} / kg</p>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex + productsPerPage >= products.length}
         className="bg-green-600 text-white p-3 rounded-full text-xl hover:bg-green-700 disabled:opacity-50"
>
  <FaChevronRight />
        </button>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-80 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-3 text-lg"
            >✕</button>
            <div className=" items-center mb-2">
              <h2 className="text-lg font-bold">{selectedProduct.name}</h2>
            </div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              className="w-full h-50 object-cover rounded"
            />
            
            <div className="mt-4">
              <p className="text-sm mt-2 text-right">{currencySymbols[currency]}{convertPrice(selectedProduct.price.kg).toFixed(2)} / kg</p>
              <label className="block mb-1">Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full p-2 border rounded mb-2"
              />
              <label className="block mb-1">Unit:</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full p-2 border rounded mb-4"
              >
                <option value="kg">kg</option>
                <option value="bag">bag</option>
                <option value="pcs">pcs</option>
                <option value="liter">liter</option>
                <option value="milliliters">ml</option>
              </select>
              <p className="font-semibold">Total: {currencySymbols[currency]}{totalPrice.toFixed(2)}</p>
              <button
                onClick={handlePayment}
                className="mt-3 w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
              >Confirm Order & Pay</button>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="relative w-4/5 h-[95vh] bg-white rounded overflow-hidden">
            <button
              onClick={() => setShowPayment(false)}
              className="absolute top-2 right-3 text-xl"
            >✕</button>
            <iframe
              title="Payment App"
              src={`${PAYMENT_URL}?amount=${paymentAmount}`}
              className="w-full h-full border-none"
              allow="payment"
            />
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <Link
          to="/product"
          className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          View All Products
        </Link>
      </div>
    </div>
  );
};

export default ProductGrid;
