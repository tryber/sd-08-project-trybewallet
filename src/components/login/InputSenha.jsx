import React from 'react';

function InputSenha({ ...props }) {
  return (
    <label htmlFor="password">
      <input
        type="password"
        data-testid="password-input"
        name="password"
        // value={ value.password }
        id="password"
        // onChange={ handleChange }
        { ...props }
        placeholder="password..."
      />
    </label>
  );
}

export default InputSenha;
