import React, { useState } from "react";
import axios from "axios";
import { Button, Col, Row, Input, FormGroup } from "reactstrap";
import { Link } from "react-router-dom";
import "../css/login.css";

function VerifyOTP() {
  const [flagValue, setFlagValue] = useState("");
  const [username, setUsername] = useState("");
  const [otp, setOTP] = useState("");

  async function handleSendOTP() {
    if (username != "") {
      const sendOTP = await axios
        .post("https://shipment-backend.onrender.com/api/otpsendusrname", {
          username: `${username}`,
        })
        .then(
          (response) => {
            document.getElementById("success-OTPid").innerHTML =
              "OTP Send Successfully.";
            console.log("Send OTP Data :", response.data);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      document.getElementById("validate-OTPid").innerHTML =
        "*Please fill required field!";
      console.log("Error :", "Please fill required field");
    }
  }
  async function handleVerifyOTP() {
    if (username != "" && otp != "") {
      const verifyOTP = await axios
        .post("https://shipment-backend.onrender.com/api/verify-otp", {
          username: `${username}`,
          otp: `${otp}`,
        })
        .then(
          (response) => {
            document.getElementById("success-verifyOTPid").innerHTML =
              "OTP Verified Successfully.";
            console.log("Verfiy OTP Data :", response.data);
            console.log("Flag Value :", response.data.flag);
            setFlagValue(response.data.flag);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      document.getElementById("validate-verifyOTPid").innerHTML =
        "*Please fill required field!";
      console.log("Error :", "Please fill required field");
    }
  }
  const toggleResetPassword = () => {
    if (username != "" && otp != "") {
      document.getElementById("success").innerHTML = "Valid Credentials";
    } else {
      document.getElementById("validate").innerHTML = "Invalid Credentials";
    }
  };

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
                <h2>
                  <span className="image-sub-title">Welcome to </span>
                  P&G TRUCKERS
                </h2>
              </div>
            </div>
            <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5">
              <div className=" px-lg-5">
                <form className="mt-4">
                  <div className="loginDiv mb-4">
                    <Col md={10} className="login-form-box">
                      <div className="col-sm-12 col-md-6 col-lg-5 col-xl-5 col-xxl-5  ">
                        <div className="login-logo">
                          <h3 className="form-heading">Verify OTP</h3>
                        </div>
                      </div>

                      <Row>
                        <Col md={6}>
                          <FormGroup className="">
                            <Input
                              id="username"
                              name="email"
                              placeholder="Enter Your Email"
                              type="email"
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              required
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Button
                              className="verify-otp"
                              onClick={handleSendOTP}
                            >
                              Send OTP
                            </Button>
                          </FormGroup>
                        </Col>
                        <p className="validate" id="validate-OTPid"></p>
                        <p className="login" id="success-OTPid"></p>
                      </Row>
                      <Row>
                        <Col md={6}>
                          <FormGroup className="">
                            <Input
                              id="otp"
                              name="otp"
                              placeholder="Enter Your OTP"
                              type="text"
                              value={otp}
                              maxLength={6}
                              onChange={(e) => setOTP(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Button
                              className="verify-otp"
                              onClick={handleVerifyOTP}
                            >
                              Verify Your OTP
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>

                      <p className="validate" id="validate-verifyOTPid"></p>
                      <p className="login" id="success-verifyOTPid"></p>

                      {username !== "" && otp !== "" && flagValue === 1 ? (
                        <>
                          <Col md={6}>
                            <FormGroup>
                              <Link to="/ForgetPassword">
                                <Button className="resetPassword" outline>
                                  Reset Password
                                </Button>
                              </Link>
                            </FormGroup>
                          </Col>
                        </>
                      ) : (
                        <Col md={6}>
                          <FormGroup>
                            <Link to="/ForgetPassword">
                              <Button
                                className="resetPassword"
                                outline
                                onClick={toggleResetPassword}
                              >
                                Reset Password
                              </Button>
                            </Link>
                          </FormGroup>
                        </Col>
                      )}
                      <p className="validate" id="validate"></p>
                      <p className="login" id="success"></p>

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
  );
}

export default VerifyOTP;
