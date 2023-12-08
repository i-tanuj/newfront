// import React from 'react'
import '../../css/adminboard.css'
import '../../css/dispatchlist.css'
import React,{useState,useEffect} from 'react'
import DatePicker from "react-datepicker";
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


function AdminDash() {
	const [data, setData] = useState([]);
	const [startDate, setStartDate] = useState(null);
	const [endDate, setEndDate] = useState(null);

	const handleStartDateChange = (date) => {
		setStartDate(date);
	  };
	
	  const handleEndDateChange = (date) => {
		setEndDate(date);
	  };
	  
	  const filteredData = data.filter((item) => {
		if (startDate && endDate) {
		  const itemDate = new Date(item.DateAndTime);
		  return itemDate >= startDate && itemDate <= endDate;
		}
		return true;
	  });
	  const [idCount, setIdCount] = useState(null);
	  const [idCountstatus, setIdCountstatus] = useState(null);

	  useEffect(() => {
		// Make a GET request to your API to fetch the count
		axios.get('https://shipment-backend.onrender.com/api/shipmentcount')
		  .then((response) => {
			setIdCount(response.data.count); // Set the count in the state
			console.log("tfg"+response.data.count); // Set the count in the state
		  })
		  .catch((error) => {
			console.error('Error fetching count:', error);
		  });
	  }, []);

	  useEffect(() => {
		// Make a GET request to your API to fetch the count
		axios.get('https://shipment-backend.onrender.com/api/shipmentcountstatus')
		  .then((response) => {
			setIdCountstatus(response.data.count); // Set the count in the state
			console.log("tfg"+response.data.count); // Set the count in the state
		  })
		  .catch((error) => {
			console.error('Error fetching count:', error);
		  });
	  }, []);

	  const [totalAmount, setTotalAmount] = useState(null);

	  useEffect(() => {
		// Make a GET request to your API endpoint
		axios.get('https://shipment-backend.onrender.com/api/totalAmountsum')
		  .then((response) => {
			setTotalAmount(response.data.totalAmount);
		  })
		  .catch((error) => {
			console.error('Error fetching data:', error);
		  });
	  }, []);


	
  return (
    <div>
        	<div class="">
							<div class="admin-dashboard">
								<div class="title-header datepicker-admin">
									<h5 class="title-header-admin">Admin Dashboard</h5>
									<div  className='datepicker-date'>
									{/* <span className="calender-icon">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="Start Date"
                        />
                        <img className="calender-icon" src="assets/dashboard/calendar.png" alt="" />
                      </span> */}

					  {/* <span className="calender-icon">
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="End Date"
                        />
                        <img class="calender-icon" src="assets/dashboard/calendar.png" alt="" />
                      </span> */}
										{/* <input className='' type="date" name="from" id="from" /> */}
										{/* <input className='' type="date" name="to" id="to" /> */}
									</div>
									
								</div>
								<div class="row card-holder">
								<div class="col-md-4 col-sm-6 col-xs-12">
									<div class="card-01 mb-3">
									  <div class="card-body">
									    <img src="/Assets/gif/truck.gif"/>	
									    <p class="card-text">Total Shipment</p>
									    <h2 class="text-left">{idCount !== null ? idCount : 'Loading...'}</h2>
									  </div>
									</div>
								</div>
								<div class="col-md-4 col-sm-6 col-xs-12">
									<div class="card-01 mb-3">
									  <div class="card-body">
									    <img src="/Assets/gif/complete.gif"/>	
									    <p class="card-text">Completed Shipment</p>
									    <h2 class="">{idCountstatus !== null ? idCountstatus : 'Loading...'}</h2>
									  </div>
									</div>
								</div>
								<div class="col-md-4 col-sm-6 col-xs-12">
									<div class="card-01 mb-3">
									  <div class="card-body">
									    <img src="/Assets/gif/payment.gif"/>	
									    <p class="card-text">Total Payment</p>
										<h2 class="">{totalAmount !== null ? totalAmount : 'Loading...'}</h2>
									  </div>
									</div>
								</div>
							</div>
							</div>
						</div>
    </div>
  )
}

export default AdminDash;