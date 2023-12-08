import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { DateTime } from 'luxon'; 

import {
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";


async function ContactData(getContact){

  await axios.get('https://shipment-backend.onrender.com/api/getpayment',
  // { inst_hash: localStorage.getItem('inst_hash_manual') },
  {
      headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
  }
  )
  .then((res)=>{
      console.log(res.data);
      getContact(res.data);
  })
}
//************************************************************** */

async function updateBatch(id,name,email,phone,address,setModalIsOpenEdit,getBatchList){
  if (name != "" && email != "" && phone != "" && address != "") {
      await axios.post('https://shipment-backend.onrender.com/api/updatehelper',
      {inst_hash: localStorage.getItem('inst_hash'),
      id : id,
      name: name,
      email: email,
      phone: phone,
      address: address
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  ContactData(getBatchList)
  setModalIsOpenEdit(false)
} else {
  document.getElementById("edit-validate-batch").innerHTML =
    "*Please fill required field!";
  console.log("Error :", "Please fill required field");
}    
}

//************************************************************** */
async function deleteContact(ids,getContact,DefaultgetContact ){
  const results = await axios.post('https://shipment-backend.onrender.com/api/delhelper',
      {
          id:ids
      },
      {headers: { authorization:`Bearer ${localStorage.getItem('token')}` }}
  )
  console.log(results);
      if(results.status == 200){
          ContactData(getContact,DefaultgetContact);
      }
  }


function PaymentRecords() {
  const [searchTerm, setSearchTerm] = useState(''); // Initialize search term as empty
    const [contact, getContact] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [batchList,getBatchList] = useState([]);
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
  const [filteredData, setFilteredData] = useState([]);
  const [showAllData, setShowAllData] = useState(true);

    useEffect(() => {
      ContactData(getContact,DefaultgetContact)   
   }, [])

    function handleInput(e){
        setName(e.target.value)
  }

  function exportToExcel() {
    const data = contact.map((item) => [
      item.full_name,
      item.shipment_id,
      item.amount,
      'Success',
      item.DateAndTime,
    ]);
  
    const ws = XLSX.utils.aoa_to_sheet([
      ['Driver Name', 'Shipment ID', 'Amount', 'Amount Status', 'Payment Details'],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payment Records');
  
    const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
      type: 'application/octet-stream',
    });
  
    FileSaver.saveAs(blob, 'PaymentRecords.xlsx');
  }
  
  // Convert data to array buffer
  function s2ab(s) {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < s.length; i++) {
      view[i] = s.charCodeAt(i) & 0xff;
    }
    return buf;
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
        customer.full_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  }, [searchTerm, data]);



  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/getpayment"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section class="homedive ">

<Modal isOpen={modalIsOpenEdit} className='main_modal_body dispatcher-list-form'>
                <ModalBody className='modal_body'>
                <AiOutlineClose className='main_AiOutlineClose close-icon' onClick={()=>setModalIsOpenEdit(false)}/>
                   <h5 className='main_h5'>Payment Records List</h5>
                </ModalBody>
                <Form className='form_main '>
                    <FormGroup>
                        <Input type="text" name="name" id="name" placeholder="Edit Name"   onBlur={(e) => handleInput(e)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="email" name="email" id="email" placeholder="Edit Email" onBlur={(e) => setEmail(e.target.value)}/>
                    </FormGroup>
                    <FormGroup>
                        <Input type="number" name="phone" id="phone" placeholder="Edit Phone Number " onBlur={(e) => {setPhone(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="address" id="address" placeholder="Edit Address " onBlur={(e) => {setAddress(e.target.value); console.log(e.target.value);}} />
                    </FormGroup>
                    <p id="edit-validate-batch" style={{ color: 'red' }}></p>
                    <Button variant="contained" className='main_botton' style={{backgroundColor: '#6A3187'}} onClick={() => updateBatch(ids,name,email,phone,address,setModalIsOpenEdit,getBatchList)}>Edit Driver List</Button>
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
              <Button
                outline
                onClick={() => {
                    deleteContact(ids, getContact, DefaultgetContact)
                  setModalIsOpenDelete(false);
                }}
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
     
    
  
  
    <div class="rightdiv px-3 py-5">
        <div class="container-fluid">
            <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser">
                <h2>Payment Records List</h2>
                </div>
                <div class="col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                    <div class="input-group input-group-lg">
                    <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                 <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                      </div>
                </div>
             
            </div>
          
            <div className="row mt-3">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
              <Navbar/>

                    </div>
                <div class="col view-table-new">
                <div className='driver-view-list'>
                
                      <div className=''>
                        <h2>Payment Records</h2>
                      </div>


                      <div  className='datepicker-date-comm'>
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
                        <div className='add-new-form-btn'>
                        </div>
                        <div className="export-btn">
            <button className="create-dispatcher p-3 mt-0 mx-3" onClick={exportToExcel}>Export to Excel</button>
          </div>
                        <div className='Back-btn-01'><a href='/'>Back</a></div>
                      </div>
                    </div>
                    
                    <table class="table align-middle bg-white rounded m-0" id="table-to-xls">
                        <thead class="tableheading">
                          <tr>
                            <th scope="col" class="borderre">No.</th>
                            <th scope="col">Driver Name</th>
                            <th scope="col">Shipment ID</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Amount Status</th>
                            <th scope="col">Payment Details</th>
                            
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
                      {showAllData ? (
          filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.full_name.toLowerCase().includes(search);
                    }).map((item, i) => (
                      <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.full_name}</td>
            <td>{item.shipment_id}</td>
            
            <td>{item.amount}</td>
           
            <td>
              <div className='Successful-py-01'>{"Success"}</div></td>
            {/* <td>{item.DateAndTime}</td> */}
            <td>{DateTime.fromISO(item.DateAndTime, { zone: 'IST' }).toLocaleString(DateTime.DATETIME_MED)}</td>

            
            <td>
            </td>
            
          </tr>

          ))
        ) : filteredData.length === 0 ? (
          <td className="">No data found for the selected date range.</td>
        ) : (
          filteredData.filter((item) => {
                      return search.toLowerCase() === ""
                        ? item
                        : item.full_name.toLowerCase().includes(search);
                    }).map((item, i) => (
                      <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.full_name}</td>
            <td>{item.shipment_id}</td>
            
            <td>{item.amount}</td>
           
            <td>
              <div className='Successful-py-01'>{"Success"}</div></td>
            {/* <td>{item.DateAndTime}</td> */}
            <td>{DateTime.fromISO(item.DateAndTime, { zone: 'IST' }).toLocaleString(DateTime.DATETIME_MED)}</td>

            
            <td>
            </td>
            
          </tr>
          ))
        )}


        {/* {
          filteredData.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.full_name.toLowerCase().includes(search)
          }).map((item,i)=>
            <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.full_name}</td>
            <td>{item.shipment_id}</td>
            
            <td>{item.amount}</td>
           
            <td>
              <div className='Successful-py-01'>{"Success"}</div></td>
            <td>{item.DateAndTime}</td>
            
            <td>
            </td>
            
          </tr>
          )
        } */}
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

export default PaymentRecords;


