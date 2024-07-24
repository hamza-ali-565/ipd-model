import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import SimpleDropDown from "../../../../Components/SimpleDropdown/SimpleDropDown";
import { useSelector } from "react-redux";
import axios from "axios";
import Drawer from "../../../../Components/Drawer/Drawer";
import BED from "../../../../Components/BED/BED";

const BedAllocation = () => {
  const [ward, setWard] = useState([]);
  const [bed, setBed] = useState([]);

  useEffect(() => {
    wardNames();
  }, []);

  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);

  const wardNames = async () => {
    try {
      const response = await axios.get(`${url}/ipdward`, {
        withCredentials: true,
      });
      setWard(response.data.data);
      console.log("response of ward Name", response);
    } catch (error) {
      console.log("error of ward name", error);
    }
  };

  const checkDetails = async (wardName) => {
    try {
      const response = await axios.get(
        `${url}/admissionbed?wardName=${wardName}`,
        { withCredentials: true }
      );
      console.log("response of Check Details", response);
      setBed(response.data.data);
    } catch (error) {
      console.log("error of check details", error);
    }
  };

  const checkData = (name) => {
    console.log(name);
  };
  const ResetBed = () => {
    setBed([]);
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Bed Allocation"} />
        <SimpleDropDown
          DropDownLabel={"Select Ward"}
          data={ward.length > 0 ? ward : ""}
          onChange={checkDetails}
          onClick={ResetBed}
        />

        <div className=" flex items-center flex-col md:grid md:grid-cols-4 justify-items-center">
          {bed.length > 0 &&
            bed.map((items, index) => (
              <BED
                key={index}
                patienName={`${items?.patientType ? items?.patientType : ""} ${
                  items?.patientName ? items?.patientName : ""
                } ${items?.relativeType ? items?.relativeType : ""} ${
                  items?.relativeName ? items?.relativeName : ""
                }`}
                bedNo={items?.bedNo}
                admissionNo={items?.admissionNo}
                Party={items?.party}
                onClick={(data) => console.log(data)}
                onClickModalItem={checkData}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default BedAllocation;
