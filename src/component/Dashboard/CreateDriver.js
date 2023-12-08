import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../../css/shippment.css";
import axios from "axios";
import { Modal, ModalBody, Button } from "reactstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-datepicker/dist/react-datepicker.css";
function CreateDriver({ onDataCreated }) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [full_name, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [error, setError] = useState(false);
  const [succbtn, setSuccbtn] = useState();
  const [data, setData] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!full_name || !email || !phone || !password) {
      setResponseMessage("Please fill in all fields.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://shipment-backend.onrender.com/api/adddriverapi",
        {
          full_name,
          email,
          phone,
          password,
          address,
        }
      );

      setResponseMessage(response.data.message);
      toast.success("Driver Created Successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
      });
      setModalIsOpen(false);
      setFullname("");
      onDataCreated();
      // Clear the form
      setPhone("");
      setEmail("");
      setPassword("");
      setAddress("");
    } catch (error) {
      console.error("Error:", error);
      setResponseMessage("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body modal-form-body">
        <div class="card">
          <div class="">
            <div class="admin-dashboard">
              <div class="title-header">
                <h5 class="card-header-01 text-center">Create Driver</h5>
                <ModalBody className="close-icon">
                  <AiOutlineClose
                    className="main_AiOutlineClose"
                    onClick={() => setModalIsOpen(false)}
                    color="rgba(27, 38, 68, 1)"
                  />
                </ModalBody>
              </div>
              <div class="row card-holder">
                <form class="form-control-holder" onSubmit={handleSubmit}>
                  <div className="mb-4">
                    <label for="exampleInputEmail1" className="form-label">
                      Full name<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="full_name"
                      onChange={(e) => setFullname(e.target.value)}
                      id="first_name"
                      placeholder="Enter your name"
                      type="text"
                      required
                    />
                    {error && full_name.length <= 0 ? (
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
                  <div className="mb-4">
                    <label className="form-label">
                      Phone Number<span className="stra-icon">*</span>
                    </label>
                    <input
                      name="phone"
                      onChange={(e) => setPhone(e.target.value)}
                      id="phone"
                      placeholder="Enter your number"
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
                      Address<span className="stra-icon"></span>
                    </label>
                    <input
                      name="address"
                      onChange={(e) => setAddress(e.target.value)}
                      id="address"
                      placeholder="Enter your address"
                      type="text"
                      //  required
                    />
                    {error && address.length <= 0 ? (
                      <span className="valid-form" style={{ color: "red" }}>
                        Please Enter your address*
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
                        Please Enter Password*
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                  <Button disabled={isLoading} variant="contained" className='main_botton  submit-btn' type='submit'>
            {isLoading ? 'Loading...' : 'Create Driver'}
           
                    </Button>
                  <div className="succbtn mb-4">
                    {succbtn ? <p>{succbtn}</p> : null}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
      <div class="d-flex create-dispatcher align-items-center">
        <div class="plus-icon">
          <button type="submit" onClick={() => setModalIsOpen(true)}>
            <img src="/Assets/dash/plus.png" />
            Driver
          </button>
        </div>
      </div>
    </div>
  );
}

export default CreateDriver;
