import React, { useState, useRef } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SimpleInput from "../SimpleInput/SimpleInput";
import axios from "axios";
import { useSelector } from "react-redux";
import LabeledInput from "../LabelledInput/LabeledInput";
import ButtonDis from "../Button/ButtonDis";
import Loader from "./Loader";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "21px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};

export default function SpecimenModal({ onClick, title, type }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [rotation, setRotation] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [secondPage, setSecondPage] = useState(false);
  const [specimen, setSpecimen] = useState("");
  const [message, setMessage] = useState("");
  const inputRef = useRef(null); // Reference for the input element

  React.useEffect(() => {
    getData();
  }, [toggle]);
  const handleClose = () => setOpen(false);

  const OpenData = () => {
    setToggle(!toggle);
    setOpen(!open);
  };

  const url = useSelector((state) => state.url);

  const filterNames = (input) => {
    const searchTerm = input.toLowerCase();
    if (input === "") {
      setToggle(!toggle);
      return;
    }

    const filteredData = data.filter((item) =>
      Object.values(item).some(
        (value) =>
          typeof value === "string" && value.toLowerCase().includes(searchTerm)
      )
    );
    setData(filteredData);
  };
  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}/lab/labSpecimenDisp?type=${type}`,
        {
          withCredentials: true,
        }
      );
      setData(response?.data?.data?.data);
    } catch (error) {
      console.log("error of getData", error);
      setData([]);
    }
  };
  const SendData = (item) => {
    onClick(item);
    handleClose();
  };

  const pushSpecimen = async () => {
    try {
      if (specimen === "") return setMessage("Please Enter Value");
      setRotation(true);
      const response = await axios.post(
        `${url}/lab/labSpecimen`,
        { specimen, type },
        { withCredentials: true }
      );
      console.log("response of pushSpecimen", response.data?.data);
      setSpecimen("");
      setMessage("DATA CREATED SUCCESSFULLY");
      setRotation(false);
      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (error) {
      setRotation(false);
      console.log("Error of pushSpecimen ", error);
    }
  };

  return (
    <div>
      <Button
        onClick={OpenData}
        style={{ backgroundColor: "#378FE7", color: "white" }}
      >
        {title}
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex justify-center">
            <SimpleInput
              ref={inputRef}
              placeholder={"Input Patient Data"}
              onChange={(e) => filterNames(e.target.value)}
            />
          </div>
          <div className="container mx-auto mt-3">
            <div className="grid grid-cols-2 text-xs justify-items-center items-center h-16 border border-gray-300">
              <p
                onClick={() => {
                  setSecondPage(false);
                  getData();
                }}
                className={`font-bold cursor-pointer  border-b-4 hover:border-blue-700 hover:text-blue-700 transition duration-300 ease-in ${
                  secondPage === false ? "text-blue-700 border-blue-700" : ""
                }`}
              >
                {type === "Specimen"
                  ? "PICK SPECIMEN"
                  : type === "ZNStain"
                  ? "PICK ZNSTAIN"
                  : type === "Microscopy"
                  ? "PICK Microscopy"
                  : type === "Culture"
                  ? "PICK CULTURE"
                  : type === "GramStain"
                  ? "PICK GRAM STAIN"
                  : type === "Organism"
                  ? "PICK Organism"
                  : type === "Remarks"
                  ? "PICK REMARKS"
                  : type === "Result"
                  ? "PICK RESULT"
                  : ""}
              </p>
              <p
                onClick={() => setSecondPage(true)}
                className={`font-bold cursor-pointer  border-b-4 hover:border-blue-700 hover:text-blue-700 transition duration-300 ease-in ${
                  secondPage === true ? "text-blue-700 border-blue-700" : ""
                }`}
              >
                {type === "Specimen"
                  ? "CREATE SPECIMEN"
                  : type === "ZNStain"
                  ? "CREATE ZNStain"
                  : type === "Microscopy"
                  ? "CREATE Microscopy"
                  : type === "Culture"
                  ? "CREATE Culture"
                  : type === "GramStain"
                  ? "CREATE Gram Stain"
                  : type === "Organism"
                  ? "CREATE Organism"
                  : type === "Remarks"
                  ? "CREATE REMARKS"
                  : type === "Result"
                  ? "CREATE Result"
                  : ""}
              </p>
            </div>
          </div>
          {/* PICK SPECIMEn */}
          {secondPage === false && (
            <div>
              {/* Header */}
              <div className="max-h-96">
                <div className="container mx-auto mt-3 cursor-pointer">
                  <div className="grid grid-cols-2 text-xs justify-items-center items-center h-12 border border-gray-300">
                    <p className="font-bold">Serial No</p>
                    <p className="font-bold">
                      {type === "Specimen"
                        ? "SPECIMEN Name"
                        : type === "ZNStain"
                        ? "ZNStain Name"
                        : type === "Microscopy"
                        ? "Microscopy Name"
                        : type === "Culture"
                        ? "Culture Name"
                        : type === "GramStain"
                        ? "Gram Stain Name"
                        : type === "Organism"
                        ? "Gram Organism"
                        : type === "Remarks"
                        ? "Remarks"
                        : type === "Result"
                        ? "Result"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              {/* Data */}
              {data.length > 0 &&
                data?.map((items, index) => {
                  return (
                    <div className="max-h-96" key={index}>
                      <div
                        className="container mx-auto mt-3 cursor-pointer"
                        onClick={() => SendData(items)}
                      >
                        <div className="grid grid-cols-2 text-xs justify-items-center items-center h-8 border border-gray-300 cursor-pointer hover:text-blue-600 hover:font-bold transition duration-100 ease-in">
                          <p className="">{index + 1}</p>
                          <p className="">{items?.specimen}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}
          {/* CREATE SPECIMEN */}
          {secondPage === true && (
            <div>
              {/* Header */}
              <div className="max-h-96">
                <div className="container mx-auto mt-3 cursor-pointer">
                  <div className="grid grid-cols-1 text-xs justify-items-center items-center h-12 border border-gray-300">
                    <p className="font-bold">
                      {type === "Specimen"
                        ? "CREATE SPECIMEN"
                        : type === "ZNStain"
                        ? "CREATE ZNStain"
                        : type === "Microscopy"
                        ? "CREATE Microscopy"
                        : type === "Culture"
                        ? "CREATE Culture"
                        : type === "GramStain"
                        ? "CREATE Gram Stain"
                        : type === "Organism"
                        ? "CREATE Organism"
                        : type === "Remarks"
                        ? "CREATE Remarks"
                        : type === "Result"
                        ? "CREATE Result"
                        : ""}
                    </p>
                  </div>
                </div>
              </div>
              {/* Data */}
              <div className="max-h-96">
                <div
                  className="container mx-auto mt-3 cursor-pointer"

                  // onClick={() => SendData(item)}
                >
                  <div className="flex flex-col items-center">
                    <LabeledInput
                      label={`INPUT ${type} NAME`}
                      placeholder={`INPUT ${type} NAME`}
                      onChange={(e) => {
                        setSpecimen(e.target.value.toUpperCase());
                        setMessage("");
                      }}
                      value={specimen}
                    />
                    <div className="mt-3">
                      <ButtonDis title={"Save"} onClick={pushSpecimen} />
                    </div>
                    {message !== "" && (
                      <p className="text-blue-700 font-bold underline mt-4">
                        {message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <Loader onClick={rotation} title={"Please Wait"} />
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
}
