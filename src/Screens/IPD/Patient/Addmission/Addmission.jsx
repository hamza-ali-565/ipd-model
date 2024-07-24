import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import MRModel from "../../../../Components/Modal/MRModal";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import PartyModal from "../../../../Components/Modal/PartyModal";
import ReservationModal from "../../../../Components/Modal/ReservationModal";
import axios from "axios";
import { useSelector } from "react-redux";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import AdmissionPDF from "../../../../Components/PDFDetails/AdmissionPDF";

const Addmission = () => {
  const [admissionType, setAdmissionType] = useState("");
  const [ADType, setADType] = useState([]);
  const [ward, setWard] = useState([]);
  const [bed, setBed] = useState([]);
  const [completeAdmData, setCompleteAdmData] = useState(null);
  const [mrInfo, setMrInfo] = useState(null);
  const [party, setParty] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [toggle, setToggle] = useState(false);
  const [wardName, setWardName] = useState("");
  const [bedNo, setBBedNo] = useState("");
  const [bedId, setBedId] = useState("");
  const [remarks, setRemarks] = useState("");
  const [referedBy, setReferedBy] = useState("");
  const [buttonDis, setButtonDis] = useState(false);
  const [open, setOpen] = useState(false);
  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);

  const typeData = [
    { name: "--" },
    { name: "Direct" },
    { name: "From Reservation" },
  ];
  useEffect(() => {
    setADType(typeData);
    wardNames();
  }, [toggle]);

  // function
  const pickMr = (name) => {
    console.log(name);
    setMrInfo(name);
  };

  const pickParty = (name) => {
    console.log(name);
    setParty(name);
  };
  const pickConsultant = (name) => {
    console.log(name);
    setConsultant(name);
  };

  const validationCheck = () => {
    if (mrInfo === null) {
      ErrorAlert({
        text: "PLEASE SELECT MR NUMBER / RESERVATION NO.",
        timer: 2000,
      });
      return;
    }
    if (party === null) {
      ErrorAlert({ text: "PLEASE SELECT PARTY", timer: 2000 });
      return;
    }
    if (wardName === "" || wardName === "--") {
      ErrorAlert({ text: "PLEASE SELECT WARD", timer: 2000 });
      return;
    }
    if (bedNo === "" || bedNo === "--") {
      ErrorAlert({ text: "PLEASE SELECT BED NO", timer: 2000 });
      return;
    }
    if (consultant === null) {
      ErrorAlert({ text: "PLEASE SELECT CONSULTANT", timer: 2000 });
      return;
    }
    admission();
  };

  const resetFlag = () => {
    setMrInfo(null);
    setParty(null);
    setConsultant(null);
    setBed([]);
    setToggle(!toggle);
    setReferedBy("");
    setRemarks("");
    setCompleteAdmData(null);
  };

  const resetBed = () => {
    setBed([]);
  };

  const AdmissionPrint = async (data) => {
    const key = uuidv4();
    // Create a PDF document as a Blob
    const blob = await pdf(
      <AdmissionPDF
        key={key}
        billData={(completeAdmData && completeAdmData) || (data && data)}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const checkbedId = (e) => {
    const filteredData = bed.filter((items) => e === items?.name);
    console.log("filterd Data", filteredData);
    setBBedNo(e);
    setBedId(filteredData[0]._id);
  };
  //   api
  const wardNames = async () => {
    try {
      setWard([]);
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
      console.log("response of ward Name", response);
    } catch (error) {
      console.log("error of ward name", error);
    }
  };

  const bedName = async (name) => {
    setWardName(name);
    try {
      const response = await axios.get(
        `${url}/ipdadmissionbed?wardName=${name}`,
        { withCredentials: true }
      );
      setBed(response.data.data);
      console.log("response of bedName", response.data.data);
    } catch (error) {
      console.log("Error of bedName", error);
    }
  };

  const admission = async () => {
    setOpen(true);
    try {
      setButtonDis(true);
      const response = await axios.post(
        `${url}/admission`,
        {
          wardName,
          party: party?.name,
          bedId,
          admissionType,
          mrNo: mrInfo?.MrNo ? mrInfo?.MrNo : mrInfo?.mrNo,
          createdUser: userData[0].userId,
          remarks,
          referedBy,
          bedNo,
          consultantId: consultant?._id,
          reservationNo: mrInfo?.reservationNo ? mrInfo?.reservationNo : "",
        },
        { withCredentials: true }
      );
      console.log("response of admission", response);
      resetFlag();
      SuccessAlert({ text: "ADMISSION CREATED SUCCESSFULLY", timer: 3000 });
      setButtonDis(false);
      setOpen(false);
      AdmissionPrint(response?.data);
    } catch (error) {
      console.log("error of admission", error);
      setButtonDis(false);
      ErrorAlert({ text: error?.response?.data?.message });
      setOpen(false);
    }
  };

  const callData = async (data) => {
    try {
      setOpen(true);
      setMrInfo(data);
      const response = await axios.get(
        `${url}/admissionwisedetails?admissionNo=${data?.admissionNo}&mrNo=${data?.mrNo}`,
        { withCredentials: true }
      );
      console.log("response of admissionwisedetails", response?.data);
      setCompleteAdmData(response?.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of call Data", error);
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Admission"} />

        <div className="flex flex-col items-center mt-2 space-y-2 ">
          <AdmissionModal
            title={"Select Admission No"}
            onClick={(e) => callData(e)}
            whatCall={"yes"}
          />
          <SimpleDropDown
            DropDownLabel={"Select Admission Type"}
            data={ADType}
            onChange={(e) => setAdmissionType(e)}
            onClick={resetFlag}
          />

          {admissionType === "Direct" ? (
            <div className="flex flex-col space-y-2 mt-2 md:flex-row md:space-y-0 md:justify-center md: space-x-2">
              <BasicModal title={"Select MR No."} onClick={pickMr} />
              <MRModel title={"Create MR No."} onClick={pickMr} />
            </div>
          ) : admissionType === "From Reservation" ? (
            <ReservationModal
              title={"Select Reservation No."}
              onClick={pickMr}
            />
          ) : null}
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl md:grid md:grid-cols-2">
        {/* ward Detaild */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Admitted In"} />
          <div className="flex flex-col items-center space-y-3 mt-4">
            <PartyModal title={"Select Party"} onClick={pickParty} />
            <SimpleDropDown
              DropDownLabel={"Select Ward"}
              onChange={(e) => bedName(e)}
              data={ward.length > 0 ? ward : ""}
              onClick={resetBed}
            />
            <SimpleDropDown
              DropDownLabel={"Select Bed"}
              data={bed.length > 0 ? bed : []}
              onChange={(e) => checkbedId(e)}
            />
            <ConsultantModal
              title={"Select Consultant"}
              onClick={pickConsultant}
            />
          </div>
        </div>
        {/* Patient Details */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Patient Info"} />
          <div className="flex flex-col items-center space-y-2 ">
            <LabeledInput
              label={"Patient Name"}
              disabled={true}
              value={
                mrInfo !== null
                  ? `${mrInfo.patientType} ${mrInfo.patientName}  ${mrInfo.relativeType} ${mrInfo.relativeName}`
                  : ""
              }
            />
            <LabeledInput
              label={"Age"}
              disabled={true}
              value={mrInfo !== null ? `${mrInfo?.ageYear} Y ` : ""}
            />
            <LabeledInput
              label={"Gender"}
              disabled={true}
              value={mrInfo !== null ? mrInfo?.gender : ""}
            />
            <LabeledInput
              label={"Cell No."}
              disabled={true}
              value={mrInfo !== null ? mrInfo?.cellNo : ""}
            />
            <LabeledInput
              label={"Party"}
              disabled={true}
              value={
                (party && party.name) ||
                (completeAdmData && completeAdmData.partyData[0].party) ||
                ""
              }
            />
            <LabeledInput
              label={"Consultant"}
              disabled={true}
              value={
                (consultant && consultant?.name) ||
                (completeAdmData && completeAdmData.consultantData[0].name) ||
                ""
              }
            />
            <LabeledInput
              label={"Remarks"}
              value={
                (remarks && remarks) ||
                (completeAdmData &&
                  completeAdmData?.admissionData[0].remarks) ||
                ""
              }
              onChange={(e) => setRemarks(e.target.value.toUpperCase())}
              placeholder={"Enter Remarks"}
            />
            <LabeledInput
              label={"Refered By"}
              value={
                (referedBy && referedBy) ||
                (completeAdmData &&
                  completeAdmData?.admissionData[0]?.referedBy) ||
                ""
              }
              placeholder={"Enter referal name"}
              onChange={(e) => setReferedBy(e.target.value.toUpperCase())}
            />
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl flex justify-center space-x-2">
        <ButtonDis
          title={"Save"}
          onClick={validationCheck}
          disabled={buttonDis}
        />
        <ButtonDis
          title={"Print"}
          disabled={completeAdmData !== null ? false : true}
          onClick={() => AdmissionPrint()}
        />
        <ButtonDis title={"Refresh"} onClick={resetFlag} />
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default Addmission;
