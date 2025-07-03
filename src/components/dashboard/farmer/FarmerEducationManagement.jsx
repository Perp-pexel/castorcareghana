import React, { useState } from 'react';
import { 
  BookOpen, 
  Video, 
  Download, 
  Search, 
  Filter,
  Plus,
  Play,
  Users,
  Star,
  Calendar,
  Clock,
  FileText,
  Award,
  TrendingUp
} from 'lucide-react';

function FarmerEducationManagement() {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchTerm, setSearchTerm] = useState('');

  const courses = [
    {
      id: 1,
      title: 'Organic Farming Fundamentals',
      description: 'Learn the basics of organic farming practices and certification requirements.',
      instructor: 'Dr. Sarah Green',
      duration: '6 weeks',
      students: 245,
      rating: 4.8,
      price: 99,
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Organic Farming',
      level: 'Beginner',
      lessons: 24
    },
    {
      id: 2,
      title: 'Sustainable Pest Management',
      description: 'Advanced techniques for managing pests without harmful chemicals.',
      instructor: 'Prof. Mike Johnson',
      duration: '4 weeks',
      students: 189,
      rating: 4.9,
      price: 79,
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Pest Control',
      level: 'Intermediate',
      lessons: 18
    },
    {
      id: 3,
      title: 'Soil Health & Nutrition',
      description: 'Understanding soil composition and how to maintain healthy, fertile soil.',
      instructor: 'Dr. Emily Chen',
      duration: '5 weeks',
      students: 312,
      rating: 4.7,
      price: 89,
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Soil Management',
      level: 'Intermediate',
      lessons: 20
    }
  ];

  const webinars = [
    {
      id: 1,
      title: 'Climate-Smart Agriculture Strategies',
      speaker: 'Dr. Robert Martinez',
      date: '2024-01-25',
      time: '2:00 PM EST',
      duration: '90 minutes',
      attendees: 156,
      status: 'upcoming',
      description: 'Explore innovative farming techniques to adapt to climate change.',
      image: 'https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 2,
      title: 'Digital Marketing for Farm Products',
      speaker: 'Lisa Thompson',
      date: '2024-01-20',
      time: '1:00 PM EST',
      duration: '60 minutes',
      attendees: 89,
      status: 'completed',
      description: 'Learn how to effectively market your farm products online.',
      image: 'https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 3,
      title: 'Water Conservation Techniques',
      speaker: 'Dr. Amanda Wilson',
      date: '2024-02-01',
      time: '3:00 PM EST',
      duration: '75 minutes',
      attendees: 203,
      status: 'upcoming',
      description: 'Efficient irrigation and water management strategies for farms.',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const resources = [
    {
      id: 1,
      title: 'Organic Certification Guide',
      type: 'PDF',
      size: '2.4 MB',
      downloads: 1245,
      category: 'Certification',
      description: 'Complete guide to obtaining organic certification for your farm.'
    },
    {
      id: 2,
      title: 'Seasonal Planting Calendar',
      type: 'PDF',
      size: '1.8 MB',
      downloads: 2156,
      category: 'Planning',
      description: 'Month-by-month planting guide for optimal crop yields.'
    },
    {
      id: 3,
      title: 'Pest Identification Chart',
      type: 'PDF',
      size: '3.2 MB',
      downloads: 987,
      category: 'Pest Control',
      description: 'Visual guide to identifying common farm pests and diseases.'
    },
    {
      id: 4,
      title: 'Farm Business Plan Template',
      type: 'DOCX',
      size: '456 KB',
      downloads: 1567,
      category: 'Business',
      description: 'Professional template for creating a comprehensive farm business plan.'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'live':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderCourses = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Available Courses</h2>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Create Course
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative">
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="px-2 py-1 bg-primary-600 text-white text-xs font-semibold rounded-full">
                  {course.level}
                </span>
              </div>
              <div className="absolute top-4 right-4">
                <span className="px-2 py-1 bg-black bg-opacity-70 text-white text-xs font-semibold rounded">
                  {course.lessons} lessons
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{course.title}</h3>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{course.description}</p>
              
              <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-1" />
                  {course.students}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {course.duration}
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1 text-yellow-400" />
                  {course.rating}
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600">Instructor</p>
                  <p className="font-medium text-gray-900">{course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary-600">${course.price}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <button className="flex-1 flex items-center justify-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                  <Play className="h-4 w-4 mr-2" />
                  Start Course
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Preview
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWebinars = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Webinars</h2>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Schedule Webinar
        </button>
      </div>
      
      <div className="space-y-4">
        {webinars.map((webinar) => (
          <div key={webinar.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <img
                src={webinar.image}
                alt={webinar.title}
                className="w-24 h-24 object-cover rounded-lg flex-shrink-0"
              />
              
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">{webinar.title}</h3>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(webinar.status)}`}>
                    {webinar.status}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-3">{webinar.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {webinar.date}
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-2" />
                    {webinar.time}
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    {webinar.attendees} registered
                  </div>
                  <div className="flex items-center">
                    <Video className="h-4 w-4 mr-2" />
                    {webinar.duration}
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Speaker</p>
                    <p className="font-medium text-gray-900">{webinar.speaker}</p>
                  </div>
                  <div className="flex space-x-2">
                    {webinar.status === 'upcoming' ? (
                      <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                        Register
                      </button>
                    ) : (
                      <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                        Watch Recording
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Learning Resources</h2>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="h-4 w-4 mr-2" />
          Upload Resource
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{resource.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                    {resource.type}
                  </span>
                  <span>{resource.size}</span>
                  <div className="flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    {resource.downloads} downloads
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded text-xs font-medium">
                    {resource.category}
                  </span>
                  <button className="flex items-center px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Education Management</h1>
        <p className="text-gray-600 mt-2">Manage courses, webinars, and educational resources for farmers.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Courses</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{courses.length}</p>
            </div>
            <BookOpen className="h-8 w-8 text-primary-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active Students</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">746</p>
            </div>
            <Users className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Webinars</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{webinars.length}</p>
            </div>
            <Video className="h-8 w-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Resources</p>
              <p className="text-2xl font-bold text-gray-900 mt-2">{resources.length}</p>
            </div>
            <FileText className="h-8 w-8 text-purple-600" />
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search courses, webinars, resources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <div className="flex space-x-2">
            <button className="flex items-center px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-8">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { id: 'courses', name: 'Courses', icon: BookOpen },
              { id: 'webinars', name: 'Webinars', icon: Video },
              { id: 'resources', name: 'Resources', icon: Download }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-primary-500 text-primary-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.name}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'courses' && renderCourses()}
      {activeTab === 'webinars' && renderWebinars()}
      {activeTab === 'resources' && renderResources()}
    </div>
  );
}

export default FarmerEducationManagement;