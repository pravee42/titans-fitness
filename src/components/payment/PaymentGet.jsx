import React, { useState, useEffect } from "react";
import axios from "axios";

const PaymentHistory = ({ userId }) => {
  const [payments, setPayments] = useState([]);
  const [error, setError] = useState('');
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://gym-backend-apis.onrender.com/admin/payment/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setPayments(response.data.payments);
        } else {
          console.error('Error fetching payment history:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching payment history:', error);
        setError('Error fetching payment history');
      }
    };

    if (userId) {
      fetchPaymentHistory();
    }
  }, [userId]);

  const handleEditPayment = (payment) => {
    setIsEditingPayment(true);
    setPaymentToEdit(payment);
  };

  const handleSavePaymentEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const { id, amount, end, balance } = paymentToEdit;
      const response = await axios.patch(
        `http://13.60.96.144/admin/payment/edit`,
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

  const handleDeletePayment = async (paymentId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://gym-backend-apis.onrender.com/admin/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setPayments(payments.filter(payment => payment.id !== paymentId));
    } catch (error) {
      console.error('Error deleting payment:', error);
      setError('Error deleting payment');
    }
  };

  return (
    <div>
      {error && <div className="text-red-500">{error}</div>}
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
          {payments && payments.length > 0 ? (
            payments.map((payment) => (
              <tr key={payment.id}>
                <td className="border px-4 py-2">{payment.amount}</td>
                <td className="border px-4 py-2">{payment.effective}</td>
                <td className="border px-4 py-2">{payment.end}</td>
                <td className="border px-4 py-2">{payment.balance}</td>
                <td className="border px-4 py-2">{payment.type}</td>
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
    </div>
  );
};

export default PaymentHistory;
