import React, { useState } from "react";
import Sidebar from "../../Components/Sidebar/Sidebar";
import SidebarItems from "../../Components/SidebarItems/SidebarItems";
import SimpleButton from "../../Components/Button/SimpleButton";
import "./Main.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setLoginToggle } from "../../Store/action";
import { Link, Outlet, useNavigate } from "react-router-dom";

const MainPage = () => {
  const [toggle, setToggle] = useState(false);
  const dispatch = useDispatch();

  const url = useSelector((state) => state.url);
  const userData = useSelector((state) => state.response);
  console.log("userdata ", userData);
  let navigate = useNavigate();

  const logout = async () => {
    try {
      let response = await axios.post(
        `${url}/logout`,
        {},
        { withCredentials: true }
      );
      dispatch(setLoginToggle(false));
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div className="grid grid-rows-[3rem,1fr] h-screen overflow-hidden bgImage ">
      {/* Header */}
      <div className="flex justify-between bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-30 shadow-lg items-center p-5 fixed w-full top-0 left-0 z-20">
        <button onClick={() => setToggle(!toggle)} className="font-extrabold">
          {toggle ? (
            <i className="bi bi-x-lg"></i>
          ) : (
            <i className="bi bi-grid-3x3-gap-fill"></i>
          )}
        </button>
        <h1>
          {userData[0]?.userName ? userData[0]?.userName : userData?.userName}
        </h1>
      </div>

      {/* Sidebar */}
      <div
        className={`sidebar fixed top-16 left-0 h-[calc(100%-2.5rem)] transition-all duration-100 ease-in-out ${
          toggle ? "w-32 overflow-y-auto" : "w-0 overflow-hidden"
        }`}
      >
        <Sidebar buttonTitle={"Setups"}>
          <Link to="/mainpage/setups/services">
            <SidebarItems
              title={"Services"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to="/mainpage/setups/party">
            <SidebarItems
              title={"Party"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to="/mainpage/setups/ward">
            <SidebarItems
              title={"Ward / Bed"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to="/mainpage/setups/consultant">
            <SidebarItems
              title={"Consultant"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
        </Sidebar>

        <Sidebar buttonTitle={"Opd"}>
          <Link to="/mainpage/opd/master">
            <SidebarItems
              title={"Master"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to="/mainpage/opd/transaction">
            <SidebarItems
              title={"Transaction"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
        </Sidebar>

        <Sidebar buttonTitle={"IPD"}>
          <Link to="/mainpage/ipdmaster">
            <SidebarItems
              title={"Master"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to="/mainpage/ipdPatient">
            <SidebarItems
              title={"Patient"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to={"/mainPage/transaction"}>
            <SidebarItems
              title={"Transaction"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to={"/mainPage/ipdShift"}>
            <SidebarItems
              title={"Shift"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to={"/mainPage/payments"}>
            <SidebarItems
              title={"Payments"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to={"/mainPage/discharge"}>
            <SidebarItems
              title={"Discharge"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <SidebarItems title={"Welfare"} />
          <SidebarItems title={"Direct Services"} />
          <SidebarItems title={"Reports"} />
        </Sidebar>

        <Sidebar buttonTitle={"Radiology"}>
          <Link to="/mainpage/radiology">
            <SidebarItems
              title={"Master"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
          <Link to="/mainpage/radiology/transaction">
            <SidebarItems
              title={"Transaction"}
              onClick={() => {
                setToggle(!toggle);
              }}
            />
          </Link>
        </Sidebar>

        <div
          className={` ${toggle === true ? "fixed bottom-3 ml-5" : "hidden"}`}
        >
          <SimpleButton title={"Logout"} onClick={logout} />
        </div>
      </div>

      {/* Main Content */}
      <div
        className={`grid col-span-full row-span-full overflow-y-auto pt-20 ${
          toggle ? "pl-36" : "pl-0"
        } transition-all duration-500 ease-in-out`}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default MainPage;
