import React from 'react';
import m5 from '../assets/m5.jpg';
import s6 from '../assets/s6.jpg';
import g1 from '../assets/g1.webp';
import Team from '../components/Team';
import '../App.css';

const About = () => {
  return (
    <div className="mt-[7%]">
      {/* OUR STORY SECTION */}
      <section className="flex flex-wrap gap-8 px-10 py-10 mx-10 bg-green-100 ">
        <div className="flex-1 grid grid-cols-2 gap-3">
          <img src={m5} alt="Our Story" className="w-full h-[400px] object-cover rounded-lg col-span-2" />
          <img src={s6} alt="Harvest in action" className="w-full h-[150px] object-cover rounded-lg" />
          <img src={g1} alt="Sacks of produce" className="w-full h-[150px] object-cover rounded-lg" />
        </div>

        <div className="flex-1 min-w-[300px] text-gray-800 text-[14px] leading-7">
          <h1 className="text-[30px] font-bold text-[#800020] mb-5">Our Story</h1>
          <p className="mb-4">
            Castor Care Ghana Ltd is a company focused on changing the agriculture sector. We have evolved into
            a growing enterprise dedicated to transforming lives and landscapes. Our company specializes in
            commodity trading like Soya bean, Maize and Shea nut to both local markets and export needs. We also
            train smallholder farmers in financial literacy and good agriculture practices. We’re proud to have
            expanded our portfolio to include trading in other commodities including Cashew, Tiger Nuts and Ginger.
          </p>
          <p className="mb-4">
            At Castor Care Ghana, we prioritize community needs, social responsibility and environmental
            sustainability. We’re dedicated to making a significant contribution to the United Nations
            Sustainable Development Goals (UN SDGs) 1,2, 3, 5, 8, 9, and 12. Our mission includes developing a
            robust impact measurement metric to assess and enhance our contributions to environmental, social
            and economic goals.
          </p>
          <p>
            Castor Care Ghana’s cutting-edge Agri-tech Solution, harnessing Technology to optimize the
            farm-to-table supply chain. This innovation ensures transparency, traceability and accountability
            which empowers farmers, suppliers and consumers. As a key player in the agricultural sector, we’re
            striving to make a positive impact both locally and globally.
          </p>
        </div>
      </section>

      {/* VISION, MISSION, VALUES SECTION */}
<section className="flex flex-col md:flex-row flex-wrap justify-between gap-8 px-6 md:px-10 py-10 mx-4 md:mx-10 mt-4">
  <div className="statement w-full md:w-[30%]">
    <h2 className="text-[#006400] font-semibold mb-2 text-xl">Our Vision</h2>
    <p className="mb-4 text-10">
      At Castor Care Ghana, we envision a future where technology and agriculture work hand in hand to
      create sustainable and efficient food systems. We aim to empower farmers, enhance food security,
      and promote responsible consumption through innovative solutions.
    </p>
  </div>

  <div className="statement w-full md:w-[30%]">
    <h2 className="text-[#006400] font-semibold mb-2 text-xl">Our Mission</h2>
    <p className="mb-4 text-10">
      Our mission is to revolutionize the agricultural landscape by providing cutting-edge technology
      solutions that optimize the farm-to-table supply chain. We are committed to fostering sustainable
      practices, enhancing food security, and empowering communities through education and innovation.
    </p>
  </div>

  <div className="statement w-full md:w-[30%]">
    <h2 className="text-[#006400] font-semibold mb-2 text-xl">Our Values</h2>
    <p className="mb-4 text-10">At Castor Care Ghana, we believe in:</p>
    <ul className="list-disc list-inside mt-2">
      <li>Quality</li>
      <li>Transparency</li>
      <li>Responsible Practices</li>
      <li>Sustainability</li>
    </ul>
  </div>
</section>


      {/* TEAM SECTION */}
      <div>
        <Team />
      </div>
    </div>
  );
};

export default About;
