import React, { useState } from "react";

const galleryImages = Array.from(
  { length: 20 },
  (_, i) => `/gallery/img${i + 1}.jpg`
);
const galleryVideos = Array.from(
  { length: 6 },
  (_, i) => `/gallery/video${i + 1}.mp4`
);

const Media = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);

  const visibleImages = showAllImages
    ? galleryImages
    : galleryImages.slice(0, 4);
  const visibleVideos = showAllVideos
    ? galleryVideos
    : galleryVideos.slice(0, 3);

  return (
    <div className="px-5 py-10 bg-gray-50 font-sans mx-12 my-8">
      <h2 className="text-3xl text-center text-green-700 font-bold mb-8">
        Gallery
      </h2>

      {/* Image Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-8">
        {visibleImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt={`Gallery ${index + 1}`}
            className="w-full h-44 object-cover rounded-lg shadow-md"
          />
        ))}
      </div>

      {galleryImages.length > 5 && (
        <div className="text-center mb-10">
          <button
            onClick={() => setShowAllImages(!showAllImages)}
            className="px-6 py-2 bg-green-700 text-white rounded-full text-base hover:bg-green-800 transition"
          >
            {showAllImages ? "Show Less" : "View More Images"}
          </button>
        </div>
      )}

      {/* Video Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {visibleVideos.map((src, index) => (
          <video
            key={index}
            controls
            src={src}
            className="w-full h-52 rounded-lg bg-black shadow-md object-cover"
          />
        ))}
      </div>

      {galleryVideos.length > 3 && (
        <div className="text-center">
          <button
            onClick={() => setShowAllVideos(!showAllVideos)}
            className="px-6 py-2 bg-green-700 text-white rounded-full text-base hover:bg-green-800 transition"
          >
            {showAllVideos ? "Show Less" : "View More Videos"}
          </button>
        </div>
      )}
    </div>
  );
};

export default Media;
