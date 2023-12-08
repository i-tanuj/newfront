import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody } from "reactstrap";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
function CreateDispatch({ onDataCreated }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [responseMessage, setResponseMessage] = useState('');
  const [error, setError] = useState(false);
  const [succbtn, setSuccbtn] = useState();

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!name || !email || !phone || !password) {
      setResponseMessage('Please fill in all fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        'https://shipment-backend.onrender.com/api/addispatcher',
        {
          name,
      email,
      phone,
      password
        }
      );

      setResponseMessage(response.data.message);
      toast.success('Dispatcher Created Successfully!', {
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
      setPhone('');
      setEmail('');
      setPassword('');
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
                <h5 className="card-header-01 text-center">
                  Create Dispatcher
                </h5>
                <ModalBody className="close-icon">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div className="row card-holder">
                <form className="form-control-holder" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="mb-4">
                      <label for="exampleInputEmail1" className="form-label">
                        Full name<span className="stra-icon">*</span>
                      </label>
                      <input
                        name="full_name"
                        onChange={(e) => setName(e.target.value)}
                        id="first_name"
                        placeholder="Enter your name"
                        type="text"
                        required
                      />
                      {error && name.length <= 0 ? (
                        <span className="valid-form" style={{ color: "red" }}>
                          Please Enter full name*
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="mb-4">
                      <label className="form-label">
                        Email<span className="stra-icon">*</span>
                      </label>
                      <input
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                        id="email"
                        placeholder="Enter your email"
                        type="email"
                        required
                      />
                      {error && email.length <= 0 ? (
                        <span className="valid-form" style={{ color: "red" }}>
                          Please Enter the valid Email*
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Phone Number<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                      placeholder="Enter your phone"
                      type="number"
                      required
                    />
                    {error && phone.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter the 10 Digit number*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <div className="mb-4">
                    <label className="form-label">
                      Password<span className="stra-icon">*</span>{" "}
                    </label>
                    <input
                      name="password"
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      placeholder="Enter your password"
                      type="text"
                      required
                    />
                    {error && password.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Create your password*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <button
                    type="submit"
                    value="Send Message"
                    disabled={isLoading} // Disable the button while loading
                    className={`submit-btn btn ${isLoading ? 'btn-disabled' : 'btn-primary'}`}

                  >
                    {/* Create Dispatcher */}
                    {isLoading ? <span>Loading...</span> : <span>Create Dispatcher</span>}

                  </button>
                  <div className="succbtn mb-4">
                    {succbtn ? <p>{succbtn}</p> : null}
                  </div>
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
            Dispatcher
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDispatch;
