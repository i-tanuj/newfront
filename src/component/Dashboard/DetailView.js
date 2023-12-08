import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DetailView() {
  const [customerDetails, setCustomerDetails] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    // Fetch data for the specific ID from the API
    axios.get(`https://shipment-backend.onrender.com/api/mergeapidata/${id}`)
      .then((response) => {
        setCustomerDetails(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [id]);

  if (!customerDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className="customer-details">
      <h2>Customer Details</h2>
      <table>
        <tbody>
          {Object.entries(customerDetails).map(([key, value]) => (
            <tr key={key}>
              <td>{key}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DetailView;
