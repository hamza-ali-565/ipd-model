import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabelledDropInput from "../../../../Components/LabelledDropInput/LabelledDropInput";
import AgeInput from "../../../../Components/Age Input/AgeInput";
import LabelledDropDown from "../../../../Components/LabelledDropDown/LabelledDropDown";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import { ErrorAlert, SuccessAlert } from "../../../../Components/Alert/Alert";
import axios from "axios";
import { useSelector } from "react-redux";
import InputButton from "../../../../Components/InputButton/InputButton";
import Loader from "../../../../Components/Modal/Loader";
import MRRegPDF from "../../../../Components/PDFDetails/MRRegisPDF";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import ButtonDis from "../../../../Components/Button/ButtonDis";

const PatientRegistration = () => {
  const [patientName, setPatientName] = useState("");
  const [patientType, setPatientType] = useState([]);
  const [patientStatus, setParientStatus] = useState("");
  const [relativeName, setRelativeName] = useState("");
  const [relativeStatus, setRelativeStatus] = useState("");
  const [fatherType, setFatherType] = useState([]);
  const [maritalStatus, setMaritalStatus] = useState([]);
  const [maritalData, setMaritalData] = useState("");
  const [gender, setGender] = useState([]);
  const [gendarData, setGenderData] = useState("");
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [occupation, setOccupation] = useState("");
  const [email, setEmail] = useState("");
  const [cellNo, setCellNo] = useState("");
  const [cnic, setCnic] = useState("");
  const [address, setAddress] = useState("");
  const [kinName, setKinName] = useState("");
  const [kinRelation, setKinRelation] = useState("");
  const [kinCell, setKinCell] = useState("");
  const [kinCnic, setKinCnic] = useState("");
  const [kinAddress, setKinAddress] = useState("");
  const [kinOccupation, setKinOccupation] = useState("");
  const [MrNo, setMrNo] = useState("");
  const [mrData, setMrData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [toggle2, setToggle2] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setPatientType([
      { name: "--" },
      { name: "Mr." },
      { name: "Mrs." },
      { name: "Miss" },
      { name: "Dr." },
      { name: "Prof" },
      { name: "Master" },
      { name: "Baby of" },
    ]);

    setFatherType([
      { name: "--" },
      { name: "S/o" },
      { name: "D/o" },
      { name: "W/o" },
      { name: "C/o" },
    ]);
    setMaritalStatus([
      { name: "--" },
      { name: "Single" },
      { name: "Married" },
      { name: "Widow" },
    ]);
    setGender([{ name: "--" }, { name: "Male" }, { name: "Female" }]);
  }, [toggle]);

  useEffect(() => {
    setFatherType([
      { name: "--" },
      { name: "S/o" },
      { name: "D/o" },
      { name: "W/o" },
      { name: "C/o" },
    ]);
    setMaritalStatus([
      { name: "--" },
      { name: "Single" },
      { name: "Married" },
      { name: "Widow" },
    ]);
    setGender([{ name: "--" }, { name: "Male" }, { name: "Female" }]);
  }, [toggle2]);

  const url = useSelector((item) => item.url);
  const userData = useSelector((item) => item.response);

  const validationCheck = () => {
    try {
      console.log("heelo");
      if (!patientStatus || patientStatus === "--")
        throw new Error("PLEASE SELECT PATIENT TYPE !!!");
      if (!patientName || patientName === "")
        throw new Error("PLEASE ENTER PATIENT NAME !!!");
      if (!relativeStatus || relativeStatus === "--")
        throw new Error("PLEASE SELECT RELATIVE TYPE");
      if (!relativeName || relativeName === "")
        throw new Error("PLEASE ENTER RELATIVE NAME !!!");
      if (!gendarData || gendarData === "--")
        throw new Error("PLEASE SELECT GENDER !!!");
      if (!maritalData || maritalData === "--")
        throw new Error("PLEASE SELECT MARITAL STATUS !!!");
      if (!cellNo) throw new Error("PLEASE SELECT CELL NO !!!");
      submitHandler();
    } catch (error) {
      ErrorAlert({ text: error.message, timer: 2000 });
    }
  };

  const printMRCard = async (data) => {
    const key = uuidv4();
    const myData = [data];
    // Create a PDF document as a Blob
    const blob = await pdf(
      <MRRegPDF key={key} mrData={mrData.length > 0 ? mrData : myData} />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  // api
  const submitHandler = async () => {
    try {
      if (mrData.length > 0) {
        ErrorAlert({
          text: "KINDLY PRESS REFRESH BUTTON FIRST!!!",
          timer: 2000,
        });
        return;
      }
      setOpen(true);
      const response = await axios.post(
        `${url}/patientreg`,
        {
          patientType: patientStatus,
          MrNo,
          patientName,
          ageYear: year,
          ageDay: day,
          ageMonth: month,
          relativeType: relativeStatus,
          relativeName,
          gender: gendarData,
          occupation,
          maritalStatus: maritalData,
          email,
          cellNo,
          cnicNo: cnic,
          address,
          kinName,
          kinRelation,
          kinCell,
          kinCnic,
          kinAddress,
          kinOccupation,
          updatedUser: userData[0].userId,
        },
        { withCredentials: true }
      );
      printMRCard(response?.data?.data);
      Refresh();
      setOpen(false);
      if (response.data.data1) {
        SuccessAlert({ text: "DATA UPDATED SUCCESSFULLY", timer: 2000 });
        return;
      }
      SuccessAlert({
        text: `Data Created Successfully WITH MR NO. ${response.data.data.MrNo} `,
        timer: 2000,
      });
    } catch (error) {
      console.log("Error of submit handler", error);
      ErrorAlert({ text: error.response.data.message });
      setOpen(false);
    }
  };
  const updateHandler = async () => {
    setOpen(true);
    try {
      const newData = mrData.map((item) => {
        return { ...item, updatedUser: userData[0].userId };
      });
      console.log(newData[0]);
      const {
        MrNo,
        patientType,
        patientName,
        ageYear,
        ageDay,
        ageMonth,
        relativeType,
        gender,
        occupation,
        maritalStatus,
        email,
        cellNo,
        cnicNo,
        address,
        kinName,
        kinRelation,
        kinCell,
        kinCnic,
        kinAddress,
        kinOccupation,
        relativeName,
        updatedUser,
      } = newData[0];
      // return;
      const response = await axios.put(
        `${url}/patientreg`,
        {
          MrNo,
          patientType,
          patientName,
          ageYear,
          ageDay,
          ageMonth,
          relativeType,
          gender,
          occupation,
          maritalStatus,
          email,
          cellNo,
          cnicNo,
          address,
          kinName,
          kinRelation,
          kinCell,
          kinCnic,
          kinAddress,
          kinOccupation,
          relativeName,
          updatedUser,
        },
        {
          withCredentials: true,
        }
      );
      SuccessAlert({
        text: `MR NO. ${response.data.data.MrNo} HAS BEEN UPDATED !!!`,
      });
      Refresh();
      setOpen(false);
      printMRCard(response?.data?.data);
    } catch (error) {
      console.log("Error of update hanlder");
      setOpen(false);
    }
  };

  const getPatient = async () => {
    setOpen(true);
    try {
      const response = await axios.get(`${url}/patientreg?MrNo=${MrNo}`, {
        withCredentials: true,
      });
      console.log("response of getPatient", response.data.data);
      setMrData(response.data.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of getPatient", error);
      ErrorAlert({ text: error.response.data.message, timer: 2000 });
      setOpen(false);
    }
  };

  //   Functions

  const Refresh = () => {
    setPatientName("");
    setPatientType([]);
    setRelativeName("");
    setYear("");
    setDay("");
    setMonth("");
    setFatherType([]);
    setMaritalStatus([]);
    setGender([]);
    setOccupation("");
    setEmail("");
    setCellNo("");
    setCnic("");
    setAddress("");
    setKinName("");
    setKinAddress("");
    setKinCell("");
    setKinCnic("");
    setKinOccupation("");
    setKinRelation("");
    setParientStatus("");
    setMrNo("");
    setMrData([]);
    setToggle(!toggle);
  };

  const DropDownChange = (name) => {
    setParientStatus(name);
    if (name === "Mr." || name === "Master") {
      setRelativeStatus("S/o");
      setGenderData("Male");
      setMaritalData("Single");
      return;
    } else if (name === "Mrs.") {
      setRelativeStatus("W/o");
      setGenderData("Female");
      setMaritalData("Married");
      return;
    } else if (name === "Miss") {
      setRelativeStatus("D/o");
      setGenderData("Female");
      setMaritalData("Single");
      return;
    } else {
      setRelativeStatus("--");
      setGenderData("--");
      setMaritalData("--");
      setFatherType([]);
      setMaritalStatus([]);
      setGender([]);
      setToggle2(!toggle2);
    }
  };

  const inputChange = async (value, key) => {
    let updatedData;
    if (key === "patientType") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, patientType: value };
        });
      } else {
        DropDownChange(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "patientName") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, patientName: value.toUpperCase() };
        });
      } else {
        setPatientName(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "Relative") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, relativeName: value.toUpperCase() };
        });
      } else {
        setRelativeName(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "relativeType") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, relativeType: value };
        });
      } else {
        setRelativeStatus(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "y") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, ageYear: value };
        });
      } else {
        setYear(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "m") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, ageMonth: value };
        });
      } else {
        setMonth(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "d") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, ageDay: value };
        });
      } else {
        setDay(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "gender") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, gender: value };
        });
      } else {
        setGenderData(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "maritalstatus") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, maritalStatus: value };
        });
      } else {
        setMaritalData(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "occupation") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, occupation: value.toUpperCase() };
        });
      } else {
        setOccupation(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "email") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, email: value };
        });
      } else {
        setEmail(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "cellNo") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, cellNo: value };
        });
      } else {
        setCellNo(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "cnic") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, cnicNo: value };
        });
      } else {
        setCnic(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "address") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, address: value.toUpperCase() };
        });
      } else {
        setAddress(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "kinName") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, kinName: value.toUpperCase() };
        });
      } else {
        setKinName(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "kinRelation") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, kinRelation: value.toUpperCase() };
        });
      } else {
        setKinRelation(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "kinCell") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, kinCell: value };
        });
      } else {
        setKinCell(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "kinCnic") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, kinCnic: value };
        });
      } else {
        setKinCnic(value);
        return;
      }
      setMrData(updatedData);
    }
    if (key === "kinAddress") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, kinAddress: value.toUpperCase() };
        });
      } else {
        setKinAddress(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
    if (key === "kinOccupation") {
      if (mrData.length > 0) {
        updatedData = mrData.map((item) => {
          return { ...item, kinOccupation: value.toUpperCase() };
        });
      } else {
        setKinOccupation(value.toUpperCase());
        return;
      }
      setMrData(updatedData);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Registration"} />

        <InputButton
          placeholder={"ENTER MR NO."}
          onChange={(e) => setMrNo(e.target.value)}
          value={MrNo}
          onClick={getPatient}
          type={"number"}
        />
        {/* Patien profile */}
        <div className="container mx-auto">
          <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
            <LabelledDropInput
              label={"Patient Name"}
              data={patientType}
              placeholder={"Patient Name"}
              onChangeDrop={(e) => inputChange(e, "patientType")}
              value={mrData.length > 0 ? mrData[0]?.patientName : patientName}
              onChange={(e) => {
                inputChange(e.target.value, "patientName");
              }}
            />
            <AgeInput
              valueY={mrData.length > 0 ? mrData[0]?.ageYear : year}
              valueM={mrData.length > 0 ? mrData[0]?.ageMonth : month}
              valueD={mrData.length > 0 ? mrData[0]?.ageDay : day}
              onChangeY={(e) => {
                inputChange(e.target.value, "y");
              }}
              onChangeM={(e) => {
                inputChange(e.target.value, "m");
              }}
              onChangeD={(e) => {
                inputChange(e.target.value, "d");
              }}
            />
            <LabelledDropInput
              label={"Relative Name"}
              data={
                patientStatus.length !== ""
                  ? patientStatus === "Mr." || patientStatus === "Master"
                    ? [{ name: "S/o" }]
                    : patientStatus === "Miss"
                    ? [{ name: "D/o" }]
                    : patientStatus === "Mrs."
                    ? [{ name: "W/o" }]
                    : fatherType
                  : fatherType
              }
              onChangeDrop={(name) => inputChange(name, "relativeType")}
              value={mrData.length > 0 ? mrData[0]?.relativeName : relativeName}
              placeholder={"Relative Name"}
              onChange={(e) => {
                inputChange(e.target.value, "Relative");
              }}
            />
            <LabelledDropDown
              label={"Gender"}
              data={
                patientStatus !== ""
                  ? patientStatus === "Mr." || patientStatus === "Master"
                    ? [{ name: "Male" }]
                    : patientStatus === "Miss" || patientStatus === "Mrs."
                    ? [{ name: "Female" }]
                    : gender
                  : gender
              }
              onChange={(name) => inputChange(name, "gender")}
            />
            <LabeledInput
              label={"Occupation"}
              placeholder={"Occupation"}
              onChange={(e) => inputChange(e.target.value, "occupation")}
              value={mrData.length > 0 ? mrData[0]?.occupation : occupation}
            />
            <LabelledDropDown
              label={"Marital Status"}
              data={
                patientStatus !== ""
                  ? patientStatus === "Mr." ||
                    patientStatus === "Miss" ||
                    patientStatus === "Master" ||
                    patientStatus === "Baby of"
                    ? [{ name: "Single" }, { name: "Married" }]
                    : patientStatus === "Mrs."
                    ? [{ name: "Married" }]
                    : maritalStatus
                  : maritalStatus
              }
              onChange={(name) => inputChange(name, "maritalstatus")}
            />
            <LabeledInput
              label={"Email"}
              type={"email"}
              placeholder={"Email"}
              onChange={(e) => inputChange(e.target.value, "email")}
              value={mrData.length > 0 ? mrData[0]?.email : email}
            />
            <LabeledInput
              label={"Cell No"}
              type={"number"}
              placeholder={"00000000000"}
              max={"11"}
              onChange={(e) => inputChange(e.target.value, "cellNo")}
              value={mrData.length > 0 ? mrData[0]?.cellNo : cellNo}
            />
            <LabeledInput
              label={"CNIC No"}
              type={"number"}
              placeholder={"0000000000000"}
              onChange={(e) => inputChange(e.target.value, "cnic")}
              value={mrData.length > 0 ? mrData[0]?.cnicNo : cnic}
            />
            <LabeledInput
              label={"Address"}
              placeholder={"Address"}
              onChange={(e) => inputChange(e.target.value, "address")}
              value={mrData.length > 0 ? mrData[0]?.address : address}
            />
          </div>
        </div>
      </div>

      {/* kin */}

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Next of  Kin"} />
        {/* kin profile */}
        <div className="container mx-auto">
          <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
            <LabeledInput
              label={"Name"}
              placeholder={"Next of kin name"}
              onChange={(e) => inputChange(e.target.value, "kinName")}
              value={mrData.length > 0 ? mrData[0]?.kinName : kinName}
            />
            <LabeledInput
              label={"Relation with patient"}
              type={"text"}
              placeholder={"Relation with patient"}
              onChange={(e) => inputChange(e.target.value, "kinRelation")}
              value={mrData.length > 0 ? mrData[0]?.kinRelation : kinRelation}
            />
            <LabeledInput
              label={"Cell No"}
              type={"number"}
              placeholder={"00000000000"}
              max={"11"}
              onChange={(e) => inputChange(e.target.value, "kinCell")}
              value={mrData.length > 0 ? mrData[0]?.kinCell : kinCell}
            />
            <LabeledInput
              label={"CNIC No"}
              type={"number"}
              placeholder={"00000-0000000-0"}
              onChange={(e) => inputChange(e.target.value, "kinCnic")}
              value={mrData.length > 0 ? mrData[0]?.kinCnic : kinCnic}
            />
            <LabeledInput
              label={"Address"}
              placeholder={"Address"}
              onChange={(e) => inputChange(e.target.value, "kinAddress")}
              value={mrData.length > 0 ? mrData[0]?.kinAddress : kinAddress}
            />
            <LabeledInput
              label={"Occupation"}
              type={"text"}
              placeholder={"Occupation"}
              onChange={(e) => inputChange(e.target.value, "kinOccupation")}
              value={
                mrData.length > 0 ? mrData[0]?.kinOccupation : kinOccupation
              }
            />
          </div>
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl flex items-center flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2 md:justify-center">
        <ButtonDis
          title={"Save"}
          onClick={mrData.length > 0 ? updateHandler : validationCheck}
        />
        <ButtonDis
          title={"Print"}
          onClick={printMRCard}
          disabled={mrData.length <= 0 ? true : false}
        />
        <ButtonDis title={"Refresh"} onClick={Refresh} />
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default PatientRegistration;
