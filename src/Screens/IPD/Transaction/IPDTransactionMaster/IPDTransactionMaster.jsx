import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import DropDown from "../../../../Components/DropDown/DropDown";

const IPDTransactionMaster = () => {
  const data = [
    { name: "--" },
    { name: "Service Reversal" },
    { name: "Constultant Visit" },
    { name: "Room Charges" },
    { name: "Procedure Charges" },
    { name: "Ward Transfer" },
    { name: "Running Bill" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Service Reversal") {
      path = "servicereversal"; // Relative path
      navigate(path);
    } else if (name === "Constultant Visit") {
      path = "consultantvisit"; // Relative path
      navigate(path);
    } else if (name === "Room Charges") {
      path = "ipdwardcharges"; // Relative path
      navigate(path);
    } else if (name === "Procedure Charges") {
      path = "procedurecharges"; // Relative path
      navigate(path);
    } else if (name === "Ward Transfer") {
      path = "wardtransfer"; // Relative path
      navigate(path);
    } else if (name === "Running Bill") {
      path = "runningbill"; // Relative path
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

export default IPDTransactionMaster;
