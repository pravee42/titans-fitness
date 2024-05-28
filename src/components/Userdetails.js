import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import * as XLSX from 'xlsx';
import logo from '../img/gymlogo.jpg';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [nextDue, setNextDue] = useState('');
  const [newPayment, setNewPayment] = useState('');
  const [effectiveDate, setEffectiveDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [balance, setBalance] = useState('');
  const [type, setType] = useState('');
  const [error, setError] = useState(null);
  const [isActivated, setIsActivated] = useState(false);
  const notify = () => {
    toast.success('Payment Added', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: 'bounce',
    });
  };
  const [isEditing, setIsEditing] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('Unpaid');
  const [editedInfo, setEditedInfo] = useState({
    name: '',
    dob: '',
    address: '',
    email: '',
    phone: '',
    referenceNumber: '',
    image: '',
  });
  const [recentPayments, setRecentPayments] = useState([]);
  const [isEditingPayment, setIsEditingPayment] = useState(false);
  const [paymentToEdit, setPaymentToEdit] = useState(null);
  const [payments, setPayments] = useState([]);
  const userId = localStorage.getItem('_id');
  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await Axios.get(`https://gym-backend-apis.onrender.com/admin/user/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data && response.data.user) {
          const userData = response.data.user;
          setUser(userData);
          setPaymentStatus(userData.PAYMENTSTATUS);
          setNextDue(userData.NEXTDUE);
          setIsActivated(userData.ACTIVE);
          setRecentPayments(userData.recentPayments || []);
        } else {
          setError('User data not found');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
        setError('Error fetching user details');
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleToggleActivation = async () => {
    try {
      const endpoint = isActivated 
        ? 'https://gym-backend-apis.onrender.com/admin/user/non-active' 
        : 'https://gym-backend-apis.onrender.com/admin/user/active';
      
      const response = await Axios.post(
        endpoint,
        { userID: userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Server response:', response); // Log the server response
      setIsActivated(!isActivated);
    } catch (error) {
      console.error('Error toggling activation status:', error);
      setError('Error toggling activation status');
    }
  };
  

  const handleEdit = () => {
    setIsEditing(true);
    setEditedInfo({
      name: user.NAME,
      dob: user.DOB,
      address: user.ADDRESS,
      email: user.EMAIL,
      phone: user.PHONE,
      referenceNumber: user.REFERENCE_NUMBER,
      image: user.IMAGE,
    });
  };

  const handleSaveEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('name', editedInfo.name);
      formData.append('dob', editedInfo.dob);
      formData.append('address', editedInfo.address);
      formData.append('email', editedInfo.email);
      formData.append('phone', editedInfo.phone);
      formData.append('referenceNumber', editedInfo.referenceNumber);
      if (editedInfo.image) {
        formData.append('image', editedInfo.image);
      }
      const response = await Axios.patch(`https://gym-backend-apis.onrender.com/admin/user/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setIsEditing(false);
      setUser(response.data.user);
    } catch (error) {
      console.error('Error updating user details:', error);
      setError('Error updating user details');
    }
  };

  const handleCancelEditPayment = () => {
    setIsEditingPayment(false);
    setPaymentToEdit(null);
  };
  useEffect(()=>{
  const fetchPaymentHistory = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.get(`https://gym-backend-apis.onrender.com/admin/payment/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setPayments(response.data.payments);
        console.log('Response from the server:', response.data);
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

  const handleAddPayment = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await Axios.post(
        `https://gym-backend-apis.onrender.com/admin/payment/add`,
        {
          id: user.ID,
          type: type,
          amount: newPayment, 
          effective: effectiveDate,
          end: endDate,
          balance: balance, 
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      console.log('Server response:', response);
      setPaymentStatus(response.data.paymentStatus);
      setNextDue(response.data.nextDue);
      setRecentPayments([...recentPayments, response.data.payment]);
      setNewPayment('');
      setEffectiveDate('');
      setEndDate('');
      setBalance('');
      setType('');
      notify();
    } catch (error) {
      console.error('Error adding payment:', error);
  
      if (error.response && error.response.headers) {
        console.log('Redirect Location:', error.response.headers.location);
      }
  
      setError('Error adding payment');
    }
  };
  
  const handleEditPayment = (payment) => {
    setIsEditingPayment(true);
    setPaymentToEdit(payment);
  };

  const handleSavePaymentEdit = async () => {
    try {
      const token = localStorage.getItem('token');
      const { id, amount, end, balance } = paymentToEdit;
      const response = await Axios.patch(
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

  const handleCancelEdit = () => {
    setIsEditingPayment(false);
    setPaymentToEdit(null);
  };

  const handleDownload = () => {
    const ws = XLSX.utils.json_to_sheet(recentPayments);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Payments');
    XLSX.writeFile(wb, 'payments.xlsx');
  };

  const togglePaymentStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      await Axios.patch(
        `https://gym-backend-apis.onrender.com/admin/payment/edit`,
        {
          paymentStatus: paymentStatus === 'Paid' ? 'Unpaid' : 'Paid',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPaymentStatus(paymentStatus === 'Paid' ? 'Unpaid' : 'Paid');
    } catch (error) {
      console.error('Error toggling payment status:', error);
      setError('Error toggling payment status');
    }
  };

  return (
    <div className="container mx-auto p-4 bg-green-100">
      <div className="flex justify-center mb-4">
        <img src={logo} alt="Logo" className="w-22 h-32 rounded-full" />
      </div>
      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
      {user ? (
        <div className="bg-white p-4 rounded shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Customer ID: {user.ID}</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <p className="text-xl font-semibold">Name: {user.NAME}</p>
              <p className="text-xl font-semibold">Email: {user.EMAIL}</p>
              <p className="text-xl font-semibold">Phone: {user.PHONE}</p>
              <p className="text-xl font-semibold">DOB: {user.DOB && user.DOB.slice(0, 10)}</p>
              <p className="text-xl font-semibold">Address: {user.ADDRESS}</p>
              <p className="text-xl font-semibold">Reference Number: {user.REFERENCE_NUMBER}</p>
              <p className="text-xl font-semibold">Next Due: {nextDue}</p>
              <p className="text-xl font-semibold">Payment Status: {paymentStatus}</p>
              <p className="text-xl font-semibold">Activation Status: {isActivated ? 'Active' : 'Inactive'}</p>
              <button
                onClick={togglePaymentStatus}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Toggle Payment Status
              </button>
              <button
                onClick={handleToggleActivation}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                {isActivated ? 'Deactivate User' : 'Activate User'}
              </button>
              <button
                onClick={handleEdit}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Edit Info
              </button>
              <button
                onClick={handleDownload}
                className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mt-2"
              >
                Download Payments
              </button>
            </div>
            <div>
              <img src={user.IMAGE} alt="User" className="w-full h-auto rounded" />
            </div>
          </div>
          {isEditing && (
            <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
              <h3 className="text-xl font-bold mb-4">Edit Information</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-2">Name:</label>
                  <input
                    type="text"
                    value={editedInfo.name}
                    onChange={(e) => setEditedInfo({ ...editedInfo, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Email:</label>
                  <input
                    type="email"
                    value={editedInfo.email}
                    onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Phone:</label>
                  <input
                    type="text"
                    value={editedInfo.phone}
                    onChange={(e) => setEditedInfo({ ...editedInfo, phone: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">DOB:</label>
                  <input
                    type="date"
                    value={editedInfo.dob}
                    onChange={(e) => setEditedInfo({ ...editedInfo, dob: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Address:</label>
                  <input
                    type="text"
                    value={editedInfo.address}
                    onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Reference Number:</label>
                  <input
                    type="text"
                    value={editedInfo.referenceNumber}
                    onChange={(e) => setEditedInfo({ ...editedInfo, referenceNumber: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-2">Image:</label>
                  <input
                    type="file"
                    onChange={(e) => setEditedInfo({ ...editedInfo, image: e.target.files[0] })}
                    className="w-full p-2 border rounded"
                  />
                </div>
              </div>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
              >
                Cancel
              </button>
            </div>
          )}
          <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
            <h3 className="text-xl font-bold mb-4">Add Payment</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-2">Payment Amount:</label>
                <input
                  type="text"
                  value={newPayment}
                  onChange={(e) => setNewPayment(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Effective Date:</label>
                <input
                  type="date"
                  value={effectiveDate}
                  onChange={(e) => setEffectiveDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">End Date:</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Balance:</label>
                <input
                  type="text"
                  value={balance}
                  onChange={(e) => setBalance(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block font-semibold mb-2">Type:</label>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <button
              onClick={handleAddPayment}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
              Add Payment
            </button>
            <ToastContainer />
          </div>
          {isEditingPayment && (
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
          )}
          <div className="bg-gray-100 p-4 rounded shadow-md mb-4">
            <h3 className="text-xl font-bold mb-4">Payment History</h3>
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
  {payments && payments.map((payment) => (
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
  ))}
</tbody>
            </table>
          </div>
        </div>
      ) : (
        <p className="text-xl font-semibold">Loading user data...</p>
      )}
    </div>
  );
}

export default UserProfile;

