import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DropDown from "../../../../Components/DropDown/DropDown";

const IPDPaymentMaster = () => {
  const data = [
    { name: "--" },
    { name: "Payment Reciept" },
    { name: "Payment Cancellation" },
    { name: "Payment Refund" },
    { name: "Panels Payment" },
  ];

  let navigate = useNavigate();

  const navigates = (name) => {
    console.log("navi", name);
    let path;
    if (name === "Payment Reciept") {
      path = "paymentReciept"; // Relative path
      navigate(path);
    } else if (name === "Payment Cancellation") {
      path = "paymentcancellation"; // Relative path
      navigate(path);
    } else if (name === "Payment Refund") {
      path = "paymentrefund"; // Relative path
      navigate(path);
    } else if (name === "Panels Payment") {
      path = "panelpayment"; // Relative path
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

export default IPDPaymentMaster;
