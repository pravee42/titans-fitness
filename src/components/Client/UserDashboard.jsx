import React, { useState, useEffect } from "react";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt, faWallet } from '@fortawesome/free-solid-svg-icons';
import logo from '../../img/logo-1.png';

const UserDashboard = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [inTime, setInTime] = useState(null);
  const [outTime, setOutTime] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUserDashboardData = async () => {
      try {
        const response = await axios.get(`https://gym-backend-apis.onrender.com/customer/dashboard`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserInfo(response.data.info);
        setPaymentDetails(response.data.payment);
      } catch (error) {
        console.error('Error fetching user dashboard data:', error);
      }
    };

    fetchUserDashboardData();
  }, [token]);

  useEffect(() => {
    const fetchInOutTime = async () => {
      try {
        const response = await axios.get(`https://gym-backend-apis.onrender.com/customer/punch`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const punchData = response.data.punch[0];
        setInTime(punchData.IN_TIME);
        setOutTime(punchData.OUT_TIME);
      } catch (error) {
        console.error('Error fetching in-time and out-time data:', error);
      }
    };

    fetchInOutTime();
  }, [token]);

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const response = await axios.get(`https://gym-backend-apis.onrender.com/customer/payment`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        console.log(response);
        const paymentData = response.data.payment;
        setPaymentDetails(paymentData);
      } catch (error) {
        console.error('Error fetching payment details:', error);
      }
    };

    fetchPaymentDetails();
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
        <button onClick={handleSignOut} className="bg-custom-green text-white py-2 px-4 rounded">
          <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
          Sign Out
        </button>
      </header>
      <div className="p-5">
        {userInfo && (
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6 flex items-center justify-between border-2">
            <div className="flex items-center">
              <div className="mr-4">
                <label className="block font-bold">Profile Picture:</label>
                <img
                  src={userInfo.IMAGE_PATH}
                  alt="Profile"
                  className="w-32 h-32"
                />
              </div>
              <div>
                <p className="font-bold">Name:</p>
                <p>{userInfo.NAME}</p>
                <p className="font-bold">User ID:</p>
                <p>{userInfo.ID}</p>
              </div>
            </div>
            <div
              className={`px-4 py-1 rounded ${
                paymentDetails.every(payment => payment.PAYMENT_BALANCE === 0)
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              <p className="font-sans text-sm text-white">
                {paymentDetails.every(payment => payment.PAYMENT_BALANCE === 0)
                  ? "Paid"
                  : "Unpaid"}
              </p>
            </div>
          </div>
        )}

        {paymentDetails.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow-lg mb-6 overflow-x-auto">
            <h2 className="text-xl font-bold mb-3">Payment Status</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left bg-gray-200">Payment Amount</th>
                  <th className="py-3 px-6 text-left bg-gray-200">Payment Date</th>
                  <th className="py-3 px-6 text-left bg-gray-200">Effective Date</th>
                  <th className="py-3 px-6 text-left bg-gray-200">End Date</th>
                  <th className="py-3 px-6 text-left bg-gray-200">Balance</th>
                </tr>
              </thead>
              <tbody>
                {paymentDetails.map((payment, index) => (
                  <tr key={index}>
                    <td className="py-3 px-6">{payment.PAYMENT_AMOUNT}</td>
                    <td className="py-3 px-6">{new Date(payment.PAYMENT_DATE).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{new Date(payment.EFFECTIVE_DATE).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{new Date(payment.END_DATE).toLocaleDateString()}</td>
                    <td className="py-3 px-6">{payment.PAYMENT_BALANCE}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {inTime && (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-3">Today's Activities</h2>
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-3 px-6 text-left bg-gray-200">In Time</th>
                  <th className="py-3 px-6 text-left bg-gray-200">Out Time</th>
                  <th className="py-3 px-6 text-left bg-gray-200">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-6">{new Date(inTime).toLocaleTimeString()}</td>
                  <td className="py-3 px-6">{outTime ? new Date(outTime).toLocaleTimeString() : "N/A"}</td>
                  <td className="py-3 px-6">
                    {outTime
                      ? `${Math.floor((new Date(outTime) - new Date(inTime)) / (1000 * 60))} minutes`
                      : "N/A"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserDashboard;
