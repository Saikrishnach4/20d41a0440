import React, { useState } from 'react';
import axios from 'axios';

function Api() {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [accessToken, setAccessToken] = useState('');
  const [expiresIn, setExpiresIn] = useState('');

  const handleAuth = () => {
    axios.post('http://localhost:4000/register', {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accesscode: accessCode
    })
      .then(response => {
        const { companyName, clientID, clientSecret } = response.data;

        const data = {
          clientSecret,
          clientID,
        };

        axios.post('http://localhost:4000/api/auth', data)
          .then(response => {
            const { access_token, expires_in } = response.data;
            setAccessToken(access_token);
            setExpiresIn(expires_in);
          })
          .catch(error => {
            console.error('Error:', error);
          });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <label>Company Name:</label>
      <input type="text" value={companyName} onChange={e => setCompanyName(e.target.value)} />
      <label>Owner Name:</label>
      <input type="text" value={ownerName} onChange={e => setOwnerName(e.target.value)} />
      <label>Roll No:</label>
      <input type="text" value={rollNo} onChange={e => setRollNo(e.target.value)} />
      <label>Owner Email:</label>
      <input type="text" value={ownerEmail} onChange={e => setOwnerEmail(e.target.value)} />
      <label>Access Code:</label>
      <input type="text" value={accessCode} onChange={e => setAccessCode(e.target.value)} />
      <button onClick={handleAuth}>Authenticate</button>
      <div>
        <p>Access Token: {accessToken}</p>
        <p>Expires In: {expiresIn}</p>
      </div>
    </div>
  );
}

export default Api;
