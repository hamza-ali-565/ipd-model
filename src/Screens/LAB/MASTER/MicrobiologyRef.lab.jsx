import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import MicroHeadingDataModal from "../../../Components/Modal/MicroHeadingDataModal";
import { useSelector } from "react-redux";
import axios from "axios";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../Components/Button/ButtonDis";
import { ErrorAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";

const MicrobiologyRef = () => {
  const [microHeading, setMicroHeading] = useState(null);
  const [dataToUpdate, setDataToUpdate] = useState(null);
  const [childData, setChildData] = useState([]);
  const [childsData, setChildsData] = useState([]);
  const [open, setOpen] = useState(false);
  const [inpVal, setInpVal] = useState("");

  const url = useSelector((state) => state?.url);
  const userData = useSelector((state) => state?.response);

  const getDetails = async (data) => {
    try {
      setOpen(true);
      console.log("data ", data);
      setMicroHeading(data);
      const response = await axios.get(
        `${url}/lab/labMicroDataChild?_id=${data?._id}`,
        { withCredentials: true }
      );
      console.log(
        "Response of getDetails ",
        response?.data?.data?.data[0]?.childData
      );
      setOpen(false);
      setChildsData(response?.data?.data?.data[0]?.childData);
    } catch (error) {
      setOpen(false);
      setChildsData([]);
      console.log("Error of get Details ", error);
    }
  };

  const updateArr = (value) => {
    if (dataToUpdate !== null) {
      setDataToUpdate({ ...dataToUpdate, name: value });
      console.log(dataToUpdate);
      return;
    }

    setInpVal(value);

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
      setOpen(true);
      const response = await axios.post(
        `${url}/lab/labMicroData`,
        {
          parentName: microHeading?.parentName,
          childData,
          _id: microHeading?._id,
        },
        { withCredentials: true }
      );
      setInpVal("");
      getDetails(microHeading);
      console.log("response of pushParameters", response?.data?.data?.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of pushParameters ", error);
      setOpen(false);
    }
  };

  const updateName = async () => {
    try {
      setOpen(true);
      const response = await axios.put(
        `${url}/lab/labMicNameUpdate`, // create this api on backend as well
        {
          _id: dataToUpdate?._id,
          name: dataToUpdate?.name,
        },
        { withCredentials: true }
      );
      setOpen(false);
      console.log("Error of updateName ", response.data);
      getDetails(microHeading);
      setDataToUpdate(null);
    } catch (error) {
      console.log("Error of updateName ", error);
      setOpen(false);
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
          value={(dataToUpdate !== null && dataToUpdate?.name) || inpVal}
        />
        <ButtonDis
          title={dataToUpdate === null ? `Save` : "update"}
          onClick={dataToUpdate === null ? pushParameters : updateName}
        />
      </div>

      <div className="container mx-auto mt-3">
        <div className="grid grid-cols-4 text-xs font-bold justify-items-center items-center h-12 border border-gray-300">
          <p className="">S. No</p>
          <p className="">Parameter Name</p>
          <p className="">Created User</p>
          <p className="">Update</p>
        </div>
      </div>
      {childsData?.length > 0 &&
        childsData.map((items, index) => (
          <div className="container mx-auto mt-3">
            <div className="grid grid-cols-4 text-xs justify-items-center items-center h-8 border border-gray-300">
              <p className="">{index + 1}</p>
              <p className="">{items?.name}</p>
              <p className="">{items?.createdUser}</p>
              <p
                onClick={() => setDataToUpdate(items)}
                className="font-bold underline text-blue-500 hover:text-blue-600 cursor-pointer"
              >
                Update
              </p>
            </div>
          </div>
        ))}
      <Loader onClick={open} title={"PLEASE WAIT ... "} />
    </div>
  );
};

export default MicrobiologyRef;
