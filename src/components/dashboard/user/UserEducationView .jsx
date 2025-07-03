import React, { useState } from 'react';
import { 
  BookOpen, 
  Play, 
  Clock, 
  Users, 
  Award, 
  Star,
  Search,
  Filter,
  ChevronRight,
  Download,
  CheckCircle
} from 'lucide-react';

const UserEducationView = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTab, setSelectedTab] = useState('available');

  const categories = [
    { id: 'all', name: 'All Courses' },
    { id: 'farming', name: 'Sustainable Farming' },
    { id: 'organic', name: 'Organic Methods' },
    { id: 'business', name: 'Farm Business' },
    { id: 'technology', name: 'AgTech' }
  ];

  const availableCourses = [
    {
      id: 1,
      title: 'Introduction to Sustainable Farming',
      instructor: 'Dr. Sarah Johnson',
      duration: '4 hours',
      students: 1250,
      rating: 4.8,
      price: '$49.99',
      image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      category: 'farming',
      level: 'Beginner',
      description: 'Learn the fundamentals of sustainable farming practices and environmental stewardship.'
    },
    {
      id: 2,
      title: 'Organic Pest Management',
      instructor: 'Mark Thompson',
      duration: '3.5 hours',
      students: 890,
      rating: 4.9,
      price: '$39.99',
      image: 'https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      category: 'organic',
      level: 'Intermediate',
      description: 'Master natural pest control methods without harmful chemicals.'
    },
    {
      id: 3,
      title: 'Farm Business Planning',
      instructor: 'Lisa Chen',
      duration: '6 hours',
      students: 650,
      rating: 4.7,
      price: '$79.99',
      image: 'https://images.pexels.com/photos/416978/pexels-photo-416978.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      category: 'business',
      level: 'Advanced',
      description: 'Develop comprehensive business plans for profitable farming operations.'
    }
  ];

  const enrolledCourses = [
    {
      id: 4,
      title: 'Soil Health Management',
      instructor: 'Dr. Robert Green',
      progress: 75,
      totalLessons: 12,
      completedLessons: 9,
      image: 'https://images.pexels.com/photos/1072824/pexels-photo-1072824.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      nextLesson: 'Composting Techniques'
    },
    {
      id: 5,
      title: 'Water Conservation Methods',
      instructor: 'Maria Rodriguez',
      progress: 40,
      totalLessons: 8,
      completedLessons: 3,
      image: 'https://images.pexels.com/photos/1108572/pexels-photo-1108572.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      nextLesson: 'Drip Irrigation Systems'
    }
  ];

  const completedCourses = [
    {
      id: 6,
      title: 'Sustainable Farming Basics',
      instructor: 'Dr. Sarah Johnson',
      completedDate: '2024-01-10',
      certificate: true,
      rating: 5,
      image: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2'
    }
  ];

  const filteredCourses = availableCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getLevelColor = (level) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const CourseCard = ({ course, type = 'available' }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {type === 'available' && (
          <div className="absolute top-3 left-3">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(course.level)}`}>
              {course.level}
            </span>
          </div>
        )}
        {type === 'enrolled' && (
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {course.progress}% Complete
          </div>
        )}
        {type === 'completed' && (
          <div className="absolute top-3 right-3 bg-green-600 text-white p-2 rounded-full">
            <CheckCircle className="w-4 h-4" />
          </div>
        )}
      </div>
      
      <div className="p-6">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>
        
        {type === 'available' && (
          <>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.description}</p>
            <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {course.duration}
              </div>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {course.students}
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                {course.rating}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold text-green-600">{course.price}</span>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors">
                Enroll Now
              </button>
            </div>
          </>
        )}
        
        {type === 'enrolled' && (
          <>
            <div className="mb-4">
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Progress</span>
                <span>{course.completedLessons}/{course.totalLessons} lessons</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${course.progress}%` }}
                ></div>
              </div>
            </div>
            <p className="text-sm text-gray-600 mb-4">Next: {course.nextLesson}</p>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
              <Play className="w-4 h-4" />
              Continue Learning
            </button>
          </>
        )}
        
        {type === 'completed' && (
          <>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-gray-600">Completed on {course.completedDate}</span>
              {course.certificate && (
                <Award className="w-4 h-4 text-yellow-500" />
              )}
            </div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm text-gray-600">Your rating:</span>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4 h-4 ${i < course.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Download className="w-4 h-4" />
                Certificate
              </button>
              <button className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg transition-colors">
                Review
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Learning Center</h1>
              <p className="text-gray-600">Expand your knowledge with expert-led courses</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-4 rounded-xl">
                <BookOpen className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">8</p>
                <p className="text-sm text-gray-600">Courses Completed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
          <div className="flex space-x-1">
            {[
              { id: 'available', label: 'Available Courses', count: availableCourses.length },
              { id: 'enrolled', label: 'My Courses', count: enrolledCourses.length },
              { id: 'completed', label: 'Completed', count: completedCourses.length }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 px-4 py-3 rounded-lg font-medium transition-colors ${
                  selectedTab === tab.id
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        {selectedTab === 'available' && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {selectedTab === 'available' && filteredCourses.map((course) => (
            <CourseCard key={course.id} course={course} type="available" />
          ))}
          {selectedTab === 'enrolled' && enrolledCourses.map((course) => (
            <CourseCard key={course.id} course={course} type="enrolled" />
          ))}
          {selectedTab === 'completed' && completedCourses.map((course) => (
            <CourseCard key={course.id} course={course} type="completed" />
          ))}
        </div>

        {/* Empty State */}
        {((selectedTab === 'available' && filteredCourses.length === 0) ||
          (selectedTab === 'enrolled' && enrolledCourses.length === 0) ||
          (selectedTab === 'completed' && completedCourses.length === 0)) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-medium text-gray-900 mb-2">
              {selectedTab === 'available' ? 'No courses found' : 
               selectedTab === 'enrolled' ? 'No enrolled courses' : 'No completed courses'}
            </h3>
            <p className="text-gray-600">
              {selectedTab === 'available' ? 'Try adjusting your search or filters' : 
               selectedTab === 'enrolled' ? 'Browse available courses to get started' : 'Complete some courses to see them here'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserEducationView;