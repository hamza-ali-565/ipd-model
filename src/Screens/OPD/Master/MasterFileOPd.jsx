import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const MasterFileOpd = () => {
  const data = [
    { name: "--" },
    { name: "Consultant Fees" },
    { name: "Consultant Schedule" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Consultant Fees") {
      path = "consultantfees"; // Relative path
      navigate(path);
    } else if (name === "Consultant Schedule") {
      path = "consultantschedule"; // Relative path
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

export default MasterFileOpd;
