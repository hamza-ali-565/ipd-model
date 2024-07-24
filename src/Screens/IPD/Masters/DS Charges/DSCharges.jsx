import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import Loader from "../../../../Components/Modal/Loader";
import PartyModal from "../../../../Components/Modal/PartyModal";

const DSCharges = () => {
  const [parentservice, setParentService] = useState([]);
  const [party, setParty] = useState("");
  const [parentName, setParentName] = useState("");
  const [serviceDetails, setServiceDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);
  // redux data
  const url = useSelector((item) => item.url);
  const UserData = useSelector((item) => item.response);
  const partyDetails = [{ name: "--" }, { name: "Cash" }];

  // useEffect
  useEffect(() => {
    parentServiceName();
  }, [toggle]);

  // api
  const parentServiceName = async () => {
    try {
      const response = await axios.get(`${url}/parentservice`, {
        withCredentials: true,
      });
      setParentService(response.data.data);
      // console.log("response of parent service name", response);
    } catch (error) {
      console.log("Error of parent service name", error);
    }
  };
  const callData = async (name) => {
    try {
      setParentName(name);
      const response = await axios.get(
        `${url}/dscharges?party=${party}&parentName=${name}`,
        { withCredentials: true }
      );
      setServiceDetails(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.log("Error of callData", error);
    }
  };
  const handlerSubmit = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/dscharges`,
        {
          party,
          parentName,
          serviceDetails,
          updatedUser: UserData[0].userId,
        },
        { withCredentials: true }
      );
      setToggle(!toggle);
      SuccessAlert({ text: "DATA SAVED SUCCESSFULLY", timer: 1500 });
      Empty();
      setOpen(false);
    } catch (error) {
      console.log("Error of handler submit", error);
      setOpen(false);
    }
  };
  //   functions
  const handleDropDownChange = (name) => {
    setParty(name);
    Empty();
    setToggle(!toggle);
  };

  const partyCheck = () => {
    if (party === "") {
      ErrorAlert({ text: "PLEASE SELECT PARTY FIRST!!!", timer: 1000 });
      return;
    }
  };

  const handlerEffect = (value, id, key) => {
    const updatedData = serviceDetails.map((item) => {
      if (item?.serviceId === id) {
        if (key === "charges") {
          return { ...item, charges: +value };
        }
        if (key === "status") {
          return { ...item, status: value };
        }
      }
      return item;
    });
    setServiceDetails(updatedData);
    console.log("updated data ", updatedData);
    return;
  };
  const Empty = () => {
    setParentName("");
    setServiceDetails([]);
    setParentService([]);
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Direct Service Charges"} />

      <div className="md:grid md:grid-cols-2 md:justify-items-center md:items-center">
        <PartyModal
          title={"Select Party Name"}
          onClick={(e) => handleDropDownChange(e?.name)}
        />
        <SimpleDropDown
          DropDownLabel={"Service Name"}
          data={parentservice.length > 0 ? parentservice : []}
          onChange={callData}
          onClick={partyCheck}
        />
      </div>
      {party && (
        <div className="text-sm flex justify-center mt-4 font-bold text-red-600">
          SELECTED PARTY IS <span className="text-blue-700 ml-1">{party}</span>
        </div>
      )}
      {/* table header */}
      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p className="">S. No</p>
          <p className="">Service Name</p>
          <p className="">Charges</p>
          <p className="">Status</p>
        </div>
      </div>
      {/* table data */}
      {serviceDetails.length > 0 &&
        serviceDetails.map((items, index) => (
          <div className="container mx-auto mt-3">
            <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
              <p>{index + 1}</p>
              <p>{items?.serviceName}</p>
              <p>
                <input
                  type="number"
                  className="w-24 rounded-xl p-1"
                  placeholder="Charges"
                  min={0}
                  name=""
                  value={items?.charges}
                  onChange={(e) =>
                    handlerEffect(e.target.value, items?.serviceId, "charges")
                  }
                  id=""
                />
              </p>
              <p>
                <input
                  type="checkbox"
                  checked={items?.status}
                  onChange={(e) =>
                    handlerEffect(e.target.checked, items?.serviceId, "status")
                  }
                />
              </p>
            </div>
          </div>
        ))}
      {serviceDetails.length > 0 && (
        <div className="flex justify-center my-4">
          <SimpleButton title={"Submit"} onClick={handlerSubmit} />
        </div>
      )}
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default DSCharges;
