import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import moment from "moment/moment";
import ButtonDis from "../../../Components/Button/ButtonDis";

const Serology = () => {
  const [labNo, setLabNo] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [labResultData, setLabResultData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [open, setOpen] = useState(false);
  const [testMatchedRange, setTestMatchedRange] = useState([]);
  const [GroupTestId, setGroupTestId] = useState("");
  const [testName, setTestName] = useState("");

  const url = useSelector((items) => items?.url);

  const resetDetails = () => {
    setLabNo("");
    setPatientData([]);
    setLabResultData([]);
    setLabData([]);
    setTestMatchedRange([]);
    setGroupTestId("");
    setTestName("");
  };

  // get groupData
  const getGroupData = async (age, gender, groupParams) => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/lab/bioGroupRanges`,
        { age, gender, groupParams },
        { withCredentials: true }
      );
      console.log(response.data.data);
      setTestMatchedRange(response?.data?.data?.data);
      setOpen(false);
    } catch (error) {
      console.log("Error of get group data ", error);
      setOpen(false);
    }
  };

  // set ranges according to age and view data to enter result
  const viewDataToEnterResult = (data) => {
    setGroupTestId(data?._id);
    setTestName(data?.testName);
    const age =
      patientData.length > 0
        ? `${patientData[0]?.ageYear ? patientData[0]?.ageYear : "0"} Years ${
            patientData[0]?.ageMonth ? patientData[0]?.ageMonth : "0"
          } Months ${
            patientData[0]?.ageDay ? patientData[0]?.ageDay : "0"
          } Days`
        : "";

    // extact gender to get get ranges gender wise
    let gender = patientData[0].gender;

    // convert age into object
    const parseAge = (ageString) => {
      const regex = /(\d+)\s*Years\s*(\d+)\s*Months\s*(\d+)\s*Days/;
      const matches = ageString.match(regex);

      if (matches) {
        return {
          years: parseInt(matches[1], 10),
          months: parseInt(matches[2], 10),
          days: parseInt(matches[3], 10),
        };
      }

      return null; // or handle the error as you like
    };

    //  converted age
    const givenAge = parseAge(age);
    console.log("data:", data?.testName);

    if (data.groupParams.length > 0) {
      getGroupData(givenAge, gender, data);
      return;
    }

    // / Convert given age to days for comparison
    const totalDays = moment
      .duration({
        years: givenAge.years,
        months: givenAge.months,
        days: givenAge.days,
      })
      .asDays();

    // extract normal ranges from data
    let normalRanges = [];
    if (data.groupParams.length <= 0) {
      normalRanges = data?.testRanges;
      console.log(normalRanges);
    }

    // Function to convert age range to days
    const convertToDays = (age, ageType) => {
      switch (ageType) {
        case "Days":
          return age;
        case "Months":
          return moment.duration(age, "months").asDays();
        case "Years":
          return moment.duration(age, "years").asDays();
        default:
          return 0;
      }
    };

    // Find matching range
    const matchingRange = normalRanges.find((range) => {
      const fromAgeInDays = convertToDays(range.fromAge, range.ageType);
      const toAgeInDays = convertToDays(range.toAge, range.ageType);
      return (
        totalDays >= fromAgeInDays &&
        totalDays <= toAgeInDays &&
        range?.gender?.toLowerCase() === gender?.toLowerCase()
      );
    });

    setTestMatchedRange([
      {
        testRanges: matchingRange ? matchingRange : "",
        // testRanges: matchingRange === undefined ? {} : matchingRange,
        testCode: data?.testCode,
        testName: data?.testName,
        testId: data._id,
      },
    ]);
    console.log("Matching Range:", matchingRange);
  };

  const handlerEffect = (value, type, code, name) => {
    let updateArray;
    console.log(testMatchedRange);
    if (type === "result") {
      if (testMatchedRange[0].testRanges?.equipment) {
        testMatchedRange[0].testRanges.result = value; // Add or modify the result property
        testMatchedRange[0].testRanges.testCode = code; // Add the testCode property
        testMatchedRange[0].testRanges.testName = name; // Add the testCode property
        return testMatchedRange[0].testRanges;
      } else {
        updateArray = testMatchedRange.map((items) => {
          if (items?.testCode === code) {
            return { ...items, result: value };
          }
          return items;
        });
        setTestMatchedRange(updateArray);
      }
      return;
    } else {
      if (testMatchedRange[0].testRanges?.equipment) {
        return (testMatchedRange[0].testRanges.remarks = value);
      } else {
        updateArray = testMatchedRange.map((items) => {
          if (items?.testCode === code) {
            return { ...items, remarks: value };
          }
          return items;
        });
        setTestMatchedRange(updateArray);
      }
    }
  };

  //getDetail
  const getDetail1 = async (labNumber) => {
    try {
      setOpen(true);
      console.log(" i am here");
      const response = await axios.get(
        `${url}/lab/biochemistry?labNo=${labNumber}&department=Serology`,
        {
          withCredentials: true,
        }
      );
      console.log("response of getDetails", response?.data?.data);

      setPatientData(response?.data?.data.patientData);
      setLabData(response?.data?.data.labCDetails);
      setLabResultData(response?.data?.data.labData);
      setLabNo("");
      setOpen(false);
    } catch (error) {
      console.log("error of get details", error);
      setOpen(false);
      resetDetails();
    }
  };
  // get Details api

  const getDetails = async (e) => {
    try {
      e.preventDefault();
      if (!labNo) {
        throw new Error("PLEASE ENTER LAB NO.");
      }
      setOpen(true);
      console.log(" i am here");
      const response = await axios.get(
        `${url}/lab/biochemistry?labNo=${labNo}&department=Serology`,
        {
          withCredentials: true,
        }
      );
      console.log("response of getDetails", response?.data?.data);

      setPatientData(response?.data?.data.patientData);
      setLabData(response?.data?.data.labCDetails);
      setLabResultData(response?.data?.data.labData);
      setLabNo("");
      setOpen(false);
      setTestMatchedRange([]);
      setGroupTestId("");
    } catch (error) {
      console.log("error of get details", error);
      let mylab = labNo;
      setOpen(false);
      resetDetails();
      if (error.response) {
        if (error.response.status === 402) {
          ErrorAlert({
            text: "NO DATA FOUND AGAINST THIS LAB NO.",
            timer: 2000,
          });
          return;
        } else if (error.response.status === 403) {
          ErrorAlert({ text: "ALL TESTS ARE DELETED !!!", timer: 2000 });
          return;
        } else if (error.response.status === 401) {
          ErrorAlert({
            text: `ALL RESULT ENTERED ALREADY AGAINST LAB NO ${mylab}!!!`,
            timer: 2000,
          });
          return;
        } else if (error.response.status === 400) {
          ErrorAlert({
            text: `NO TEST FOR BIOCHEMISTRY AGAINST LAB NO ${mylab}!!!`,
            timer: 2000,
          });
          return;
        }
        return;
      }

      ErrorAlert({
        text: error.message,
        timer: 2000,
      });
    }
  };

  // const Submit Result
  const submitResult = async (e) => {
    try {
      setOpen(true);
      const response = await axios.post(
        `${url}/lab/labResultEntry`,
        {
          mrNo: labData[0]?.mrNo,
          labNo: labData[0]?.labNo,
          resultDepart: labResultData[0]?.department,
          resultData:
            (testMatchedRange[0].testRanges?.equipment && [
              testMatchedRange[0].testRanges,
            ]) ||
            testMatchedRange,
          testId:
            (testMatchedRange[0]?.testId && testMatchedRange[0]?.testId) ||
            GroupTestId,
          testName: testName,
        },
        { withCredentials: true }
      );
      console.log("response of submit result ", response);
      setOpen(false);
      await getDetail1(labData[0]?.labNo);
      setTestMatchedRange([]);
      setGroupTestId("");
      setTestName("");
      SuccessAlert({ text: "RESULT ENTERED SUCCESSFULLY !!!", timer: 2000 });
    } catch (error) {
      console.log("Error of submit result ", error);
      setOpen(false);
    }
  };

  return (
    <div>
      <CenterHeading title={"DEPARTMENT OF SEROLOGY"} />
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
              value={
                patientData.length > 0
                  ? `${patientData[0].patientType} ${patientData[0].patientName}  ${patientData[0].relativeType} ${patientData[0].relativeName}`
                  : ""
              }
            />
            <LabeledInput
              label={"Phone No."}
              placeholder={"Phone No"}
              disabled
              value={(patientData.length > 0 && patientData[0].cellNo) || ""}
            />
            <LabeledInput
              label={"Lab No"}
              placeholder={"Lab No"}
              disabled
              value={(labData.length > 0 && labData[0].labNo) || ""}
            />
            <LabeledInput
              label={"Mr No"}
              placeholder={"Mr No"}
              disabled
              value={(patientData.length > 0 && patientData[0].MrNo) || ""}
            />
            <LabeledInput
              label={"Booking Date"}
              placeholder={"Booking Date"}
              disabled
              value={(labData.length > 0 && labData[0].createdOn) || ""}
            />
            <LabeledInput
              label={"Gender"}
              placeholder={"Gender"}
              disabled
              value={patientData?.length > 0 ? patientData[0]?.gender : ""}
            />
            <LabeledInput
              label={"Age"}
              placeholder={"Age"}
              disabled
              value={
                patientData.length > 0
                  ? `${
                      patientData[0]?.ageYear ? patientData[0]?.ageYear : "0"
                    } Years ${
                      patientData[0]?.ageMonth ? patientData[0]?.ageMonth : "0"
                    } Months ${
                      patientData[0]?.ageDay ? patientData[0]?.ageDay : "0"
                    } Days`
                  : ""
              }
            />
          </div>
        </div>
        {/* test detail */}
        <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Test Detail"} />
          <div className="flex flex-col items-center space-y-2 mt-3">
            {labResultData.map((items, index) => (
              <div
                key={index}
                className="cursor-pointer hover:text-blue-600 hover:font-bold"
                onClick={() => viewDataToEnterResult(items)}
              >
                <LabeledInput
                  label={"Test Name"}
                  value={`${items?.testName} ${items?.thisIs}`}
                  disabled
                />
              </div>
            ))}
          </div>
        </div>
        {/* test entry */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"Test Entry"} />
          {/* Header */}
          <div className="container mx-auto mt-3">
            <div className="mt-3 grid grid-cols-8 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
              <p>Test Code</p>
              <p>Test Name</p>
              <p>Min</p>
              <p>Max</p>
              <p>Unit</p>
              <p>Ranges</p>
              <p>Result</p>
              <p>Remarks</p>
            </div>
          </div>
          {/* data */}
          {testMatchedRange.length > 0 &&
            testMatchedRange.map((items, index) => (
              <div className="container mx-auto mt-3" key={index}>
                <div className="mt-3 grid grid-cols-8 text-xs justify-items-center items-center h-10 border border-gray-300">
                  <p>{items?.testCode}</p>
                  <p
                    className={
                      items?.bold && items?.bold === true ? "font-bold" : ""
                    }
                  >
                    {items?.testName}
                  </p>
                  <p>
                    {(items?.testRanges?.equipment && items?.testRanges?.min) ||
                      (items?.min && items?.min) ||
                      ""}
                  </p>
                  <p>
                    {(items?.testRanges?.equipment && items?.testRanges?.max) ||
                      (items?.max && items?.max) ||
                      ""}
                  </p>
                  <p>
                    {(items?.testRanges?.equipment &&
                      items?.testRanges?.unit) ||
                      (items?.unit && items?.unit) ||
                      ""}
                  </p>
                  <p>
                    {(items?.testRanges?.equipment &&
                      items?.testRanges?.normalRanges) ||
                      (items?.testRanges && items?.testRanges) ||
                      ""}
                  </p>
                  <p>
                    <input
                      className="w-24 rounded-xl p-1"
                      placeholder="result"
                      name=""
                      value={items?.category === "Heading" ? "" : items?.result}
                      onChange={(e) =>
                        handlerEffect(
                          e.target.value,
                          "result",
                          items?.testCode,
                          items?.testName
                        )
                      }
                      id=""
                      disabled={
                        (items?.category && items?.category === "Heading"
                          ? true
                          : false) || false
                      }
                    />
                  </p>
                  <p>
                    <input
                      className="w-24 rounded-xl p-1"
                      placeholder="remarks"
                      min={0}
                      name=""
                      onChange={(e) =>
                        handlerEffect(
                          e.target.value,
                          "remarks",
                          items?.testCode
                        )
                      }
                      value={
                        items?.category === "Heading" ? "" : items?.remarks
                      }
                      disabled={
                        (items?.category && items?.category === "Heading"
                          ? true
                          : false) || false
                      }
                    />
                  </p>
                </div>
              </div>
            ))}
          <div className="flex justify-center space-x-2 mt-5">
            <ButtonDis title={"Save"} onClick={submitResult} />
            <ButtonDis title={"Refresh"} onClick={resetDetails} />
          </div>
        </div>
        <Loader onClick={open} title={"Please Wait ..."} />
      </div>
    </div>
  );
};

export default Serology;
