import React from 'react';

export default function InputPassword({ ...props }) {
  return (
    <label htmlFor="password">
      Senha:
      <input
        type="password"
        data-testid="password-input"
        name="password"
        { ...props }
      />
    </label>
  );
}
