import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";

const ServiceName = () => {
  const [parentData, setParentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");
  const [serviceData, setServiceData] = useState([]);
  const [specificItem, setSpecificItem] = useState(null);

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
    setSpecificItem(null);
  };

  const getParents = async () => {
    try {
      const response = await axios.get(`${url}/parentservicename`, {
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
        throw new Error("PLEASE SELECT PARENT NAME!!!");
      const response = await axios.post(
        `${url}/service`,
        {
          serviceName: name,
          parentName: parent,
          createdUser: userData[0].userId,
          _id: "",
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
      const response = await axios.get(`${url}/service?parentName=${name}`, {
        withCredentials: true,
      });
      setServiceData(response.data.data);

      setOpen(false);
    } catch (error) {
      console.log("Error of getservices", error);
      setOpen(false);
    }
  };

  const changeName = (e) => {
    const newName = e.target.value.toUpperCase();
    if (specificItem) {
      setSpecificItem({ ...specificItem, serviceName: newName });
    } else {
      setName(newName);
    }
  };
  const updateHandler = async () => {
    try {
      setOpen(true);
      const response = await axios.put(
        `${url}/updateservicename`,
        {
          serviceName: specificItem?.serviceName,
          serviceId: specificItem?._id,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "SERVICE UPDATED SUCCESSFULLY !!!", timer: 500 });
      setOpen(false);
      setSpecificItem(null);
      getServices(parent);
    } catch (error) {
      console.log("Error of update handler", updateHandler);
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Party Name"} />
        <div className="flex flex-col items-center space-y-2">
          <SimpleDropDown
            DropDownLabel={"Select Parent"}
            data={(parentData && parentData) || []}
            onChange={(e) => getServices(e)}
          />
          <LabeledInput
            label={"Service Name"}
            placeholder={"Enter Service Name"}
            value={(specificItem && specificItem?.serviceName) || name}
            onChange={(e) => changeName(e)}
          />
          <div className="flex justify-center space-x-2">
            <ButtonDis
              title={(specificItem && "Update") || "Save"}
              onClick={specificItem === null ? submitHandler : updateHandler}
            />
            <ButtonDis title={"Refresh"} onClick={resetData} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <div className="mt-3 grid grid-cols-5 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p>Service Name</p>
          <p>Parent Name</p>
          <p>Created User</p>
          <p>Created Date</p>
          <p>Update</p>
        </div>
      </div>
      {serviceData.length > 0 &&
        serviceData?.map((items, index) => (
          <div className="container mx-auto mt-3" key={index}>
            <div className="mt-3 grid grid-cols-5 text-xs justify-items-center items-center h-10 border border-gray-300">
              <p>{items?.serviceName}</p>
              <p>{items?.parentName}</p>
              <p>{items?.createdUser}</p>
              <p>
                {(items?.updatedOn && items?.updatedOn) ||
                  (items?.createdOn && items?.createdOn)}
              </p>
              <p
                className="text-red-500 font-bold hover:text-red-800 cursor-pointer underline"
                onClick={(e) => setSpecificItem(items)}
              >
                UPDATE
              </p>
            </div>
          </div>
        ))}
      <Loader onClick={open} title={"Please Wait..."} />
    </div>
  );
};

export default ServiceName;
