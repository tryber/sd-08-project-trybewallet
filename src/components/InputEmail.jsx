import React from "react";

export default function InputEmail({ ...props }) {
  return (
    <label htmlFor="password">
      Senha:
      <input type="text" data-testid="email-input" name="email" {...props} />
    </label>
  );
}
