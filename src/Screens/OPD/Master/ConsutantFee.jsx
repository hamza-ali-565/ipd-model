import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import PartyModal from "../../../Components/Modal/PartyModal";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";

const ConsutantFee = () => {
  const [party, setParty] = useState(null);
  const [consultant, setConsultant] = useState(null);
  const [amount, setAmount] = useState(0);
  const [open, setOpen] = useState(false);
  const [consData, setConstData] = useState([]);

  const url = useSelector((state) => state?.url);

  const updateParty = (name) => {
    if (!consultant) {
      ErrorAlert({ text: "PLEASE SELECT CONSULTANT FIRST !!!", timer: 2000 });
      return;
    }
    setParty(name);
  };

  const resetData = () => {
    setParty(null);
    setConsultant(null);
    setAmount(0);
  };
  const resetData2 = () => {
    setParty(null);
    setAmount(0);
  };

  const updateAmount = (charges) => {
    setAmount(charges);
  };

  const createDocOfConsCharges = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/opd/opdConsCharges`,
        {
          consultantName: consultant?.name,
          consultantId: consultant?._id,
          party: party?.name,
          partyId: party?._id,
          amount,
        },
        { withCredentials: true }
      );
      SuccessAlert({ text: "CONSULTANT CREATED SUCCESSFULLY", timer: 2000 });
      console.log("response of createDocOfConsCharges", response);
      setOpen(false);
      getSpecificConsultant(consultant)
      setAmount(0)
      setParty(null)
    } catch (error) {
      console.log("Error of createDocOfConsCharges", error);
      setOpen(false);
    }
  };

  const getSpecificConsultant = async (name) => {
    setOpen(true)
    try {
      const response = await axios.get(
        `${url}/opd/findDrCharges?consultantId=${name?._id}`,
        { withCredentials: true }
      );
      console.log("Response of getSpecificConsultant", response.data.data.data);
      setConstData(response.data.data.data);
      setOpen(false)
    } catch (error) {
      console.log("Error of getSpecificConsultant", error);
      setConstData([])
      setOpen(false)
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Fee"} />
        <div className="flex justify-center items-center flex-col space-y-3 mt-3">
          <div className="flex space-x-2">
            <ConsultantModal
              title={"Select Consultant Name"}
              onClick={(name) => {
                setConsultant(name);
                resetData2();
                getSpecificConsultant(name);
              }}
            />
            <PartyModal
              title={"Select Party Name"}
              onClick={(name) => updateParty(name)}
            />
          </div>
          <LabeledInput
            label={"Amount"}
            placeholder={"Enter Amonunt"}
            onChange={(e) => {
              updateAmount(e.target.value);
            }}
            value={amount}
          />
          {party && (
            <LabeledInput
              label={"Selected Party"}
              placeholder={"Selected Party"}
              disabled={true}
              value={(party && party?.name) || ""}
            />
          )}
          {consultant && (
            <LabeledInput
              label={"Selected Consultant"}
              placeholder={"Selected Consultant"}
              value={(consultant && consultant?.name) || ""}
            />
          )}
        </div>
        <div className="flex justify-center space-x-3 mt-3">
          <ButtonDis title={"Save"} onClick={createDocOfConsCharges} />
          <ButtonDis title={"Refresh"} onClick={resetData} />
        </div>

        <Loader onClick={open} title={"Please Wait ..."} />
      </div>
      <div className="container mx-auto mt-3">
        <div className="mt-3 grid grid-cols-5 text-xs justify-items-center items-center h-16 border border-gray-300">
          <p>Consultant Name</p>
          <p>Party Name</p>
          <p>Amount</p>
          <p>Created User</p>
          <p>Update</p>
        </div>
        {consData &&
          consData.map((items, index) => (
            <div className="mt-3 grid grid-cols-5 text-xs justify-items-center items-center h-10 border border-gray-300">
              <p>{items?.consultantName}</p>
              <p>{items?.party}</p>
              <p>{items?.amount}</p>
              <p>{items?.createdUser}</p>
              <p
                className="text-red-500 font-bold hover:text-red-700 cursor-pointer"
                // onClick={() => setUpdateName(items)}
              >
                Update
              </p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default ConsutantFee;
