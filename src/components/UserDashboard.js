import React, { useState, useEffect } from "react";
import "../styles/sty.css";
import logo from "../img/logo-1.png";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWallet } from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import UserSearchForm from "./UserSearchForm";
import { getTokenData } from './utils/token'; // Adjust the path as necessary

const UserDashboard = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [attendanceData, setAttendanceData] = useState([]);
  const [inTime, setInTime] = useState(null);
  const [userProfile, setUserProfile] = useState({});
  const [searchResult, setSearchResult] = useState(null);
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem('_id');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const profile = getTokenData();
    if (profile) {
      setUserProfile(profile);
    }
  }, []);

  const handleClick = async () => {
    const currentTimestamp = new Date();
    if (!isClicked) {
      setInTime(currentTimestamp);
      try {
        await axios.post(
          'http://13.60.96.144/admin/time/in',
          { in_time: currentTimestamp, user_id: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Error punching in:', error);
      }
    } else {
      const outTime = currentTimestamp;
      const duration = (outTime - inTime) / (1000 * 60 * 60);
      const newEntry = {
        inTime: inTime.toLocaleTimeString(),
        outTime: outTime.toLocaleTimeString(),
        duration: `${duration.toFixed(2)} hrs`,
      };
      setAttendanceData([...attendanceData, newEntry]);

      try {
        await axios.post(
          'http://13.60.96.144/admin/time/out',
          { out_time: outTime, user_id: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } catch (error) {
        console.error('Error punching out:', error);
      }
    }
    setIsClicked(!isClicked);
  };

  const handleSearch = async (customerId) => {
    try {
      const response = await axios.get(`http://13.60.96.144/admin/customer/${customerId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setSearchResult(response.data);
      setPayments(response.data.payments); // Assuming payments are part of the customer data
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  let location = useLocation();

  const isAdmin = userProfile.role === 'admin';
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
          src="https://docs.material-tailwind.com/img/face-2.jpg"
          alt="avatar"
          className="relative inline-block object-cover object-center w-12 h-12 rounded-lg"
        />
        <div>
          <h6 className=" bg-transparent block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-inherit">
            {userProfile.username}
          </h6>
          <p className=" bg-transparent block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
            {userProfile.role}
          </p>
        </div>
      </div>
    </>
  );

  return (
    <>
      <header className="py-4 px-5 md:flex md:items-center md:justify-between bg-white shadow">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-40 h-10 mr-2" />{" "}
          <div className="mx-5">
            <FontAwesomeIcon icon={faWallet} className="text-green-600 mr-2" />
            <span className="text-green-600 font-semibold text-lg">Punch IN/OUT</span>
          </div>
        </div>
        

        <div className="md:flex items-center">
          {userInfo}

          <div className="ml-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="w-6 h-6 text-gray-400"
            >
              <path d="M0 0h24v24H0z" fill="none" />
              <path d="M17.65 11c0-3.89-3.29-7-7.35-7-3.96 0-7.15 3.11-7.15 7s3.19 7 7.15 7c1.35 0 2.58-.39 3.62-1.05l1.17 1.17C14.69 17.61 11.97 19 9.5 19 5.41 19 2 15.59 2 11.5S5.41 4 9.5 4c4.08 0 7.5 3.41 7.5 7.5H17.65zM9.5 6C7.57 6 6 7.57 6 9.5s1.57 3.5 3.5 3.5c1.02 0 1.92-.44 2.55-1.14l1.06 1.06c-.92 1.04-2.26 1.69-3.77 1.69-2.48 0-4.5-2.02-4.5-4.5S7.02 5 9.5 5c1.81 0 3.32 1.08 3.98 2.63l-1.06 1.06c-.61-.97-1.73-1.63-2.92-1.63z" />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex flex-grow flex-col mt-5">
        <div className="flex flex-col items-center">
          <div className="flex justify-between w-full px-20 items-center mb-5">
            <p className="text-gray-600 text-lg font-medium">{currentTime.toLocaleTimeString()}</p>
            {isAdmin ? (
              <UserSearchForm onSearch={handleSearch} />
            ) : (
              <button
                className={`flex items-center gap-5 justify-between px-6 py-4 text-${isClicked ? 'gray' : 'lime'}-600 bg-${isClicked ? 'green' : 'gray'}-50 rounded-2xl max-md:px-5 shadow-md`}
                onClick={handleClick}
              >
                <div className={`w-2.5 h-2.5 bg-${isClicked ? 'gray' : 'lime'}-600 rounded-sm border border-${isClicked ? 'gray' : 'lime'}-600 border-solid`}></div>
                <div className="text-lg font-semibold">Punch {isClicked ? 'Out' : 'In'}</div>
              </button>
            )}
          </div>
          {isAdmin && searchResult && (
            <>
              <div className="w-full px-20">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left bg-gray-200">In Time</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Out Time</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Duration</th>
                    </tr>
                  </thead>
                  <tbody>
                    {attendanceData.map((entry, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-6">{entry.inTime}</td>
                        <td className="py-3 px-6">{entry.outTime}</td>
                        <td className="py-3 px-6">{entry.duration}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-full px-20 mt-5">
                <h2 className="text-xl font-bold mb-3">Recent Payments</h2>
                <table className="min-w-full bg-white shadow-md rounded-lg">
                  <thead>
                    <tr>
                      <th className="py-3 px-6 text-left bg-gray-200">Payment Amount</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Effective Date</th>
                      <th className="py-3 px-6 text-left bg-gray-200">End Date</th>
                      <th className="py-3 px-6 text-left bg-gray-200">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {payments.slice(0, 3).map((payment, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-3 px-6">{payment.amount}</td>
                        <td className="py-3 px-6">{new Date(payment.effectiveDate).toLocaleDateString()}</td>
                        <td className="py-3 px-6">{new Date(payment.endDate).toLocaleDateString()}</td>
                        <td className="py-3 px-6">{payment.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
