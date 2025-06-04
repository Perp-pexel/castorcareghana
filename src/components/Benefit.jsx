import React, { useState } from "react";
import "../App.css";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";

const blogPosts = [
  {
    type: 'image',
    title: 'Training Session with Local Farmers',
    src: '/media/farmer-training.jpg',
    description: 'Empowering local farmers with modern techniques and financial literacy.',
  },
  {
    type: 'video',
    title: 'Castor Care Impact Story',
    src: '/media/impact-video.mp4',
    description: 'Watch how Castor Care is transforming communities through agriculture.',
  },
  {
    type: 'image',
    title: 'Warehouse Expansion Project',
    src: '/media/warehouse.jpg',
    description: 'New facilities to support better storage and logistics across regions.',
  },
];

const products = [
  {
    name: "Castor",
    benefits: [
      "Supports healthy skin and reduces inflammation.",
      "Promotes hair growth and scalp health.",
      "Acts as a natural moisturizer to prevent dryness.",
      "Relieves joint pain and muscle soreness.",
      "Improves digestion and boosts immunity."
    ]
  },
  {
    name: "Maize",
    benefits: [
      "Rich in dietary fiber, aiding digestion.",
      "Provides essential nutrients like Vitamin B and Magnesium.",
      "Supports eye health due to antioxidants.",
      "Aids in weight management with low fat content.",
      "Boosts energy through complex carbohydrates."
    ]
  },
  {
    name: "Groundnut",
    benefits: [
      "Boosts heart health with healthy fats.",
      "Supports brain function and reduces inflammation.",
      "High in protein, supporting muscle repair.",
      "Aids weight management with satiety effect.",
      "Rich in antioxidants, promoting cell repair."
    ]
  },
  {
    name: "Cashew",
    benefits: [
      "Strengthens bones with high magnesium content.",
      "Boosts immune system and promotes skin health.",
      "Supports healthy blood circulation.",
      "Rich in healthy fats for heart protection.",
      "Helps maintain healthy cholesterol levels."
    ]
  },
  {
    name: "Ginger",
    benefits: [
      "Aids digestion and reduces nausea.",
      "Anti-inflammatory and antioxidant effects.",
      "Relieves menstrual pain and discomfort.",
      "Boosts immunity and fights infections.",
      "Improves cardiovascular health."
    ]
  },
  {
    name: "Shea Nut",
    benefits: [
      "Moisturizes and softens skin.",
      "Contains anti-aging and healing properties.",
      "Reduces skin inflammation and blemishes.",
      "Protects skin from environmental damage.",
      "Soothes eczema and skin irritations."
    ]
  },
  {
    name: "Soya Bean",
    benefits: [
      "Rich in protein and promotes heart health.",
      "May support hormonal balance in women.",
      "Reduces risk of osteoporosis.",
      "Helps manage cholesterol levels.",
      "Supports muscle and tissue repair."
    ]
  },
  {
    name: "Tiger Nuts",
    benefits: [
      "High in fiber, aiding digestion.",
      "Natural source of energy and boosts libido.",
      "Supports heart health with good fats.",
      "Regulates blood sugar levels.",
      "Improves gut health with prebiotics."
    ]
  }
];

const courses = [
  {
    title: "Sustainable Agricultural Land Management",
    link: "https://www.coursera.org/learn/sustainable-agriculture",
    image: f2,
  },
  {
    title: "Diploma in Farm Management (Alison)",
    link: "https://alison.com/courses?query=farm%20management",
    image: f1,
  },
];

const Benefit = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <h2 style={{  margin: '80px', marginBottom: '20px', color: '#2e7d32' }}>Latest Stories</h2>
       <div style={{ display: 'flex', flexWrap: 'wrap', gap: '50px', justifyContent: 'center', marginBottom: '60px', margin: '0 50px' }}>
        {blogPosts.map((post, index) => (
          <div key={index}style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '20px', maxWidth: '300px',boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <h3 style={{ fontSize: '1.2rem', color: '#333', marginBottom: '10px' }}>{post.title}</h3>
            {post.type === 'image' ? (
              <img
                src={post.src}
                alt={post.title}
                style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '8px' }}
              />
            ) : (
              <video
                controls
                src={post.src}
                style={{ width: '100%', height: '150px', borderRadius: '8px', backgroundColor: '#000' }}
              />
            )}
            <p style={{ marginTop: '12px', color: '#555', fontSize: '0.95rem' }}>{post.description}</p>
          </div>
        ))}
      </div>

      <div className="container">
        
        <section className="section">
          <h1 className="section-title">Health Benefits of Castor Care Products</h1>
          <div className="product-buttons">
            {products.map((prod, idx) => (
              <button key={idx} className="product-button" onClick={() => setSelected(idx)}>
                {prod.name}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="product-detail">
              <h3 className="product-name">{products[selected].name}</h3>
              <ul className="benefit-list">
                {products[selected].benefits.map((b, i) => (
                  <li key={i} className="benefit-item">{b}</li>
                ))}
              </ul>
            </div>
          )}
        </section>

         <section className="courses-section" style={{ marginLeft: '50px', width: '40%' }}>
        <h2 className="courses-title">🎓 Recommended Courses</h2>
        <div className="courses" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '30px' }}>
          {courses.map((course, i) => (
            <a href={course.link} key={i} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', lineHeight: '0.5' }} className="course-card">
              <img src={course.image} alt={course.title} className="course-image" style={{ width: '70%', height: 'auto' }} />
              <div className="course-info" style={{  }}>
                <h3 className="course-title" style={{ fontSize: '15px' }}>{course.title}</h3>
              </div>
            </a>
          ))}
        </div>
      </section>
        
      </div>
    </div>
  );
};

export default Benefit;
