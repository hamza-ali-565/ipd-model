import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import Loader from "../../../../Components/Modal/Loader";
import RadioTestModal from "../../../../Components/Modal/RadioTestModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { SuccessAlert } from "../../../../Components/Alert/Alert";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";

const TestCancellation = () => {
  const [serviceDetails, setServiceDetails] = useState([]);
  const [mrInfo, setmrinfo] = useState(null);
  const [loader, setLoader] = useState(false);

  const url = useSelector((items) => items?.url);
  const userData = useSelector((items) => items?.response);

  const resetData = () => {
    setmrinfo(null);
    setServiceDetails([]);
  };

  const getDetails = async (data) => {
    setLoader(true);
    setmrinfo(data);
    try {
      const response = await axios.get(
        `${url}/radiologybooking?radiologyNo=${data?.radiologyNo}`,
        { withCredentials: true }
      );
      setServiceDetails(response.data.data);
      setLoader(false);
    } catch (error) {
      console.log("Error of get Data", error);
      setLoader(false);
    }
  };

  const deleteTest = async (uniqueId) => {
    setLoader(true);
    try {
      const response = await axios.put(
        `${url}/radiologybooking`,
        {
          uniqueId,
          deletedUser: userData[0]?.userId,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "TEST DELETED SUCCESSFULLY", timer: 1000 });
      setLoader(false);
      getDetails(mrInfo);
    } catch (error) {
      console.log("Error of delete Test", error);
      setLoader(false);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Radiology Tests Cancellation"} />
        <div className="flex justify-center mt-2">
          <RadioTestModal
            title={"Select Radiology No."}
            onClick={getDetails}
            patientType={"Cash"}
          />
        </div>
        {mrInfo && (
          <div className=" flex flex-col items-center space-y-2 md:grid md:grid-cols-2 md:gap-y-2 md:justify-items-center">
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
              label={"Radiology No"}
              placeholder={"Radiology No"}
              value={mrInfo !== null ? mrInfo?.radiologyNo : ""}
            />
            <LabeledInput
              disabled={true}
              label={"Mr No"}
              placeholder={"Mr No"}
              value={mrInfo !== null ? mrInfo?.mrNo : ""}
            />
            <LabeledInput
              disabled={true}
              label={"Cell No"}
              placeholder={"Cell No"}
              value={mrInfo !== null ? mrInfo?.cellNo : ""}
            />
          </div>
        )}
      </div>

      {/* service details */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Service Details"} />
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p>Service Name</p>
            <p>Charges</p>
            <p>Amount</p>
            <p>Remove</p>
          </div>
        </div>
        {serviceDetails.length > 0 &&
          serviceDetails.map((items) => (
            <div className="container mx-auto mt-3">
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.serviceName} </p>
                <p>{items?.amount}</p>
                <p>{items?.amount}</p>
                <p
                  className="font-bold underline cursor-pointer hover:text-red-600"
                  onClick={() => deleteTest(items?.uniqueId)}
                >
                  Delete
                </p>
              </div>
            </div>
          ))}
        <div className=" flex justify-center mt-3" onClick={resetData}>
          <ButtonDis title={"Refresh"} />
        </div>
      </div>
      <Loader title={"Please Wait"} onClick={loader} />
    </div>
  );
};

export default TestCancellation;
