import React from 'react'
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
import '../App.css';

const Team = () => {
  return (
    <div className='team-section' style={{ marginTop: '5%' }}>
        <h1 className='team-title' style={{ color: '#800020', fontSize: '30px', marginBottom: '20px', textAlign: 'center' }}>Meet Our Team</h1>
        <p className='team-description' style={{ textAlign: 'center', marginBottom: '30px', fontSize: '20px', color: '#333' }}>We are a diverse group of professionals dedicated to delivering the best products and services.</p>
          <div className='team-container' style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', gap: '20px', padding: '30px'}}>  

        <div className='team-card'>
        <img className='team-image' src={t8} alt="Team Member 8" />
        <div className='team-info'>
          <h3 className='team-name'>Kwaku Anim-Asiedu</h3>
          <p className='team-role'>CEO</p>
        </div>
      </div>

      <div className='team-card'>
        <img className='team-image' src={t11} alt="Team Member 11" />
        <div className='team-info'>
          <h3 className='team-name'>Rev. Lawrence Kumi</h3>
          <p className='team-role'>Board Chairman</p>
        </div>
      </div>

      <div className='team-card'>
        <img className='team-image' src={t9} alt="Team Member 9" />
        <div className='team-info'>
          <h3 className='team-name'>Philemon Famieh</h3>
          <p className='team-role'>Board Member</p>
        </div>
      </div>

      <div className='team-card'>
        <img className='team-image' src={t6} alt="Team Member 6" />
        <div className='team-info'>
          <h3 className='team-name'>John Darko</h3>
          <p className='team-role'>Board Member</p>
        </div>
      </div>

       <div className='team-card'>
        <img className='team-image' src={t4} alt="Team Member 4" />
        <div className='team-info'>
          <h3 className='team-name'>Gloria Adeti</h3>
          <p className='team-role'>Food Technologist</p>
        </div>
      </div>

      <div className='team-card'>
        <img className='team-image' src={t2} alt="Team Member 2" />
        <div className='team-info'>
          <h3 className='team-name'>Esther Aidoo</h3>
          <p className='team-role'>Administrative Assistant</p>
        </div>
      </div>

       <div className='team-card'>
        <img className='team-image' src={t3} alt="Team Member 3" />
        <div className='team-info'>
          <h3 className='team-name'>Evans Nyakotey</h3>
          <p className='team-role'>International Relations Manager</p>
        </div>
      </div>

      <div className='team-card'>
        <img className='team-image' src={t1} alt="Team Member 1" />
        <div className='team-info'>
          <h3 className='team-name'>Abigail Ahene</h3>
          <p className='team-role'>Data Analyst</p>
        </div>
      </div>

       <div className='team-card'>
        <img className='team-image' src={t5} alt="Team Member 5" />
        <div className='team-info'>
          <h3 className='team-name'>Helena Ofosu</h3>
          <p className='team-role'>Accounting Assistant</p>
        </div>
      </div>

        <div className='team-card'>
        <img className='team-image' src={t7} alt="Team Member 7" />
        <div className='team-info'>
          <h3 className='team-name'>Kassim Zakaria</h3>
          <p className='team-role'>Farmer Group Manager</p>
        </div>
      </div>

            <div className='team-card'>
        <img className='team-image' src={t10} alt="Team Member 10" />
        <div className='team-info'>
          <h3 className='team-name'>Prince Asante</h3>
          <p className='team-role'>-</p>
        </div>
      </div>

      
    </div>
    </div>
    
  )
}

export default Team;