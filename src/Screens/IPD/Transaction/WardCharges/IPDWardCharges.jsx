import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";

const IPDWardCharges = () => {
  const [mrInfo, setMrInfo] = useState(null);
  const [wardDetails, setWardDetails] = useState([]);
  const [date, setDate] = useState("");
  const [remarks, setRemarks] = useState("");
  const [prevDetails, setprevDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item.response);
  // api
  const getWard = async (data) => {
    try {
      setMrInfo(data);
      const response = await axios.get(
        `${url}/activeward?admissionNo=${data?.admissionNo}`,
        { withCredentials: true }
      );
      console.log("response of getWard", response.data.data);
      setWardDetails(response?.data?.data);
      previousData(data);
    } catch (error) {
      console.log("Error of getWard", error);
    }
  };
  // api
  const submitHandler = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/admissionwardcharges`,
        {
          wardName: wardDetails[0]?.wardName,
          bedNo: wardDetails[0]?.bedNumber,
          bedId: wardDetails[0]?.bedId,
          admissionNo: mrInfo.admissionNo,
          mrNo: mrInfo?.mrNo,
          createdUser: userData[0]?.userId,
          amount: wardDetails[0].bedCharges,
          roomDate: date,
          remarks: remarks,
        },
        { withCredentials: true }
      );
      console.log("response of submitHandler", response.data);
      SuccessAlert({ text: "ROOM ADDED SUCCESSFULLY!!!", timer: 1000 });
      previousData(mrInfo);
      setDate("");
      setRemarks("");
      setOpen(false);
    } catch (error) {
      console.log("Error of Submit Handler", error.response.data);
      ErrorAlert({ text: error.response.data.message });
      setOpen(false);
    }
  };
  // api
  const previousData = async (data) => {
    try {
      setMrInfo(data);
      const response = await axios.get(
        `${url}/admissionbedcharges?admissionNo=${data?.admissionNo}`,
        { withCredentials: true }
      );
      console.log("response of previousData", response.data.data);
      setprevDetails(response?.data?.data);
    } catch (error) {
      console.log("Error of previousData", error);
      setprevDetails([]);
    }
  };

  const deleteData = async (data) => {
    try {
      const response = await axios.put(
        `${url}/admissionbedcharges`,
        {
          _id: data?._id,
          admissionNo: mrInfo?.admissionNo,
          deletedUser: userData[0].userId,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "BED DELETED SUCCESSFULLY", timer: 2000 });
      previousData(mrInfo);
    } catch (error) {
      console.log("Error of deleteData", error);
    }
  };

  // function
  const handleCharges = (value) => {
    const updatedData = wardDetails.map((item) => {
      return { ...item, bedCharges: +value };
    });
    setWardDetails(updatedData);
  };

  const refreshData = () => {
    setMrInfo(null);
    setWardDetails([]);
    setDate("");
    setRemarks("");
    setprevDetails([]);
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Room Charges"} />
        <div className="flex justify-center items-center my-4">
          <AdmissionModal
            title={"Select Admission No."}
            onClick={(e) => getWard(e)}
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
          <LabeledInput
            label={"Ward Name"}
            placeholder={"Ward Name"}
            disabled={true}
            value={wardDetails.length > 0 ? wardDetails[0]?.wardName : ""}
          />
          <LabeledInput
            label={"Bed No."}
            placeholder={"Bed No."}
            disabled={true}
            value={wardDetails.length > 0 ? wardDetails[0]?.bedNumber : ""}
          />
          <LabeledInput
            label={"Ward Charges"}
            type={"Number"}
            placeholder={"Ward Charges"}
            value={wardDetails.length > 0 ? wardDetails[0]?.bedCharges : ""}
            onChange={(e) => handleCharges(e.target.value)}
          />

          <LabeledInput
            label={"Date"}
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
          <div className="flex space-x-3">
            <ButtonDis title={"Add"} onClick={submitHandler} />
            <ButtonDis title={"Refresh"} onClick={refreshData} />
          </div>
        </div>

        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Ward Name</p>
            <p>Charges</p>
            <p>Date</p>
            <p>Delete</p>
          </div>
        </div>
        {prevDetails.length > 0 &&
          prevDetails.map((item, index) => (
            <div className="container mx-auto mt-3" key={index}>
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>
                  {item?.wardName}: {item?.bedNo}
                </p>
                <p>{item?.amount}</p>
                <p>{item?.roomDate}</p>
                <p
                  className="font-bold underline cursor-pointer hover:text-red-600"
                  onClick={() => deleteData(item)}
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

export default IPDWardCharges;
