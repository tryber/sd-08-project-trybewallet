import React from 'react';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SALVAR_GASTO = 'SALVAR_GASTO';
export const ADD_GASTO = 'ADD_GASTO';
export const SOMAR_GASTO = 'SOMAR_GASTO';

export function gasto(...args) {
  const [label, type, name, valor, mudarCampos] = args;
  return (
    <label htmlFor="valor-input">
      {`${label}:`}
      <input
        type={ type }
        id={ `${name}-input` }
        name={ name }
        data-testid={ `${name}-input` }
        onChange={ mudarCampos }
        valor={ valor }
      />
    </label>
  );
}

export function moeda(nome, valor, mudarCampos) {
  return (
    <select
      id="currency-input"
      name="currency"
      data-testid="currency-input"
      onChange={ mudarCampos }
      valor={ valor }
    >
      {nome.map((currency) => {
        if (currency === 'USDT') return;
        return (
          <option key={ currency } data-testid={ currency }>
            {currency}
          </option>
        );
      })}
    </select>
  );
}

export function pagamento(...args) {
  const [label, name, valor, mudarCampos, options] = args;
  return (
    <label htmlFor={ `${name}-input` }>
      {`${label}: `}
      <select
        id={ `${name}-input` }
        name={ name }
        data-testid={ `${name}-input` }
        onChange={ mudarCampos }
        valor={ valor }
      >
        {options.map((option) => (
          <option key={ option }>{option}</option>
        ))}
      </select>
    </label>
  );
}

export function tabela(expenses) {
  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => {
          const { description, tag, method, valor, currency, cambio } = expense;
          const { name, ask } = cambio[currency];
          return (
            <tr key={ index }>
              <td>{description}</td>
              <td>{tag}</td>
              <td>{method}</td>
              <td>{valor}</td>
              <td>{name}</td>
              <td>{parseFloat(ask).toFixed(2)}</td>
              <td>{(ask * parseInt(valor, 10)).toFixed(2)}</td>
              <td>Real</td>
              <td>Excluir</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
