import React, { useState } from "react";

// Sample gallery content
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
    <div style={{padding: "40px 20px",fontFamily: "sans-serif",backgroundColor: "#f9f9f9", margin: '30px 50px' }} >
     
      <div>
        <h2 style={{textAlign: "center",marginBottom: "30px",color: "#2e7d32", fontSize: "2rem"}}>Gallery</h2>

        {/* Image Gallery */}
        <div style={{display: "grid",gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",gap: "20px",justifyItems: "center",margin: "50px 10px"}}>

          {visibleImages.map((src, index) => (
            <img key={index} src={src} alt={`Gallery ${index + 1}`} style={{ width: "100%",height: "170px", objectFit: "cover",borderRadius: "10px",boxShadow: "0 4px 12px rgba(0,0,0,0.1)"}} /> 
            ))}
            
        </div>
        {galleryImages.length > 5 && (
          <div style={{ textAlign: "center", marginBottom: "40px" }}>

            <button onClick={() => setShowAllImages(!showAllImages)}
              style={{padding: "10px 25px",backgroundColor: "#2e7d32", color: "#fff", border: "none", borderRadius: "20px", fontSize: "1rem", cursor: "pointer"}}>
              {showAllImages ? "Show Less" : "View More Images"}
            </button>
          </div>
        )}

        {/* Video Gallery */}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px", justifyItems: "center", margin: "60px 0px" }}>

          {visibleVideos.map((src, index) => (
            <video key={index} controls src={src} style={{ width: "100%", height: "200px", borderRadius: "10px", backgroundColor: "#000", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", objectFit: "cover" }} />
          ))}
        </div> 
        
        {galleryVideos.length > 3 && (
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setShowAllVideos(!showAllVideos)}
              style={{padding: "10px 25px",backgroundColor: "#2e7d32",color: "#fff",border: "none", borderRadius: "20px", fontSize: "1rem", cursor: "pointer"}}>
              {showAllVideos ? "Show Less" : "View More Videos"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Media;
