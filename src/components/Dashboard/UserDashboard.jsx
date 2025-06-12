import React, { useEffect, useState } from 'react';

const UserDashboard = () => {
  const [educations, setEducations] = useState([]);
  const [newEducation, setNewEducation] = useState('');

  useEffect(() => {
    fetch('https://castorcareghanabackend.onrender.com/api/educations')
      .then(res => res.json())
      .then(setEducations);
  }, []);

  const handleAddEducation = () => {
    fetch('https://castorcareghanabackend.onrender.com/api/educations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newEducation }),
    })
      .then(res => res.json())
      .then(data => setEducations([...educations, data]));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>User Dashboard</h1>
      <h2>Educations</h2>
      <ul>{educations.map((e, i) => <li key={i}>{e.title}</li>)}</ul>
      <input value={newEducation} onChange={e => setNewEducation(e.target.value)} placeholder="New education" />
      <button onClick={handleAddEducation}>Add</button>
    </div>
  );
};

export default UserDashboard;
