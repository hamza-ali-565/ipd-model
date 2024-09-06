import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import { useSelector } from "react-redux";
import axios from "axios";
import { ErrorAlert, SuccessAlert } from "../../../Components/Alert/Alert";
import Loader from "../../../Components/Modal/Loader";
import moment from "moment/moment";
import ButtonDis from "../../../Components/Button/ButtonDis";
import SpecimenModal from "../../../Components/Modal/SpecimenModal";
import ModalledInput from "../../../Components/ModalledInput/ModalledInput";

const Microbiology = () => {
  const [labNo, setLabNo] = useState("");
  const [patientData, setPatientData] = useState([]);
  const [labResultData, setLabResultData] = useState([]);
  const [labData, setLabData] = useState([]);
  const [open, setOpen] = useState(false);
  const [testMatchedRange, setTestMatchedRange] = useState([]);
  const [GroupTestId, setGroupTestId] = useState("");
  const [testName, setTestName] = useState("");
  const [specimen, setSpecimen] = useState(null);
  const [znStain, setZnStain] = useState(null);
  const [microscopy, setMicroscopy] = useState([{}]);
  const [culture, setCulture] = useState([{}]);
  const [gramStain, setGramStain] = useState([{}]);
  const [organism, setOrganism] = useState([
    { organism: "" },
    { organism: "" },
    { organism: "" },
    { organism: "" },
    { organism: "" },
    { organism: "" },
  ]);

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

  //getDetail
  const getDetail1 = async (labNumber) => {
    try {
      setOpen(true);
      console.log(" i am here");
      const response = await axios.get(
        `${url}/lab/biochemistry?labNo=${labNumber}&department=Microbiology`,
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
        `${url}/lab/biochemistry?labNo=${labNo}&department=Microbiology`,
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

  // update specimen
  const updateSpec = (value, key) => {
    if (key === "Specimen") {
      setSpecimen((prevState) => ({
        ...prevState,
        specimen: value, // Update the specimen key
      }));
      console.log(specimen);
      console.log("specimen", specimen);
      return;
    } else if (key === "ZNStain") {
      setZnStain((prevData) => ({
        ...prevData,
        specimen: value,
      }));
      console.log("znstain", znStain);
      return;
    }
  };

  // AddNewLine
  const addAndRemove = (value, index, key) => {
    if (key === "microscopy") {
      if (value === "Add") {
        setMicroscopy((prev) => [...prev, {}]);
        return;
      } else if (value === "Less") {
        if (microscopy.length === 1) return;
        const removeLine = microscopy.filter(
          (_, indexOfItem) => indexOfItem !== index
        );
        setMicroscopy(removeLine);
      }
      return;
    } else if (key === "culture") {
      if (value === "Add") {
        setCulture((prev) => [...prev, {}]);
        return;
      } else if (value === "Less") {
        if (culture.length === 1) return;
        const removeLine = culture.filter(
          (_, indexOfItem) => indexOfItem !== index
        );
        setCulture(removeLine);
      }
      return;
    } else if (key === "GramStain") {
      if (value === "Add") {
        setGramStain((prev) => [...prev, {}]);
        return;
      } else if (value === "Less") {
        if (gramStain.length === 1) return;
        const removeLine = gramStain.filter(
          (_, indexOfItem) => indexOfItem !== index
        );
        setGramStain(removeLine);
      }
      return;
    }
  };

  const updateMicroscopy = (data, index, key, mainKey) => {
    let response;
    if (mainKey === "microscopy") {
      if (key === "microscopy") {
        response = microscopy.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              microscopy: data?.specimen ? data?.specimen : data,
            };
          }
          return items;
        });
        setMicroscopy(response);
        return;
      } else {
        response = microscopy.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              result: data,
            };
          }
          return items;
        });
        setMicroscopy(response);
        console.log("Response ", response);
        return;
      }
    } else if (mainKey === "culture") {
      console.log("data ", data);

      if (key === "culture") {
        response = culture.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              culture: data?.specimen ? data?.specimen : data,
            };
          }
          return items;
        });
        setCulture(response);
        return;
      } else {
        response = culture.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              result: data,
            };
          }
          return items;
        });
        setCulture(response);
        console.log("Response ", response);
        return;
      }
    } else if (mainKey === "GramStain") {
      if (key === "GramStain") {
        response = gramStain.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              gramStain: data?.specimen ? data?.specimen : data,
            };
          }
          return items;
        });
        setGramStain(response);
        return;
      } else {
        response = gramStain.map((items, indexOfItem) => {
          if (index === indexOfItem) {
            return {
              ...items,
              result: data,
            };
          }
          return items;
        });
        setGramStain(response);
        console.log("Response ", response);
        return;
      }
    }
  };

  const updateOrg = (data, index) => {
    let newData = organism?.map((items, indexOfOrg) => {
      if (index === indexOfOrg) {
        return { ...items, organism: data?.specimen ? data?.specimen : data };
      }
      return items;
    });
    setOrganism(newData);
  };

  return (
    <div>
      <CenterHeading title={"DEPARTMENT OF MICROBIOLOGY"} />

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
            <div key={index}>
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

        {/* SPECIMEN AND ZNSTAIN */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <div className="flex justify-center space-x-2 mt-3">
            <SpecimenModal
              title={"SPECIMEN"}
              onClick={(data) => setSpecimen(data)}
              type={"Specimen"}
            />
            <SpecimenModal
              title={"ZN STAIN"}
              onClick={(data) => setZnStain(data)}
              type={"ZNStain"}
            />
          </div>
          <div className="flex justify-around bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
            <LabeledInput
              label={"Specimen"}
              value={(specimen && specimen?.specimen) || ""}
              onChange={(e) =>
                updateSpec(e.target.value.toUpperCase(), "Specimen")
              }
            />
            <LabeledInput
              label={"ZNStain"}
              onChange={(e) =>
                updateSpec(e.target.value.toUpperCase(), "ZNStain")
              }
              value={(znStain && znStain?.specimen) || ""}
            />
          </div>
        </div>
        {/* MICROSCOPY */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"MICROSCOPY"} />

          {microscopy.length > 0 &&
            microscopy.map((items, index) => (
              <div className="mt-2">
                <ModalledInput
                  type={"Microscopy"}
                  onClickAdd={() => addAndRemove("Add", index, "microscopy")}
                  onClickLess={() => addAndRemove("Less", index, "microscopy")}
                  onClickModal={(data) =>
                    updateMicroscopy(data, index, "microscopy", "microscopy")
                  }
                  modalName={"Microscopy"}
                  TextAreaValue={(items?.microscopy && items?.microscopy) || ""}
                  inputValue={(items?.result && items?.result) || ""}
                  onChangeTextArea={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "microscopy",
                      "microscopy"
                    )
                  }
                  onChangeInput={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "result",
                      "microscopy"
                    )
                  }
                />
              </div>
            ))}
        </div>

        {/* Culture */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"CULTURE"} />

          {culture.length > 0 &&
            culture.map((items, index) => (
              <div className="mt-2">
                <ModalledInput
                  type={"Culture"}
                  placeholder="Culture"
                  onClickAdd={() => addAndRemove("Add", index, "culture")}
                  onClickLess={() => addAndRemove("Less", index, "culture")}
                  onClickModal={(data) =>
                    updateMicroscopy(data, index, "culture", "culture")
                  }
                  modalName={"Culture"}
                  TextAreaValue={(items?.culture && items?.culture) || ""}
                  inputValue={(items?.result && items?.result) || ""}
                  onChangeTextArea={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "culture",
                      "culture"
                    )
                  }
                  onChangeInput={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "result",
                      "culture"
                    )
                  }
                />
              </div>
            ))}
        </div>

        {/* Gram Stain */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"GRAM STAIN"} />

          {gramStain.length > 0 &&
            gramStain.map((items, index) => (
              <div className="mt-2">
                <ModalledInput
                  type={"GramStain"}
                  placeholder="GramStain"
                  onClickAdd={() => addAndRemove("Add", index, "GramStain")}
                  onClickLess={() => addAndRemove("Less", index, "GramStain")}
                  onClickModal={(data) =>
                    updateMicroscopy(data, index, "GramStain", "GramStain")
                  }
                  modalName={"Gram Stain"}
                  TextAreaValue={(items?.gramStain && items?.gramStain) || ""}
                  inputValue={(items?.result && items?.result) || ""}
                  onChangeTextArea={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "GramStain",
                      "GramStain"
                    )
                  }
                  onChangeInput={(e) =>
                    updateMicroscopy(
                      e.target.value.toUpperCase(),
                      index,
                      "result",
                      "GramStain"
                    )
                  }
                />
              </div>
            ))}
        </div>

        {/* Organism */}
        <div className="md:col-span-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
          <CenterHeading title={"ORGANISM"} />
          <div className="mt-2 grid grid-cols-2 gap-2">
            {organism.map((items, index) => (
              <ModalledInput
                type={"Organism"}
                inputShow={false}
                modalName={"Select"}
                placeholder={`Organism ${index + 1}`}
                TextAreaValue={items?.organism}
                onChangeTextArea={(event) => {
                  updateOrg(event.target.value, index);
                }}
                onClickModal={(data) => {
                  updateOrg(data, index);
                }}
              />
            ))}
          </div>
        </div>

        {/* Header */}

        <div className="flex justify-center space-x-2 mt-5">
          <ButtonDis title={"Save"} onClick={submitResult} />
          <ButtonDis title={"Refresh"} onClick={resetDetails} />
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait ..."} />
    </div>
  );
};

export default Microbiology;
