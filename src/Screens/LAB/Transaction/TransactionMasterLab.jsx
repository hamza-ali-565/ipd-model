import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const TransactionMasterLab = () => {
  const data = [
    { name: "--" },
    { name: "Lab Registration" },
    { name: "Lab Cancellation Cash" },
    { name: "Lab Cancellation IPD" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Lab Registration") {
      path = "labregistration"; // Relative path
      navigate(path);
    } else if (name === "Lab Cancellation Cash") {
      path = "labcancellationcash"; // Relative path
      navigate(path);
    } else if (name === "Lab Cancellation IPD") {
      path = "labcancellationipd"; // Relative path
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

export default TransactionMasterLab;
