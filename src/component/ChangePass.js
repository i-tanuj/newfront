import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import "../css/navbar.css";
import axios from 'axios';
import { Nav, NavItem, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

function ChangePass() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'oldPassword') {
        setOldPassword(value);
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } 
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shipment-backend.onrender.com/api/change-password', {
        username: "manmohan.rajput@dwellfox.com",
        oldPassword: `${oldPassword}`,
        newPassword: `${newPassword}`,
        
      });
      setMessage(<span style={{fontSize:"15px",fontWeight:"500",color:"green"}}>Password Change successfully</span>);
        // window.location.href = "/";

      console.log(response);
    } catch (error) {
      console.error(error);
      setMessage(<span style={{fontSize:"15px",fontWeight:"500",color:"red"}}>Password incorrect</span>);
    }
  };

  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body">
        
        
          <div class="">
	<div class="card-body">
  <div class="title-header">
		<h3 className="card-header-01 text-center">Change password</h3>
    <ModalBody className="close-icon">
          <AiOutlineClose
            className="main_AiOutlineClose"
            onClick={() => setModalIsOpen(false)}
            color="rgba(27, 38, 68, 1)"
          />
        </ModalBody>
        </div>
        <div class="row card-holder">
        <div className="form-control-holder">
			<form className='mb-2'  onSubmit={handleSubmit}>
				<div class="form-group">
					<label for="exampleInputEmail1"  className='fontSize'>Current password</label>
                <input  type="password" name="oldPassword" value={oldPassword} onChange={handleChange} className='form-control form-control-sm'/>         
				</div>
				<div class="form-group mt-2">
					<label for="exampleInputEmail1" className='fontSize'>New password</label>
                   <input type="password" name="newPassword" value={newPassword} onChange={handleChange} className='form-control form-control-sm'/> 
				</div>
				<div class="form-group mt-2">
					<label for="exampleInputEmail1" className='fontSize'>Confirm password</label>
                   <input type="password" name="newPassword" value={newPassword} onChange={handleChange} className='form-control form-control-sm'/> 
				</div>
				<button type="submit" class="btn submit-btn">Change Password</button>
			</form>
      </div>
           {message && <p>{message}</p>}
		</div>
	</div>
</div>

      </Modal>
      <div class="notification">
        <Nav>
          <div className="container d-flex justify-content-between">
            <Link to="">
              <NavItem>
                <img
                  src="/Assets/Navbar/rdit-pass.png"
                  onClick={() => setModalIsOpen(true)}
                />
              </NavItem>
            </Link>
          </div>
        </Nav>
      </div>
    </div>

  );
}

export default ChangePass;
