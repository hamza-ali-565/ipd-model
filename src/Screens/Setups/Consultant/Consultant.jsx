import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import SpecialityModal from "../../../Components/Modal/SpecialityModal";

const Consultant = () => {
  const [name, setName] = useState("");
  const [specialityData, setSpecialityData] = useState(null);
  const [pmdc, setPmdc] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState(false);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState(null);
  const [speciality, setSpeciality] = useState("");
  const [updateSpeciality, setUpdateSpeciality] = useState(null);

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
    setSpecialityData(null);
  };

  const updateDetails = (data) => {
    setDetails(data);
    setName(data?.name);
    setSpecialityData({ speciality: data?.speciality });
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
          speciality: specialityData?.speciality,
          specialityId: specialityData?._id,
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

  const submitSpeciality = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/specialty`,
        {
          speciality:
            (updateSpeciality && updateSpeciality?.speciality) || speciality,
          _id: (updateSpeciality && updateSpeciality?._id) || "",
        },
        { withCredentials: true }
      );
  
      setSpeciality("");
      setUpdateSpeciality(null);
      setOpen(false);
      SuccessAlert({
        text: "SPECIALITY CREATED / UPDATED SUCCESSFULLY !!!",
        timer: 2000,
      });
    } catch (error) {
      console.log("Error of submitSpeciality", error);
      setOpen(false);
    }
  };

  const handleSpeciality = (name) => {
    if (updateSpeciality) {
      setUpdateSpeciality({
        ...updateSpeciality,
        speciality: name.toUpperCase(),
      });
      return;
    }
    setSpeciality(name.toUpperCase());
  };

  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Consultant"} />
      <div className="flex justify-center my-4 space-x-2">
        <ConsultantModal
          title={"Select Consultant"}
          onClick={(e) => updateDetails(e)}
          All="Ok"
        />
        <SpecialityModal
          title={"Select Speciality"}
          onClick={(data) => setSpecialityData(data)}
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
          value={(specialityData && specialityData?.speciality) || ""}
          disabled={true}
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
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Create Consultant Speciality"} />
        <div className="flex justify-center mt-3">
          <SpecialityModal
            title={"Update Speciality"}
            onClick={(data) => setUpdateSpeciality(data)}
          />
        </div>
        <div className="flex items-center flex-col space-y-3 mt-4">
          <LabeledInput
            label={"Enter Speciality"}
            placeholder={"Enter Speciality"}
            onChange={(e) => handleSpeciality(e.target.value)}
            value={
              (updateSpeciality && updateSpeciality?.speciality) || speciality
            }
          />
          <div className="flex space-x-3">
            <ButtonDis title={"Save"} onClick={submitSpeciality} />
            <ButtonDis
              title={"Refresh"}
              onClick={() => {
                setSpeciality("");
                setUpdateSpeciality(null);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Consultant;
