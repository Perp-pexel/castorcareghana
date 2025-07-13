import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const PAYAZA_PUBLIC_KEY = import.meta.env.VITE_PAYAZA_PUBLIC_KEY;

const Education = () => {
  const [educations, setEducations] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [checkoutView, setCheckoutView] = useState(false);
  const [mediaView, setMediaView] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEducations = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/educations`);
        setEducations(Array.isArray(response.data) ? response.data : []);
      } catch (err) {
        setError('Failed to fetch education programs');
      }
    };
    fetchEducations();
  }, []);

  const handleCardClick = async (edu) => {
    try {
      const res = await axios.get(`${BASE_URL}/educations/${edu.id}`);
      setSelectedEducation(res.data);
      if (!res.data.fee) {
        setMediaView(true);
      } else {
        setCheckoutView(true);
      }
    } catch (err) {
      alert('Failed to load education details');
    }
  };

  const handlePayment = () => {
    if (!selectedEducation) return alert('Invalid selection');
    if (!email || !firstName || !phoneNumber) return alert('Fill in all fields to proceed.');

    if (typeof window.PayazaCheckout === 'undefined' || !window.PayazaCheckout.setup) {
      return alert('❌ Payaza script not fully loaded. Please refresh the page.');
    }

    const amount = parseFloat(selectedEducation.fee);
    const transactionRef = `EDU-${selectedEducation.id}-${Date.now()}`;

    const payazaCheckout = window.PayazaCheckout.setup({
      merchant_key: PAYAZA_PUBLIC_KEY,
      connection_mode: 'Live',
      checkout_amount: amount,
      currency_code: 'GHS',
      email_address: email,
      first_name: firstName,
      last_name: selectedEducation.title || 'Education',
      phone_number: phoneNumber,
      transaction_reference: transactionRef,
      virtual_account_configuration: { expires_in_minutes: 15 },
      additional_details: { note: `Education payment for ${selectedEducation.title}` },
    });

    payazaCheckout.setCallback((response) => {
      if (response.status === 'successful') {
        alert('✅ Payment successful!');
        setCheckoutView(false);
        setMediaView(true);
      } else {
        const reason = response?.message || response?.status_description || JSON.stringify(response) || 'Unknown error';
        alert(`❌ Payment failed: ${reason}`);
      }
    });

    payazaCheckout.setOnClose(() => {
      console.log('🟡 Payaza popup closed.');
    });

    payazaCheckout.showPopup();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 mt-25 mb-25">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Education Programs</h2>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {educations.map((edu) => (
          <div
            key={edu.id}
            onClick={() => handleCardClick(edu)}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-4 cursor-pointer border border-gray-100"
          >
            {edu.media?.find((m) => m.type === 'image') && (
              <img
                src={edu.media.find((m) => m.type === 'image').fileUrl}
                alt={edu.title}
                className="w-full h-50 object-cover rounded-lg mb-3"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-800">{edu.title}</h3>
            <p className="text-gray-600 text-sm mt-1 line-clamp-3">{edu.description}</p>
            <p className="text-purple-600 font-semibold text-sm mt-2">
              {edu.fee ? `Fee: GHS ${parseFloat(edu.fee).toFixed(2)}` : 'Free'}
            </p>
            {edu.user?.firstName && <p className="text-gray-500 text-xs mt-1">Posted by: {edu.user.firstName}</p>}
          </div>
        ))}
      </div>

      {checkoutView && selectedEducation && (
        <div className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 overflow-y-auto p-4">
          <div className="bg-white p-6 rounded-lg w-full max-w-xl relative">
            <button onClick={() => setCheckoutView(false)} className="absolute top-2 right-3 text-lg">✕</button>
            <h3 className="text-lg font-bold mb-2">Checkout</h3>
            <p><strong>Program:</strong> {selectedEducation.title}</p>
            <p className="mt-3"><strong>Fee:</strong> GHS {parseFloat(selectedEducation.fee).toFixed(2)}</p>

            <label className="block mt-3">Name:</label>
            <input type="text" className="w-full border border-gray-300 p-2 mb-2" placeholder="Your Name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />

            <label className="block">Phone Number:</label>
            <input type="tel" className="w-full border border-gray-300 p-2 mb-2" placeholder="e.g. 0551234567" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />

            <label className="block">Email:</label>
            <input type="email" className="w-full border border-gray-300 p-2 mb-3" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />

            <button onClick={handlePayment} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Pay with Payaza</button>

            <p className="mt-3 text-sm text-center">Have an account? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signin')}>Sign in</span></p>
            <p className="text-sm text-center">No account yet? <span className="text-blue-600 cursor-pointer" onClick={() => navigate('/signup')}>Sign up</span></p>
          </div>
        </div>
      )}

      {mediaView && selectedEducation && (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 overflow-y-auto p-4">
          <div className="bg-white p-6 rounded-xl w-full h-full overflow-y-auto relative">
            <button onClick={() => setMediaView(false)} className="absolute top-4 right-6 text-2xl text-gray-600 hover:text-black">✕</button>
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{selectedEducation.title}</h3>
            <p className="mb-2 text-gray-700"><strong>Description:</strong> {selectedEducation.description}</p>
            <p className="mb-2 text-gray-700"><strong>Link:</strong> <a href={selectedEducation.url} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{selectedEducation.url}</a></p>
            <p className="mb-2 text-gray-500 text-sm">Posted by: {selectedEducation.user?.firstName}</p>

            <div className="space-y-6 mt-6">
              {selectedEducation.media?.map((media, index) => {
                const fileUrl = media.fileUrl;
                const fileName = media.filename || '';
                const fileExt = fileName.split('.').pop().toLowerCase();

                const isImage = /\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i.test(fileName);
                const isVideo = /\.(mp4|webm|mov|avi)$/i.test(fileName);
                const isAudio = /\.(mp3|wav|ogg)$/i.test(fileName);
                const isPdf = /\.pdf$/i.test(fileName);
                const isDocument = /\.(docx?|xlsx?|pptx?|txt|csv|zip)$/i.test(fileName);
                const isOther = !isImage && !isVideo && !isAudio && !isPdf && !isDocument;

                return (
                  <div key={index} className="border border-gray-200 p-4 rounded-lg flex flex-col items-center">
                    <p className="font-semibold capitalize mb-2">{media.type || fileExt}</p>

                    {isImage && (
                      <img src={fileUrl} alt={fileName} className="w-full max-w-xs object-contain rounded" />
                    )}

                    {isVideo && (
                      <video controls className="w-full max-w-xs mt-2 rounded">
                        <source src={fileUrl} type={`video/${fileExt}`} />
                        Your browser does not support the video tag.
                      </video>
                    )}

                    {isAudio && (
                      <audio controls className="w-full max-w-xs mt-2">
                        <source src={fileUrl} type={`audio/${fileExt}`} />
                        Your browser does not support the audio tag.
                      </audio>
                    )}

                    {isPdf && (
                      <iframe src={fileUrl} title={`PDF: ${fileName}`} className="w-full h-96 mt-2 rounded"></iframe>
                    )}

                    {(isDocument || isOther) && (
                      <a href={fileUrl} download className="text-blue-600 underline mt-2 text-sm text-center">
                        📄 Download {fileName}
                      </a>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Education;
