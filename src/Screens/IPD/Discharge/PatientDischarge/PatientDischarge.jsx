import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import AdmissionDCSUMModal from "../../../../Components/Modal/AdmissionDCSum";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";

const PatientDischarge = () => {
  const [mrInfo, setMrInfo] = useState(null);
  const [ward, setWard] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((state) => state?.url);
  const userData = useSelector((state) => state?.response);

  const refreshData = () => {
    setMrInfo(null);
    setWard([]);
    setConsultant([]);
  };

  //api
  const getDetails = async (name) => {
    setOpen(true);
    try {
      setMrInfo(name);
      const response = await axios.get(
        `${url}/dischargeconsultant?admissionNo=${name?.admissionNo}&returnTo=Chalo Bhai`,
        { withCredentials: true }
      );
      setConsultant(response?.data?.data);
      setWard(response?.data?.data2);
      setOpen(false);
    } catch (error) {
      console.log("error of get details", error);
      setOpen(false);
    }
  };
  //api
  const discharged = async () => {
    try {
      setOpen(true);
      const response = await axios.put(
        `${url}/dischargePatient`,
        {
          admissionNo: mrInfo?.admissionNo,
          dischargeUser: userData[0]?.userId,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "PATIENT DISCHARGES SUCCESSFULLY!!!" });
      refreshData();
      setOpen(false);
    } catch (error) {
      console.log("error of discharged", discharged);
      ErrorAlert({ text: error.message });
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Discharge"} />
        <div className="flex flex-col items-center space-y-2">
          <AdmissionDCSUMModal
            title={"Select Admission No"}
            onClick={getDetails}
          />
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
            placeholder={"Ward Name"}
            label={"Ward Name"}
            value={ward.length > 0 ? ward[0]?.wardName : ""}
          />
          <LabeledInput
            disabled={true}
            placeholder={"Bed No"}
            label={"Bed No"}
            value={ward.length > 0 ? ward[0]?.bedNo : ""}
          />
          <LabeledInput
            disabled={true}
            placeholder={"Party"}
            label={"Party"}
            value={consultant.length > 0 ? consultant[0]?.party : ""}
          />
          <LabeledInput
            disabled={true}
            placeholder={"Consultant"}
            label={"Consultant"}
            value={consultant.length > 0 ? consultant[0]?.name : ""}
          />
          <div className="flex justify-center space-x-2">
            <ButtonDis
              title={"Discharge"}
              onClick={discharged}
              disabled={mrInfo === null ? true : false}
            />
            <ButtonDis title={"Refresh"} onClick={refreshData} />
          </div>
        </div>
      </div>
      <Loader onClick={open} title={"Loading Data..."} />
    </div>
  );
};

export default PatientDischarge;
