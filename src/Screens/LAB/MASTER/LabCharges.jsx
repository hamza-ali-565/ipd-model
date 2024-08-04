import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import PartyModal from "../../../Components/Modal/PartyModal";
import axios from "axios";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";

const LabCharges = () => {
  const [party, setParty] = useState(null);
  const [chargesDetails, setChargesDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item?.url);

  const getChargesDetails = async (data) => {
    console.log(data);
    
    try {
      setOpen(true);
      setParty(data);
      const response = await axios.get(
        `${url}/lab/testsCharges?partyName=${data?.name}&partyId=${data?._id}`,
        { withCredentials: true }
      );
      console.log("response of getChargesDetails", response.data.data.data);
      setChargesDetails(response?.data?.data?.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of getChargesDetails", error);
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"LABORATORY CHARGES"} />
        <div className="my-2 flex flex-col items-center space-y-2">
          <PartyModal title={"Select Party"} onClick={getChargesDetails} />
          {party && (
            <p className="text-blue-600 font-bold text-xl">
              Seleced Party is {party?.name}
            </p>
          )}
        </div>
        {chargesDetails.length > 0 && (
          <div>
            {/* header */}
            <div className="container mx-auto mt-3">
              <div className="grid grid-cols-4 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
                <p className="">Test Code</p>
                <p className="">Test Name</p>
                <p className="">Charges</p>
                <p className="">Status</p>
              </div>
            </div>

            {/* mapped data */}
            {chargesDetails.map((items, index) => (
              <div className="container mx-auto mt-3" key={index}>
                <div className="grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                  <p className="">{items?.testCode}</p>
                  <p className="">{items?.testName}</p>
                  <p className="">{items?.charges}</p>
                  <p className="">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={items?.status}
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default LabCharges;
