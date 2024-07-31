import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import MRModel from "../../../Components/Modal/MRModal";
import BasicModal from "../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import PartyModal from "../../../Components/Modal/PartyModal";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import RadiologyServiceModal from "../../../Components/Modal/RadiologyServiceModal";
import ButtonDis from "../../../Components/Button/ButtonDis";
import {
  AskingAlert,
  ErrorAlert,
  SuccessAlert,
} from "../../../Components/Alert/Alert";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import { useSelector } from "react-redux";
import axios from "axios";
import Loader from "../../../Components/Modal/Loader";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import RadiologyBookingPDF from "../../../Components/PDFDetails/RadiologyBookingPDF";
import RadioTestModal from "../../../Components/Modal/RadioTestModal";

const OPDRegistraion = () => {
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
  const [message, setMessage] = useState("");

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
        `${url}/opd/opdRegistraion`,
        {
          mrNo: mrInfo?.MrNo,
          consultantName: consultant?.name,
          consultantId: consultant?._id,
          partyName: party?.name,
          partyId: party?._id,
          amount,
          paymentType,
          location,
          remarks,
          shiftNo: shiftData[0].ShiftNo,
        },
        { withCredentials: true }
      );
      console.log("Response of submit data", response.data);
    //   setBookingResponse(response.data);
      SuccessAlert({ text: "RADIOLOGY CREATED SUCCESSFULLY", timer: 2000 });
      refreshData();
      setOpen(false);
    //   PrintRadiology(response.data);
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
  const selectParty = (e) => {
    setServiceDetails([]);
    setParty(e);
  };

  const getCharges = async (data) => {
    try {
      if (party === null) {
        ErrorAlert({ text: "PLEASE SELECT PARTY FIRST !!! ", timer: 2000 });
        return;
      }
      setOpen(true);
      setConsultant(data);
      const { name, _id } = data;
      const response = await axios.get(
        `${url}/opd/findDrChargesPartyWise?consultantId=${data?._id}&partyId=${party?._id}`,
        { withCredentials: true }
      );
      setOpen(false);
      setAmount(response.data.data.data[0]?.amount);
      console.log("response of getCharges", response);
      setMessage("");
    } catch (error) {
      console.log("Error of getCharges", error);
      setOpen(false);
      setAmount(0);
      if (error.response?.status === 400) {
        setMessage(
          "Consultant not Active on this party. Contact to your I.T Team"
        );
        return;
      } else {
        ErrorAlert({ text: error.message, timer: 2000 });
      }
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"OPD REGISTRATION"} />
        <div className="flex items-center flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-center mt-2">
          <MRModel title={"Create Mr No"} onClick={(e) => setmrInfo(e)} />
          <BasicModal title={"Select Mr No"} onClick={(e) => setmrInfo(e)} />
          <PartyModal
            title={"Select Party"}
            onClick={(e) => {
              selectParty(e);
              setAmount(0);
              setConsultant(null);
            }}
          />
          <ConsultantModal
            title={"Select Consultant"}
            onClick={(e) => getCharges(e)}
          />
          {/* <RadiologyServiceModal
            title={"Select Tests"}
            modalAdmissionNo={party !== null ? party?.name : ""}
            onClick={(e) => SumAmount(e)}
          /> */}
          {/* <RadioTestModal
            title={"Select Radiology No."}
            onClick={getDetails}
            patientType={"Cash"}
          /> */}
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
            label={"Consultant Name"}
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
        {message && (
          <p className="text-center font-bold text-sm text-red-700">
            {message}
          </p>
        )}
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"OTHER DETAILS"} />
        <div className="flex justify-center my-4">
          <LabeledInput
            disabled={true}
            label={"Your Token No"}
            placeholder={"Token No"}
          />
        </div>

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

export default OPDRegistraion;
