import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SelfServePage = () => {
  const { state } = useLocation();
  const { userId } = state || {};
  const [contracts, setContracts] = useState([]);
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3001/contracts?userId=${userId}`)
      .then((response) => response.json())
      .then((data) => setContracts(data));
  }, [userId]);

  const sendContract = async (contract: string) => {
    await fetch('http://localhost:3001/sendContract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, contract }),
    });
    alert('Contract sent!');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div>
        <h1>Self-Serve</h1>
        <input type="email" placeholder="Recipient Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <ul>
          {contracts.map((contract: any, index: number) => (
            <li key={index}>
              {contract.contract} <button onClick={() => sendContract(contract.contract)}>Send</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
};

export default SelfServePage;