import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa'; // Ensure this is imported
import './CustomDatePicker.css';

const CustomDatePicker = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isOpen, setIsOpen] = useState(false); // State to control date picker visibility

  const handleIconClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="datepicker-container">
      <label className="datepicker-label">Date</label>
      <div className="datepicker-input-wrapper">
        <DatePicker
          selected={selectedDate}
          onChange={(date) => {
            setSelectedDate(date);
            setIsOpen(false); // Close the date picker when a date is selected
          }}
          dateFormat="dd/MM/yyyy"
          placeholderText="DD/MM/YYYY"
          className="datepicker-input"
          popperPlacement="bottom" // Ensure the calendar pops up below the input
          open={isOpen} // Control date picker visibility
          onClickOutside={() => setIsOpen(false)} // Close date picker on outside click
          onInputClick={() => setIsOpen(true)} // Open on input click
        />
        <FaRegCalendarAlt 
          className="calendar-icon" 
          onClick={handleIconClick} // Open date picker on icon click
        />
      </div>
    </div>
  );
};

export default CustomDatePicker;
