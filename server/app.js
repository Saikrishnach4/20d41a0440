const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());


const secretKey = 'sai';

let clientIDFromRegistration;
let clientSecretFromRegistration;

app.post('/register', (req, res) => {
  const { companyName, ownerName, rollNo, ownerEmail, accesscode } = req.body;

  clientIDFromRegistration = generateClientID();
  clientSecretFromRegistration = generateClientSecret();

  const response = {
    companyName,
    clientID: clientIDFromRegistration,
    clientSecret: clientSecretFromRegistration,
  };
console.log(response.clientID)
  res.json(response);
});

app.post('/api/auth', (req, res) => {
  const { clientSecret, clientID } = req.body;

  console.log(req.body)
  if (clientID!== clientIDFromRegistration) {
    return res.status(401).json({ error: 'Invalid client ID' });
  }

  const accessToken = generateAccessToken(clientID);
  const expiresIn = 3600;

  const response = {
    token_type: 'bearer',
    access_token: accessToken,
    expires_in: expiresIn,
  };

  res.json(response);
});

function generateClientID() {
  const randomID = Math.random().toString(36).substring(2, 10);
  const timestamp = Date.now().toString().substring(6);
  return randomID + timestamp;
}

function generateClientSecret() {
  const randomSecret = Math.random().toString(36).substring(2, 10);
  return randomSecret;
}

function generateAccessToken(clientID) {
  const payload = { clientID };
  const options = { expiresIn: '1h' };
  const token = jwt.sign(payload, secretKey, options);
  return token;
}
const trainDetailsData = {
  '2344': {
    trainName: 'Chennai Exp',
    trainNumber: '2344',
    departureTime: { hours: 21, minutes: 35, seconds: 0 },
    seatsAvailable: { sleeper: 3, AC: 1 },
    price: { sleeper: 2, AC: 5 },
    delayedBy: 15,
  },
  '2341': {
    trainName: 'Hyderabad Exp',
    trainNumber: '2341',
    departureTime: { hours: 23, minutes: 55, seconds: 0 },
    seatsAvailable: { sleeper: 6, AC: 7 },
    price: { sleeper: 554, AC: 1854 },
    delayedBy: 5,
  },
};

app.get('/train/trains/:trainNumber', (req, res) => {
  const trainNumber = req.params.trainNumber;
  const trainDetails = trainDetailsData[trainNumber];

  if (!trainDetails) {
    return res.status(404).json({ error: 'Train not found' });
  }

  res.json(trainDetails);
});

app.get('/train/trains', (req, res) => {
  const trains = Object.values(trainDetailsData);
  res.json(trains);
});

app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
