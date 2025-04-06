import * as React from "react";

export const EmailTemplate = ({ email, subject , message }) => {
  return (
    <div>
      <h2>You just received a new message!</h2>
      
      <p>
        <span>Email:</span>
        <strong>{lastName}</strong>
      </p>
      <p>
        <span>subject:</span>
        <strong>{email}</strong>
      </p>
      <p>
        <span>Message:</span>
        <strong>{message}</strong>
      </p>
    </div>
  );
};