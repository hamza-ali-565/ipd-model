import React, { useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import axios from "axios";
import { useSelector } from "react-redux";
import { SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";

const ServiceReversal = () => {
  const [mrInfo, setmrInfo] = useState(null);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item?.url);
  const userData = useSelector((state) => state?.response);

  // api
  const PickDetail = async (e) => {
    setOpen(true);
    try {
      setmrInfo(e);
      const response = await axios.get(
        `${url}/internalservice?admissionNo=${e?.admissionNo}`,
        { withCredentials: true }
      );
      console.log("Response of pick details", response.data.data);
      setServiceDetails(response.data.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of pick details", error);
      setServiceDetails([]);
      setOpen(false);
    }
  };
  //   api
  const updateData = async (_id) => {
    try {
      const response = await axios.put(
        `${url}/internalservice`,
        { _id, deletedUser: userData[0]?.userId },
        { withCredentials: true }
      );
      console.log("response of update Data", response.data);
      PickDetail(mrInfo);
      SuccessAlert({ text: "DATA DELETED SUCCESSFULLY", timer: 1000 });
    } catch (error) {
      console.log("Error of update Data", error);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Service Reversal"} />

        <div className="flex justify-center my-2">
          <AdmissionModal
            title={"Select Admission No."}
            onClick={(e) => PickDetail(e)}
          />
        </div>
        {mrInfo !== null && (
          <div className="md:flex md:justify-center md:space-x-4">
            <p className="text-center">
              <span className="font-bold">Patient Name:</span>{" "}
              {mrInfo.patientType} {mrInfo.patientName} {mrInfo.relativeType}{" "}
              {mrInfo.relativeName}
            </p>
            <p className="text-center">
              {" "}
              <span className="font-bold">Admission No:</span>{" "}
              {mrInfo?.admissionNo}
            </p>
          </div>
        )}
      </div>
      {/* services Details */}
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
          serviceDetails?.map((items, index) => (
            <div className="container mx-auto mt-3" key={index}>
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.serviceName}</p>
                <p>
                  {items?.charges} X {items?.amount / items?.charges}
                </p>
                <p>{items?.amount}</p>
                <p
                  className="font-bold underline cursor-pointer hover:text-red-600"
                  onClick={() => updateData(items?.uniqueServiceId)}
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

export default ServiceReversal;
