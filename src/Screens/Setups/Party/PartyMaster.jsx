import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PageTitle from "../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../Components/DropDown/DropDown";

const PartyMaster = () => {
  const data = [
    { name: "--" },
    { name: "Parent Party Name" },
    { name: "Party Name" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Parent Party Name") {
      path = "parentparty"; // Relative path
      navigate(path);
    } else if (name === "Party Name") {
      path = "partyname"; // Relative path
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

export default PartyMaster;
