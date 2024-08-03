import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabTestModal from "../../../Components/Modal/LabTestModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import LabelledDropDown from "../../../Components/LabelledDropDown/LabelledDropDown";
import ButtonDis from "../../../Components/Button/ButtonDis";

const LabGroup = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [testTypeData, setTestTypeData] = useState([]);
  const [fontSizeData, setFontSizeData] = useState([]);
  const [togglePage, setTogglePage] = useState(false);
  const [department, setDepartment] = useState("");
  const [groupParams, setGroupParams] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [groupFormat, setGroupFormat] = useState([
    {
      serialNo: "",
      testCode: "",
      testName: "",
      category: "",
      bold: false,
      italic: false,
      underline: false,
      fontSize: "8px",
    },
  ]);
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

    setTestTypeData([
      { name: "--" },
      { name: "Routine" },
      { name: "Special" },
      { name: "Out Source" },
    ]);
    setFontSizeData([
      { name: "8px" },
      { name: "10px" },
      { name: "12px" },
      { name: "14px" },
      { name: "16px" },
    ]);
  }, [togglePage]);
  const pushDataToSelectedArray = (data) => {
    setSelectedTest(data);
    groupDataCreation(data);
  };
  const groupDataCreation = (data, value) => {
    let newFormat;
    if (value === "bold") {
      setGroupFormat((prevFormat) => {
        newFormat = [...prevFormat];
        newFormat[0].bold = data.target.checked;
        return newFormat;
      });
      return;
    } else if (value === "italic") {
      setGroupFormat((prevFormat) => {
        newFormat = [...prevFormat];
        newFormat[0].italic = data.target.checked;
        return newFormat;
      });
      return;
    } else if (value === "underline") {
      setGroupFormat((prevFormat) => {
        newFormat = [...prevFormat];
        newFormat[0].underline = data.target.checked;
        return newFormat;
      });
      return;
    } else if (value === "fontsize") {
      setGroupFormat((prevFormat) => {
        newFormat = [...prevFormat];
        newFormat[0].fontSize = data;
        return newFormat;
      });
      return;
    } else {
      setGroupFormat((prevFormat) => {
        newFormat = [...prevFormat];
        newFormat[0].testCode = data?.testCode;
        newFormat[0].testName = data?.testName;
        newFormat[0].serialNo = groupParams.length + 1;
        newFormat[0].category = data?.category;
        return newFormat;
      });
    }
  };

  const resetGroupParams = () => {
    setSelectedTest(null);
    // setFontSizeData([]);
    setGroupFormat([
      {
        serialNo: "",
        testCode: "",
        testName: "",
        category: "",
        bold: false,
        italic: false,
        underline: false,
        fontSize: "8px",
      },
    ]);
    setFontSizeData([
      { name: "8px" },
      { name: "10px" },
      { name: "12px" },
      { name: "14px" },
      { name: "16px" },
    ]);
    setTogglePage(!togglePage)
  };

  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Lab Group Creation"} />
        <div className="flex flex-col items-center space-y-2 mt-2 md:grid md:grid-cols-3 md:justify-items-center md:gap-y-2">
          <LabTestModal title={"Update Lab"} thisIs={"Group"} />
          <LabeledInput label={"Group Name"} placeholder={"Group Name"} />
          <LabelledDropDown
            label={"Department"}
            data={departmentData}
            onChange={(name) => setDepartment(name)}
          />
          <LabelledDropDown label={"Test Type"} data={testTypeData} />
          <LabeledInput label={"Report Days"} placeholder={"Report Days"} />
          <LabeledInput label={"Active"} type={"Checkbox"} />
        </div>
      </div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Params of Group"} />
        <div className="flex flex-col items-center space-y-2 mt-2 md:grid md:grid-cols-3 md:justify-items-center md:gap-y-2">
          <LabTestModal
            title={"Select Test"}
            thisIs={department}
            onClick={(data) => pushDataToSelectedArray(data)}
          />
          <LabeledInput
            label={"Test Code"}
            disabled={true}
            placeholder={"Test Code"}
            value={(selectedTest && selectedTest?.testCode) || ""}
          />
          <LabeledInput
            label={"Test Name"}
            disabled={true}
            placeholder={"Group Name"}
            value={(selectedTest && selectedTest?.testName) || ""}
          />
        </div>
      </div>

      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"TEST STYLING"} />

        <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
          <LabeledInput
            label={"Bold"}
            type={"checkbox"}
            onChange={(e) => {
              groupDataCreation(e, "bold");
            }}
            checked={groupFormat[0].bold}
          />
          <LabeledInput
            label={"Italic"}
            type={"checkbox"}
            onChange={(e) => {
              groupDataCreation(e, "italic");
            }}
            checked={groupFormat[0]?.italic}
          />
          <LabeledInput
            label={"Underline"}
            type={"checkbox"}
            onChange={(e) => {
              groupDataCreation(e, "underline");
            }}
            checked={groupFormat[0]?.underline}
          />
          <LabelledDropDown
            label={"Font Size"}
            data={fontSizeData}
            onChange={(e) => {
              groupDataCreation(e, "fontsize");
            }}
          />
        </div>

        <div className="flex justify-center space-x-3 mt-3">
          <ButtonDis title={"ADD"} />
          <ButtonDis
            title={"Reset"}
            onClick={() => {
              resetGroupParams();
              console.log(groupFormat);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LabGroup;
