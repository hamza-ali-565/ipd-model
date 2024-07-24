import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import axios from "axios";
import { useSelector } from "react-redux";
import CenterHeading from "../Center Heading/CenterHeading";
import LabelledDropInput from "../LabelledDropInput/LabelledDropInput";
import AgeInput from "../Age Input/AgeInput";
import LabelledDropDown from "../LabelledDropDown/LabelledDropDown";
import LabeledInput from "../LabelledInput/LabeledInput";
import ButtonDis from "../Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../Alert/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "21px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};

export default function MRModel({ onClick, title }) {
  const [open, setOpen] = useState(false);
  const [toggle, setToggle] = useState(false);
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
  const [buttonCheck, setButtonCheck] = useState(false);

  const handleClose = () => {
    setOpen(false);
    Refresh();
  };

  const userData = useSelector((state) => state.response);
  const url = useSelector((state) => state.url);

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
  }, []);
  const OpenData = () => {
    setToggle(!toggle);
    setOpen(!open);
  };
  const Refresh = () => {
    setPatientName("");

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
    if (
      name === "Mr." ||
      name === "Dr." ||
      name === "Prof" ||
      name === "Master"
    ) {
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
    }
  };
  const inputChange = async (value, key) => {
    let updatedData;
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

  const submitHandler = async () => {
    try {
      setButtonCheck(true);
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
      console.log("response of Submit Handler", response);
      onClick(response.data.data);
      setButtonCheck(false);
      handleClose();

      SuccessAlert({
        text: `Data Created Successfully WITH MR NO. ${response.data.data.MrNo} `,
        timer: 1000,
      });
    } catch (error) {
      console.log("Error of submit handler", error);
      ErrorAlert({ text: error.response.data.message });
      setButtonCheck(false);
    }
  };
  return (
    <div>
      <Button
        onClick={OpenData}
        style={{ backgroundColor: "#378FE7", color: "white" }}
      >
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: { cursor: "default" }, // Change cursor style
          onClick: (e) => e.stopPropagation(), // Prevent closing on backdrop click
        }}
      >
        <Box sx={style}>
          <CenterHeading title={"Create Mr No."} />
          {/* patient Data */}
          <div className="container mx-auto mt-3">
            <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
              <LabelledDropInput
                label={"Patient Name"}
                data={patientType}
                placeholder={"Patient Name"}
                onChangeDrop={DropDownChange}
                value={patientName}
                onChange={(e) => {
                  inputChange(e.target.value, "patientName");
                }}
              />
              <AgeInput
                valueY={year}
                valueM={month}
                valueD={day}
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
                    ? patientStatus === "Mr." ||
                      patientStatus === "Dr." ||
                      patientStatus === "Prof" ||
                      patientStatus === "Master"
                      ? [{ name: "S/o" }]
                      : patientStatus === "Miss"
                      ? [{ name: "D/o" }]
                      : patientStatus === "Mrs."
                      ? [{ name: "W/o" }]
                      : fatherType
                    : fatherType
                }
                onChangeDrop={(name) => setRelativeStatus(name)}
                value={relativeName}
                placeholder={"Relative Name"}
                onChange={(e) => {
                  inputChange(e.target.value, "Relative");
                }}
              />
              <LabelledDropDown
                label={"Gender"}
                data={
                  patientStatus !== ""
                    ? patientStatus === "Mr." ||
                      patientStatus === "Dr." ||
                      patientStatus === "Prof" ||
                      patientStatus === "Master"
                      ? [{ name: "Male" }]
                      : patientStatus === "Miss" || patientStatus === "Mrs."
                      ? [{ name: "Female" }]
                      : gender
                    : gender
                }
                onChange={(name) => setGenderData(name)}
              />
              <LabeledInput
                label={"Occupation"}
                placeholder={"Occupation"}
                onChange={(e) => inputChange(e.target.value, "occupation")}
                value={occupation}
              />
              <LabelledDropDown
                label={"Marital Status"}
                data={
                  patientStatus !== ""
                    ? patientStatus === "Mr." ||
                      patientStatus === "Dr." ||
                      patientStatus === "Prof" ||
                      patientStatus === "Miss" ||
                      patientStatus === "Master" ||
                      patientStatus === "Baby of"
                      ? [{ name: "Single" }, { name: "Married" }]
                      : patientStatus === "Mrs."
                      ? [{ name: "Married" }]
                      : maritalStatus
                    : maritalStatus
                }
                onChange={(name) => setMaritalData(name)}
              />
              <LabeledInput
                label={"Email"}
                type={"email"}
                placeholder={"Email"}
                onChange={(e) => inputChange(e.target.value, "email")}
                value={email}
              />
              <LabeledInput
                label={"Cell No"}
                type={"number"}
                placeholder={"00000000000"}
                max={"11"}
                onChange={(e) => inputChange(e.target.value, "cellNo")}
                value={cellNo}
              />
              <LabeledInput
                label={"CNIC No"}
                type={"number"}
                placeholder={"0000000000000"}
                onChange={(e) => inputChange(e.target.value, "cnic")}
                value={cnic}
              />
              <LabeledInput
                label={"Address"}
                placeholder={"Address"}
                onChange={(e) => inputChange(e.target.value, "address")}
                value={address}
              />
            </div>
          </div>
          {/* Kin Data */}
          <CenterHeading title={"Next of Kin"} />
          <div className="container mx-auto mt-3">
            <div className="grid gap-y-2 md:grid md:grid-cols-2 md:h-auto md:justify-items-center md:gap-y-3">
              <LabeledInput
                label={"Name"}
                placeholder={"Next of kin name"}
                onChange={(e) => inputChange(e.target.value, "kinName")}
                value={kinName}
              />
              <LabeledInput
                label={"Relation with patient"}
                type={"text"}
                placeholder={"Relation with patient"}
                onChange={(e) => inputChange(e.target.value, "kinRelation")}
                value={kinRelation}
              />
              <LabeledInput
                label={"Cell No"}
                type={"number"}
                placeholder={"00000000000"}
                max={"11"}
                onChange={(e) => inputChange(e.target.value, "kinCell")}
                value={kinCell}
              />
              <LabeledInput
                label={"CNIC No"}
                type={"number"}
                placeholder={"00000-0000000-0"}
                onChange={(e) => inputChange(e.target.value, "kinCnic")}
                value={kinCnic}
              />
              <LabeledInput
                label={"Address"}
                placeholder={"Address"}
                onChange={(e) => inputChange(e.target.value, "kinAddress")}
                value={kinAddress}
              />
              <LabeledInput
                label={"Occupation"}
                type={"text"}
                placeholder={"Occupation"}
                onChange={(e) => inputChange(e.target.value, "kinOccupation")}
                value={kinOccupation}
              />
            </div>
          </div>

          <div className="flex justify-center space-x-2 mt-2">
            <ButtonDis title={"SAVE"} onClick={submitHandler} />
            <ButtonDis
              title={"CANCEL"}
              onClick={handleClose}
              disabled={buttonCheck}
            />
          </div>
        </Box>
      </Modal>
    </div>
  );
}
