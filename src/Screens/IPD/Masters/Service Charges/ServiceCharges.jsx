import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import Loader from "../../../../Components/Modal/Loader";
import PartyModal from "../../../../Components/Modal/PartyModal";

const ServiceCharges = () => {
  // state variables
  const partyDetails = [{ name: "--" }, { name: "Cash" }];
  const [ward, setWard] = useState([]);
  const [parentServiceName, setParentServiceName] = useState([]);
  const [party, setParty] = useState("");
  const [wardName, setWardName] = useState("");
  const [serviceChargesData, setServiceChargesData] = useState([]);
  const [_id, set_id] = useState("");
  const [parentName, setParentName] = useState("");
  const [response, setResponse] = useState(false);
  const [open, setOpen] = useState(false);

  // useEffects
  useEffect(() => {
    wardNames();
    parentService();
  }, [response]);

  // reducx call
  const url = useSelector((item) => item?.url);
  const userData = useSelector((item) => item.response);
  console.log("userData", userData);

  // api(s)
  const wardNames = async () => {
    try {
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
      console.log("response of ward Name", response);
    } catch (error) {
      console.log("error of ward name", error);
    }
  };

  const parentService = async () => {
    try {
      const response = await axios.get(`${url}/parentservice`, {
        withCredentials: true,
      });
      setParentServiceName(response.data.data);
    } catch (error) {
      console.log("error of parent service", error);
    }
  };

  const callData = async (name) => {
    try {
      setParentName(name);
      const response = await axios.get(
        `${url}/servicecharges?party=${party}&wardName=${wardName}&parentName=${name}`,
        { withCredentials: true }
      );
      console.log("response of call Data", response.data.data);
      console.log("response of call Data", response.data._id);
      setServiceChargesData(response.data.data);
      if (response.data._id) {
        set_id(response.data._id);
        return;
      }
    } catch (error) {
      console.log("error of call data", error);
    }
  };

  const submitHandler = async () => {
    setOpen(true);
    try {
      const submitData = await axios.post(
        `${url}/servicecharges`,
        {
          parentName,
          wardName,
          party,
          serviceDetails: serviceChargesData,
          updatedUser: userData[0].userId,
          _id,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response of submit data", submitData);
      setServiceChargesData([]);
      setParentServiceName([]);
      set_id("");
      setResponse(!response);
      setParty("");
      setWardName("");
      setWard([]);
      SuccessAlert({ text: "DATA SAVED SUCCESSFULLY 🎉🎉" });
      setOpen(false);
    } catch (error) {
      console.log("Error Of Handler Submit", error);
      setOpen(false);
    }
  };

  // FUNCTIONS
  const reset = () => {
    setWard([]);
    setParentServiceName([]);
    setServiceChargesData([]);
    set_id("");
    setWardName("");
    setResponse(!response);
  };
  const reset2 = () => {
    setParentServiceName([]);
    setServiceChargesData([]);
    set_id("");
    setResponse(!response);
  };

  const handleDropDownParty = (name) => {
    console.log("Selected Name:", name);
    setParty(name);
    reset();
    // setSelectedName(name);
  };
  const handleDropDownWard = (name) => {
    console.log("Selected Name:", name);
    setWardName(name);
    // setSelectedName(name);
  };
  const checkPrevious = (value) => {
    if (value === "wardName") {
      if (party === "")
        ErrorAlert({ text: "PLEASE SELECT PARTY FIRST", timer: 1500 });
      reset2();
      return;
    }
    if (value === "serviceName") {
      if (wardName === "") {
        ErrorAlert({ text: "PLEASE SELECT WARD NAME FIRST!!!", timer: 1500 });
      }
      return;
    }
  };
  const handlerEffect = (value, id, name) => {
    const newData = serviceChargesData.map((items) => {
      if (items?.serviceId === id) {
        if (name === "charges") {
          return { ...items, charges: +value };
        }
        if (name === "status") {
          return { ...items, status: value };
        }
      }
      return items;
    });
    setServiceChargesData(newData);
    console.log(newData);
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Wise Service Charges"} />

      <div className="md:grid md:grid-cols-3 md:justify-items-center md:items-center">
        <PartyModal
          title={"Select Party Name"}
          onClick={(e) => handleDropDownParty(e?.name)}
        />
        <SimpleDropDown
          DropDownLabel={"Ward Name"}
          data={ward.length > 0 ? ward : []}
          onChange={handleDropDownWard}
          onClick={() => {
            checkPrevious("wardName");
          }}
        />
        <SimpleDropDown
          DropDownLabel={"Service Name"}
          data={parentServiceName.length > 0 ? parentServiceName : []}
          onChange={callData}
          onClick={() => {
            checkPrevious("serviceName");
          }}
        />
      </div>
      {party && (
        <div className="text-sm flex justify-center mt-4 font-bold text-red-600">
          SELECTED PARTY IS <span className="text-blue-700 ml-1">{party}</span>
        </div>
      )}
      {serviceChargesData && (
        <div>
          <div className="container mx-auto mt-3">
            <div className="mt-3 grid grid-cols-4 text-xs justify-items-center  items-center h-16 border border-gray-300">
              <p>Serial No.</p>
              <p>Service Name</p>
              <p>Charges</p>
              <p>Status</p>
            </div>
          </div>
          {serviceChargesData &&
            serviceChargesData.map((items, index) => (
              <div className="container mx-auto mt-3">
                <div
                  className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300"
                  key={index}
                >
                  <p>{index + 1}</p>
                  <p>{items?.serviceName}</p>
                  <p>
                    <input
                      type="number"
                      className="w-24 rounded-xl p-1 border-gray-900 border-2"
                      placeholder="Charges"
                      name=""
                      value={items?.charges}
                      onChange={(e) =>
                        handlerEffect(
                          e.target.value,
                          items.serviceId,
                          "charges"
                          // items?.bedId
                        )
                      }
                      // id=""
                    />
                  </p>
                  <p>
                    <input
                      type="checkbox"
                      checked={items?.status}
                      name=""
                      id=""
                      onChange={(e) =>
                        handlerEffect(
                          e.target.checked,
                          items.serviceId,
                          "status"
                        )
                      }
                    />
                  </p>
                </div>
              </div>
            ))}
          {serviceChargesData.length > 0 && (
            <div className="flex justify-center my-4">
              <SimpleButton title={"Submit"} onClick={submitHandler} />
            </div>
          )}
        </div>
      )}
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default ServiceCharges;
