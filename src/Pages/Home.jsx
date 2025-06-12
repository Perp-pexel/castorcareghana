import React from 'react'
import Hero from '../components/Hero'
import Content from '../components/Content'
import ProductGrid from '../components/ProductGrid'
import Review from '../components/Review'

const Home = () => {
  return (
    <div>
      <Hero/>
      <ProductGrid />
      <Content/>
      <Review/>
    </div>
  )
}

export default Home 