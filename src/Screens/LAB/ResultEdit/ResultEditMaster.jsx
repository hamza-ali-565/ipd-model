import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const ResultEditMaster = () => {
  const data = [
    { name: "--" },
    { name: "Edits of 5 DEPT" },
    { name: "Edit Hematology" },
    { name: "Edit Microbiology" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Edits of 5 DEPT") {
      path = "biochemistryEdit"; // Relative path
      navigate(path);
    } else if (name === "Edit Hematology") {
      path = "hematologyEdit"; // Relative path
      navigate(path);
    } else if (name === "Edit Microbiology") {
      path = "microbiologyEdit"; // Relative path
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

export default ResultEditMaster;
