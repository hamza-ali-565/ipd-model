import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../Components/DropDown/DropDown";

const TransactionMasterOPD = () => {
  const data = [
    { name: "--" },
    { name: "OPD Registration" },
    { name: "OPD Cancellation" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "OPD Registration") {
      path = "opdregistration"; // Relative path
      navigate(path);
    } else if (name === "OPD Cancellation") {
      path = "opdcancellation"; // Relative path
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

export default TransactionMasterOPD;
