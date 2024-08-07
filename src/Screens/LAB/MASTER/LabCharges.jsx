import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import PartyModal from "../../../Components/Modal/PartyModal";
import axios from "axios";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";
import ButtonDis from "../../../Components/Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";

const LabCharges = () => {
  const [party, setParty] = useState(null);
  const [chargesDetails, setChargesDetails] = useState([]);
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item?.url);

  // reset page
  const reset = () => {
    setChargesDetails([]);
    setParty(null);
  };

  // get previous charges
  const getChargesDetails = async (data) => {
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

  // handle set value charges details
  const handlerEffect = (charges, id, value) => {
    const updateChargesDetails = chargesDetails.map((items) => {
      if (items?.testId === id) {
        if (value === "charges") {
          return { ...items, charges: +charges };
        } else if (value === "status") {
          return { ...items, status: charges };
        }
      }
      return items;
    });
    setChargesDetails(updateChargesDetails);
  };

  const CheckValidation =  () => {
    try {
      if (party === null) {
        throw new Error("PLEASE SELECT PARTY FIRST !!!");
      } else if (chargesDetails?.length <= 0) {
        throw new Error("PLEASE ENTER VALUE IN CHARGES DETAILS !!!");
      }
       submitData()
    } catch (error) {
      ErrorAlert({ text: error?.message, timer: 2000 });
    }
  };

  // Submit data
  const submitData = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/lab/testsChargesPush`,
        {
          partyName: party?.name,
          partyId: party?._id,
          labDetails: chargesDetails,
        },
        { withCredentials: true }
      );
      setOpen(false);
      SuccessAlert({
        text: `LAB CHARGES CREATED/UPDATED AGAINST PARTY ${party?.name}`,
        timer: 1000,
      });
      console.log(response);

      reset();
    } catch (error) {
      setOpen(false);
      console.log("Error of submit Data ", error);
      setChargesDetails([])
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
                  <p className="">
                    <input
                      type="number"
                      className="w-24 rounded-xl p-1"
                      placeholder="Charges"
                      min={0}
                      name=""
                      value={items?.charges}
                      onChange={(e) =>
                        handlerEffect(e.target.value, items?.testId, "charges")
                      }
                      id=""
                    />
                  </p>
                  <p className="">
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      checked={items?.status}
                      onChange={(e) =>
                        handlerEffect(e.target.checked, items?.testId, "status")
                      }
                    />
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex flex-col items-center space-y-2 md:flex-row md:space-y-0 md:space-x-2 justify-center">
        <ButtonDis title={"Save"} onClick={CheckValidation} />
        <ButtonDis title={"Refresh"} onClick={reset} />
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default LabCharges;
