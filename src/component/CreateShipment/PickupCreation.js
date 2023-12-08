import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import DeliveryCreation from "./DeliveryCreation";

async function ContactData(getContact, id) {
  await axios
    .get("https://shipment-backend.onrender.com/api/dispatcher", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      // console.log(res.data);
      getContact(res.data);
    });
}



// async function addBatch(name,email,phone,altphone,pickuplocation,pickupdate,selectshipment,adddescription,setModalIsOpen,getBatchList){
//   if (name !== "" && email !== "" && phone !== "" && altphone!== "" ) {
//     await axios.post('https://shipment-backend.onrender.com/api/addtotalshipmentrecord',
//     {
//         inst_hash: localStorage.getItem('name'),
//         name: name,
//        email: email,
//        phone: phone,
//        altphone:altphone,
//        pickuplocation: pickuplocation,
//        pickupdate:pickupdate,
//        selectshipment:selectshipment,
//        adddescription:adddescription,
      
//       },
//     {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}    
//     )
//     ContactData(getBatchList);
//     setModalIsOpen(false);

    

// } else {
// document.getElementById("validate-batch").innerHTML=
//   "*Please fill required field!";
// console.log("Error :", "Please fill required field");
// }

// }


function PickupCreation() {
  const [dispatchers, setDispatchers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
  });
  useEffect(() => {
    // Fetch dispatcher data from the server and populate the state
    fetchDispatchers();
  }, []);

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/dispatcher"
      );
      const dispatcherData = response.data;
      setDispatchers(dispatcherData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/fetchData/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
      } catch (error) {
        //   console.log(selectedDispatcherData);
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, getContact] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);

  const [dispatchname, setDispatchName] = useState("");

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);


const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [altphone, setAltphone] = useState('');
  const [phone, setPhone] = useState('');
  const [pickuplocation, setPickuplocation] = useState('');
  const [pickupdate, setPickupdate] = useState('');
  const [adddescription, setAdddescription] = useState('');
  const [selectshipment, setSelectshipment] = useState('');


const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://shipment-backend.onrender.com/api/addtotalshipmentrecord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, phone, altphone, pickuplocation, pickupdate, selectshipment, adddescription }),
      });

      if (response.ok) {
        console.log('Data submitted successfully');
        // You can reset the form here
      } else {
        console.error('Data submission failed');
      }
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };






  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
        <div className="delivery-pickup-form-holder">
          <div className="card">
            <ModalBody className="close-icon">
              <AiOutlineClose
                className="main_AiOutlineClose"
                onClick={() => setModalIsOpen(false)}
                color="rgba(27, 38, 68, 1)"
              />
            </ModalBody>
            <div className="">
              <div className="admin-dashboard">
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link active card-header-01 text-center"
                      id="home-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#home-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="home-tab-pane"
                      aria-selected="true"
                    >
                      Pickup Creation
                    </button>
                  </li>
                  <li class="nav-item" role="presentation">
                    <button
                      class="nav-link card-header-01 text-center"
                      id="profile-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-tab-pane"
                      type="button"
                      role="tab"
                      aria-controls="profile-tab-pane"
                      aria-selected="false"
                    >
                      Delivery Creation
                    </button>
                  </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                  <div
                    class="tab-pane fade show active"
                    id="home-tab-pane"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                    tabindex="0"
                  >
                    <div className="row card-holder">
                      <form
                        className="form-control-holder"
                        onSubmit={handleSubmit}
                      >
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Name
                              <span className="stra-icon"></span>
                            </label>

                            <select
                              value={selectedDispatcher}
                              onChange={handleSelectChange}
                            // value={name}
                            // onChange={(e) => setName(e.target.value)}
                              name="name"
                              id="name"
                            >
                              <option value="">Select Customer</option>
                              {dispatchers.map((dispatcher) => (
                                <option
                                  key={dispatcher.id}
                                  value={dispatcher.id}
                                  name="name"
                              id="name"
                                >
                                  {dispatcher.name}
                                </option>
                              ))}
                            </select>

                            {/* {error && dispatchname.selected <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter full name*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>

                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Contact Number
                              <span className="stra-icon"></span>
                            </label>
                            <input
                              name="phone"
                              value={dispatcherData.phone}
                            // value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                              // readOnly
                              id="phone"
                              placeholder="Enter Contact Number"
                              type="number"
                            />
                            {/* {error && dispatchemail.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the valid Email*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Email Address
                              <span className="stra-icon"></span>
                            </label>
                            <input
                              name="email"
                              value={dispatcherData.email}
                              id="email"
                              // value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              placeholder="Enter Email Address"
                              type="email"
                            />
                            {/* {error && discontactnum.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the 10 Digit number*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Customer Alternate Number
                              <span className="stra-icon">*</span>{" "}
                            </label>
                            <input
                              name="altphone"
                            //   onChange={(e) => setAltphone(e.target.value)}
                              id="altphone"
                              value={altphone}
                              onChange={(e) => setAltphone(e.target.value)}
                              placeholder="Enter Alternate Number"
                              type="number"
                            />
                            {/* {error && disaltnum.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter the 10 Digit number*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Pick up Location
                              <span className="stra-icon">*</span>
                            </label>
                            <input
                              name="pickuplocation"
                            //   onChange={(e) =>
                            //     setPickuplocation(e.target.value)
                            //   }
                            value={pickuplocation}
                            onChange={(e) => setPickuplocation(e.target.value)}
                              id="pickuplocation"
                              placeholder="Enter Pickup Location"
                              type="text"
                            />
                            {/* {error && pickuplocation.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter pickup location*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Pick up Before<span className="stra-icon">*</span>{" "}
                            </label>
                            <input
                              name="pickupdate"
                            //   onChange={(e) =>
                            //     setPickupdate(e.target.value)
                            //   }
                            value={pickupdate}
                            onChange={(e) => setPickupdate(e.target.value)}
                              id="pickupdate"
                              placeholder="Drop Location"
                              type="date"
                            />
                            {/* {error && pickupbeforedate.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Enter Pick Up location*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <div className="row">
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Please Select<span className="stra-icon">*</span>
                            </label>
                            <select
                            name="selectshipment"
                            id="selectshipment"
                              class=""
                              aria-label="Default select example"
                              onChange={(e) =>
                                setSelectshipment(e.target.value)
                              }
                              value={selectshipment}
                            >
                              <option selected>Select Here</option>
                              <option value="Shipment">Shipment</option>
                              <option value="Force work">Force Work</option>
                            </select>
                            {/* {error && pickupbeforedate.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Please Select*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                          <div className="mb-4 w-50">
                            <label className="form-label">
                              Add Description<span className="stra-icon"></span>{" "}
                            </label>
                            <input
                              name="adddescription"
                              onChange={(e) =>
                                setAdddescription(e.target.value)
                              }
                              value={adddescription}
                              id="adddescription"
                              placeholder="Description"
                              type="text"
                            />
                            {/* {error && adddescription.length <= 0 ? (
                              <span
                                className="valid-form"
                                style={{ color: "red" }}
                              >
                                Enter Description*
                              </span>
                            ) : (
                              ""
                            )} */}
                          </div>
                        </div>
                        <button
                          type="submit"
                          className="submit-btn"
                          value="Send Message"
                        //   onClick={() => addBatch(name,email,phone,altphone,pickuplocation,pickupdate,selectshipment,adddescription)}
                        >
                          Save & Next
                        </button>
                        {/* <div className="succbtn mb-4">
                          {succbtn ? <p>{succbtn}</p> : null}
                        </div> */}
                      </form>
                    </div>
                  </div>
                  <div
                    class="tab-pane fade"
                    id="profile-tab-pane"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                    tabindex="0"
                  >
                    <div>
                      <DeliveryCreation />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <div className="d-flex create-dispatcher-01 align-items-center">
        <div className="plus-icon">
          <button type="submit" 
          onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Create New Shipment
          </button>
        </div>
      </div>
    </div>
  );
}

export default PickupCreation;
