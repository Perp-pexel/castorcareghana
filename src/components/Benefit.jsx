import React, { useState } from "react";
import f1 from "../assets/f1.jpg";
import f2 from "../assets/f2.jpg";

const blogPosts = [
  {
    type: "image",
    title: "Training Session with Local Farmers",
    src: "/media/farmer-training.jpg",
    description: "Empowering local farmers with modern techniques and financial literacy.",
  },
  {
    type: "video",
    title: "Castor Care Impact Story",
    src: "/media/impact-video.mp4",
    description: "Watch how Castor Care is transforming communities through agriculture.",
  },
  {
    type: "image",
    title: "Warehouse Expansion Project",
    src: "/media/warehouse.jpg",
    description: "New facilities to support better storage and logistics across regions.",
  },
];

const products = [
  { name: "Castor", benefits: ["Supports healthy skin and reduces inflammation.", "Promotes hair growth and scalp health.", "Acts as a natural moisturizer to prevent dryness.", "Relieves joint pain and muscle soreness.", "Improves digestion and boosts immunity."] },
  { name: "Maize", benefits: ["Rich in dietary fiber, aiding digestion.", "Provides essential nutrients like Vitamin B and Magnesium.", "Supports eye health due to antioxidants.", "Aids in weight management with low fat content.", "Boosts energy through complex carbohydrates."] },
  { name: "Groundnut", benefits: ["Boosts heart health with healthy fats.", "Supports brain function and reduces inflammation.", "High in protein, supporting muscle repair.", "Aids weight management with satiety effect.", "Rich in antioxidants, promoting cell repair."] },
  { name: "Cashew", benefits: ["Strengthens bones with high magnesium content.", "Boosts immune system and promotes skin health.", "Supports healthy blood circulation.", "Rich in healthy fats for heart protection.", "Helps maintain healthy cholesterol levels."] },
  { name: "Ginger", benefits: ["Aids digestion and reduces nausea.", "Anti-inflammatory and antioxidant effects.", "Relieves menstrual pain and discomfort.", "Boosts immunity and fights infections.", "Improves cardiovascular health."] },
  { name: "Shea Nut", benefits: ["Moisturizes and softens skin.", "Contains anti-aging and healing properties.", "Reduces skin inflammation and blemishes.", "Protects skin from environmental damage.", "Soothes eczema and skin irritations."] },
  { name: "Soya Bean", benefits: ["Rich in protein and promotes heart health.", "May support hormonal balance in women.", "Reduces risk of osteoporosis.", "Helps manage cholesterol levels.", "Supports muscle and tissue repair."] },
  { name: "Tiger Nuts", benefits: ["High in fiber, aiding digestion.", "Natural source of energy and boosts libido.", "Supports heart health with good fats.", "Regulates blood sugar levels.", "Improves gut health with prebiotics."] },
];

const courses = [
  { title: "Sustainable Agricultural Land Management", link: "https://www.coursera.org/learn/sustainable-agriculture", image: f2 },
  { title: "Diploma in Farm Management (Alison)", link: "https://alison.com/courses?query=farm%20management", image: f1 },
];

const Benefit = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="p-4">
      <h2 className="text-green-800 text-3xl font-semibold my-12 ml-20">Latest Stories</h2>
      <div className="flex flex-wrap justify-center gap-12 mx-12 mb-12">
        {blogPosts.map((post, index) => (
          <div key={index} className="bg-white rounded-xl p-5 max-w-xs shadow-lg">
            <h3 className="text-lg text-gray-800 font-semibold mb-2">{post.title}</h3>
            {post.type === "image" ? (
              <img src={post.src} alt={post.title} className="w-full h-40 object-cover rounded-lg" />
            ) : (
              <video controls src={post.src} className="w-full h-40 rounded-lg bg-black" />
            )}
            <p className="mt-3 text-gray-600 text-sm">{post.description}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-12 px-12 animate-fadeInUp mt-30 mb-10">
        <section className="flex-1">
          <h1 className="text-2xl font-bold text-red-900 border-b-4 border-red-900 pb-2 mb-6">Health Benefits of Castor Care Products</h1>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {products.map((prod, idx) => (
              <button
                key={idx}
                className="bg-red-900 text-white px-4 py-2 font-bold text-base rounded-lg shadow hover:bg-red-700"
                onClick={() => setSelected(idx)}
              >
                {prod.name}
              </button>
            ))}
          </div>
          {selected !== null && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto bg-pink-50 rounded-xl p-8 shadow-lg">
              <h3 className="text-2xl font-bold text-red-900 text-center col-span-1 md:col-span-3">{products[selected].name}</h3>
              <ul className="col-span-1 md:col-span-3 space-y-4">
                {products[selected].benefits.map((b, i) => (
                  <li
                    key={i}
                    className="bg-pink-100 border-l-4 border-red-900 p-4 text-base font-semibold text-red-800 rounded-md shadow-sm hover:bg-pink-200"
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <section className="lg:w-2/5">
          <h2 className="text-xl font-semibold mb-6">🎓 Recommended Courses</h2>
          <div className="flex flex-wrap justify-between gap-6">
            {courses.map((course, i) => (
              <a
                href={course.link}
                key={i}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[70%] hover:no-underline"
              >
                <img src={course.image} alt={course.title} className="rounded-lg mb-2" />
                <h3 className="text-sm font-medium text-gray-800">{course.title}</h3>
              </a>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Benefit;
