import React, { useEffect, useState } from "react";
import PAgeTitle from "../../../../Components/Page Title/PAgeTitle";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import SimpleButton from "../../../../Components/Button/SimpleButton";
import Loader from "../../../../Components/Modal/Loader";
import PartyModal from "../../../../Components/Modal/PartyModal";

const ConsultantCharges = () => {
  const [ward, setWard] = useState([]);
  const [party, setParty] = useState("");
  const [wardName, setWardName] = useState("");
  const [consultantDetails, setConsultantDetails] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  // redux details
  const data = [{ name: "--" }, { name: "Cash" }];
  const url = useSelector((item) => item.url);
  const userId = useSelector((item) => item.response);

  //   useEffect
  useEffect(() => {
    wardNameResponse();
  }, [toggle]);

  // api(s)
  const wardNameResponse = async () => {
    try {
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
      console.log("response of ward names", response.data.data);
    } catch (error) {
      console.log("error of wardName", error);
    }
  };

  const handleCall = async (name) => {
    setWardName(name);
    if (name == "--") {
      Empty2();
      return;
    }
    try {
      const response = await axios.get(
        `${url}/consultantcharges?party=${party}&wardName=${name}`,
        { withCredentials: true }
      );
      console.log(response);
      setConsultantDetails(response.data.data);
    } catch (error) {
      console.log("Error of handleCall", error);
    }
  };

  const handleSubmit = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/consultantcharges`,
        {
          party,
          wardName,
          consultantDetails,
          updatedUser: userId[0].userId,
        },
        { withCredentials: true }
      );
      console.log("response of submit handler", response);
      Empty();
      SuccessAlert({ text: "DATA SAVED SUCCESSFULLY", timer: 1500 });
      setOpen(false);
    } catch (error) {
      console.log("Error of submit handler");
      setOpen(false);
    }
  };
  // funstions
  const handleDropDownChange = (name) => {
    console.log("Selected Name:", name);
    setParty(name);
    setWard([]);
    setConsultantDetails([]);
    setToggle(!toggle);
    // setSelectedName(name);
  };

  const previousCheck = () => {
    if (party === "") {
      ErrorAlert({ text: "PLEASE SELECT PARTY FIRST !!!" });
      return;
    }
  };

  const handlerEffect = (value, id, key) => {
    const updatedData = consultantDetails.map((item) => {
      if (item?.consultantId === id) {
        if (key === "charges") {
          return { ...item, charges: +value };
        }
        if (key === "status") {
          return { ...item, status: value };
        }
      }
      return item;
    });
    setConsultantDetails(updatedData);
    console.log(updatedData);
  };
  const Empty = () => {
    setConsultantDetails([]);
    setWardName("");
    setWard([]);
    setParty("");
    setToggle(!toggle);
  };
  const Empty2 = () => {
    setConsultantDetails([]);
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant Charges"} />
      {/* dropDowns */}
      <div className="md:grid md:grid-cols-2 md:justify-items-center md:items-center">
        <PartyModal
          title={"Select Party Name"}
          onClick={(e) => handleDropDownChange(e?.name)}
        />
        <SimpleDropDown
          DropDownLabel={"Ward"}
          data={ward.length > 0 ? ward : []}
          onClick={previousCheck}
          onChange={handleCall}
        />
      </div>

      {party && (
        <div className="text-sm flex justify-center mt-4 font-bold text-red-600">
          SELECTED PARTY IS <span className="text-blue-700 ml-1">{party}</span>
        </div>
      )}
      {/* data */}
      <div>
        {/* header */}
        <div className="container mx-auto mt-3">
          <div className="grid grid-cols-4 text-xs justify-items-center items-center h-16 border border-gray-300">
            <p className="">S. No</p>
            <p className="">Dr. Name</p>
            <p className="">Charges</p>
            <p className="">Status</p>
          </div>
        </div>

        {/* Detail */}
        {consultantDetails.length > 0 &&
          consultantDetails.map((items, index) => (
            <div className="container mx-auto mt-3">
              <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{index + 1}</p>
                <p>{items?.name}</p>
                <p>
                  <input
                    type="number"
                    className="w-24 rounded-xl p-1"
                    placeholder="Charges"
                    name=""
                    value={items?.charges}
                    onChange={(e) =>
                      handlerEffect(
                        e.target.value,
                        items.consultantId,
                        "charges"
                      )
                    }
                    id=""
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
                        items?.consultantId,
                        "status"
                      )
                    }
                  />
                </p>
              </div>
            </div>
          ))}
      </div>
      {consultantDetails.length > 0 && (
        <div className="flex justify-center my-4">
          <SimpleButton title={"Submit"} onClick={handleSubmit} />
        </div>
      )}
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default ConsultantCharges;
