import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../../Components/DropDown/DropDown";

const DischargeMaster = () => {
  const data = [
    { name: "--" },
    { name: "Discharge Summary" },
    { name: "Patient Discharge" },
    { name: "Re-Admission" },
    { name: "Final Bill" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Discharge Summary") {
      path = "dischargesummary"; // Relative path
      navigate(path);
    } else if (name === "Patient Discharge") {
      path = "patientdischarge"; // Relative path
      navigate(path);
    } else if (name === "Re-Admission") {
      path = "readmission"; // Relative path
      navigate(path);
    } else if (name === "Final Bill") {
      path = "finalbill"; // Relative path
      navigate(path);
    }
  };

  return (
    <div>
      <DropDown data={data} onChange={navigates} />
      <Outlet />
    </div>
  );
};

export default DischargeMaster;
