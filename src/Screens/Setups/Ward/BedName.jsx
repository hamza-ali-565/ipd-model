import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";

const BedName = () => {
  const [parentData, setParentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");
  const [serviceData, setServiceData] = useState([]);

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item?.response);

  useEffect(() => {
    getParents();
  }, []);

  const resetData = () => {
    setParent("");
    setName("");
    setParentData([]);
    getParents();
    setServiceData([]);
  };

  const getParents = async () => {
    try {
      const response = await axios.get(`${url}/getward`, {
        withCredentials: true,
      });
      setParentData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error of getData", error);
    }
  };

  const submitHandler = async () => {
    setOpen(true);
    try {
      if (!parent || parent === "--")
        throw new Error("PLEASE SELECT Ward NAME!!!");
      const response = await axios.post(
        `${url}/ipdbeds`,
        {
          bedNumber: name,
          wardName: parent,
          createdUser: userData[0].userId,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "SERVICE CREATED SUCCESSFULLY !!!", timer: 2000 });
      setOpen(false);
      resetData();
      console.log(response);
    } catch (error) {
      console.log("Error of submit handler", error);
      ErrorAlert({ text: error.message });
      setOpen(false);
    }
  };

  const getServices = async (name) => {
    setOpen(true);
    try {
      setParent(name);
      const response = await axios.get(`${url}/ipdbeds?wardName=${name}`, {
        withCredentials: true,
      });
      setServiceData(response.data.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of getservices", error);
      setServiceData([])
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Bed Name"} />
        <div className="flex flex-col items-center space-y-2">
          <SimpleDropDown
            DropDownLabel={"Select Ward Name"}
            data={(parentData && parentData) || []}
            onChange={(e) => getServices(e)}
          />
          <LabeledInput
            label={"Bed Name"}
            placeholder={"Enter Bed Name"}
            value={name}
            onChange={(e) => setName(e.target.value.toUpperCase())}
          />
          <div className="flex justify-center space-x-2">
            <ButtonDis title={"Save"} onClick={submitHandler} />
            <ButtonDis title={"Refresh"} onClick={resetData} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p>Ward Name</p>
          <p>Bed Name</p>
          <p>Created User</p>
          <p>Created Date</p>
        </div>
      </div>
      {serviceData.length > 0 &&
        serviceData?.map((items, index) => (
          <div className="container mx-auto mt-3" key={index}>
            <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
              <p>{items?.wardName}</p>
              <p>{items?.bedNumber}</p>
              <p>{items?.createdUser}</p>
              <p>{items?.createdOn}</p>
            </div>
          </div>
        ))}
      <Loader onClick={open} title={"Please Wait..."} />
    </div>
  );
};

export default BedName;
