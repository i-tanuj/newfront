import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import Accordion from "react-bootstrap/Accordion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";

async function ContactData(getContact, id) {
  await axios
    .get("https://shipment-backend.onrender.com/api/creatcustomer", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      getContact(res.data);
    });
}

function CreateShipment() {
  const [link, setLink] = useState("");
  const [link1, setLink1] = useState("");
  const [latitude, setLatitude] = useState("");
  const [latitude1, setLatitude1] = useState("");
  const [longitude, setLongitude] = useState("");
  const [longitude1, setLongitude1] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/vehicledetails"
      );
      setVehicleDetails(response.data); // Assuming the API returns an array of vehicle details
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  // Vehicle Dropdown end here

  // Helper Dropdown login start here

  const [helpers, setHelpers] = useState([]);
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [selectedHelper2, setSelectedHelper2] = useState("");

  useEffect(() => {
    async function fetchHelpers() {
      try {
        const response = await axios.get(
          "https://shipment-backend.onrender.com/api/createhelper"
        );
        setHelpers(response.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchHelpers();
  }, []);

  // Helper Dropdown end here

  // Driver Dropdown start here

  const [drivers, setDrivers] = useState([]);
  const [selectedDriver, setSelectedDriver] = useState("");
  // const [selectedDrivers, setSelectedDrivers] = useState("");

  useEffect(() => {
    // Fetch driver data from the API and populate the state
    fetchDrivers();
  }, []);

  const fetchDrivers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/driver"
      );
      const driversData = response.data;
      setDrivers(driversData);
    } catch (error) {
      console.error("Error fetching drivers:", error);
    }
  };

  // Driver Dropdown end here

  const [selectshipdrop, setSelectshipdrop] = useState("");
  const [selectshipdrop1, setSelectshipdrop1] = useState("");
  const [adddescriptiondrop, setAdddescriptiondrop] = useState("");
  const [adddescriptiondrop1, setAdddescriptiondrop1] = useState("");

  const [vehicles, setVehicle] = useState([]);

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        setDispatcherData(selectedDispatcherData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange1 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher1(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData1 = response.data;
        setDispatcherData1(selectedDispatcherData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange2 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher2(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData2 = response.data;
        setDispatcherData2(selectedDispatcherData2);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange3 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher3(selectedOptionValue);
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customerdata/${selectedOptionValue}`
        );
        const selectedDispatcherData3 = response.data;
        setDispatcherData3(selectedDispatcherData3);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const handleSelectVehicle = async (event) => {
    const selectedVehicleValue = event.target.value;
    setSelectedVehicle(selectedVehicleValue);
    console.log(selectedVehicleValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedVehicleValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/vehicledata/${selectedVehicleValue}`
        );
        const selectedVehicleData = response.data;
        setVehicleData(selectedVehicleData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [dispatchers, setDispatchers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [selectedDispatcher1, setSelectedDispatcher1] = useState("");
  const [selectedDispatcher2, setSelectedDispatcher2] = useState("");
  const [selectedDispatcher3, setSelectedDispatcher3] = useState("");

  useEffect(() => {
    fetchDispatchers();
  }, []);

  const fetchDispatchers = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/creatcustomer"
      );
      const dispatcherData = response.data;
      setDispatchers(dispatcherData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  useEffect(() => {
    fetchVehicle();
  }, []);

  const fetchVehicle = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/vehicledetails"
      );
      const vehicleData = response.data;
      setVehicle(vehicleData);
    } catch (error) {
      console.error("Error fetching dispatchers:", error);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [contact, getContact] = useState([]);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [dispatchname, setDispatchName] = useState("");
  const [discontactnum, setDiscontactnum] = useState("");

  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [email1, setEmail1] = useState("");
  const [altphone, setAltphone] = useState("");
  const [altphone1, setAltphone1] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [pickuplocation1, setPickuplocation1] = useState("");
  const [pickupdate, setPickupdate] = useState("");
  const [dropdate, setDropdate] = useState("");
  const [dropdate1, setDropdate1] = useState("");
  const [pickupdate1, setPickupdate1] = useState("");
  const [description, setDescription] = useState("");
  const [description1, setDescription1] = useState("");
  const [maplink, setmaplink] = useState("");

  const [dispatcherData, setDispatcherData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData1, setDispatcherData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData2, setDispatcherData2] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [dispatcherData3, setDispatcherData3] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [vehicleData, setVehicleData] = useState({
    id: "",
    name: "",
    email: "",
    vehicalplate: "",
  });

  const initialDispatcherData = {
    phoneno: "",
    email: "",
    altphone: "",
    phone: "",
    // ... other fields
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setIsLoading(true);
  //   console.log();
  //   try {
  //       const response = await axios.post(
  //         "https://shipment-backend.onrender.com/api/newidshipment",
  //         {
  //         customer_name: dispatcherData.name,
  //         customer_contact: dispatcherData.phoneno,
  //         customer_email: dispatcherData.email,
  //         customer_alt_num: dispatcherData.altphone,
  //         pick_up_location: dispatcherData.address,
  //         pick_up_before: pickupdate,
  //         drop_date: dropdate,
  //         drop_date1: dropdate1,
  //         latitude: latitude,
  //         longitude: longitude,
  //         latitude1: latitude1,
  //         longitude1: longitude1,
  //         description: description,
  //         customer_name2: dispatcherData1.name,
  //         customer_contact2: dispatcherData1.phoneno,
  //         drop_location: dispatcherData1.address,
  //         drop_description: adddescriptiondrop,
  //         vehicleplate: selectedVehicle,
  //         helper1: helperData.name,
  //         helper2: helperData1.name,
  //         driver_id: selectedDriver.id,
  //         driver_name: selectedDriver.full_name,
  //         customer_name1: dispatcherData2.name,
  //         customer_contact1: dispatcherData2.phoneno,
  //         customer_email1: dispatcherData2.email,
  //         customer_alt_num1: dispatcherData2.altphone,
  //         pick_up_location1: dispatcherData2.address,
  //         pick_up_before1: pickupdate1,
  //         description1: description1,
  //         customer_name21: dispatcherData3.name,
  //         customer_contact21: dispatcherData3.phoneno,
  //         drop_location1: dispatcherData3.address,
  //         drop_description1: adddescriptiondrop1,
  //       }
  //     );

  //     setModalIsOpen(false);
  //     toast.success("Shipment successfully created!", {
  //       position: "top-right",
  //       autoClose: 3000,
  //       hideProgressBar: true,
  //       closeOnClick: true,
  //       pauseOnHover: false,
  //       draggable: true,
  //     });
  //     setDispatcherData(initialDispatcherData);
  //     setName("");
  //     setPhone("");
  //     setPhone1("");
  //     setEmail("");
  //     setmaplink("");
  //     setAltphone("");
  //     setPickuplocation("");
  //     setPickupdate("");
  //     setDescription("");
  //     setDescription1("");
  //     setDispatchName("");
  //     setDiscontactnum("");
  //     setSelectshipdrop("");
  //     setAdddescriptiondrop("");
  //     setSelectedVehicle("");
  //     setSelectedHelper1("");
  //     selectedHelper1("");
  //     setSelectedHelper2("");
  //     setSelectedDriver("");
  //     setSelectedDispatcher("");
  //     setSelectedDispatcher1("");
  //     setSelectedDispatcher2("");
  //     setSelectedDispatcher3("");
  //     setDropdate("");
  //     setDropdate1("");
  //     // phoneno("");
  //     dispatcherData("");
  //     phone("");
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleLinkChange = (event) => {
    const newLink = event.target.value;
    setLink(newLink);

    // Use regular expression to extract latitude and longitude
    const match = newLink.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (match) {
      setLatitude(match[1]);
      setLongitude(match[2]);
    } else {
      setLatitude("");
      setLongitude("");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log();
    try {
      let requestData;
  
      if (isCheckboxChecked) {
        requestData = {
          customer_name: dispatcherData.name,
          customer_contact: dispatcherData.phoneno,
          customer_email: dispatcherData.email,
          customer_alt_num: dispatcherData.altphone,
          pick_up_location: dispatcherData.address,
          pick_up_before: pickupdate,
          drop_date: dropdate,
          drop_date1: dropdate1,
          latitude: latitude,
          longitude: longitude,
          latitude1: latitude1,
          longitude1: longitude1,
          description: description,
          customer_name2: dispatcherData1.name,
          customer_contact2: dispatcherData1.phoneno,
          drop_location: dispatcherData1.address,
          drop_description: adddescriptiondrop,
          vehicleplate: selectedVehicle,
          helper1: helperData.name,
          helper2: helperData1.name,
          driver_id: selectedDriver.id,
          driver_name: selectedDriver.full_name,
          customer_name1: dispatcherData.name,
          customer_contact1: dispatcherData.phoneno,
          customer_email1: dispatcherData.email,
          customer_alt_num1: dispatcherData.altphone,
          pick_up_location1: dispatcherData.address,
          pick_up_before1: pickupdate,
          description1: description,
          customer_name21: dispatcherData3.name,
          customer_contact21: dispatcherData3.phoneno,
          drop_location1: dispatcherData3.address,
          drop_description1: adddescriptiondrop1,
        };
      } else {
        requestData = {
          customer_name: dispatcherData.name,
                  customer_contact: dispatcherData.phoneno,
                  customer_email: dispatcherData.email,
                  customer_alt_num: dispatcherData.altphone,
                  pick_up_location: dispatcherData.address,
                  pick_up_before: pickupdate,
                  drop_date: dropdate,
                  drop_date1: dropdate1,
                  latitude: latitude,
                  longitude: longitude,
                  latitude1: latitude1,
                  longitude1: longitude1,
                  description: description,
                  customer_name2: dispatcherData1.name,
                  customer_contact2: dispatcherData1.phoneno,
                  drop_location: dispatcherData1.address,
                  drop_description: adddescriptiondrop,
                  vehicleplate: selectedVehicle,
                  helper1: helperData.name,
                  helper2: helperData1.name,
                  driver_id: selectedDriver.id,
                  driver_name: selectedDriver.full_name,
                  customer_name1: dispatcherData2.name,
                  customer_contact1: dispatcherData2.phoneno,
                  customer_email1: dispatcherData2.email,
                  customer_alt_num1: dispatcherData2.altphone,
                  pick_up_location1: dispatcherData2.address,
                  pick_up_before1: pickupdate1,
                  description1: description1,
                  customer_name21: dispatcherData3.name,
                  customer_contact21: dispatcherData3.phoneno,
                  drop_location1: dispatcherData3.address,
                  drop_description1: adddescriptiondrop1,
        };
      }
  
      const response = await axios.post(
        "https://shipment-backend.onrender.com/api/newidshipment",
        requestData
      );
  
      setModalIsOpen(false);
      toast.success("Shipment successfully created!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setDispatcherData(initialDispatcherData);
          setName("");
          setPhone("");
          setPhone1("");
          setEmail("");
          setmaplink("");
          setAltphone("");
          setPickuplocation("");
          setPickupdate("");
          setDescription("");
          setDescription1("");
          setDispatchName("");
          setDiscontactnum("");
          setSelectshipdrop("");
          setAdddescriptiondrop("");
          setSelectedVehicle("");
          setSelectedHelper1("");
          selectedHelper1("");
          setSelectedHelper2("");
          setSelectedDriver("");
          setSelectedDispatcher("");
          setSelectedDispatcher1("");
          setSelectedDispatcher2("");
          setSelectedDispatcher3("");
          setDropdate("");
          setDropdate1("");
          dispatcherData("");
          phone("");
    } catch (error) {
      console.error("Error submitting data:", error);
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleLinkChange1 = (event) => {
    const newLink1 = event.target.value;
    setLink1(newLink1);

    // Use regular expression to extract latitude and longitude
    const matchs = newLink1.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
    if (matchs) {
      setLatitude1(matchs[1]);
      setLongitude1(matchs[2]);
    } else {
      setLatitude1("");
      setLongitude1("");
    }
  };

  const availableDispatchersForSelectedDispatcher1 = dispatchers.filter(
    (dispatcher) => !selectedDispatcher.includes(dispatcher.id)
  );
  const availableDispatchersForSelectedDispatcher2 = dispatchers.filter(
    (dispatcher) =>
      !selectedDispatcher.includes(dispatcher.id) &&
      !selectedDispatcher1.includes(dispatcher.id)
  );
  const availableDispatchersForSelectedDispatcher3 = dispatchers.filter(
    (dispatcher) =>
      !selectedDispatcher.includes(dispatcher.id) &&
      !selectedDispatcher1.includes(dispatcher.id) &&
      !selectedDispatcher2.includes(dispatcher.id)
  );
  const [selectedHelper, setSelectedHelper] = useState("");
  const availableHelpersForSelectedHelper1 = helpers.filter(
    (helper) => !selectedHelper.includes(helper.id)
  );

  const [helperData, setHelperData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });
  const [helperData1, setHelperData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

  const handleSelectChange4 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedHelper(selectedOptionValue);
    console.log(selectedOptionValue);

    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData = response.data;
        setHelperData(selectedHelperData);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };
  const handleSelectChange5 = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedHelper1(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/helperdata/${selectedOptionValue}`
        );
        const selectedHelperData1 = response.data;
        setHelperData1(selectedHelperData1);
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  const [isCheckboxChecked, setCheckboxChecked] = useState(false);
  const [isCheckboxCheckeds, setCheckboxCheckeds] = useState(false);

  const [fillDetails, setFillDetails] = useState(false);
  const [fillDetail, setFillDetail] = useState(false);

  const handleCheckboxChange = () => {
    setFillDetails(!fillDetails);
    setCheckboxChecked(!isCheckboxChecked);
    if (!fillDetails) {
      // console.log("pick" +pick_up_before);
      // Fetch details from the API when the checkbox is checked
      ContactData(getContact, DefaultgetContact);
    } else {
      // Clear details when the checkbox is unchecked
      setDispatcherData(initialDispatcherData);
    }
  };
  const handleCheckboxChanges = () => {
    setFillDetail(!fillDetail);
    setCheckboxCheckeds(!isCheckboxCheckeds);
    // if (!fillDetails) {
    //   // console.log("pick" +pick_up_before);
    //   // Fetch details from the API when the checkbox is checked
    //   ContactData(getContact, DefaultgetContact);
    // } else {
    //   // Clear details when the checkbox is unchecked
    //   setDispatcherData(initialDispatcherData);
    // }
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        className="admin-section-map-modal modal_body modal-form-body"
      >
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
                <h2 className="py-3 text-center "> Shipment Creation</h2>

                <div className="admin-section-admin-01">
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
                          <h3 className="text-center pt-2 pb-4">
                            Pickup Details
                          </h3>
                        

                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Name
                                <span className="stra-icon"></span>
                              </label>

                              <select
                                value={selectedDispatcher}
                                onChange={handleSelectChange}
                                name="customer_name"
                                id="customer_name"
                              >
                                <option value="">Select Customer</option>
                                {dispatchers.map((dispatcher) => (
                                  <option
                                    key={dispatcher.id}
                                    value={dispatcher.id}
                                    name="customer_name"
                                    id="customer_name"
                                  >
                                    {dispatcher.name}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Contact Number
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                name="phoneno"
                                value={dispatcherData.phoneno}
                                onChange={(e) => setPhone(e.target.value)}
                                // readOnly
                                id="phoneno"
                                placeholder="Enter Contact Number"
                                type="number"
                              />
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
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Alternate Number
                                <span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                name="altphone"
                                id="altphone"
                                value={dispatcherData.altphone}
                                onChange={(e) => setAltphone(e.target.value)}
                                placeholder="Enter Alternate Number"
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Pick up Location
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                name="pickuplocation"
                                // value={pickuplocation}
                                value={dispatcherData.address}
                                onChange={(e) =>
                                  setPickuplocation(e.target.value)
                                }
                                id="pickuplocation"
                                placeholder="Enter Pickup Location"
                                type="text"
                              />
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Pick up Before
                                <span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                name="pickupdate"
                                value={pickupdate}
                                onChange={(e) => setPickupdate(e.target.value)}
                                id="pickupdate"
                                placeholder="Drop Location"
                                type="datetime-local"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-100">
                              <label className="form-label">
                                Add Description
                                <span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                className="p-3"
                                name="description"
                                onChange={(e) => setDescription(e.target.value)}
                                value={description}
                                id="description"
                                placeholder="Description"
                                type="text"
                              />
                            </div>
                          </div>
                          <div className="justify-content-start text-start align-items-center">
                            <div className="checkbox-new-add-d-from justify-content-start text-start align-items-center">
                              <input
                              className="justify-content-start text-start align-items-center"
                              type="checkbox"
                              checked={fillDetails}
                              onChange={handleCheckboxChange}
                            />
                              <label className="form-label">
                                Same Pickup for both delivery
                                <span className="stra-icon"></span>{" "}
                              </label>
                            </div>
                          </div>
                        

                              
                          <h3 className="text-center pt-3 pb-4">
                            Delivery Details
                          </h3>

                          <div className="row">
                            <div className="mb-4 w-50">
                              <label
                                for="exampleInputEmail1"
                                className="form-label"
                              >
                                Customers Name
                                <span className="stra-icon">*</span>
                              </label>
                              <select
                                value={selectedDispatcher1}
                                onChange={handleSelectChange1}
                              >
                                <option value="">Select Customer</option>
                                {availableDispatchersForSelectedDispatcher1.map(
                                  (dispatcher) => (
                                    <option
                                      key={dispatcher.id}
                                      value={dispatcher.id}
                                    >
                                      {dispatcher.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Customer Contact Number
                                <span className="stra-icon"></span>
                              </label>

                              <input
                                name="phone"
                                value={dispatcherData1.phoneno}
                                onChange={(e) => setPhone1(e.target.value)}
                                id="phone"
                                placeholder="Enter Contact Number"
                                type="number"
                              />
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Address (Drop Location)
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                placeholder="Write Drop Location"
                                type="text"
                                value={dispatcherData1.address}
                                onChange={(e) =>
                                  setSelectshipdrop(e.target.value)
                                }
                              />
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Google Map Link
                                <span className="stra-icon"></span>
                              </label>
                              <input
                                value={link1}
                                onChange={handleLinkChange1}
                                type="text"
                                placeholder="Google Map link"
                              />
                            </div>

                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Add Description
                                <span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                placeholder="Write Description"
                                type="text"
                                value={adddescriptiondrop}
                                onChange={(e) =>
                                  setAdddescriptiondrop(e.target.value)
                                }
                              />
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Drop Before
                                <span className="stra-icon"></span>{" "}
                              </label>
                              <input
                                name="dropdate"
                                value={dropdate}
                                onChange={(e) => setDropdate(e.target.value)}
                                id="dropdate"
                                placeholder="Drop Location"
                                type="datetime-local"
                              />
                            </div>
                          </div>

                          {/* accordian start here */}

                          <Accordion>
                            <Accordion.Item eventKey="0">
                              <Accordion.Header>


                                <div className="checkbox-add-form">
                                  {" "}
                                  {/* <img src="/Assets/dash/plus.png" /> */}
                                  <input className="" type="checkbox" name="" id=""   
                                   checked={fillDetail}
                              onChange={handleCheckboxChanges} />
                                <span className="addspan">

                                  Add Another Location
                                </span>
                                </div>





                              </Accordion.Header>
                              <Accordion.Body className="accordsecond">
                                <div className="row">
                                  <h3 className="text-center pt-2 pb-4">
                                    Second Pickup Details
                                  </h3>

                                  {!isCheckboxCheckeds && (

                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Names
                                        <span className="stra-icon"></span>
                                      </label>
                                      <input
                                          type="text"
                                          value={
                                            fillDetails
                                              ? dispatcherData.name
                                              : name
                                          }
                                          onChange={(e) =>
                                            fillDetails
                                              ? setDispatcherData({
                                                  ...dispatcherData,
                                                  name: e.target.value,
                                                })
                                              : setName(e.target.value)
                                          }
                                        />
                                    </div>
                                  )}
                                  {!isCheckboxCheckeds && (
                               
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Contact Number
                                        <span className="stra-icon"></span>
                                      </label>
                                      <input
                                          type="text"
                                          value={
                                            fillDetails
                                              ? dispatcherData.phoneno
                                              : phone
                                          }
                                          onChange={(e) =>
                                            fillDetails
                                              ? setDispatcherData({
                                                  ...dispatcherData,
                                                  phoneno: e.target.value,
                                                })
                                              : setPhone(e.target.value)
                                          }
                                        />
                                    </div>
                                  )}

                              
                                </div>
                                <div className="row">
                              
                                  {!isCheckboxCheckeds && (
                               
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Email Address
                                        <span className="stra-icon"></span>
                                      </label>
                                      <input
                                        type="text"
                                        value={
                                          fillDetails
                                            ? dispatcherData.email
                                            : email1
                                        }
                                        onChange={(e) =>
                                          fillDetails
                                            ? setDispatcherData({
                                                ...dispatcherData,
                                                email: e.target.value,
                                              })
                                            : setEmail1(e.target.value)
                                        }
                                      />
                                    </div>
                                    )}
                                  {!isCheckboxCheckeds && (
                               
                           
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Alternate Number
                                        <span className="stra-icon"></span>{" "}
                                      </label>
                                      <input
                                        type="text"
                                        value={
                                          fillDetails
                                            ? dispatcherData.altphone
                                            : altphone1
                                        }
                                        onChange={(e) =>
                                          fillDetails
                                            ? setDispatcherData({
                                                ...dispatcherData,
                                                altphone: e.target.value,
                                              })
                                            : setAltphone(e.target.value)
                                        }
                                      />
                                    </div>
                                  )}
                             
                                </div>
                                <div className="row">
                               
                                  {!isCheckboxCheckeds && (
                               
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Pick up Location
                                        <span className="stra-icon"></span>
                                      </label>

                                      <input
                                        type="text"
                                        value={
                                          fillDetails
                                            ? dispatcherData.address
                                            : pickuplocation1
                                        }
                                        onChange={(e) =>
                                          fillDetails
                                            ? setDispatcherData({
                                                ...dispatcherData,
                                                address: e.target.value,
                                              })
                                            : setPickuplocation(e.target.value)
                                        }
                                      />
                                    </div>
                                    )}
                                  {!isCheckboxCheckeds && (
                               
                            
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Pick up Before
                                        <span className="stra-icon"></span>{" "}
                                      </label>
                                      <input
                                        type="text"
                                        value={
                                          fillDetails
                                            ? dispatcherData.pickupdate
                                            : pickupdate
                                        }
                                        onChange={(e) =>
                                          fillDetails
                                            ? setDispatcherData({
                                                ...dispatcherData,
                                                pickupdate: e.target.value,
                                              })
                                            : setPickupdate(e.target.value)
                                        }
                                      />
                                    </div>
                                  )}
                                  
                                </div>
                                <div className="row">
                           
                                  {!isCheckboxCheckeds && (
                               
                                    <div className="mb-4 w-100">
                                      <label className="form-label">
                                        Add Description
                                        <span className="stra-icon"></span>{" "}
                                      </label>
                                      <input
                                        type="text"
                                        value={
                                          fillDetails
                                            ? dispatcherData.description
                                            : description
                                        }
                                        onChange={(e) =>
                                          fillDetails
                                            ? setDispatcherData({
                                                ...dispatcherData,
                                                description: e.target.value,
                                              })
                                            : setDescription(e.target.value)
                                        }
                                      />
                                    </div>
                                  )}

                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Name
                                        <span className="stra-icon"></span>
                                      </label>

                                      <select
                                        value={selectedDispatcher2}
                                        onChange={handleSelectChange2}
                                        name="customer_name"
                                        id="customer_name"
                                      >
                                        <option value="">
                                          Select Customer
                                        </option>
                                        {availableDispatchersForSelectedDispatcher2.map(
                                          (dispatcher) => (
                                            <option
                                              key={dispatcher.id}
                                              value={dispatcher.id}
                                              name="customer_name"
                                              id="customer_name"
                                            >
                                              {dispatcher.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    </div>
                                  )}
                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Contact Number
                                        <span className="stra-icon"></span>
                                      </label>
                                      <input
                                        name="phoneno"
                                        value={dispatcherData2.phoneno}
                                        onChange={(e) =>
                                          setPhone(e.target.value)
                                        }
                                        id="phoneno"
                                        placeholder="Enter Contact Number"
                                        type="number"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="row">
                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Email Address
                                        <span className="stra-icon"></span>
                                      </label>
                                      <input
                                        name="email"
                                        value={dispatcherData2.email}
                                        id="email"
                                        // value={email}
                                        onChange={(e) =>
                                          setEmail1(e.target.value)
                                        }
                                        placeholder="Enter Email Address"
                                        type="email"
                                      />
                                    </div>
                                  )}
                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Customer Alternate Number
                                        <span className="stra-icon"></span>{" "}
                                      </label>
                                      <input
                                        name="altphone"
                                        id="altphone"
                                        value={dispatcherData2.altphone}
                                        onChange={(e) =>
                                          setAltphone1(e.target.value)
                                        }
                                        placeholder="Enter Alternate Number"
                                        type="number"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="row">
                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Pick up Location
                                        <span className="stra-icon"></span>
                                      </label>

                                      <input
                                        name="pickuplocation"
                                        value={dispatcherData2.address}
                                        onChange={(e) =>
                                          setPickuplocation1(e.target.value)
                                        }
                                        id="pickuplocation"
                                        placeholder="Enter Pickup Location"
                                        type="text"
                                      />
                                    </div>
                                  )}
                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-50">
                                      <label className="form-label">
                                        Pick up Before
                                        <span className="stra-icon"></span>{" "}
                                      </label>
                                      <input
                                        name="pickupdate"
                                        value={pickupdate1}
                                        onChange={(e) =>
                                          setPickupdate1(e.target.value)
                                        }
                                        id="pickupdate"
                                        placeholder="Drop Location"
                                        type="datetime-local"
                                      />
                                    </div>
                                  )}
                                </div>
                                <div className="row">
                                  {!isCheckboxChecked && (
                                    <div className="mb-4 w-100">
                                      <label className="form-label">
                                        Add Description
                                        <span className="stra-icon"></span>{" "}
                                      </label>
                                      <input
                                        className="p-3"
                                        name="description1"
                                        onChange={(e) =>
                                          setDescription1(e.target.value)
                                        }
                                        value={description1}
                                        id="description"
                                        placeholder="Description"
                                        type="text"
                                      />
                                    </div>
                                  )}
                                </div>
                                <h3 className="text-center pt-3 pb-4">
                                  Second Delivery Details
                                </h3>

                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label
                                      for="exampleInputEmail1"
                                      className="form-label"
                                    >
                                      Customers Name
                                      <span className="stra-icon"></span>
                                    </label>

                                    <select
                                      value={selectedDispatcher3}
                                      onChange={handleSelectChange3}
                                      name="name"
                                      id="name"
                                    >
                                      <option value="">Select Customer</option>
                                      {availableDispatchersForSelectedDispatcher3.map(
                                        (dispatcher) => (
                                          <option
                                            key={dispatcher.id}
                                            value={dispatcher.id}
                                            name="name"
                                            id="name"
                                          >
                                            {dispatcher.name}
                                          </option>
                                        )
                                      )}
                                    </select>
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Customer Contact Number
                                      <span className="stra-icon"></span>
                                    </label>

                                    <input
                                      name="phone"
                                      value={dispatcherData3.phoneno}
                                      // value={phone}
                                      onChange={(e) => setPhone(e.target.value)}
                                      // readOnly
                                      id="phone"
                                      placeholder="Enter Contact Number"
                                      type="number"
                                    />
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Address (Drop Location)
                                      <span className="stra-icon"></span>
                                    </label>
                                    <input
                                      placeholder="Write Drop Location"
                                      type="text"
                                      value={dispatcherData3.address}
                                      onChange={(e) =>
                                        setSelectshipdrop1(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Google Map Link
                                      <span className="stra-icon"></span>
                                    </label>
                                    <input
                                      type="text"
                                      placeholder="Google Maps link"
                                      value={link}
                                      onChange={handleLinkChange}
                                    />
                                  </div>

                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Add Description
                                      <span className="stra-icon"></span>{" "}
                                    </label>
                                    <input
                                      // className="p-3"
                                      placeholder="Write Description"
                                      type="text"
                                      value={adddescriptiondrop1}
                                      onChange={(e) =>
                                        setAdddescriptiondrop1(e.target.value)
                                      }
                                    />
                                  </div>
                                  <div className="mb-4 w-50">
                                    <label className="form-label">
                                      Drop Before
                                      <span className="stra-icon"></span>{" "}
                                    </label>
                                    <input
                                      name="dropdate1"
                                      value={dropdate1}
                                      onChange={(e) =>
                                        setDropdate1(e.target.value)
                                      }
                                      id="dropdate1"
                                      placeholder="Drop Location"
                                      type="datetime-local"
                                    />
                                  </div>
                                </div>
                              </Accordion.Body>
                            </Accordion.Item>
                          </Accordion>

                          {/* accordian end here */}

                          <div className="row pt-5">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Vehicle Number
                                <span className="stra-icon"></span>
                              </label>

                              <select
                                id="vehicleDropdown"
                                value={selectedVehicle}
                                onChange={(e) =>
                                  setSelectedVehicle(e.target.value)
                                }
                              >
                                <option value="">Select a Vehicle</option>
                                {vehicleDetails.map((vehicle) => (
                                  <option
                                    key={vehicle.id}
                                    value={vehicle.vehicalplate}
                                  >
                                    {vehicle.name} - {vehicle.model}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Assign driver
                                <span className="stra-icon"></span>
                              </label>

                              <select
                                value={JSON.stringify(selectedDriver)}
                                onChange={(e) => {
                                  setSelectedDriver(JSON.parse(e.target.value));
                                  console.log(e.target.value);
                                }}
                              >
                                <option value="">Select Driver</option>
                                {drivers.map((driver) => (
                                  <option
                                    key={driver.id}
                                    value={JSON.stringify(driver)}
                                  >
                                    {driver.full_name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div className="row">
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Helper 1<span className="stra-icon"></span>{" "}
                              </label>

                              <select
                                value={selectedHelper}
                                onChange={handleSelectChange4}
                              >
                                <option value="">Select Helper 1</option>
                                {helpers.map((helper) => (
                                  <option key={helper.id} value={helper.id}>
                                    {helper.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div className="mb-4 w-50">
                              <label className="form-label">
                                Helper 2<span className="stra-icon"></span>{" "}
                              </label>

                              <select
                                value={selectedHelper1}
                                onChange={handleSelectChange5}
                              >
                                <option value="">Select Helper 2</option>
                                {availableHelpersForSelectedHelper1.map(
                                  (helper) => (
                                    <option key={helper.id} value={helper.id}>
                                      {helper.name}
                                    </option>
                                  )
                                )}
                              </select>
                            </div>
                          </div>

                          <button
                            type="submit"
                            value="Send Message"
                            className={`submit-btn btn ${
                              isLoading ? "btn-disabled" : "btn-primary"
                            }`}
                            disabled={isLoading} // Disable the button while loading
                          >
                            {isLoading ? (
                              <span>Loading...</span>
                            ) : (
                              <span>Create Task</span>
                            )}
                          </button>
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
                      <div></div>
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
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Create New Shipment
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default CreateShipment;
