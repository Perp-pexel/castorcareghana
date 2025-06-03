import React from 'react'
import { Link } from 'react-router-dom'

const Review = () => {
  return (
    <div style={{padding: '40px',display: 'flex',flexWrap: 'wrap',gap: '40px',justifyContent: 'center', marginTop: '5%', fontFamily: 'Arial, sans-serif', color: '#333'}}>
      
     
      <div style={{flex: '1 1 400px',minWidth: '300px',maxWidth: '500px',padding: '20px'}}>
        <h1 style={{ fontSize: '26px', color: '#333', marginBottom: '16px' }}>Recent Blog</h1>
        <iframe
  width="100%"
  height="250"
  src="https://www.youtube.com/embed/KJzmM9SL0mA"
  title="YouTube video"
  frameBorder="0"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
  style={{ borderRadius: '10px' }}
></iframe>
         <p style={{ fontSize: '16px', color: '#666', marginTop: '16px' }}>
            Discover the latest insights and updates from our blog. We share valuable information about our products, services, and the food industry.
        </p>
        <Link to="/blog" className='navlink'style={{display: 'inline-flex',alignItems: 'center',gap: '6px',padding: '10px 18px',backgroundColor: '#28a745',color: '#fff',borderRadius: '20px',fontWeight: 'bold',textDecoration: 'none',marginTop: '16px',cursor: 'pointer'}}>Explore<span>→</span></Link>
      </div>

     
      <div style={{flex: '1 1 500px', minWidth: '300px',maxWidth: '600px',padding: '25px'}}>
        <h1 style={{ fontSize: '26px', color: '#333', marginBottom: '10px' }}>What Our Customers Say</h1>
        <p style={{ fontSize: '16px', color: '#555', marginBottom: '25px' }}>
          Our customers love our products! Here's what they have to say:</p>

        
        <div style={{display: 'flex',flexWrap: 'wrap',gap: '20px',justifyContent: 'space-between'}}>
          {/* Review 1 */}
          <div style={{padding: '18px',flex: '1 1 240px', minWidth: '240px'}}>
            <h2 style={{ fontSize: '18px', color: '#28a745' }}>John Doe</h2>
            <p style={{ fontSize: '15px', color: '#444', marginTop: '8px' }}>
              "I absolutely love the cashew nuts! They are so delicious and fresh."</p>
              <div style={{ color: '#FFD700', fontSize: '18px', margin: '4px 0' }}>★★★★★</div>
          </div>

          {/* Review 2 */}
          <div style={{padding: '18px',flex: '1 1 240px',minWidth: '240px'}}>
            <h2 style={{ fontSize: '18px', color: '#28a745' }}>Jane Smith</h2>
            <p style={{ fontSize: '15px', color: '#444', marginTop: '8px' }}>
              "The ginger is of excellent quality. I use it in all my cooking."</p>
              <div style={{ color: '#FFD700', fontSize: '18px', margin: '4px 0' }}>★★★★☆</div>
            
          </div>
        </div>
      </div>
    </div>
  )
}

export default Review
