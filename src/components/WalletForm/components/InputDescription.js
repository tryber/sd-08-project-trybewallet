import React from 'react';

export default function InputDescription() {
  return (
    <label htmlFor="InputDescription">
      Descrição:
      <input
        name="InputDescription"
        data-testid="description-input"
      />
    </label>
  );
}
