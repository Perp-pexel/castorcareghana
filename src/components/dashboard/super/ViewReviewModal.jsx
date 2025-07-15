import React from 'react';
import { X } from 'lucide-react';

const ViewReviewModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-600">
          <X className="w-5 h-5" />
        </button>
        <h2 className="text-xl font-semibold mb-4">Review Feedback</h2>
        <p className="text-gray-600">Review feedback content here...</p>
      </div>
    </div>
  );
};

export default ViewReviewModal;
