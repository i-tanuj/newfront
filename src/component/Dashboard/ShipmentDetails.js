import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import "react-datepicker/dist/react-datepicker.css";
import * as XLSX from "xlsx";
import * as FileSaver from "file-saver";
import { toast } from "react-toastify";
import { Form, FormGroup, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";
import { DateTime } from "luxon";

async function ContactData(getContact, id) {
  await axios
    .get("https://shipment-backend.onrender.com/api/creatcustomer", {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    })
    .then((res) => {
      getContact(res.data);
    });
}

function ShipmentDetails() {
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Initialize search term as empty
  const [pickUpLocation, setPickUpLocation] = useState(""); // Pick-up Location
  const [contact, getContact] = useState([]);
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [helpers, setHelpers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [selectedDispatcher1, setSelectedDispatcher1] = useState("");
  const [searchText, setSearchText] = useState(""); // Search text for filtering by customer name
  const [editItem, setEditItem] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedCustomerName2, setSelectedCustomerName2] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [customerNames, setCustomerNames] = useState([]);
  const [customerNames2, setCustomerNames2] = useState([]);
  const [driverIds, setDriverIds] = useState([]); // To store all driver IDs
  const [selectedHelper2, setSelectedHelper2] = useState("");
  const [helper1Options, setHelper1Options] = useState([]); // Helper 1 options
  const [helper2Options, setHelper2Options] = useState([]);
  const [customerContact, setCustomerContact] = useState(""); // Customer Contact
  const [customerContact2, setCustomerContact2] = useState(""); // Customer Contact
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAltNum, setCustomerAltNum] = useState(""); // Customer Alternate Number
  const [customerEmail, setCustomerEmail] = useState(""); // Customer Alternate Number
  const [customerEmail1, setCustomerEmail1] = useState(""); // Customer Alternate Number
  const [pickupDate, setPickupDate] = useState(""); // Customer Alternate Number
  const [dropDate, setDropDate] = useState(""); // Customer Alternate Number
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [email, setEmail] = useState("");
  const [altphone, setAltphone] = useState("");
  const [altphone1, setAltphone1] = useState("");
  const [phone, setPhone] = useState("");
  const [phone1, setPhone1] = useState("");
  const [droplocation, setdroplocation] = useState("");
  const [drop_location, setDrop_Location] = useState("");
  const [pickuplocation, setPickuplocation] = useState("");
  const [vehicles, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleDetails, setVehicleDetails] = useState([]);
  const [filteredHelpers1, setFilteredHelpers1] = useState([]);
  const [filteredHelpers2, setFilteredHelpers2] = useState([]);
  useEffect(() => {
    ContactData(getContact, DefaultgetContact);
  }, []);
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

  const handleSelectChange1 = async (event) => {
    const selectedOptionValue1 = event.target.value;
    setSelectedDispatcher1(selectedOptionValue1);
    console.log(selectedOptionValue1);
    // If you want to fetch data only when a specific dispatcher is selected, you can add this condition
    if (selectedOptionValue1) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customer-details-main?name=${selectedOptionValue1}`
        );
        const selectedDispatcherData1 = response.data;
        console.log("Selected Dispatcher Data 1:", selectedDispatcherData1);
        if (selectedDispatcherData1.length > 0) {
          const { phoneno, altphone, email, address } =
            selectedDispatcherData1[0];
          setAltphone1(altphone || "");
          setPhone1(phoneno);
          // setEmail(email || "");
          setCustomerEmail1(email || "");
          setdroplocation(address || "");
        } else {
          // Handle the case when no data is returned for the selected name
          console.log("No data found for the selected name");
          // You might want to clear the fields or show a message to the user
        }
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const vehicleResponse = await axios.get(
          "https://shipment-backend.onrender.com/api/vehicledetails"
        );
        setVehicleDetails(vehicleResponse.data);
      } catch (error) {
        console.error("Error fetching vehicle details:", error);
      }

      try {
        const helperResponse = await axios.get(
          "https://shipment-backend.onrender.com/api/createhelper"
        );
        setHelpers(helperResponse.data);
      } catch (error) {
        console.error("Error fetching helpers:", error);
      }
    }
    fetchData();
  }, []);

  const handleVehicleChange = (event) => {
    setSelectedVehicle(event.target.value);
  };

  const handleHelper1Change = (event) => {
    setSelectedHelper1(event.target.value);
  };

  const handleHelper2Change = (event) => {
    setSelectedHelper2(event.target.value);
  };

  useEffect(() => {
    setFilteredHelpers1(
      helpers.filter((helper) => helper.name !== selectedHelper2)
    );
  }, [selectedHelper2, helpers]);

  useEffect(() => {
    setFilteredHelpers2(
      helpers.filter((helper) => helper.name !== selectedHelper1)
    );
  }, [selectedHelper1, helpers]);

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
    fetchData();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mergeapidata")
      .then((response) => {
        setData(response.data);
        const names = response.data.map((item) => item.customer_name);
        setCustomerNames(names);

        const names2 = response.data.map((item) => item.customer_name2);
        setCustomerNames2(names2);

        const ids = response.data.map((item) => item.driver_name);
        const uniqueDriverIds = [...new Set(ids)];
        setDriverIds(uniqueDriverIds);

        const helper1Options = response.data.map((item) => item.helper1);
        const uniqueHelper1Options = [...new Set(helper1Options)];
        setHelper1Options(uniqueHelper1Options);

        const helper2Options = response.data.map((item) => item.helper2);
        const uniqueHelper2Options = [...new Set(helper2Options)];
        setHelper2Options(uniqueHelper2Options);

        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);


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
    if (!startDate || !endDate) {
      setFilteredData(data); // If either start or end date is empty, show all data
    } else {
      const filtered = data.filter((customer) => {
        const formattedDate = DateTime.fromISO(customer.created_at, {
          zone: "UTC",
        }); // Assuming the database time is in UTC
        const start = DateTime.fromISO(startDate, { zone: "UTC" });
        const end = DateTime.fromISO(endDate, { zone: "UTC" });

        // Include dates within the selected date range, including the start and end dates
        return (
          start.startOf("day") <= formattedDate.startOf("day") &&
          formattedDate.startOf("day") <= end.startOf("day")
        );
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  // Function to handle the search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data); // If search term is empty, show all data
    } else {
      const filtered = data.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);


  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

    if (selectedOptionValue) {
      try {
        const response = await axios.get(
          `https://shipment-backend.onrender.com/api/customer-details-main?name=${selectedOptionValue}`
        );
        const selectedDispatcherData = response.data;
        console.log("Selected Dispatcher Data:", selectedDispatcherData);

        if (selectedDispatcherData.length > 0) {
          const { phoneno, altphone, email, address } =
            selectedDispatcherData[0];
          console.log("Altphone:", selectedDispatcherData[0].altphone);
          console.log("Phoneno:", selectedDispatcherData[0].phoneno);
          setAltphone(altphone || "");
          setPhone(phoneno || "");
          // setCustomerEmail(email || "");
          setEmail(email || "");
          setCustomerAddress(address || "");
        } else {
          // Handle the case when no data is returned for the selected name
          console.log("No data found for the selected name");
          // You might want to clear the fields or show a message to the user
        }
      } catch (error) {
        console.error("Error fetching selected dispatcher:", error);
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/mergeapidata")
      .then((response) => {
        setData(response.data);
        setFilteredData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((customer) => {
        const formattedDate = DateTime.fromISO(customer.created_at, {
          zone: "Asia/Dubai",
        });
        const start = DateTime.fromISO(startDate, { zone: "Asia/Dubai" });
        const end = DateTime.fromISO(endDate, { zone: "Asia/Dubai" });
        return (
          start.startOf("day") <= formattedDate.startOf("day") &&
          formattedDate.startOf("day") <= end.startOf("day")
        );
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data);
    } else {
      const filtered = data.filter((customer) =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);



  useEffect(() => {
    fetchDrivers();
  }, []);

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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("http://localhost:5000/api/mergeapidata")
      .then((response) => {
        setCustomerData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    setDeleteId(id);
    setModalIsOpenDelete(true);
  };

  const confirmDelete = () => {
    axios
      .delete(
        `https://shipment-backend.onrender.com/api/deleteShipmentsby/${deleteId}`
      )
      .then(() => {
        setCustomerData((prevData) =>
          prevData.filter((item) => item.shipment_id !== deleteId)
        );
        const updatedData = data.filter(
          (item) => item.shipment_id !== deleteId
        );
        setData(updatedData);
        toast.success("Shipment deleted successfully!");
        setModalIsOpenDelete(false);
        setTimeout(fetchData, 2000);
      })
      .catch((error) => {
        console.error("Error deleting data:", error);
        toast.error("Error deleting data.");
        setModalIsOpenDelete(false);
      });
  };

  const exportToExcel = () => {
    const dataToExport = filteredData.map((item) => ({
      "Customer Name": item.customer_name,
      "Pickup Date": item.pick_up_before,
      "Customer Contact": item.customer_contact,
      "Customer Alternate Number": item.customer_alt_num,
      "Customer Email": item.customer_email,
      "Pickup Location": item.pick_up_location,
      "Customer Name 1": item.customer_name2,
      "Customer Contact 1": item.customer_contact2,
      "Drop Location": item.drop_location,
      "Drop Date": item.drop_date,
      "Vehicle Plate No.": item.vehicleplate,
      "Helper 1": item.helper1,
      "Helper 2": item.helper2,
      "Driver Name": item.driver_name,
      "Shipment Id": item.shipment_id,
      "Create Date": item.created_at,
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Data");
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    FileSaver.saveAs(blob, "Shipment_Details.xlsx");
  };
  const saveEditedData = () => {
    const updatedData = {
      customer_name: selectedDispatcher,
      customer_contact: phone,
      customer_alt_num: altphone,
      customer_email: email,
      pick_up_location: customerAddress,
      pick_up_before: pickupDate,
      customer_name2: selectedDispatcher1,
      customer_contact2: phone1,
      drop_location: droplocation,
      drop_date: dropDate,
      helper1: selectedHelper1,
      helper2: selectedHelper2,
      driver_name: selectedDriverId,
      vehicleplate: selectedVehicle,
    };
  
    setIsLoading(true);
  
    // Make a PUT request to update the data
    axios
      .put(
        `https://shipment-backend.onrender.com/api/updatecustomer/${editItem.id}`,
        updatedData
      )
      .then((response) => {
        console.log("Data updated successfully:", response.data);
  
        toast.success("Shipment Details Updated Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
        });
        setModalIsOpenEdit(false);
      })
      .catch((error) => {
        console.error("Error updating data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setModalIsOpenEdit(true);
    setSelectedCustomerName(item.customer_name);
    setSelectedCustomerName2(item.customer_name2);
    // setEmail(email);
    setSelectedShipmentId(item.shipment_id);
    setSelectedVehicle(item.vehicleplate);
    setSelectedDriverId(item.driver_name);
    setSelectedHelper1(item.helper1);
    setSelectedHelper2(item.helper2);
    setPickupDate(item.pick_up_before);
    setDropDate(item.drop_date);
    setSelectedDispatcher(item.customer_name);
    setSelectedDispatcher1(item.customer_name2);
    setCustomerContact2(item.customer_contact2);
    // setCustomerContact(selectedCustomer.phone);
    setDrop_Location(item.drop_location);
    
    setEmail(item.customer_email);
    setPhone(item.customer_contact);
    setAltphone(item.customer_alt_num);
    setPickuplocation(item.pick_up_location);
    setPhone1(item.customer_contact2);
    setdroplocation(item.drop_location);
    console.log("drop location : " +item.drop_location);
    console.log("pickup location : " +item.pick_up_location);
    
    const selectedCustomer = data.find(
      (customer) => customer.customer_name === item.customer_name
    );

    if (selectedCustomer) {
      setCustomerContact(selectedCustomer.phone);
      setCustomerContact2(selectedCustomer.phone1);
      setCustomerAltNum(selectedCustomer.customer_alt_num);
      setPickUpLocation(selectedCustomer.pick_up_location);
      // setAddress(selectedCustomer.address);
      // setCustomerEmail(selectedCustomer.email);
      // setCustomerEmail1(selectedCustomer.email1);
    }
  };

  return (
    <section className="homedive ">
      <Modal
        isOpen={modalIsOpenEdit}
        className="main_modal_body dispatcher-list-form"
      >
        <ModalBody className="modal_body new-icon">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
            onClick={() => setModalIsOpenEdit(false)}
          />
          <h5 className="main_h5">Edit Shipment Details</h5>
        </ModalBody>
        <Form className="form_main ">
          <div className="row">
            <h5 className="pb-4 text-center">Pickup Details</h5>
            <div className="col-6">
              <label>Customer Name:</label>
              <FormGroup>
                <select
                  value={selectedDispatcher} // Autofill the dropdown
                  onChange={handleSelectChange}
                  name="customer_name"
                  id="customer_name"
                >
                  <option value="">Select Customer</option>
                  {dispatchers.map((dispatcher) => (
                    <option key={dispatcher.id} value={dispatcher.name}>
                      {dispatcher.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Customer Contact:</label>
              <FormGroup>
                <input
                  name="phoneno"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  id="phoneno"
                  placeholder="Enter Contact Number"
                  type="number"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <FormGroup>
                <label>Customer Alternate Number:</label>
                <input
                  name="altphone"
                  id="altphone"
                  value={altphone}
                  onChange={(e) => setAltphone(e.target.value)}
                  placeholder="Enter Alternate Number"
                  type="number"
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Customer Email ID:</label>
              <FormGroup>
                <input
                  name="email"
                  value={email}
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  type="email"
                />
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label> Pick up Location</label>

              <FormGroup>
                <input
                  name="pickuplocation"
                  value={customerAddress}
                  // onChange={(e) => setPickuplocation(e.target.value)}
                  onChange={(e) => setPickuplocation(e.target.value)}
                  id="pickuplocation"
                  placeholder="Enter Pickup Location"
                  type="text"
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Pickup Date:</label>

              <FormGroup>
                <input
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                />
              </FormGroup>
            </div>
          </div>
          <h5 className="p-4 text-center">Delivery Details</h5>
          <div className="row">
            <div className="col-6">
              <label>Customer Name:</label>
              <FormGroup>
                <select
                  value={selectedDispatcher1} // Autofill the dropdown
                  onChange={handleSelectChange1}
                  name="customer_name"
                  id="customer_name"
                >
                  <option value="">Select Customer</option>
                  {dispatchers.map((dispatcher) => (
                    <option key={dispatcher.id} value={dispatcher.name}>
                      {dispatcher.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Customer Contact:</label>
              <FormGroup>
                <input
                  name="phoneno"
                  value={phone1}
                  onChange={(e) => setPhone1(e.target.value)}
                  id="phoneno"
                  placeholder="Enter Contact Number"
                  type="number"
                />
              </FormGroup>
            </div>
          </div>
          <div className="row">
            <div className="col-6">
              <label> Drop Location</label>
              <FormGroup>
                <input
                  name="pickuplocation"
                  value={droplocation}
                  onChange={(e) => setdroplocation(e.target.value)}
                  id="pickuplocation"
                  placeholder="Drop Location"
                  type="text"
                />
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Drop Date:</label>

              <FormGroup>
                <input
                  type="text"
                  value={dropDate}
                  onChange={(e) => setDropDate(e.target.value)}
                />
              </FormGroup>
            </div>
          </div>
          <h5 className="p-4 text-center">Driver and Helpers Details</h5>

          <div className="row">
            <div className="col-6">
              <label>Helper 1:</label>
              <FormGroup>
                <select value={selectedHelper1} onChange={handleHelper1Change}>
                  <option value="">Select a helper</option>
                  {filteredHelpers1.map((helper, index) => (
                    <option key={index} value={helper.name}>
                      {helper.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Helper 2:</label>
              <FormGroup>
                <select value={selectedHelper2} onChange={handleHelper2Change}>
                  <option value="">Select a helper</option>
                  {filteredHelpers2.map((helper, index) => (
                    <option key={index} value={helper.name}>
                      {helper.name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>

          <div className="row">
            <div className="col-6">
              <label>Vehicle Number:</label>
              <FormGroup>
                <select value={selectedVehicle} onChange={handleVehicleChange}>
                  <option value="">Select a vehicle</option>
                  {vehicleDetails.map((vehicle, index) => (
                    <option key={index} value={vehicle.vehicalplate}>
                      {vehicle.vehicalplate}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
            <div className="col-6">
              <label>Driver ID:</label>
              <FormGroup>
                <select
                  value={selectedDriverId}
                  onChange={(e) => setSelectedDriverId(e.target.value)}
                >
                  {driverIds.map((full_name, index) => (
                    <option key={index} value={full_name}>
                      {full_name}
                    </option>
                  ))}
                </select>
              </FormGroup>
            </div>
          </div>

          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            // className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
            onClick={saveEditedData}
            disabled={isLoading} // Disable the button while loading
                    className={`submit-btn btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}

          >
                   {isLoading ? <span>Loading...</span> : <span>Update Shipment List</span>}

            
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
        <ModalBody className="delete-popup-icon-holder">
          <div className="delete-popup-icon">
            <h3
              class="card-header-01"
              style={{ color: "grey", textAlign: "center" }}
            >
              Do you really want to delete?
            </h3>
            <AiOutlineClose
              className="main_AiOutlineClose close-icon-delete"
              onClick={() => setModalIsOpenDelete(false)}
              color="black"
            />
          </div>
        </ModalBody>
        <Form className="">
          <div
            className="d-flex justify-content-center mt-5"
            style={{ marginBottom: "50px" }}
          >
            <Button outline onClick={confirmDelete}>
              Yes
            </Button>
            &nbsp;
            <Button outline onClick={() => setModalIsOpenDelete(false)}>
              Cancel
            </Button>
          </div>
        </Form>
      </Modal>

      <div className="rightdiv px-3 py-2">
        <div className="container-fluid table-header-title">
          <div className="row">
            <div className="w-50 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser">
              <h2>Shipment Record</h2>
            </div>
            <div className="w-50 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div className="input-group input-group-lg">
                <span
                  style={{ backgroundColor: "#fff" }}
                  className="input-group-text"
                  id="basic-addon1"
                >
                  <i className="bi bi-search"></i>
                </span>
                <input
                  style={{ fontSize: "15px" }}
                  className="form-control me-2 serch-filed"
                  type="search"
                  aria-label="Search"
                  placeholder="Search by Customer Name"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row pt-0">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
              <Navbar />
            </div>
            <div class="col p-0 shipment-view-pending-cencal">
              <div className="driver-view-list">
                <div className="">
                  <h2>Shipment List</h2>
                </div>

                <div className="datepicker-date-comm">
                  <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />

                  <input
                    type="date"
                    id="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>

                <div className="w-30 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                  <div className="input-group input-group-lg">
                    <span
                      style={{ backgroundColor: "#fff" }}
                      className="input-group-text"
                      id="basic-addon1"
                    >
                      <i className="bi bi-search"></i>
                    </span>
                    <input
                      style={{ fontSize: "15px" }}
                      className="form-control me-2 serch-filed"
                      aria-label="Search"
                      type="text"
                      placeholder="Search by Name"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="d-flex">
                  <div className="export-btn">
                    <button
                      className="create-dispatcher p-3 mt-0 mx-3"
                      onClick={exportToExcel}
                    >
                      Export to Excel
                    </button>
                  </div>
                  <div className="Back-btn-01">
                    <a href="/">Back</a>
                  </div>
                </div>
              </div>
              <table
                className="table align-middle bg-white rounded m-0"
                id="table-to-xls"
              >
                <thead className="tableheading">
                  <tr>
                    <th scope="col">Pickup Details</th>
                    <th scope="col">Delivery Details</th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Helper 1</th>
                    <th scope="col">Helper 2</th>
                    <th scope="col">Vehicle Plate No.</th>
                    <th scope="col">Created Date</th>
                    <th scope="col">Task Status</th>
                    <th scope="col" className="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="tbody">
                  {filteredData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.pick_up_before}
                        <br></br>
                        {item.customer_name},<br></br> {item.customer_contact},{" "}
                        <br></br>
                        {item.pick_up_location}
                      </td>
                      <td>
                        {item.drop_date},<br></br> {item.customer_name2}
                        <br></br> {item.customer_contact2}, <br></br>{" "}
                        {item.drop_location}
                      </td>
                      <td>{item.driver_name}</td>
                      <td>{item.helper1}</td>
                      <td>{item.helper2}</td>
                      <td>{item.vehicleplate}</td>
                      <td>{item.created_at}</td>
                      <td>
                        {item.pick_up_status === 1 ? (
                          <span
                            className="px-3 py-2 rounded-pill"
                            style={{
                              color: "white",
                              background: "orange",
                              fontSize: "12px",
                            }}
                          >
                            ASSIGNED
                          </span>
                        ) : item.pick_up_status === 2 ? (
                          <span
                            className="px-2 py-2 rounded-pill"
                            style={{
                              color: "white",
                              background: "blue",
                              fontSize: "12px",
                            }}
                          >
                            INPROGRESS
                          </span>
                        ) : item.pick_up_status === 3 ? (
                          <span
                            className="px-2 py-2 rounded-pill"
                            style={{
                              color: "white",
                              background: "green",
                              fontSize: "12px",
                            }}
                          >
                            SUCCESSFUL
                          </span>
                        ) : (
                          ""
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn1"
                          onClick={() => openEditModal(item)}
                        >
                          <i className="bi bi-pen"></i>
                        </button>
                        <button
                          className="btn bt"
                          onClick={() => handleDelete(item.shipment_id)}
                        >
                          <i className="bi bi-trash delete"></i>
                        </button>
                        <Link to={`/view/${item.shipment_id}`}>
                          <button className="btn bt">
                            <i className="bi bi-eye"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <nav>
                <ul className="pagination">
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={prePage}>
                      Previous
                    </a>
                  </li>
                  {numbers.map((n, i) => {
                    <li
                      className={`page-item ${
                        currentPage === n ? "active" : ""
                      }`}
                      key={i}
                    >
                      <a
                        href="#"
                        className="page-link"
                        onClick={() => changeCPage(n)}
                      >
                        {n}
                      </a>
                    </li>;
                  })}
                  <li className="page-item">
                    <a href="#" className="page-link" onClick={nextPage}>
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(id) {
    setCurrentPage(id);
  }

  function nextPage() {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  }
}

export default ShipmentDetails;
