import React from 'react';

export default function InputPass({ ...props }) {
  return (
    <div>
      <label htmlFor="password">
        Senha:
        <input
          type="password"
          data-testid="password-input"
          name="password"
          minLength="6"
          { ...props }
          title="A senha deve ter o minimo de 6 caracteres"
        />
      </label>
      <br />
    </div>
  );
}
