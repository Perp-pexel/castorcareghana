import React from 'react'
import c6 from '../assets/c6.webp'
import g4 from '../assets/g4.webp'
import n2 from '../assets/n2.jpeg'
import m6 from '../assets/m6.png'
import s2 from '../assets/s2.jpg'
import t4 from '../assets/t4.jpg'
import o8 from '../assets/o8.webp'
import so4 from '../assets/so4.png'


const ProductCard = () => {
  return (
    <div>
  
        <h1 className="product-heading" style={{ textAlign: 'center', margin: '20px 0', fontSize: '30px', color: '#333' }}>Our Products</h1>
  <div className="product-container" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '2px', margin: '50px auto' }}>
      <div className="product-card1" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
         <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={c6} alt="Product1" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div>
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Cashew Nuts</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Cashew kernels are the edible seeds of the cashew tree, which is native to Brazil but widely cultivated in tropical regions around the world. These kidney-shaped nuts are not only delicious but also packed with nutrients and health benefits.
           </p>
         </div>
       </a>
      </div>
      <div className="product-card2" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
        <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={g4} alt="Product2" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Ginger</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Ginger is a flowering plant whose rhizome, ginger root or fresh ginger root, is widely used as a spice and a folk medicine. It is native to Southeast Asia and is a common ingredient in many cuisines around the world.
           </p>
         </div>
       </a>
      </div>
      <div className="product-card3" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
         <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={n2} alt="Product3" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Ground Nut</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Groundnuts, also known as peanuts, are edible seeds that grow underground. They are rich in protein, healthy fats, and various vitamins and minerals, making them a popular snack and ingredient in many dishes.
           </p>
         </div>
       </a>
      </div>
      <div className="product-card4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
        <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={m6} alt="Product4" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Maize</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Maize, also known as corn, is a cereal grain first domesticated by indigenous peoples in southern Mexico about 10,000 years ago. It is now a staple food in many parts of the world and is used for food, animal feed, and industrial products.
           </p>
         </div>
       </a>
      </div>
      <div className="product-card5" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
         <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={s2} alt="Product5" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Shea Nuts</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Shea nuts are the seeds of the fruit of the shea tree, which is native to West Africa. These nuts are rich in fat and are used to produce shea butter, a popular ingredient in cosmetics and skincare products.
           </p>
         </div>
       </a>
      </div>
      <div className="product-card6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
         <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={t4} alt="Product6" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Tiger Nuts</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Tiger nuts, also known as earth almonds, are small tubers that grow underground. They are rich in fiber, healthy fats, and various vitamins and minerals, making them a nutritious snack and ingredient in many dishes.
           </p>
         </div>
       </a>
      </div>
      <div className="product-card6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
        <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={so4} alt="Product6" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Soya Beans</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Soya beans are a type of legume native to East Asia, widely grown for its edible bean which has numerous uses. They are a significant source of protein and oil.
           </p>
         </div>
       </a>
      </div>
        <div className="product-card6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px', padding: '20px', border: '1px solid #ddd', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', backgroundColor: '#fff', width: '250px' }}>
       <a href="#" className="product-link" style={{ textDecoration: 'none', color: 'inherit'}}>
        <div style={{width: '100%', height: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}><img className="product-image" src={o8} alt="Product6" style={{ width: '80%', height: 'auto', objectFit: 'cover' }} /></div> 
         <div className="product-details" style={{ marginTop: '20px' }}>
           <div className="product-title" style={{ fontSize: '25px', fontWeight: 'bold', color: 'green', marginBottom: '10px' }}>Castor</div>
           <p className="product-description"style={{ fontSize: '16px', color: '#555', textAlign: 'justify' }}>
             Castor oil is a vegetable oil obtained from the seeds of the castor oil plant (Ricinus communis). It is known for its medicinal properties and is commonly used in cosmetics, skincare products, and as a laxative.
           </p>
         </div>
       </a>
      </div>
    </div>
    </div>
  )
}

export default ProductCard