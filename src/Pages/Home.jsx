import React from 'react'
import Hero from '../components/Hero'
import Content from '../components/Content'
import ProductCard from '../components/ProductCard'
import Review from '../components/Review'

const Home = () => {
  return (
    <div>
      <Hero/>
      <Content/>
      <ProductCard />
      <Review/>
    </div>
  )
}

export default Home 