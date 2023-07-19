import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function TrainList() {
  const [trains, setTrains] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/train/trains')
      .then(response => {
        setTrains(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {trains.map((train) => (
        <div key={train.trainNumber}>
          <h3>Train Name: {train.trainName}</h3>
          <p>Train Number: {train.trainNumber}</p>
          <p>
            Departure Time: {train.departureTime.Hours}:{train.departureTime.Minutes}:{train.departureTime.Seconds}
          </p>
          <p>Seats Available:</p>
          <ul>
            <li>Sleeper: {train.seatsAvailable.sleeper}</li>
            <li>AC: {train.seatsAvailable.AC}</li>
          </ul>
          <p>Price:</p>
          <ul>
            <li>Sleeper: {train.price.sleeper}</li>
            <li>AC: {train.price.AC}</li>
          </ul>
          <p>Delayed By: {train.delayedBy} minutes</p>
          <Link to={`/train/trains/${train.trainNumber}`}>View Details</Link>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default TrainList;
