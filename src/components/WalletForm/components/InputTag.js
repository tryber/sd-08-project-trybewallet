import React from 'react';

export default function InputTag() {
  return (
    <label htmlFor="InputTag">
      Tag:
      <input
        name="InputTag"
        data-testid="tag-input"
      />
    </label>
  );
}
