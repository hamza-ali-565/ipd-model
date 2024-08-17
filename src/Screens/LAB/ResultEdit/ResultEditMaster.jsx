import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const ResultEditMaster = () => {
  const data = [
    { name: "--" },
    { name: "Edit Biochemistry" },
    { name: "Edit Haematology" },
    { name: "Edit Microbiology" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Edit Biochemistry") {
      path = "biochemistryEdit"; // Relative path
      navigate(path);
    } else if (name === "Edit Haematology") {
      path = "haematologyEdit"; // Relative path
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
