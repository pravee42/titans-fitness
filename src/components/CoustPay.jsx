import React, { useState } from "react";
import Sidebar from "./side";
import UserInformation from "./user";
import SearchForm from "./UserSearchForm";
import Buttons from "./buttons";
import * as XLSX from "xlsx";
import logo2 from "./Home/img/logo2.jpg";
import Preview1 from "./Pr1";
import "../styles/sty.css";
import logo from "../img/logo-1.png";
import { useLocation } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Customertable from "./tables/customertable";
import Custsearch from "./payment/custsearch";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustomerPayment = () => {
  const [tableData, setTableData] = useState([]);
  const [user, setUser] = useState({
    fullName: "shre",
    mobileNumber: "91+ 00000 00000",
    email: "xyz@gmail.com",
    dob: "01/01/2024",
    address: "42/t, Sunshine Avenue, Bengaluru, Karnataka, India.",
  });

  const [dob, setDob] = useState("");

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleSubmit = (e) => {};

  const updateForm = (name, value) => {
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  let location = useLocation();

  const isAdmin = false;

  const toggleButton = (
    <button className="md:hidden" onClick={toggleSidebar}>
      {sidebarOpen ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      )}
    </button>
  );

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(tableData);
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    XLSX.writeFile(wb, "table_data.xlsx");
  };

  const userInfo = isAdmin ? (
    <div className="flex items-center gap-4">
      <img
        src="admin_photo_url"
        alt="admin_avatar"
        className="inline-block relative object-cover object-center rounded-full w-12 h-12"
      />
      <div>
        <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          Admin Name
        </h6>
        <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Admin
        </p>
      </div>
    </div>
  ) : (
    <div className="flex items-center gap-4 bg-transparent">
      <img
        srcSet={logo2}
        alt="avatar"
        className="relative inline-block object-cover object-center w-12 h-12 rounded-lg"
      />
      <div>
        <h6 className="bg-transparent block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          admin
        </h6>
      </div>
    </div>
  );

  const handleSignOut = () => {
    sessionStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed bottom-5 left-0 mb-3 ml-4 z-10">
        <ul className="flex">
          <li className="hover:text-70AB0E-800 px-1">
            <a href="/" className="block flex items-center" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg" />
              <span className="text-sm">Sign Out</span>
            </a>
          </li>
        </ul>
      </div>
      <div className="fixed bottom-0 left-0 mb-3 pr-4">
        <ul className="flex">
          <span className="text-sm">The Titans Fitness Studio - UniSex</span>
        </ul>
      </div>
      <header className="py-4 px-5 md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          {toggleButton}
          <img src={logo} alt="Logo" className="w-50 h-10 mr-2" />
          <div className="mx-5">
            <span className="text-70AB0E-800">Customer Payment</span>
          </div>
        </div>
        <div className="md:flex items-center">{userInfo}</div>
      </header>

      <div className="flex flex-grow">
        <Sidebar toggleSidebar={toggleSidebar} pathname={location.pathname} id="default-sidebar" />
        <div className="flex-grow flex flex-col items-center">
          <div className="flex justify-center mt-2 mb-10 w-full">
            <Custsearch />
          </div>
          <div className="flex justify-center mt-2 mb-10 w-full">
            <Customertable user={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerPayment;
