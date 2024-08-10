import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";

const Biochemistry = () => {
  const [labNo, setLabNo] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [labResultData, setLabResultData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((items) => items?.url);

  const resetDetails = () => {
    setLabData([]);
    setPatientData([]);
    setLabNo("");
    setLabResultData([]);
  };

  // get Details
  const getDetails = async (e) => {
    try {
      e.preventDefault();
      setOpen(true);
      console.log(" i am here");
      const response = await axios.get(
        `${url}/lab/biochemistry?labNo=${labNo}`,
        {
          withCredentials: true,
        }
      );
      setPatientData(response?.data?.data.patientData);
      setLabData(response?.data?.data.labCDetails);
      setLabResultData(response?.data?.data.labData);
      setLabNo("");
      setOpen(false);
    } catch (error) {
      console.log("error of get details", error);
      ErrorAlert({ text: error.message, timer: 2000 });
      setOpen(false);
      resetDetails();
    }
  };
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-2">
      {/* Patient Detail */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Detail"} />
        <form
          className="flex justify-center my-2"
          onSubmit={(e) => getDetails(e)}
        >
          <LabeledInput
            label={"Lab No"}
            placeholder={"Enter Lab No and press ENTER"}
            onChange={(e) => setLabNo(e.target.value)}
            value={labNo}
          />
        </form>
        <div className="flex flex-col items-center space-y-2">
          <LabeledInput
            label={"Patient Name"}
            placeholder={"Lab No"}
            disabled
            value={
              patientData.length > 0
                ? `${patientData[0].patientType} ${patientData[0].patientName}  ${patientData[0].relativeType} ${patientData[0].relativeName}`
                : ""
            }
          />
          <LabeledInput
            label={"Phone No."}
            placeholder={"Phone No"}
            disabled
            value={(patientData.length > 0 && patientData[0].cellNo) || ""}
          />
          <LabeledInput
            label={"Lab No"}
            placeholder={"Lab No"}
            disabled
            value={(labData.length > 0 && labData[0].labNo) || ""}
          />
          <LabeledInput
            label={"Mr No"}
            placeholder={"Mr No"}
            disabled
            value={(patientData.length > 0 && patientData[0].MrNo) || ""}
          />
          <LabeledInput
            label={"Booking Date"}
            placeholder={"Booking Date"}
            disabled
            value={(labData.length > 0 && labData[0].createdOn) || ""}
          />
          <LabeledInput
            label={"Age"}
            placeholder={"Booking Date"}
            disabled
            value={
              patientData.length > 0
                ? `${
                    patientData[0]?.ageYear ? patientData[0]?.ageYear : "0"
                  } Years ${
                    patientData[0]?.ageMonth ? patientData[0]?.ageMonth : "0"
                  } Months ${
                    patientData[0]?.ageDay ? patientData[0]?.ageDay : "0"
                  } Days`
                : ""
            }
          />
        </div>
      </div>
      {/* test detail */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Test Detail"} />
        <div className="flex flex-col items-center space-y-2 mt-3">
          {labResultData.map((items, index) => (
            <div
              key={index}
              className="cursor-pointer hover:text-blue-600 hover:font-bold"
            >
              <LabeledInput
                label={"Test Name"}
                value={`${items?.testName} ${items?.thisIs}`}
                disabled
              />
            </div>
          ))}
        </div>
      </div>
      {/* test entry */}
      <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Test Entry"} />
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default Biochemistry;
