import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import PageTitle from "../../../Components/Page Title/PAgeTitle";
import DropDown from "../../../Components/DropDown/DropDown";

const TransactionMaster = () => {
  const data = [
    { name: "--" },
    { name: "Radiology Booking" },
    { name: "Radiology Result" },
    { name: "Radiology Cash Cancellation" },
    { name: "Radiology IPD Cancellation" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Radiology Booking") {
      path = "radiologybooking"; // Relative path
      navigate(path);
    } else if (name === "Radiology Result") {
      path = "radiologyresult"; // Relative path
      navigate(path);
    } else if (name === "Radiology Cash Cancellation") {
      path = "radiologycancellation"; // Relative path
      navigate(path);
    } else if (name === "Radiology IPD Cancellation") {
      path = "radiologyipdcancellation"; // Relative path
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

export default TransactionMaster;
