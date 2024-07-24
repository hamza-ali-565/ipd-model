import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";

const Consultant = () => {
  const [name, setName] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [pmdc, setPmdc] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item?.response);

  const resetFunction = () => {
    setName("");
    setSpeciality("");
    setPmdc("");
    setAddress("");
    setEmail("");
    setCnic("");
    setPhone("");
    setStatus(false);
    setDetails(null);
  };

  const updateDetails = (data) => {
    setDetails(data);
    setName(data?.name);
    setSpeciality(data?.speciality);
    setPmdc(data?.pmdc);
    setAddress(data?.address);
    setEmail(data?.email);
    setCnic(data?.cnic);
    setPhone(data?.phone);
    setStatus(data?.status);
  };

  const submitData = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/adddoctor`,
        {
          name,
          speciality,
          pmdc,
          address,
          email,
          cnic,
          phone,
          status,
          createdUser: userData[0].userId,
          _id: (details && details?._id) || "",
        },
        { withCredentials: true }
      );
      setOpen(false);
      if (response?.data?.message === "created") {
        SuccessAlert({ text: "DOCTOR CREATED SUCCESSFULLY !!!", timer: 2000 });
      }
      if (response?.data?.message === "update") {
        SuccessAlert({ text: "DOCTOR UPDATED SUCCESSFULLY !!!", timer: 2000 });
      }
      resetFunction();
    } catch (error) {
      console.log("Error of submit data", error);
      setOpen(false);
      ErrorAlert({ text: "DOCTOR CREATION FAILED !!!" });
    }
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant"} />
      <div className="flex justify-center my-4">
        <ConsultantModal
          title={"Select Consultant"}
          onClick={(e) => updateDetails(e)}
          All="Ok"
        />
      </div>
      <div className="flex flex-col items-center space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center md:gap-y-2">
        <LabeledInput
          label={"Name"}
          placeholder={"Please Enter Name"}
          value={name}
          onChange={(e) => setName(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Speciality"}
          placeholder={"Speciality"}
          value={speciality}
          onChange={(e) => setSpeciality(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"PMDC"}
          placeholder={"PMDC"}
          value={pmdc}
          onChange={(e) => setPmdc(e.target.value.toUpperCase())}
        />

        <LabeledInput
          label={"Address"}
          placeholder={"Address"}
          value={address}
          onChange={(e) => setAddress(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Email"}
          placeholder={"Email"}
          value={email}
          onChange={(e) => setEmail(e.target.value.toLowerCase())}
        />
        <LabeledInput
          label={"CNIC"}
          placeholder={"CNIC"}
          value={cnic}
          onChange={(e) => setCnic(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Phone"}
          placeholder={"Phone"}
          value={phone}
          onChange={(e) => setPhone(e.target.value.toUpperCase())}
        />
        <LabeledInput
          label={"Status"}
          type={"checkbox"}
          checked={status}
          onChange={(e) => setStatus(e.target.checked)}
        />
      </div>
      <div className="flex flex-col mt-4 items-center space-y-2 md:flex-row md:justify-center md:space-y-0 md:space-x-2">
        <ButtonDis title={"Save"} onClick={submitData} />
        <ButtonDis title={"Refresh"} onClick={resetFunction} />
      </div>
      <Loader onClick={open} title={"DATA SUBMITTING ..."} />
    </div>
  );
};

export default Consultant;
