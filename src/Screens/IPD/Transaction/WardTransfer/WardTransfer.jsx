import React, { useEffect } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SimpleInput from "../../../../Components/SimpleInput/SimpleInput";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import SimpleBackdrop from "../../../../Components/CenterLoader/CenterLoader";
import Loader from "../../../../Components/Modal/Loader";

const WardTransfer = () => {
  const [mrInfo, setmrInfo] = useState(null);
  const [wardDetails, setWardDetails] = useState([]);
  const [ward, setWard] = useState([]);
  const [bed, setBed] = useState([]);
  const [bedNo, setBBedNo] = useState("");
  const [bedId, setBedId] = useState("");
  const [wardName, setWardName] = useState("");
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item?.url);
  const userData = useSelector((state) => state?.response);

  useEffect(() => {
    wardNames();
  }, []);

  const getWard = async (data) => {
    try {
      setmrInfo(data);
      console.log("data", data);
      const response = await axios.get(
        `${url}/activeward?admissionNo=${data?.admissionNo}`,
        { withCredentials: true }
      );
      console.log("response of getWard", response.data.data);
      setWardDetails(response?.data?.data);
      wardNames();
    } catch (error) {
      console.log("Error of getWard", error);
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

  const changeBed = async () => {
    try {
      if (wardName === "" || wardName === "--") {
        ErrorAlert({ text: "PLEASE SELECT NEW WARD", timer: 2000 });
        return;
      }
      if (bedNo === "" || bedNo === "--") {
        ErrorAlert({ text: "PLEASE SELECT NEW BED", timer: 2000 });
        return;
      }
      setOpen(true);
      const response = await axios.post(
        `${url}/wardChange`,
        {
          wardName,
          admissionNo: mrInfo?.admissionNo,
          mrNo: mrInfo?.mrNo,
          bedNo,
          bedId,
          createdUser: userData[0]?.userId,
        },
        { withCredentials: true }
      );
      console.log("response of changeBed", response.data.data);
      SuccessAlert({ text: "WARD CHANGE SUCCESSFULLLY", timer: 2000 });
      ResetPage();
      setOpen(false);
    } catch (error) {
      console.log("Error of bedChange", error);
      ErrorAlert({ text: error?.response?.data?.message });
      setOpen(false);
    }
  };

  //   function
  const resetBed = () => {
    setBed([]);
  };

  const checkbedId = (e) => {
    const filteredData = bed.filter((items) => e === items?.name);
    console.log("filterd Data", filteredData);
    setBBedNo(e);
    setBedId(filteredData[0]._id);
  };

  const ResetPage = () => {
    setmrInfo(null);
    setWardDetails([]);
    setWard([]);
    setBed([]);
    setBBedNo("");
    setBedId("");
    setWardName("");
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Ward Transfer"} />

        <div className="flex justify-center">
          <AdmissionModal
            title={"Select Admission No."}
            onClick={(e) => getWard(e)}
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
        {mrInfo !== null && (
          <div className="md:grid md:grid-cols-2">
            {/* Current Bed */}

            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Current Ward"} />
              <div className="flex flex-col items-center space-y-2 mt-2">
                <SimpleInput
                  disabled={true}
                  value={
                    wardDetails[0]?.wardName ? wardDetails[0]?.wardName : ""
                  }
                  placeholder={"Previouse Ward Name"}
                />

                <SimpleInput
                  disabled={true}
                  value={
                    wardDetails[0]?.bedNumber ? wardDetails[0]?.bedNumber : ""
                  }
                  placeholder={"Previous Ward Name"}
                />
              </div>
            </div>
            {/* Change To Bed */}
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Change To Ward"} />

              <div>
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
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-center space-x-2 mt-4">
          <ButtonDis
            title={"Save"}
            onClick={changeBed}
            disabled={mrInfo === null ? true : false}
          />

          <ButtonDis title={"Refresh"} onClick={ResetPage} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default WardTransfer;
