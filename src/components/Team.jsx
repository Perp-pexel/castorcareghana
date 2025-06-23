import React from 'react';
import t1 from '../assets/team/t1.jpg';
import t2 from '../assets/team/t2.jpg';
import t3 from '../assets/team/t3.jpg';
import t4 from '../assets/team/t4.jpeg';
import t5 from '../assets/team/t5.jpg';
import t6 from '../assets/team/t6.jpg';
import t7 from '../assets/team/t7.jpg';
import t8 from '../assets/team/t8.jpg';
import t9 from '../assets/team/t9.jpg';
import t10 from '../assets/team/t10.jpg';
import t11 from '../assets/team/t11.jpg';

const teamMembers = [
  { name: 'Kwaku Anim-Asiedu', role: 'CEO', img: t8 },
  { name: 'Rev. Lawrence Kumi', role: 'Board Chairman', img: t11 },
  { name: 'Philemon Famieh', role: 'Board Member', img: t9 },
  { name: 'John Darko', role: 'Board Member', img: t6 },
  { name: 'Gloria Adeti', role: 'Food Technologist', img: t4 },
  { name: 'Esther Aidoo', role: 'Administrative Assistant', img: t2 },
  { name: 'Evans Nyakotey', role: 'International Relations Manager', img: t3 },
  { name: 'Abigail Ahene', role: 'Data Analyst', img: t1 },
  { name: 'Helena Ofosu', role: 'Accounting Assistant', img: t5 },
  { name: 'Kassim Zakaria', role: 'Farmer Group Manager', img: t7 },
  { name: 'Prince Asante', role: '-', img: t10 },
];

const Team = () => {
  return (
    <div className="mt-20 px-4 sm:px-8 lg:px-16">
      <h1 className="text-3xl text-center text-[#800020] font-bold mb-4">Meet Our Team</h1>
      <p className="text-center text-lg text-gray-700 mb-10">
        We are a diverse group of professionals dedicated to delivering the best products and services.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="w-[250px] rounded-2xl  p-4 transition-transform duration-300 hover:scale-105"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-full h-56 object-cover rounded-xl"
            />
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-gray-800">{member.name}</h3>
              <p className="text-sm text-gray-500">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
