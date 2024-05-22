import React from "react";
import UserInformation from "./user";
import Preview from "./Pr";

const MainContent = () => {
  return (
    <div className="main-content">
      <UserInformation />
      <Preview />
    </div>
  );
};

export default MainContent;
