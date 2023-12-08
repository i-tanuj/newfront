import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PaymentRecords from './component/Dashboard/PaymentRecords';
import SettlementRecords from './component/Dashboard/SettlementRecords';
import SettlementHistory from './component/Dashboard/SettlementHistory';
import FormComponent from './component/Dashboard/FormComponent';
import DetailView from './component/Dashboard/DetailView';
import ShipmentDetails from './component/Dashboard/ShipmentDetails';
import CancelShip from './component/Dashboard/CancelShip';
import VehicleSelector from './component/Dashboard/VehicleSelector';
const Login = React.lazy(() => import("./component/Login"));
const VerifyOTP = React.lazy(() => import("./component/VerifyOTP"))
const ForgetPassword = React.lazy(() => import("./component/ForgetPassword"))
const EditProfile = React.lazy(() => import("./component/EditProfile"))
const HomePage = React.lazy(() => import("./component/HomePage"));
const DispatchList = React.lazy(() => import("./component/Dashboard/DispatchList"));
const DriverList = React.lazy(() => import("./component/Dashboard/DriverList"));
const HelperList = React.lazy(() => import("./component/CreateShipment/HelperList"))
const VehicalList = React.lazy(() => import("./component/CreateShipment/VehicalList"))
const CustomerList = React.lazy(() => import("./component/CreateShipment/CustomerList"))
const paymentRecords = React.lazy(() => import("./component/Dashboard/PaymentRecords"))
const settlementRecord = React.lazy(() => import("./component/Dashboard/SettlementRecords"))
const settlementHistory = React.lazy(() => import("./component/Dashboard/SettlementHistory"))
const ViewShipment = React.lazy(() => import("./component/Dashboard/ViewShipment"))
const DelaydShip = React.lazy(() => import("./component/Dashboard/DelaydShip"))
const PendingShip = React.lazy(() => import("./component/Dashboard/PendingShip"))
const formcomponent = React.lazy(() => import("./component/Dashboard/FormComponent"))
const vehicleselector = React.lazy(() => import("./component/Dashboard/VehicleSelector"))
function Router() {
    const tokendata = localStorage.getItem("jwt");
    return (
        <>
            <BrowserRouter>
                <React.Suspense fallback={<div className='d-flex justify-content-center align-items-center'>
                </div>}>
                    <Routes>
                        <Route exact path="/" element={tokendata ? <HomePage /> : <Login />} />
                        <Route exact path="/" element={tokendata ? <HomePage /> : <Login />} />
                        <Route exact path="/verifyOTP" element={<VerifyOTP />} />
                        <Route exact path="/ForgetPassword" element={<ForgetPassword />} />
                        <Route exact path="/EditProfile" element={<EditProfile />} />
                        <Route exact path="/dispatchList" element={<DispatchList />} />
                        <Route exact path="/driverList" element={<DriverList />} />
                        <Route exact path="/helperList" element={<HelperList />} />
                        <Route exact path="/vehicalList" element={<VehicalList />} />
                        <Route exact path="/customerList" element={<CustomerList />} />
                        <Route exact path="/paymentRecords" element={<PaymentRecords />} />
                        <Route exact path="/settlementRecord" element={<SettlementRecords />} />
                        <Route exact path="/settlementhistory" element={<SettlementHistory />} />
                        <Route exact path="/view/:customerId" element={<ViewShipment />} />
                        <Route exact path="/delayd" element={<DelaydShip />} />
                        <Route exact path="/pending" element={<PendingShip />} />
                        <Route exact path="/shipment-list" element={<ShipmentDetails />} />
                        <Route exact path="/cancel-shipment" element={<CancelShip />} />
                        <Route exact path="/vehicleselector" element={<VehicleSelector />} />
                        <Route exact path="/formcomponent" element={<FormComponent />} />
                        <Route path="/details/:id" component={DetailView} />
                    </Routes>
                </React.Suspense>
            </BrowserRouter>
        </>
    );
}

export default Router;
