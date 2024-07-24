import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import axios from "axios";
import { useSelector } from "react-redux";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import Loader from "../../../../Components/Modal/Loader";
import PartyModal from "../../../../Components/Modal/PartyModal";

const WardCharges = () => {
  const [ward, setWard] = useState([]);
  const [party, setParty] = useState("");
  const [wardName, setwardName] = useState("");
  const [wardCharges, setWardCharges] = useState([]);
  const [wardCharges_id, setWardCharges_id] = useState("");
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    wardNames();
  }, [toggle]);

  const url = useSelector((item) => item.url);
  const UserData = useSelector((item) => item.response);

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
  const handleDropDownChange = (name) => {
    console.log("Selected Name:", name);
    setParty(name);
    setWard([]);
    setWardCharges([]);
    setToggle(!toggle);
    // setSelectedName(name);
  };
  const partyCheck = () => {
    if (party === "") {
      ErrorAlert({ text: "PLEASE SELECT PARTY FIRST!!!", timer: 1500 });
      return;
    }
  };

  const callData = async (name) => {
    try {
      setwardName(name);
      const response = await axios.get(
        `${url}/ipdwardcharges?party=${party}&wardName=${name}`,
        { withCredentials: true }
      );
      console.log("response of ward charges", response.data);
      setWardCharges(response.data.data);
      if (response.data._id) {
        setWardCharges_id(response.data._id);
      }
    } catch (error) {
      console.log("error of ward charges", error);
    }
  };

  const handlerEffect = (value, _id, key, bedId) => {
    try {
      console.log("/n bed id", bedId, "/n id", _id);
      const newData = wardCharges.map((item, index) => {
        if (item.bedId === bedId) {
          if (key === "charges") {
            return { ...item, bedCharges: +value };
          } else if (key === "status") {
            return { ...item, status: value };
          }
        }

        return item;
      });
      setWardCharges(newData);
    } catch (error) {}
  };

  const submitHandler = async () => {
    console.log("userData", UserData);
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/ipdwardcharges`,
        {
          party,
          wardName,
          bedDetails: wardCharges,
          _id: wardCharges_id,
          updateUser: UserData[0].userId,
        },
        { withCredentials: true }
      );
      console.log("response of submit handler", response);
      SuccessAlert({ text: "DATA SAVED SUCCESSFULLY", timer: 1500 });
      setOpen(false);
      setWardCharges([]);
      setWard([]);
      setToggle(!toggle);
      setWardCharges_id("");
    } catch (error) {
      console.log("Error of submit Handler", error);
      ErrorAlert({ text: error.response.data.message, timer: 1500 });
      setOpen(false);
    }
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Party Wise Ward Charges"} />
      <div className="md:grid md:grid-cols-2 md:justify-items-center md:items-center">
        <PartyModal
          title={"Select Party Name"}
          onClick={(e) => handleDropDownChange(e?.name)}
        />
        <SimpleDropDown
          DropDownLabel={"Ward Name"}
          data={ward.length > 0 ? ward : []}
          onChange={callData}
          onClick={partyCheck}
        />
      </div>

      {party && (
        <div className="text-sm flex justify-center mt-4 font-bold text-red-600">
          SELECTED PARTY IS <span className="text-blue-700 ml-1">{party}</span>
        </div>
      )}

      {/* Charges table */}
      <div className="container mx-auto mt-3">
        <div className="mt-3 grid grid-cols-3 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p>Bed No.</p>
          <p>Charges</p>
          <p>Status</p>
        </div>
      </div>
      {wardCharges.length > 0 &&
        wardCharges.map((item, index) => (
          <div className="container mx-auto mt-3">
            <div className="mt-3 grid grid-cols-3 text-xs justify-items-center items-center h-10 border border-gray-300">
              <p>{item?.bedNumber}</p>
              <p>
                <input
                  type="number"
                  className="w-24 rounded-xl p-1"
                  placeholder="Charges"
                  name=""
                  value={item?.bedCharges}
                  onChange={(e) =>
                    handlerEffect(
                      e.target.value,
                      item._id,
                      "charges",
                      item?.bedId
                    )
                  }
                  id=""
                />
              </p>
              <p>
                <input
                  type="checkbox"
                  checked={item?.status}
                  name=""
                  id=""
                  onChange={(e) =>
                    handlerEffect(
                      e.target.checked,
                      item._id,
                      "status",
                      item?.bedId
                    )
                  }
                />
              </p>
            </div>
          </div>
        ))}
      {wardCharges.length > 0 && (
        <div className="flex justify-center my-4">
          <SimpleButton title={"Submit"} onClick={submitHandler} />
        </div>
      )}
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default WardCharges;
