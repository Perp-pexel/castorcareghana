import React from 'react'
import ser1 from '../assets/ser1.jpg'
import ser2 from '../assets/ser2.avif'
import h1 from '../assets/team/h1.jpg'
import h2 from '../assets/team/h2.jpg'

const Service = () => {
  return (
    <div className="px-4 sm:px-6 md:px-10 py-14 font-sans text-gray-800 mt-[5%]">
      <h1 className="text-3xl font-bold text-green-600 mb-3">Our Services</h1>
      <p className="text-base mb-8">We offer a wide range of services to meet your needs.</p>

      {/* Image Stack & Key Objective */}
      <div className="flex flex-wrap gap-10 mb-16">
        <div className="relative w-full md:w-[700px] h-[500px]">
          <img
            src={ser1}
            alt="Service 1"
            className="absolute top-0 right-[60px] w-[320px] h-[450px] object-cover rounded-xl shadow-lg z-10 translate-y-[10px] transition-transform duration-300"
          />
          <img
            src={ser2}
            alt="Service 2"
            className="absolute top-[50px] left-5 w-[320px] h-[450px] object-cover rounded-xl shadow-2xl z-20 -translate-y-[10px] transition-transform duration-300"
          />
        </div>

        <div className="flex-1 min-w-[300px]">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">🎯 Key Objective</h2>
          <p>
            At Castor Care Ghana, our services are designed to address the challenges faced by farmers,
            traders, and consumers in the food industry. We are committed to achieving these objectives
            through innovative solutions and partnerships.
          </p>
          <p className="mt-4">We aim to:</p>
          <ul className="list-disc list-inside mt-2">
            <li>✅ Improve supply chain efficiency</li>
            <li>✅ Increase farmer income</li>
            <li>✅ Reduce post-harvest losses</li>
            <li>✅ Enhance food safety and quality control</li>
          </ul>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-green-600 mb-6">💡 Why Choose Us</h2>

        <div className="flex flex-wrap gap-6">
          <div className="flex-1 min-w-[300px] bg-gray-100 border-l-[6px] border-red-600 p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-red-600 font-bold mb-2">🚨 Problem Statement</h3>
            <p className="mb-2">Ghana’s food supply chain is plagued by inefficiencies, including:</p>
            <ul className="list-disc list-inside">
              <li>❌ Lack of transparency and accountability</li>
              <li>❌ Inadequate tracking and tracing of products</li>
              <li>❌ High post-harvest losses</li>
              <li>❌ Inefficient payment systems</li>
              <li>❌ Limited access to market information</li>
              <li>❌ Food safety concerns</li>
            </ul>
          </div>

          <div className="flex-1 min-w-[300px] bg-green-50 border-l-[6px] border-green-600 p-6 rounded-lg shadow-md">
            <h3 className="text-xl text-green-600 font-bold mb-2">✅ Our Solution</h3>
            <p className="mb-2">We offer a blockchain-based platform that:</p>
            <ul className="list-disc list-inside">
              <li>🔒 Ensures transparent and tamper-proof data management</li>
              <li>📦 Enables real-time tracking and tracing from farm to table</li>
              <li>💰 Streamlines payment processes and reduces transaction costs</li>
              <li>📊 Provides actionable market insights</li>
              <li>🥗 Enhances food safety and quality control</li>
              <li>🆔 Adds unique traceability to each commodity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* What We Do Section */}
      <div className="mx-auto mt-[7%] p-6 bg-gradient-to-br from-green-50 to-white rounded-xl">
        <h1 className="text-3xl text-green-600 mb-6 font-bold text-center">What We Do</h1>
        <p className="text-base text-gray-700 leading-relaxed text-center max-w-4xl mx-auto mb-10">
          At Castor Care Ghana, we leverage technology to transform the agricultural landscape. Our platform
          connects farmers, traders, and consumers, ensuring a more efficient and transparent food supply chain.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[{
            title: "Empower Farmers",
            desc: "We empower farmers with access to markets and fair prices.",
            quote: "Agriculture is our priority.",
            img: h2
          }, {
            title: "Support Traders",
            desc: "We provide traders with real-time market data and analytics.",
            quote: "Trade with confidence.",
            img: h2
          }, {
            title: "Serve Consumers",
            desc: "We ensure consumers receive safe and high-quality food products.",
            quote: "Your health is our priority.",
            img: h1
          }, {
            title: "Promote Sustainability",
            desc: "We promote sustainable agricultural practices.",
            quote: "For a greener future.",
            img: h1
          }].map((item, index) => (
            <div key={index} className="rounded-lg p-6 text-center hover:shadow-xl transition-shadow duration-300">
              <img src={item.img} alt={item.title} className="w-35 h-30 object-cover rounded-full border-r-[10px] border-green-600 mx-auto mb-4" />
              <h1 className="text-lg font-bold text-gray-800 mb-2">{item.title}</h1>
              <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
              <p className="text-sm italic text-gray-500">{item.quote}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Service;
