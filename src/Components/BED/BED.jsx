import React from "react";
import Drawer from "../Drawer/Drawer";
import hospitalBed from "../../Images/hospital-bed-png.webp";
const BED = ({
  bedNo,
  admissionNo,
  patienName,
  onClick,
  Party,
  onClickModalItem,
}) => {
  return (
    <div className="border-2 rounded-xl border-black w-40 p-2 my-2">
      <div className="flex justify-between items-center">
        <img src={hospitalBed} alt="" className="w-20 h-20" />
        <Drawer
          onClick={onClick}
          modalAdmissionNo={admissionNo}
          patientName={patienName}
          onClickModalItem={onClickModalItem}
          Party={Party}
        />
      </div>
      <p className="text-center text-xs">BED NO. {bedNo}</p>
      <p className="text-center text-xs mt-1">
        ADM NO. <span className="text-red-600">{admissionNo}</span>
      </p>
      <p className="text-center text-xs mt-1 text-red-600 font-bold">
        {patienName}
      </p>
      {Party && (
        <p className="text-center text-xs mt-1 text-red-600 font-bold">
          Party: {Party}
        </p>
      )}
    </div>
  );
};

export default BED;
