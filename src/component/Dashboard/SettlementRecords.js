import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

async function ContactData(getContact){

  await axios.get('https://shipment-backend.onrender.com/api/sattlementrecord',
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



function SettlementRecords() {

    const [contact, getContact] = useState([]);
    const [data, setData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [full_name, setName] = useState('');
    const [driver_id, setDriver_id] = useState('');
    const [id, setId] = useState('');
    const [amount, setAmount] = useState('');
    const [batchList,getBatchList] = useState([]);
    const [modalIsOpenDelete, setModalIsOpenDelete] = useState(false);
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

    useEffect(() => {
      ContactData(getContact,DefaultgetContact)   
   }, [])
    console.warn(contact)

    function handleInput(e){
        setName(e.target.value)
  }

  
  const handleUpdateClick = (driver_id) => {
    const updateddatetime = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
    });
    console.log("dr"+driver_id);
    axios.post(
      'https://shipment-backend.onrender.com/api/updateAmount',
      {
        inst_hash: localStorage.getItem('inst_hash'),
        id: id,
        driver_id: driver_id,
        full_name: full_name,
        settlement_amount: 0, // Set the wallet amount to 0
        status: 2,
        updateddatetime: updateddatetime,
      },
      {
        headers: { authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    )
    .then((response) => {
      // Update the 'contact' state to reflect the changes
      const updatedContacts = contact.map(item => {
        if (item.driver_id === driver_id) {
          return {
            ...item,
            settlement_amount: 0, // Update the wallet amount to 0
            status: 2,
          };
        }
        return item;
      });
      toast.success('Amount Settled Successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      getContact(updatedContacts); // Update the state
    })
    .catch((error) => {
      console.error('Error updating data:', error);
    });
  };


  
  function exportToExcel() {
    const data = contact.map((item) => [
      item.id,
      item.full_name,
      item.settlement_amount,
    ]);
  
    const ws = XLSX.utils.aoa_to_sheet([
      ['ID', 'Full Name', 'Settlement Amount'],
      ...data,
    ]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Settlement Records');
  
    const blob = new Blob([s2ab(XLSX.write(wb, { bookType: 'xlsx', type: 'binary' }))], {
      type: 'application/octet-stream',
    });
  
    FileSaver.saveAs(blob, 'SettlementRecords.xlsx');
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
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://shipment-backend.onrender.com/api/sattlementrecord"
      );
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  
  return (
    <section class="homedive ">

    <div class="rightdiv px-3 py-5">
        <div class="container-fluid">
            <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 col-xxl-6 nameuser">
                <h2>Settlement Record List</h2>
    
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
                        <h2>Settlement Records</h2>
                      </div>



                      <div  className='datepicker-date-comm'>
                <span className="calender-icon">
                        <DatePicker
                          selected={startDate}
                          onChange={handleStartDateChange}
                          selectsStart
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="Start Date"
                        />
                        <img className="calender-icon" src="assets/dashboard/calendar.png" alt="" />
                      </span>
                      <span className="calender-icon">
                        <DatePicker
                          selected={endDate}
                          onChange={handleEndDateChange}
                          selectsEnd
                          startDate={startDate}
                          endDate={endDate}
                          placeholderText="End Date"
                        />
                        <img class="calender-icon" src="assets/dashboard/calendar.png" alt="" />
                      </span>
									</div>


                      <div class="w-30 col-sm-12 col-md-12 col-lg-4 col-xl-4 col-xxl-4">
                      <div class="input-group input-group-lg">
                          <span style={{backgroundColor:"#fff"}} class="input-group-text" id="basic-addon1"><i class="bi bi-search" ></i></span>
                          <input  style={{fontSize:"15px"}} className="form-control me-2 serch-filed" type="search" placeholder="Search Here" aria-label="Search" onChange={(e)=>setSearch(e.target.value)} />
                        </div>
                    </div>
                      <div className='d-flex'>
                        {/* <div className='add-new-form-btn'>
                            <CreateHelper/>
                        </div> */}
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
                            <th scope="col">Wallet Amount</th>
                          <th scope="col" class="borderre1">Settled </th>
                          </tr>
                        </thead>
                      <tbody class="tbody">
  
        {
          filteredData.filter((item)=>{
            return search.toLowerCase() === '' ? item : item.full_name.toLowerCase().includes(search)
          }).map((item,i)=>
            <tr key={i}>
                 <th scope="row"><span className="dispatcher-id">{i+1}</span></th>
            <td>{item.full_name}</td>
            <td>{item.settlement_amount}</td>
            <td>
            <button className='Settle-amount  '  onClick={() => handleUpdateClick(item.driver_id)} id={item.driver_id}>Settled Amount</button>
            </td>
          </tr>
          )
        }
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
    <ToastContainer/>

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

export default SettlementRecords;



