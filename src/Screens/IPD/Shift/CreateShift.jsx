import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { useDispatch, useSelector } from "react-redux";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { setShift } from "../../../Store/action";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";

const CreateShift = () => {
  const [shiftRes, setShiftRes] = useState([]);
  const [open, setOpen] = useState(false);

  const userData = useSelector((state) => state.response);
  const url = useSelector((state) => state.url);
  let shiftData = useSelector((state) => state.shift);
  const Dispatch = useDispatch();

  useEffect(() => {}, []);
  console.log("shiftData", shiftData);
  console.log("shiftRes", shiftRes.createdOn);
  const createShift = async () => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/shift`,
        { userName: userData[0].userName, userId: userData[0].userId },
        { withCredentials: true }
      );
      console.log(response.data.data);
      setShiftRes(response.data.data);
      Dispatch(setShift(response.data.data));
      SuccessAlert({ text: "SHIFT CREATED SUCCESSFULLY!!!", timer: 1500 });
      setOpen(false);
    } catch (error) {
      console.log("Error of Create Shift", error);
      ErrorAlert({ text: error.response.data.message });
      setOpen(false);
    }
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Create Shift"} />
        <div className="flex flex-col items-center mt-3 space-y-3">
          <LabeledInput
            label={"UserName"}
            value={userData.length > 0 ? userData[0].userName : ""}
            disabled={true}
          />
          <LabeledInput
            label={"UserId"}
            value={userData.length > 0 ? userData[0].userId : ""}
            disabled={true}
          />
          <LabeledInput
            label={"Started at"}
            disabled={true}
            value={
              shiftData.length > 0
                ? shiftData[0]?.createdOn
                : shiftRes.length > 0
                ? shiftRes.createdOn
                : "No Shift Created"
            }
          />
          <ButtonDis title={"CREATE"} onClick={createShift} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait"} />
    </div>
  );
};

export default CreateShift;
