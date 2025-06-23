import React from 'react'
import Nav from "../components/Nav.jsx";
import Benefit from "../components/Benefit.jsx";
import Media from "../components/Media.jsx";
import News from "../components/News.jsx";

const Blog = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-col justify-start items-start mt-[10%] ml-[60%] text-left">
        <h1 className="text-4xl text-gray-800 font-bold">Castor EcoLearn Hub</h1>
        <p className="text-gray-600 text-lg mt-2">Stay updated with our latest news, stories, and insights.</p>
      </div>
      <News />
      <Benefit />
      <Media />

      <footer className="text-center py-4 text-sm text-gray-500">© 2025 Castor Care Ghana. All rights reserved.</footer>
    </div>
  )
}

export default Blog;
