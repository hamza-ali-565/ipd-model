import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SimpleInput from "../SimpleInput/SimpleInput";
import axios from "axios";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  height: 500,
  bgcolor: "background.paper",
  borderRadius: "21px",
  boxShadow: 24,
  p: 4,
  overflowY: "auto", // Enable vertical scrolling
};

export default function LabTestModal({ onClick, title, thisIs, fGroup }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const inputRef = useRef(null); // Reference for the input element

  React.useEffect(() => {
    getData();
  }, [toggle]);
  const handleClose = () => setOpen(false);

  const url = useSelector((state) => state.url);

  const OpenData = () => {
    setToggle(!toggle);
    setOpen(!open);
  };

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

  const SendData = (item) => {
    onClick(item);
    handleClose();
  };
  // api
  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}/lab/tests?thisIs=${thisIs}&fGroup=${fGroup ? fGroup : ""}`,
        {
          withCredentials: true,
        }
      );
      console.log(response?.data?.data?.data);
      setData(response?.data?.data?.data);
    } catch (error) {
      console.log("error of get data", error);
    }
  };
  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

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
            <div className="grid grid-cols-5 text-xs justify-items-center items-center h-16 border border-gray-300">
              <p className="">Test Code</p>
              <p className="">Test Name</p>
              <p className="">Department</p>
              <p className="">Category</p>
              <p className="">Status</p>
            </div>
          </div>

          <div className="max-h-96">
            {data.length > 0 ? (
              data.map((item, index) => (
                <div
                  className="container mx-auto mt-3 cursor-pointer"
                  key={index}
                  onClick={() => SendData(item)}
                >
                  <div className="grid grid-cols-5 text-xs justify-items-center items-center h-10 border border-gray-300">
                    <p className="">{item?.testCode}</p>
                    <p className="">{item?.testName}</p>
                    <p className="">{item?.department}</p>
                    <p className="">{(item?.category && item?.category) || "Group"}</p>
                    <p className="">
                      {item?.active === true ? "Active" : "In-Active"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex justify-center">NO Data Loaded...</div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
