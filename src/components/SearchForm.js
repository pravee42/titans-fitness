import React, { useState } from "react";
import { Input } from "@material-tailwind/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchForm = ({ onFilter }) => {
  const [memberID, setMemberID] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");

  const handleMemberIDChange = (event) => {
    setMemberID(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleDobChange = (event) => {
    setDob(event.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter({ memberID, name, phone, dob });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center gap-4">
          <Input
            type="text"
            value={memberID}
            onChange={handleMemberIDChange}
            placeholder="Member ID"
            size="lg"
            className="px-7 w-48 bg-white border border-gray-300 rounded-md"
            label="Member ID"
          />
          <Input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Name"
            size="lg"
            className="px-7 w-48 bg-white border border-gray-300 rounded-md"
            label="Name"
          />
          <Input
            type="text"
            value={phone}
            onChange={handlePhoneChange}
            placeholder="Phone"
            size="lg"
            className="px-7 w-48 bg-white border border-gray-300 rounded-md"
            label="Phone"
          />
          <Input
            type="text"
            value={dob}
            onChange={handleDobChange}
            placeholder="DOB (dd/mm/yyyy)"
            size="lg"
            className="px-7 w-48 bg-white border border-gray-300 rounded-md"
            label="DOB"
          />
        </div>
        <div className="flex justify-end mt-5">
          <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md ml-auto">
            <FontAwesomeIcon icon={faSearch} className="mr-2" />
            Search
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
