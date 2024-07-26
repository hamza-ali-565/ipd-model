import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import BasicModal from "../../../../Components/Modal/FullScreenModal";
import ConsultantModal from "../../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";

const ConsultantVisit = () => {
  const [mrInfo, setMrInfo] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [visiDetails, setVisistDetails] = useState([]);
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [manualCharges, setManualCharges] = useState(0)
  const [visitData, setVisitData] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((state) => state.url);
  const userId = useSelector((state) => state.response);

  // api
  const checkItOut = async (data) => {
    try {
      setConsultant(data);
      if (mrInfo === null) {
        ErrorAlert({
          text: "PLEASE SELECT ADMISSION NUMBER FIRST!!!",
          timer: 1500,
        });
        return;
      }
      console.log("consultant", consultant);
      const response = await axios.get(
        `${url}/admissionconsultant?admissionNo=${mrInfo.admissionNo}&consultantId=${data?._id}`,
        { withCredentials: true }
      );
      console.log(response.data.data);
      setVisistDetails(response.data.data);
    } catch (error) {
      console.log("Error of CheckItOut", error);
    }
  };
  // api
  const submitVisit = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/consultantvisit`,
        {
          admissionNo: mrInfo?.admissionNo,
          mrNo: mrInfo?.mrNo,
          consultantId: consultant?._id,
          consultantName: consultant?.name,
          visitDate: date,
          remarks,
          createdUser: userId[0]?.userId,
          charges: (visiDetails && visiDetails[0]?.charges) || manualCharges,
        },

        { withCredentials: true }
      );
      console.log("response of submitVisit", response?.data?.data);
      refreshData2();
      SuccessAlert({ text: "DATA SAVED SUCCESSFULLY!!!", timer: 1000 });
      previousData(mrInfo);
      setOpen(false);
    } catch (error) {
      console.log("error of submitVisit", error);
      ErrorAlert({ text: error.response.data.message, timer: 2000 });
      setOpen(false);
    }
  };
  // api
  const previousData = async (e) => {
    try {
      setMrInfo(e);
      const response = await axios.get(
        `${url}/consultantvisit?admissionNo=${e?.admissionNo}`,
        { withCredentials: true }
      );
      console.log("response of previous data", response.data.data);
      setVisitData(response?.data?.data);
      refreshData2();
    } catch (error) {
      console.log("error of previous data", error.response.data);
      setVisitData([]);
    }
  };

  // api

  const deleteData = async (item) => {
    try {
      console.log("Item", item);
      const response = await axios.put(
        `${url}/consultantvisit`,
        {
          isDeleted: true,
          admissionNo: item?.admissionNo,
          deletedUser: userId[0]?.userId,
          _id: item?._id,
        },
        { withCredentials: true }
      );
      console.log("response of deleteData", response);
      SuccessAlert({ text: "Visit Deleted Successfully", timer: 1000 });
      previousData(mrInfo);
    } catch (error) {
      console.log("Error of delete data", error);
    }
  };

  // function
  const updateCharges = (value) => {
    const newData = visiDetails.map((item) => {
      return { ...item, charges: +value };
    });
    setVisistDetails(newData);
  };

  const refreshData = () => {
    setMrInfo(null);
    setConsultant(null);
    setVisistDetails([]);
    setDate("");
    setRemarks("");
    setVisitData([]);
    setManualCharges(0)
  };
  const refreshData2 = () => {
    setConsultant(null);
    setVisistDetails([]);
    setDate("");
    setRemarks("");
    setManualCharges(0)
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Visit"} />
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
          <div className="flex items-center">
            <ConsultantModal
              title={"Select Consultant"}
              onClick={(e) => checkItOut(e)}
            />
            {consultant !== null && <p>{consultant?.name}</p>}
          </div>
          <LabeledInput
            label={"Charges"}
            placeholder={"Consultant Charges"}
            type={"Number"}
            value={visiDetails.length > 0 ? visiDetails[0].charges : manualCharges}
            onChange={(e) => (updateCharges(e.target.value) || setManualCharges(e.target.value))}
            

          />
          <LabeledInput
            label={"Visit Date"}
            type={"date"}
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <LabeledInput
            label={"Remarks"}
            placeholder={"Remarks"}
            value={remarks}
            onChange={(e) => setRemarks(e.target.value.toUpperCase())}
          />
          <div className="flex space-x-2">
            <ButtonDis title={"Save"} onClick={submitVisit} />
            <ButtonDis title={"Refresh"} onClick={refreshData} />
          </div>
        </div>

        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Consultant Name</p>
            <p>Charges</p>
            <p>Date</p>
            <p>Remove</p>
          </div>
        </div>
        {visitData.length > 0 &&
          visitData.map((items, index) => (
            <div className="container mx-auto mt-3" key={index}>
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.consultantName}</p>
                <p>{items?.charges}</p>
                <p>{items?.visitDate}</p>
                <p
                  className="font-bold underline cursor-pointer hover:text-red-600"
                  onClick={() => deleteData(items)}
                >
                  DELETE
                </p>
              </div>
            </div>
          ))}
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default ConsultantVisit;
