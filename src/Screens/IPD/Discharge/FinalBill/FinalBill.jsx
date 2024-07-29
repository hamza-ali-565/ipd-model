import React, { useEffect, useState } from "react";
import CenterHeading from "../../../../Components/Center Heading/CenterHeading";
import LabeledInput from "../../../../Components/LabelledInput/LabeledInput";
import ButtonDis from "../../../../Components/Button/ButtonDis";
import AdmissionModal from "../../../../Components/Modal/AdmissionModal";
import { useSelector } from "react-redux";
import axios from "axios";
import { pdf } from "@react-pdf/renderer";
import { v4 as uuidv4 } from "uuid";
import RunningPDF from "../../../../Components/RunningBillPdf/RunningPDF";
import Loader from "../../../../Components/Modal/Loader";
import ServicesPDF from "../../../../Components/RunningBillPdf/ServicesPDF";
import WardChargesPDF from "../../../../Components/RunningBillPdf/WardChargesPDF";
import ProcedurePDF from "../../../../Components/RunningBillPdf/ProcedurePDF";
import VisitPDF from "../../../../Components/RunningBillPdf/VisitPDF";
import DepositPDF from "../../../../Components/RunningBillPdf/DepositPDF";
import ReAdmissionModal from "../../../../Components/Modal/ReAmissionModal";
import FinallBillPDF from "../../../../Components/RunningBillPdf/FinallBillPDF";
import AdmissionBillModal from "../../../../Components/Modal/AdmissionBillModal";
import { SuccessAlert, ErrorAlert } from "../../../../Components/Alert/Alert";
import Swal from "sweetalert2";
import RadioPDF from "../../../../Components/RunningBillPdf/RadioPDF";

const FinalBill = () => {
  const [runningData, setRunningData] = useState([]);
  const [billData, setBillData] = useState(null);
  const [mrInfo, setMrInfo] = useState(null);
  const [serviceCharges, setServiceCharges] = useState(0);
  const [wardCharges, setWardCharges] = useState(0);
  const [procedureCharges, setProcedureCharges] = useState(0);
  const [visitCharges, setVisitCharges] = useState(0);
  const [deposit, setDeposit] = useState(0);
  const [total, setTotal] = useState(0);
  const [radiologyCharges, setRadiologyCharges] = useState(0);
  const [toggle, setToggle] = useState(false);
  const [open, setOpen] = useState(false);

  const url = useSelector((item) => item?.url);
  const userData = useSelector((item) => item?.response);

  useEffect(() => {
    setTotal(
      wardCharges +
        visitCharges +
        procedureCharges +
        serviceCharges +
        radiologyCharges
    );
  }, [toggle]);
  //api
  const getData = async (e) => {
    refreshData();
    setOpen(true);
    setMrInfo(e);
    try {
      const response = await axios.get(
        `${url}/runningbill?admissionNo=${e?.admissionNo}&mrNo=${e?.mrNo}`,
        { withCredentials: true }
      );
      console.log(response.data);
      setRunningData(response?.data?.data);
      if (response?.data?.data?.serviceCharges?.length > 0) {
        const totalCharges = response?.data?.data?.serviceCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setServiceCharges(totalCharges);
        console.log("totalCharges", totalCharges);
      }
      if (response?.data?.data?.wardCharges?.length > 0) {
        const totalCharges = response?.data?.data?.wardCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setWardCharges(totalCharges);
      }
      if (response?.data?.data?.procedureCharges?.length > 0) {
        const totalCharges = response?.data?.data?.procedureCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setProcedureCharges(totalCharges);
      }
      if (response?.data?.data?.consultantVisit?.length > 0) {
        const totalCharges = response?.data?.data?.consultantVisit.reduce(
          (accumulator, item) => accumulator + item?.charges,
          0
        );
        setVisitCharges(totalCharges);
      }
      if (response?.data?.data?.depositDetails?.length > 0) {
        const totalCharges = response?.data?.data?.depositDetails.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setDeposit(totalCharges);
      }
      if (response?.data?.data?.radiologyCharges?.length > 0) {
        const totalCharges = response?.data?.data?.radiologyCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setRadiologyCharges(totalCharges);
      }
      setToggle(!toggle);
      setOpen(false);
    } catch (error) {
      console.log("Error of Get Data", error);
      setOpen(false);
    }
  };
  const getBillData = async (e) => {
    refreshData();
    setOpen(true);
    setMrInfo(e);
    try {
      const response = await axios.get(
        `${url}/finalbill?admissionNo=${e?.admissionNo}&mrNo=${e?.mrNo}`,
        { withCredentials: true }
      );
      console.log(response?.data?.data?.BilData[0]);
      setRunningData(response?.data?.data);
      if (response?.data?.data?.serviceCharges?.length > 0) {
        const totalCharges = response?.data?.data?.serviceCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setServiceCharges(totalCharges);
        console.log("totalCharges", totalCharges);
      }
      if (response?.data?.data?.wardCharges?.length > 0) {
        const totalCharges = response?.data?.data?.wardCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setWardCharges(totalCharges);
      }
      if (response?.data?.data?.procedureCharges?.length > 0) {
        const totalCharges = response?.data?.data?.procedureCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setProcedureCharges(totalCharges);
      }
      if (response?.data?.data?.consultantVisit?.length > 0) {
        const totalCharges = response?.data?.data?.consultantVisit.reduce(
          (accumulator, item) => accumulator + item?.charges,
          0
        );
        setVisitCharges(totalCharges);
      }
      if (response?.data?.data?.depositDetails?.length > 0) {
        const totalCharges = response?.data?.data?.depositDetails.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setDeposit(totalCharges);
      }

      if (response?.data?.data?.radiologyCharges?.length > 0) {
        const totalCharges = response?.data?.data?.radiologyCharges.reduce(
          (accumulator, item) => accumulator + item?.amount,
          0
        );
        setRadiologyCharges(totalCharges);
      }

      setBillData(response?.data?.data?.BilData[0]);
      setToggle(!toggle);
      setOpen(false);
    } catch (error) {
      console.log("Error of Get Data", error);
      setOpen(false);
    }
  };

  const SubmitHandler = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/finalbill`,
        {
          admissionNo: mrInfo?.admissionNo,
          mrNo: mrInfo?.mrNo,
          admissionUser: runningData.admissionData[0]?.createdUser,
          admissionDate: runningData.admissionData[0]?.createdOn,
          dischargeUser: runningData.admissionData[0]?.dischargeUser,
          dischargeDate: runningData.admissionData[0]?.dischargeDate,
          wardName: runningData.activeWard[0].wardName,
          bedNo: runningData.activeWard[0].bedNo,
          totalBill: total,
          totalDeposit: deposit,
          totalRefund: total - deposit > 0 ? 0 : deposit - total,
          totalRecievable: total - deposit > 0 ? total - deposit : 0,
          totalWard: wardCharges,
          totalProcedure: procedureCharges,
          totalVisit: visitCharges,
          totalServices: serviceCharges,
          totalMedicine: 0,
          totalLab: 0,
          totalRadiology: radiologyCharges,
          billUser: userData[0]?.userId,
        },
        { withCredentials: true }
      );
      console.log("Response of Submit handler", response.data);
      setBillData(response?.data?.data);
      printFinallBill(response?.data?.data);
      refreshData();
      setOpen(false);
    } catch (error) {
      console.log("Error of Submit Handler", error);
      setOpen(false);
    }
  };

  const billDelete = async () => {
    setOpen(true);
    try {
      const response = await axios.put(
        `${url}/billdelete`,
        { admissionNo: mrInfo?.admissionNo },
        { withCredentials: true }
      );
      console.log("Response of Delete Bill", response.data);
      setOpen(false);
      SuccessAlert({ text: "BILL DELETED SUCCESSFULLY", timer: 1500 });
      refreshData();
    } catch (error) {
      setOpen(false);
      console.log("Error of bill Delete", error);
      ErrorAlert({ text: error.response.data.message });
    }
  };

  const ResureAlert = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        billDelete();
      }
    });
  };

  const refreshData = () => {
    setRunningData([]);
    setBillData(null);
    setServiceCharges(0);
    setWardCharges(0);
    setProcedureCharges(0);
    setVisitCharges(0);
    setTotal(0);
    setDeposit(0);
    setRadiologyCharges(0);
  };
  const handleButtonClick = async (finalbillData) => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <RunningPDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        radiology={radiologyCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const PrintServices = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <ServicesPDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  const PrintWard = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <WardChargesPDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  const PrintProcedure = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <ProcedurePDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  const PrintVisit = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <VisitPDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  const printRadio = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <RadioPDF
        key={key}
        billData={runningData}
        radiology={radiologyCharges}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };

  const PrintDeposit = async () => {
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <DepositPDF
        key={key}
        billData={runningData}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  const printFinallBill = async (data) => {
    console.log(" data", data);
    // Generate a unique key to force re-render

    const key = uuidv4();

    // Create a PDF document as a Blob
    const blob = await pdf(
      <FinallBillPDF
        key={key}
        billData={runningData}
        FinalBillD={billData !== null ? billData : data}
        service={serviceCharges}
        ward={wardCharges}
        procedure={procedureCharges}
        visit={visitCharges}
        totalCharges={total}
        radiology={radiologyCharges}
        depositAmount={deposit}
        userName={userData[0]?.userId}
      />
    ).toBlob();

    // Create a Blob URL and open it in a new tab
    let url = URL.createObjectURL(blob);
    window.open(url, "_blank");
    url = "";
  };
  return (
    <div>
      <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
        <CenterHeading title={"Final Bill"} />
        <div className="flex justify-center space-x-2">
          <ReAdmissionModal title={"Select Admission No"} onClick={getData} />
          <AdmissionBillModal title={"Select Bill No"} onClick={getBillData} />
        </div>
        {runningData?.patientData?.length > 0 && (
          <div className="md:grid md:grid-cols-2">
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Patient Details"} />
              <div className="flex flex-col items-center space-y-2 mt-2">
                <LabeledInput
                  label={"Patinet Name"}
                  disabled={true}
                  placeholder={"Patinet Name"}
                  value={`${runningData?.patientData[0]?.patientType} ${runningData?.patientData[0]?.patientName} ${runningData?.patientData[0]?.relativeType} ${runningData?.patientData[0]?.relativeName}`}
                />
                <LabeledInput
                  label={"Age"}
                  disabled={true}
                  placeholder={"Age"}
                  value={`${runningData?.patientData[0]?.ageYear}`}
                />
                <LabeledInput
                  label={"Gender"}
                  disabled={true}
                  placeholder={"Gender"}
                  value={runningData?.patientData[0]?.gender}
                />
                <LabeledInput
                  label={"MrNo"}
                  disabled={true}
                  placeholder={"Mr No"}
                  value={runningData?.patientData[0]?.MrNo}
                />
                <LabeledInput
                  label={"Admission No"}
                  disabled={true}
                  placeholder={"Admission No"}
                  value={runningData?.activeWard[0]?.admissionNo}
                />
                <LabeledInput
                  label={"Party Name"}
                  disabled={true}
                  placeholder={"Party Name"}
                  value={runningData?.activeParty[0]?.party}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Service Details"} />
              <div className="flex items-center space-y-2 flex-col mt-2">
                <LabeledInput
                  disabled={true}
                  placeholder={"Service Charges"}
                  label={"Service Charges"}
                  value={serviceCharges}
                  className={
                    "hover:text-blue-600 hover:underline cursor-pointer"
                  }
                  onClick={PrintServices}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Ward Charges"}
                  label={"Ward Charges"}
                  value={wardCharges}
                  className={
                    "hover:text-blue-600 hover:underline cursor-pointer"
                  }
                  onClick={PrintWard}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Procedure Charges"}
                  label={"Procedure Charges"}
                  value={procedureCharges}
                  className={
                    "hover:text-blue-600 hover:underline cursor-pointer"
                  }
                  onClick={PrintProcedure}
                />
                <LabeledInput
                  disabled={true}
                  placeholder={"Consultant Visit Charges"}
                  label={"Consultant Visit Charges"}
                  value={visitCharges}
                  className={
                    "hover:text-blue-600 hover:underline cursor-pointer"
                  }
                  onClick={PrintVisit}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Medicine/Labs/Radiology Details"} />
              <div className="flex items-center flex-col space-y-2 mt-2">
                <LabeledInput
                  placeholder={"Medicine Charges"}
                  label={"Medicine Charges"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Laboratory Charges"}
                  label={"Laboratory Charges"}
                  disabled={true}
                />
                <LabeledInput
                  placeholder={"Radiology Charges"}
                  label={"Radiology Charges"}
                  value={radiologyCharges}
                  className={
                    "hover:text-blue-600 hover:underline cursor-pointer"
                  }
                  disabled={true}
                  onClick={printRadio}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl">
              <CenterHeading title={"Cash Details"} />
              <div className="flex items-center flex-col space-y-2 mt-2">
                <LabeledInput
                  placeholder={"Total Amount"}
                  label={"Total Amount"}
                  disabled={true}
                  value={total}
                />
                <LabeledInput
                  placeholder={"Deposit Amount"}
                  label={"Deposit Amount"}
                  disabled={true}
                  value={deposit}
                  className={
                    "hover:text-blue-600 hover:underline cursor-pointer"
                  }
                  onClick={PrintDeposit}
                />
                <LabeledInput
                  placeholder={"Recievable Amount"}
                  label={"Recievable Amount"}
                  disabled={true}
                  value={total - deposit > 0 ? total - deposit : 0}
                />
                <LabeledInput
                  placeholder={"Refunded Amount"}
                  label={"Refunded Amount"}
                  disabled={true}
                  value={total - deposit < 0 ? total - deposit : 0}
                />
              </div>
            </div>
            <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg my-4 mx-4  p-3 rounded-3xl md:col-span-2">
              <div className="flex flex-col items-center space-y-2 md:flex-row md:justify-center md:space-x-2 md:space-y-0">
                <ButtonDis title={"Save"} onClick={SubmitHandler} />
                <ButtonDis
                  title={"Print"}
                  onClick={
                    billData === null ? handleButtonClick : printFinallBill
                  }
                />
                <ButtonDis
                  title={"Delete"}
                  onClick={ResureAlert}
                  disabled={billData === null ? true : false}
                />
                <ButtonDis title={"Refresh"} onClick={() => refreshData()} />
              </div>
            </div>
          </div>
        )}
      </div>
      <Loader title={"Data Loading ..."} onClick={open} />
    </div>
  );
};

export default FinalBill;
