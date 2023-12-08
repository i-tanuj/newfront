import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { toast, ToastContainer } from "react-toastify";
import { DateTime } from 'luxon'; 

import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";


function CancelShip() {
    const [contact, getContact] = useState([]);
    const [name, setName] = useState('');
  const [deleteId, setDeleteId] = useState(null);

    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [batchList,getBatchList] = useState([]);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
    const [modalIsOpenEdit,setModalIsOpenEdit] = useState(false);
    const [defaultcontact, DefaultgetContact] = useState([]);
    const [ids, setIds] = useState('');
    const [search,setSearch] =useState('');
  const [currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex= lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage)
  const numbers = [...Array(npage + 1).keys()].slice(1)


  const [pickUpLocation, setPickUpLocation] = useState(''); // Pick-up Location
  const [vehicleplate, setVehicleplate] = useState("");
  const [customerData, setCustomerData] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [deleteId, setDeleteId] = useState(null);
  const [selectedHelper1, setSelectedHelper1] = useState("");
  const [selectedHelper, setSelectedHelper] = useState("");
  const [helpers, setHelpers] = useState([]);
  const [selectedDispatcher, setSelectedDispatcher] = useState("");
  const [selectedDispatcher1, setSelectedDispatcher1] = useState("");
  const [selectedDispatcher2, setSelectedDispatcher2] = useState("");
  const [selectedDispatcher3, setSelectedDispatcher3] = useState("");
  const [searchText, setSearchText] = useState(""); // Search text for filtering by customer name
  const [editItem, setEditItem] = useState(null);
  const [selectedCustomerName, setSelectedCustomerName] = useState("");
  const [selectedShipmentId, setSelectedShipmentId] = useState("");
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [selectedDriverId, setSelectedDriverId] = useState("");
  const [customerNames, setCustomerNames] = useState([]);
  const [driverIds, setDriverIds] = useState([]); // To store all driver IDs
  const [selectedHelper2, setSelectedHelper2] = useState("");
  const [helper1Options, setHelper1Options] = useState([]); // Helper 1 options
  const [helper2Options, setHelper2Options] = useState([]);
  const [customerContact, setCustomerContact] = useState(''); // Customer Contact
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerAltNum, setCustomerAltNum] = useState(''); // Customer Alternate Number
  const [customerEmail, setCustomerEmail] = useState(''); // Customer Alternate Number
  const [pickupDate, setPickupDate] = useState(''); // Customer Alternate Number
  const [filteredData, setFilteredData] = useState([]); // Filtered data
  const [searchTerm, setSearchTerm] = useState(''); // Initialize search term as empty




  function handleInput(e) {
    setName(e.target.value);
  }
  const [drivers, setDrivers] = useState([]);
  const [dispatchers, setDispatchers] = useState([]);

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

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    axios.get('https://shipment-backend.onrender.com/api/mergeapidata')
      .then((response) => {
        setData(response.data);
        const names = response.data.map((item) => item.customer_name);
        setCustomerNames(names);

        const ids = response.data.map((item) => item.driver_id);
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
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);

  
  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data); // If either start or end date is empty, show all data
    } else {
      const filtered = data.filter(customer => {
        const formattedDate = DateTime.fromISO(customer.created_at, { zone: 'UTC' }); // Assuming the database time is in UTC
        const start = DateTime.fromISO(startDate, { zone: 'UTC' });
        const end = DateTime.fromISO(endDate, { zone: 'UTC' });
        // Include dates within the selected date range, including the start and end dates
        return start.startOf('day') <= formattedDate.startOf('day') && formattedDate.startOf('day') <= end.startOf('day');
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, data]);

  // Function to handle the search filter
  useEffect(() => {
    if (!searchTerm) {
      setFilteredData(data); // If search term is empty, show all data
    } else {
      const filtered = data.filter(customer =>
        customer.customer_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);

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

  const handleSelectChange = async (event) => {
    const selectedOptionValue = event.target.value;
    setSelectedDispatcher(selectedOptionValue);
    console.log(selectedOptionValue);

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

  const [editData, setEditData] = useState({
    id: null,
    driver_id: "",
    customer_name: "",
    pick_up_location: "",
    helper1: "",
    helper2: "",
    drop_date: "",
    vehicleplate: "",
    pick_up_before: "",
  });

  const [helperData, setHelperData] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

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
  const [helperData1, setHelperData1] = useState({
    id: "",
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
  });

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

  const availableHelpersForSelectedHelper1 = helpers.filter(
    (helper) => !selectedHelper.includes(helper.id)
  );

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get("https://shipment-backend.onrender.com/api/mergeapidata")
      .then((response) => {
        setCustomerData(response.data);
        // console.log(data.customer_contact);
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

  if (loading) {
    return <p>Loading...</p>;
  }

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
      'Customer Name': item.customer_name,
      'Pickup Date': item.pick_up_before,
      'Customer Contact': item.customer_contact,
      'Customer Alternate Number': item.customer_alt_num,
      'Customer Email': item.customer_email,
      'Pickup Location': item.pick_up_location,
      'Customer Name 1': item.customer_name2,
      'Customer Contact 1': item.customer_contact2,
      'Drop Location': item.drop_location,
      'Drop Date': item.drop_date,
     'Vehicle Plate No.': item.vehicleplate,
     'Helper 1': item.helper1,
     'Helper 2': item.helper2,
     'Driver Name': item.driver_name,
     'Shipment Id': item.shipment_id,
     'Status': "Cancel",
     'Create Date': item.created_at,

    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Cancle_Shipment.xlsx');
  };

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

  function editDataItem(customer) {
    setEditData(customer);
    setModalIsOpenEdit(true);
  }
  
  const saveEditedData = () => {
    const updatedData = {
      customer_name: selectedCustomerName,
      customer_contact: customerContact,
      customer_email: customerEmail, // Add this line for customer email
      helper1: selectedHelper1,
      helper2: selectedHelper2,
      driver_id: selectedDriverId,
      customer_alt_num: customerAltNum,
    };

    // Make a PUT request to update the data
    axios.put(`https://shipment-backend.onrender.com/api/updatecustomer/${editItem.id}`, updatedData)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
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
        console.error('Error updating data:', error);
      });
  };
  
  const openEditModal = (item) => {
    setEditItem(item);
    setModalIsOpenEdit(true);
    setSelectedCustomerName(item.customer_name);
    setSelectedShipmentId(item.shipment_id);
    setSelectedVehicle(item.vehicleplate);
    setSelectedDriverId(item.driver_id);
    setSelectedHelper1(item.helper1);
    setSelectedHelper2(item.helper2);
    setPickupDate(item.pick_up_before);

    const selectedCustomer = data.find((customer) => customer.customer_name === item.customer_name);

    if (selectedCustomer) {
      setCustomerContact(selectedCustomer.customer_contact);
      setCustomerAltNum(selectedCustomer.customer_alt_num);
      setPickUpLocation(selectedCustomer.pick_up_location);
      setCustomerEmail(selectedCustomer.customer_email);
    }
  };

  return (
    <section class="homedive ">

<Modal isOpen={modalIsOpenEdit} className='main_modal_body dispatcher-list-form'>
                <ModalBody className='modal_body'>  
                <AiOutlineClose className='main_AiOutlineClose close-icon' onClick={()=>setModalIsOpenEdit(false)}/>
                   <h5 className='main_h5'>Edit Shipment List</h5>
                </ModalBody>
                <Form className='form_main '>
                    <FormGroup>
                        <Input type="text" name="name" id="name" placeholder="Edit Name" onBlur={(e) => handleInput(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="email" id="email" placeholder="Edit Email" onBlur={(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="phone" id="phone" placeholder="Edit Phone Number " onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <p id="edit-validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton' style={{backgroundColor: '#6A3187'}} >Update Shipment List</Button>
                </Form>
            </Modal>
  
            <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
          <ModalBody className="delete-popup-icon-holder">
          <div className="delete-popup-icon">
              <h3 class="card-header-01" style={{ color: "grey", textAlign: "center" }}>
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
              <Button
               outline
                onClick={confirmDelete}
              >
                Yes
              </Button>
              &nbsp;
              <Button outline onClick={() => setModalIsOpenDelete(false)}>
              Cancel
              </Button>
            </div>
          </Form>
        </Modal>
     
    
  
  
    <div class="rightdiv px-3 py-2">
        <div class="container-fluid table-header-title">
            <div class="row">
              <div class="w-50 col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser">
                <h2>Shipment Record</h2>
              </div>
              <div class="w-50 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                  <div class="input-group input-group-lg">
                    <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                    <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                  </div>
              </div>
             
            </div>
          
            <div className="row pt-0">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
              <Navbar/>

                    </div>
                <div class="col p-0 shipment-view-pending-cencal">
                <div className='driver-view-list'>
                
                <div className=''>
                  <h2>Cancel Shipment List</h2>
                </div>



                <div  className='datepicker-date-comm'>
                {/* <span className="calender-icon"> */}
                <input
                    type="date"
                    id="startDate"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                        {/* <img className="calender-icon" src="assets/dashboard/calendar.png" alt="" /> */}
                      {/* </span> */}
                      <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
									</div>


                <div class="w-30 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="input-group input-group-lg">
                      <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                     
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
                <div className='d-flex'>
                <div className="export-btn">
            <button className="create-dispatcher p-3 mt-0 mx-3" onClick={exportToExcel}>Export to Excel</button>
          </div>
                  <div className='Back-btn-01'><a href='/'>Back</a></div>
                </div>
              </div>
                    <table class="table align-middle bg-white rounded m-0" id="table-to-xls">
                        <thead class="tableheading">
                          <tr>

                    <th scope="col">Pickup Details</th>
                    <th scope="col">Delivery Details</th>
                    <th scope="col">Driver Name</th>
                    <th scope="col">Helper 1</th>
                    <th scope="col">Helper 2</th>
                    <th scope="col">Vehicle Plate No.</th>
                    <th scope="col">Status</th>
                    <th scope="col">Created Date</th>
                    <th scope="col" class="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody">
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
                      
                      <td className='ship-cancel'>

                      Cancel
                      </td>
                      
                      <td>{item.created_at}</td>
                      <td>
                        {/* <button
                          className="btn btn1"
                          onClick={() => openEditModal(item)}
                        >
                          <i class="bi bi-pen"></i>
                        </button> */}
                        <button
                          className="btn bt"
                          onClick={() => handleDelete(item.shipment_id)}
                        >
                          <i class="bi bi-trash delete"></i>
                        </button>
                        <Link to={`/view/${item.shipment_id}`}>
                          <button className="btn bt">
                            <i class="bi bi-eye"></i>
                          </button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                    </tbody>
                  </table>
               <nav>
        <ul className='pagination'>
           <li className='page-item'>
            <a href='#' className='page-link' onClick={prePage}>Previous</a>
           </li>
           {
            numbers.map((n,i)=>{
              <li className={`page-item ${currentPage === n ? 'active' : ''}`} key={i}>
              <a href='#' className='page-link' onClick={()=>changeCPage(n)}>{n}</a>
              </li>
            })
           }
             <li className='page-item'>
            <a href='#' className='page-link' onClick={nextPage}>Next</a>
           </li>
        </ul>
      </nav>
                </div>

            </div>
        </div>
    </div>
   </section>
  )

  function prePage (){
    if(currentPage !== 1){
      setCurrentPage(currentPage - 1)
    }
  }
  
  function changeCPage (id){
   setCurrentPage(id)
  }

  function nextPage (){
    if(currentPage !== npage){
      setCurrentPage(currentPage + 1)
    }
  }
}

export default CancelShip;


