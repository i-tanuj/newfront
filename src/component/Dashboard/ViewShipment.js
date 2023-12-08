import React,{useState,useEffect} from 'react'
import axios from 'axios';
import '../../css/dispatchlist.css'
import Navbar from '../Navbar'
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';


function ViewShipment() {
    const [contact, getContact] = useState([]);
  const [currentPage,setCurrentPage] = useState(1);
  const recordsPerPage = 10;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex= lastIndex - recordsPerPage;
  const records = contact.slice(firstIndex, lastIndex);
  const npage = Math.ceil(contact.length / recordsPerPage)
  const [data, setData] = useState({});
//   const [loading, setLoading] = useState(true);

  const { customerId } = useParams();
  const [customerDetails, setCustomerDetails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data for a single customer from your API endpoint
    axios.get(`https://shipment-backend.onrender.com/api/mergeapidata/${customerId}`)
      .then((response) => {
        setCustomerDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching customer data:', error);
        setLoading(false);
      });
  }, [customerId]);

  if (loading) {
    return <p>Loading...</p>;
  }


  


  return (
    <section class="homedive ">
          {customerDetails.map((customer) => (

  <div class="rightdiv px-3 py-5">
        <div class="container">
            <div className="row mt-3">
              <div className='col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 '>
              <Navbar/>

                    </div>
                    
                <div class="col view-table-shipment">
                    <div className='Back-btn py-4'><a href='/'>Back</a></div>
                  <div className='view-table-shipment-header'>
                        <div className=''>
                        <h2>Type : Shipment</h2>
                        </div>
                        <div className=''>
                        <h2>Shipment Detailed</h2>
                        </div>
                        <div className=''>
                        <h2>Order ID : {data.shipment_id}</h2>
                        </div>
                  </div>
                  
                  <div className='shipment-header-row'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Customers Name <span>*</span></p>
                                <p className='shiping-input'>{customer.customer_name}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Pick up Location <span>*</span></p>
                                <p className='shiping-input'>{customer.pick_up_location}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Pick up POD Details <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    {/* <img src="/Assets/dashboard/shipment-view.png" /> */}
                                    <img width={50} src={customer.pod_doc} alt="Pickup POD Details" />

                                </p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Customer’s Contact Number<span>*</span></p>
                                <p className='shiping-input'>{customer.customer_contact}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Pick up date & time<span>*</span></p>
                                <p className='shiping-input'>{customer.pick_up_before}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Dispatcher ID <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    {/* <img src="/Assets/dashboard/shipment-view.png" /> */}
                                    <img width={50} src={customer.dispatcher_id} alt="Dispatcher ID" />
                                </p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Customer’s Email Number <span>*</span></p>
                                <p className='shiping-input'>{customer.customer_email}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Description<span>*</span></p>
                                <p className='shiping-input'>{customer.description}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Sign DC Dispatcher <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img width={50} src={customer.sign_doc_dispatcher} alt="Signature Dispatcher" />

                                </p>
                            </div>
                        </div>
                        
                  </div>
                  <h3 className='Delivery-Documents'>1 Delivery Documents</h3>
                  
                  <div className='shipment-header-row'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Customers Name<span>*</span></p>
                                <p className='shiping-input'>{customer.customer_name2}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop Location<span>*</span></p>
                                <p className='shiping-input'>{customer.drop_location}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>POD Stamp <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    {/* <img  width={50} src="/Assets/dashboard/shipment-view.png" /> */}
                                    <img  width={50} src={customer.pod_doc} alt="POD Stamp" />
                                </p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Customer’s Contact Number<span>*</span></p>
                                <p className='shiping-input'>{customer.customer_contact2}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop date <span>*</span></p>
                                <p className='shiping-input'>12 Jul</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers ID <span>*</span></p>
                                <p className='shiping-img-pre'>
                                <img  width={50} src={customer.pod_doc2} // Change 'png' to the actual image format
            alt="Dispatcher Signature"
          />
                                </p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Customer’s Email Number* <span>*</span></p>
                                <p className='shiping-input'>{customer.customer_email}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Description <span>*</span></p>
                                <p className='shiping-input'>{customer.drop_description}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers Signature<span>*</span></p>
                                <p className='shiping-img-pre'>
                                    {/* <img src="/Assets/dashboard/shipment-view.png" /> */}
                                    <img  width={50} src={customer.sign_doc_dispatcher2} alt="Receiver Signature" />
                                
                                </p>
                            </div>
                        </div>
                        
                  </div>
                  <h3 className='Delivery-Documents'>2 Delivery Documents</h3>
                  <div className='shipment-header-row'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Customers Name<span>*</span></p>
                                <p className='shiping-input'>{customer.customer_name}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop Location<span>*</span></p>
                                <p className='shiping-input'>{customer.drop_location}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>POD Stamp <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Customer’s Contact Number<span>*</span></p>
                                <p className='shiping-input'>{customer.customer_contact}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Drop date <span>*</span></p>
                                <p className='shiping-input'>{customer.drop_date}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers ID <span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Customer’s Email Number* <span>*</span></p>
                                <p className='shiping-input'>{customer.customer_email}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Description <span>*</span></p>
                                <p className='shiping-input'>{customer.drop_description}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Receivers Signature<span>*</span></p>
                                <p className='shiping-img-pre'>
                                    <img src="/Assets/dashboard/shipment-view.png" />
                                </p>
                            </div>
                        </div>
                        
                  </div>
                  <div className='shipment-header-row pb-5'>
                        <div className='column-one'>
                            <div>
                                <p className='shiping-label'>Driver Name<span>*</span></p>
                                <p className='shiping-input'>{customer.driver_id}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Vehicle Plate<span>*</span></p>
                                <p className='shiping-input'>{customer.vehicleplate}</p>
                            </div>
                            
                        </div>
                        <div className='column-two'>
                        <div>
                                <p className='shiping-label'>Helper1 Name<span>*</span></p>
                                <p className='shiping-input'>{customer.helper1}</p>
                            </div>
                            <div>
                                <p className='shiping-label'>Created by<span>*</span></p>
                                <p className='shiping-input'>Admin</p>
                            </div>
                        </div>
                        <div className='column-three'>
                        <div>
                                <p className='shiping-label'>Helper2 Name <span>*</span></p>
                                <p className='shiping-input'>{customer.helper2}</p>
                            </div>
                        </div>
                        
                  </div>
               <nav>
      </nav>
                </div>

            </div>
        </div>
    </div>
    ))}
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

export default ViewShipment;
