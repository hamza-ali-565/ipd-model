import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const MasterFileLab = () => {
  const data = [
    { name: "--" },
    { name: "Test" },
    { name: "Group" },
    { name: "Laboratory Charges" },
    { name: "Microbiology References" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Test") {
      path = "test"; // Relative path
      navigate(path);
    } else if (name === "Group") {
      path = "group"; // Relative path
      navigate(path);
    } else if (name === "Laboratory Charges") {
      path = "labcharges"; // Relative path
      navigate(path);
    
    } else if (name === "Microbiology References") {
      path = "microbologyReferences"; // Relative path
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

export default MasterFileLab;
