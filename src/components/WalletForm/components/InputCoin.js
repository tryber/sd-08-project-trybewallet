import React from 'react';

export default function InputCoin() {
  return (
    <label htmlFor="InputCoin">
      Moeda:
      <input
        name="InputCoin"
        data-testid="currency-input"
      />
    </label>
  );
}
