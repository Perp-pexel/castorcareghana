import React, { useState, useRef } from "react";

const galleryImages = [
  "/blog/im1.jpg",
  "/blog/im2.jpg",
  "/blog/im3.jpg",
  "/blog/im4.jpg",
  "/blog/im5.jpg",
  "/blog/im6.jpg",
  "/blog/im7.jpg",
];

const galleryVideos = [
  "/blog/v1.mp4",
  "/blog/v2.mp4",
  "/blog/v3.mp4",
  "/blog/v4.mp4",
  "/blog/v5.mp4",
  "/blog/v6.mp4",
  "/blog/v7.mp4",
  "/blog/v8.mp4",
  "/blog/v9.mp4",
  "/blog/v10.mp4",
];

const Media = () => {
  const [showAllImages, setShowAllImages] = useState(false);
  const [showAllVideos, setShowAllVideos] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(null);
  const videoRefs = useRef([]);

  const visibleImages = showAllImages
    ? galleryImages
    : galleryImages.slice(0, 4);
  const visibleVideos = showAllVideos
    ? galleryVideos
    : galleryVideos.slice(0, 3);

  const openImageModal = (index) => setActiveImageIndex(index);
  const closeImageModal = () => setActiveImageIndex(null);
  const nextImage = () =>
    setActiveImageIndex((prev) => (prev + 1) % galleryImages.length);
  const prevImage = () =>
    setActiveImageIndex((prev) =>
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );

  const openVideoModal = (index) => {
    setActiveVideoIndex(index);
    videoRefs.current.forEach((vid, i) => {
      if (vid && i !== index) vid.pause();
    });
  };
  const closeVideoModal = () => setActiveVideoIndex(null);
  const nextVideo = () =>
    setActiveVideoIndex((prev) => (prev + 1) % galleryVideos.length);
  const prevVideo = () =>
    setActiveVideoIndex((prev) =>
      prev === 0 ? galleryVideos.length - 1 : prev - 1
    );

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
            onClick={() => openImageModal(index)}
            className="w-full h-44 object-cover rounded-lg shadow-md cursor-pointer"
          />
        ))}
      </div>

      {galleryImages.length > 4 && (
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
            ref={(el) => (videoRefs.current[index] = el)}
            controls
            src={src}
            onClick={() => openVideoModal(index)}
            onPlay={() => {
              videoRefs.current.forEach((vid, i) => {
                if (vid && i !== index) vid.pause();
              });
            }}
            className="w-full h-52 rounded-lg bg-black shadow-md object-cover cursor-pointer"
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

      {/* Image Modal */}
      {activeImageIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            onClick={closeImageModal}
            className="absolute top-4 right-6 text-white text-4xl font-bold"
          >
            &times;
          </button>
          <button
            onClick={prevImage}
            className="absolute left-5 text-white text-4xl font-bold"
          >
            &lt;
          </button>
          <img
            src={galleryImages[activeImageIndex]}
            alt="Enlarged"
            className="max-h-[90vh] max-w-[90vw] rounded-lg shadow-lg"
          />
          <button
            onClick={nextImage}
            className="absolute right-5 text-white text-4xl font-bold"
          >
            &gt;
          </button>
        </div>
      )}

      {/* Video Modal */}
      {activeVideoIndex !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
          <button
            onClick={closeVideoModal}
            className="absolute top-4 right-6 text-white text-4xl font-bold"
          >
            &times;
          </button>
          <button
            onClick={prevVideo}
            className="absolute left-5 text-white text-4xl font-bold"
          >
            &lt;
          </button>
          <video
            src={galleryVideos[activeVideoIndex]}
            controls
            autoPlay
            className="max-w-[90vw] max-h-[90vh] rounded-lg shadow-lg"
          />
          <button
            onClick={nextVideo}
            className="absolute right-5 text-white text-4xl font-bold"
          >
            &gt;
          </button>
        </div>
      )}
    </div>
  );
};

export default Media;
