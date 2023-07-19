import React, { useState } from 'react';
import axios from 'axios';

function ClientForm() {
  const [companyName, setCompanyName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [accessCode, setAccessCode] = useState('');
  const [response, setResponse] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      companyName,
      ownerName,
      rollNo,
      ownerEmail,
      accesscode: accessCode,
    };

    axios
      .post('http://localhost:4000/register', data)
      .then((response) => {
        console.log(response.data)
        setResponse(response.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div>
      <h2>Client Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="companyName">Company Name:</label>
          <input
            type="text"
            id="companyName"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ownerName">Owner Name:</label>
          <input
            type="text"
            id="ownerName"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="rollNo">Roll No:</label>
          <input
            type="text"
            id="rollNo"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="ownerEmail">Owner Email:</label>
          <input
            type="email"
            id="ownerEmail"
            value={ownerEmail}
            onChange={(e) => setOwnerEmail(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="accessCode">Access Code:</label>
          <input
            type="text"
            id="accessCode"
            value={accessCode}
            onChange={(e) => setAccessCode(e.target.value)}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {response && (
        <div>
          <h3>Response:</h3>
          <p>Company Name: {response.companyName}</p>
          <p>Client ID: {response.clientID}</p>
          <p>Client Secret: {response.clientSecret}</p>
        </div>
      )}
    </div>
  );
}

export default ClientForm;
