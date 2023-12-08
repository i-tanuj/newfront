import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiFillEye } from "react-icons/ai";
import { AiFillEyeInvisible } from "react-icons/ai";
import { AiOutlineMail,AiOutlineUser,AiOutlineKey } from "react-icons/ai";
import {BsArrowRight} from "react-icons/bs"
import {
  Button,
  Col,
  FormGroup,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../css/login.css";

function Login() {
    const [isRevealPwd, setIsRevealPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    //var item={username,password};

    const result = await axios
      .post("https://shipment-backend.onrender.com/login/", {
        username: username,
        password: password,
      }).then(
        (response) => {
          console.log("token",response.data.token);
  
          if (response.data.login === true) {
            window.location.href = "/";
            console.log(response.data);
            localStorage.setItem("Username", `${username}`);
            localStorage.setItem("jwt", response.data.token);
            localStorage.setItem("userID", response.data.user_id);
            console.log(username);
            document.getElementById("login_id").innerHTML =
              "Successfully login.";
          } else {
           
            document.getElementById("validate_id").innerHTML =
              "Invalid Credentials.";
          
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
  
  return (
    <section>
<div className="" data-aos="zoom-in">
  <div className="">
    <div className="row align-items-center bg-color-dark">
      <div className="col-sm-12 col-md-6 col-lg-7 col-xl-7 col-xxl-7  ">
        <img
          src="/Assets/dashboard/login.png"
          alt="Rectangle 220"
          className="img-fluid"
        />
        <div className="login-side-text">
          <h2><span className="image-sub-title">Welcome to </span>
P&G TRUCKERS</h2>
        </div>
      </div>
      <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5">
       
        <div className=" px-lg-5">
           

          <form className="mt-4">
          
           
          <div className="loginDiv mb-4">
              <Col md={10} className="login-form-box">
              <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5  ">
        <div className="login-logo">
        <img
          src="/Assets/dashboard/login-logo.png"
          alt="Rectangle 220"
        />
        </div>
      </div>
                

                <FormGroup action="" className="form">
            
                  <div className="form-input">
                    <AiOutlineUser className="icon2" />
                    
                    <input
                      id="username"
                      name="email"
                      className="input-field"
                      placeholder="Login ID"
                      type="email"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                </FormGroup>
                <FormGroup action="" className="form">
            
                  <div className="form-input">
                    <span className="icon1">
                      {isRevealPwd ? (
                        <>
                          {" "}
                          <AiFillEye
                            onClick={() =>
                              setIsRevealPwd((prevState) => !prevState)
                            }
                          />{" "}
                        </>
                      ) : (
                        <>
                          <AiFillEyeInvisible
                            onClick={() =>
                              setIsRevealPwd((prevState) => !prevState)
                            }
                            />{" "}
                        </>
                      )}
                    </span>
                    <AiOutlineKey className="icon2 password-icon" />
                    <input
                      id="password"
                      name="pwd"
                      className="input-field"
                      placeholder="Password"
                      type={isRevealPwd ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </FormGroup>

                <p className="validate" id="validate_id"></p>
                <p className="login" id="login_id"></p>
                <div className="d-flex mt-4">
                  <Button className="login-btn" onClick={handleLogin}>
                    Login <BsArrowRight/>
                  </Button>
                
                </div>
                <div className="">
                  <Link to="/verifyOTP" className="forgot-password">
                    Forget Password?
                  </Link>
                </div>
                <br />
              </Col>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</section>
  )
}

export default Login;