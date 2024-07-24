import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PageTitle from "../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../Components/DropDown/DropDown";

const ServiceMaster = () => {
  const data = [
    { name: "--" },
    { name: "Parent Service Name" },
    { name: "Service Name" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Parent Service Name") {
      path = "parentservicename"; // Relative path
      navigate(path);
    } else if (name === "Service Name") {
      path = "servicename"; // Relative path
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

export default ServiceMaster;
