import React,{useState,useEffect} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import axios from 'axios';
import '../../css/dispatchlist.css'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  Nav,
  NavItem,
  Form,
  FormGroup,
  Input,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";


function Createvehical({ onDataCreated }) {
    const [rowCount, setRowCount] = useState(0);
    const [inquiries, setInquiries] = useState( );
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [contact, getContact] = useState([]);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [vehicalplate, setVehicalplate] = useState("");
    const [phone, setPhone] = useState("");
    const [batchList,getBatchList] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');

    const [isLoading, setIsLoading] = useState(false);

    const [error, setError] = useState(false);
    const [modalPrivacy, setModalPrivacy] = useState(false);
    const [succbtn, setSuccbtn] = useState();
    const [defaultcontact, DefaultgetContact] = useState([]);

  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !vehicalplate) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://shipment-backend.onrender.com/api/addvehical',
        {
          name,
          vehicalplate,
          DateAndTime: currentDate,
        }
      );

      setResponseMessage(response.data.message);
      toast.success('Vehicle Created Successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
          });
    setModalIsOpen(false);
          setName('');
          onDataCreated();
      // Clear the form
      // setName('');
      setVehicalplate('');
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };



  return (
    <section class="homedive ">

            
<Modal isOpen={modalIsOpen} className='main_modal_body pop-up-hpr'>
                <div className='title-header'>
                    <AiOutlineClose className='main_AiOutlineClose close-icon-hpr' onClick={()=>setModalIsOpen(false)}/>
                    <h5 className='card-header-01 text-center'>Create Vehicle</h5>
                </div>
                <Form className='form-control-holder-hpr'  onSubmit={handleSubmit}>
                  <div className='row'>
                    <div className='col'>
                      <FormGroup>
                      <label class="form-label">Vehicle Name<span class="stra-icon">*</span></label>
                          <Input type="text" name="name" id="name" placeholder="Enter Vehicle Name" required onBlur={(e) => setName(e.target.value)}/>
                      </FormGroup>
                    </div>
                    <div className='col'>
                      <FormGroup>
                      <label class="form-label">Vehicle plate Number<span class="stra-icon">*</span></label>
                          <Input type="text" name="vehicalplate" id="vehicalplate" required placeholder="Enter Plate Number" onBlur={(e) => setVehicalplate(e.target.value)}/>
                      </FormGroup>
                    </div>
                  </div>
                    <p id="validate-batch" style={{ color: 'red' }}></p>
                    <Button disabled={isLoading} variant="contained" className='main_botton  submit-btn' type='submit'>
            {isLoading ? 'Loading...' : 'Create Vehicle'}
           
                    </Button>

                    

                </Form>
            </Modal>
            <div className="d-flex create-dispatcher align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Vehicle
          </button>
        </div>
      </div>
      <ToastContainer/>

   </section>
  )
}

export default Createvehical;
