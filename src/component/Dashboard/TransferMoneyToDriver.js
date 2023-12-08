import React, { useState, useEffect } from 'react';
import { AiOutlineClose } from "react-icons/ai";
import '../../css/transfermoneytodriver.css'
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




function TransferMoneyToDriver() {
  // const [isLoading, setIsLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [shipment_id, setShipmentid] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(false);
  const [succbtn, setSuccbtn] = useState();
  const [customernumber, setCustomernumber] = useState('');
  const [customers, setCustomers] = useState([]);
  const [selectedCustomers, setSelectedCustomers] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [CustomersData, setCustomersData] = useState({
      id: "",
      full_name: "",
      email: "",
      phoneno: "",
    });
  
    useEffect(() => {
      fetchCustomers();
    }, []);
   
  
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          "https://shipment-backend.onrender.com/api/driver"
        );
        const customersData = response.data;
        setCustomers(customersData);
      } catch (error) {
        console.error("Error fetching dispatchers:", error);
      }
    };

  
    const handleSelectChange = async (event) => {
      const selectedOptionValue = event.target.value;
      setSelectedCustomers(selectedOptionValue);
      if (selectedOptionValue) {
        try {
          const response = await axios.get(
            `https://shipment-backend.onrender.com/api/users/${selectedOptionValue}`
          );
          const selectedCustomersData = response.data;
          setCustomersData(selectedCustomersData);
        } catch (error) {
          console.error("Error fetching selected dispatcher:", error);
        }
      }
    };
  

    // const currentDate = new Date().toLocaleString("en-IN", {
    //   timeZone: "Asia/Kolkata",
    //   hour12: true,
    // });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const dataToSubmit = {
        full_name: CustomersData.full_name,
        driver_id: CustomersData.id,
        shipment_id,
        amount,
        // DateAndTime: currentDate, // Adding current date and time to the data object
      };
      setIsLoading(true);
    
      if (shipment_id === '' || amount === '') {
        setError(true);
        setSuccbtn(<span className="" style={{ color: 'red' }}>Please fill all the fields</span>);
      } else {
        setError(false);
        setSuccbtn('');
        axios.post('https://shipment-backend.onrender.com/api/payment', dataToSubmit)
          .then((response) => {
            console.log(response.data);
            setSuccbtn(<span className="" style={{ color: 'green' }}>Submitted Successfully</span>);
            setModalIsOpen(false);
            toast.success("Transfer Amount Successfully!", {
              position: "top-right",
              autoClose: 3000,
              hideProgressBar: true,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
            });
            console.log(selectedCustomers);
          })
          .catch((error) => {
            console.error('Error submitting data:', error);
            setSuccbtn(<span className="" style={{ color: 'red' }}>Failed to submit data</span>);
          })
          .finally(() => {
            setIsLoading(false); // Set isLoading to false when the request is complete
          });
      }
    };

    
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const dataToSubmit = {
  //     full_name:CustomersData.full_name,
  //     driver_id:CustomersData.id,
  //     shipment_id,
  //     amount,
  //     // DateAndTime: currentDate, // Adding current date and time to the data object
  //   };
  //   setIsLoading(true);
    
  //   if (shipment_id === '' || amount === '') {
  //     setError(true);
  //     setSuccbtn(<span className="" style={{ color: 'red' }}>Please fill all the fields</span>);
  //   } else {
  //     setError(false);
  //     setSuccbtn('');
  //     axios.post('https://shipment-backend.onrender.com/api/payment', dataToSubmit)
  //     .then((response) => {
  //       console.log(response.data);
  //       setSuccbtn(<span className="" style={{ color: 'green' }}>Submitted Successfully</span>);
  //       setModalIsOpen(false);
  //       toast.success("Transfer Amount Successfully!", {
  //         position: "top-right",
  //         autoClose: 3000,
  //         hideProgressBar: true,
  //         closeOnClick: true,
  //         pauseOnHover: false,
  //         draggable: true,
  //       });
  //       console.log(selectedCustomers);
  //       } ) 
  //       .catch((error) => {
  //         console.error('Error submitting data:', error);
  //         setSuccbtn(<span className="" style={{ color: 'red' }}>Failed to submit data</span>);
  //       } 
  //       ); 
  //   } 
  // };

  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
        <div className="card">
          <div className="">
            <div className="admin-dashboard">
              <div className="title-header">
                <h5 className="card-header-01 text-center">Transfer money to Driver</h5>
                <ModalBody className="close-icon">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div className="row card-holder">
                <form className="form-control-holder" 
                onSubmit={handleSubmit} 
                >
                    
                  <div className="d-flex Transfer-form">
                  <div className="mb-4">
                    <label for="exampleInputEmail1" className="form-label">
                    Driver Name<span className="stra-icon">*</span>
                    </label>


                    <select
                              value={selectedCustomers}
                              onChange={handleSelectChange}
                            // value={customername}
                            // onChange={(e) => setCustomername(e.target.value)}
                              name="full_name"
                              id="full_name"
                            >
                              <option value="">Select Driver Name</option>
                              {customers.map((customers) => (
                                <option
                                  key={customers.id}
                                  value={customers.id}
                                  name="full_name"
                              id="full_name"
                                >
                                  {customers.full_name}
                                </option>
                              ))}
                            </select>

                    {/* <select
                              value={selectedDriver}
                              onChange={handleSelectChange}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                              name="full_name"
                              id="full_name"
                            >
                              <option value="">Select Customer</option>
                              {users.map((users) => (
                                <option
                                  key={users.id}
                                  value={users.id}
                                  name="full_name"
                              id="full_name"
                                >
                                  {users.full_name}
                                </option>
                              ))}
                            </select> */}
                  
                    {/* <select name="full_name"  id="full_name" onChange={handleDriverChange} value={selectedDriver}> */}
                    
        {/* <option  value="">Select a driver</option>
        {drivers.map((driver) => (
          <option key={driver.id} value={driver.full_name}>
            {driver.full_name}
          </option>
        ))}
      </select>

      <select
                              value={selectedDispatcher}
                              onChange={handleSelectChange}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                              name="name"
                              id="name"
                              // onChange={handleDriverChange} value={selectedDriver}
                            >
                              <option value="">Select Driver</option>
                              {drivers.map((driver) => (                           
          <option key={driver.id} value={driver.full_name} name="name"
                              id="name">

            {driver.full_name}

                                </option>
                              ))}
                            </select> */}


                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                    Driver ID<span className="stra-icon">*</span>
                    </label>


                    <input
                              name="phone"
                              value={CustomersData.id}
                            // value={customernumber}
                            onChange={(e) => setCustomernumber(e.target.value)}
                              readOnly
                              id="phone"
                              placeholder="Enter Driver ID"
                              type="number"
                            />

                    {/* <input 
                       name="shipment_id"   
                       onChange={(e)=> setShipmentid(e.target.value)}          
                       id="shipment_id"
                       placeholder="Enter Shipment ID"
                       type="number"
                    /> */}
                    
                     {/* {error && shipment_id.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Shipment ID*</span>:""} */}

                  </div>
                  </div>
                  {/* <input type="text" value="22.2222" disabled="disabled" /> */}
                  <div className="d-flex Transfer-form">

                  <div className="mb-4">
                    <label className="form-label">
                    Shipment ID<span className="stra-icon">*</span>
                    </label>
                   <input 
                       name="shipment_id"   
                       onChange={(e)=> setShipmentid(e.target.value)}          
                       id="shipment_id"
                       placeholder="Enter Shipment ID"
                       type="number"
                       required
                    />
                    {/* <input 
                       name="driver_id"   
                       onChange={(e)=> setDriver_ID(e.target.value)}          
                       id="driver_id"
                       placeholder="Enter Driver ID"
                       type="number"
                    /> */}
                    
                     {/* {error && shipment_id.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Shipment ID*</span>:""} */}

                  </div>
                  
                  <div className="mb-4 w-50 Transfer-form ">
                    <label className="form-label">
                    Transfer Amount<span className="stra-icon">*</span>
                    </label>
                    <input
                       name="amount"   
                       onChange={(e)=> setAmount(e.target.value)}          
                       id="amount"
                       placeholder="Enter Amount"
                       type="number"
                       required
                    />
                     {error && amount.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Amount*</span>:""}

                  </div>
                  </div>
                  <button type="submit" 
                  // className="submit-btn"  
                      className={`submit-btn btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
        disabled={isLoading} // Disable the button while loading
          
                  value="Send Message">
                  
 {isLoading ? <span>Loading...</span> : <span>Transfer Amount</span>}

                  </button>
                  {/* <div className="succbtn mb-4" >{succbtn ? <p>{succbtn}</p> : null}</div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="d-flex shipment-bnt">
          <button type="submit" 
          onClick={() => setModalIsOpen(true)}
        //   className={`submit-btn btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}
        // disabled={isLoading} // Disable the button while loading
          
        >
        Transfer money to Driver
            
 {/* {isLoading ? <span>Loading...</span> : <span>Transfer money to Driver</span>} */}

          </button>
      </div>
    </div>
  );
}

export default TransferMoneyToDriver;
