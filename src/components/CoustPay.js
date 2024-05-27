import React, { useState } from "react";
import Sidebar from "./side";
import UserInformation from "./user";
import SearchForm from "./SearchForm";
import Buttons from "./buttons";
import * as XLSX from 'xlsx';
import logo2 from "./Home/img/logo2.jpg";
import Preview1 from "./Pr1";
import "../styles/sty.css";
import logo from "../img/logo-1.png";
import { useLocation } from "react-router-dom";
import { Route } from "react-router-dom";
import {
  Card,
  Input,
  Typography
} from "@material-tailwind/react";



import Customertable from "./customertable";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faUndo,
  faFileExcel,
  faCheckCircle,
} from "@fortawesome/free-solid-svg-icons";

const CustomerPayment = () => {
  const [tableData, setTableData] = useState([]);
  const [user, setUser] = useState({
    fullName: "shre",
    mobileNumber: "91+ 00000 00000",
    email: "xyz@gmail.com",
    dob: "01/01/2024",
    address: "42/t, Sunshine Avenue, Bengaluru, Karnataka, India. ",
  });

  const [dob, setDob] = useState('');

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleSubmit = (e) => {
    
    console.log("Submitted: ", user);
  };

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
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'table_data.xlsx');
  };

  const userInfo = isAdmin ? (
    <>
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
    </>
  ) : (
    <>
      <div className="flex items-center gap-4 bg-transparent">
        <img
          srcSet={logo2}
          alt="avatar"
          className="relative inline-block object-cover object-center w-12 h-12 rounded-lg"
        />
        <div>
          <h6 className=" bg-transparent block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
            admin
          </h6>
          <p className=" bg-transparent block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            admin
          </p>
        </div>
      </div>
    </>
  );
  return (
    <div>
    <header className="py-4 px-5  md:flex md:items-center md:justify-between">
      <div className="flex items-center">
        {toggleButton}
        <img src={logo} alt="Logo" className="w-50 h-10 mr-2" />{" "}
        {/* Adjust width and height as needed */}
        <div className="mx-5">
          <span className="text-70AB0E-800 ">Customer Payment</span>
        </div>
      </div>
  
      <div className="md:flex items-center">
        {userInfo}
  
        {/* Test icon */}
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="w-6 h-6 text-gray-400" // Adjust icon size here
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M17.65 11c0-3.89-3.29-7-7.35-7-3.96 0-7.15 3.11-7.15 7s3.19 7 7.15 7c1.35 0 2.58-.39 3.62-1.05l1.17 1.17C14.69 17.61 11.97 19 9.5 19 5.41 19 2 15.59 2 11.5S5.41 4 9.5 4c4.08 0 7.5 3.41 7.5 7.5H17.65zM9.5 6C7.57 6 6 7.57 6 9.5s1.57 3.5 3.5 3.5c1.02 0 1.92-.44 2.55-1.14l1.06 1.06c-.92 1.04-2.26 1.69-3.77 1.69-2.48 0-4.5-2.02-4.5-4.5S7.02 5 9.5 5c1.81 0 3.32 1.08 3.98 2.63l-1.06 1.06c-.61-.97-1.73-1.63-2.92-1.63z" />
          </svg>
        </div>
      </div>
    </header>
  
    <div className="flex">
      {/* Sidebar on the left */}
      <div>
        <Sidebar
          toggleSidebar={toggleSidebar}
          pathname={location.pathname}
          id="default-sidebar"
        />
      </div>
  
      {/* Centered content */}
      <div className="flex flex-grow flex-col  mt-5">
  {/* SearchForm centered */}
  <div className="flex justify-end mt-5 px-20">
      <button className="btn" onClick={handleDownloadExcel}>
      <FontAwesomeIcon icon={faFileExcel} className="mr-1" />
      Excel
    </button>

  </div>
  <div className="flex flex-col">
  <div className="flex justify-center mt-20 items-center">
            <SearchForm onSubmit={handleSubmit} />
          </div>

</div>
  {/* Table centered */}
  <div className="flex justify-center mt-5">
    <Customertable />
  </div>
  {/* Buttons aligned to the right */}
</div>
    </div>
  </div>
  
  );
};

export default CustomerPayment;
