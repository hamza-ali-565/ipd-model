import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabTestModal from "../../../Components/Modal/LabTestModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import LabelledDropDown from "../../../Components/LabelledDropDown/LabelledDropDown";
import ButtonDis from "../../../Components/Button/ButtonDis";

const LabGroup = () => {
  const [groupName, setGroupName] = useState("");
  const [department, setDepartment] = useState("");
  const [testType, setTestType] = useState("");
  const [reportDays, setReportDays] = useState("");
  const [active, setActive] = useState(false);
  const [departmentData, setDepartmentData] = useState([]);
  const [testTypeData, setTestTypeData] = useState([]);
  const [fontSizeData, setFontSizeData] = useState([]);
  const [togglePage, setTogglePage] = useState(false);
  const [groupParams, setGroupParams] = useState([]);
  const [selectedTest, setSelectedTest] = useState(null);
  const [message, setMessage] = useState("");
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
    setMessage("");
  };

  // add group info
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
      return;
    }
  };

  // reset selected test
  const resetGroupFormat = () => {
    console.log(groupParams);

    setSelectedTest(null);
    setMessage("");
    setFontSizeData([]);
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
    setTogglePage(!togglePage);
  };

  // reset whole page
  const resetWholePage = () => {
    setGroupName("");
    setDepartment("");
    setTestType("");
    setReportDays("");
    setDepartmentData([]);
    setTestTypeData([]);
    setGroupParams([]);
    setActive(false);
    resetGroupFormat();
  };
  // add group param
  const addToGroupParams = () => {
    if (groupFormat[0].testName === "") {
      setMessage("Please Select Test First !!!");
      return;
    }

    const prevDetails = groupParams.filter(
      (items) => groupFormat[0].testCode === items?.testCode
    );
    if (prevDetails.length > 0) {
      setMessage("Test Already Exist");
      resetGroupFormat();
      return;
    }
    if (groupParams.length <= 0) {
      setGroupParams(groupFormat);
      resetGroupFormat();
      return;
    }
    setGroupParams((prevGroupParams) => [...prevGroupParams, ...groupFormat]);
    resetGroupFormat();
  };

  // remove object from group params
  const clearIndex = (itemIndex) => {
    const filterData = groupParams.filter((_, index) => index !== itemIndex);
    setGroupParams(filterData);
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Lab Group Creation"} />
        <div className="flex flex-col items-center space-y-2 mt-2 md:grid md:grid-cols-3 md:justify-items-center md:gap-y-2">
          <LabTestModal title={"Update Group"} thisIs={"Group"} />
          <LabeledInput
            label={"Group Name"}
            placeholder={"Group Name"}
            onChange={(e) => setGroupName(e.target.value.toUpperCase())}
            value={groupName}
          />
          <LabelledDropDown
            label={"Department"}
            data={departmentData}
            onChange={(name) => setDepartment(name)}
          />
          <LabelledDropDown
            label={"Test Type"}
            data={testTypeData}
            onChange={(name) => setTestType(name)}
          />
          <LabeledInput
            label={"Report Days"}
            placeholder={"Report Days"}
            value={reportDays}
            onChange={(e) => setReportDays(e.target.value)}
          />
          <LabeledInput
            label={"Active"}
            type={"Checkbox"}
            checked={active}
            onChange={(e) => setActive(e.target.checked)}
          />
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
          <ButtonDis title={"ADD"} onClick={addToGroupParams} />
          <ButtonDis
            title={"Reset"}
            onClick={() => {
              resetGroupFormat();
              console.log(groupFormat);
            }}
          />
        </div>
        {message && (
          <p className="text-center font-bold text-red-600">{message}</p>
        )}
      </div>
      {groupParams.length > 0 && (
        <div>
          <div className="container mx-auto mt-3">
            <div className="mt-3 grid grid-cols-9 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
              <p>Serial No</p>
              <p>Test Code</p>
              <p>Test Name</p>
              <p>Category</p>
              <p>Bold</p>
              <p>Italic</p>
              <p>Underline</p>
              <p>Font Size</p>
              <p>Remove</p>
            </div>
          </div>
          {groupParams.map((items, index) => (
            <div className="container mx-auto mt-1" key={index}>
              <div className="mt-1 grid grid-cols-9 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.serialNo}</p>
                <p>{items?.testCode}</p>
                <p>{items?.testName}</p>
                <p>{items?.category}</p>
                <p>{items?.bold === true ? "true" : "false"}</p>
                <p>{items?.italic === true ? "true" : "false"}</p>
                <p>{items?.underline === true ? "true" : "false"}</p>
                <p>{items?.fontSize}</p>
                <p
                  className="text-red-500 font-bold cursor-pointer hover:text-red-700 hover:underline"
                  onClick={() => clearIndex(index)}
                >
                  Remove
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center space-x-3 my-4">
        <ButtonDis title={"Save"} />
        <ButtonDis title={"Refresh"} onClick={resetWholePage} />
      </div>
    </div>
  );
};

export default LabGroup;
