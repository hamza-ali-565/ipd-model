import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";

const Biochemistry = () => {
  const [labNo, setLabNo] = useState("");

  // get Details
  const getDetails = (e) => {
    e.preventDefault();
    console.log(" i am here");
    setLabNo("");
  };
  return (
    <div className="md:grid md:grid-cols-2 md:grid-rows-2">
      {/* Patient Detail */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Patient Detail"} />
        <form
          className="flex justify-center my-2"
          onSubmit={(e) => getDetails(e)}
        >
          <LabeledInput
            label={"Lab No"}
            placeholder={"Enter Lab No and press ENTER"}
            onChange={(e) => setLabNo(e.target.value)}
            value={labNo}
          />
        </form>
        <div className="flex flex-col items-center space-y-2">
          <LabeledInput
            label={"Patient Name"}
            placeholder={"Lab No"}
            disabled
          />
          <LabeledInput label={"Phone No."} placeholder={"Phone No"} disabled />
          <LabeledInput label={"Lab No"} placeholder={"Lab No"} disabled />
          <LabeledInput label={"Mr No"} placeholder={"Mr No"} disabled />
          <LabeledInput
            label={"Booking Date"}
            placeholder={"Booking Date"}
            disabled
          />
        </div>
      </div>
      {/* test detail */}
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Test Detail"} />
      </div>
      {/* test entry */}
      <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Test Entry"} />
      </div>
    </div>
  );
};

export default Biochemistry;
