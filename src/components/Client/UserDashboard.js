import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faWallet } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo-1.png';
import { getTokenData } from '../utils/token';

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [payments, setPayments] = useState([]);
  const [inTime, setInTime] = useState(null);
  const token = localStorage.getItem('token');
  const [outTime, setOutTime] = useState(null);

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        const response = await axios.get(`https://gym-backend-apis.onrender.com/customer/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo(response.data.info);
        setPayments(response.data.payment);
      } catch (error) {
        console.error('Error fetching user dashboard data:', error);
      }
    };

    fetchUserDashboardData();
  }, [token]);

  useEffect(() => {
    const fetchInOutTime = async () => {
      try {
        const response = await axios.get(`https://gym-backend-apis.onrender.coms/customer/punch`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setInTime(response.data.inTime);
        setOutTime(response.data.outTime);
      } catch (error) {
        console.error('Error fetching in-time and out-time data:', error);
      }
    };

    fetchInOutTime();
  }, [token]);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat">
      <header className="py-4 px-5 flex flex-wrap w-full items-center justify-between bg-white shadow">
        <div className="flex items-center">
          <img src={logo} alt="Logo" className="w-40 h-10 mr-2" />
          <div className="mx-5">
            <FontAwesomeIcon icon={faWallet} className="text-green-600 mr-2" />
            <span className="text-green-600 font-semibold text-lg flex">Punch IN/OUT</span>
          </div>
        </div>

        {userInfo && (
          <div className="md:flex items-center ml-auto">
            <div className="ml-4">
              <div className="flex items-center gap-4 bg-transparent">
                <div className="absolute inset-0 flex items-center justify-center opacity-50 z-0">
                  <img src={logo} alt="Logo" className="w-1/2 h-1/2 object-contain" style={{ opacity: 0.5 }} />
                </div>
                <div>
                  <h6 className="font-sans text-base font-semibold">{userInfo.NAME}</h6>
                  <p className="font-sans text-sm text-gray-700">{userInfo.STATUS === 1 ? 'Paid' : 'Unpaid'}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        <ul className="flex md:absolute md:bottom-0 md:left-0 md:mb-11">
          <li className="hover:text-70AB0E-800 px-1">
            <a href="#" className="block flex items-center" onClick={handleSignOut}>
              <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-lg" />
              <span className="text-sm">Sign Out</span>
            </a>
          </li>
        </ul>
      </header>

      <div className="px-4 md:px-20 mt-5">
        <h2 className="text-xl font-bold mb-3">Personal Details</h2>
        {userInfo && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <img src={userInfo.IMAGE_URL} alt="User Avatar" className="w-40 h-40 rounded-full mb-4" />
            </div>
            <div className="col-span-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold">Name</label>
                  <input type="text" value={userInfo.NAME} className="w-full border rounded px-2 py-1" readOnly />
                </div>
                <div>
                  <label className="block font-bold">Mobile number</label>
                  <input type="text" value={userInfo.MOBILE_NO} className="w-full border rounded px-2 py-1" readOnly />
                </div>
                <div>
                  <label className="block font-bold">Email</label>
                  <input type="text" value={userInfo.EMAIL} className="w-full border rounded px-2 py-1" readOnly />
                </div>
                <div>
                  <label className="block font-bold">DOB</label>
                  <input type="text" value={userInfo.DOB && userInfo.DOB.slice(0, 10)} className="w-full border rounded px-2 py-1" readOnly />
                </div>
                <div className="col-span-2">
                  <label className="block font-bold">Address</label>
                  <input type="text" value={userInfo.ADDRESS} className="w-full border rounded px-2 py-1" readOnly />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-5 w-full px-4 md:px-20">
        <h2 className="text-xl font-bold mb-3">Recent Payments</h2>
        <table className="w-full bg-white shadow-md rounded-lg">
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
            {payments.slice(0, 3).map((payment, index) => (
              <tr key={index} className="border-b">
                <td className="py-3 px-6">{payment.PAYMENT_AMOUNT}</td>
                <td className="py-3 px-6">{new Date(payment.EFFECTIVE_DATE).toLocaleDateString()}</td>
                <td className="py-3 px-6">{new Date(payment.END_DATE).toLocaleDateString()}</td>
                <td className="py-3 px-6">{payment.PAYMENT_BALANCE}</td>
                <td className="py-3 px-6">{userInfo.STATUS === 1 ? 'Paid' : 'Unpaid'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-5 w-full px-4 md:px-20">
        <h2 className="text-xl font-bold mb-3">In-Time and Out-Time</h2>
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left bg-gray-200">In Time</th>
              <th className="py-3 px-6 text-left bg-gray-200">Out Time</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b">
              <td className="py-3 px-6">{inTime}</td>
              <td className="py-3 px-6">{outTime}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserDashboard;
