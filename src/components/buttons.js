import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faUser, faSignOutAlt,  faSearch, faWallet, faDumbbell, faClock } from '@fortawesome/free-solid-svg-icons';



const Buttons = () => {
  const [memberID, setMemberID] = useState("");
  const [name, setName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dob, setDob] = useState("");
  const [address, setAddress] = useState("");

  const handleMemberIDChange = (event) => {
    setMemberID(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleMobileNumberChange = (event) => {
    setMobileNumber(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted: ", {
      memberID,
      name,
      mobileNumber,
      dob,
      address,
    });

    // Add your form submission logic here
  };

  return (

<form onSubmit={handleSubmit} >

  {/* <button type="submit" className="bg-blue-500 flex flex-1 justify-end text-white py-2 px-4 rounded-md">Submit</button> */}
  {/* <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded-md mr-auto">Submit</button> */}
  <div className='flex justify-end mt-5'>
  <button type="submit" className="bg-70AB0E-800 text-white py-2 px-4 rounded-md ml-auto">
    <FontAwesomeIcon icon={faSearch} className="mr-2 text-lg px-1" />
    Search
  </button>
</div>
</form>





  );
};

export default Buttons;
