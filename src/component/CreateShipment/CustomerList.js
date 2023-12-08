import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import "../../css/dispatchlist.css";
import Navbar from "../Navbar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import "react-datepicker/dist/react-datepicker.css";
import * as FileSaver from "file-saver";
import { DateTime } from 'luxon'; 
import { Form, FormGroup, Input, Button, Modal, ModalBody } from "reactstrap";
import CreateCustomer from "./CreateCustomer";

function CustomerList() {
  const [searchTerm, setSearchTerm] = useState(''); // Initialize search term as empty
  const [data, setData] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [contact, getContact] = useState([]);
  const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
  const [modalIsOpenEdit, setModalIsOpenEdit] = useState(false);
  const [defaultcontact, DefaultgetContact] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const [filteredData, setFilteredData] = useState([]);
  const [showAllData, setShowAllData] = useState(true);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [searchText, setSearchText] = useState("");

  const handleDataCreated = () => {
    // Refresh data after a new driver is created
    fetchData();
  };

  const [editData, setEditData] = useState({
    id: null,
    name: "",
    email: "",
    phoneno: "",
    altphone: "",
    address: "",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/creatcustomer"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  async function deleteData(id) {
    setSelectedItemId(id); // Store the selected item's ID
    setModalIsOpenDelete(true); // Open the modal
  }

  async function confirmDelete(id) {
    try {
      await axios.delete(
        `https://shipment-backend.onrender.com/api/customerdelete/${selectedItemId}`
      );
      // Remove the deleted item from the local state
      const updatedData = data.filter((item) => item.id !== selectedItemId);
      setData(updatedData);
      setModalIsOpenDelete(false); // Close the modal
      toast.success("Dispatcher Deleted Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  }

  function editDataItem(item) {
    setEditData(item);
    setModalIsOpenEdit(true);
  }
  async function updateData() {
    try {
      await axios.put(
        `https://shipment-backend.onrender.com/api/customerupdate/${editData.id}`,
        {
          name: editData.name,
          email: editData.email,
          phoneno: editData.phoneno,
          altphone: editData.altphone,
          address: editData.address,
        }
      );
      toast.success("Customer Updated Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setModalIsOpenEdit(false);
      fetchData(); // Refresh data after update
    } catch (error) {
      console.error("Error updating data:", error);
    }
  }


  useEffect(() => {
    if (!startDate || !endDate) {
      setFilteredData(data); // If either start or end date is empty, show all data
    } else {
      const filtered = data.filter(customer => {
        const formattedDate = DateTime.fromISO(customer.DateAndTime, { zone: 'UTC' }); // Assuming the database time is in UTC
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
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);



  const exportToExcel = () => {
    const dataToExport = filteredData.map((item) => ({
      'Customer Name': item.name,
      'Customer ID': item.id,
      'Email Id': item.email,
      'Phone Number': item.phoneno,
      'Address': item.address,
      'Created At': item.DateAndTime,
    }));
  
    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    FileSaver.saveAs(blob, 'Customer_List.xlsx');
  };

  return (
    <section class="homedive ">
      <Modal
        isOpen={modalIsOpenEdit}
        className="main_modal_body dispatcher-list-form"
      >
        <ModalBody className="modal_body helper-close">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
            onClick={() => setModalIsOpenEdit(false)}
          />
          <h5 className="main_h5">Edit Customer List</h5>
        </ModalBody>
        <Form className="form_main ">
          <FormGroup>
            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Edit Name"
              value={editData.name}
          onChange={(e) => setEditData({ ...editData, name: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              id="email"
              placeholder="Edit Email"
              value={editData.email}
          onChange={(e) => setEditData({ ...editData, email: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="phoneno"
              id="phoneno"
              placeholder="Edit Phone Number "
              value={editData.phoneno}
          onChange={(e) => setEditData({ ...editData, phoneno: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="number"
              name="altphone"
              id="altphone"
              placeholder="Edit Alternate number "
              value={editData.altphone}
          onChange={(e) => setEditData({ ...editData, altphone: e.target.value })}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="text"
              name="address"
              id="address"
              placeholder="Edit Address"
              value={editData.address}
          onChange={(e) => setEditData({ ...editData, address: e.target.value })}
            />
          </FormGroup>
          <p id="edit-validate-batch" style={{ color: "red" }}></p>
          <Button
            variant="contained"
            className="main_botton"
            style={{ backgroundColor: "#6A3187" }}
            onClick={updateData}
          >
            Edit Customer List
          </Button>
        </Form>
      </Modal>

      <Modal isOpen={modalIsOpenDelete} className="modal_body-delete">
        <ModalBody className="dispatcher-list-form">
          <AiOutlineClose
            className="main_AiOutlineClose close-icon"
            onClick={() => setModalIsOpenDelete(false)}
            color="black"
          />
        </ModalBody>
        <Form className="">
          <h3 style={{ color: "grey", textAlign: "center" }}>
            Do you really want to delete?
          </h3>
          <div
            className="d-flex justify-content-center"
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

      <div class="rightdiv px-3 py-5">
        <div class="container-fluid">
          <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
              <div class="input-group input-group-lg">
                <span
                  style={{ backgroundColor: "#fff" }}
                  class="input-group-text"
                  id="basic-addon1"
                >
                  <i class="bi bi-search"></i>
                </span>
                <input
                  style={{ fontSize: "15px" }}
                  className="form-control me-2 serch-filed"
                  type="search"
                  placeholder="Search Here"
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="row mt-3">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 ">
              <Navbar />
            </div>
            <div class="col view-table-new">
              <div className="driver-view-list">
                <div className="">
                  <h2>All Customer List</h2>
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
                <div class="w-30 col-sm-12 col-md-12 col-lg-3 col-xl-3 col-xxl-3">
                  <div class="input-group input-group-lg">
                    <span
                      style={{ backgroundColor: "#fff" }}
                      class="input-group-text"
                      id="basic-addon1"
                    >
                      <i class="bi bi-search"></i>
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
                  <div className="add-new-form-btn">
                    <CreateCustomer onDataCreated={handleDataCreated} />
                  </div>
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
                class="table align-middle bg-white rounded m-0"
                id="table-to-xls"
              >
                <thead class="tableheading">
                  <tr>
                    <th scope="col" class="borderre">
                      No.
                    </th>
                    <th scope="col">Customer ID</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Phone number</th>
                    <th scope="col">Email</th>
                    <th scope="col">Address</th>
                    <th scope="col">Registration Date</th>
                    <th scope="col" class="borderre1">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody class="tbody">

                {showAllData ? (
          filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    }).map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phoneno}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.address}</td>
              <td>{DateTime.fromISO(item.DateAndTime, { zone: 'IST' }).toLocaleString(DateTime.DATETIME_MED)}</td>

                        <td>
                          <button
                            className="btn btn1"
                            onClick={() => editDataItem(item)}
                          >
                            <i class="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn bt"
                            onClick={() => {
                              deleteData(item.id);
                            }}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
                        </td>
                      </tr>

          ))
        ) : filteredData.length === 0 ? (
          <td className="">No data found for the selected date range.</td>
        ) : (
          filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.name.toLowerCase().includes(search);
                    }).map((item, i) => (
                      <tr key={i}>
                        <th scope="row">
                          <span className="dispatcher-id">{i + 1}</span>
                        </th>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.phoneno}</td>
                        <td className="dis-email text-left">{item.email}</td>
                        <td>{item.address}</td>
              <td>{DateTime.fromISO(item.DateAndTime, { zone: 'IST' }).toLocaleString(DateTime.DATETIME_MED)}</td>

                        <td>
                          <button
                            className="btn btn1"
                            onClick={() => editDataItem(item)}
                          >
                            <i class="bi bi-pen"></i>
                          </button>
                          <button
                            className="btn bt"
                            onClick={() => {
                              deleteData(item.id);
                            }}
                          >
                            <i class="bi bi-trash delete"></i>
                          </button>
                        </td>
                      </tr>
          ))
        )}


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
      <ToastContainer />
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

export default CustomerList;
