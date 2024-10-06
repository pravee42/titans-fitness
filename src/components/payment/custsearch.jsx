import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./pay.css";
import search from "../search-normal.png";

const CustSearch = () => {
  const [userId, setUserId] = useState("");
  const [paymentData, setPaymentDetails] = useState(null);
  const [paidCount, setPaidCount] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchPaymentCount = async () => {
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        alert("No token found. Please log in.");
        return;
      }

      const headers = { Authorization: `Bearer ${token}` };
      const paymentCountResponse = await axios.get(
        `https://titan-api-v2uu.onrender.com/admin/paymentcount`,
        { headers }
      );

      const { paidCount, unpaidCount } = paymentCountResponse.data;

      setPaidCount(paidCount);
      setUnpaidCount(unpaidCount);
    } catch (error) {
      const message = error.response
        ? error.response.data.message
        : "Could not fetch payment counts.";
      console.error("Error fetching payment counts:", error.response?.data || error.message);
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentDetails = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };
      const paymentDetailsResponse = await axios.get(
        `https://titan-api-v2uu.onrender.com/admin/payment/${userId}`,
        { headers }
      );
      setPaymentDetails(paymentDetailsResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Could not fetch payment details.");
    }
  };

  const handleOpenClick = async (customerId) => {
    try {
      const token = sessionStorage.getItem("token");
      await axios.get(
        `https://titan-api-v2uu.onrender.com/admin/user/${customerId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      navigate(`/user/${customerId}`);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  useEffect(() => {
    fetchPaymentCount();
  }, []);

  // Function to filter unique payment history entries
  const getUniquePayments = (payments) => {
    const uniquePayments = {};
    payments.forEach(payment => {
      const paymentDate = new Date(payment.PAYMENT_DATE).toLocaleDateString();
      if (!uniquePayments[paymentDate]) {
        uniquePayments[paymentDate] = payment;
      }
    });
    return Object.values(uniquePayments);
  };

  return (
    <div className="cust-search-container">
      <h2 style={{ color: "#79BA0F", textAlign: "left" }}>Payment History</h2>
      <div className="flex-container">
        <div className="search-container">
          <div className="search-section">
            <label htmlFor="userId">Member ID:</label>
            <input
              type="text"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
            <button
              style={{
                backgroundColor: "white",
                borderRadius: "100px",
                boxShadow: "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px",
                color: "green",
                cursor: "pointer",
                padding: "7px 20px",
                transition: "background-color 0.3s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={fetchPaymentDetails}
              disabled={loading}
            >
              <img
                srcSet={search}
                alt="Search Icon"
                style={{ width: "20px", height: "20px", marginRight: "8px" }}
              />
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </div>

        <div className="stats-container">
          <div className="box paid-box">
            <h2>{paidCount} Members</h2>
            <p>Members already paid this month</p>
          </div>
          <div className="box unpaid-box">
            <h2>{unpaidCount} Members</h2>
            <p>Members didn't pay this month</p>
          </div>
        </div>
      </div>

      {error && <p className="error-message">{error}</p>}

      {paymentData ? (
        <div className="payment-info">
          <h2 style={{ color: "#79BA0F" }}>Search Result</h2>
          <div className="payment-details">
            <div className="customer-info">
              <p><strong>Name:</strong> {paymentData.USER.NAME}</p>
              <p><strong>ID:</strong> {paymentData.USER.ID}</p>
              <p><strong>Phone:</strong> {paymentData.USER.PHONE}</p>
            </div>
            <div className="separator" />
            <div className="payment-info-details">
              <h2 style={{ color: "#79BA0F" }}>Payment Details</h2>
              <div className="payment-history-scroll">
                {paymentData.USER.PAYMENT_HISTORY.length > 0 ? (
                  getUniquePayments(paymentData.USER.PAYMENT_HISTORY).map((payment, index) => (
                    <div key={index} className="payment-history-entry">
                      <p><strong>Payment Date:</strong> {new Date(payment.PAYMENT_DATE).toLocaleDateString()}</p>
                      <p><strong>End Date:</strong> {new Date(payment.END_DATE).toLocaleDateString()}</p>
                      <p><strong>Status:</strong> {paymentData.USER.PAYMENT_STATUS}</p>
                      <p><strong>Amount:</strong> {payment.PAYMENT_AMOUNT}</p>
                      <p><strong>Payment Type:</strong> {payment.PAYMENT_TYPE}</p>
                      <div className="separator" />
                    </div>
                  ))
                ) : (
                  <p>No payment history available.</p>
                )}
              </div>
            </div>
          </div>

          <button
            style={{
              backgroundColor: "white",
              borderRadius: "100px",
              boxShadow: "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px",
              color: "green",
              cursor: "pointer",
              padding: "7px 20px",
              transition: "background-color 0.3s",
            }}
            onClick={() => handleOpenClick(paymentData.USER.ID)}
          >
            Open
          </button>
        </div>
      ) : (
        <div>
          <p>No payment information available.</p>
          <button
            style={{
              backgroundColor: "white",
              borderRadius: "100px",
              boxShadow: "rgba(44, 187, 99, .2) 0 -25px 18px -14px inset, rgba(44, 187, 99, .15) 0 1px 2px, rgba(44, 187, 99, .15) 0 2px 4px, rgba(44, 187, 99, .15) 0 4px 8px, rgba(44, 187, 99, .15) 0 8px 16px, rgba(44, 187, 99, .15) 0 16px 32px",
              color: "green",
              cursor: "pointer",
              padding: "7px 20px",
              transition: "background-color 0.3s",
            }}
            onClick={() => handleOpenClick(userId)} // Using userId for navigation
          >
            Open
          </button>
        </div>
      )}
    </div>
  );
};

export default CustSearch;
