import React from "react";

export default function InputEmail({ ...props }) {
  return (
    <>
      <label htmlFor="email">
        Email:
        <input type="text" data-testid="email-input" name="email" {...props} />
      </label>
      <br />
    </>
  );
}
