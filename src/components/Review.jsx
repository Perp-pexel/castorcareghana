import React from 'react';
import { Link } from 'react-router-dom';

const Review = () => {
  return (
    <div className="mt-20 px-6 flex flex-wrap gap-10 justify-center text-gray-800 font-sans">

      {/* Blog Section */}
      <div className="flex-1 min-w-[300px] max-w-[500px] p-5">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Recent Blog</h1>
        <iframe
          width="100%"
          height="250"
          src="https://www.youtube.com/embed/KJzmM9SL0mA"
          title="YouTube video"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="rounded-lg"
        ></iframe>
        <p className="text-base text-gray-600 mt-4">
          Discover the latest insights and updates from our blog. We share valuable information about our products, services, and the food industry.
        </p>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-full font-semibold mt-4 hover:bg-green-700 transition-colors"
        >
          Explore <span>→</span>
        </Link>
      </div>

      {/* Reviews Section */}
      <div className="flex-1 min-w-[300px] max-w-[600px] p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">What Our Customers Say</h1>
        <p className="text-base text-gray-700 mb-6">
          Our customers love our products! Here's what they have to say:
        </p>

        <div className="flex flex-wrap gap-5 justify-between">
          {/* Review 1 */}
          <div className="p-4 flex-1 min-w-[240px]">
            <h2 className="text-lg text-green-600 font-bold">John Doe</h2>
            <p className="text-sm text-gray-700 mt-2">
              "I absolutely love the cashew nuts! They are so delicious and fresh."
            </p>
            <div className="text-yellow-400 text-lg mt-1">★★★★★</div>
          </div>

          {/* Review 2 */}
          <div className="p-4 flex-1 min-w-[240px]">
            <h2 className="text-lg text-green-600 font-bold">Jane Smith</h2>
            <p className="text-sm text-gray-700 mt-2">
              "The ginger is of excellent quality. I use it in all my cooking."
            </p>
            <div className="text-yellow-400 text-lg mt-1">★★★★☆</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Review;
