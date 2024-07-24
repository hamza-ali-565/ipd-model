import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const IPDShiftMaster = () => {
  const data = [
    { name: "--" },
    { name: "Create Shift" },
    { name: "Close Shift" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Create Shift") {
      path = "createShift"; // Relative path
      navigate(path);
    } else if (name === "Close Shift") {
      path = "closeShift"; // Relative path
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

export default IPDShiftMaster;
