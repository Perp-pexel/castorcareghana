import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s1 from '../assets/s1.jpg';
import t5 from '../assets/t5.webp';
import founder from '../assets/founder.jpg';
import h3 from '../assets/team/h3.jpg';
import c6 from '../assets/c6.webp';
import g4 from '../assets/g4.webp';
import n2 from '../assets/n2.jpeg';
import m6 from '../assets/m6.png';
import s2 from '../assets/s2.jpg';
import t4 from '../assets/t4.jpg';
import o8 from '../assets/o8.webp';
import so4 from '../assets/so4.png';

const ProductCard = ({ img, title, description }) => (
  <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 w-full flex items-center gap-6 min-h-[180px]">
    <div className="w-20 h-20 flex-shrink-0">
      <img src={img} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="flex-1">
      <h2 className="text-lg font-semibold text-green-600 mb-1">{title}</h2>
      <p className="text-sm text-gray-700 text-justify leading-snug">{description}</p>
    </div>
  </div>
);

const Content = () => {
  const [showOverlay, setShowOverlay] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openOverlay = () => setShowOverlay(true);
  const closeOverlay = () => setShowOverlay(false);
  const handleProductClick = (product) => setSelectedProduct(product);
  const closeProductModal = () => setSelectedProduct(null);

  const productList = [
    { img: c6, title: "Cashew Nuts", description: "Cashew kernels are nutrient-rich, kidney-shaped seeds from the tropical cashew tree, valued for both their taste and health benefits." },
    { img: g4, title: "Ginger", description: "Ginger is a Southeast Asian plant known for its root, widely used as a spice and traditional medicine in global cuisines." },
    { img: n2, title: "Ground Nut", description: "Groundnuts, or peanuts, are protein-rich underground seeds valued for their healthy fats and nutrients." },
    { img: m6, title: "Maize", description: "Maize, or corn, is an ancient cereal grain and global staple, widely used for food, animal feed, and industry." },
    { img: s2, title: "Shea Nuts", description: "Shea nuts are fat-rich seeds from West Africa's shea tree, used to make shea butter for cosmetics and skincare." },
    { img: t4, title: "Tiger Nuts", description: "Tiger nuts are nutrient-rich underground tubers high in fiber and healthy fats, enjoyed as a wholesome snack." },
    { img: so4, title: "Soya Beans", description: "Soya beans are a type of legume widely grown for their edible bean, a significant source of protein and oil." },
    { img: o8, title: "Castor", description: "Castor is a plant known for oil-rich seeds used in medicine, cosmetics, and industry. Its oil has many benefits." }
  ];

  return (
    <div>
      <section className="w-11/12 md:w-4/5 mx-auto my-20 p-6 md:p-8">
        <div className="flex items-center gap-8 flex-wrap md:flex-nowrap">
          <div className="flex-1 text-base leading-relaxed text-gray-800">
            <h1 className="text-3xl md:text-4xl mb-4 text-gray-800 font-bold">Who We Are</h1>
            <p>
              Castor Care Ghana Ltd is a company focused on changing the agriculture sector.
              We have evolved into a growing enterprise dedicated to transforming lives and landscapes.
              Our company specializes in commodity trading like Soya bean, Maize and Shea nut to both local markets and export needs.
              We also train smallholder farmers in financial literacy and good agricultural practices.
              We’re proud to have expanded our portfolio to include trading in other commodities including Cashew, Tiger Nuts and Ginger.
            </p>
            <Link to="/about" className="mt-4 inline-block text-green-600 border-2 border-green-500 px-4 py-2 text-base font-medium hover:bg-green-500 hover:text-white transition">
              Read More →
            </Link>
          </div>
          <img src={t5} alt="about" className="flex-1 w-full md:max-w-[50%] h-[300px] md:h-[400px] object-cover rounded mt-6 md:mt-0" />
        </div>
      </section>

      <section className="w-11/12 md:w-4/5 mx-auto my-20 p-6 md:p-8">
        <div className="flex items-center gap-8 flex-wrap md:flex-nowrap">
          <img src={s1} alt="offer" className="flex-1 w-full md:max-w-[50%] h-[300px] md:h-[400px] object-cover rounded mb-6 md:mb-0" />
          <div className="flex-1 text-base leading-relaxed text-gray-800">
            <h1 className="text-3xl md:text-4xl mb-4 text-gray-800 font-bold">What We Offer</h1>
            <p>
              Castor Care Ghana is a digital platform aimed at changing the food industry by connecting producers, traders and consumers worldwide.
              We promote sustainable food production, trade and consumption through:
            </p>
            <ul className="list-disc pl-5">
              <li>Supply chain optimization using data analytics and AI-driven insights</li>
              <li>Quality control and assurance through standardized processes and certifications</li>
              <li>Payment processing and financing solutions for buyers and sellers</li>
            </ul>
            <Link to="/service" className="mt-4 inline-block text-green-600 border-2 border-green-500 px-4 py-2 text-base font-medium hover:bg-green-500 hover:text-white transition">
              Read More →
            </Link>
          </div>
        </div>
      </section>

      <section className="w-11/12 md:w-4/5 mx-auto my-20 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="border-r-2 border-green-300 pr-6">
          <h4 className="text-lg font-semibold">Our Target Market</h4>
          <h2 className="text-xl font-bold text-green-700 mt-2">We are committed to working with key stakeholders across the agricultural value chain, including:</h2>
          <ul className="list-disc pl-5 mt-4">
            <li>Farmers and farmer cooperatives</li>
            <li>Food processors and manufacturers</li>
            <li>Local and international buyers</li>
            <li>Regulatory bodies and certification agencies</li>
          </ul>
        </div>
        <div className="border-l-2 border-green-300 pl-6">
          <p className="text-gray-700">At Castor Care Ghana our mission is to revolutionize the agricultural landscape by providing cutting-edge technology solutions that optimize the farm-to-table supply chain.</p>
          <div onClick={openOverlay} className="flex items-center gap-6 mt-6 cursor-pointer">
            <img src={founder} alt="founder" className="w-24 h-24 rounded-full object-cover" />
            <div>
              <h3 className="text-lg font-bold">Kwaku Anim-Asiedu</h3>
              <p className="text-green-600">Founder & CEO of Castor Care Ghana</p>
            </div>
          </div>
        </div>
      </section>

      {showOverlay && (
        <div onClick={closeOverlay} className="fixed top-0 left-0 w-full h-full bg-black/95 bg-opacity-70 flex items-center justify-center z-[999]">
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 md:p-10 rounded-xl max-w-5xl max-h-[90vh] w-full shadow-2xl overflow-y-auto relative">
            <button onClick={closeOverlay} className="absolute top-4 right-6 text-2xl text-gray-400 hover:text-gray-600">&times;</button>
            <div className="flex flex-wrap gap-8 justify-center items-center">
              <div className="flex-1 max-w-xl">
                <h2 className="text-2xl font-bold text-green-700 mb-2">About Kwaku Anim-Asiedu</h2>
                <h5 className="text-lg font-medium text-gray-600 mb-4">Founder & CEO of Castor Care Ghana</h5>
                <p className="text-base leading-relaxed text-gray-700">
                  Kwaku Anim-Asiedu is the visionary behind Castor Care Ghana. With a passion for sustainable agriculture and rural development, he has empowered thousands of Ghanaian farmers through access to quality inputs, training, and technology. His dedication to empowering communities and promoting sustainable practices has positioned Castor Care Ghana as a leading force in the agricultural sector.
                </p>
              </div>
              <img src={h3} alt="Kwaku Anim-Asiedu" className="flex-1 max-w-md w-full h-[500px] object-cover rounded-lg shadow-lg" />
            </div>
          </div>
        </div>
      )}

      <section className="py-20">
        <h1 className="text-center text-2xl text-gray-800 mb-10">Commodities Traded</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 px-6 md:px-8">
          {productList.map((product, index) => (
            <div key={index} onClick={() => handleProductClick(product)} className="cursor-pointer">
              <ProductCard img={product.img} title={product.title} description={product.description} />
            </div>
          ))}
        </div>
      </section>

      {selectedProduct && (
        <div onClick={closeProductModal} className="fixed top-0 left-0 w-full h-full bg-black/95 bg-opacity-70 flex items-center justify-center z-[1000]">
          <div onClick={(e) => e.stopPropagation()} className="bg-white p-6 rounded-xl max-w-lg max-h-[85%] overflow-y-auto shadow-2xl relative">
            <button onClick={closeProductModal} className="absolute top-3 right-4 text-2xl text-gray-500 hover:text-gray-700">&times;</button>
            <img src={selectedProduct.img} alt={selectedProduct.title} className="w-full max-h-[400px] object-cover rounded mb-5" />
            <h2 className="text-green-600 text-xl font-semibold mb-2">{selectedProduct.title}</h2>
            <p className="text-gray-700 leading-relaxed">{selectedProduct.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Content;
