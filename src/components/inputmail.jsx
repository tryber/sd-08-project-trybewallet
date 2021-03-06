import React from 'react';

export default function Inputmail({ ...props }) {
  return (
    <div>
      <label htmlFor="email">
        Email:
        <input
          type="text"
          data-testid="email-input"
          name="email"
          { ...props }
          pattern="/\S+@\S+\.\S+/"
          title="Formato correto: email@dominio.com.br"
        />
      </label>
      <br />
    </div>
  );
}
// Deixei o nome do input email para usar como chave no retorno de handlechange.
