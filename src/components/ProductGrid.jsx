
import React, { useState, useEffect } from 'react';
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

const ProductCard = ({ product, onClick, convertPrice, currency }) => (
  <div
    onClick={() => onClick(product)}
    style={{
      width: '280px', height: '340px',
      padding: '16px', border: '1px solid #ccc',
      borderRadius: '10px', textAlign: 'center',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
      cursor: 'pointer',
    }}
  >
    <img
      src={product.image}
      alt={product.name}
      style={{
        width: '100%', height: '200px',
        objectFit: 'cover', borderRadius: '8px',
      }}
    />
    <h3>{product.name}</h3>
    <p>
      From: {currencySymbols[currency]}
      {convertPrice(product.price.kg).toFixed(2)} / kg
    </p>
  </div>
);

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

  const PRODUCTS_PER_PAGE = 3;
  
  const nextSlide = () => {
    if (currentIndex + PRODUCTS_PER_PAGE < products.length) {
      setCurrentIndex(currentIndex + PRODUCTS_PER_PAGE);
    }
  };

  const prevSlide = () => {
    if (currentIndex - 3 >= 0) {
      setCurrentIndex(currentIndex - 3);
    }
  };

    const visibleProducts = products.slice(currentIndex, currentIndex + PRODUCTS_PER_PAGE);

  const totalPrice =
    selectedProduct && quantity
      ? convertPrice(selectedProduct.price[unit]) * quantity
      : 0;

  return (
    <div style={{ padding: '40px', position: 'relative', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Order Our Products</h2>

      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <label>Select Currency: </label>
        <select
          value={currency}
          onChange={(e) => setCurrency(e.target.value)}
          style={{ padding: '8px' }}
        >
          {supportedCurrencies.map((curr) => (
            <option key={curr} value={curr}>
              {curr} ({currencySymbols[curr]})
            </option>
          ))}
        </select>
          {loadingRates && <p>Loading exchange rates...</p>}
          {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <button
          onClick={prevSlide}
          disabled={currentIndex === 0}
          style={{
            fontSize: '18px',
            marginRight: '20px',
            background: '#28a745',
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ◀
        </button>

        <div style={{ display: 'flex', gap: '30px' }}>
          {products.slice(currentIndex, currentIndex + 3).map((product) => (
            <div
              key={product.id}
              onClick={() => handleProductClick(product)}
              style={{
                width: '250px',
                padding: '16px',
                border: '1px solid #ccc',
                borderRadius: '10px',
                textAlign: 'center',
                cursor: 'pointer',
                boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
              }}
            >
              <img
                src={product.image}
                alt={product.name}
                style={{
                  width: '100%',
                  height: '180px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                }}
              />
              <h3>{product.name}</h3>
              <p>
                From {currencySymbols[currency]}
                {convertPrice(product.price.kg).toFixed(2)} / kg
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={nextSlide}
          disabled={currentIndex + 3 >= products.length}
          style={{
            fontSize: '18px',
            marginLeft: '20px',
            background: '#28a745',
            color: 'white',
            padding: '10px',
            borderRadius: '50%',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          ▶
        </button>
      </div>

      {selectedProduct && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex',
          justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div style={{
            background: '#fff', padding: '30px', borderRadius: '10px',
            width: '300px', position: 'relative'
          }}>
            <button onClick={() => setSelectedProduct(null)}
              style={{
                position: 'absolute', top: '10px', right: '15px',
                background: 'none', border: 'none', fontSize: '1.2rem', cursor: 'pointer'
              }}>✕</button>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
            <h2>{selectedProduct.name}</h2>
            <p style={{fontSize: '0.8rem'}}>{currencySymbols[currency]}{convertPrice(selectedProduct.price.kg).toFixed(2)} / kg</p>
            </div>
            <img
              src={selectedProduct.image}
              alt={selectedProduct.name}
              style={{
                width: '100%', height: '150px',
                objectFit: 'cover', borderRadius: '8px',
              }}
            />
            <div style={{ marginTop: '15px' }}>
              
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                style={{ width: '100%', padding: '8px', margin: '8px 0' }}
              />
              <label>Unit:</label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
              >
                <option value="kg">kg</option>
                <option value="bag">bag</option>
                <option value="pcs">pcs</option>
                <option value="liter">liter</option>
                <option value="milliliters">ml</option>
              </select>
              <p><strong>Total:</strong> {currencySymbols[currency]}{totalPrice.toFixed(2)}</p>
              <button
                onClick={handlePayment}
                style={{
                  width: '100%', padding: '10px',
                  background: '#28a745', color: 'white',
                  border: 'none', borderRadius: '5px',
                  fontSize: '16px', cursor: 'pointer',
                }}
              >Confirm Order & Pay</button>
            </div>
          </div>
        </div>
      )}

      {showPayment && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{
            position: 'relative', width: '80%',
            height: '95vh', background: 'white',
            borderRadius: '8px', overflow: 'hidden'
          }}>
            <button
              onClick={() => setShowPayment(false)}
              style={{
                position: 'absolute', top: 10, right: 10,
                background: 'transparent', border: 'none',
                fontSize: '1.5rem', cursor: 'pointer',
              }}
            >✕</button>
            <iframe
              title="Payment App"
              src={`${PAYMENT_URL}?amount=${paymentAmount}`}
              style={{ width: '100%', height: '100%', border: 'none' }}
              allow="payment"
            />
          </div>
        </div>
      )}

        <div style={{ marginTop: '40px', textAlign: 'center' }}>
          <Link to="/product" style={{
            padding: '10px 20px', background: '#28a745',
            color: 'white', borderRadius: '5px', textDecoration: 'none'
          }}>
            View All Products
          </Link>
        </div>
    </div>
  );
};

export default ProductGrid;
