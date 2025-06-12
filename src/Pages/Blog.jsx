import React from 'react'
import Nav from "../components/Nav.jsx";
import Benefit from "../components/Benefit.jsx";
import Media from "../components/Media.jsx";
import News from "../components/News.jsx";

const Blog = () => {
  return (
    <div>
      <Nav />
      <div className="blog-header" style={{ textAlign: "left",display: "flex", flexDirection: "column", justifyContent: "left", marginLeft: "60%", marginTop: "10%" }}>
        <h1 style={{ fontSize: "2.5rem", color: "#333"}}>
        Castor EcoLearn Hub</h1>
        <p style={{ color: '#555', fontSize: '1.2rem' }}>Stay updated with our latest news, stories, and insights.</p>
      </div>
      <News />
      <Benefit />
      <Media />

      <footer className="footer">© 2025 Castor Care Ghana. All rights reserved.</footer>
    </div>
  )
}

export default Blog