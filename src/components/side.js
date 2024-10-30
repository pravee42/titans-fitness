import React from "react";
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faSignOutAlt, faSearch, faWallet, faDumbbell, faClock } from '@fortawesome/free-solid-svg-icons';

const Sidebar = ({ toggleSidebar }) => {
  const location = useLocation();

  const handleSearchClick = () => {
    window.location.href = "/Search-Existing-customer";
  };

  const handleCustomerPayment = () => {
    window.location.href = "/Customer-Payment";
  };

  const handleGymAttendance = () => {
    window.location.href = "/Gym-Attendance";
  };

  const handlepunchtime = () => {
    window.location.href = "/attendance";
  };
  // const handleSignOut = () => {
  //   sessionStorage.removeItem("token");
  //   window.location.href = "/";
  // };
  
  return (
    <div className="sidebar bg-white text-black w-100 min-h-screen px-4 flex flex-col">
      <ul>
        <li className={`hover:text-white py-3 px-1 hover:bg-70AB0E-800 hover:rounded-lg ${location.pathname === '/new-registration' ? 'active' : ''}`}>
          <Link to="/Dashboard" className="block flex items-center">
            <FontAwesomeIcon icon={faUser} className="mr-2 text-lg px-1" />
            <span className="text-sm"> New Customer Registration</span>
          </Link>
        </li>
        <li className={`hover:text-white py-3 px-1 hover:bg-70AB0E-800 hover:rounded-lg ${location.pathname === '/Search-Existing-customer' ? 'active' : ''}`}>
          <a href="#" className="block flex items-center" onClick={handleSearchClick}>
            <FontAwesomeIcon icon={faSearch} className="mr-2 text-lg px-1" />
            <span className="text-sm"> Search Existing Customer</span>
          </a>
        </li>
        <li className="hover:text-white py-3 px-1 hover:bg-70AB0E-800 hover:rounded-lg mt-3">
          <a href="#" className="block flex items-center" onClick={handleCustomerPayment}>
            <FontAwesomeIcon icon={faWallet} className="mr-2 text-lg px-1" />
            <span className="text-sm"> Customer Payment</span>
          </a>
        </li>
        <li className="hover:text-white py-3 px-1 hover:bg-70AB0E-800 hover:rounded-lg mt-3">
          <a href="#" className="block flex items-center" onClick={handleGymAttendance}>
            <FontAwesomeIcon icon={faDumbbell} className="mr-2 text-lg px-1" />
            <span className="text-sm"> Gym Attendance</span>
          </a>
        </li>
        <li className="hover:text-white py-3 px-1 hover:bg-70AB0E-800 hover:rounded-lg mt-3">
          <a href="#" className="block flex items-center" onClick={handlepunchtime}>
            <FontAwesomeIcon icon={faClock} className="mr-2 text-lg px-1" />
            <span className="text-sm"> Customer Punch Time</span>
          </a>
        </li>
        <li className="hover:text-white py-3 px-1 hover:bg-70AB0E-800 hover:rounded-lg mt-3">
          <a href="#" className="block flex items-center" onClick={() => {window.location.href = "/sendMessage"} }>
            <FontAwesomeIcon icon={faClock} className="mr-2 text-lg px-1" />
            <span className="text-sm"> Send Message</span>
          </a>
        </li>
      </ul>
      <div className="relative min-h-screen">
  {/* <ul className="absolute bottom-10 mb-11 w-full">
    <li className="hover:text-green-800 px-1">
      <a href="#" className="block flex items-center justify-center" onClick={handleSignOut}>
        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg" />
        <span className="text-sm">Sign Out</span>
      </a>
    </li>
  </ul> */}
</div>


      {/* Sidebar 76menu icon for mobile view */}
      <div className="sm:hidden">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 focus:outline-none"
          onClick={toggleSidebar}
          id="default-sidebar"
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
      <div className="sm:hidden">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 focus:outline-none"
          onClick={toggleSidebar}
          id="default-sidebar"
        >
          <svg
            className="w-8 h-8"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
