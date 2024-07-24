import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";

const ProcedureCharges = () => {
  const [mrInfo, setMrInfo] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [previousDetails, setPreviousDetails] = useState([]);
  const [procedureName, setProcedureName] = useState("");
  const [amount, setAmount] = useState("");
  const [procedureDate, setProcedreDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [open, setOpen] = useState(false);

  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);

  // api
  const previousData = async (e) => {
    try {
      setMrInfo(e);
      const response = await axios.get(
        `${url}/procedurecharges?admissionNo=${e.admissionNo}`,
        { withCredentials: true }
      );
      setPreviousDetails(response.data.data);
    } catch (error) {
      console.log("error of previous Data");
      setPreviousDetails([]);
    }
  };
  //api
  const submitHandler = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/procedurecharges`,
        {
          admissionNo: mrInfo?.admissionNo,
          mrNo: mrInfo?.mrNo,
          consultantName: consultant?.name,
          consultantId: consultant?._id,
          procedureName,
          amount,
          procedureDate,
          remarks,
          createdUser: userData[0]?.userId,
        },
        { withCredentials: true }
      );
      console.log("response of submit handler", response.data.data);
      SuccessAlert({ text: "PROCEDURE ADDED SUCCESSFULLY", timer: 2000 });
      refreshData2();
      previousData(mrInfo);
      setOpen(false);
    } catch (error) {
      console.log("error of submit Handler", error.response.data);
      setOpen(false);
    }
  };
  //api
  const deleteProcedure = async (item) => {
    try {
      const response = await axios.put(
        `${url}/procedurecharges`,
        {
          admissionNo: mrInfo?.admissionNo,
          deletedUser: userData[0]?.userId,
          _id: item?._id,
        },
        { withCredentials: true }
      );
      console.log("response of delete procedure", response.data.data);
      SuccessAlert({ text: "PROCEDURE DELETED SUCCESSFULLY", timer: 2000 });
      previousData(mrInfo);
    } catch (error) {
      console.log("Error of deleteProcedure", error);
    }
  };
  //function
  const refreshData = () => {
    setMrInfo(null);
    setConsultant(null);
    setPreviousDetails([]);
    setProcedureName("");
    setProcedreDate("");
    setAmount("");
    setRemarks("");
  };
  const refreshData2 = () => {
    setConsultant(null);
    setProcedureName("");
    setProcedreDate("");
    setAmount("");
    setRemarks("");
  };
  const validCheck = () => {
    try {
      if (mrInfo === null) throw new Error("PLEASE SELECT MR NO.");
      if (consultant === null) throw new Error("PLEASE SELECT CONSULTANT");
      if (!procedureName) throw new Error("PLEASE ENTER PROCEDURE NAME");
      if (!amount) throw new Error("PLEASE ENTER CONSULTANT CHARGES");
      if (!procedureDate) throw new Error("PLEASE SELECT PROCEDURE DATE");
      submitHandler();
    } catch (error) {
      ErrorAlert({ text: error.message, timer: 1500 });
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Procedure Charges"} />
        <div className="flex justify-center items-center my-4">
          <AdmissionModal
            title={"Select Admission No."}
            onClick={(e) => previousData(e)}
          />
        </div>
        {mrInfo !== null && (
          <div className="md:flex md:justify-center md:space-x-4">
            <p className="text-center">
              <span className="font-bold">Patient Name:</span>{" "}
              {mrInfo.patientType} {mrInfo.patientName}
              {mrInfo.relativeType} {mrInfo.relativeName}
            </p>
            <p className="text-center">
              {" "}
              <span className="font-bold">Admission No:</span>{" "}
              {mrInfo?.admissionNo}
            </p>
          </div>
        )}
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Visit Details"} />

        <div className="flex flex-col items-center space-y-2 ">
          <ConsultantModal
            title={"Select Consultant Name"}
            onClick={(e) => setConsultant(e)}
          />
          <LabeledInput
            label={"Consultant Name"}
            placeholder={"Consultant Name"}
            disabled={true}
            value={consultant !== null ? consultant?.name : ""}
          />
          <LabeledInput
            label={"Procedure Name"}
            placeholder={"Procedure Name"}
            value={procedureName}
            onChange={(e) => setProcedureName(e.target.value.toUpperCase())}
          />
          <LabeledInput
            label={"Consultant Charges"}
            type={"number"}
            placeholder={"Constultant Charges"}
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <LabeledInput
            label={"Date"}
            type={"date"}
            value={procedureDate}
            onChange={(e) => setProcedreDate(e.target.value)}
          />
          <LabeledInput
            label={"Remarks"}
            placeholder={"Remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value.toUpperCase())}
          />
          <div className="flex space-x-3">
            <ButtonDis title={"Add"} onClick={validCheck} />
            <ButtonDis title={"Refresh"} onClick={refreshData} />
          </div>
        </div>

        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Consultant Name</p>
            <p>Procedure Name</p>
            <p>Charges</p>
            <p>Remove</p>
          </div>
        </div>
        {previousDetails.length > 0 &&
          previousDetails.map((item, index) => (
            <div className="container mx-auto mt-3" key={index}>
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{item?.consultantName}</p>
                <p>{item?.procedureName}</p>
                <p>{item?.amount}</p>
                <p
                  className="font-bold underline cursor-pointer hover:text-red-600"
                  onClick={() => deleteProcedure(item)}
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default ProcedureCharges;
