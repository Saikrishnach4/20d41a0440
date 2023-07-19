import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function TrainDetails() {
  const { trainNumber } = useParams();
  const [trainDetails, setTrainDetails] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/train/trains/${trainNumber}`)
      .then(response => {
        console.log(response)
        setTrainDetails(response.data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }, [trainNumber]);

  if (!trainDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Train Details</h2>
      <p>Train Name: {trainDetails.trainName}</p>
      <p>Train Number: {trainDetails.trainNumber}</p>
    </div>
  );
}

export default TrainDetails;
