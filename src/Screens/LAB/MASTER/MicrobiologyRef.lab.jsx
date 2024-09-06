import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import MicroHeadingDataModal from "../../../Components/Modal/MicroHeadingDataModal";
import { useSelector } from "react-redux";
import axios from "axios";

const MicrobiologyRef = () => {
  const [microHeading, setMicroHeading] = useState(null);

  const url = useSelector((state) => state?.url);

  const getDetails = async (data) => {
    try {
      console.log("data ", data);
      setMicroHeading(data);
      const response = await axios.get(
        `${url}/lab/labMicroDataChild?_id=${data?._id}`,
        { withCredentials: true }
      );
      console.log("Response of getDetails ", response?.data?.data);
    } catch (error) {
      console.log("Error of get Details ", error);
    }
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Microscopy Data Information"} />
      <div className="flex justify-center mt-4">
        <MicroHeadingDataModal title={"Select Heading"} onClick={getDetails} />
      </div>
    </div>
  );
};

export default MicrobiologyRef;
