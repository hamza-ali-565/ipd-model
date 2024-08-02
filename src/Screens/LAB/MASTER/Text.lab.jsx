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
  const [equipmentTypeData, setEquipmentTypeData] = useState([]);
  const [genderData, setGenderData] = useState([]);
  const [ageTypeData, setAgeTypeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [toggle, setToggle] = useState(false);
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

  const rangeData = [
    {
      EquipmentType: "",
      gender: "",
      min: 0,
      max: 0,
      fromAge: 0,
      toAge: 0,
      ageType: "",
      normalRanges: "",
    },
  ];

  /////

  const handleInputChange = (e, index, field, type) => {
    setErrorMessage("");
    console.log(e);
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
    if (toAge < fromAge) {
      setErrorMessage("From Age must be less than or equal To Age.");
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
      // Display your error message or take necessary action
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

 const removeIndex = (index)=>{
  const filterData = previewInfo.filter((items, i)=> i !== index)
  setPreview(filterData)
 }
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
                    handleInputChange(selectedOption, index, "gender", "select")
                  }
                />
              </div>
              <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-2 md:justify-items-center">
                <LabeledInput
                  label={"Min"}
                  onChange={(e) => handleInputChange(e, index, "min")}
                  type={"Number"}
                  value={rangeInfo[0].min}
                />
                <LabeledInput
                  label={"Max"}
                  onChange={(e) => handleInputChange(e, index, "max")}
                  type={"Number"}
                  value={rangeInfo[0].max}
                />
              </div>

              <div className="flex items-center flex-col space-y-2 mt-3 md:grid md:grid-cols-3 md:justify-items-center">
                <LabeledInput
                  label={"From Age"}
                  onChange={(e) => handleInputChange(e, index, "fromAge")}
                  type={"Number"}
                  value={rangeInfo[0].fromAge}
                />
                <LabeledInput
                  label={"To Age"}
                  onChange={(e) => handleInputChange(e, index, "toAge")}
                  type={"Number"}
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
                />
                <LabelledTextArea
                  label={"Normal Ranges"}
                  onChange={(e) => handleInputChange(e, index, "normalRanges")}
                  value={rangeInfo[0].normalRanges}
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
    </div>
  );
};

export default LabTest;
