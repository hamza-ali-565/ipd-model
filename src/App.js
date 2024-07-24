import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import axios from "axios";
import "./App.css";
import Login from "./Screens/Login/Login";
import MainPage from "./Screens/MainPage/MainPage";
import { setLoginToggle, setResponse, setShift } from "./Store/action";
import IPDMaster from "./Screens/IPD/Masters/IPDMaster";
import WardCharges from "./Screens/IPD/Masters/Ward Charges/WardCharges";
import ServiceCharges from "./Screens/IPD/Masters/Service Charges/ServiceCharges";
import Port from "./Screens/PortScreen/Port";
import ConsultantCharges from "./Screens/IPD/Masters/Consultant Charges/ConsultantCharges";
import DSCharges from "./Screens/IPD/Masters/DS Charges/DSCharges";
import IPDPatientMaster from "./Screens/IPD/Patient/IPDPatientMaster/IPDPatientMaster";
import PatientRegistration from "./Screens/IPD/Patient/PatientRegistration/PatientRegistration";
import Reservation from "./Screens/IPD/Patient/Reservation/Reservation";
import IPDShiftMaster from "./Screens/IPD/Shift/IPDShiftMaster";
import CreateShift from "./Screens/IPD/Shift/CreateShift";
import Addmission from "./Screens/IPD/Patient/Addmission/Addmission";
import IPDTransactionMaster from "./Screens/IPD/Transaction/IPDTransactionMaster/IPDTransactionMaster";
import ConsultantVisit from "./Screens/IPD/Transaction/ConsultantVisit/ConsultantVisit";
import IPDWardCharges from "./Screens/IPD/Transaction/WardCharges/IPDWardCharges";
import ProcedureCharges from "./Screens/IPD/Transaction/ProcedureCharges/ProcedureCharges";
import BedAllocation from "./Screens/IPD/Patient/BedAllocation/BedAllocation";
import ServiceReversal from "./Screens/IPD/Transaction/ServiceReversal.jsx/ServiceReversal";
import WardTransfer from "./Screens/IPD/Transaction/WardTransfer/WardTransfer";
import IPDPaymentMaster from "./Screens/IPD/Payments/IPDPaymentMaster/IPDPaymentMaster";
import PaymentReciept from "./Screens/IPD/Payments/PaymentReciept/PaymentReciept";
import RunningBill from "./Screens/IPD/Transaction/RunningBill/RunningBill";
import DischargeMaster from "./Screens/IPD/Discharge/DischargeMaster/DischargeMaster";
import DischargeSummary from "./Screens/IPD/Discharge/DischargeSummary/DischargeSummary";
import Loader from "./Components/Modal/Loader";
import PatientDischarge from "./Screens/IPD/Discharge/PatientDischarge/PatientDischarge";
import ReAdmission from "./Screens/IPD/Discharge/ReAdmission/ReAdmission";
import FinalBill from "./Screens/IPD/Discharge/FinalBill/FinalBill";
import PaymentRefund from "./Screens/IPD/Payments/CreaditVoucher/PaymentRefund";
import RadiologyMaster from "./Screens/Radiology/Master/RadiologyCharges/RadiologyMaster";
import RadiologyServiceCharges from "./Screens/Radiology/Master/RadiologyCharges/RadiologyServiceCharges";
import TransactionMaster from "./Screens/Radiology/Transaction/TransactionMaster";
import RadiologyBooking from "./Screens/Radiology/Transaction/RadiologyBooking/RadiologyBooking";
import RadiologyResult from "./Screens/Radiology/Transaction/RadiologyResult/RadiologyResult";
import TestCancellation from "./Screens/Radiology/Transaction/TestCancellation/TestCancellation";
import RadioIPDCancellation from "./Screens/Radiology/Transaction/TestCancellation/RadioIPDCancellation";
import PartyMaster from "./Screens/Setups/Party/PartyMaster";
import ParentParty from "./Screens/Setups/Party/ParentParty";
import PartyName from "./Screens/Setups/Party/PartyName";
import ServiceMaster from "./Screens/Setups/Services/ServiceMaster";
import ParentService from "./Screens/Setups/Services/ParentService";
import ServiceName from "./Screens/Setups/Services/ServiceName";
import WardMaster from "./Screens/Setups/Ward/WardMaster";
import WardName from "./Screens/Setups/Ward/WardName";
import BedName from "./Screens/Setups/Ward/BedName";
import Consultant from "./Screens/Setups/Consultant/Consultant";

function App() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    CheckLog();
    getShift();
  }, []);

  const LoginCheck = useSelector((state) => state.toggle);
  const url = useSelector((state) => state.url);

  const CheckLog = async () => {
    setOpen(true);
    try {
      const response = await axios.get(`${url}/product`, {
        withCredentials: true,
      });
      console.log("response of product api", response);
      dispatch(setLoginToggle(true));
      dispatch(setResponse(response.data.data));
      setOpen(false);
    } catch (error) {
      console.log("error of product api", error);
      dispatch(setLoginToggle(false));
      setOpen(false);
    }
  };
  const getShift = async () => {
    try {
      const response = await axios.get(`${url}/shift`, {
        withCredentials: true,
      });
      dispatch(setShift(response.data.data));
      console.log("response of getData", response);
    } catch (error) {
      console.log("Error of getShift", error);
    }
  };
  return (
    <Router>
      <div>
        {LoginCheck === true ? (
          <Routes>
            {/* master */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="ipdmaster/*" element={<IPDMaster />}>
                <Route path="wardcharges" element={<WardCharges />} />
                <Route path="servicecharges" element={<ServiceCharges />} />
                <Route path="dscharges" element={<DSCharges />} />
                <Route
                  path="consultantcharges"
                  element={<ConsultantCharges />}
                />
              </Route>
            </Route>
            {/* patient */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="ipdPatient/*" element={<IPDPatientMaster />}>
                <Route
                  path="patientRegistration"
                  element={<PatientRegistration />}
                />
                <Route path="reservation" element={<Reservation />} />
                <Route path="admission" element={<Addmission />} />
                <Route path="bedallocation" element={<BedAllocation />} />
              </Route>
            </Route>
            {/* shift */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="ipdShift/*" element={<IPDShiftMaster />}>
                <Route path="createShift" element={<CreateShift />} />
              </Route>
            </Route>
            {/* transaction */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="transaction/*" element={<IPDTransactionMaster />}>
                <Route path="servicereversal" element={<ServiceReversal />} />
                <Route path="consultantvisit" element={<ConsultantVisit />} />
                <Route path="ipdwardcharges" element={<IPDWardCharges />} />
                <Route path="procedurecharges" element={<ProcedureCharges />} />
                <Route path="wardtransfer" element={<WardTransfer />} />
                <Route path="runningbill" element={<RunningBill />} />
              </Route>
            </Route>
            {/* Payments */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="payments/*" element={<IPDPaymentMaster />}>
                <Route path="paymentReciept" element={<PaymentReciept />} />
                <Route path="paymentrefund" element={<PaymentRefund />} />
              </Route>
            </Route>
            {/* Discharge */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="discharge/*" element={<DischargeMaster />}>
                <Route path="dischargesummary" element={<DischargeSummary />} />
                <Route path="patientdischarge" element={<PatientDischarge />} />
                <Route path="readmission" element={<ReAdmission />} />
                <Route path="finalbill" element={<FinalBill />} />
              </Route>
            </Route>
            {/* Radiology Service Charges */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="radiology/*" element={<RadiologyMaster />}>
                <Route
                  path="radiologycharges"
                  element={<RadiologyServiceCharges />}
                />
              </Route>
            </Route>
            {/* Radiology test booking */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route
                path="radiology/transaction/*"
                element={<TransactionMaster />}
              >
                <Route path="radiologybooking" element={<RadiologyBooking />} />
                <Route path="radiologyresult" element={<RadiologyResult />} />
                <Route
                  path="radiologycancellation"
                  element={<TestCancellation />}
                />
                <Route
                  path="radiologyipdcancellation"
                  element={<RadioIPDCancellation />}
                />
              </Route>
            </Route>
            {/* setup */}
            <Route path="mainpage/*" element={<MainPage />}>
              <Route index element={<Port />} />
              <Route path="setups/party/*" element={<PartyMaster />}>
                <Route path="parentparty" element={<ParentParty />} />
                <Route path="partyname" element={<PartyName />} />
              </Route>
              <Route path="setups/services/*" element={<ServiceMaster />}>
                <Route path="parentservicename" element={<ParentService />} />
                <Route path="servicename" element={<ServiceName />} />
              </Route>
              <Route path="setups/ward/*" element={<WardMaster />}>
                <Route path="wardname" element={<WardName />} />
                <Route path="bedname" element={<BedName />} />
              </Route>
              <Route
                path="setups/consultant/*"
                element={<Consultant />}
              ></Route>
            </Route>
            <Route path="*" element={<Navigate to="/mainpage" replace />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        )}
      </div>
      <Loader onClick={open} title={"Login Check"} />
    </Router>
  );
}

export default App;
