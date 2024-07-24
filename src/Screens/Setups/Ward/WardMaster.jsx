import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PageTitle from "../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../Components/DropDown/DropDown";

const WardMaster = () => {
  const data = [{ name: "--" }, { name: "Ward Name" }, { name: "Bed Name" }];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Ward Name") {
      path = "wardname"; // Relative path
      navigate(path);
    } else if (name === "Bed Name") {
      path = "bedname"; // Relative path
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

export default WardMaster;
