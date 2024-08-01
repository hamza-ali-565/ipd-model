import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import LabelledDropDown from "../../../Components/LabelledDropDown/LabelledDropDown";
import LabelledTextArea from "../../../Components/LabeledTextArea/LabelledTextArea";
import moment from "moment";
import ButtonDis from "../../../Components/Button/ButtonDis";

const LabTest = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [testTypeData, setTestTypeData] = useState([]);
  const [fontSizeData, setFontSizeData] = useState([]);
  useEffect(() => {
    setDepartmentData([
      { name: "--" },
      { name: "Biochemistry" },
      { name: "Haematology" },
      { name: "Microbiology" },
      { name: "Histopathology" },
      { name: "Serology" },
      { name: "Cytology" },
      { name: "Parasitology" },
      { name: "Chemical Pathology" },
    ]);

    setCategoryData([
      { name: "--" },
      { name: "Test" },
      { name: "Heading" },
      { name: "parameter" },
    ]);
    setTestTypeData([
      { name: "--" },
      { name: "Routine" },
      { name: "Special" },
      { name: "Out Source" },
    ]);
    setFontSizeData([
      { name: "--" },
      { name: "8px" },
      { name: "10px" },
      { name: "12px" },
      { name: "14px" },
      { name: "16px" },
    ]);
  }, []);

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Lab Test Creation"} />

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"TEST INFORMATION"} />

          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-3 md:justify-items-center">
            <LabeledInput label={"Test Name"} />
            <LabelledDropDown label={"Department"} data={departmentData} />
            <LabelledDropDown label={"Category"} data={CategoryData} />
            <LabelledDropDown label={"Test Type"} data={testTypeData} />
            <LabeledInput label={"Report Days"} type={"Number"} />
            <LabeledInput label={"Active"} type={"checkbox"} />
          </div>
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"TEST STYLING"} />

          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
            <LabeledInput label={"Bold"} type={"checkbox"} />
            <LabeledInput label={"Italic"} type={"checkbox"} />
            <LabeledInput label={"Underline"} type={"checkbox"} />
            <LabelledDropDown label={"Font Size"} data={fontSizeData} />
          </div>
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"TEST RANGES INFO"} />
          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
            <LabelledDropDown label={"Equipment Type"} data={fontSizeData} />
            <LabelledDropDown label={"Gender"} data={fontSizeData} />
          </div>
          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
            <LabeledInput label={"Min"} />
            <LabeledInput label={"Max"} />
          </div>

          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-3 md:justify-items-center">
            <LabeledInput label={"From Age"} />
            <LabeledInput label={"To Age"} />
            <LabelledDropDown label={"Age Type"} data={fontSizeData} />
          </div>
          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
            <LabelledTextArea label={"Unit"} />
            <LabelledTextArea label={"Normal Ranges"} />
          </div>
          <div className="flex justify-center mt-3">
            <ButtonDis title={"Add"} />
          </div>
        </div>

        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-11 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
            <p>Equipment</p>
            <p>Gender</p>
            <p>Min</p>
            <p>Max</p>
            <p>Unit</p>
            <p>From Age</p>
            <p>To Age</p>
            <p>Age Type</p>
            <p>Normal Ranges</p>
            <p>Update</p>
            <p>Remove</p>
          </div>
        </div>
        {/* // */}
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-11 text-xs justify-items-center items-center h-10 border border-gray-300">
            <p>Equipment</p>
            <p>Gender</p>
            <p>Min</p>
            <p>Max</p>
            <p>Unit</p>
            <p>From Age</p>
            <p>To Age</p>
            <p>Age Type</p>
            <p>Normal Ranges</p>
            <p>Update</p>
            <p>Remove</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LabTest;
