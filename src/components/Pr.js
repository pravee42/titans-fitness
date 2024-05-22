import React from "react";
import styled from "styled-components";

const Card = styled.div`
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const Preview = ({ user }) => {
    if (!user) {
        return <div>Loading...</div>; // or any other fallback UI
      }
  return (
    <Card className="container mx-auto p-4">
      <h3>{user.fullName}</h3>
      <p>
        <b>Mobile Number:</b> {user.mobileNumber}
      </p>
      <p>
        <b>Email:</b> {user.email}
      </p>
      <p>
        <b>DOB:</b> {user.dob}
      </p>
      <p>
        <b>Address:</b> {user.address}
      </p>
    </Card>
  );
};

export default Preview;
