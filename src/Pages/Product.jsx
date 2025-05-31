import React from 'react'

const Product = () => {
  return (
    <div>
      <h1>Product</h1>
      <p>Here you can find a variety of products that we offer.</p>
      <div>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          <img className="w-full" src="https://via.placeholder.com/150" alt="Product" />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">Product Title</div>

          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag1</span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#tag2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
