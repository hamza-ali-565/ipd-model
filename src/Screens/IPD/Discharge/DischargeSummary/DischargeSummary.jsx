import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import LabelledTextArea from "../../../../Components/LabeledTextArea/LabelledTextArea";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import DCSummary from "../../../../Components/DCSummaryPDF/DCSummaryPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import Loader from "../../../../Components/Modal/Loader";

const DischargeSummary = () => {
  const [dischargeType, setDischargeType] = useState([]);
  const [mrInfo, setMrInfo] = useState(null);
  const [dcConsultant, setDcConsultant] = useState(null);
  const [consultant, setConsultant] = useState([]);
  const [dischargeSummary, setDischargeSummary] = useState([]);
  const [dischargeCondition, setDischargeCondition] = useState("");
  const [toggle, setToggle] = useState(false);
  const [updateConsultant, setUpdateConsultant] = useState("");
  const [prevSummary, setPrevSummary] = useState([]);
  const [wardDetails, setWardDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);

  useEffect(() => {
    setDischargeType([
      { name: "--" },
      { name: "Brought Dead" },
      { name: "Expired" },
      { name: "LAMA" },
      { name: "Refer To" },
      { name: "Satisfactory" },
    ]);
    setDischargeSummary([
      { pComplaints: "", id: 1 },
      { diagnosis: "", id: 2 },
      { rInvestigation: "", id: 3 },
      { hCourse: "", id: 4 },
      { DOSurgery: "", id: 5 },
      { oProcedure: "", id: 6 },
      { pReports: "", id: 7 },
      { IODischarge: "", id: 8 },
      { MODischarge: "", id: 9 },
      { FollowUp: "", id: 10 },
      { CODischarge: "", id: 11 },
    ]);
  }, [toggle]);

  // function
  const updateData = (value, type, id) => {
    const newData = dischargeSummary.map((items) => {
      if (items?.id === id) {
        return { ...items, [type]: value };
      }
      return items;
    });

    // Update the state with the new data
    setDischargeSummary(newData);
  };
  const refreshData = () => {
    setMrInfo(null);
    setDcConsultant(null);
    setConsultant([]);
    setDischargeType([]);
    setDischargeCondition("");
    setUpdateConsultant("");
    setToggle(!toggle);
  };

  const PrintDCSummary = async () => {
    if (mrInfo === null) {
      ErrorAlert({ text: "NO DATA TO BE PRINT !!!", timer: 2000 });
      return;
    }
    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <DCSummary
        key={key}
        mrData={mrInfo}
        summaryData={prevSummary}
        consultant={consultant}
        ward={wardDetails}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  // api
  const getConsultant = async (e) => {
    setOpen(true);
    try {
      setMrInfo(e);
      const response = await axios.get(
        `${url}/dischargeconsultant?admissionNo=${e?.admissionNo}`,
        { withCredentials: true }
      );

      setConsultant(response?.data?.data);
      if (response?.data?.data2) {
        setPrevSummary(response?.data?.data2);
        setWardDetails(response?.data?.data3);
        setDischargeSummary(response?.data?.data2[0]?.dischargeSummaryData);
        setUpdateConsultant(response?.data?.data2[0]?.dischargeDoctor);
      }
      setOpen(false);
    } catch (error) {
      console.log("Error of get consultant", error);
      setOpen(false);
    }
  };
  // api
  const submitHandler = async () => {
    try {
      if (mrInfo === null) throw new Error("PLEASE SELECT PATIENT !!!");
      if (dcConsultant === null)
        throw new Error("PLLEASE SELECT DISCHARGE DOCTOR!!!");
      if (dischargeCondition === "--" || !dischargeCondition)
        throw new Error("PLEASE SELECT DISCHARGE TYPE!!!");
      setOpen(true);
      const response = await axios.post(
        `${url}/ipddischargeSummary`,
        {
          mrNo: mrInfo?.mrNo,
          admissionNo: mrInfo?.admissionNo,
          createUser: userData[0]?.userId,
          dischargeCondition,
          dischargeDoctor: dcConsultant?.name
            ? dcConsultant?.name
            : updateConsultant,
          dischargeSummaryData: dischargeSummary,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "DISCHARGE SUMMARY CREATED SUCCESSFULLY" });
      refreshData();

      setOpen(false);
    } catch (error) {
      console.log("Error of submit handler", error.response);
      ErrorAlert({ text: error.message, timer: 1500 });
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Discharge Summary"} />
        <div className="flex justify-center">
          <AdmissionModal
            title={"Select Admission No."}
            onClick={(e) => getConsultant(e)}
          />
        </div>
        <div className="md:grid md:grid-cols-2">
          {/* Patient Details */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <CenterHeading title={"Patient Details"} />
            <div className="flex flex-col items-center space-y-2 mt-2">
              <LabeledInput
                disabled={true}
                label={"Patient Name"}
                placeholder={"Patient Name"}
                value={
                  mrInfo !== null
                    ? `${mrInfo?.patientType} ${mrInfo?.patientName} ${mrInfo?.relativeType} ${mrInfo?.relativeName}`
                    : ""
                }
              />
              <LabeledInput
                disabled={true}
                label={"Admission No"}
                placeholder={"Admission No"}
                value={mrInfo !== null ? mrInfo?.admissionNo : ""}
              />
              <LabeledInput
                disabled={true}
                label={"Mr No"}
                placeholder={"Mr No"}
                value={mrInfo !== null ? mrInfo?.mrNo : ""}
              />
              <LabeledInput
                disabled={true}
                label={"Consultant Name"}
                placeholder={"Consultant Name"}
                value={consultant.length > 0 ? consultant[0]?.name : ""}
              />
              <LabeledInput
                disabled={true}
                label={"Party"}
                placeholder={"Party"}
                value={consultant.length > 0 ? consultant[0]?.party : ""}
              />
            </div>
          </div>
          {/* Discharge Details */}
          <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <CenterHeading title={"Discharge Details"} />
            <div className="flex flex-col items-center space-y-2">
              <ConsultantModal
                title={"Select Consultant Name"}
                onClick={(e) => setDcConsultant(e)}
              />
              <LabeledInput
                disabled={true}
                label={"Discharge Consultant"}
                placeholder={"Discharge Consultant"}
                value={
                  dcConsultant !== null
                    ? dcConsultant?.name
                    : updateConsultant !== ""
                    ? updateConsultant
                    : ""
                }
              />
              <SimpleDropDown
                DropDownLabel={"Discharge Condition"}
                data={dischargeType}
                onChange={(e) => setDischargeCondition(e)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl ">
        <div className="sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          <LabelledTextArea
            label={"Presenting Complaints"}
            placeholder={"Presenting Complaints"}
            value={
              dischargeSummary[0]?.pComplaints !== ""
                ? dischargeSummary[0]?.pComplaints
                : ""
            }
            onChange={(e) => updateData(e.target.value, "pComplaints", 1)}
          />
          <LabelledTextArea
            label={"Diagnosis"}
            placeholder={"Diagnosis"}
            onChange={(e) => updateData(e.target.value, "diagnosis", 2)}
            value={
              dischargeSummary[1]?.diagnosis !== ""
                ? dischargeSummary[1]?.diagnosis
                : ""
            }
          />
          <LabelledTextArea
            label={"Relevant Investigation"}
            placeholder={"Relevant Investigation"}
            onChange={(e) => updateData(e.target.value, "rInvestigation", 3)}
            value={
              dischargeSummary[2]?.rInvestigation !== ""
                ? dischargeSummary[2]?.rInvestigation
                : ""
            }
          />
          <LabelledTextArea
            label={"Hospital Course"}
            placeholder={"Hospital Course"}
            onChange={(e) => updateData(e.target.value, "hCourse", 4)}
            value={
              dischargeSummary[3]?.hCourse !== ""
                ? dischargeSummary[3]?.hCourse
                : ""
            }
          />
          <LabelledTextArea
            label={"Date of Surgery"}
            placeholder={"Date of Surgery"}
            onChange={(e) => updateData(e.target.value, "DOSurgery", 5)}
            value={
              dischargeSummary[4]?.DOSurgery !== ""
                ? dischargeSummary[4]?.DOSurgery
                : ""
            }
          />
          <LabelledTextArea
            label={"Operative Procedure"}
            placeholder={"Operative Procedure"}
            onChange={(e) => updateData(e.target.value, "oProcedure", 6)}
            value={
              dischargeSummary[5]?.oProcedure !== ""
                ? dischargeSummary[5]?.oProcedure
                : ""
            }
          />
          <LabelledTextArea
            label={"Pending Reports"}
            placeholder={"Pending Reports"}
            onChange={(e) => updateData(e.target.value, "pReports", 7)}
            value={
              dischargeSummary[6]?.pReports !== ""
                ? dischargeSummary[6]?.pReports
                : ""
            }
          />
          <LabelledTextArea
            label={"Instruction on Discharge"}
            placeholder={"Instruction on Discharge"}
            onChange={(e) => updateData(e.target.value, "IODischarge", 8)}
            value={
              dischargeSummary[7]?.IODischarge !== ""
                ? dischargeSummary[7]?.IODischarge
                : ""
            }
          />
          <LabelledTextArea
            label={"Medication on Discharge"}
            placeholder={"Medication on Discharge"}
            onChange={(e) => updateData(e.target.value, "MODischarge", 9)}
            value={
              dischargeSummary[8]?.MODischarge !== ""
                ? dischargeSummary[8]?.MODischarge
                : ""
            }
          />
          <LabelledTextArea
            label={"Follow Up"}
            placeholder={"Follow Up"}
            onChange={(e) => updateData(e.target.value, "FollowUp", 10)}
            value={
              dischargeSummary[9]?.FollowUp !== ""
                ? dischargeSummary[9]?.FollowUp
                : ""
            }
          />
          <LabelledTextArea
            label={"Condition on Discharge"}
            placeholder={"Condition on Discharge"}
            onChange={(e) => updateData(e.target.value, "CODischarge", 11)}
            value={
              dischargeSummary[10]?.CODischarge !== ""
                ? dischargeSummary[10]?.CODischarge
                : ""
            }
          />
        </div>
        <div className="flex flex-col items-center space-y-2 mt-2 md:flex-row md:justify-center md:items-center md:space-x-2 md:space-y-0">
          <ButtonDis title="Save" onClick={submitHandler} />
          <ButtonDis title="Print" onClick={PrintDCSummary} />
          <ButtonDis title="Refresh" onClick={refreshData} />
        </div>
      </div>
      <Loader onClick={open} title={"Data Loading ..."} />
    </div>
  );
};

export default DischargeSummary;
