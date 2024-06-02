import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const SearchForm = ({ onSubmit }) => {
  const [searchResults, setSearchResults] = useState([]);
  const [memberID, setMemberID] = useState("");
  const [matchingUser, setMatchingUser] = useState(null);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      ID: memberID,
      name: name.toLowerCase(),
      dob,
      mobile: mobileNumber,
    });
  
    const url = `https://gym-backend-apis.onrender.com/admin/user/searching?${searchParams.toString()}`;
  
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(url, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if (response.status === 200) {
        const data = response.data.user;
        const firstThreeResults = data; // Get only the first three results
  
        setSearchResults(firstThreeResults); 
        onSubmit(firstThreeResults); 
  
        console.log('First three search results:', firstThreeResults);
        const matchingUser = firstThreeResults.find(user => user.ID === parseInt(memberID, 10));

        if (matchingUser) {
          console.log('Matching user:', matchingUser);
          setMatchingUser(matchingUser); // Update the state with the matching user
        } else {
          console.log('No matching user found with ID:', memberID);
          setMatchingUser(null); // Reset the matching user if not found
        }
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }    
  };
  
  const handleOpenClick = async (_id) => {
    try {
      const response = await axios.get(`https://gym-backend-apis.onrender.com/admin/user/${_id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        const newPageUrl = `/user/${_id}`;
        window.location.href = newPageUrl;
      } else {
        console.error('Error fetching user details:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-4">
          {/* Input fields */}
          <Input
            // type="text"
            value={memberID}
            onChange={handleMemberIDChange}
            placeholder="Member ID"
            size="lg"
            className="px-7 w-48 bg-white border border-gray-300 rounded-md"
            label="Member ID"
          />
          <Input
            // type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            size="lg"
            className="px-7 w-48 bg-white border border-gray-300 rounded-md"
            label="Name"
          />
          <Input
            // type="text"
            value={mobileNumber}
            onChange={handleMobileNumberChange}
            placeholder="Mobile Number"
            size="lg"
            className="w-1/4 bg-white"
            label="Mobile Number"
          />
          <Input
            type="date"
            value={dob}
            onChange={handleDobChange}
            placeholder="Date of Birth"
            size="lg"
            className="w-1/4 bg-white"
            label="DOB"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md ml-auto">
            <FontAwesomeIcon icon={faSearch} className="mr-2 text-lg px-1" />
            Search
          </button>
        </div>
      </form>

      {/* Display matching user details */}
      {matchingUser && (
  <div className="mt-8">
    <h3 className="text-lg font-medium">Matching User Details</h3>
    <div className="bg-gray-100 p-4 rounded-md">
      <p><strong>ID:</strong> {matchingUser.ID}</p>
      <p><strong>Name:</strong> {matchingUser.NAME}</p>
      <p><strong>Mobile Number:</strong> {matchingUser.PHONE}</p>
      <p><strong>Date of Birth:</strong> {matchingUser.DOB ? matchingUser.DOB.substring(0, 10) : ''}</p>
      <p><strong>Status:</strong> {matchingUser.STATUS === 1 ? "ACTIVE" : "NON-ACTIVE"}</p>
      <button onClick={() => handleOpenClick(matchingUser._id)} className="text-indigo-600 hover:text-indigo-900">View</button>
    </div>
  </div>
)}


      {/* Display search results */}
      <div className="mt-8">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SI. No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile No</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date of Birth</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {searchResults && searchResults.length > 0 ? (
              searchResults.map((result, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.ID}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.NAME}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.PHONE}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.DOB ? result.DOB.substring(0, 10) : ''}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{result.STATUS === 1 ? "ACTIVE" : "NON-ACTIVE"}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button onClick={() => handleOpenClick(result._id)} className="text-indigo-600 hover:text-indigo-900">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">No results found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SearchForm;
