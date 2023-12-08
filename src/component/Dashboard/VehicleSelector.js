import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VehicleSelector = () => {
  const [details, setDetails] = useState([]);

  useEffect(() => {
    axios.get('https://shipment-backend.onrender.com/api/identities')
      .then(response => {
        setDetails(response.data);
      })
      .catch(error => {
        console.log('Error fetching data: ', error);
      });
  }, []);

  const handleInputChange = (index, field, value) => {
    const updatedDetails = [...details];
    updatedDetails[index][field] = value;
    setDetails(updatedDetails);
  };

  const handleUpdateDetails = (id, updatedDetails) => {
    axios.put(`https://shipment-backend.onrender.com/api/updateadminapi/${id}`, updatedDetails)
      .then(response => {
        // Handle success, perhaps show a success message
        console.log('Details updated:', response.data);
      })
      .catch(error => {
        console.error('Error updating details: ', error);
        // Handle the error, maybe show an error message to the user
      });
  };

  return (
    <div>
      <h1 className='text-center'>Details</h1>
      {details.map((item, index) => (
        <div className='p-2 text-center' key={index}>
          <p>Detail ID: {item.id}</p>
          <input
            type="text"
            value={item.username}
            onChange={(e) => handleInputChange(index, 'username', e.target.value)}
            placeholder="Name"
            className='mt-2 p-2'

          />
          <br />
          <input
            type="text"
            value={item.contact}
            onChange={(e) => handleInputChange(index, 'contact', e.target.value)}
            placeholder="Contact"
            className='mt-2 p-2'
          />
          <div className='text-center justify-content-center align-items-center'>

          <button className='bg-dark p-2 mt-3 text-center justify-content-center align-items-center' onClick={() => handleUpdateDetails(item.id, details[index])}>Update</button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default VehicleSelector;
