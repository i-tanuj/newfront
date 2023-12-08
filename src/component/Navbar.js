import React, { useState, useEffect } from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import "../css/navbar.css";
import ChangePass from "./ChangePass";
import EditProfile from "./EditProfile";
import { Nav, NavItem, Form, Button, Modal, ModalBody } from "reactstrap";
import { Link } from "react-router-dom";

function Navbar() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

  const handleButtonClick = () => {
    // Toggle the state when the button is clicked
    setIsButtonClicked(!isButtonClicked);
  };
  const toggleSidebar = () => {
    handleButtonClick();
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch usernames from the API
    axios
      .get("https://shipment-backend.onrender.com/api/getidentities")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching usernames:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Fetch usernames from the API
    axios
      .get("https://shipment-backend.onrender.com/api/getnotifications")
      .then((response) => {
        setNotification(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching usernames:", error);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Modal isOpen={modalIsOpen} className="modal_body">
        <Form className="">
          <h3
            className="card-header-01 text-center"
            style={{ color: "rgba(27, 38, 68, 1)", textAlign: "center" }}
          >
            Do you really want to logout?
          </h3>
          <ModalBody className="close-icon">
            <AiOutlineClose
              className="main_AiOutlineClose"
              onClick={() => setModalIsOpen(false)}
              color="rgba(27, 38, 68, 1)"
            />
          </ModalBody>
          <div
            className="mt-4 d-flex justify-content-center logout-btn"
            style={{ marginBottom: "50px" }}
          >
            <Button
              onClick={() => {
                setModalIsOpen(false);
                localStorage.removeItem("jwt"); // to delete jwt tokeeen from local storage
                window.location.href = "/";
              }}
            >
              Yes
            </Button>
            &nbsp;
            <Button onClick={() => setModalIsOpen(false)}>No</Button>
          </div>
        </Form>
      </Modal>

      <span className="Notification-img">
        <div className="menusidebar">
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <ul>
              {notification.map((notification) => (
                <li key={notification.id}>
                  {notification.id + "."}
                  {notification.message}
                </li>
              ))}
            </ul>
          </div>

          <div className="content">
            <button onClick={toggleSidebar} className="toggle-button">
              {isSidebarOpen ? "" : ""}
            </button>
          </div>

          {isSidebarOpen && (
            <div className="overlay" onClick={closeSidebar}></div>
          )}
        </div>
      </span>

      <hrader className={isButtonClicked ? "active" : ""}>
        <nav class="navbar navbar-expand-lg px-4 bg-color align-items-center">
          <div class="container-fluid p-0">
            <div class="d-flex justify-content-between w-100 align-items-center	">
              <div class="header-logo">
                <a class="navbar-brand" href="/">
                  <img src="/Assets/Navbar/Logo.png" />
                </a>
                <button
                  class="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarScroll"
                  aria-controls="navbarScroll"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span class="navbar-toggler-icon"></span>
                </button>
              </div>

              <div class="" id="navbarScroll">
                <div class="d-flex menu-container">
                  <div class="avtar">
                    <EditProfile />
                    {users.map((user) => (
                      <a key={user.id}>{user.username}</a>
                    ))}
                  </div>

                  <div class="notification">
                 
                    <Nav>
                      <div className="container d-flex justify-content-between">
                        <Link to="/">
                          <NavItem>
                            <span
                              class="d-inline-block"
                              tabindex="0"
                              data-bs-toggle="tooltip"
                              data-bs-placement="bottom"
                              data-bs-title="Logout"
                            >
                              <img
                                src="/Assets/Navbar/log-out.png"
                                onClick={() => setModalIsOpen(true)}
                              />
                            </span>
                          </NavItem>
                        </Link>
                      </div>
                    </Nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </hrader>
    </div>
  );
}

export default Navbar;
