import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Card, Input, Typography } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faCalendarAlt, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../styles/preview.css';
import DietPlans from "./Dietplan";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const UserInformationForm = styled.form`
  position: relative;
  height: 100%;
`;

const UserInformation = () => {
  const [name, setFullName] = useState("");
  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(true);
  const [password, setPassword] = useState('');
  const [mobile, setMobileNumber] = useState('');
  const [dob, setDob] = useState('');
  const [address, setAddress] = useState('');
  const [selectedDietPlan, setSelectedDietPlan] = useState("");
  const notify = () => toast("Form Submitted");
  const [previewData, setPreviewData] = useState({
    name: '',
    email: '',
    mobile: '',
    dob: '',
    address: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login'; // Redirect to login if no token
    }
  }, []);

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
    setPreviewData({ ...previewData, address: event.target.value }); // Update preview data
  };

  const handleNameChange = (event) => {
    setFullName(event.target.value);
    setPreviewData({ ...previewData, fullName: event.target.value }); // Update preview data
  };
  const handleDietPlanChange = (event) => {
    setSelectedDietPlan(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    const input = event.target.value;
    const validatedInput = input.replace(/\D/g, '');
    setMobileNumber(validatedInput);
    setPreviewData({ ...previewData, mobileNumber: validatedInput }); // Update preview data
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPreviewData({ ...previewData, password: event.target.value }); // Update preview data
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
    setPreviewData({ ...previewData, dob: event.target.value }); // Update preview data
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
    setValidEmail(isValid);
    setPreviewData({ ...previewData, email: newEmail }); // Update preview data
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted: ", {
      name,
      mobile,
      email,
      password,
      dob,
      diet: selectedDietPlan,
      address
    });
    notify();
    setTimeout(() => {
      window.location.reload();
    }, 5000);
    
    try {
      const formData = {
        name,
        mobile,
        email,
        password,
        diet: selectedDietPlan,
        dob,
        address
      };
      const token = localStorage.getItem('token');
      const response = await fetch('https://gym-backend-apis.onrender.com/admin/user/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`        
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form data submitted successfully!');
      } else {
        console.error('Error submitting form data:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form data:', error);
    }
  };
  

  return (
    <UserInformationForm className="flex flex-col justify-between" onSubmit={handleSubmit}>
      <Card color="transparent" shadow={false}>
        <div className="mt-2 mb-2 h-full form max-w-screen-lg sm:w-96">
          <h2 className="font-bold mb-3">Customer ID</h2>
          <h4 className="mb-3">User INFORMATION</h4>
          <div className="gap-5 flex flex-col overflow-auto">
            <div className="flex items-center justify-center w-32 h-32 mb-5">
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 dark:hover:border-gray-500">
                <div className="flex flex-col items-center justify-center">
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">+</span></p>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold text-green-600">Add Image</span></p>
                </div>
                <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <Input
              type="text"
              size="md"
              color="blue"
              outline={false.toString()}
              placeholder="Full name"
              value={name}
              onChange={handleNameChange}
              className="font-bold"
              label="Name"
            />

            <Input
              type="text"
              size="regular"
              color="lightBlue"
              outline={false}
              placeholder="+91 00000 00000"
              value={mobile}
              onChange={handleMobileNumberChange}
              className="font-bold"
              label="Mobile Number"
            />
            <Input
              type="email"
              size="regular"
              color="lightBlue"
              outline={false}
              placeholder="xyz@gmail.com"
              value={email}
              onChange={handleEmailChange}
              className={`font-bold ${!validEmail ? 'border-red-500' : ''}`}
              label="Email"
            />
            {!validEmail && (
              <Typography color="red" className="text-sm">
                Please enter a valid email address.
              </Typography>
            )}
            <Input
              type="password"
              size="regular"
              color="lightBlue"
              outline={false}
              placeholder="***********"
              value={password}
              onChange={handlePasswordChange}
              className="font-bold"
              label="Password"
            />
            <div>
      <div className="mb-4">
        <Input
          type="date"
          size="regular"
          color="lightBlue"
          outline={false}
          placeholder="01/01/2024"
          value={dob}
          onChange={handleDobChange}
          className="font-bold"
          label="DOB"
        />
      </div>
      <DietPlans />
      
    </div>
            <div className="col-span-full mb-5">
              <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">Address</label>
              <div className="mt-2">
                <textarea id="about" name="about" rows="3" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-transparent" onChange={handleAddressChange}></textarea>
              </div>
            </div>
            {previewData && (
              <div className="preview-section mb-5">
                <div className="container">
                  <div className="icon">
                    <FontAwesomeIcon icon={faPhone} className="fa-fw" />
                  </div>
                  <div className="inside flex justify-center items-center">
                    <h1>{previewData.mobileNumber}</h1>
                  </div>

                </div>

                <div className="container">
                  <div className="icon">
                    <FontAwesomeIcon icon={faEnvelope} className="fa-fw" />
                  </div>
                  <div className="inside flex justify-center items-center">
                    <h1>{previewData.email}</h1>
                  </div>
                </div>

                <div className="container">
                  <div className="icon">
                    <FontAwesomeIcon icon={faCalendarAlt} className="fa-fw" />
                  </div>
                  <div className="inside flex justify-center items-center">
                    <h1>{previewData.dob}</h1>
                  </div>
                </div>

                <div className="container">
                  <div className="icon">
                    <FontAwesomeIcon icon={faMapMarkerAlt} className="fa-fw" />
                  </div>
                  <div className="inside flex justify-center items-center">
                    <h1>{previewData.address}</h1>
                  </div>
                </div>
              </div>
            )}
            <button
              type="submit"
              className="sticky bottom-5 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
              
            >
              Submit
            </button>
            <ToastContainer />
          </div>
        </div>
      </Card>
    </UserInformationForm>
  );
};


export default UserInformation;
