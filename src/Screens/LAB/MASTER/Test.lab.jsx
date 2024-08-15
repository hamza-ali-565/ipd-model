import React, { useEffect, useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import LabelledDropDown from "../../../Components/LabelledDropDown/LabelledDropDown";
import LabelledTextArea from "../../../Components/LabeledTextArea/LabelledTextArea";
import moment from "moment";
import ButtonDis from "../../../Components/Button/ButtonDis";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import { useSelector } from "react-redux";
import LabTestModal from "../../../Components/Modal/LabTestModal";

const LabTest = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [CategoryData, setCategoryData] = useState([]);
  const [testTypeData, setTestTypeData] = useState([]);
  const [fontSizeData, setFontSizeData] = useState([]);
  const [equipmentTypeData, setEquipmentTypeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageTypeData, setAgeTypeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);
  const [togglePage, setTogglePage] = useState(false);
  const [testName, setTestName] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [testType, setTestType] = useState("");
  const [reportDays, setReportdays] = useState("");
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const [labData, setLabData] = useState(null);
  const [style, setStyle] = useState([
    { bold: false },
    { italic: false },
    { underline: false },
    { fontsize: "8px" },
  ]);
  const [rangeInfo, setRangeInfo] = useState([
    {
      equipment: "",
      min: "",
      max: "",
      fromAge: "",
      toAge: "",
      unit: "",
      normalRanges: "",
      gender: "",
      ageType: "",
    },
  ]);
  const [previewInfo, setPreview] = useState([
    {
      equipment: "",
      min: "",
      max: "",
      fromAge: "",
      toAge: "",
      unit: "",
      normalRanges: "",
      gender: "",
      ageType: "",
    },
  ]);

  const url = useSelector((item) => item?.url);

  // contain Page data
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
      { name: "8px" },
      { name: "10px" },
      { name: "12px" },
      { name: "14px" },
      { name: "16px" },
    ]);
    setPreview([
      {
        equipment: "",
        min: "",
        max: "",
        fromAge: "",
        toAge: "",
        unit: "",
        normalRanges: "",
        gender: "",
        ageType: "",
      },
    ]);
    setRangeInfo([
      {
        equipment: "",
        min: "",
        max: "",
        fromAge: "",
        toAge: "",
        unit: "",
        normalRanges: "",
        gender: "",
        ageType: "",
      },
    ]);
    setEquipmentTypeData([{ name: "--" }, { name: "Equipment" }]);
    setGenderData([{ name: "--" }, { name: "Male" }, { name: "Female" }]);
    setAgeTypeData([
      { name: "--" },
      { name: "Days" },
      { name: "Months" },
      { name: "Years" },
    ]);
  }, [togglePage]);

  // contain ranges data
  useEffect(() => {
    setEquipmentTypeData([{ name: "--" }, { name: "Equipment" }]);
    setGenderData([{ name: "--" }, { name: "Male" }, { name: "Female" }]);
    setAgeTypeData([
      { name: "--" },
      { name: "Days" },
      { name: "Months" },
      { name: "Years" },
    ]);
  }, [toggle]);
  const emptyRangesInfo = () => {
    console.log(previewInfo);

    setRangeInfo([
      {
        equipment: "",
        min: "",
        max: "",
        fromAge: "",
        toAge: "",
        unit: "",
        normalRanges: "",
      },
    ]);
    setEquipmentTypeData([]);
    setGenderData([]);
    setAgeTypeData([]);
    setToggle(!toggle);
  };

  const resetWholePage = async () => {
    console.log("yoy bro");
    setTestName("");
    setDepartment("");
    setDepartmentData([]);
    setCategoryData([]);
    setCategory("");
    setTestTypeData([]);
    setTestType("");
    setReportdays("");
    setFontSizeData([]);
    setEquipmentTypeData([]);
    setGenderData([]);
    setAgeTypeData([]);
    setActive(false);
    setStyle([
      { bold: false },
      { italic: false },
      { underline: false },
      { fontsize: "8px" },
    ]);
    setLabData(null);
    setTogglePage(!togglePage);
  };

  /////

  const handleInputChange = (e, index, field, type) => {
    setErrorMessage("");
    let value;
    if (type === "select") {
      // Handle the case when the input is a dropdown/select
      value = e;
    } else {
      // Handle other cases (text input, number input, etc.)
      value = e.target.value;
    }
    setRangeInfo((prevRangeInfo) => {
      const updatedItems = [...prevRangeInfo];
      if (updatedItems[index]) {
        const newItem = { ...updatedItems[index], [field]: value };
        updatedItems[index] = newItem;
      }
      //   console.log(updatedItems);
      //   setPreview(rangeInfo);
      return updatedItems;
    });
  };

  const prev = () => {
    console.log(previewInfo);
    const { ageType, fromAge, toAge, gender } = rangeInfo[0];
    // Empty Fields Check
    const params = ["equipment", "gender", "fromAge", "toAge", "ageType"];
    for (const param of params) {
      if (rangeInfo[0][param] === "") {
        setErrorMessage(`${param} is required.`);
        console.log(errorMessage);
        return;
      }
    }
    // age Greaters Check
    if (+fromAge > +toAge) {
      //        '4'        '16'

      console.log({ "from age": fromAge, toAge: toAge });
      setErrorMessage("From Age must be less than or equal to To Age.");
      return;
    } else if (fromAge <= 0 || toAge <= 0) {
      setErrorMessage("From Age And To Age Must be greater than 1.");
      return;
    }
    // duplicate Check
    const duplicate = previewInfo.some(
      (item) =>
        item.gender === gender &&
        item.fromAge === fromAge &&
        item.toAge === toAge &&
        item.ageType === ageType
    );

    if (duplicate) {
      console.error("Duplicate entry found!");
      setErrorMessage("Gender With Same Age Group not Allowed Twise!");
      return;
    }
    // avoiding first empty index but failed
    if (Object.keys(previewInfo[0]).length === 0) {
      setPreview(rangeInfo);
    } else {
      setPreview([...previewInfo, ...rangeInfo]);
    }
  };

  const removeIndex = (index) => {
    const filterData = previewInfo.filter((items, i) => i !== index);
    setPreview(filterData);
  };

  const handleChangeStyle = (e, value) => {
    if (value === "bold") {
      setStyle((prevStyle) => {
        const newStyle = [...prevStyle];
        newStyle[0].bold = e.target.checked;
        return newStyle;
      });
      return;
    } else if (value === "italic") {
      setStyle((prevStyle) => {
        const newStyle = [...prevStyle];
        newStyle[1].italic = e.target.checked;
        return newStyle;
      });
      return;
    } else if (value === "underline") {
      setStyle((prevStyle) => {
        const newStyle = [...prevStyle];
        newStyle[2].underline = e.target.checked;
        return newStyle;
      });
      return;
    } else {
      setStyle((prevStyle) => {
        const newStyle = [...prevStyle];
        newStyle[3].fontsize = e;
        return newStyle;
      });
      return;
    }
  };

  const updateLabData = async (data) => {
    setLabData(data);
    setTestName(data?.testName);
    setDepartment(data?.department);
    setCategory(data?.category);
    setTestType(data?.testType);
    setReportdays(data?.reportDays);
    setActive(data?.active);
    setStyle(data.style);
    setPreview(data?.testRanges.length > 0 ? data?.testRanges : previewInfo);
  };

  // submit test creation/updation api
  const createLabTest = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/lab/test`,
        {
          testName,
          department,
          category,
          testType,
          reportDays,
          active,
          thisIs: category,
          style,
          testRanges: previewInfo,
          _id: (labData && labData?._id) || "",
        },
        { withCredentials: true }
      );
      console.log("response of create lab test ", response);
      setOpen(false);
      SuccessAlert({ text: "LAB CREATED / UPDATED SUCCESSFULLY", timer: 2000 });
      resetWholePage();
    } catch (error) {
      console.log("Error of createLabTest ", error);
      ErrorAlert({ text: error?.message, timer: 2000 });
      setOpen(false);
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Lab Test Creation"} />
        <div className="flex justify-center my-3">
          <LabTestModal
            title={"Update Lab Tests"}
            onClick={updateLabData}
            thisIs="Test"
          />
        </div>

        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"TEST INFORMATION"} />

          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-3 md:justify-items-center">
            <LabeledInput
              label={"Test Name"}
              onChange={(e) => setTestName(e.target.value.toUpperCase())}
              value={testName}
              placeholder={"Test Name"}
            />
            <LabelledDropDown
              label={"Department"}
              data={departmentData}
              onChange={(e) => setDepartment(e)}
            />
            <LabelledDropDown
              label={"Category"}
              data={CategoryData}
              onChange={(e) => setCategory(e)}
            />
            <LabelledDropDown
              label={"Test Type"}
              data={testTypeData}
              onChange={(e) => setTestType(e)}
            />
            <LabeledInput
              label={"Report Days"}
              type={"Number"}
              value={reportDays}
              onChange={(e) => setReportdays(e.target.value)}
              placeholder={"report Days"}
            />
            <LabeledInput
              label={"Active"}
              type={"checkbox"}
              checked={active}
              onChange={(e) => setActive(e.target.checked)}
            />
          </div>
          {labData && (
            <div className="flex justify-around mt-3">
              <div>
                <span className="font-bold">Test type</span>:{" "}
                {labData?.testType}
              </div>
              <div>
                <span className="font-bold">Department</span>:{" "}
                {labData?.department}
              </div>
              <div>
                <span className="font-bold">Category</span>: {labData?.category}
              </div>
            </div>
          )}
        </div>
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"TEST STYLING"} />

          <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
            <LabeledInput
              label={"Bold"}
              type={"checkbox"}
              onChange={(e) => {
                handleChangeStyle(e, "bold");
              }}
              checked={style[0].bold}
            />
            <LabeledInput
              label={"Italic"}
              type={"checkbox"}
              onChange={(e) => {
                handleChangeStyle(e, "italic");
              }}
              checked={style[1]?.italic}
            />
            <LabeledInput
              label={"Underline"}
              type={"checkbox"}
              onChange={(e) => {
                handleChangeStyle(e, "underline");
              }}
              checked={style[2]?.underline}
            />
            <LabelledDropDown
              label={"Font Size"}
              data={fontSizeData}
              onChange={(e) => {
                handleChangeStyle(e, "fontSize");
              }}
            />
          </div>
        </div>
        {category === "Heading" ? null : (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <CenterHeading title={"TEST RANGES INFO"} />
            {rangeInfo.map((_, index) => (
              <div>
                <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
                  <LabelledDropDown
                    label={"Equipment Type"}
                    data={equipmentTypeData}
                    onChange={(selectedOption) =>
                      handleInputChange(
                        selectedOption,
                        index,
                        "equipment",
                        "select"
                      )
                    }
                  />
                  <LabelledDropDown
                    label={"Gender"}
                    data={genderData}
                    onChange={(selectedOption) =>
                      handleInputChange(
                        selectedOption,
                        index,
                        "gender",
                        "select"
                      )
                    }
                  />
                </div>
                <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
                  <LabeledInput
                    label={"Min"}
                    onChange={(e) => handleInputChange(e, index, "min")}
                    type={"Number"}
                    value={rangeInfo[0].min}
                    placeholder={"Min Range"}
                  />
                  <LabeledInput
                    label={"Max"}
                    onChange={(e) => handleInputChange(e, index, "max")}
                    type={"Number"}
                    value={rangeInfo[0].max}
                    placeholder={"Max Range"}
                  />
                </div>

                <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-3 md:justify-items-center">
                  <LabeledInput
                    label={"From Age"}
                    onChange={(e) => handleInputChange(e, index, "fromAge")}
                    type={"Number"}
                    value={rangeInfo[0].fromAge}
                    placeholder={"From Age"}
                  />
                  <LabeledInput
                    label={"To Age"}
                    onChange={(e) => handleInputChange(e, index, "toAge")}
                    type={"Number"}
                    placeholder={"To Age"}
                    value={rangeInfo[0].toAge}
                  />
                  <LabelledDropDown
                    label={"Age Type"}
                    data={ageTypeData}
                    onChange={(selectedOption) =>
                      handleInputChange(
                        selectedOption,
                        index,
                        "ageType",
                        "select"
                      )
                    }
                  />
                </div>
                <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
                  <LabelledTextArea
                    label={"Unit"}
                    onChange={(e) => handleInputChange(e, index, "unit")}
                    value={rangeInfo[0].unit}
                    placeholder={"Unit"}
                  />
                  <LabelledTextArea
                    label={"Normal Ranges"}
                    onChange={(e) =>
                      handleInputChange(e, index, "normalRanges")
                    }
                    value={rangeInfo[0].normalRanges}
                    placeholder={"Normal Ranges"}
                  />
                </div>
                <div className="flex justify-center mt-3 space-x-3">
                  <ButtonDis title={"Add"} onClick={prev} />
                  <ButtonDis title={"Reset"} onClick={emptyRangesInfo} />
                </div>
              </div>
            ))}

            {errorMessage && (
              <p className="flex justify-center font-bold text-red-600 text-xs md:text-sm">
                *{errorMessage}*
              </p>
            )}
          </div>
        )}
        {previewInfo && (
          <div>
            <div className="container mx-auto mt-3">
              <div className="mt-3 grid grid-cols-10 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
                <p>Equipment</p>
                <p>Gender</p>
                <p>Min</p>
                <p>Max</p>
                <p>Unit</p>
                <p>From Age</p>
                <p>To Age</p>
                <p>Age Type</p>
                <p>Normal Ranges</p>
                <p>Remove</p>
              </div>
            </div>
            {/* // */}
            {previewInfo &&
              previewInfo.map(
                (items, i) =>
                  items.equipment && (
                    <div className="container mx-auto mt-3">
                      <div className="mt-3 grid grid-cols-10 text-xs justify-items-center items-center h-10 border border-gray-300">
                        {items.equipment}
                        <p>{items.gender}</p>
                        <p>{items.min}</p>
                        <p>{items.max}</p>
                        <p>{items.unit}</p>
                        <p>{items.fromAge}</p>
                        <p>{items.toAge}</p>
                        <p>{items.ageType}</p>
                        <p>{items.normalRanges.length > 0 ? "True" : "nill"}</p>
                        <p
                          className="text-red-500 cursor-pointer font-bold hover:underline hover:text-red-700 "
                          onClick={() => removeIndex(i)}
                        >
                          Remove
                        </p>
                      </div>
                    </div>
                  )
              )}
          </div>
        )}
      </div>
      <div className="flex justify-center space-x-3 mt-3">
        <ButtonDis title={"Save"} onClick={createLabTest} />
        <ButtonDis title={"Refresh"} onClick={resetWholePage} />
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default LabTest;
