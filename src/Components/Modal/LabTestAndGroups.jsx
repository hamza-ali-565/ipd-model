import React, { useState, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import SimpleInput from "../SimpleInput/SimpleInput";
import axios from "axios";
import { useSelector } from "react-redux";
import CenterHeading from "../Center Heading/CenterHeading";
import ButtonDis from "../Button/ButtonDis";
import { ErrorAlert, SuccessAlert } from "../Alert/Alert";

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

export default function LabTestAndGroup({
  onClick,
  title,
  modalAdmissionNo,
  patientName,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [serviceDetails, setServiceDetails] = useState([]);
  const inputRef = useRef(null); // Reference for the input element

  React.useEffect(() => {
    getData();
  }, [toggle]);
  const handleClose = () => {
    setOpen(false);
    setData([]);
    setServiceDetails([]);
  };

  const url = useSelector((state) => state.url);
  const userData = useSelector((item) => item?.response);

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

  // push data to array
  const SendData = (item) => {
    for (const existingItem of serviceDetails) {
      if (existingItem?.testId === item?.testId) {
        console.log("Item already exists");
        return;
      }
    }
    item.amount = item.charges;
    item.quantity = 1;
    item.createdUser = userData[0]?.userId;
    
    setServiceDetails((prevServiceDetails) => [...prevServiceDetails, item]);

    // handleClose();
  };

  const updateSD = (value, data) => {
    const updatedData = serviceDetails?.map((item) => {
      if (item.serviceId === data.serviceId) {
        return {
          ...item,
          quantity: +value,
          amount: value * item?.charges,
        };
      }
      return item;
    });
    setServiceDetails(updatedData);
    console.log(updatedData);
  };

  // api
  const getData = async () => {
    try {
      const response = await axios.get(
        `${url}/lab/labsForBooking?partyId=${modalAdmissionNo}`,
        {
          withCredentials: true,
        }
      );
      console.log(response.data.data);
      setData(response.data.data.data);
    } catch (error) {
      console.log("error of get data", error);
    }
  };

  const createService = async () => {
    try {
      if (serviceDetails.length <= 0)
        throw new Error("PLEASE SELECT SERVICE !!!");

      onClick(serviceDetails);
      console.log("serviceDetails at line 123", serviceDetails);
      handleClose();
    } catch (error) {
      console.log("Error of createService", error);
      ErrorAlert({ text: error.message, timer: 2000 });
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
        BackdropProps={{
          style: { cursor: "default" }, // Change cursor style
          onClick: (e) => e.stopPropagation(), // Prevent closing on backdrop click
        }}
      >
        <Box sx={style}>
          <div className="flex justify-around mb-3">
            <p>
              <span className="font-bold ">Party Name:</span> {modalAdmissionNo}
            </p>
          </div>
          <div className="flex justify-center">
            <SimpleInput
              ref={inputRef}
              placeholder={"Search Services . . ."}
              onChange={(e) => filterNames(e.target.value)}
            />
          </div>
          {!modalAdmissionNo && (
            <div className="flex justify-center text-red-600 mt-2 font-bold">
              ERROR !!!
              <span className="px-1 text-blue-600 font-bold">
                PLEASE SELECT PARTY NAME FIRST{" "}
              </span>
              !!! ERROR
            </div>
          )}
          {/* main */}
          <div className="grid grid-cols-2 gap-x-2">
            {/* service names */}
            <div>
              <CenterHeading title={"Services"} />
              <div className="container mx-auto mt-3">
                <div className="grid grid-cols-3 text-xs justify-items-center items-center h-16 border border-gray-300">
                  <p className="">Test Code</p>
                  <p className="">Test Name</p>
                  <p className="">Amount</p>
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
                      <div className="grid grid-cols-3 text-xs justify-items-center items-center h-10 border border-gray-300">
                        <p className="">{item?.testCode}</p>
                        <p className="">{item?.testName}</p>

                        <p className="">{item?.charges}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex justify-center">NO Data Loaded...</div>
                )}
              </div>
            </div>
            {/* service details */}
            <div>
              <CenterHeading title={"Service Details"} />

              <div className="container mx-auto mt-3">
                <div className="grid grid-cols-3 text-xs justify-items-center items-center h-16 border border-gray-300">
                  <p className="">Service Name</p>
                  <p className="">No. of Times</p>
                  <p className="">Amount</p>
                </div>
                <div className="container mx-auto mt-3">
                  {serviceDetails?.length > 0 &&
                    serviceDetails?.map((items, index) => (
                      <div className="grid grid-cols-3 text-xs justify-items-center items-center h-10 mt-2 border border-gray-300">
                        <p className="">{items?.testName}</p>
                        <p className="">
                          <input
                            type="number"
                            className="w-16 border-2 p-1 border-gray-600 rounded-xl"
                            placeholder="Qty"
                            value={items?.quantity}
                            name=""
                            disabled={true}
                            id=""
                            onChange={(e) => updateSD(e.target.value, items)}
                          />
                        </p>
                        <p className="">{items?.amount}</p>
                      </div>
                    ))}
                  <div className="flex justify-center space-x-2 mt-2">
                    <ButtonDis title={"Add"} onClick={createService} />
                    <ButtonDis
                      title={"Refresh"}
                      onClick={() =>
                        console.log("service", setServiceDetails([]))
                      }
                    />
                    <ButtonDis title={"Cancel"} onClick={handleClose} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
