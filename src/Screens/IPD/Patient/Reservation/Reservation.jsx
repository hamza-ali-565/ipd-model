import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import FullScreenModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import moment from "moment";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import MRModel from "../../../../Components/Modal/MRModal";
import Loader from "../../../../Components/Modal/Loader";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import AllReservationModal from "../../../../Components/Modal/AllReservationModal";
import ReservationPDF from "../../../../Components/PDFDetails/ReservationPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";

const Reservation = () => {
  const [consultant, setConsultant] = useState(null);
  const [mrInfo, setMrInfo] = useState(null);
  const [reservationInfo, setReservationInfo] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setlocation] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [locationData, setLocationData] = useState([]);
  const [paymentData, setPaymentData] = useState([]);
  const [getDoc, setGetDoc] = useState([]);
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);

  const shifData = useSelector((state) => state.shift);
  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);
  useEffect(() => {
    console.log("Shift Data", shifData[0]);
    setPaymentData([
      { name: "--" },
      { name: "Cash" },
      { name: "Cheque" },
      { name: "Credit Card" },
      { name: "Pay Order" },
      { name: "Online" },
    ]);
    setLocationData([
      { name: "--" },
      { name: "Main Reception" },
      { name: "OPD Reception" },
    ]);
  }, [!toggle]);

  // function
  const refresh = () => {
    setConsultant(null);
    setMrInfo(null);
    setReservationInfo(null);
    setFromDate("");
    setToDate("");
    setAmount("");
    setPaymentType("");
    setlocation("");
    setLocationData([]);
    setPaymentData([]);
    setGetDoc([]);
    setToggle(!toggle);
  };

  const printMRCard = async (data) => {
    const key = uuidv4();
    const myData = data;
    // Create a PDF document as a Blob
    const blob = await pdf(
      <ReservationPDF
        key={key}
        consultantDetails={getDoc}
        userName={userData[0].userId}
        billData={reservationInfo !== null ? reservationInfo : myData}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  // date Handler
  const handleDate = (value, key) => {
    const formattedDate = moment(value).format("DD/MM/YYYY"); // For display/logging
    const isoDate = moment(value).format("YYYY-MM-DD"); // For storing in state

    if (key === "toDate") {
      console.log("toDate:", formattedDate);
      setToDate(isoDate);
    } else if (key === "fromDate") {
      console.log("fromDate:", formattedDate);
      setFromDate(isoDate);
    }
  };
  const check = () => {
    if (mrInfo === null) {
      ErrorAlert({ text: "Please Select Mr Number.", timer: 1500 });
      return;
    }
    if (!fromDate || !toDate) {
      ErrorAlert({ text: "Please Select Both Dates.", timer: 1500 });
      return;
    }
    if (consultant === null) {
      ErrorAlert({ text: "Please Select Consultant.", timer: 1500 });
      return;
    }
    if (amount === "") {
      ErrorAlert({ text: "Please Enter Amount.", timer: 1500 });
      return;
    }
    if (!location || location === "--") {
      ErrorAlert({ text: "Please Select Location.", timer: 1500 });
      return;
    }
    if (!paymentType || paymentType === "--") {
      ErrorAlert({ text: "Please Select Payment Type.", timer: 1500 });
      return;
    }

    handleSubmit();
  };
  // api
  const handleSubmit = async () => {
    setOpen(true);

    try {
      const response = await axios.post(
        `${url}/reservation`,
        {
          mrNo: mrInfo.MrNo,
          fromDate,
          toDate,
          consultantId: consultant?._id,
          shiftNo: shifData[0]?.ShiftNo,
          shiftId: shifData[0]?._id,
          amount,
          createdUser: userData[0]?.userId,
          location,
          paymentType,
        },
        { withCredentials: true }
      );
      console.log("response of Submit Handler", response.data.data);
      SuccessAlert({ text: "RESERVATION CREATED SUCCESSFULLY", timer: 1500 });
      refresh();
      setOpen(false);
      printMRCard(response?.data?.data);
    } catch (error) {
      console.log("Error of Submit Handler", error);
      ErrorAlert({ text: error.response.data.message, timer: 1000 });
      setOpen(false);
    }
  };
  // api
  const getConsultant = async (e) => {
    setOpen(true);
    try {
      setReservationInfo(e);
      const response = await axios.get(
        `${url}/reservationconsultant?consultantId=${e?.consultantId}`,
        { withCredentials: true }
      );
      setOpen(setOpen(false));
      setGetDoc(response?.data?.data);
      console.log("Response of getConsultant", response.data.data);
    } catch (error) {
      console.log("Error of getConsultant", error);
      setOpen(setOpen(false));
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Reservation"} />

        <div className="mt-2">
          <div className="flex justify-center space-x-2">
            <FullScreenModal
              title={"Select MR No."}
              onClick={(e) => {
                setMrInfo(e);
              }}
            />
            <MRModel title={"Create MR No."} onClick={(e) => setMrInfo(e)} />
          </div>
          <div className="flex justify-center mt-2">
            <AllReservationModal
              title={"Select Reservation No."}
              onClick={(e) => getConsultant(e)}
            />
          </div>
          {(mrInfo !== null || reservationInfo !== null) && (
            <div className="flex items-center flex-col space-y-2 mt-2">
              <LabeledInput
                disabled={true}
                placeholder={"Patient Name"}
                label={"Patient Name"}
                value={
                  mrInfo !== null
                    ? `${mrInfo?.patientType} ${mrInfo?.patientName} ${mrInfo?.relativeType} ${mrInfo?.relativeName}`
                    : `${reservationInfo?.patientType} ${reservationInfo?.patientName} ${reservationInfo?.relativeType} ${reservationInfo?.relativeName}`
                }
              />
              <LabeledInput
                disabled={true}
                placeholder={"Gender"}
                label={"Gender"}
                value={
                  mrInfo !== null ? mrInfo?.gender : reservationInfo?.gender
                }
              />
              <LabeledInput
                disabled={true}
                placeholder={"Cell No"}
                label={"Cell No"}
                value={
                  mrInfo !== null ? mrInfo?.cellNo : reservationInfo?.cellNo
                }
              />
              <LabeledInput
                disabled={true}
                placeholder={"Mr No"}
                label={"Mr No"}
                value={mrInfo !== null ? mrInfo?.MrNo : reservationInfo?.mrNo}
              />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Reservation Period"} />
        <div className=" md:grid md:grid-cols-2 md:justify-items-center">
          <LabeledInput
            label={"From Date"}
            type={"date"}
            onChange={(e) => handleDate(e.target.value, "fromDate")}
            value={
              fromDate
                ? fromDate
                : reservationInfo !== null
                ? reservationInfo?.fromDate
                : ""
            }
          />
          <LabeledInput
            label={"To Date"}
            type={"date"}
            onChange={(e) => handleDate(e.target.value, "toDate")}
            value={
              toDate
                ? toDate
                : reservationInfo !== null
                ? reservationInfo?.toDate
                : ""
            }
          />
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Advised By"} />
        <div className="flex justify-center my-2">
          <ConsultantModal
            title={"Select Consultant"}
            onClick={(e) => {
              setConsultant(e);
            }}
          />
        </div>
        {(consultant !== null || reservationInfo !== null) && (
          <div className="flex justify-center">
            <LabeledInput
              placeholder={"Consultant Name"}
              label={"Consultant Name"}
              value={
                consultant?.name
                  ? consultant?.name
                  : getDoc.length > 0
                  ? getDoc[0]?.name
                  : ""
              }
            />
          </div>
        )}
      </div>

      {/* paymnet */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"PAYMENT"} />
        <div className="flex flex-col items-center space-y-2 mt-3">
          <LabeledInput
            label={"AMOUNT"}
            placeholder={2000}
            type={"number"}
            value={
              amount
                ? amount
                : reservationInfo !== null
                ? reservationInfo?.amount
                : ""
            }
            onChange={(e) => setAmount(e.target.value)}
          />
          <SimpleDropDown
            DropDownLabel={"Location"}
            data={locationData}
            onChange={(e) => setlocation(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Payment Type"}
            data={paymentData}
            onChange={(e) => setPaymentType(e)}
          />
        </div>
        <div className="flex justify-center space-x-2 mt-3">
          <ButtonDis title={"SUBMIT"} onClick={check} />
          <ButtonDis title={"Refresh"} onClick={refresh} />
          <ButtonDis
            title={"Print"}
            onClick={printMRCard}
            disabled={reservationInfo !== null ? false : true}
          />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default Reservation;
