import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import { useSelector } from "react-redux";
import axios from "axios";
import { SuccessAlert, ErrorAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
const ParentParty = () => {
  const [name, setName] = useState("");
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item?.response);

  const submitHandler = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/partyparent`,
        { name, createdUser: userData[0].userId },
        { withCredentials: true }
      );
      SuccessAlert({ text: "PARENT CREATED SUCCESSFULLY!!!", timer: 2000 });
      setName("");
      setOpen(false);
    } catch (error) {
      ErrorAlert({ text: error.message });
      console.log("Error of submit handler", error);
      setOpen(false);
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Parent Party Name"} />
      <div className="flex flex-col items-center space-y-2 mt-2">
        <LabeledInput
          label={"Parent Party Name"}
          placeholder={"Enter Parent Party Name"}
          onChange={(e) => setName(e.target.value.toUpperCase())}
          value={name}
        />
        <div className="flex justify-center space-x-2">
          <ButtonDis title={"Save"} onClick={submitHandler} />
          <ButtonDis
            title={"Refresh"}
            onClick={(e) => {
              setName("");
            }}
          />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default ParentParty;
