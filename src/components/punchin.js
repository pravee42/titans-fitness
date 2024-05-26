import React, { useState, useEffect } from "react";
import Sidebar from "./side";
import SearchForm from "./tables/Punchin";
import "../styles/sty.css";
import logo from "../img/logo-1.png";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faWallet } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';

const Punchin = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchId, setSearchId] = useState("");
  const [userDetails, setUserDetails] = useState(null);

  // Function to update current time every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const handleSearchChange = (event) => {
    setSearchId(event.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await axios.get(`https://gym-backend-apis.onrender.com/customer/details/${searchId}`);
      setUserDetails(response.data);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  let location = useLocation();

  const userInfo = (
    <div className="flex items-center gap-4 bg-transparent">
      <img
        src="https://docs.material-tailwind.com/img/face-2.jpg"
        alt="avatar"
        className="relative inline-block object-cover object-center w-12 h-12 rounded-lg"
      />
      <div>
        <h6 className=" bg-transparent block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
          Gym Attendance
        </h6>
        <p className=" bg-transparent block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
          Test
        </p>
      </div>
    </div>
  );

  return (
    <div>
      <header className="py-4 px-5 md:flex md:items-center md:justify-between">
        <div className="flex items-center">
          <button className="md:hidden" onClick={toggleSidebar}>
            {sidebarOpen ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            )}
          </button>
          <img src={logo} alt="Logo" className="w-50 h-10 mr-2" />
          <div className="mx-5">
            <FontAwesomeIcon icon={faWallet} className="text-70AB0E-800 mr-2" />
            <span className="text-70AB0E-800">Punch IN/OUT</span>
          </div>
        </div>
        <div className="md:flex items-center">
          {userInfo}
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="w-6 h-6 text-gray-400">
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17.65 11c0-3.89-3.29-7-7.35-7-3.96 0-7.15 3.11-7.15 7s3.19 7 7.15 7c1.35 0 2.58-.39 3.62-1.05l1.17 1.17C14.69 17.61 11.97 19 9.5 19 5.41 19 2 15.59 2 11.5S5.41 4 9.5 4c4.08 0 7.5 3.41 7.5 7.5H17.65zM9.5 6C7.57 6 6 7.57 6 9.5s1.57 3.5 3.5 3.5c1.02 0 1.92-.44 2.55-1.14l1.06 1.06c-.92 1.04-2.26 1.69-3.77 1.69-2.48 0-4.5-2.02-4.5-4.5S7.02 5 9.5 5c1.81 0 3.32 1.08 3.98 2.63l-1.06 1.06c-.61-.97-1.73-1.63-2.92-1.63z" />
            </svg>
          </div>
        </div>
      </header>
      <div className="flex">
        {/* <div>
          <Sidebar toggleSidebar={toggleSidebar} pathname={location.pathname} id="default-sidebar" />
        </div> */}
        <div className="flex flex-grow flex-col mt-5">
          <div className="flex flex-col">
            <div className="flex justify-center mt-20 items-center">
              <SearchForm searchId={searchId} onSearchChange={handleSearchChange} onSearchSubmit={handleSearchSubmit} />
            </div>
          </div>
          <div className="flex justify-between px-20 items-center">
            <p className="text-gray-600">{currentTime.toLocaleTimeString()}</p>
            <button
              className={`flex items-center gap-5 justify-between px-6 py-4 text-${isClicked ? 'gray' : 'lime'}-600 bg-${isClicked ? 'green' : 'gray'}-50 rounded-2xl max-md:px-5`}
              onClick={handleClick}
            >
              <div className={`w-2.5 h-2.5 bg-${isClicked ? 'gray' : 'lime'}-600 rounded-sm border border-${isClicked ? 'gray' : 'lime'}-600 border-solid`}></div>
              <div>Punch {isClicked ? 'Out' : 'In'}</div>
            </button>
          </div>
          {userDetails && (
            <div className="px-20 mt-5">
              <h2 className="text-xl font-bold mb-3">Personal Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center">
                  <img src={userDetails.IMAGE_URL} alt="User Avatar" className="w-40 h-40 rounded-full mb-4" />
                </div>
                <div className="col-span-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold">Name</label>
                      <input type="text" value={userDetails.NAME} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">Mobile number</label>
                      <input type="text" value={userDetails.MOBILE_NO} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">DOB</label>
                      <input type="text" value={userDetails.DATE_OF_BIRTH} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">Emergency contact number</label>
                      <input type="text" value={userDetails.EMERGENCY_CONTACT_NO} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">Member Id</label>
                      <input type="text" value={userDetails.MEMBERSHIP_NO} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">Joining Date</label>
                      <input type="text" value={userDetails.JOINING_DATE} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">Occupation</label>
                      <input type="text" value={userDetails.OCCUPATION} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">User Id</label>
                      <input type="text" value={userDetails.USER_ID} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">User Gender</label>
                      <input type="text" value={userDetails.USER_GENDER} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                    <div>
                      <label className="block font-bold">User Blood Group</label>
                      <input type="text" value={userDetails.USER_BLOOD_GROUP} className="w-full border rounded px-2 py-1" readOnly />
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="text-xl font-bold mt-5 mb-3">Payment Details</h2>
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left bg-gray-200">Payment Amount</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Effective Date</th>
                      <th className="py-3 px-6 text-left bg-gray-200">End Date</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Balance</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="py-3 px-6">{userDetails.PAYMENT_AMOUNT}</td>
                      <td className="py-3 px-6">{userDetails.EFFECTIVE_DATE}</td>
                      <td className="py-3 px-6">{userDetails.END_DATE}</td>
                      <td className="py-3 px-6">{userDetails.BALANCE}</td>
                      <td className="py-3 px-6">{userDetails.STATUS}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        
        </div>
      </div>
    </div>
  );
};

export default Punchin;
