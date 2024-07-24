import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import MRModel from "../../../../Components/Modal/MRModal";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import PartyModal from "../../../../Components/Modal/PartyModal";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import RadiologyServiceModal from "../../../../Components/Modal/RadiologyServiceModal";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import {
  AskingAlert,
  ErrorAlert,
  SuccessAlert,
} from "../../../../Components/Alert/Alert";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../../Components/Modal/Loader";
import { UserData } from "../../../../Components/Constants/constant";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import RadiologyBookingPDF from "../../../../Components/PDFDetails/RadiologyBookingPDF";
import RadioTestModal from "../../../../Components/Modal/RadioTestModal";

const RadiologyBooking = () => {
  const [paymentType, setPaymentType] = useState("");
  const [location, setLocation] = useState("");
  const [mrInfo, setmrInfo] = useState(null);
  const [party, setParty] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [remarks, setRemarks] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentTypeData, setPaymentTypeData] = useState([]);
  const [locationData, setLocationData] = useState([]);
  const [bookingResponse, setBookingResponse] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const userData = useSelector((state) => state.response);
  const url = useSelector((state) => state.url);
  let shiftData = useSelector((state) => state.shift);

  useEffect(() => {
    setPaymentTypeData([
      { name: "--" },
      { name: "Cash" },
      { name: "Credit Card" },
      { name: "Online" },
      { name: "Cheque" },
      { name: "Pay Order" },
    ]);

    setLocationData([
      { name: "--" },
      { name: "Main Reception" },
      { name: "OPD Recetion" },
    ]);
  }, [toggle]);

  const SumAmount = (e) => {
    setServiceDetails(e);
    let sum = 0;
    e.map((item) => {
      sum += +item.amount;
    });
    setAmount(sum);
  };
  const refreshData = () => {
    setmrInfo(null);
    setParty(null);
    setConsultant(null);
    setServiceDetails([]);
    setRemarks("");
    setAmount(0);
    setPaymentTypeData([]);
    setLocationData([]);
    setPaymentType("");
    setLocation("");
    setToggle(!toggle);
  };
  const CheckValidation = () => {
    try {
      if (mrInfo === null) throw new Error("PLEASE SELECT MR NO");
      if (party === null) throw new Error("PLEASE SELECT PARTY");
      if (consultant === null) throw new Error("PLEASE SELECT CONSULTANT");
      if (serviceDetails.length === 0) throw new Error("PLEASE SELECT SERVICE");
      if (amount === 0) throw new Error("PLEASE ENTER AMOUNT");
      if (paymentType === "" || paymentType === "--")
        throw new Error("PLEASE SELECT PAYMENT TYPE");
      if (location === "" || location === "--")
        throw new Error("PLEASE SELECT LOCATION");
      submitData();
    } catch (error) {
      ErrorAlert({ text: error?.message, timer: 2000 });
    }
  };

  const submitData = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/radiologybooking`,
        {
          mrNo: mrInfo?.MrNo,
          consultant: consultant?.name,
          party: party?.name,
          amount,
          paymentType,
          location,
          remarks,
          serviceDetails,
          createdUser: userData[0]?.userId,
          shiftNo: shiftData[0].ShiftNo,
        },
        { withCredentials: true }
      );
      console.log("Response of submit data", response.data);
      setBookingResponse(response.data);
      SuccessAlert({ text: "RADIOLOGY CREATED SUCCESSFULLY", timer: 2000 });
      refreshData();
      setOpen(false);
      PrintRadiology(response.data);
    } catch (error) {
      console.log("Error of Submit Data", error);
      setOpen(false);
    }
  };

  const PrintRadiology = async (data) => {
    // if (mrInfo === null) {
    //   ErrorAlert({ text: "NO DATA TO BE PRINT !!!", timer: 2000 });
    //   return;
    // }
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <RadiologyBookingPDF
        key={key}
        userName={userData[0]?.userId}
        radioDetails={data}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const getDetails = async (name) => {
    setOpen(true);
    try {
      const response = await axios.get(
        `${url}/radiologypdf?radiologyNo=${name?.radiologyNo}&mrNo=${name?.mrNo}`,
        { withCredentials: true }
      );
      setOpen(false);
      const ask = await AskingAlert({
        text: `YOU WANT TO PRINT RADIOLOGY NO ${name?.radiologyNo}`,
      });
      if (ask) {
        console.log("ok");
        PrintRadiology(response.data);
      } else {
        console.log("User canceled");
        return;
      }
    } catch (error) {
      console.log("Error of get Details", error);
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Radiology Booking"} />
        <div className="flex items-center flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-center mt-2">
          <MRModel title={"Create Mr No"} />
          <BasicModal title={"Select Mr No"} onClick={(e) => setmrInfo(e)} />
          <PartyModal title={"Select Party"} onClick={(e) => setParty(e)} />
          <ConsultantModal
            title={"Select Consultant"}
            onClick={(e) => setConsultant(e)}
          />
          <RadiologyServiceModal
            title={"Select Tests"}
            modalAdmissionNo={party !== null ? party?.name : ""}
            onClick={(e) => SumAmount(e)}
          />
          <RadioTestModal
            title={"Select Radiology No."}
            onClick={getDetails}
            patientType={"Cash"}
          />
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Details"} />
        <div className="flex items-center flex-col space-y-2 md:space-y-0 md:grid md:grid-cols-2 md:gap-y-2 md:justify-items-center ">
          <LabeledInput
            disabled={true}
            label={"Patient Name"}
            placeholder={"Patient Name"}
            value={
              mrInfo !== null
                ? `${mrInfo.patientType} ${mrInfo.patientName}  ${mrInfo.relativeType} ${mrInfo.relativeName}`
                : ""
            }
          />
          <LabeledInput
            disabled={true}
            label={"Age"}
            placeholder={"Age"}
            value={
              mrInfo !== null
                ? `${mrInfo?.ageYear ? mrInfo?.ageYear : "0"}Years ${
                    mrInfo?.ageMonth ? mrInfo?.ageMonth : "0"
                  }Months ${mrInfo?.ageDay ? mrInfo?.ageDay : "0"} Days`
                : ""
            }
          />
          <LabeledInput
            disabled={true}
            label={"Cell No"}
            placeholder={"Cell No"}
            value={mrInfo !== null ? mrInfo?.cellNo : ""}
          />
          <LabeledInput
            disabled={true}
            label={"CNIC No"}
            placeholder={"CNIC No"}
            value={mrInfo !== null ? mrInfo?.cnicNo : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Address"}
            placeholder={"Address"}
            value={mrInfo !== null ? mrInfo?.address : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Gender"}
            placeholder={"Gender"}
            value={mrInfo !== null ? mrInfo?.gender : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Performed Consultant"}
            placeholder={"Performed Consultant"}
            value={consultant !== null ? consultant?.name : ""}
          />
          <LabeledInput
            disabled={true}
            label={"Party"}
            placeholder={"Party"}
            value={party !== null ? party?.name : ""}
          />
          <LabeledInput
            label={"Remarks"}
            placeholder={"Remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value.toUpperCase())}
          />
          <LabeledInput
            disabled={true}
            label={"Amount Recieved"}
            placeholder={"Amount Recieved"}
            value={amount}
          />
          <SimpleDropDown
            DropDownLabel={"Payment Type"}
            data={paymentTypeData}
            onChange={(e) => setPaymentType(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Collecting Location"}
            data={locationData}
            onChange={(e) => setLocation(e)}
          />
        </div>
        {mrInfo !== null && (
          <p className="flex justify-center text-[12px] mt-4 text-blue-700 font-bold">
            This MR No is created/updated by {mrInfo?.updatedUser} on{" "}
            {mrInfo?.updatedOn}{" "}
          </p>
        )}
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Tests Details"} />

        <div className="container mx-auto mt-3">
          <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p className="">S. No</p>
            <p className="">Test Name</p>
            <p className="">No. of Times</p>
            <p className="">Amount</p>
          </div>
        </div>
        {serviceDetails.length > 0 &&
          serviceDetails.map((service, index) => (
            <div className="container mx-auto mt-3">
              <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p className="">{index + 1}</p>
                <p className="">{service?.serviceName}</p>
                <p className="">{service?.quantity}</p>
                <p className="">{service?.amount}</p>
              </div>
            </div>
          ))}
        <div className="flex flex-col items-center space-y-2 mt-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-center">
          <ButtonDis title={"Save"} onClick={CheckValidation} />
          <ButtonDis title={"Print"} onClick={PrintRadiology} />
          <ButtonDis title={"Refresh"} onClick={refreshData} />
        </div>
      </div>

      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default RadiologyBooking;
