import React from 'react'
import Nav from "../components/Nav.jsx";
import Benefit from "../components/Benefit.jsx";
import Media from "../components/Media.jsx";
import News from "../components/News.jsx";

const Blog = () => {
  return (
    <div>
      <Nav />
      <div className="flex flex-col  text-right md:text-right mt-[25%] mb-10 md:mb-[0] md:mt-[12%] px-4 md:px-0">
  <h1 className="text-3xl md:text-4xl text-gray-800 font-bold mr-20">Castor EcoLearn Hub</h1>
  <p className="text-gray-600 text-base md:text-lg mt-2 mr-10">
    Stay updated with our latest news, stories, and insights.
  </p>
</div>

      <News />
      <Benefit />
      <Media />

      <footer className="text-center py-4 text-sm text-gray-500">© 2025 Castor Care Ghana. All rights reserved.</footer>
    </div>
  )
}

export default Blog;
