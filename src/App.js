import './styles/App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DashboardLayout from "./components/Dashboard";
import UserInformation from "./components/user";
import React from "react";
import SearchExistingCoustomer from "./components/SearchExistingCustomer";
import CoustomerPayment from "./components/CoustPay";
import { Navigate } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import Login from './components/Login';
import GymAt from './components/GymAt';
import HomePage from './components/Home/Home';
import UserDashboard from './components/Client/UserDashboard';
import ProtectedRoute from './components/ProtectedRoute'; 
import Tablegym from './components/tables/Table'; 
import UserDetails from './components/Userdetails';
import Punchin from './components/punchin';
import paymenthistry from './components/payment/PaymentGet';

library.add(fas);

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/Login" element={<Login />} />
          <Route path="/payment" element={<ProtectedRoute element={paymenthistry} adminOnly />} />
          <Route path="/attendance" element={<ProtectedRoute element={Punchin} adminOnly />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/UserDashboard" element={<UserDashboard/>} />
          <Route path="/Dashboard" element={<ProtectedRoute element={DashboardLayout} adminOnly />} />
          <Route path="/Search-Existing-customer" element={<ProtectedRoute element={SearchExistingCoustomer} adminOnly />} />
          <Route path="/Customer-Payment" element={<ProtectedRoute element={CoustomerPayment} adminOnly />} />
          <Route path="/Gym-Attendance" element={<ProtectedRoute element={GymAt} adminOnly />} />
          <Route path="/user/:id" element={<ProtectedRoute element={UserDetails} adminOnly />} />
          <Route path="/tablegym" element={<ProtectedRoute element={Tablegym} adminOnly />} />
          <Route path="*" element={<Navigate to="/" />} />        
        </Routes>
      </Router>
    </div>
  );
}

export default App;
