import React, { useState } from "react";
import { Col } from "reactstrap";
import "../css/login.css";

function ForgetPassword() {
  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://shipment-backend.onrender.com/api/reset-password1",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, newPassword, confirmPassword }),
        }
      );
      if (response.ok) {
        window.location.href = "/";
        setUsername("");
        setNewPassword("");
        setConfirmPassword("");
        setError("");
        alert("Password changed successfully");
      } else {
        const errorData = await response.json();
        setError(errorData.error);
      }
    } catch (error) {
      console.error("Error changing password:", error);
      setError("Error changing password");
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
                <div className="loginDiv mb-4">
                  <Col md={10} className="login-form-box">
                    <div className="col-sm-12 col-md-6 col-lg-12 col-xl-12 col-xxl-12 mb-4  ">
                      <div className="">
                        <h3 className="form-heading">Reset Password</h3>
                      </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                      <div className="mb-3 position-relative">
                        <i class="bi bi-person reset-icon"></i>
                        <input
                          className="input-field"
                          type="email"
                          value={username}
                          onChange={(e) => setUsername(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                      <div className="mb-3 position-relative">
                        <i class="bi bi-lock reset-icon"></i>
                        <input
                          className="input-field"
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter your New Password"
                          required
                        />
                      </div>
                      <div className="mb-3 position-relative">
                        <i class="bi bi-lock reset-icon"></i>
                        <input
                          className="input-field"
                          type="password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Enter your Confirm password"
                          required
                        />
                      </div>
                      {error && <div className="error">{error}</div>}
                      <button className="login-btn text-white" type="submit">
                        Reset Password
                      </button>
                    </form>
                  </Col>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
