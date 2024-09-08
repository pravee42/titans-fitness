import React from "react";
import logo from "../img/logo-1.png";

const SearchForm = () => {
  return (
    <div
      className="relative w-full p-16 rounded-lg"
      style={{
        backgroundImage: `url(${logo})`,
        backgroundSize: 'contain', // Ensures the image fits the container
        backgroundPosition: 'center', // Centers the image
        backgroundRepeat: 'no-repeat', // Prevents the image from repeating
        // opacity: 0.5, // Set the opacity of the background image
        // padding: '20px', // Adds padding inside the form
      }}
    >
      {/* Your form content goes here */}
    </div>
  );
};

export default SearchForm;
