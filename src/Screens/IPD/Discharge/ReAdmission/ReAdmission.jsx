import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";
import ReAdmissionModal from "../../../../Components/Modal/ReAmissionModal";
import LabelledDropDown from "../../../../Components/LabelledDropDown/LabelledDropDown";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";

const ReAdmission = () => {
  const [mrInfo, setMrInfo] = useState(null);
  const [ward, setWard] = useState([]);
  const [consultant, setConsultant] = useState([]);
  const [bed, setBed] = useState([]);
  const [bedNo, setBBedNo] = useState("");
  const [bedId, setBedId] = useState("");
  const [reason, setReason] = useState("");
  const [open, setOpen] = useState(false);
  const [wardName, setWardName] = useState("");
  const [wards, setWards] = useState([]);
  const [reAdmitTypeData, setReAdmitTypeData] = useState([]);
  const [reAdmissionType, setReAdmissionType] = useState("");
  const [toggle, setToggle] = useState(false);

  const url = useSelector((state) => state?.url);
  const userData = useSelector((state) => state?.response);

  useEffect(() => {
    wardNames();
  }, [toggle]);

  useEffect(() => {
    setReAdmitTypeData([
      { name: "--" },
      { name: "Correction" },
      { name: "On-Consultant Advice" },
    ]);
  }, [toggle]);
  const refreshData = () => {
    setMrInfo(null);
    setWard([]);
    setConsultant([]);
    setBed([]);
    setBBedNo("");
    setBedId("");
    setReason("");
    setWardName("");
    setWards([]);
    setReAdmitTypeData([]);
    setReAdmissionType("");
    setToggle(!toggle);
  };

  const checkbedId = (e) => {
    const filteredData = bed.filter((items) => e === items?.name);
    console.log("filterd Data", filteredData);
    setBBedNo(e);
    setBedId(filteredData[0]._id);
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

  const validationCheck = () => {
    try {
      if (mrInfo === null) throw new Error("PLEASE SELECT ADMISSION NO.");
      if (wardName === "--" || !wardName)
        throw new Error("PLEASE SELECT WARD NAME !!!");
      if (bedNo === "--" || !bedNo)
        throw new Error("PLEASE SELECT BED NO. !!!");
      if (reAdmissionType === "--" || !reAdmissionType)
        throw new Error("PLEASE SELECT RE_ADMISSION TYPE !!!");
      ReAdmit();
    } catch (error) {
      ErrorAlert({ text: error.message });
    }
  };

  //api
  const ReAdmit = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/readmission`,
        {
          reAdmissionType,
          reAdmitUser: userData[0]?.userId,
          admissionNo: mrInfo?.admissionNo,
          mrNo: mrInfo?.mrNo,
          reason,
          wardName: wardName,
          bedNo: bedNo,
          bedId: bedId,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "PATIENT READMIT SUCCESSFULLY!!!" });
      refreshData();
      setOpen(false);
      console.log("response of reAdmit", response);
      SuccessAlert({ text: "PATIENT READMITT SUCCESSFULLY" });
      refreshData();
    } catch (error) {
      console.log("error of discharged", error);
      ErrorAlert({ text: error?.response?.data?.message });
      setOpen(false);
    }
  };
  //api
  const wardNames = async () => {
    try {
      setBed([]);
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWards(response.data.data);
      console.log("response of ward Name", response);
    } catch (error) {
      console.log("error of ward name", error);
    }
  };
  //api
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
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Re-Admit Pateint"} />
        <div className="flex flex-col items-center space-y-2">
          <ReAdmissionModal
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
          <SimpleDropDown
            DropDownLabel={"Select Ward"}
            data={wards.length > 0 ? wards : ""}
            onChange={bedName}
          />
          <SimpleDropDown
            DropDownLabel={"Select Bed"}
            data={bed.length > 0 ? bed : ""}
            onChange={(e) => checkbedId(e)}
          />
          <SimpleDropDown
            DropDownLabel={"Re-Admit Type"}
            data={reAdmitTypeData.length > 0 ? reAdmitTypeData : ""}
            onChange={(e) => setReAdmissionType(e)}
          />
          <LabeledInput
            placeholder={"Reason"}
            onChange={(e) => setReason(e.target.value.toUpperCase())}
            label={"Reason"}
            value={reason}
          />
          <div className="flex justify-center space-x-2">
            <ButtonDis
              title={"Re-Admit"}
              onClick={validationCheck}
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

export default ReAdmission;
