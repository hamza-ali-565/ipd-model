import React, { useState } from "react";
import LoginInput from "../../Components/LoginInput/LoginInput";
import "./Login.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import SimpleButton from "../../Components/Button/SimpleButton";
import { setLoginToggle, setResponse, setShift } from "../../Store/action";
import { ErrorAlert } from "../../Components/Alert/Alert";
import Loader from "../../Components/Modal/Loader";
const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [open, setOpen] = useState(false);

  const url = useSelector((state) => state.url);
  //   const check = useSelector((state) => state.toggle);

  const Dispatch = useDispatch();

  const loginUser = async () => {
    setOpen(true);
    try {
      const response = await axios.post(
        `${url}/login`,
        {
          userId,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response of login", response);
      setOpen(false);
      Dispatch(setLoginToggle(true));
      Dispatch(setResponse(response.data.data));
      CheckLog();
      setPassword("");
      setUserId("");

      const cookies = document.cookie;
      console.log("All cookies:", cookies); // This will log all cookies

      // You can potentially search for the "Token" cookie here
    } catch (error) {
      console.log("error of login response", error);
      ErrorAlert({ text: error.response.data.message, timer: 1500 });
      setOpen(false);
    }
  };

  const CheckLog = async () => {
    try {
      const response = await axios.get(`${url}/product`, {
        withCredentials: true,
      });
      console.log("response of product api", response);
      Dispatch(setLoginToggle(true));
      Dispatch(setResponse(response.data.data));
      getShift();
    } catch (error) {
      console.log("error of product api", error);
      Dispatch(setLoginToggle(false));
    }
  };
  const getShift = async () => {
    try {
      const response = await axios.get(`${url}/shift`, {
        withCredentials: true,
      });
      Dispatch(setShift(response.data.data));
      console.log("response of getData", response);
    } catch (error) {
      console.log("Error of getShift", error);
    }
  };

  return (
    <div className="h-screen grid place-items-center sm: same">
      <div className="grid gap-y-8 w-full  max-w-md mx-auto p-2 bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg rounded-3xl">
        <img
          src={require("../../Images/hospital.png")}
          style={{ width: "100px", height: "100px" }}
          alt=""
          className="justify-self-center"
        />
        <h1 className="text-2xl underline justify-self-center text-gray-500 font-bold">
          Welcome Back!
        </h1>
        <div className="grid gap-4 gap-x-3">
          <LoginInput
            placeholder={"User ID "}
            icon={"bi bi-person-circle"}
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <LoginInput
            placeholder={"Password "}
            icon={"bi bi-eye-slash"}
            type={"password"}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <div className="justify-self-center">
          <SimpleButton title={"Login"} onClick={loginUser} />
        </div>
        <div className="justify-self-center grid text-wrap">
          <p className="mt-20">
            Dont have Account?{" "}
            <span className="text-blue-700 underline">Contact to Admin.</span>
          </p>
        </div>
      </div>
      <Loader onClick={open} title={"Please Wait..."} />
    </div>
  );
};

export default Login;
