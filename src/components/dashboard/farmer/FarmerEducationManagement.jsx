import React, { useState, useEffect } from 'react';
import {
  CreditCard, X, Loader2,
  Clock, Users, Award, AlertCircle, Download
} from 'lucide-react';
import { apiGetEducations } from '../../../services/products';

const CLOUDINARY_CLOUD_NAME = 'dl985xbfh';
const PAYAZA_PUBLIC_KEY = import.meta.env.VITE_PAYAZA_PUBLIC_KEY;

const getMediaUrl = (fileUrl) => {
  if (!fileUrl) return 'https://via.placeholder.com/400x300?text=No+Image';
  return fileUrl.startsWith('http')
    ? fileUrl
    : `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${fileUrl}`;
};

function FarmerEducationManagement() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [userFullName, setUserFullName] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [fullscreenImageUrl, setFullscreenImageUrl] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await apiGetEducations();
        setCourses(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        setError('Failed to load courses');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCourses();

    const storedUser = JSON.parse(localStorage.getItem('user') || '{}');
    if (storedUser.email) setUserEmail(storedUser.email);
    if (storedUser.contact) setUserPhoneNumber(storedUser.contact);
    const fullName = [storedUser.firstName, storedUser.lastName].filter(Boolean).join(' ');
    if (fullName) setUserFullName(fullName);
  }, []);

  const handlePreview = (course) => {
    setSelectedCourse(course);
    setShowCourseModal(true);
  };

  const handleEnroll = (course) => {
    if (course.fee === 0) {
      window.open(course.url, '_blank');
      return;
    }
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const processPayment = () => {
    const course = selectedCourse;
    if (!course) return alert('Invalid selection');
    if (!userEmail || !userFullName || !userPhoneNumber)
      return alert('Please fill in all required fields.');

    if (typeof window.PayazaCheckout === 'undefined' || !window.PayazaCheckout.setup) {
      return alert('❌ Payaza script not loaded. Please refresh the page.');
    }

    const [firstName, ...rest] = userFullName.trim().split(' ');
    const lastName = rest.join(' ') || 'Customer';
    const transactionRef = `EDU-${course._id}-${Date.now()}`;

    const payazaCheckout = window.PayazaCheckout.setup({
      merchant_key: PAYAZA_PUBLIC_KEY,
      connection_mode: 'Live',
      checkout_amount: parseFloat(course.fee),
      currency_code: 'GHS',
      email_address: userEmail,
      first_name: firstName,
      last_name: lastName,
      phone_number: userPhoneNumber,
      transaction_reference: transactionRef,
      virtual_account_configuration: { expires_in_minutes: 15 },
      additional_details: { note: `Education payment for ${course.title}` },
    });

    payazaCheckout.setCallback((response) => {
      if (response.status === 'successful') {
        alert('✅ Payment successful!');
        window.open(course.url, '_blank');
        setShowPaymentModal(false);
      } else {
        const reason = response?.message || response?.status_description || 'Unknown error';
        alert(`❌ Payment failed: ${reason}`);
      }
    });

    payazaCheckout.setOnClose(() => {
      console.log('🟡 Payaza popup closed.');
    });

    payazaCheckout.showPopup();
  };

  const ImageOverlayViewer = () => {
    if (!fullscreenImageUrl) return null;
    const filename = fullscreenImageUrl.split('/').pop();
    return (
      <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center p-4">
        <div className="relative max-w-4xl w-full">
          <img
            src={fullscreenImageUrl}
            alt="Full View"
            className="w-full max-h-[80vh] object-contain rounded"
          />
          <button
            onClick={() => setFullscreenImageUrl(null)}
            className="absolute top-4 right-4 bg-white text-black rounded-full p-2 shadow hover:bg-red-600 hover:text-white"
            title="Close"
          >
            <X className="w-6 h-6" />
          </button>
          <a
            href={fullscreenImageUrl}
            download={filename}
            className="absolute top-4 left-4 bg-white text-black rounded-full p-2 shadow hover:bg-green-600 hover:text-white"
            title="Download"
          >
            <Download className="w-6 h-6" />
          </a>
        </div>
      </div>
    );
  };

  const CourseModal = () => {
    if (!showCourseModal || !selectedCourse) return null;

    const renderMedia = (media, index) => {
      const url = getMediaUrl(media.fileUrl);
      const type = media.type || '';

      if (type.startsWith('image')) {
        return (
          <div key={index} className="mb-4">
            <img
              src={url}
              alt={media.filename}
              className="rounded w-full max-h-64 object-contain cursor-pointer"
              onClick={() => setFullscreenImageUrl(url)}
            />
          </div>
        );
      }

      if (type.startsWith('video')) {
        return (
          <video
            key={index}
            src={url}
            controls
            className="w-full rounded h-64 mb-4 object-cover"
          />
        );
      }

      if (type.startsWith('audio')) {
        return (
          <audio
            key={index}
            controls
            src={url}
            className="w-full mb-4"
          />
        );
      }

      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-600 underline mb-3"
        >
          📄 {media.filename || 'View Document'}
        </a>
      );
    };

    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-2xl relative overflow-y-auto max-h-[90vh]">
          <button
            onClick={() => setShowCourseModal(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
          >
            <X />
          </button>

          <h2 className="text-2xl font-bold mb-2">{selectedCourse.title}</h2>
          <p className="text-gray-600 mb-2">{selectedCourse.description}</p>

          <div className="text-green-600 font-semibold text-lg mb-2">
            {selectedCourse.fee ? `GH₵${selectedCourse.fee}` : 'Free'}
          </div>

          <div className="text-sm text-gray-500 mb-4">
            Level: {selectedCourse.level || 'Beginner'} • Duration: {selectedCourse.duration || '6h'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 mb-4">
            {selectedCourse.media?.length > 0
              ? selectedCourse.media.map((media, index) => renderMedia(media, index))
              : <p className="text-sm text-gray-400 italic">No media available.</p>}
          </div>

          {selectedCourse.url && (
            <a
              href={selectedCourse.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Go to Course
            </a>
          )}
        </div>
        {ImageOverlayViewer()}
      </div>
    );
  };

  const PaymentModal = () => {
    if (!showPaymentModal || !selectedCourse) return null;
    return (
      <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
        <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
          <button onClick={() => setShowPaymentModal(false)} className="absolute top-3 right-3 text-gray-500 hover:text-red-500">
            <X />
          </button>
          <div className="text-center mb-4">
            <CreditCard className="h-10 w-10 text-green-600 mx-auto mb-2" />
            <h2 className="text-xl font-bold">Confirm Payment</h2>
            <p className="text-sm text-gray-600">You’ll be redirected to Payaza</p>
          </div>
          <input
            type="email"
            placeholder="Email Address"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="text"
            placeholder="Full Name"
            value={userFullName}
            onChange={(e) => setUserFullName(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-2"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={userPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-4"
          />

          <div className="bg-gray-100 p-4 rounded mb-4 text-sm">
            <div className="flex justify-between mb-2">
              <span>Course:</span>
              <span>{selectedCourse.title}</span>
            </div>
            <div className="flex justify-between font-semibold text-green-600 text-lg">
              <span>Amount:</span>
              <span>GH₵{selectedCourse.fee}</span>
            </div>
          </div>

          <button
            onClick={processPayment}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700 font-semibold flex justify-center items-center"
          >
            {paymentLoading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" /> Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" /> Pay with Payaza
              </>
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Explore Our Courses</h1>
      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="h-10 w-10 animate-spin text-green-600" />
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-20">
          <AlertCircle className="mx-auto mb-2" />
          {error}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-30 m-30 mt-10">
          {courses.map(course => (
            <div key={course._id} className="bg-white border rounded-xl shadow hover:shadow-lg overflow-hidden">
              <img
                src={getMediaUrl(course.media?.[0]?.fileUrl)}
                alt={course.title}
                className="w-full h-60 object-cover cursor-pointer"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold">{course.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{course.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span><Clock className="w-4 h-4 inline-block mr-1" />{course.duration || '6h'}</span>
                  <span><Users className="w-4 h-4 inline-block mr-1" />1.2k+</span>
                  <span><Award className="w-4 h-4 inline-block mr-1" />{course.level || 'Beginner'}</span>
                </div>
                <div className="text-green-600 font-bold">
                  {course.fee ? `GH₵${course.fee}` : 'Free'}
                </div>
                <div className="flex gap-2">
                  {course.fee > 0 && (
                    <button
                      onClick={() => handleEnroll(course)}
                      className="flex-1 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                      Enroll Now
                    </button>
                  )}
                  <button
                    onClick={() => handlePreview(course)}
                    className="flex-1 border border-green-600 text-green-600 py-2 rounded hover:bg-green-50"
                  >
                    Preview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {showCourseModal && <CourseModal />}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
}

export default FarmerEducationManagement;
