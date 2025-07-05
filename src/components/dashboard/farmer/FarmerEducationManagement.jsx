import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Play,
  AlertCircle,
  Loader2,
  Search,
  Filter,
  CreditCard,
  Star,
  Clock,
  Users,
  Award,
  CheckCircle,
  X
} from 'lucide-react';
import { apiGetEducations, apiPayForEducation } from '../../../services/products';

function FarmerEducationManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        setError('');
        const response = await apiGetEducations();
        setCourses(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to load courses. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handlePayment = async (course) => {
    if (course.fee === 0) {
    s
      window.open(course.url, '_blank');
      return;
    }
    
    setSelectedCourse(course);
    setShowPaymentModal(true);
  };

  const processPayment = async () => {
    if (!selectedCourse) {
      alert('No course selected for payment.');
      setPaymentLoading(false);
      return;
    }
    setPaymentLoading(true);
    try {
      const payload = {
        education: selectedCourse._id || selectedCourse.id,
        amount: selectedCourse.fee,
        currency: "GHS"
      };
      console.log('Sending payment payload:', payload);
      const res = await apiPayForEducation(payload);
      console.log('Payment API response:', res);

      setShowPaymentModal(false);

      if (res.data && res.data.link) {
        window.open(res.data.link, '_blank');
      } else {
        alert('Payment link not received. Please contact support.');
      }
      setSelectedCourse(null);
    } catch (error) {
      console.error('Payment error:', error?.response || error);
      if (error.response) {
        
        console.error('Payment error response:', error.response.data);
        alert(
          error.response.data?.message ||
          error.response.data?.error ||
          'Payment failed. Please try again.'
        );
      } else if (error.request) {
      
        console.error('No response received:', error.request);
        alert('No response from payment server.');
      } else {
        
        console.error('Payment error:', error.message);
        alert('Payment failed. Please try again.');
      }
    } finally {
      setPaymentLoading(false);
    }
  };

  const PaymentModal = () => {
    if (!showPaymentModal || !selectedCourse) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6 relative">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
          
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CreditCard className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Proceed to Payment</h3>
            <p className="text-gray-600">You will be redirected to Payaza to complete your payment.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-gray-900 mb-2">{selectedCourse.title}</h4>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Course Fee:</span>
              <span className="text-2xl font-bold text-green-600">GH₵{selectedCourse.fee}</span>
            </div>
          </div>

          <button
            onClick={processPayment}
            disabled={paymentLoading}
            className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
          >
            {paymentLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin mr-2" />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-5 w-5 mr-2" />
                Pay with Payaza
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            You will be redirected to a secure payment page.
          </p>
        </div>
      </div>
    );
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Available Courses</h2>
        <button className="flex items-center px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 shadow-lg hover:shadow-xl">
          <Plus className="h-5 w-5 mr-2" />
          Create Course
        </button>
      </div>
      
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto mb-4" />
            <span className="text-lg text-gray-600">Loading courses...</span>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <span className="text-lg text-red-500">{error}</span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses
            .filter(course =>
              course.title?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((course) => (
              <div key={course.id || course.title} className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                <div className="relative">
                  <img
                    src={course.media || 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'}
                    alt={course.title || 'No title'}
                    className="w-full h-52 object-cover"
                  />
                  <div className="absolute top-4 right-4">
                    {course.fee === 0 ? (
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        FREE
                      </span>
                    ) : (
                      <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        PREMIUM
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                      <span className="text-white text-sm font-medium ml-2">4.8</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 leading-tight">{course.title || 'Untitled Course'}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed" style={{display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden'}}>
                      {course.description || 'No description available'}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{course.duration || '6 hours'}</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>1.2k students</span>
                    </div>
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      <span>{course.level || 'Beginner'}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-6">
                    <div className="text-left">
                      <p className="text-3xl font-bold text-green-600">
                        {course.fee ? `GH₵${course.fee}` : 'Free'}
                      </p>
                      {course.instructor && (
                        <p className="text-sm text-gray-500">by {course.instructor}</p>
                      )}
                    </div>
                    {course.fee === 0 && (
                      <div className="flex items-center text-green-600">
                        <CheckCircle className="h-5 w-5 mr-1" />
                        <span className="text-sm font-medium">Full Access</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-3">
                    <button
                      onClick={() => handlePayment(course)}
                      className="w-full flex items-center justify-center px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl"
                    >
                      {course.fee === 0 ? (
                        <>
                          <Play className="h-5 w-5 mr-2" />
                          Start Course
                        </>
                      ) : (
                        <>
                          <CreditCard className="h-5 w-5 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </button>
                    
                    {course.url && (
                      <a
                        href={course.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center px-4 py-2 border-2 border-green-600 text-green-600 rounded-xl hover:bg-green-50 transition-all duration-200 font-medium"
                      >
                        Preview Course
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              Education Management
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Discover and enroll in premium agricultural courses designed to enhance your farming expertise
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{courses.length}</p>
                <p className="text-sm text-green-600 mt-1">+12% this month</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center">
                <BookOpen className="h-8 w-8 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Active Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">2,847</p>
                <p className="text-sm text-green-600 mt-1">+8% this week</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Completion Rate</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">94%</p>
                <p className="text-sm text-green-600 mt-1">+3% this month</p>
              </div>
              <div className="w-14 h-14 bg-emerald-100 rounded-2xl flex items-center justify-center">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">Avg Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">4.8</p>
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              <div className="w-14 h-14 bg-yellow-100 rounded-2xl flex items-center justify-center">
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-10">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 text-lg"
              />
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium">
                <Filter className="h-5 w-5 mr-2" />
                Filter
              </button>
            </div>
          </div>
        </div>

        {/* Courses */}
        {renderCourses()}
      </div>

      {/* Payment Modal */}
      <PaymentModal />
    </div>
  );
}

export default FarmerEducationManagement;