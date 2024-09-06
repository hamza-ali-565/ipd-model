import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import MicroHeadingDataModal from "../../../Components/Modal/MicroHeadingDataModal";
import { useSelector } from "react-redux";
import axios from "axios";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import { ErrorAlert } from "../../../Components/Alert/Alert";

const MicrobiologyRef = () => {
  const [microHeading, setMicroHeading] = useState(null);
  const [childData, setChildData] = useState([]);
  const [ inpVal, setInpVal] = useState('')

  const url = useSelector((state) => state?.url);
  const userData = useSelector((state) => state?.response);

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

  const updateArr = (value) => {

    // let newData = childData.map((items) => {
    //   return { ...items, name: value };
    // });
    // setChildData();
    setInpVal(value)
    setChildData((prevData) => [
      { name: value, createdUser: userData[0]?.userId },
    ]);
    console.log(childData);
  };

  const pushParameters = async () => {
    try {
      if (microHeading === null)
        return ErrorAlert({ text: "Please Select Heading !!!", timer: 2000 });
      if (childData.length <= 0)
        return ErrorAlert({ text: "Please Enter Paramster Name", timer: 2000 });
      const response = await axios.post(
        `${url}/lab/labMicroData`,
        {
          parentName: microHeading?.parentName,
          childData,
        },
        { withCredentials: true }
      );
      console.log("response of pushParameters", response?.data?.data);
    } catch (error) {
      console.log("Error of pushParameters ", error);
    }
  };
  return (
    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
      <CenterHeading title={"Microscopy Data Information"} />
      <div className="flex flex-col space-y-3 items-center mt-4">
        <MicroHeadingDataModal title={"Select Heading"} onClick={getDetails} />
        <p className="font-bold text-blue-600">
          Selected Heading is{" "}
          <span className="font-bold text-red-700">
            {microHeading?.parentName}
          </span>
        </p>
      </div>
      <div className="flex flex-col space-y-3 items-center mt-4">
        <LabeledInput
          label={"Enter Parameter Name"}
          onChange={(e) => updateArr(e.target.value.toUpperCase())}
          value={inpVal}
        />
        <ButtonDis title={"Save"} onClick={pushParameters} />
      </div>
    </div>
  );
};

export default MicrobiologyRef;
