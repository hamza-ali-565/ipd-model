import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import PartyModal from "../../../Components/Modal/PartyModal";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { ErrorAlert } from "../../../Components/Alert/Alert";
import ButtonDis from "../../../Components/Button/ButtonDis";

const ConsutantFee = () => {
  const [party, setParty] = useState(null);
  const [consultant, setConsultant] = useState(null);
const [amount, setAmount] = useState(0)
  const consultantUpdate = (name) => {
    if (!party)
      ErrorAlert({ text: "PLEASE SELECT PARTY FIRST !!!", timer: 2000 });
    setConsultant(name);
  };

  const resetData = ()=>{
setParty(null)
setConsultant(null)
setAmount(0)
  }


  const updateAmount = (charges)=>{
setAmount(charges)
  }
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant Fee"} />
      <div className="flex justify-center items-center flex-col space-y-3 mt-3">
        <div className="flex space-x-2">
          <PartyModal
            title={"Select Party Name"}
            onClick={(name) => setParty(name)}
          />
          <ConsultantModal
            title={"Select Consultant Name"}
            onClick={consultantUpdate}
          />
        </div>
        <LabeledInput label={"Amount"} placeholder={"Enter Amonunt"} onChange={(e)=>{updateAmount(e.target.value)}} value={amount}/>
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
<ButtonDis title={"Save"}/>
<ButtonDis title={"Refresh"} onClick={resetData}/>
      </div>
    </div>
  );
};

export default ConsutantFee;
