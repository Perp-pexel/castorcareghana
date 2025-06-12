import React, { useEffect, useState } from 'react';

const AdminDashboard = () => {
  const [productions, setProductions] = useState([]);
  const [educations, setEducations] = useState([]);
  const [newProduction, setNewProduction] = useState('');
  const [newEducation, setNewEducation] = useState('');

  useEffect(() => {
    fetch('https://castorcareghanabackend.onrender.com/api/productions')
      .then(res => res.json())
      .then(setProductions);

    fetch('https://castorcareghanabackend.onrender.com/api/educations')
      .then(res => res.json())
      .then(setEducations);
  }, []);

  const handleAddProduction = () => {
    fetch('https://castorcareghanabackend.onrender.com/api/productions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: newProduction }),
    })
      .then(res => res.json())
      .then(data => setProductions([...productions, data]));
  };

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
      <h1>Admin Dashboard</h1>
      <h2>Productions</h2>
      <ul>{productions.map((p, i) => <li key={i}>{p.name}</li>)}</ul>
      <input value={newProduction} onChange={e => setNewProduction(e.target.value)} placeholder="New production" />
      <button onClick={handleAddProduction}>Add</button>

      <h2 style={{ marginTop: '20px' }}>Educations</h2>
      <ul>{educations.map((e, i) => <li key={i}>{e.title}</li>)}</ul>
      <input value={newEducation} onChange={e => setNewEducation(e.target.value)} placeholder="New education" />
      <button onClick={handleAddEducation}>Add</button>
    </div>
  );
};

export default AdminDashboard;
