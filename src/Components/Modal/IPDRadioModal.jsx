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
import ConsultantModal from "./ConsultantModal";

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

export default function IPDRadioModal({
  onClick,
  title,
  modalAdmissionNo,
  patientName,
  party,
}) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [serviceDetails, setServiceDetails] = useState([]);
  const [consultant, setConsultant] = useState(null);
  const [message, setMessage] = useState("");
  const [checkDis, setCheckDis] = useState(false);
  const inputRef = useRef(null); // Reference for the input element

  React.useEffect(() => {
    getData();
  }, [toggle]);
  const handleClose = () => {
    setOpen(false);
    setData([]);
    setServiceDetails([]);
    setConsultant(null);
    setMessage("");
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

  const SendData = (item) => {
    if (consultant === null) {
      setMessage("PLEASE SELECT CONSULTANT NAME FIRST !!!");
      return;
    }
    setMessage("");
    for (const existingItem of serviceDetails) {
      if (existingItem?.serviceId === item?.serviceId) {
        console.log("Item already exists");
        return;
      }
    }
    item.amount = item.charges;
    item.quantity = 1;
    item.createdUser = userData[0]?.userId;
    item.consultant = consultant?.name;
    setServiceDetails((prevServiceDetails) => [...prevServiceDetails, item]);
    console.log("serviceDetails", serviceDetails);
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
        `${url}/allRadioservices?party=${party}`,
        {
          withCredentials: true,
        }
      );
      console.log("partyCCC", response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log("error of get data", error);
    }
  };

  const createService = async () => {
    try {
      if (serviceDetails.length <= 0)
        throw new Error("PLEASE SELECT SERVICE !!!");
      if (consultant === null) throw new Error("Please Select Consultant!!!");
      setCheckDis(true);
      const response = await axios.post(
        `${url}/ipdradiology`,
        {
          admissionNo: modalAdmissionNo,
          serviceDetails: serviceDetails,
          consultant: consultant?.name,
        },
        { withCredentials: true }
      );
      console.log("response of createService", response.data);
      handleClose();
      SuccessAlert({ text: "Service added successfully", timer: 2000 });
      setCheckDis(false);
    } catch (error) {
      console.log("Error of createService", error);
      ErrorAlert({ text: error.message, timer: 2000 });
      setCheckDis(false);
    }
  };

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <div>
      <Button onClick={OpenData}>{title}</Button>
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
              <span className="font-bold ">PatientName:</span> {patientName}
            </p>
            <p>
              <span className="font-bold ">AdmissionNo:</span>{" "}
              {modalAdmissionNo}
            </p>
            <p>
              <span className="font-bold ">Party:</span> {party}
            </p>
          </div>
          <div className="flex justify-center space-x-3">
            <SimpleInput
              ref={inputRef}
              placeholder={"Search Services . . ."}
              onChange={(e) => filterNames(e.target.value)}
            />
            <ConsultantModal
              title={"Performed By"}
              onClick={(e) => {
                setConsultant(e);
                setMessage("");
                setServiceDetails([]);
              }}
            />
          </div>
          {message && (
            <div className="flex justify-center text-red-600 mt-2 font-bold">
              {" "}
              {message}
            </div>
          )}
          <div className="flex justify-center mt-2">
            <p>{(consultant && consultant?.name) || ""}</p>
          </div>
          {/* main */}
          <div className="grid grid-cols-2 gap-x-2">
            {/* service names */}
            <div>
              <CenterHeading title={"Radiology Services"} />
              <div className="container mx-auto mt-3">
                <div className="grid grid-cols-2 text-xs justify-items-center items-center h-16 border border-gray-300">
                  <p className="">Service Name</p>
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
                      <div className="grid grid-cols-2 text-xs justify-items-center items-center h-10 border border-gray-300">
                        <p className="">{item?.serviceName}</p>

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
              <CenterHeading title={"Selected Radiology"} />

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
                        <p className="">{items?.serviceName}</p>
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
                    <ButtonDis
                      title={(checkDis && "Please Wait ...") || "Save"}
                      onClick={createService}
                      disabled={checkDis}
                    />
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
