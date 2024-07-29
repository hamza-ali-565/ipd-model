import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import SimpleDropDown from "../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";

const PartyName = () => {
  const [parentData, setParentData] = useState([]);
  const [open, setOpen] = useState(false);
  const [parent, setParent] = useState("");
  const [name, setName] = useState("");
  const [partyData, setPartyData] = useState([]);
  const [updateName, setUpdateName] = useState(null);

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
    setPartyData([]);
    setUpdateName(null);
  };

  const updateToVar = (name) => {
    if (updateName) {
      setUpdateName({ ...updateName, name: name.toUpperCase() });
      return;
    }

    setName(name.toUpperCase());
  };

  const getParents = async () => {
    try {
      const response = await axios.get(`${url}/partyparent`, {
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
        `${url}/partyname`,
        { name, parent, createdUser: userData[0].userId },
        { withCredentials: true }
      );
      SuccessAlert({ text: "PARTY CREATED SUCCESSFULLY !!!", timer: 2000 });
      setOpen(false);
      resetData();
    } catch (error) {
      console.log("Error of submit handler", error);
      ErrorAlert({ text: error.message });
      setOpen(false);
    }
  };

  const getParty = async (name) => {
    setOpen(true);
    try {
      setParent(name);
      const response = await axios.get(`${url}/party?parent=${name}`, {
        withCredentials: true,
      });
      setPartyData(response.data.data);
      setOpen(false);
      console.log("party names ", response.data.data);
    } catch (error) {
      console.log("Error of getservices", error);
      setOpen(false);
    }
  };

  const partyNameUpdate = async () => {
    setOpen(true);
    try {
      const response = await axios.put(
        `${url}/partyname`,
        { name: updateName?.name, partyId: updateName?._id },
        { withCredentials: true }
      );
      console.log(response.data.data);
      setOpen(false);
      SuccessAlert({ text: "PARTY NAME UPDATED SUCCESSFULLY" });
      setUpdateName(null);
      getParty(parent);
    } catch (error) {
      console.log("Error of partyNameUpdate", error);
      setOpen(false);
      ErrorAlert({ text: error?.message });
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
            onChange={(e) => getParty(e)}
          />
          <LabeledInput
            label={"Party Name"}
            placeholder={"Enter Party Service Name"}
            value={(updateName && updateName?.name) || name}
            onChange={(e) => updateToVar(e.target.value)}
          />
          <div className="flex justify-center space-x-2">
            <ButtonDis
              title={(updateName && "Update") || "Save"}
              onClick={(updateName && partyNameUpdate) || submitHandler}
            />
            <ButtonDis title={"Refresh"} onClick={resetData} />
          </div>
        </div>
      </div>
      <div className="container mx-auto mt-3">
        <div className="mt-3 grid grid-cols-5 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p>Party Name</p>
          <p>Parent Name</p>
          <p>Created User</p>
          <p>Created Date</p>
          <p>Update</p>
        </div>
      </div>
      {partyData.length > 0 &&
        partyData?.map((items, index) => (
          <div className="container mx-auto mt-3" key={index}>
            <div className="mt-3 grid grid-cols-5 text-xs justify-items-center items-center h-10 border border-gray-300">
              <p>{items?.name}</p>
              <p>{items?.parent}</p>
              <p>{items?.createdUser}</p>
              <p>{items?.createdOn}</p>
              <p
                className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                onClick={() => setUpdateName(items)}
              >
                Update
              </p>
            </div>
          </div>
        ))}

      <Loader onClick={open} title={"Please Wait..."} />
    </div>
  );
};

export default PartyName;
