import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PageTitle from "../../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../../Components/DropDown/DropDown";

const RadiologyMaster = () => {
  const data = [{ name: "--" }, { name: "Service Charges" }];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Service Charges") {
      path = "radiologycharges"; // Relative path
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

export default RadiologyMaster;
