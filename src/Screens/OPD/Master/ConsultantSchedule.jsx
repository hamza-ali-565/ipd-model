import React, { useState } from "react";
import CenterHeading from "../../../Components/Center Heading/CenterHeading";
import SpecialityModal from "../../../Components/Modal/SpecialityModal";
import ConsultantModal from "../../../Components/Modal/ConsultantModal";
import LabeledInput from "../../../Components/LabelledInput/LabeledInput";
import axios from "axios";
import { useSelector } from "react-redux";
import Loader from "../../../Components/Modal/Loader";
import ButtonDis from "../../../Components/Button/ButtonDis";

const ConsultantSchedule = () => {
  const [consData, setConsData] = useState([]);
  const [selectType, setSelectedType] = useState("");
  const [specialityData, setSpecialityData] = useState(null);
  const [open , setOpen] = useState(false)

  const url = useSelector((state) => state?.url);

  const updateCons = (data, value) => {
    setConsData([]);
    if (value === "Cons") {
      setConsData([data]);
      setSelectedType("Cons");
      console.log(consData);
      return;
    }
  };

const resetData = ()=>{
    setConsData([])
    setSelectedType('')
    setSpecialityData(null)
}

  const getDataFromSpeciality = async (data) => {
    try {
        setOpen(true)
        setSpecialityData(data);
        setSelectedType("");
        const response = await axios.get(
            `${url}/opd/consultantSchedule?speciality=${data?.speciality}&specialityId=${data?._id}`,
            { withCredentials: true }
        );
        console.log("Response of getDataFromSpeciality", response);
        setConsData(response?.data?.data?.data);
        setOpen(false)
    } catch (error) {
        console.log("Error of getDataFromSpeciality", error);
        setOpen(false)
        setConsData([])
    }
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Consultant Schedule"} />
        <div className="flex items-center flex-col space-y-2 mt-3">
          <SpecialityModal
            title={"Search With Speciality"}
            onClick={getDataFromSpeciality}
          />
          <ConsultantModal
            title={"Search With Consultant"}
            onClick={(data) => updateCons(data, "Cons")}
          />
          {consData.length > 0 && (
            <LabeledInput
              label={
                selectType === "Cons"
                  ? "Selected Consultant"
                  : "Selected Speciality"
              }
              disabled={true}
              value={
                selectType === "Cons"
                  ? consData[0]?.name
                  : specialityData?.speciality
              }
              placeholder={
                selectType === "Cons"
                  ? "Selected Consultant"
                  : "Selected Speciality"
              }
            />
          )}
        </div>
        <div className="container mx-auto mt-3">
          <div className="mt-3 grid grid-cols-4 text-xs font-bold justify-items-center items-center h-16 border border-gray-300">
            <p>Consultant Name</p>
            <p>Speciality</p>
            <p>Timing</p>
            <p>Days</p>
          </div>
          {consData &&
            consData.map((items, index) => (
              <div className="mt-3 grid grid-cols-4 text-xs justify-items-center items-center h-10 border border-gray-300">
                <p>{items?.name}</p>
                <p>{items?.speciality}</p>
                <p>{items?.timing}</p>
                <p>{items?.days}</p>
              </div>
            ))}
        </div>
        <div className="flex justify-center mt-5">
            <ButtonDis title={"Refereh"} onClick={resetData}/>
        </div>
      </div>
    <Loader onClick={open}/>  
    </div>
  );
};

export default ConsultantSchedule;
