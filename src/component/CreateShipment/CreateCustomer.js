import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody, Button } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateCustomer({ onDataCreated }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneno, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [altphone, setAltphone] = useState("");

  
  const [error, setError] = useState(false);
  const [modalPrivacy, setModalPrivacy] = useState(false);
  const [succbtn, setSuccbtn] = useState();

  const currentDate = new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour12: true,
  });

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !phoneno || !address) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://shipment-backend.onrender.com/api/addcustomer',
        {
          name,
              email,
              phoneno,
              altphone,
              address,
              DateAndTime: currentDate,
        }
      );

      setResponseMessage(response.data.message);
      toast.success('Customer Created Successfully!', {
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
      setName('');
      setAddress('');
      setAltphone('');
      setPhone('');
      setEmail('');
      // setVehicalplate('');
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };





  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
        <div className="card">
          <div className="">
            <div className="admin-dashboard">
              <div className="title-header">
                <h5 className="card-header-01 text-center">Create Customer</h5>
                <ModalBody className="close-icon-01">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div className="row card-holder">
                <form className="form-control-holder"  onSubmit={handleSubmit}>
                    <div className="row">
                  <div className="mb-4 w-50">
                    <label for="exampleInputEmail1" className="form-label">
                      Customer Name<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="full_name"   
                      onChange={(e)=> setName(e.target.value)}          
                      id="first_name"
                      placeholder="Enter your name"
                      type="text"
                      required
                    />
               {error && name.length<=0?<span className="valid-form" style={{color:'red'}}>Please Enter full name*</span>:""}
                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                     Customer Email<span className="stra-icon"></span>
                    </label>
                    <input
                      name="email"   
                      onChange={(e)=> setEmail(e.target.value)}          
                      id="email"
                      placeholder="Enter your email"
                      type="email"
                      required
                    />
                  {/* {error && email.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the valid Email*</span>:""} */}

                  </div>
                  </div>
                  <div className="row">
                  <div className="mb-4 w-50">
                    <label className="form-label">
                    Customer Contact Number<span className="stra-icon">*</span>
                    </label>
                    <input
                       name="phoneno"   
                       onChange={(e)=> setPhone(e.target.value)}          
                       id="phoneno"
                       placeholder="Enter your phone"
                       type="number"
                       required
                    />
                     {error && phoneno.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""}

                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                    Customer Alternate Number<span className="stra-icon"></span>{" "}
                    </label>
                    <input
                       name="phone"   
                       onChange={(e)=> setAltphone(e.target.value)}          
                       id="phone"
                       placeholder="Enter your Alternate Number"
                       type="number"
                       required
                    />
                  {/* {error && altphone.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter the 10 Digit number*</span>:""} */}

                  </div>
                  <div className="mb-4 w-50">
                    <label className="form-label">
                    Customer Address<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                       name="address"   
                       onChange={(e)=> setAddress(e.target.value)}          
                       id="address"
                       placeholder="Enter Address"
                       type="name"
                       required
                    />
                  {error && altphone.length <= 0 ?<span className="valid-form" style={{color:'red'}}>Please Enter Address*</span>:""}

                  </div>
                  </div>
                  

                  <Button disabled={isLoading} variant="contained" className='main_botton  submit-btn' type='submit'>
            {isLoading ? 'Loading...' : 'Create Customer'}
</Button>

                  <div className="succbtn mb-4" >{succbtn ? <p>{succbtn}</p> : null}</div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>

                {/* Created Toast Container  */}
                <ToastContainer/>
      <div className="d-flex create-dispatcher align-items-center">
        <div className="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Create Customer
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateCustomer;
