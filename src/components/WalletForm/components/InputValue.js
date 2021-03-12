import React from 'react';

export default function InputValue() {
  return (
    <label htmlFor="inputValue">
      Valor:
      <input
        name="inputValue"
        data-testid="value-input"
      />
    </label>
  );
}
