import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [error, setError] = useState('');
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);
  

  useEffect(() => {
    const fetchPaymentDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        const paymentDetailsResponse = await axios.get(`https://gym-backend-apis.onrender.com/admin/payment/${userId}`, { headers });
        setPaymentDetails(paymentDetailsResponse.data);
        console.log("Payment details:", paymentDetailsResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    if (userId) {
      fetchPaymentDetails();
    }
  }, [userId]);
  

  const handleEditPayment = (payment) => {
    setIsEditingPayment(true);
    setPaymentToEdit(payment);
  };

  const handleSavePaymentEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const { id=userId, amount, end, balance } = paymentToEdit;
      const response = await axios.patch(
        `https://gym-backend-apis.onrender.com/admin/payment/edit`,
        { id, amount, end, balance },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPayments(payments.map(payment =>
          payment.id === id ? response.data.payment : payment
        ));
        setIsEditingPayment(false);
        setPaymentToEdit(null);
      } else {
        console.error('Error updating payment:', response.statusText);
      }
    } catch (error) {
      console.error('Error updating payment:', error);
      setError('Error updating payment');
    }
  };

  const handleCancelEditPayment = () => {
    setIsEditingPayment(false);
    setPaymentToEdit(null);
  };

  return (
    <div>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Effective Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Balance</th>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Editing payment section */}
          {isEditingPayment && paymentToEdit && (
            <tr>
              
              <td colSpan="6">
                
                <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
                  <h3 className="text-xl font-bold mb-4">Edit Payment</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold mb-2">Payment Amount:</label>
                      <input
                        type="text"
                        value={paymentToEdit.amount}
                        onChange={(e) => setPaymentToEdit({ ...paymentToEdit, amount: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Effective Date:</label>
                      <input
                        type="date"
                        value={paymentToEdit.effective}
                        onChange={(e) => setPaymentToEdit({ ...paymentToEdit, effective: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">End Date:</label>
                      <input
                        type="date"
                        value={paymentToEdit.end}
                        onChange={(e) => setPaymentToEdit({ ...paymentToEdit, end: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Balance:</label>
                      <input
                        type="text"
                        value={paymentToEdit.balance}
                        onChange={(e) => setPaymentToEdit({ ...paymentToEdit, balance: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold mb-2">Type:</label>
                      <input
                        type="text"
                        value={paymentToEdit.type}
                        onChange={(e) => setPaymentToEdit({ ...paymentToEdit, type: e.target.value })}
                        className="w-full p-2 border rounded"
                      />
                    </div>
                  </div>
                  <button
                    onClick={handleSavePaymentEdit}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Save Payment
                  </button>
                  <button
                    onClick={handleCancelEditPayment}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                  >
                    Cancel
                  </button>
                </div>
              </td>
             
            </tr>
          )}
          {/* Displaying payment history */}
          {paymentDetails && paymentDetails.payment && paymentDetails.payment.length > 0 ? (
            paymentDetails.payment.map((payment, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{payment.PAYMENT_AMOUNT}</td>
                <td className="border px-4 py-2">{new Date(payment.PAYMENT_DATE).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(payment.EFFECTIVE_DATE).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{payment.PAYMENT_BALANCE}</td>
                <td className="border px-4 py-2">{payment.PAYMENT_TYPE}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() => handleEditPayment(payment)}
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center">No payment history found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Displaying payment details */}
      {paymentDetails && paymentDetails.payment && paymentDetails.payment.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-6">
          <h2 className="text-xl font-bold mb-3">Payment Status</h2>
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left bg-gray-200">Payment Amount</th>
                <th className="py-3 px-6 text-left bg-gray-200">Payment Date</th>
                <th className="py-3 px-6 text-left bg-gray-200">Effective Date</th>
                <th className="py-3 px-6 text-left bg-gray-200">Balance</th>
                <th className="py-3 px-6 text-left bg-gray-200">Payment Type</th>
              </tr>
            </thead>
            <tbody>
              {paymentDetails.payment.map((payment, index) => (
                <tr key={index}>
                  <td className="py-3 px-6">{payment.PAYMENT_AMOUNT}</td>
                  <td className="py-3 px-6">{new Date(payment.PAYMENT_DATE).toLocaleDateString()}</td>
                  <td className="py-3 px-6">{new Date(payment.EFFECTIVE_DATE).toLocaleDateString()}</td>
                  <td className="py-3 px-6">{payment.PAYMENT_BALANCE}</td>
                  <td className="py-3 px-6">{payment.PAYMENT_TYPE}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PaymentHistory;
