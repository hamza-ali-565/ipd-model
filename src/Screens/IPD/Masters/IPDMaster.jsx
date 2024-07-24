import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PageTitle from "../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../Components/DropDown/DropDown";

const IPDMaster = () => {
  const data = [
    { name: "--" },
    { name: "Ward Charges" },
    { name: "Service Charges" },
    { name: "Consultant Charges" },
    { name: "Direct Service Charges" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Ward Charges") {
      path = "wardcharges"; // Relative path
      navigate(path);
    } else if (name === "Service Charges") {
      path = "servicecharges"; // Relative path
      navigate(path);
    } else if (name === "Consultant Charges") {
      path = "consultantcharges";
      navigate(path);
    } else if (name === "Direct Service Charges") {
      path = "dscharges";
      navigate(path);
    }
  };

  return (
    <div>
      <PageTitle />
      <DropDown data={data} onChange={navigates} />
      <Outlet />
    </div>
  );
};

export default IPDMaster;
