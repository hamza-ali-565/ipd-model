import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const LabResultMaster = () => {
  const data = [
    { name: "--" },
    { name: "Biochemistry" },
    { name: "Haematology" },
    { name: "Microbiology" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Biochemistry") {
      path = "biochemistry"; // Relative path
      navigate(path);
    } else if (name === "Haematology") {
      path = "haematology"; // Relative path
      navigate(path);
    } else if (name === "Microbiology") {
      path = "microbiology"; // Relative path
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

export default LabResultMaster;
