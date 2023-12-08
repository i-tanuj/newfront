import React from "react";
import Navbar from "./Navbar";
import Shippment from "./Dashboard/Shippment";
import AdminDash from "./Dashboard/AdminDash";
import ShipmentList from "./Dashboard/ShipmentList";
import "react-datepicker/dist/react-datepicker.css";
import { Col, Row } from "reactstrap";
import ShippmentRecord from "./Dashboard/ShippmentRecord";

function HomePage() {
  return (
    <div>
      <section>
        <Navbar />
      </section>
      <div className="container-fluid px-4 dashboard-container">
        <Row className="m-0">
          <Col md={2}>
            <ShipmentList />
          </Col>
          <Col md={10} className="admin-dashboard-container">
            <Row>
              <Col>
                <AdminDash />
              </Col>
              <Shippment />
            </Row>
            <ShippmentRecord />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default HomePage;
